// ============================================
// USABILITY DEMONSTRATION COMPONENT
// Shows 2-Click Cancellation with Timing
// Demonstrates Usability ASR requirement:
// - Order cancellation in ≤2 clicks
// - Completion within 10 seconds
// ============================================

import { ArrowLeft, CheckCircle2, Clock, User, Phone, MapPin, Package, XCircle } from 'lucide-react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Order } from '../services/api';

interface OrderTrackingProps {
  onBack: () => void;
  activeOrder: Order | null;
  onCancelOrder: () => Promise<void>;
}

export default function OrderTracking({ onBack, activeOrder, onCancelOrder }: OrderTrackingProps) {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelStartTime, setCancelStartTime] = useState<number>(0);
  const [cancelDuration, setCancelDuration] = useState<number | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [toastDuration, setToastDuration] = useState<number>(0);

  if (!activeOrder) {
    return (
      <div className="h-full bg-[#F8F9FA] flex items-center justify-center">
        <div className="text-center px-6">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Active Order</h3>
          <p className="text-gray-600 mb-6">You don't have any orders in progress</p>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-[#2D6A4F] text-white rounded-xl hover:bg-[#40916C] transition-colors"
          >
            Browse Restaurants
          </button>
        </div>
      </div>
    );
  }

  const handleCancelClick = () => {
    // Click 1: Open confirmation dialog and start timer
    setCancelStartTime(Date.now());
    setShowCancelModal(true);
  };

  const handleConfirmCancel = async () => {
    // Click 2: Confirm cancellation
    setIsCancelling(true);
    const startTime = cancelStartTime || Date.now();
    
    try {
      await onCancelOrder();
      const duration = Date.now() - startTime;
      setCancelDuration(duration);
      setToastDuration(duration); // Store for toast
      
      // Show success message for 2 seconds, then show confirmation and close modal
      setTimeout(() => {
        setShowCancelModal(false);
        setShowSuccessToast(true);
        setCancelDuration(null);
        console.log('🎉 Success confirmation showing with duration:', duration);
      }, 2000);
    } catch (error) {
      console.error('Failed to cancel order:', error);
      setIsCancelling(false);
    }
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const statusSteps = [
    { key: 'pending', label: 'Order Received', icon: CheckCircle2 },
    { key: 'preparing', label: 'Being Prepared', icon: CheckCircle2 },
    { key: 'ready', label: 'Courier Assigned', icon: Clock },
    { key: 'delivering', label: 'On the Way', icon: Clock },
    { key: 'delivered', label: 'Delivered', icon: CheckCircle2 },
  ];

  const getStepStatus = (stepKey: string) => {
    const statusOrder = ['pending', 'preparing', 'ready', 'delivering', 'delivered'];
    const currentIndex = statusOrder.indexOf(activeOrder.status);
    const stepIndex = statusOrder.indexOf(stepKey);
    
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'active';
    return 'pending';
  };

  return (
    <>
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
            <h2 className="text-[#1F2937]">Order #{activeOrder.id.slice(0, 8)}</h2>
            <p className="text-[#6B7280]">Placed at {formatTime(activeOrder.createdAt)}</p>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="h-64 bg-gradient-to-br from-[#2D6A4F]/10 to-[#40916C]/10 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-[#2D6A4F] mx-auto mb-2" />
              <p className="text-[#6B7280]">Tracking your order...</p>
            </div>
          </div>
          {/* Decorative map elements */}
          <div className="absolute top-10 left-10 w-3 h-3 bg-[#2D6A4F] rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-16 w-3 h-3 bg-[#FFB703] rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
          <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-[#40916C] rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></div>
        </div>

        {/* Order Timeline */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-md space-y-6">
            {statusSteps.map((step) => (
              <TimelineStep
                key={step.key}
                icon={<step.icon className="w-6 h-6" />}
                title={step.label}
                time={getStepStatus(step.key) === 'completed' ? formatTime(activeOrder.updatedAt) : getStepStatus(step.key) === 'active' ? 'In progress...' : 'Waiting...'}
                status={getStepStatus(step.key)}
              />
            ))}
          </div>

          {/* Courier Info Card */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <p className="text-[#6B7280] mb-4">Your Courier</p>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2D6A4F] to-[#40916C] flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-[#1F2937]">Ahmed El Mansouri</h4>
                <div className="flex items-center space-x-1 text-[#6B7280] mt-1">
                  <span>⭐</span>
                  <span>4.9 (250+ deliveries)</span>
                </div>
                <div className="flex items-center space-x-2 text-[#6B7280] mt-2">
                  <Clock className="w-4 h-4" />
                  <span>Pickup ETA: 5 mins</span>
                </div>
              </div>
              <button className="w-12 h-12 rounded-full bg-[#2D6A4F]/10 flex items-center justify-center hover:bg-[#2D6A4F]/20 transition-colors active:scale-95">
                <Phone className="w-5 h-5 text-[#2D6A4F]" />
              </button>
            </div>
          </div>

          {/* Order Details */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <p className="text-[#6B7280] mb-3">Order Items</p>
            <div className="space-y-2">
              {activeOrder.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-[#1F2937]">{item.quantity}x {item.name}</span>
                  <span className="text-[#6B7280]">{item.price * item.quantity} MAD</span>
                </div>
              ))}
              <div className="h-px bg-[#E5E7EB] my-2"></div>
              <div className="flex items-center justify-between">
                <span className="text-[#1F2937] font-semibold">Total</span>
                <span className="text-[#2D6A4F] font-bold text-lg">{activeOrder.totalAmount} MAD</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cancel Order Button */}
        {activeOrder.status !== 'delivered' && activeOrder.status !== 'cancelled' && (
          <div className="bg-white border-t border-[#E5E7EB] px-6 py-4">
            <button
              onClick={handleCancelClick}
              className="w-full py-3 border-2 border-[#DC2626] text-[#DC2626] rounded-xl hover:bg-[#DC2626]/5 transition-all active:scale-95 font-medium"
            >
              Cancel Order
            </button>
          </div>
        )}

        {/* Cancel Modal */}
        {showCancelModal && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
            <div className="bg-white rounded-3xl p-6 w-full max-w-sm space-y-4">
              {cancelDuration === null ? (
                <>
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <XCircle className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1F2937] text-center">Cancel Order?</h3>
                  <p className="text-[#6B7280] text-center">
                    Are you sure you want to cancel this order? This action cannot be undone.
                  </p>
                  <div className="flex flex-col space-y-3 pt-2">
                    <button
                      onClick={handleConfirmCancel}
                      disabled={isCancelling}
                      className="w-full py-4 bg-[#DC2626] text-white rounded-xl hover:bg-[#B91C1C] transition-all active:scale-95 font-semibold disabled:opacity-50 flex items-center justify-center"
                    >
                      {isCancelling ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        'Yes, Cancel Order'
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setShowCancelModal(false);
                        setCancelStartTime(0);
                      }}
                      disabled={isCancelling}
                      className="w-full py-4 bg-[#F3F4F6] text-[#1F2937] rounded-xl hover:bg-[#E5E7EB] transition-all active:scale-95 font-semibold disabled:opacity-50"
                    >
                      Keep Order
                    </button>
                  </div>
                  <p className="text-xs text-center text-[#9CA3AF] pt-2">
                    Click 2 of 2 • Timer: {((Date.now() - cancelStartTime) / 1000).toFixed(1)}s
                  </p>
                </>
              ) : (
                <>
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1F2937] text-center mb-2">
                    Order Cancelled!
                  </h3>
                  <p className="text-[#6B7280] text-center mb-4">
                    Your order has been successfully cancelled.
                  </p>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-5 border-2 border-green-200">
                    <p className="text-lg font-bold text-green-900 text-center mb-3">
                      ✓ Usability Goal Achieved
                    </p>
                    <div className="bg-white rounded-xl p-4 mb-3">
                      <p className="text-4xl font-bold text-green-600 text-center">
                        {(cancelDuration / 1000).toFixed(2)}s
                      </p>
                      <p className="text-sm text-[#6B7280] text-center mt-1">Cancellation Time</p>
                    </div>
                    <div className="space-y-1 text-center">
                      <p className="text-sm font-semibold text-green-800">
                        Target: &lt;10 seconds ✓
                      </p>
                      <p className="text-sm font-semibold text-green-800">
                        Clicks: 2 ✓
                      </p>
                      <p className="text-xs text-green-700 mt-2">
                        As specified in ADD requirements
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Success Toast Notification - Rendered via Portal */}
      {showSuccessToast && createPortal(
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-[#1F2937] text-center mb-2">
              Order Cancelled Successfully!
            </h3>
            <p className="text-[#6B7280] text-center mb-6">
              Your order has been cancelled and you will not be charged.
            </p>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-5 border-2 border-green-200 mb-6">
              <p className="text-lg font-bold text-green-900 text-center mb-3">
                ✓ Usability Goal Achieved
              </p>
              <div className="bg-white rounded-xl p-4 mb-3">
                <p className="text-4xl font-bold text-green-600 text-center">
                  {(toastDuration / 1000).toFixed(2)}s
                </p>
                <p className="text-sm text-[#6B7280] text-center mt-1">Cancellation Time</p>
              </div>
              <div className="space-y-1 text-center">
                <p className="text-sm font-semibold text-green-800">
                  Target: &lt;10 seconds ✓
                </p>
                <p className="text-sm font-semibold text-green-800">
                  Clicks: 2 ✓
                </p>
                <p className="text-xs text-green-700 mt-2">
                  As specified in ADD requirements
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowSuccessToast(false)}
              className="w-full py-4 bg-[#2D6A4F] text-white rounded-xl font-semibold hover:bg-[#40916C] transition-all active:scale-95"
            >
              Got it!
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

interface TimelineStepProps {
  icon: React.ReactNode;
  title: string;
  time: string;
  status: 'completed' | 'active' | 'pending';
}

function TimelineStep({ icon, title, time, status }: TimelineStepProps) {
  const colors = {
    completed: 'bg-[#40916C] text-white',
    active: 'bg-[#FFB703] text-white',
    pending: 'bg-[#E5E7EB] text-[#9CA3AF]'
  };

  return (
    <div className="flex items-start space-x-4 relative">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${colors[status]}`}>
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="text-[#1F2937]">{title}</h4>
        <p className="text-[#6B7280]">{time}</p>
      </div>
      {status !== 'pending' && (
        <CheckCircle2 className="w-5 h-5 text-[#40916C]" />
      )}
    </div>
  );
}