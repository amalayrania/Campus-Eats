import { GraduationCap, Shield } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LoginScreenProps {
  onLogin: () => void;
  onAdminLogin?: () => void;
}

export default function LoginScreen({ onLogin, onAdminLogin }: LoginScreenProps) {
  return (
    <div className="h-full flex flex-col items-center justify-between p-8 bg-gradient-to-b from-[#F8F9FA] to-white">
      <div className="flex-1 flex flex-col items-center justify-center space-y-8 w-full">
        <div className="w-64 h-64 rounded-3xl overflow-hidden shadow-lg">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1638036492427-d4d574757d60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGNhbXB1cyUyMGVhdGluZ3xlbnwxfHx8fDE3NjM2NDkxNDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Students eating on campus"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="text-center space-y-4 px-4">
          <h1 className="text-[#1F2937] text-3xl font-bold">
            Log in with MyAUI
          </h1>
          <p className="text-[#6B7280] text-base">
            Access your favorite campus restaurants and skip the wait
          </p>
        </div>

        {/* ✅ FIXED: Both buttons always visible */}
        <div className="w-full space-y-3">
          {/* Student Login */}
          <button
            onClick={onLogin}
            className="w-full bg-white border-2 border-[#2D6A4F] rounded-2xl py-4 flex items-center justify-center space-x-3 shadow-lg hover:bg-[#2D6A4F]/5 transition-all active:scale-95"
          >
            <div className="w-8 h-8 rounded-lg bg-[#2D6A4F] flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-[#2D6A4F] font-medium">
              Continue with AUI SSO
            </span>
          </button>

          {/* Admin Login - Always Visible */}
          <button
            onClick={onAdminLogin || onLogin}
            className="w-full bg-gradient-to-r from-[#2D6A4F] to-[#40916C] text-white rounded-2xl py-4 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transition-all active:scale-95"
          >
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-medium">
              Continue as Admin
            </span>
          </button>
        </div>
      </div>

      <p className="text-[#9CA3AF] text-center text-sm">
        By continuing, you agree to our Terms & Privacy Policy
      </p>
    </div>
  );
}