'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const APP_STORE_URL = 'https://apps.apple.com/app/id6751104982';

interface MobileAppModalProps {
  onProviderSignup: () => void;
}

export function MobileAppModal({ onProviderSignup }: MobileAppModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show on mobile devices
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isDismissed = sessionStorage.getItem('mobile-app-modal-dismissed');

    // Don't show if in standalone mode (already in app)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;

    if (isMobile && !isDismissed && !isStandalone) {
      // Small delay before showing
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem('mobile-app-modal-dismissed', 'true');
    setIsVisible(false);
  };

  const handleDownload = () => {
    window.location.href = APP_STORE_URL;
  };

  const handleProviderSignup = () => {
    handleDismiss();
    onProviderSignup();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={handleDismiss}
      />

      {/* Modal */}
      <div className="relative bg-white w-full rounded-t-2xl px-5 py-6 animate-slide-up safe-area-bottom">
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center text-gray-400"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="text-center">
          {/* App Icon - Small and clean */}
          <div className="w-12 h-12 mx-auto mb-3 rounded-xl overflow-hidden">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <rect width="100" height="100" fill="#44646c" rx="20"/>
              <text x="50" y="62" textAnchor="middle" fill="white" fontSize="40" fontWeight="bold" fontFamily="system-ui">E</text>
            </svg>
          </div>

          <h2 className="text-base font-semibold text-gray-900 mb-1">
            Eventini App
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Get the best experience on our app
          </p>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="w-full bg-gray-900 text-white font-medium py-3 px-4 rounded-xl text-sm mb-3"
          >
            Download App
          </button>

          {/* Provider signup option */}
          <button
            onClick={handleProviderSignup}
            className="w-full text-gray-600 font-medium py-2.5 text-sm"
          >
            Sign up as Provider
          </button>

          {/* Skip link */}
          <button
            onClick={handleDismiss}
            className="mt-2 text-xs text-gray-400"
          >
            Continue on web
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.25s ease-out;
        }
        .safe-area-bottom {
          padding-bottom: max(1.5rem, env(safe-area-inset-bottom));
        }
      `}</style>
    </div>
  );
}
