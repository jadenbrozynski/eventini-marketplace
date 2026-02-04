'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const APP_STORE_URL = 'https://apps.apple.com/app/id6751104982';

function OpenAppContent() {
  const searchParams = useSearchParams();
  const path = searchParams.get('path') || '/';

  useEffect(() => {
    const deepLink = `eventini:/${path}`;

    // Try to open the app
    window.location.href = deepLink;

    // Fallback to App Store after 2 seconds
    const timeout = setTimeout(() => {
      window.location.href = APP_STORE_URL;
    }, 2000);

    return () => clearTimeout(timeout);
  }, [path]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-50 to-white p-6">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-3xl">E</span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Opening Eventini...</h1>
        <p className="text-gray-600 mb-8">
          If the app doesn&apos;t open automatically, tap the button below.
        </p>

        <div className="space-y-3">
          <a
            href={APP_STORE_URL}
            className="block w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            Download from App Store
          </a>

          <a
            href={`eventini:/${path}`}
            className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            Open in App
          </a>
        </div>

        <p className="mt-8 text-sm text-gray-500">
          Get the full Eventini experience with our mobile app
        </p>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-50 to-white p-6">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg animate-pulse">
          <span className="text-white font-bold text-3xl">E</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Loading...</h1>
      </div>
    </div>
  );
}

export default function OpenAppPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <OpenAppContent />
    </Suspense>
  );
}
