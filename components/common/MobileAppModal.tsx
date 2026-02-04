'use client';

import { useState, useEffect } from 'react';
import { X, Smartphone } from 'lucide-react';
import Image from 'next/image';

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
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleDismiss}
      />

      {/* Modal */}
      <div className="relative bg-white w-full sm:w-auto sm:min-w-[320px] sm:max-w-sm rounded-t-2xl sm:rounded-2xl p-6 pb-8 sm:pb-6 animate-slide-up sm:animate-fade-in">
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="text-center">
          {/* App Icon */}
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/eventini-logo.png"
              alt="Eventini"
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>

          <h2 className="text-lg font-semibold text-gray-900 mb-1">
            Get the Eventini App
          </h2>
          <p className="text-sm text-gray-500 mb-5">
            Download our app for the best experience
          </p>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="w-full bg-[#44646c] text-white font-semibold py-3 px-4 rounded-xl hover:bg-[#3a565d] transition-colors flex items-center justify-center gap-2 mb-4"
          >
            <Smartphone className="w-5 h-5" />
            Download on App Store
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Provider signup option */}
          <p className="text-xs text-gray-500 mb-2">No Apple device?</p>
          <button
            onClick={handleProviderSignup}
            className="w-full border border-gray-300 text-gray-900 font-medium py-2.5 px-4 rounded-xl hover:bg-gray-50 transition-colors text-sm"
          >
            Sign up as a Provider
          </button>

          {/* Skip link */}
          <button
            onClick={handleDismiss}
            className="mt-4 text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            Continue on web
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes fade-in {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
