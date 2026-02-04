'use client';

import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import map components to avoid SSR issues
const MapWithNoSSR = dynamic(
  () => import('./ServiceAreaMapInner'),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full bg-gray-100 rounded-xl flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-[#44646c] rounded-full animate-spin mx-auto mb-2" />
          <p className="text-sm text-gray-500">Loading map...</p>
        </div>
      </div>
    )
  }
);

interface ServiceAreaMapProps {
  lat?: number;
  lng?: number;
  serviceRadius?: number; // in miles
  providerName: string;
  city?: string;
  state?: string;
  address?: string;
}

export default function ServiceAreaMap(props: ServiceAreaMapProps) {
  return <MapWithNoSSR {...props} />;
}
