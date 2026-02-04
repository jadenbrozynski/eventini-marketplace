'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Calendar,
  MessageSquare,
  Store,
  Settings,
  LogOut,
  ChevronLeft,
  Bell,
  Menu,
  X,
  User,
  Gift
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Footer } from '@/components/layout/Footer';

const navItems = [
  { id: 'today', label: 'Today', icon: LayoutDashboard, href: '/provider/dashboard' },
  { id: 'calendar', label: 'Calendar', icon: Calendar, href: '/provider/dashboard/calendar' },
  { id: 'messages', label: 'Messages', icon: MessageSquare, href: '/provider/dashboard/messages', badge: 3 },
  { id: 'listings', label: 'Listings', icon: Store, href: '/provider/dashboard/listings' },
  { id: 'referrals', label: 'Referrals', icon: Gift, href: '/provider/dashboard/referrals' },
];

// Test mode - set to true to bypass authentication
const TEST_MODE = true;

// Mock user for testing
const mockUser = {
  displayName: 'Test Provider',
  email: 'provider@eventini.com',
  photoURL: null,
};

export default function ProviderDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user: authUser, signOut, loading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Use mock user in test mode
  const user = TEST_MODE ? mockUser : authUser;

  // Track scroll position for condensing header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Only redirect if not in test mode and not authenticated
  useEffect(() => {
    if (!TEST_MODE && !loading && !authUser) {
      const timer = setTimeout(() => {
        router.push('/');
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [authUser, loading, router]);

  if (!TEST_MODE && loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-[#44646c] rounded-full animate-spin" />
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!TEST_MODE && !authUser) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center p-8">
          <div className="w-16 h-16 rounded-full bg-[#44646c]/10 flex items-center justify-center">
            <User className="w-8 h-8 text-[#44646c]" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Sign in required</h2>
          <p className="text-gray-500 max-w-sm">
            Please sign in to access the provider dashboard.
          </p>
          <Link
            href="/"
            className="mt-4 px-6 py-2.5 bg-[#44646c] text-white rounded-full hover:bg-[#3a565d] transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const handleSignOut = async () => {
    if (!TEST_MODE) {
      await signOut();
    }
    router.push('/');
  };

  const isActive = (href: string) => {
    if (href === '/provider/dashboard') {
      return pathname === '/provider/dashboard';
    }
    return pathname.startsWith(href);
  };

  // Check if we're on a listing edit page (should hide nav tabs)
  const isListingEditPage = pathname.match(/\/provider\/dashboard\/listings\/[^/]+\/edit/);
  const isFullScreenPage = isListingEditPage;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Combined Header - Condenses on scroll */}
      {!isFullScreenPage && (
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 transition-all duration-200">
          <div className="px-4 sm:px-6 lg:px-10 xl:px-20">
            {/* Main header row */}
            <div className={`flex items-center justify-between transition-all duration-200 ${
              isScrolled ? 'h-14' : 'h-16 md:h-20'
            }`}>
              {/* Logo */}
              <Link href="/provider/dashboard" className="flex items-center shrink-0">
                <Image
                  src="/eventini-logo.png"
                  alt="Eventini"
                  width={isScrolled ? 40 : 56}
                  height={isScrolled ? 40 : 56}
                  className="object-contain transition-all duration-200"
                />
              </Link>

              {/* Center - Nav tabs (shown inline when scrolled on desktop) */}
              <div className={`hidden md:flex items-center gap-1 transition-all duration-200 ${
                isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}>
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all whitespace-nowrap ${
                        active
                          ? 'bg-[#44646c] text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-gray-500'}`} />
                      <span className="text-xs font-medium">{item.label}</span>
                      {item.badge && (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                          active ? 'bg-white/20 text-white' : 'bg-red-500 text-white'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Right side */}
              <div className="flex items-center gap-1 shrink-0">
                {/* Back to Marketplace */}
                <Link
                  href="/"
                  className={`hidden lg:flex font-medium text-gray-700 hover:bg-gray-100 rounded-full transition-all whitespace-nowrap ${
                    isScrolled ? 'px-3 py-1.5 text-xs' : 'px-4 py-2.5 text-sm'
                  }`}
                >
                  {isScrolled ? 'Marketplace' : 'Back to Marketplace'}
                </Link>

                {/* Notifications */}
                <button className={`relative hover:bg-gray-100 rounded-full transition-all ${
                  isScrolled ? 'p-2' : 'p-2.5'
                }`}>
                  <Bell className={`text-gray-700 transition-all ${isScrolled ? 'w-4 h-4' : 'w-5 h-5'}`} />
                  <span className={`absolute bg-red-500 rounded-full ${
                    isScrolled ? 'top-1.5 right-1.5 w-1.5 h-1.5' : 'top-2 right-2 w-2 h-2'
                  }`} />
                </button>

                {/* Profile Dropdown */}
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className={`flex items-center gap-2 border border-gray-300 rounded-full hover:shadow-md transition-all ${
                      isScrolled ? 'p-1 pl-2' : 'p-1.5 pl-3'
                    }`}
                  >
                    <Menu className={`text-gray-600 transition-all ${isScrolled ? 'w-3 h-3' : 'w-4 h-4'}`} />
                    {user?.photoURL ? (
                      <Image
                        src={user.photoURL}
                        alt={user.displayName || 'User'}
                        width={isScrolled ? 26 : 32}
                        height={isScrolled ? 26 : 32}
                        className="rounded-full transition-all"
                      />
                    ) : (
                      <div className={`bg-[#44646c] rounded-full flex items-center justify-center transition-all ${
                        isScrolled ? 'w-6 h-6' : 'w-8 h-8'
                      }`}>
                        <User className={`text-white ${isScrolled ? 'w-3 h-3' : 'w-4 h-4'}`} />
                      </div>
                    )}
                  </button>
                  {showProfileDropdown && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900">{user?.displayName || 'Provider'}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                      </div>
                      <div className="py-1">
                        <Link
                          href="/provider/dashboard/settings"
                          className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left"
                          onClick={() => setShowProfileDropdown(false)}
                        >
                          <Settings className="w-4 h-4 text-gray-600" />
                          <span className="text-sm text-gray-700">Settings</span>
                        </Link>
                      </div>
                      <div className="border-t border-gray-100 py-1">
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left"
                        >
                          <LogOut className="w-4 h-4 text-gray-600" />
                          <span className="text-sm text-gray-700">Sign out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Mobile menu button */}
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Menu className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs Row - Collapses when scrolled (moves inline on desktop) */}
          <div className={`hidden md:block border-t border-gray-100 transition-all duration-200 overflow-hidden ${
            isScrolled ? 'max-h-0 opacity-0 border-t-0' : 'max-h-20 opacity-100'
          }`}>
            <div className="px-4 sm:px-6 lg:px-10 xl:px-20">
              <div className="flex items-center py-3 overflow-x-auto scrollbar-hide">
                <div className="flex items-center gap-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);
                    return (
                      <Link
                        key={item.id}
                        href={item.href}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all whitespace-nowrap ${
                          active
                            ? 'bg-[#44646c] text-white shadow-md'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${active ? 'text-white' : 'text-gray-500'}`} />
                        <span className="text-sm font-medium">{item.label}</span>
                        {item.badge && (
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            active ? 'bg-white/20 text-white' : 'bg-red-500 text-white'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Nav Tabs - Always visible on mobile */}
          <div className="md:hidden border-t border-gray-100">
            <div className="px-4 py-2 overflow-x-auto scrollbar-hide">
              <div className="flex items-center gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-full transition-all whitespace-nowrap ${
                        active
                          ? 'bg-[#44646c] text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-gray-500'}`} />
                      <span className="text-xs font-medium">{item.label}</span>
                      {item.badge && (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                          active ? 'bg-white/20 text-white' : 'bg-red-500 text-white'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Mobile Navigation Overlay (hidden on full-screen pages) */}
      {!isFullScreenPage && mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-white shadow-xl">
            <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100">
              <span className="text-lg font-semibold text-gray-900">Menu</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <nav className="py-4 px-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      active
                        ? 'bg-[#44646c] text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${active ? 'text-white' : 'text-gray-500'}`} />
                    <span className="font-medium flex-1">{item.label}</span>
                    {item.badge && (
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        active ? 'bg-white/20 text-white' : 'bg-red-500 text-white'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
              <div className="border-t border-gray-100 my-4" />
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100 transition-all"
              >
                <ChevronLeft className="w-5 h-5 text-gray-500" />
                <span className="font-medium">Back to Marketplace</span>
              </Link>
            </nav>
          </div>
        </div>
      )}

      {/* Page content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer (hidden on full-screen pages) */}
      {!isFullScreenPage && <Footer variant="minimal" />}
    </div>
  );
}
