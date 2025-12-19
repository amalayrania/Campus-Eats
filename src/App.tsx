import { useState, useEffect, useCallback } from 'react';
import SplashScreen from './components/SplashScreen';
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import RestaurantMenu from './components/RestaurantMenu';
import CartScreen from './components/CartScreen';
import OrderTracking from './components/OrderTracking';
import CourierDashboard from './components/CourierDashboard';
import CourierPickup from './components/CourierPickup';
import CourierDelivery from './components/CourierDelivery';
import ProfileSettings from './components/ProfileSettings';
import PaymentSelection from './components/PaymentSelection';
import CardEntry from './components/CardEntry';
import OrderConfirmation from './components/OrderConfirmation';
import OrderActiveSummary from './components/OrderActiveSummary';
import { Order, Restaurant, getActiveOrder, getRestaurants, updateOrderStatus } from './services/api';
import { restaurants, RestaurantDetails } from './services/restaurantData';

// Default user ID for development
const DEFAULT_USER_ID = 'user1';

export type Screen = 
  | 'splash' 
  | 'login' 
  | 'home' 
  | 'restaurant' 
  | 'cart' 
  | 'tracking' 
  | 'profile'
  | 'courier-dashboard'
  | 'courier-pickup'
  | 'courier-delivery'
  | 'payment-selection'
  | 'card-entry'
  | 'order-confirmation'
  | 'order-active-summary';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCourierMode, setIsCourierMode] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('card');
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [userId, setUserId] = useState<string>(DEFAULT_USER_ID);
  const [restaurantsList, setRestaurantsList] = useState<RestaurantDetails[]>(restaurants);
  const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantDetails>(restaurants[0]);

  const mapRestaurantToDetails = useCallback(
    (restaurant: Restaurant): RestaurantDetails => ({
      ...restaurant,
      heroImage: restaurant.image,
      categories: [
        {
          name: 'Menu',
          items: restaurant.menu
        }
      ]
    }),
    []
  );

  const fetchActiveOrder = useCallback(async () => {
    try {
      const order = await getActiveOrder(userId);
      setActiveOrder(order);
    } catch (error) {
      console.error('Failed to fetch active order:', error);
      setActiveOrder(null);
    }
  }, [userId]);

  const navigateTo = useCallback((screen: Screen) => {
    setCurrentScreen(screen);
    if (screen === 'home') {
      fetchActiveOrder();
    }
  }, [fetchActiveOrder]);

  const openRestaurant = useCallback((restaurant: RestaurantDetails) => {
    setSelectedRestaurant(restaurant);
    navigateTo('restaurant');
  }, [navigateTo]);

  const cancelActiveOrder = useCallback(async () => {
    if (!activeOrder) {
      return;
    }
    try {
      await updateOrderStatus(activeOrder.id, 'cancelled');
    } catch (error) {
      console.error('Failed to cancel order:', error);
    } finally {
      setActiveOrder(null);
    }
  }, [activeOrder]);

  const fetchRestaurants = useCallback(async () => {
    try {
      const data = await getRestaurants();
      setRestaurantsList(data.map(mapRestaurantToDetails));
    } catch (error) {
      console.error('Failed to fetch restaurants:', error);
      setRestaurantsList(restaurants);
    }
  }, [mapRestaurantToDetails]);

  useEffect(() => {
    if (currentScreen === 'home') {
      fetchActiveOrder();
    }
  }, [currentScreen, fetchActiveOrder]);

  useEffect(() => {
    if (!activeOrder) {
      return;
    }
    const timeoutId = window.setTimeout(() => {
      fetchActiveOrder();
    }, 60_000);
    return () => window.clearTimeout(timeoutId);
  }, [activeOrder, fetchActiveOrder]);

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  useEffect(() => {
    if (!restaurantsList.length) {
      return;
    }
    if (!restaurantsList.find((restaurant) => restaurant.id === selectedRestaurant.id)) {
      setSelectedRestaurant(restaurantsList[0]);
    }
  }, [restaurantsList, selectedRestaurant.id]);

  const addToCart = useCallback((item: Omit<CartItem, 'quantity'>) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity === 0) {
      setCartItems(prev => prev.filter(item => item.id !== id));
    } else {
      setCartItems(prev => 
        prev.map(item => item.id === id ? { ...item, quantity } : item)
      );
    }
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const handleOrderCreated = useCallback((order: Order) => {
    setActiveOrder(order);
    clearCart();
  }, [clearCart]);
