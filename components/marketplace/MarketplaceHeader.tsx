'use client';

import { Bell, User as UserIcon } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import type { User } from '@/types';

interface MarketplaceHeaderProps {
  user?: User | null;
}

export function MarketplaceHeader({ user }: MarketplaceHeaderProps) {
  const userName = user?.name?.split(' ')[0] || 'Guest';
  const notificationCount = user?.notificationCount || 0;

  return (
    <header className="flex items-center justify-between px-4 py-4 md:px-6 lg:px-8">
      <div className="flex flex-col">
        <h1 className="text-[32px] font-semibold text-black leading-tight">
          Welcome {userName}!
        </h1>
        <p className="text-sm text-black/70 mt-0.5">
          Ready to plan your next event?
        </p>
      </div>

      <div className="flex items-center gap-3">
        {/* Notification Bell */}
        <Button
          variant="ghost"
          size="icon"
          className="relative size-10 rounded-full bg-white/10 hover:bg-gray-100"
        >
          <Bell className="size-5 text-black" />
          {notificationCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-semibold text-white bg-[#FF3B30] rounded-full">
              {notificationCount > 99 ? '99+' : notificationCount}
            </span>
          )}
        </Button>

        {/* Profile Avatar */}
        <Avatar className="size-10 cursor-pointer hover:ring-2 hover:ring-black/20 transition-all">
          {user?.avatarUrl ? (
            <AvatarImage src={user.avatarUrl} alt={user.name} />
          ) : null}
          <AvatarFallback className="bg-gray-200 text-gray-600">
            <UserIcon className="size-5" />
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
