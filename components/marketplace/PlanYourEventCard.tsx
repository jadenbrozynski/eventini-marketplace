'use client';

import { useEffect, useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PlanYourEventCardProps {
  onGetStarted?: () => void;
}

export function PlanYourEventCard({ onGetStarted }: PlanYourEventCardProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="mx-4 md:mx-6 lg:mx-8 bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.1)] p-4 flex items-center gap-4">
      {/* Lottie Animation */}
      <div className="relative w-20 h-20 shrink-0">
        {isMounted && (
          <Player
            autoplay
            loop
            src="/animations/EventiniAI.json"
            style={{ width: '100%', height: '100%' }}
          />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-semibold text-black">
          Plan Your Next Event
        </h3>
        <p className="text-sm text-black/70 mt-0.5">
          Let AI help you find the perfect providers
        </p>
      </div>

      {/* CTA Button */}
      <Button
        onClick={onGetStarted}
        className="bg-black text-white hover:bg-black/90 rounded-lg px-4 py-2.5 text-sm font-medium flex items-center gap-2"
      >
        Get Started
        <ArrowRight className="size-4" />
      </Button>
    </div>
  );
}
