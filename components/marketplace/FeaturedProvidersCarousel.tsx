'use client';

import { useCallback, useEffect, useRef } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselDots,
  useCarousel,
  type CarouselApi,
} from '@/components/ui/carousel';
import { ProviderCard, ProviderCardSkeleton } from './ProviderCard';
import type { Provider } from '@/types';

interface FeaturedProvidersCarouselProps {
  providers: Provider[];
  isLoading?: boolean;
  onProviderClick?: (provider: Provider) => void;
}

function AutoScrollCarousel({
  providers,
  onProviderClick,
}: {
  providers: Provider[];
  onProviderClick?: (provider: Provider) => void;
}) {
  const { api } = useCarousel();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isHoveredRef = useRef(false);

  const startAutoScroll = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (!isHoveredRef.current && api) {
        if (!api.canScrollNext()) {
          api.scrollTo(0);
        } else {
          api.scrollNext();
        }
      }
    }, 3000);
  }, [api]);

  const stopAutoScroll = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, [startAutoScroll, stopAutoScroll]);

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseEnter}
      onTouchEnd={handleMouseLeave}
    >
      <CarouselContent className="-ml-4">
        {providers.map((provider) => (
          <CarouselItem
            key={provider.id}
            className="pl-4 basis-[calc(100%-32px)] md:basis-[calc(50%-16px)] lg:basis-[calc(33.333%-16px)]"
          >
            <ProviderCard
              provider={provider}
              onClick={() => onProviderClick?.(provider)}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselDots />
    </div>
  );
}

export function FeaturedProvidersCarousel({
  providers,
  isLoading = false,
  onProviderClick,
}: FeaturedProvidersCarouselProps) {
  if (isLoading) {
    return (
      <div className="px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-black">Featured Providers</h2>
        </div>
        <div className="flex gap-4 overflow-hidden">
          {[1, 2, 3].map((i) => (
            <div key={i} className="shrink-0 w-[calc(100%-32px)] md:w-[calc(50%-16px)] lg:w-[calc(33.333%-16px)]">
              <ProviderCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (providers.length === 0) {
    return null;
  }

  return (
    <div className="px-4 md:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-black">Featured Providers</h2>
        <button className="text-sm font-medium text-black/70 hover:text-black transition-colors">
          View All
        </button>
      </div>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
      >
        <AutoScrollCarousel
          providers={providers}
          onProviderClick={onProviderClick}
        />
      </Carousel>
    </div>
  );
}
