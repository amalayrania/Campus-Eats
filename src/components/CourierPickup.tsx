import { ArrowLeft, MapPin, Phone, CheckCircle } from 'lucide-react';
import { Screen } from '../App';

interface CourierPickupProps {
  onBack: () => void;
  onNavigate: (screen: Screen) => void;
}

export default function CourierPickup({ onBack, onNavigate }: CourierPickupProps) {
  return (
    <div className="h-full bg-[#F8F9FA] flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E7EB] px-6 py-4 flex items-center space-x-4">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center hover:bg-[#E5E7EB] transition-colors active:scale-95"
        >
          <ArrowLeft className="w-5 h-5 text-[#1F2937]" />
        </button>
        <div className="flex-1">
          <h2 className="text-[#1F2937]">Order #318</h2>
          <p className="text-[#6B7280]">Pickup at Proxy</p>
        </div>
        <div className="px-3 py-1 bg-[#FFB703] text-white rounded-full">
          +35 MAD
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="h-64 bg-gradient-to-br from-[#2D6A4F]/10 to-[#40916C]/10 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-16 h-16 text-[#2D6A4F] mx-auto mb-2" />
            <p className="text-[#6B7280]">0.8 km away</p>
            <p className="text-[#2D6A4F]">5 min walk</p>
          </div>
        </div>
      </div>

      {/* Order Details */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
        {/* Restaurant Info */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[#6B7280] mb-1">Restaurant</p>
              <h3 className="text-[#1F2937]">Proxy</h3>
              <p className="text-[#6B7280]">Main Campus Building, Ground Floor</p>
            </div>
            <button className="w-12 h-12 rounded-full bg-[#2D6A4F]/10 flex items-center justify-center hover:bg-[#2D6A4F]/20 transition-colors active:scale-95">
              <Phone className="w-5 h-5 text-[#2D6A4F]" />
            </button>
          </div>
          <div className="bg-[#F8F9FA] rounded-xl p-4">
            <p className="text-[#6B7280] mb-2">Operating Hours</p>
            <p className="text-[#1F2937]">Open • Closes at 10:00 PM</p>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h4 className="text-[#1F2937] mb-4">Items to Pick Up</h4>
          <div className="space-y-3">
            <OrderItem
              quantity={2}
              name="Shawarma"
              special="No onions"
            />
            <div className="h-px bg-[#E5E7EB]"></div>
            <OrderItem
              quantity={1}
              name="Pizza Margarita"
              special="Extra cheese"
            />
            <div className="h-px bg-[#E5E7EB]"></div>
            <OrderItem
              quantity={1}
              name="Frosty Fries"
              special="Large size"
            />
          </div>
          <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
            <p className="text-[#6B7280]">Total Items: 4</p>
          </div>
        </div>

        {/* Customer Info */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <p className="text-[#6B7280] mb-3">Deliver to</p>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2D6A4F] to-[#40916C] flex items-center justify-center">
              <span className="text-white">S</span>
            </div>
            <div className="flex-1">
              <h4 className="text-[#1F2937]">Sarah Ahmed</h4>
              <p className="text-[#6B7280]">Student</p>
            </div>
          </div>
          <div className="mt-4 flex items-start space-x-2">
            <MapPin className="w-5 h-5 text-[#6B7280] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[#1F2937]">Building C, Room 204</p>
              <p className="text-[#6B7280]">Second Floor</p>
            </div>
          </div>
        </div>

        {/* Special Instructions */}
        <div className="bg-[#FFB703]/10 border-2 border-[#FFB703]/30 rounded-2xl p-4">
          <p className="text-[#1F2937] mb-1">⚠️ Special Instructions</p>
          <p className="text-[#6B7280]">
            Please ring doorbell. If no answer, leave at door and text me.
          </p>
        </div>
      </div>

      {/* Confirm Pickup Button */}
      <div className="bg-white border-t border-[#E5E7EB] px-6 py-4">
        <button
          onClick={() => onNavigate('courier-delivery')}
          className="w-full bg-[#2D6A4F] text-white rounded-2xl py-4 shadow-lg shadow-[#2D6A4F]/30 hover:bg-[#40916C] transition-all active:scale-95 flex items-center justify-center space-x-2"
        >
          <CheckCircle className="w-5 h-5" />
          <span>Confirm Pickup</span>
        </button>
      </div>
    </div>
  );
}

interface OrderItemProps {
  quantity: number;
  name: string;
  special?: string;
}

function OrderItem({ quantity, name, special }: OrderItemProps) {
  return (
    <div className="flex items-start space-x-3">
      <div className="w-8 h-8 rounded-lg bg-[#2D6A4F]/10 flex items-center justify-center flex-shrink-0">
        <span className="text-[#2D6A4F]">{quantity}x</span>
      </div>
      <div className="flex-1">
        <p className="text-[#1F2937]">{name}</p>
        {special && (
          <p className="text-[#6B7280] italic">Note: {special}</p>
        )}
      </div>
    </div>
  );
}