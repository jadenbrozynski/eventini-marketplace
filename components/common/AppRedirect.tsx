'use client';

import { useState } from 'react';

const APP_STORE_URL = 'https://apps.apple.com/app/id6751104982';

interface AppRedirectProps {
  deepLink: string;
  title?: string;
  description?: string;
}

export function AppRedirect({ deepLink, title = 'Open in Eventini', description = 'This link opens in the Eventini app' }: AppRedirectProps) {
  const [attempted, setAttempted] = useState(false);
  const appUrl = `eventini://${deepLink}`;

  const handleOpenApp = () => {
    setAttempted(true);

    // Use an iframe to attempt opening the app without navigation error
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = appUrl;
    document.body.appendChild(iframe);

    // Clean up iframe after attempt
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 100);
  };

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

        <h1 className="text-xl font-semibold text-gray-900 mb-2">{title}</h1>
        <p className="text-gray-500 text-sm mb-6">{description}</p>

        {!attempted ? (
          <>
            <button
              onClick={handleOpenApp}
              className="w-full bg-[#44646c] text-white font-medium py-3 px-6 rounded-xl text-sm mb-3"
            >
              Open in App
            </button>

            <button
              onClick={handleDownload}
              className="w-full bg-gray-900 text-white font-medium py-3 px-6 rounded-xl text-sm mb-3"
            >
              Download on App Store
            </button>
          </>
        ) : (
          <>
            <p className="text-gray-500 text-sm mb-4">
              Don't have the app yet?
            </p>

            <button
              onClick={handleDownload}
              className="w-full bg-gray-900 text-white font-medium py-3 px-6 rounded-xl text-sm mb-3"
            >
              Download on App Store
            </button>

            <button
              onClick={handleOpenApp}
              className="w-full border border-gray-300 text-gray-700 font-medium py-3 px-6 rounded-xl text-sm mb-3"
            >
              Try Again
            </button>
          </>
        )}

        <a
          href="/"
          className="block text-sm text-gray-500 hover:text-gray-700 mt-2"
        >
          Continue to website
        </a>
      </div>
    </div>
  );
}
