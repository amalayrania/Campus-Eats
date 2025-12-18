const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

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
  description: string;
}

export interface Order {
  id: string;
  orderNumber: number;
  userId: string;
  restaurantId: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'picked-up' | 'delivering' | 'delivered';
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  address: string;
}

// Helper function to format order status for display
export function formatOrderStatus(status: Order['status']): string {
  const statusMap: Record<Order['status'], string> = {
    'pending': 'pending',
    'preparing': 'being prepared',
    'ready': 'ready for pickup',
    'picked-up': 'picked up',
    'delivering': 'out for delivery',
    'delivered': 'delivered',
  };
  return statusMap[status] || status;
}

// Helper function to handle API errors
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `HTTP error! status: ${response.status}`);
  }
  return response.json();
}

// Restaurant endpoints
export async function getRestaurants(): Promise<Restaurant[]> {
  const response = await fetch(`${API_URL}/api/restaurants`);
  return handleResponse<Restaurant[]>(response);
}

export async function getRestaurant(id: string): Promise<Restaurant> {
  const response = await fetch(`${API_URL}/api/restaurants/${id}`);
  return handleResponse<Restaurant>(response);
}

export async function getRestaurantMenu(id: string): Promise<MenuItem[]> {
  const response = await fetch(`${API_URL}/api/restaurants/${id}/menu`);
  return handleResponse<MenuItem[]>(response);
}

// Order endpoints
export async function createOrder(orderData: {
  userId: string;
  restaurantId: string;
  items: Array<{ id: string; name: string; price: number; quantity: number }>;
  total: number;
}): Promise<Order> {
  try {
    const response = await fetch(`${API_URL}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    return await handleResponse<Order>(response);
  } catch (error) {
    console.warn('Falling back to mock order creation:', error);

    const now = new Date().toISOString();
    return {
      id: `mock-${Date.now()}`,
      orderNumber: Math.floor(1000 + Math.random() * 9000),
      userId: orderData.userId,
      restaurantId: orderData.restaurantId,
      items: orderData.items,
      total: orderData.total,
      status: 'pending',
      createdAt: now,
      updatedAt: now,
    };
  }
}

export async function getOrder(id: string): Promise<Order> {
  const response = await fetch(`${API_URL}/api/orders/${id}`);
  return handleResponse<Order>(response);
}

export async function getActiveOrder(userId: string): Promise<Order | null> {
  const response = await fetch(`${API_URL}/api/orders/user/${userId}/active`);
  if (!response.ok) {
    // If there's an error fetching, return null instead of throwing
    console.error('Failed to fetch active order:', response.status);
    return null;
  }
  return response.json();
}

export async function updateOrderStatus(id: string, status: Order['status']): Promise<Order> {
  const response = await fetch(`${API_URL}/api/orders/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });
  return handleResponse<Order>(response);
}

// Auth endpoints
export async function login(email: string): Promise<User> {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });
  return handleResponse<User>(response);
}

export async function getUser(id: string): Promise<User> {
  const response = await fetch(`${API_URL}/api/auth/users/${id}`);
  return handleResponse<User>(response);
}

// Helper function to calculate order progress percentage
export function getOrderProgress(status: Order['status']): number {
  const progressMap: Record<Order['status'], number> = {
    'pending': 10,
    'preparing': 40,
    'ready': 65,
    'picked-up': 80,
    'delivering': 90,
    'delivered': 100,
  };
  return progressMap[status] || 0;
}
