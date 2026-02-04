'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, SlidersHorizontal, Star, Heart, ChevronLeft, ChevronRight, Globe, Menu, User, LogOut, Settings, Megaphone, Check, LayoutDashboard } from 'lucide-react';
import type { Provider, ProviderCategory } from '@/types';
import { getProviderDisplayName, getProviderImage, getProviderLocation } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from '@/components/auth/AuthModal';
import { HostAuthModal } from '@/components/auth/HostAuthModal';
import { Footer } from '@/components/layout/Footer';

// Loading Skeleton Component - Responsive size
function ProviderCardSkeleton() {
  return (
    <div className="w-full">
      <div className="aspect-square rounded-xl bg-gray-200 animate-pulse mb-2" />
      <div className="space-y-1.5">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
        <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3" />
        <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />
      </div>
    </div>
  );
}

// Category icons as SVGs
const CategoryIcons = {
  all: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  ),
  food: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z" />
    </svg>
  ),
  entertainment: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
    </svg>
  ),
  venues: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21" />
    </svg>
  ),
  vendors: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
    </svg>
  ),
};

// Categories with icons
const categories = [
  { id: 'all', name: 'All', icon: CategoryIcons.all, category: null },
  { id: 'food', name: 'Catering', icon: CategoryIcons.food, category: 'FoodBeverage' as ProviderCategory },
  { id: 'entertainment', name: 'Entertainment', icon: CategoryIcons.entertainment, category: 'Entertainment' as ProviderCategory },
  { id: 'venues', name: 'Venues', icon: CategoryIcons.venues, category: 'Venues' as ProviderCategory },
  { id: 'vendors', name: 'Vendors', icon: CategoryIcons.vendors, category: 'Vendors' as ProviderCategory },
];

// Provider Card - Smaller size like Airbnb
function ProviderCard({
  provider,
  isFavorite,
  onToggleFavorite
}: {
  provider: Provider;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const displayName = getProviderDisplayName(provider);
  const location = getProviderLocation(provider);
  const images = provider.imageUrls?.length > 0
    ? provider.imageUrls
    : provider.primaryImageUrl
      ? [provider.primaryImageUrl]
      : [];

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite();
  };

  return (
    <Link
      href={`/provider/${provider.id}`}
      className="group block w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container - Square aspect ratio like Airbnb */}
      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-100 mb-2">
        {images.length > 0 ? (
          <>
            <Image
              src={images[currentImageIndex]}
              alt={displayName}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="200px"
            />

            {/* Navigation arrows */}
            {images.length > 1 && isHovered && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform opacity-90 hover:opacity-100"
                >
                  <ChevronLeft className="w-4 h-4 text-gray-800" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform opacity-90 hover:opacity-100"
                >
                  <ChevronRight className="w-4 h-4 text-gray-800" />
                </button>
              </>
            )}

            {/* Pagination dots */}
            {images.length > 1 && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1">
                {images.slice(0, 5).map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <span className="text-gray-400 text-xs">No image</span>
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={handleFavorite}
          className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center hover:scale-110 transition-transform z-10"
        >
          <Heart
            className={`w-5 h-5 drop-shadow-md ${
              isFavorite
                ? 'fill-red-500 text-red-500'
                : 'fill-black/30 text-white stroke-2'
            }`}
          />
        </button>
      </div>

      {/* Info */}
      <div className="space-y-0.5 w-full">
        <div className="flex items-center justify-between gap-1">
          <h3 className="font-medium text-gray-900 truncate text-sm">
            {displayName}
          </h3>
          {provider.rating && (
            <div className="flex items-center gap-0.5 shrink-0">
              <Star className="w-3 h-3 fill-black text-black" />
              <span className="text-xs text-gray-900">
                {provider.rating.toFixed(1)}
              </span>
            </div>
          )}
        </div>
        {location && (
          <p className="text-xs text-gray-500">{location}</p>
        )}
        <p className="text-xs text-gray-500 capitalize">
          {provider.category === 'FoodBeverage' ? 'Catering' : provider.category}
        </p>
      </div>
    </Link>
  );
}

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
];

export default function MarketplacePage() {
  const router = useRouter();
  const { user, signOut, isProvider } = useAuth();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [providers, setProviders] = useState<Provider[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showHostAuthModal, setShowHostAuthModal] = useState(false);
  const [pendingFavoriteId, setPendingFavoriteId] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const languageRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBecomeProvider = () => {
    if (user) {
      // Already logged in, go to dashboard
      router.push('/provider/dashboard');
    } else {
      // Show auth modal
      setShowAuthModal(true);
    }
  };

  const handleAuthSuccess = () => {
    // After successful auth, redirect to provider dashboard
    router.push('/provider/dashboard');
  };

  const handleSignOut = async () => {
    await signOut();
    setShowProfileDropdown(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setShowLanguageDropdown(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch only active providers
  useEffect(() => {
    async function fetchProviders() {
      try {
        const res = await fetch('/api/providers/active');
        if (res.ok) {
          const data = await res.json();
          setProviders(data.providers || []);
        }
      } catch (error) {
        console.error('Error fetching providers:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProviders();
  }, []);

  // Filter providers by category
  const filteredProviders = activeCategory === 'all'
    ? providers
    : providers.filter(p => {
        const cat = categories.find(c => c.id === activeCategory);
        return cat && p.category === cat.category;
      });

  const toggleFavorite = (id: string) => {
    // If user is not logged in, show auth modal
    if (!user) {
      setPendingFavoriteId(id);
      setShowHostAuthModal(true);
      return;
    }

    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const handleHostAuthSuccess = () => {
    // After successful login, complete the pending favorite action
    if (pendingFavoriteId) {
      setFavorites(prev => {
        const newFavorites = new Set(prev);
        newFavorites.add(pendingFavoriteId);
        return newFavorites;
      });
      setPendingFavoriteId(null);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Combined Header - Condensed when scrolled */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200 transition-all duration-200">
        <div className="px-4 sm:px-6 lg:px-10 xl:px-20">
          {/* Main header row */}
          <div className={`flex items-center justify-between transition-all duration-200 ${isScrolled ? 'h-14' : 'h-16 md:h-20'}`}>
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <Image
                src="/eventini-logo.png"
                alt="Eventini"
                width={isScrolled ? 40 : 56}
                height={isScrolled ? 40 : 56}
                className="object-contain transition-all duration-200"
              />
            </Link>

            {/* Center Section - Search bar (condensed when scrolled) */}
            <div className="flex-1 flex justify-center px-4 md:px-8">
              <button className={`flex items-center border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-all bg-white ${isScrolled ? 'px-1.5 py-1 max-w-sm' : 'px-2 py-1.5 max-w-xl'} w-full`}>
                <div className="flex items-center divide-x divide-gray-200 flex-1">
                  <div className={isScrolled ? 'px-3 py-0.5' : 'px-4 py-1'}>
                    <span className={`font-medium text-gray-900 ${isScrolled ? 'text-xs' : 'text-sm'}`}>Anywhere</span>
                  </div>
                  <div className={`hidden sm:block ${isScrolled ? 'px-3 py-0.5' : 'px-4 py-1'}`}>
                    <span className={`font-medium text-gray-900 ${isScrolled ? 'text-xs' : 'text-sm'}`}>Any date</span>
                  </div>
                  <div className={`flex-1 hidden md:block ${isScrolled ? 'px-3 py-0.5' : 'px-4 py-1'}`}>
                    <span className={`text-gray-400 ${isScrolled ? 'text-xs' : 'text-sm'}`}>Plan your event</span>
                  </div>
                </div>
                <div className={`bg-[#44646c] rounded-full flex items-center justify-center shrink-0 ${isScrolled ? 'w-6 h-6' : 'w-8 h-8'}`}>
                  <Search className={`text-white ${isScrolled ? 'w-3 h-3' : 'w-4 h-4'}`} />
                </div>
              </button>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={handleBecomeProvider}
                className={`hidden lg:flex text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-full transition-colors whitespace-nowrap ${isScrolled ? 'px-3 py-2 text-xs' : 'px-4 py-2.5'}`}
              >
                {user ? 'Dashboard' : 'Become a provider'}
              </button>

              {/* Language Dropdown */}
              <div className="relative" ref={languageRef}>
                <button
                  onClick={() => {
                    setShowLanguageDropdown(!showLanguageDropdown);
                    setShowProfileDropdown(false);
                  }}
                  className={`hover:bg-gray-100 rounded-full transition-colors hidden md:flex ${isScrolled ? 'p-2' : 'p-2.5'}`}
                >
                  <Globe className={`text-gray-700 ${isScrolled ? 'w-4 h-4' : 'w-5 h-5'}`} />
                </button>
                {showLanguageDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Language</span>
                    </div>
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setSelectedLanguage(lang.code);
                          setShowLanguageDropdown(false);
                        }}
                        className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{lang.flag}</span>
                          <span className="text-sm text-gray-700">{lang.name}</span>
                        </div>
                        {selectedLanguage === lang.code && (
                          <Check className="w-4 h-4 text-[#44646c]" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Profile Dropdown */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => {
                    setShowProfileDropdown(!showProfileDropdown);
                    setShowLanguageDropdown(false);
                  }}
                  className={`flex items-center gap-2 border border-gray-300 rounded-full hover:shadow-md transition-all ${isScrolled ? 'p-1 pl-2' : 'p-1.5 pl-3'}`}
                >
                  <Menu className={`text-gray-600 ${isScrolled ? 'w-3 h-3' : 'w-4 h-4'}`} />
                  {user?.photoURL ? (
                    <Image
                      src={user.photoURL}
                      alt={user.displayName || 'User'}
                      width={isScrolled ? 28 : 32}
                      height={isScrolled ? 28 : 32}
                      className="rounded-full"
                    />
                  ) : (
                    <div className={`bg-gray-500 rounded-full flex items-center justify-center ${isScrolled ? 'w-7 h-7' : 'w-8 h-8'}`}>
                      <User className={`text-white ${isScrolled ? 'w-3 h-3' : 'w-4 h-4'}`} />
                    </div>
                  )}
                </button>
                {showProfileDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    {user ? (
                      <>
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-semibold text-gray-900">{user.displayName || 'User'}</p>
                          <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                        <div className="py-1">
                          <Link
                            href="/provider/dashboard"
                            className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left"
                            onClick={() => setShowProfileDropdown(false)}
                          >
                            <LayoutDashboard className="w-4 h-4 text-gray-600" />
                            <span className="text-sm text-gray-700">Provider Dashboard</span>
                          </Link>
                          <button
                            onClick={() => setShowAuthModal(true)}
                            className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left"
                          >
                            <Megaphone className="w-4 h-4 text-gray-600" />
                            <span className="text-sm text-gray-700">Promote</span>
                          </button>
                          <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left">
                            <Settings className="w-4 h-4 text-gray-600" />
                            <span className="text-sm text-gray-700">Settings</span>
                          </button>
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
                      </>
                    ) : (
                      <>
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-semibold text-gray-900">Guest</p>
                          <p className="text-xs text-gray-500">Sign in to access all features</p>
                        </div>
                        <div className="py-1">
                          <button
                            onClick={() => {
                              setShowAuthModal(true);
                              setShowProfileDropdown(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left"
                          >
                            <Megaphone className="w-4 h-4 text-gray-600" />
                            <span className="text-sm text-gray-700">Promote</span>
                          </button>
                          <button
                            onClick={() => {
                              setShowHostAuthModal(true);
                              setShowProfileDropdown(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left"
                          >
                            <User className="w-4 h-4 text-gray-600" />
                            <span className="text-sm text-gray-700">Sign up</span>
                          </button>
                          <button
                            onClick={() => {
                              setShowHostAuthModal(true);
                              setShowProfileDropdown(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left"
                          >
                            <LogOut className="w-4 h-4 text-gray-600" />
                            <span className="text-sm text-gray-700">Log in</span>
                          </button>
                        </div>
                        <div className="border-t border-gray-100 py-1">
                          <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left">
                            <Settings className="w-4 h-4 text-gray-600" />
                            <span className="text-sm text-gray-700">Settings</span>
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Category Tabs - Only show when not scrolled */}
      <div className={`bg-white border-b border-gray-200 shadow-sm transition-all duration-200 ${isScrolled ? 'h-0 overflow-hidden opacity-0' : 'opacity-100'}`}>
        <div className="px-4 sm:px-6 lg:px-10 xl:px-20">
          <div className="flex items-center py-4">
            {/* Categories */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide flex-1 pr-4">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full transition-all whitespace-nowrap ${
                    activeCategory === cat.id
                      ? 'bg-[#44646c] text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <span className={`flex items-center justify-center [&>svg]:w-5 [&>svg]:h-5 ${activeCategory === cat.id ? 'text-white' : 'text-gray-500'}`}>
                    {cat.icon}
                  </span>
                  <span className="text-sm font-medium">{cat.name}</span>
                </button>
              ))}
            </div>

            {/* Filters button */}
            <button className="flex items-center gap-2 px-5 py-2.5 border-2 border-gray-300 rounded-full shrink-0 hover:border-gray-400 hover:bg-gray-50 transition-all ml-4">
              <SlidersHorizontal className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-semibold text-gray-700">Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Provider Grid - 7 columns max, centered */}
      <main className="py-6 flex-1">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-x-5 gap-y-8">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(i => (
                <ProviderCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredProviders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No providers found</h3>
              <p className="text-gray-500 max-w-sm">
                We couldn&apos;t find any providers in this category. Try selecting a different category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-x-5 gap-y-8">
              {filteredProviders.map(provider => (
                <ProviderCard
                  key={provider.id}
                  provider={provider}
                  isFavorite={favorites.has(provider.id)}
                  onToggleFavorite={() => toggleFavorite(provider.id)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Auth Modal for Providers */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />

      {/* Auth Modal for Hosts */}
      <HostAuthModal
        isOpen={showHostAuthModal}
        onClose={() => {
          setShowHostAuthModal(false);
          setPendingFavoriteId(null);
        }}
        onSuccess={handleHostAuthSuccess}
      />
    </div>
  );
}
