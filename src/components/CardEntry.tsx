import { ArrowLeft, CreditCard, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { Screen } from '../App';

interface CardEntryProps {
  onBack: () => void;
  onNavigate: (screen: Screen) => void;
  totalAmount: number;
}

export default function CardEntry({ onBack, onNavigate, totalAmount }: CardEntryProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted.slice(0, 19); // 16 digits + 3 spaces
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  const validateCard = () => {
    const cleaned = cardNumber.replace(/\s/g, '');
    if (cleaned.length !== 16) {
      setError('Invalid card number');
      return false;
    }
    if (!cardHolder.trim()) {
      setError('Cardholder name is required');
      return false;
    }
    if (expiry.length !== 5) {
      setError('Invalid expiry date');
      return false;
    }
    if (cvc.length !== 3) {
      setError('Invalid CVC');
      return false;
    }
    setError('');
    return true;
  };

  const handlePayment = () => {
    if (validateCard()) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onNavigate('order-confirmation');
      }, 2000);
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
        <h2 className="text-[#1F2937]">Card Payment</h2>
      </div>

      {/* Card Preview */}
      <div className="px-6 py-6">
        <div className="bg-gradient-to-br from-[#2D6A4F] to-[#40916C] rounded-2xl p-6 text-white shadow-lg">
          <div className="flex justify-between items-start mb-8">
            <CreditCard className="w-10 h-10" />
            <p className="text-sm opacity-80">Campus Eats</p>
          </div>
          <p className="text-xl tracking-wider mb-4">
            {cardNumber || '#### #### #### ####'}
          </p>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs opacity-80 mb-1">Cardholder</p>
              <p>{cardHolder || 'Full name'}</p>
            </div>
            <div>
              <p className="text-xs opacity-80 mb-1">Expires</p>
              <p>{expiry || 'MM/YY'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 space-y-4 overflow-y-auto pb-6">
        {/* Card Holder Name */}
        <div>
          <label className="block text-[#6B7280] mb-2">Cardholder name</label>
          <input
            type="text"
            placeholder="Full name"
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value)}
            className="w-full px-4 py-3 bg-white rounded-xl border border-[#E5E7EB] outline-none focus:border-[#2D6A4F] transition-colors"
          />
        </div>

        {/* Card Number */}
        <div>
          <label className="block text-[#6B7280] mb-2">Card number</label>
          <input
            type="text"
            placeholder="#### #### #### ####"
            value={cardNumber}
            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
            className="w-full px-4 py-3 bg-white rounded-xl border border-[#E5E7EB] outline-none focus:border-[#2D6A4F] transition-colors"
          />
        </div>

        {/* Expiry and CVC */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-[#6B7280] mb-2">Expiry</label>
            <input
              type="text"
              placeholder="MM/YY"
              value={expiry}
              onChange={(e) => setExpiry(formatExpiry(e.target.value))}
              className="w-full px-4 py-3 bg-white rounded-xl border border-[#E5E7EB] outline-none focus:border-[#2D6A4F] transition-colors"
            />
          </div>
          <div className="flex-1">
            <label className="block text-[#6B7280] mb-2">CVC</label>
            <input
              type="text"
              placeholder="###"
              value={cvc}
              onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 3))}
              className="w-full px-4 py-3 bg-white rounded-xl border border-[#E5E7EB] outline-none focus:border-[#2D6A4F] transition-colors"
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-[#DC2626]/10 border border-[#DC2626]/30 rounded-xl p-3">
            <p className="text-[#DC2626]">{error}</p>
          </div>
        )}

        {/* Amount */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-[#6B7280]">Amount to pay</span>
            <span className="text-[#2D6A4F] text-2xl">{totalAmount} MAD</span>
          </div>
        </div>
      </div>

      {/* Pay Button */}
      <div className="bg-white border-t border-[#E5E7EB] px-6 py-4">
        <button
          onClick={handlePayment}
          className="w-full bg-[#2D6A4F] text-white rounded-2xl py-4 shadow-lg shadow-[#2D6A4F]/30 hover:bg-[#40916C] transition-all active:scale-95"
        >
          Pay {totalAmount} MAD
        </button>
      </div>

      {/* Success Toast */}
      {showSuccess && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-white rounded-2xl p-4 shadow-2xl flex items-center space-x-3 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="w-10 h-10 rounded-full bg-[#40916C] flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-[#1F2937]">Payment successful</p>
            <p className="text-[#6B7280]">Order placed</p>
          </div>
        </div>
      )}
    </div>
  );
}
