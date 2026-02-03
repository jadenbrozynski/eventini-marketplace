'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, SlidersHorizontal, Star, Heart, ChevronLeft, ChevronRight, Globe, Menu } from 'lucide-react';
import type { Provider, ProviderCategory } from '@/types';
import { getProviderDisplayName, getProviderImage, getProviderLocation } from '@/types';

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

export default function MarketplacePage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [providers, setProviders] = useState<Provider[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-10 xl:px-20">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/eventini-logo.png"
                alt="Eventini"
                width={72}
                height={72}
                className="object-contain"
              />
              <span className="text-3xl font-bold hidden sm:block" style={{ color: '#44646c' }}>
                Eventini
              </span>
            </Link>

            {/* Search Bar */}
            <button className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-shadow max-w-md flex-1 mx-4 md:mx-8">
              <Search className="w-4 h-4 text-gray-700" />
              <div className="hidden sm:flex items-center gap-2 text-sm flex-1">
                <span className="font-medium text-gray-900">Anywhere</span>
                <span className="text-gray-300">|</span>
                <span className="font-medium text-gray-900">Any date</span>
                <span className="text-gray-300">|</span>
                <span className="text-gray-400">Add guests</span>
              </div>
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center ml-auto">
                <Search className="w-4 h-4 text-white" />
              </div>
            </button>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <button className="hidden lg:flex text-sm font-medium text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-full transition-colors">
                Become a provider
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden md:flex">
                <Globe className="w-5 h-5 text-gray-700" />
              </button>
              <button className="flex items-center gap-2 border border-gray-300 rounded-full p-2 hover:shadow-md transition-shadow">
                <Menu className="w-4 h-4 text-gray-700" />
                <div className="w-7 h-7 bg-gray-600 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Category Tabs */}
      <div className="sticky top-16 md:top-20 z-20 bg-white border-b border-gray-100">
        <div className="px-4 sm:px-6 lg:px-10 xl:px-20">
          <div className="flex items-center gap-8 md:gap-10 py-3 overflow-x-auto scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex flex-col items-center justify-center gap-1.5 min-w-[56px] py-2 border-b-2 transition-all ${
                  activeCategory === cat.id
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
                }`}
              >
                <span className={`flex items-center justify-center ${activeCategory === cat.id ? 'text-gray-900' : 'text-gray-400'}`}>
                  {cat.icon}
                </span>
                <span className="text-xs font-medium whitespace-nowrap">{cat.name}</span>
              </button>
            ))}

            {/* Filters button */}
            <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-xl ml-auto shrink-0 hover:bg-gray-50 transition-colors">
              <SlidersHorizontal className="w-4 h-4" />
              <span className="text-sm font-medium">Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Provider Grid - Full width responsive grid */}
      <main className="px-4 sm:px-6 lg:px-10 xl:px-20 py-6 flex-1">
        {isLoading ? (
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-10 gap-x-3 gap-y-5">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(i => (
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
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-10 gap-x-3 gap-y-5">
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
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 mt-auto">
        <div className="px-4 sm:px-6 lg:px-10 xl:px-20 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/eventini-logo.png"
                  alt="Eventini"
                  width={56}
                  height={56}
                  className="object-contain"
                />
                <span className="text-2xl font-bold" style={{ color: '#44646c' }}>
                  Eventini
                </span>
              </div>
              <p className="text-sm text-gray-500">
                Find the perfect vendors for your next event. From catering to entertainment, we&apos;ve got you covered.
              </p>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900 hover:underline">Help Center</a></li>
                <li><a href="#" className="hover:text-gray-900 hover:underline">Safety Information</a></li>
                <li><a href="#" className="hover:text-gray-900 hover:underline">Cancellation Options</a></li>
              </ul>
            </div>

            {/* Providers */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Providers</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900 hover:underline">Become a Provider</a></li>
                <li><a href="#" className="hover:text-gray-900 hover:underline">Provider Resources</a></li>
                <li><a href="#" className="hover:text-gray-900 hover:underline">Community Forum</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Eventini</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900 hover:underline">About Us</a></li>
                <li><a href="#" className="hover:text-gray-900 hover:underline">Careers</a></li>
                <li><a href="#" className="hover:text-gray-900 hover:underline">Press</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © 2024 Eventini, Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <a href="#" className="hover:text-gray-900 hover:underline">Privacy</a>
              <a href="#" className="hover:text-gray-900 hover:underline">Terms</a>
              <a href="#" className="hover:text-gray-900 hover:underline">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
