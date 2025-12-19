// ============================================
// APPLICATION LAYER - API Service
// Implements Performance Monitoring & Caching
// - Tracks response times for all API calls
// - Implements client-side caching strategy
// - Supports Performance ASR requirements
// ============================================

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const DEFAULT_TIMEOUT_MS = 8000;

// Performance monitoring storage (IN-MEMORY ONLY - NO LOCALSTORAGE)
interface PerformanceMetric {
  endpoint: string;
  duration: number;
  timestamp: number;
  success: boolean;
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private readonly MAX_METRICS = 100;

  recordMetric(endpoint: string, duration: number, success: boolean) {
    this.metrics.push({
      endpoint,
      duration,
      timestamp: Date.now(),
      success
    });

    // Keep only last 100 metrics
    if (this.metrics.length > this.MAX_METRICS) {
      this.metrics.shift();
    }
  }

  getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }

  getAverageResponseTime(): number {
    if (this.metrics.length === 0) return 0;
    const sum = this.metrics.reduce((acc, m) => acc + m.duration, 0);
    return Math.round(sum / this.metrics.length);
  }

  get95thPercentile(): number {
    if (this.metrics.length === 0) return 0;
    const sorted = [...this.metrics].sort((a, b) => a.duration - b.duration);
    const index = Math.floor(sorted.length * 0.95);
    return Math.round(sorted[index]?.duration || 0);
  }

  getSuccessRate(): number {
    if (this.metrics.length === 0) return 100;
    const successful = this.metrics.filter(m => m.success).length;
    return Math.round((successful / this.metrics.length) * 100);
  }
}

export const performanceMonitor = new PerformanceMonitor();

// Cache implementation for menu/restaurant data
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

class APICache {
  private cache = new Map<string, CacheEntry<any>>();
  private readonly TTL = 5 * 60 * 1000; // 5 minutes cache

  set<T>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const age = Date.now() - entry.timestamp;
    if (age > this.TTL) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  clear(): void {
    this.cache.clear();
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }
}

const apiCache = new APICache();

// Helper to measure API call performance
async function measurePerformance<T>(
  endpoint: string,
  apiCall: () => Promise<T>
): Promise<T> {
  const startTime = performance.now();
  let success = true;

  try {
    const result = await apiCall();
    return result;
  } catch (error) {
    success = false;
    throw error;
  } finally {
    const duration = performance.now() - startTime;
    performanceMonitor.recordMetric(endpoint, duration, success);
  }
}

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  time: string;
  status: 'open' | 'busy' | 'closed';
  rating: number;
  description: string;
  menu: MenuItem[];
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
}

export interface Order {
  id: string;
  userId: string;
  restaurantId: string;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  status: 'pending' | 'preparing' | 'ready' | 'delivering' | 'delivered' | 'cancelled';
  paymentMethod: 'card' | 'cash';
  deliveryAddress?: string;
  createdAt: string;
  updatedAt: string;
}

async function fetchWithTimeout(url: string, options: RequestInit = {}, timeout = DEFAULT_TIMEOUT_MS): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

// RESTAURANTS API - WITH CACHING
export async function getRestaurants(): Promise<Restaurant[]> {
  // Check cache first (Performance: Caching Tactic)
  const cached = apiCache.get<Restaurant[]>('restaurants');
  if (cached) {
    console.log('🚀 Cache hit: restaurants loaded instantly');
    return cached;
  }

  return measurePerformance('GET /restaurants', async () => {
    const response = await fetchWithTimeout(`${API_URL}/api/restaurants`);
    if (!response.ok) {
      throw new Error('Failed to fetch restaurants');
    }
    const data = await response.json();
    
    // Store in cache
    apiCache.set('restaurants', data);
    console.log('💾 Cached restaurants for future requests');
    
    return data;
  });
}

export async function getRestaurant(id: string): Promise<Restaurant> {
  // Check cache first
  const cacheKey = `restaurant_${id}`;
  const cached = apiCache.get<Restaurant>(cacheKey);
  if (cached) {
    console.log(`🚀 Cache hit: restaurant ${id} loaded instantly`);
    return cached;
  }

  return measurePerformance(`GET /restaurants/${id}`, async () => {
    const response = await fetchWithTimeout(`${API_URL}/api/restaurants/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch restaurant');
    }
    const data = await response.json();
    
    // Store in cache
    apiCache.set(cacheKey, data);
    
    return data;
  });
}

export async function getRestaurantMenu(id: string): Promise<MenuItem[]> {
  // Check cache first
  const cacheKey = `menu_${id}`;
  const cached = apiCache.get<MenuItem[]>(cacheKey);
  if (cached) {
    console.log(`🚀 Cache hit: menu ${id} loaded instantly`);
    return cached;
  }

  return measurePerformance(`GET /restaurants/${id}/menu`, async () => {
    const response = await fetchWithTimeout(`${API_URL}/api/restaurants/${id}/menu`);
    if (!response.ok) {
      throw new Error('Failed to fetch menu');
    }
    const data = await response.json();
    
    // Store in cache
    apiCache.set(cacheKey, data);
    
    return data;
  });
}

// ORDERS API - WITH PERFORMANCE TRACKING
export async function createOrder(orderData: {
  userId: string;
  restaurantId: string;
  items: Array<{ id: string; name: string; quantity: number; price: number }>;
  totalAmount: number;
  paymentMethod: 'card' | 'cash';
  deliveryAddress?: string;
}): Promise<Order> {
  return measurePerformance('POST /orders', async () => {
    const response = await fetchWithTimeout(`${API_URL}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error('Failed to create order');
    }

    return response.json();
  });
}

export async function getOrder(orderId: string): Promise<Order> {
  return measurePerformance('GET /orders/:id', async () => {
    const response = await fetchWithTimeout(`${API_URL}/api/orders/${orderId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch order');
    }
    return response.json();
  });
}

export async function getActiveOrder(userId: string): Promise<Order | null> {
  return measurePerformance('GET /orders/user/:userId/active', async () => {
    const response = await fetchWithTimeout(`${API_URL}/api/orders/user/${userId}/active`);
    if (!response.ok) {
      throw new Error('Failed to fetch active order');
    }
    return response.json();
  });
}

export async function getAllOrders(userId: string): Promise<Order[]> {
  return measurePerformance('GET /orders/user/:userId/all', async () => {
    const response = await fetchWithTimeout(`${API_URL}/api/orders/user/${userId}/all`);
    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }
    return response.json();
  });
}

export async function updateOrderStatus(
  orderId: string,
  status: Order['status']
): Promise<Order> {
  return measurePerformance('PATCH /orders/:id/status', async () => {
    const response = await fetchWithTimeout(`${API_URL}/api/orders/${orderId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error('Failed to update order status');
    }

    return response.json();
  });
}

// AUTH API
export async function login(email: string, password: string): Promise<{ userId: string; token: string }> {
  return measurePerformance('POST /auth/login', async () => {
    const response = await fetchWithTimeout(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    return response.json();
  });
}

export async function getUser(userId: string): Promise<any> {
  return measurePerformance('GET /auth/users/:id', async () => {
    const response = await fetchWithTimeout(`${API_URL}/api/auth/users/${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }
    return response.json();
  });
}

// Clear cache utility (useful for logout or refresh)
export function clearCache() {
  apiCache.clear();
  console.log('🗑️ API cache cleared');
}

// Utility function for formatting order status
export function formatOrderStatus(status: Order['status']): string {
  const statusMap: Record<Order['status'], string> = {
    'pending': 'Order Placed',
    'preparing': 'Preparing',
    'ready': 'Ready for Pickup',
    'delivering': 'Out for Delivery',
    'delivered': 'Delivered',
    'cancelled': 'Cancelled'
  };
  return statusMap[status] || status;
}

// Utility function for getting order progress percentage
export function getOrderProgress(status: Order['status']): number {
  const progressMap: Record<Order['status'], number> = {
    'pending': 25,
    'preparing': 50,
    'ready': 75,
    'delivering': 90,
    'delivered': 100,
    'cancelled': 0
  };
  return progressMap[status] || 0;
}