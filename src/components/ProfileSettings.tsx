// ============================================
// PROFILE SETTINGS COMPONENT
// Entry point to Performance Monitoring
// ============================================

import { ArrowLeft, User, ChevronRight, CreditCard, History, Heart, Settings, LogOut, Truck, Activity } from 'lucide-react';
import { useState } from 'react';
import PerformanceStats from './PerformanceStats';

interface ProfileSettingsProps {
  onBack: () => void;
  isCourierMode: boolean;
  onToggleCourierMode: () => void;
}

export default function ProfileSettings({ onBack, isCourierMode, onToggleCourierMode }: ProfileSettingsProps) {
  const [showPerformanceStats, setShowPerformanceStats] = useState(false);

  return (
    <>
      <div className="h-full bg-[#F8F9FA] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-br from-[#2D6A4F] to-[#40916C] px-6 pt-12 pb-8 rounded-b-[32px] z-10">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors active:scale-95 mb-6"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          
          {/* Profile Info */}
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-white mb-1">Ahmed El Mansouri</h2>
              <p className="text-white/90">ahmed.mansouri@aui.ma</p>
              <p className="text-white/80 mt-1">Student ID: 2024-1234</p>
            </div>
          </div>
        </div>

        {/* Courier Mode Toggle */}
        <div className="px-6 -mt-6 mb-6">
          <button
            onClick={onToggleCourierMode}
            className="w-full bg-white rounded-2xl p-4 shadow-lg flex items-center justify-between hover:shadow-xl transition-all active:scale-95"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-[#FFB703]/10 flex items-center justify-center">
                <Truck className="w-6 h-6 text-[#FFB703]" />
              </div>
              <div className="text-left">
                <p className="text-[#1F2937]">
                  {isCourierMode ? 'Switch to Customer Mode' : 'Become a Courier'}
                </p>
                <p className="text-[#6B7280]">
                  {isCourierMode ? 'Order food from restaurants' : 'Earn money delivering orders'}
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#9CA3AF]" />
          </button>
        </div>

        {/* Performance Stats Button - Architecture Demo */}
        <div className="px-6 mb-6">
          <button
            onClick={() => setShowPerformanceStats(true)}
            className="w-full bg-gradient-to-r from-[#2D6A4F] to-[#40916C] rounded-2xl p-4 shadow-lg flex items-center justify-between hover:shadow-xl transition-all active:scale-95"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="text-white font-semibold">Performance Metrics</p>
                <p className="text-white/80 text-sm">View system performance stats</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-white/80" />
          </button>
          <p className="text-xs text-center text-gray-500 mt-2">
            🎯 Architecture Demo: Performance & Caching
          </p>
        </div>

        {/* Account Section */}
        <div className="px-6 mb-6">
          <h3 className="text-[#6B7280] mb-3">Account</h3>
          <div className="bg-white rounded-2xl overflow-hidden shadow-md">
            <MenuItem
              icon={<History className="w-5 h-5" />}
              title="Order History"
              subtitle="View past orders"
              color="#2D6A4F"
            />
            <Divider />
            <MenuItem
              icon={<CreditCard className="w-5 h-5" />}
              title="Payment Methods"
              subtitle="Manage cards and wallets"
              color="#40916C"
            />
            <Divider />
            <MenuItem
              icon={<Heart className="w-5 h-5" />}
              title="Saved Restaurants"
              subtitle="Your favorite places"
              color="#FFB703"
            />
          </div>
        </div>

        {/* Settings Section */}
        <div className="px-6 mb-6">
          <h3 className="text-[#6B7280] mb-3">Settings</h3>
          <div className="bg-white rounded-2xl overflow-hidden shadow-md">
            <MenuItem
              icon={<Settings className="w-5 h-5" />}
              title="Preferences"
              subtitle="Notifications, language, etc."
              color="#6B7280"
            />
            <Divider />
            <MenuItem
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              title="Help & Support"
              subtitle="FAQs, contact support"
              color="#6B7280"
            />
            <Divider />
            <MenuItem
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
              title="Terms & Privacy"
              subtitle="Legal information"
              color="#6B7280"
            />
            <Divider />
            <MenuItem
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              title="About Campus Eats"
              subtitle="Version 1.0.0"
              color="#6B7280"
            />
          </div>
        </div>

        {/* Stats (if courier mode) */}
        {isCourierMode && (
          <div className="px-6 mb-6">
            <h3 className="text-[#6B7280] mb-3">Your Stats</h3>
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-[#2D6A4F] text-2xl mb-1">156</p>
                  <p className="text-[#6B7280]">Deliveries</p>
                </div>
                <div>
                  <p className="text-[#FFB703] text-2xl mb-1">4.9</p>
                  <p className="text-[#6B7280]">Rating</p>
                </div>
                <div>
                  <p className="text-[#40916C] text-2xl mb-1">2,340</p>
                  <p className="text-[#6B7280]">MAD Earned</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Log Out */}
        <div className="px-6 pb-24">
          <button className="w-full bg-white rounded-2xl p-4 shadow-md flex items-center justify-center space-x-3 text-[#DC2626] hover:bg-[#FEF2F2] transition-all active:scale-95">
            <LogOut className="w-5 h-5" />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* Performance Stats Modal */}
      {showPerformanceStats && (
        <PerformanceStats onClose={() => setShowPerformanceStats(false)} />
      )}
    </>
  );
}

interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  color: string;
}

function MenuItem({ icon, title, subtitle, color }: MenuItemProps) {
  return (
    <button className="w-full px-4 py-4 flex items-center space-x-4 hover:bg-[#F8F9FA] transition-colors active:bg-[#F3F4F6]">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: `${color}15`, color }}
      >
        {icon}
      </div>
      <div className="flex-1 text-left min-w-0">
        <p className="text-[#1F2937]">{title}</p>
        <p className="text-[#6B7280] truncate">{subtitle}</p>
      </div>
      <ChevronRight className="w-5 h-5 text-[#9CA3AF] flex-shrink-0" />
    </button>
  );
}

function Divider() {
  return <div className="h-px bg-[#E5E7EB] mx-4"></div>;
}