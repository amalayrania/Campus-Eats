import { Package, DollarSign, Clock, MapPin, ArrowRight, ArrowLeft } from 'lucide-react';
import { Screen } from '../App';
import { useState } from 'react';

interface CourierDashboardProps {
  onNavigate: (screen: Screen) => void;
  onBackToCustomer: () => void;
}

export default function CourierDashboard({ onNavigate, onBackToCustomer }: CourierDashboardProps) {
  const [isOnline, setIsOnline] = useState(false);

  return (
    <div className="h-full bg-[#F8F9FA] overflow-y-auto pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#2D6A4F] to-[#40916C] px-6 pt-12 pb-8 rounded-b-[32px]">
        {/* Back Button */}
        <button
          onClick={onBackToCustomer}
          className="mb-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all active:scale-95"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        <h2 className="text-white mb-2">
          Courier Dashboard
        </h2>
        <p className="text-white/90">
          Earn money delivering to campus
        </p>
        
        {/* Online Toggle */}
        <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-[#40916C]' : 'bg-[#9CA3AF]'} animate-pulse`}></div>
            <span className="text-white">
              {isOnline ? 'You are Online' : 'You are Offline'}
            </span>
          </div>
          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`px-6 py-2 rounded-xl transition-all active:scale-95 ${
              isOnline 
                ? 'bg-white/20 text-white hover:bg-white/30' 
                : 'bg-white text-[#2D6A4F] hover:bg-white/90'
            }`}
          >
            {isOnline ? 'Go Offline' : 'Go Online'}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-6 -mt-6 mb-6">
        <div className="grid grid-cols-3 gap-3">
          <StatCard
            icon={<Package className="w-5 h-5" />}
            value="12"
            label="Today"
            color="#2D6A4F"
          />
          <StatCard
            icon={<DollarSign className="w-5 h-5" />}
            value="420"
            label="MAD"
            color="#FFB703"
          />
          <StatCard
            icon={<Clock className="w-5 h-5" />}
            value="4.2"
            label="Avg Time"
            color="#40916C"
          />
        </div>
      </div>

      {/* Active Orders */}
      <div className="px-6 mb-6">
        <h3 className="text-[#1F2937] mb-4">Available Orders</h3>
        {!isOnline ? (
          <div className="bg-white rounded-2xl p-8 shadow-md text-center">
            <div className="w-16 h-16 rounded-full bg-[#F3F4F6] flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-[#9CA3AF]" />
            </div>
            <h4 className="text-[#1F2937] mb-2">Go Online to See Orders</h4>
            <p className="text-[#6B7280]">
              Switch your status to online to start accepting delivery requests
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <OrderCard
              orderId="#318"
              pickupLocation="Proxy"
              dropoffLocation="Building C, Room 204"
              distance="0.8 km"
              earnings={35}
              estimatedTime="15 min"
              onClick={() => onNavigate('courier-pickup')}
            />
            <OrderCard
              orderId="#319"
              pickupLocation="L'Italien"
              dropoffLocation="Library, 3rd Floor"
              distance="1.2 km"
              earnings={40}
              estimatedTime="20 min"
              onClick={() => onNavigate('courier-pickup')}
            />
            <OrderCard
              orderId="#320"
              pickupLocation="L'Américain"
              dropoffLocation="Dorm A, Room 115"
              distance="0.5 km"
              earnings={30}
              estimatedTime="10 min"
              onClick={() => onNavigate('courier-pickup')}
            />
          </div>
        )}
      </div>

      {/* Recent Deliveries */}
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#1F2937]">Recent Deliveries</h3>
          <button className="text-[#2D6A4F]">View All</button>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-md space-y-3">
          <RecentDelivery
            orderId="#315"
            time="1 hour ago"
            earnings={35}
          />
          <div className="h-px bg-[#E5E7EB]"></div>
          <RecentDelivery
            orderId="#312"
            time="2 hours ago"
            earnings={40}
          />
          <div className="h-px bg-[#E5E7EB]"></div>
          <RecentDelivery
            orderId="#308"
            time="3 hours ago"
            earnings={30}
          />
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  color: string;
}

function StatCard({ icon, value, label, color }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-md">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-2"
        style={{ backgroundColor: `${color}15`, color }}
      >
        {icon}
      </div>
      <p className="text-[#1F2937]">{value}</p>
      <p className="text-[#6B7280]">{label}</p>
    </div>
  );
}

interface OrderCardProps {
  orderId: string;
  pickupLocation: string;
  dropoffLocation: string;
  distance: string;
  earnings: number;
  estimatedTime: string;
  onClick: () => void;
}

function OrderCard({ orderId, pickupLocation, dropoffLocation, distance, earnings, estimatedTime, onClick }: OrderCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all active:scale-95 text-left"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-[#2D6A4F] mb-1">Order {orderId}</p>
          <p className="text-[#6B7280]">{distance} • {estimatedTime}</p>
        </div>
        <div className="text-right">
          <p className="text-[#FFB703]">+{earnings} MAD</p>
          <ArrowRight className="w-5 h-5 text-[#9CA3AF] ml-auto mt-1" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-start space-x-2">
          <div className="w-6 h-6 rounded-full bg-[#2D6A4F] flex items-center justify-center flex-shrink-0 mt-0.5">
            <div className="w-2 h-2 rounded-full bg-white"></div>
          </div>
          <div className="flex-1">
            <p className="text-[#6B7280]">Pickup</p>
            <p className="text-[#1F2937]">{pickupLocation}</p>
          </div>
        </div>
        <div className="flex items-start space-x-2">
          <MapPin className="w-6 h-6 text-[#FFB703] flex-shrink-0" />
          <div className="flex-1">
            <p className="text-[#6B7280]">Drop-off</p>
            <p className="text-[#1F2937]">{dropoffLocation}</p>
          </div>
        </div>
      </div>
    </button>
  );
}

interface RecentDeliveryProps {
  orderId: string;
  time: string;
  earnings: number;
}

function RecentDelivery({ orderId, time, earnings }: RecentDeliveryProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-[#1F2937]">Order {orderId}</p>
        <p className="text-[#6B7280]">{time}</p>
      </div>
      <p className="text-[#2D6A4F]">+{earnings} MAD</p>
    </div>
  );
}