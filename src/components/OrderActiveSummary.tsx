import { ArrowLeft, Clock, MapPin, Package } from 'lucide-react';
import { Screen } from '../App';

interface OrderActiveSummaryProps {
  onBack: () => void;
  onNavigate: (screen: Screen) => void;
}

export default function OrderActiveSummary({ onBack, onNavigate }: OrderActiveSummaryProps) {
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
          <h2 className="text-[#1F2937]">Active Order</h2>
          <p className="text-[#6B7280]">Order #314 from Proxy</p>
        </div>
      </div>

      {/* Status Banner */}
      <div className="px-6 py-4 bg-gradient-to-r from-[#FFB703]/10 to-[#FFB703]/5 border-b border-[#FFB703]/20">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-[#FFB703] flex items-center justify-center">
            <Package className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-[#1F2937]">Being Prepared</p>
            <p className="text-[#6B7280]">Your food is being prepared</p>
          </div>
          <Clock className="w-5 h-5 text-[#FFB703]" />
        </div>
      </div>

      {/* Order Details */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
        {/* Items */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h3 className="text-[#1F2937] mb-4">Order Items</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
              <div className="flex-1">
                <p className="text-[#1F2937]">2x Shawarma</p>
                <p className="text-[#6B7280]">No onions</p>
              </div>
              <span className="text-[#6B7280]">90 MAD</span>
            </div>
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
              <div className="flex-1">
                <p className="text-[#1F2937]">1x Pizza Margarita</p>
                <p className="text-[#6B7280]">Extra cheese</p>
              </div>
              <span className="text-[#6B7280]">50 MAD</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[#1F2937]">Total</p>
              <p className="text-[#2D6A4F] text-xl">140 MAD</p>
            </div>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h3 className="text-[#1F2937] mb-4">Delivery Information</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-[#2D6A4F] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[#1F2937]">Building C, Room 204</p>
                <p className="text-[#6B7280]">Second Floor</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-[#2D6A4F] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[#1F2937]">Estimated Delivery</p>
                <p className="text-[#6B7280]">15-20 minutes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Status */}
        <div className="bg-[#FFB703]/10 border border-[#FFB703]/30 rounded-2xl p-4">
          <p className="text-[#1F2937] mb-1">💳 Payment Method</p>
          <p className="text-[#6B7280]">Cash on Delivery - 140 MAD</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white border-t border-[#E5E7EB] px-6 py-4 space-y-3">
        <button
          onClick={() => onNavigate('tracking')}
          className="w-full bg-[#2D6A4F] text-white rounded-2xl py-4 shadow-lg shadow-[#2D6A4F]/30 hover:bg-[#40916C] transition-all active:scale-95"
        >
          Track Live Order
        </button>
        <button
          onClick={onBack}
          className="w-full py-3 border-2 border-[#DC2626] text-[#DC2626] rounded-xl hover:bg-[#DC2626]/5 transition-all active:scale-95"
        >
          Cancel Order
        </button>
      </div>
    </div>
  );
}
