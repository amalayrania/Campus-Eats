import { CheckCircle, Package, MapPin, Clock } from 'lucide-react';
import { Screen, CartItem } from '../App';
import { useEffect, useState } from 'react';
import { createOrder, Order } from '../services/api';

interface OrderConfirmationProps {
  onNavigate: (screen: Screen) => void;
  totalAmount: number;
  paymentMethod: 'card' | 'cash';
  cartItems: CartItem[];
  userId: string;
  onOrderCreated: (order: Order) => void;
}

export default function OrderConfirmation({ 
  onNavigate, 
  totalAmount, 
  paymentMethod,
  cartItems,
  userId,
  onOrderCreated
}: OrderConfirmationProps) {
  const [showToast, setShowToast] = useState(true);
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);
  const [isCreating, setIsCreating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Create order on mount
  useEffect(() => {
    const placeOrder = async () => {
      try {
        setIsCreating(true);
        const orderData = {
          userId,
          restaurantId: '1', // Using default restaurant ID
          items: cartItems.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity
          })),
          total: totalAmount
        };
        
        const order = await createOrder(orderData);
        setCreatedOrder(order);
        onOrderCreated(order);
      } catch (error) {
        console.error('Failed to create order:', error);
      } finally {
        setIsCreating(false);
      }
    };
    
    placeOrder();
  }, []);

  // Show loading state while creating order
  if (isCreating || !createdOrder) {
    return (
      <div className="h-full bg-[#F8F9FA] flex flex-col items-center justify-center px-6">
        <div className="w-16 h-16 border-4 border-[#2D6A4F] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-[#6B7280]">Placing your order...</p>
      </div>
    );
  }

  return (
    <div className="h-full bg-[#F8F9FA] flex flex-col items-center justify-center px-6">
      {/* Success Icon */}
      <div className="w-24 h-24 rounded-full bg-[#40916C] flex items-center justify-center mb-6 animate-in zoom-in duration-500">
        <CheckCircle className="w-12 h-12 text-white" />
      </div>

      {/* Success Message */}
      <h2 className="text-[#1F2937] text-center mb-2">Order Placed!</h2>
      <p className="text-[#6B7280] text-center mb-8">
        {paymentMethod === 'cash' 
          ? `Pay ${totalAmount} MAD on delivery`
          : 'Your payment was successful'}
      </p>

      {/* Order Details Card */}
      <div className="w-full bg-white rounded-2xl p-6 shadow-lg space-y-4 mb-6">
        <div className="flex items-center space-x-3 pb-4 border-b border-[#E5E7EB]">
          <Package className="w-6 h-6 text-[#2D6A4F]" />
          <div className="flex-1">
            <p className="text-[#6B7280]">Order Number</p>
            <p className="text-[#1F2937]">#{createdOrder.orderNumber}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 pb-4 border-b border-[#E5E7EB]">
          <MapPin className="w-6 h-6 text-[#2D6A4F]" />
          <div className="flex-1">
            <p className="text-[#6B7280]">Delivery Location</p>
            <p className="text-[#1F2937]">Building C, Room 204</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Clock className="w-6 h-6 text-[#2D6A4F]" />
          <div className="flex-1">
            <p className="text-[#6B7280]">Estimated Delivery</p>
            <p className="text-[#1F2937]">15-20 minutes</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full space-y-3">
        <button
          onClick={() => onNavigate('tracking')}
          className="w-full bg-[#2D6A4F] text-white rounded-2xl py-4 shadow-lg shadow-[#2D6A4F]/30 hover:bg-[#40916C] transition-all active:scale-95"
        >
          Track Order
        </button>
        <button
          onClick={() => onNavigate('home')}
          className="w-full bg-white text-[#2D6A4F] border-2 border-[#2D6A4F] rounded-2xl py-4 hover:bg-[#F8F9FA] transition-all active:scale-95"
        >
          Back to Home
        </button>
      </div>

      {/* Success Toast */}
      {showToast && (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-[#40916C] rounded-2xl p-4 shadow-2xl flex items-center space-x-3 z-50 animate-in fade-in slide-in-from-top-4 duration-300 max-w-sm">
          <CheckCircle className="w-6 h-6 text-white flex-shrink-0" />
          <p className="text-white">
            {paymentMethod === 'cash' 
              ? 'Order placed — Pay on delivery'
              : 'Payment successful — Order placed'}
          </p>
        </div>
      )}
    </div>
  );
}
