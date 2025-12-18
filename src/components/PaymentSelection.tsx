import { ArrowLeft, CreditCard, Banknote, Check } from 'lucide-react';
import { useState } from 'react';
import { Screen } from '../App';

interface PaymentSelectionProps {
  onBack: () => void;
  onNavigate: (screen: Screen) => void;
  totalAmount: number;
}

export default function PaymentSelection({ onBack, onNavigate, totalAmount }: PaymentSelectionProps) {
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'cash' | null>(null);

  const handleContinue = () => {
    if (selectedMethod === 'card') {
      onNavigate('card-entry');
    } else if (selectedMethod === 'cash') {
      onNavigate('order-confirmation');
    }
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
        <h2 className="text-[#1F2937]">Choose a payment method</h2>
      </div>

      {/* Payment Options */}
      <div className="flex-1 px-6 py-6 space-y-4">
        {/* Card Payment */}
        <button
          onClick={() => setSelectedMethod('card')}
          className={`w-full bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all text-left border-2 ${
            selectedMethod === 'card' ? 'border-[#2D6A4F]' : 'border-transparent'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-[#2D6A4F]/10 flex items-center justify-center flex-shrink-0">
                <CreditCard className="w-6 h-6 text-[#2D6A4F]" />
              </div>
              <div>
                <h3 className="text-[#1F2937] mb-1">Card</h3>
                <p className="text-[#6B7280]">Pay now with card</p>
              </div>
            </div>
            {selectedMethod === 'card' && (
              <div className="w-6 h-6 rounded-full bg-[#2D6A4F] flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        </button>

        {/* Cash on Delivery */}
        <button
          onClick={() => setSelectedMethod('cash')}
          className={`w-full bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all text-left border-2 ${
            selectedMethod === 'cash' ? 'border-[#2D6A4F]' : 'border-transparent'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-[#FFB703]/10 flex items-center justify-center flex-shrink-0">
                <Banknote className="w-6 h-6 text-[#FFB703]" />
              </div>
              <div>
                <h3 className="text-[#1F2937] mb-1">Cash on delivery</h3>
                <p className="text-[#6B7280]">Pay when the rider arrives</p>
              </div>
            </div>
            {selectedMethod === 'cash' && (
              <div className="w-6 h-6 rounded-full bg-[#2D6A4F] flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        </button>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl p-6 shadow-md mt-6">
          <p className="text-[#6B7280] mb-2">Order Total</p>
          <p className="text-[#2D6A4F] text-2xl">{totalAmount} MAD</p>
        </div>
      </div>

      {/* Continue Button */}
      <div className="bg-white border-t border-[#E5E7EB] px-6 py-4">
        <button
          onClick={handleContinue}
          disabled={!selectedMethod}
          className={`w-full rounded-2xl py-4 shadow-lg transition-all active:scale-95 ${
            selectedMethod
              ? 'bg-[#2D6A4F] text-white shadow-[#2D6A4F]/30 hover:bg-[#40916C]'
              : 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
