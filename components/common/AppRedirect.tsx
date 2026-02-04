'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const APP_STORE_URL = 'https://apps.apple.com/app/id6751104982';

interface AppRedirectProps {
  deepLink: string;
  title?: string;
  description?: string;
}

export function AppRedirect({ deepLink, title = 'Opening Eventini...', description = 'Taking you to the app' }: AppRedirectProps) {
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    // Try to open the app via custom URL scheme
    const appUrl = `eventini://${deepLink}`;
    
    // Set a timeout - if we're still here after 1.5s, show fallback
    const timeout = setTimeout(() => {
      setShowFallback(true);
    }, 1500);

    // Try to open the app
    window.location.href = appUrl;

    return () => clearTimeout(timeout);
  }, [deepLink]);

  const handleDownload = () => {
    window.location.href = APP_STORE_URL;
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        {/* App Icon */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl overflow-hidden shadow-lg">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <rect width="100" height="100" fill="#44646c" rx="20"/>
            <text x="50" y="62" textAnchor="middle" fill="white" fontSize="40" fontWeight="bold" fontFamily="system-ui">E</text>
          </svg>
        </div>

        {!showFallback ? (
          <>
            {/* Loading state */}
            <div className="w-8 h-8 border-2 border-gray-200 border-t-[#44646c] rounded-full animate-spin mx-auto mb-4" />
            <h1 className="text-xl font-semibold text-gray-900 mb-2">{title}</h1>
            <p className="text-gray-500 text-sm">{description}</p>
          </>
        ) : (
          <>
            {/* Fallback - App not installed */}
            <h1 className="text-xl font-semibold text-gray-900 mb-2">Get the Eventini App</h1>
            <p className="text-gray-500 text-sm mb-6">
              Download the app to continue
            </p>

            <button
              onClick={handleDownload}
              className="w-full bg-gray-900 text-white font-medium py-3 px-6 rounded-xl text-sm mb-3"
            >
              Download on App Store
            </button>

            <a
              href="/"
              className="block text-sm text-gray-500 hover:text-gray-700"
            >
              Continue to website
            </a>
          </>
        )}
      </div>
    </div>
  );
}
