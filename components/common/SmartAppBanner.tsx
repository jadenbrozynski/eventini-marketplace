'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const APP_STORE_URL = 'https://apps.apple.com/app/id6751104982';
const APP_ICON_URL = '/app-icon.png'; // Add your app icon to public folder

interface SmartAppBannerProps {
  appName?: string;
  appIconUrl?: string;
}

export function SmartAppBanner({
  appName = 'Eventini',
  appIconUrl = APP_ICON_URL
}: SmartAppBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if user is on iOS and hasn't dismissed the banner
    const userAgent = navigator.userAgent;
    const isIOSDevice = /iPhone|iPad|iPod/.test(userAgent);
    const isDismissed = localStorage.getItem('app-banner-dismissed');

    // Don't show if in standalone mode (already in app) or dismissed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;

    setIsIOS(isIOSDevice);
    setIsVisible(isIOSDevice && !isDismissed && !isStandalone);
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('app-banner-dismissed', 'true');
    setIsVisible(false);
  };

  const handleOpenApp = () => {
    // Try to open the app via deep link first
    const currentPath = window.location.pathname;
    const deepLink = `eventini:/${currentPath}`;

    // Attempt to open the app
    window.location.href = deepLink;

    // If app doesn't open within 1.5 seconds, redirect to App Store
    setTimeout(() => {
      window.location.href = APP_STORE_URL;
    }, 1500);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gray-100 border-b border-gray-200 safe-area-top">
      <div className="flex items-center justify-between px-3 py-2">
        <button
          onClick={handleDismiss}
          className="p-1 text-gray-500 hover:text-gray-700"
          aria-label="Close banner"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3 flex-1 ml-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center overflow-hidden shadow-sm">
            {/* Fallback icon if no app icon exists */}
            <span className="text-white font-bold text-lg">E</span>
          </div>

          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 text-sm truncate">{appName}</p>
            <p className="text-xs text-gray-500">Open in the {appName} app</p>
          </div>
        </div>

        <button
          onClick={handleOpenApp}
          className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-4 py-1.5 rounded-full transition-colors"
        >
          OPEN
        </button>
      </div>
    </div>
  );
}
