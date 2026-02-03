'use client';

import { MapPin, Clock, ChevronRight } from 'lucide-react';
import type { UpcomingEvent } from '@/types';

interface UpcomingEventCardProps {
  event: UpcomingEvent;
  onPress?: () => void;
}

export function UpcomingEventCard({ event, onPress }: UpcomingEventCardProps) {
  const date = new Date(event.date);
  const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const day = date.getDate();

  return (
    <button
      onClick={onPress}
      className="w-full bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.1)] p-4 flex items-center gap-4 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-shadow text-left"
    >
      {/* Date Circle */}
      <div className="w-14 h-14 rounded-full bg-black flex flex-col items-center justify-center shrink-0">
        <span className="text-[10px] font-medium text-white/80 leading-tight">
          {month}
        </span>
        <span className="text-lg font-bold text-white leading-tight">
          {day}
        </span>
      </div>

      {/* Event Details */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-black truncate">
          {event.name}
        </h4>
        <div className="flex items-center gap-1 mt-1 text-xs text-black/70">
          <MapPin className="size-3 shrink-0" />
          <span className="truncate">{event.location}</span>
        </div>
        <div className="flex items-center gap-1 mt-0.5 text-xs text-black/70">
          <Clock className="size-3 shrink-0" />
          <span>{event.time}</span>
        </div>
      </div>

      {/* Arrow */}
      <ChevronRight className="size-5 text-black/40 shrink-0" />
    </button>
  );
}

// Skeleton for loading state
export function UpcomingEventCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.1)] p-4 flex items-center gap-4">
      <div className="w-14 h-14 rounded-full bg-gray-200 animate-pulse shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
        <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />
        <div className="h-3 bg-gray-200 rounded animate-pulse w-1/3" />
      </div>
    </div>
  );
}
