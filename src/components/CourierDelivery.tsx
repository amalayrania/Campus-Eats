import { ArrowLeft, MapPin, Phone, CheckCircle, AlertCircle } from 'lucide-react';
import { Screen } from '../App';
import { useState } from 'react';

interface CourierDeliveryProps {
  onBack: () => void;
  onNavigate: (screen: Screen) => void;
}

export default function CourierDelivery({ onBack, onNavigate }: CourierDeliveryProps) {
  const [showProblemModal, setShowProblemModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleCompleteDelivery = () => {
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      onNavigate('courier-dashboard');
    }, 2000);
  };

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
          <h2 className="text-[#1F2937]">Delivering Order #318</h2>
          <p className="text-[#6B7280]">On the way to Building C</p>
        </div>
      </div>

      {/* Map with Destination */}
      <div className="h-64 bg-gradient-to-br from-[#FFB703]/10 to-[#2D6A4F]/10 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-[#FFB703] flex items-center justify-center mx-auto mb-3 animate-pulse">
              <MapPin className="w-10 h-10 text-white" />
            </div>
            <p className="text-[#1F2937]">Building C, Room 204</p>
            <p className="text-[#6B7280]">200m away</p>
            <p className="text-[#FFB703]">2 min walk</p>
          </div>
        </div>
      </div>

      {/* Customer Info */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#2D6A4F] to-[#40916C] flex items-center justify-center">
                <span className="text-white text-xl">S</span>
              </div>
              <div>
                <h3 className="text-[#1F2937]">Sarah Ahmed</h3>
                <p className="text-[#6B7280]">Student</p>
              </div>
            </div>
            <button className="w-12 h-12 rounded-full bg-[#2D6A4F]/10 flex items-center justify-center hover:bg-[#2D6A4F]/20 transition-colors active:scale-95">
              <Phone className="w-5 h-5 text-[#2D6A4F]" />
            </button>
          </div>

          <div className="bg-[#F8F9FA] rounded-xl p-4 space-y-3">
            <div className="flex items-start space-x-2">
              <MapPin className="w-5 h-5 text-[#6B7280] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[#1F2937]">Building C, Room 204</p>
                <p className="text-[#6B7280]">Second Floor, Right Wing</p>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Instructions */}
        <div className="bg-[#FFB703]/10 border-2 border-[#FFB703]/30 rounded-2xl p-4">
          <p className="text-[#1F2937] mb-2">📝 Delivery Instructions</p>
          <p className="text-[#6B7280]">
            Please ring doorbell. If no answer, leave at door and text me.
          </p>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h4 className="text-[#1F2937] mb-3">Order Summary</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[#6B7280]">2x Shawarma</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#6B7280]">1x Pizza Margarita</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#6B7280]">1x Frosty Fries</span>
            </div>
            <div className="h-px bg-[#E5E7EB] my-2"></div>
            <div className="flex items-center justify-between">
              <span className="text-[#1F2937]">Your Earnings</span>
              <span className="text-[#FFB703]">+35 MAD</span>
            </div>
          </div>
        </div>

        {/* Tips Card */}
        <div className="bg-gradient-to-r from-[#2D6A4F] to-[#40916C] rounded-2xl p-6 text-white">
          <h4 className="mb-2">💡 Delivery Tips</h4>
          <ul className="space-y-2">
            <li className="flex items-start space-x-2">
              <span className="flex-shrink-0">•</span>
              <span>Handle food carefully to maintain quality</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="flex-shrink-0">•</span>
              <span>Confirm with customer before leaving</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="flex-shrink-0">•</span>
              <span>Be friendly and professional</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white border-t border-[#E5E7EB] px-6 py-4 space-y-3">
        <button
          onClick={handleCompleteDelivery}
          className="w-full bg-[#2D6A4F] text-white rounded-2xl py-4 shadow-lg shadow-[#2D6A4F]/30 hover:bg-[#40916C] transition-all active:scale-95 flex items-center justify-center space-x-2"
        >
          <CheckCircle className="w-5 h-5" />
          <span>Complete Delivery</span>
        </button>
        <button
          onClick={() => setShowProblemModal(true)}
          className="w-full py-3 border-2 border-[#DC2626] text-[#DC2626] rounded-xl hover:bg-[#DC2626]/5 transition-all active:scale-95"
        >
          Problem with order?
        </button>
      </div>

      {/* Problem Modal */}
      {showProblemModal && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm space-y-4">
            <div className="flex items-center space-x-3 mb-2">
              <AlertCircle className="w-6 h-6 text-[#DC2626]" />
              <h3 className="text-[#1F2937]">Report a Problem</h3>
            </div>
            <div className="space-y-2">
              <button className="w-full py-3 bg-[#F8F9FA] text-[#1F2937] rounded-xl hover:bg-[#E5E7EB] transition-colors text-left px-4">
                Customer not available
              </button>
              <button className="w-full py-3 bg-[#F8F9FA] text-[#1F2937] rounded-xl hover:bg-[#E5E7EB] transition-colors text-left px-4">
                Wrong address
              </button>
              <button className="w-full py-3 bg-[#F8F9FA] text-[#1F2937] rounded-xl hover:bg-[#E5E7EB] transition-colors text-left px-4">
                Order damaged/spilled
              </button>
              <button className="w-full py-3 bg-[#F8F9FA] text-[#1F2937] rounded-xl hover:bg-[#E5E7EB] transition-colors text-left px-4">
                Other issue
              </button>
            </div>
            <button
              onClick={() => setShowProblemModal(false)}
              className="w-full py-3 bg-[#2D6A4F] text-white rounded-xl hover:bg-[#40916C] transition-colors active:scale-95"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-3xl p-8 w-full max-w-sm text-center">
            <div className="w-20 h-20 rounded-full bg-[#40916C] flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-[#1F2937] mb-2">Delivery Completed!</h3>
            <p className="text-[#6B7280] mb-4">You earned +35 MAD</p>
            <div className="flex space-x-1 justify-center">
              <div className="w-2 h-2 rounded-full bg-[#2D6A4F] animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-[#2D6A4F] animate-pulse delay-150"></div>
              <div className="w-2 h-2 rounded-full bg-[#2D6A4F] animate-pulse delay-300"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}