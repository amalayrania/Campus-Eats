import { useEffect } from 'react';
import { UtensilsCrossed } from 'lucide-react';

interface SplashScreenProps {
  onContinue: () => void;
}

export default function SplashScreen({ onContinue }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onContinue();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onContinue]);

  return (
    <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#2D6A4F] to-[#40916C] p-8">
      <div className="flex flex-col items-center space-y-8 animate-fade-in">
        <div className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl">
          <UtensilsCrossed className="w-14 h-14 text-white" strokeWidth={2.5} />
        </div>
        
        <div className="text-center space-y-3">
          <h1 className="text-white text-5xl">
            Campus Eats
          </h1>
          <p className="text-white/90 text-xl">
            Order smarter. Skip the line.
          </p>
        </div>

        <div className="flex space-x-2 mt-8">
          <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse delay-150"></div>
          <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse delay-300"></div>
        </div>
      </div>
    </div>
  );
}
