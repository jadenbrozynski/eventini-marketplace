'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';
import type { Provider } from '@/types';
import { getProviderDisplayName, getProviderImage, getProviderLocation } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

interface ProviderCardProps {
  provider: Provider;
  onClick?: () => void;
  className?: string;
}

export function ProviderCard({ provider, onClick, className }: ProviderCardProps) {
  const displayName = getProviderDisplayName(provider);
  const imageUrl = getProviderImage(provider);
  const location = getProviderLocation(provider);

  return (
    <button
      onClick={onClick}
      className={`relative w-full h-40 rounded-[14px] overflow-hidden group ${className}`}
    >
      {/* Background Image */}
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={displayName}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400" />
      )}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Provider Name Tag (Bottom Left) */}
      <div className="absolute bottom-3 left-3 px-2.5 py-1.5 rounded-lg bg-black/70">
        <p className="text-sm font-medium text-white truncate max-w-[180px]">
          {displayName}
        </p>
        {location && (
          <p className="text-xs text-white/80 truncate max-w-[180px]">
            {location}
          </p>
        )}
      </div>

      {/* Rating Badge (Bottom Right) */}
      {provider.rating !== undefined && provider.rating > 0 && (
        <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded-lg bg-black/70">
          <Star className="size-3.5 fill-[#FFD700] text-[#FFD700]" />
          <span className="text-sm font-medium text-white">
            {provider.rating.toFixed(1)}
          </span>
        </div>
      )}
    </button>
  );
}

// Skeleton for loading state
export function ProviderCardSkeleton() {
  return (
    <Skeleton className="w-full h-40 rounded-[14px]" />
  );
}
