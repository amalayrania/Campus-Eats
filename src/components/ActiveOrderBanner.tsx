import { AlertCircle } from 'lucide-react';

interface ActiveOrderBannerProps {
  onResumeOrder: () => void;
  onStartNew: () => void;
}

export default function ActiveOrderBanner({ onResumeOrder, onStartNew }: ActiveOrderBannerProps) {
  return (
    <div className="bg-white border-b border-[#E5E7EB] mx-6 mt-4 mb-2 rounded-xl overflow-hidden shadow-sm">
      <div className="flex items-stretch">
        {/* Left color bar */}
        <div className="w-1 bg-[#2D6A4F] flex-shrink-0"></div>
        
        {/* Content */}
        <div className="flex-1 bg-[#1F2937] p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-[#FFB703] flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-white mb-3">
                Active order in progress — you still have an open order from Proxy. Resume or start new?
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={onResumeOrder}
                  className="px-4 py-2 bg-[#2D6A4F] text-white rounded-lg hover:bg-[#40916C] transition-colors active:scale-95"
                >
                  Resume Order
                </button>
                <button
                  onClick={onStartNew}
                  className="px-4 py-2 bg-[#6B7280] text-white rounded-lg hover:bg-[#4B5563] transition-colors active:scale-95"
                >
                  Start New Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
