import { AlertCircle } from 'lucide-react';

interface NewOrderConfirmationModalProps {
  onCancel: () => void;
  onConfirmStartNew: () => void;
  orderNumber?: number;
}

export default function NewOrderConfirmationModal({ onCancel, onConfirmStartNew, orderNumber }: NewOrderConfirmationModalProps) {
  return (
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-6 z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl p-6 w-full max-w-sm space-y-4 animate-in zoom-in-95 duration-200">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-[#FFB703]/10 flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-6 h-6 text-[#FFB703]" />
          </div>
          <h3 className="text-[#1F2937]">Start new order?</h3>
        </div>
        
        <p className="text-[#6B7280]">
          This will cancel your existing active order. Are you sure you want to continue?
        </p>

        <div className="bg-[#DC2626]/10 border border-[#DC2626]/20 rounded-xl p-3">
          <p className="text-[#DC2626]">
            ⚠️ Your current order{orderNumber ? ` (#${orderNumber})` : ''} will be cancelled
          </p>
        </div>

        <div className="flex space-x-3 pt-2">
          <button
            onClick={onCancel}
            className="flex-1 py-3 bg-[#F3F4F6] text-[#1F2937] rounded-xl hover:bg-[#E5E7EB] transition-colors active:scale-95"
          >
            Cancel
          </button>
          <button
            onClick={onConfirmStartNew}
            className="flex-1 py-3 bg-[#DC2626] text-white rounded-xl hover:bg-[#B91C1C] transition-colors active:scale-95"
          >
            Start New
          </button>
        </div>

        <p className="text-center text-[#9CA3AF] text-xs">
          Note: This is a prototype flow only
        </p>
      </div>
    </div>
  );
}
