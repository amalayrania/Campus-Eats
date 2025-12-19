import { useState, useEffect } from 'react';
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
codex/fix-order-confirmation-flow-and-add-backend-ndq693
import { Order, Restaurant, getActiveOrder, getRestaurants, updateOrderStatus } from './services/api';

import { Order, Restaurant, getActiveOrder, getRestaurants } from './services/api';
main
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

  const mapRestaurantToDetails = (restaurant: Restaurant): RestaurantDetails => ({
    ...restaurant,
    heroImage: restaurant.image,
    categories: [
      {
        name: 'Menu',
        items: restaurant.menu
      }
    ]
  });

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
    
    // Fetch active order when navigating to home
    if (screen === 'home') {
      fetchActiveOrder();
    }
  };

  const openRestaurant = (restaurant: RestaurantDetails) => {
    setSelectedRestaurant(restaurant);
    navigateTo('restaurant');
  };

  const fetchActiveOrder = async () => {
    try {
      const order = await getActiveOrder(userId);
      setActiveOrder(order);
    } catch (error) {
      console.error('Failed to fetch active order:', error);
      setActiveOrder(null);
    }
  };

codex/fix-order-confirmation-flow-and-add-backend-ndq693
  const cancelActiveOrder = async () => {
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
  };

main
  const fetchRestaurants = async () => {
    try {
      const data = await getRestaurants();
      setRestaurantsList(data.map(mapRestaurantToDetails));
    } catch (error) {
      console.error('Failed to fetch restaurants:', error);
      setRestaurantsList(restaurants);
    }
  };

  // Fetch active order on mount if already on home screen
  useEffect(() => {
    if (currentScreen === 'home') {
      fetchActiveOrder();
    }
  }, [userId]);

  useEffect(() => {
codex/fix-order-confirmation-flow-and-add-backend-ndq693
    if (!activeOrder) {
      return;
    }
    const timeoutId = window.setTimeout(() => {
      fetchActiveOrder();
    }, 60_000);
    return () => window.clearTimeout(timeoutId);
  }, [activeOrder]);

  useEffect(() => {

main
    fetchRestaurants();
  }, []);

  useEffect(() => {
    if (!restaurantsList.length) {
      return;
    }
    if (!restaurantsList.find((restaurant) => restaurant.id === selectedRestaurant.id)) {
      setSelectedRestaurant(restaurantsList[0]);
    }
  }, [restaurantsList, selectedRestaurant.id]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      setCartItems(prev => prev.filter(item => item.id !== id));
    } else {
      setCartItems(prev => 
        prev.map(item => item.id === id ? { ...item, quantity } : item)
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-4">
      <div className="w-full max-w-[430px] min-h-[932px] bg-white rounded-[40px] shadow-2xl overflow-hidden relative">
        {currentScreen === 'splash' && (
          <SplashScreen onContinue={() => navigateTo('login')} />
        )}
        {currentScreen === 'login' && (
          <LoginScreen 
            onLogin={() => navigateTo('home')}
            onCourierLogin={() => {
              setIsCourierMode(true);
              navigateTo('courier-dashboard');
            }}
          />
        )}
        {currentScreen === 'home' && (
          <HomeScreen
            onNavigate={navigateTo}
            restaurants={restaurantsList}
            onSelectRestaurant={openRestaurant}
            cartItemCount={cartItems.length}
            onAddToCart={addToCart}
            activeOrder={activeOrder}
          />
        )}
        {currentScreen === 'restaurant' && (
          <RestaurantMenu
            onBack={() => navigateTo('home')}
            onNavigate={navigateTo}
            onAddToCart={addToCart}
            cartItemCount={cartItems.length}
            activeOrder={activeOrder}
            onCancelActiveOrder={cancelActiveOrder}
            restaurant={selectedRestaurant}
          />
        )}
        {currentScreen === 'cart' && (
          <CartScreen 
            onBack={() => navigateTo('restaurant')}
            onNavigate={navigateTo}
            cartItems={cartItems}
            onUpdateQuantity={updateQuantity}
            onClearCart={clearCart}
          />
        )}
        {currentScreen === 'tracking' && (
          <OrderTracking 
            onBack={() => navigateTo('home')} 
            activeOrder={activeOrder}
            onCancelOrder={async () => {
              await cancelActiveOrder();
              navigateTo('home');
            }}
          />
        )}
        {currentScreen === 'profile' && (
          <ProfileSettings 
            onBack={() => navigateTo('home')}
            isCourierMode={isCourierMode}
            onToggleCourierMode={() => {
              setIsCourierMode(!isCourierMode);
              navigateTo(isCourierMode ? 'home' : 'courier-dashboard');
            }}
          />
        )}
        {currentScreen === 'courier-dashboard' && (
          <CourierDashboard onNavigate={navigateTo} />
        )}
        {currentScreen === 'courier-pickup' && (
          <CourierPickup 
            onBack={() => navigateTo('courier-dashboard')}
            onNavigate={navigateTo}
          />
        )}
        {currentScreen === 'courier-delivery' && (
          <CourierDelivery 
            onBack={() => navigateTo('courier-pickup')}
            onNavigate={navigateTo}
          />
        )}
        {currentScreen === 'payment-selection' && (
          <PaymentSelection
            onBack={() => navigateTo('cart')}
            onNavigate={navigateTo}
            totalAmount={cartTotal}
            onSelectPayment={setPaymentMethod}
          />
        )}
        {currentScreen === 'card-entry' && (
          <CardEntry 
            onBack={() => navigateTo('payment-selection')}
            onNavigate={navigateTo}
            totalAmount={cartTotal}
          />
        )}
        {currentScreen === 'order-confirmation' && (
          <OrderConfirmation 
            onNavigate={navigateTo}
            totalAmount={cartTotal}
            paymentMethod={paymentMethod}
            cartItems={cartItems}
            userId={userId}
            restaurantId={selectedRestaurant.id}
            onOrderCreated={(order) => {
              setActiveOrder(order);
              clearCart();
            }}
          />
        )}
        {currentScreen === 'order-active-summary' && (
          <OrderActiveSummary 
            onBack={() => navigateTo('restaurant')}
            onNavigate={navigateTo}
          />
        )}
      </div>
    </div>
  );
}
