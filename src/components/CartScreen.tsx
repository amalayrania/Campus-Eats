import { ArrowLeft, Plus, Minus, Trash2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Screen, CartItem } from '../App';

interface CartScreenProps {
  onBack: () => void;
  onNavigate: (screen: Screen) => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onClearCart: () => void;
}

export default function CartScreen({ onBack, onNavigate, cartItems, onUpdateQuantity, onClearCart }: CartScreenProps) {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 10;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = () => {
    onNavigate('payment-selection');
  };

  if (cartItems.length === 0) {
    return (
      <div className="h-full bg-[#F8F9FA] flex flex-col">
        <div className="bg-white border-b border-[#E5E7EB] px-6 py-4 flex items-center space-x-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center hover:bg-[#E5E7EB] transition-colors active:scale-95"
          >
            <ArrowLeft className="w-5 h-5 text-[#1F2937]" />
          </button>
          <h2 className="text-[#1F2937]">Your Cart</h2>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="w-32 h-32 rounded-full bg-[#F3F4F6] flex items-center justify-center mb-4">
            <span className="text-6xl">🛒</span>
          </div>
          <h3 className="text-[#1F2937] mb-2">Your cart is empty</h3>
          <p className="text-[#6B7280] text-center mb-6">Add items from the menu to get started</p>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-[#2D6A4F] text-white rounded-xl hover:bg-[#40916C] transition-colors active:scale-95"
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-[#F8F9FA] flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center hover:bg-[#E5E7EB] transition-colors active:scale-95"
          >
            <ArrowLeft className="w-5 h-5 text-[#1F2937]" />
          </button>
          <h2 className="text-[#1F2937]">Your Cart</h2>
        </div>
        <button
          onClick={onClearCart}
          className="text-[#DC2626] hover:text-[#B91C1C] transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
        {cartItems.map((item) => (
          <CartItemCard
            key={item.id}
            item={item}
            onUpdateQuantity={onUpdateQuantity}
          />
        ))}
      </div>

      {/* Order Summary */}
      <div className="bg-white border-t border-[#E5E7EB] px-6 py-6 space-y-4">
        {/* Delivery Instructions */}
        <div>
          <label className="text-[#6B7280] block mb-2">
            Delivery Instructions (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g., Leave at door, Building A"
            className="w-full px-4 py-3 bg-[#F8F9FA] rounded-xl border-2 border-transparent focus:border-[#2D6A4F] transition-all outline-none text-[#1F2937] placeholder:text-[#9CA3AF]"
          />
        </div>

        {/* Price Breakdown */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[#6B7280]">
            <span>Subtotal</span>
            <span>{subtotal} MAD</span>
          </div>
          <div className="flex items-center justify-between text-[#6B7280]">
            <span>Delivery Fee</span>
            <span>{deliveryFee} MAD</span>
          </div>
          <div className="h-px bg-[#E5E7EB]"></div>
          <div className="flex items-center justify-between text-[#1F2937]">
            <span>Total</span>
            <span>{total} MAD</span>
          </div>
        </div>

        {/* Place Order Button */}
        <button
          onClick={handlePlaceOrder}
          className="w-full bg-[#2D6A4F] text-white rounded-2xl py-4 shadow-lg shadow-[#2D6A4F]/30 hover:bg-[#40916C] transition-all active:scale-95"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

function CartItemCard({ item, onUpdateQuantity }: CartItemCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden flex">
      <div className="w-24 h-24 flex-shrink-0">
        <ImageWithFallback
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h4 className="text-[#1F2937]">{item.name}</h4>
            <p className="text-[#2D6A4F] mt-1">{item.price} MAD</p>
          </div>
          <button
            onClick={() => onUpdateQuantity(item.id, 0)}
            className="text-[#DC2626] hover:text-[#B91C1C] transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            className="w-8 h-8 rounded-full bg-[#F3F4F6] flex items-center justify-center hover:bg-[#E5E7EB] transition-colors active:scale-95"
          >
            <Minus className="w-4 h-4 text-[#1F2937]" />
          </button>
          <span className="text-[#1F2937] w-8 text-center">{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="w-8 h-8 rounded-full bg-[#2D6A4F] flex items-center justify-center hover:bg-[#40916C] transition-colors active:scale-95"
          >
            <Plus className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}