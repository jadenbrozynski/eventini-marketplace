'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Plus,
  Search,
  MoreHorizontal,
  Eye,
  Edit2,
  Trash2,
  Star,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  Copy,
  ExternalLink,
} from 'lucide-react';
import type { Provider } from '@/types';

export default function ListingsPage() {
  const router = useRouter();
  const [listings, setListings] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'pending' | 'inactive'>('all');
  const [showDropdown, setShowDropdown] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setShowDropdown(null);
    if (showDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showDropdown]);

  const mockListings: Provider[] = [
    {
      id: '1',
      businessName: 'Gourmet Delights Catering',
      category: 'FoodBeverage',
      imageUrls: ['https://images.unsplash.com/photo-1555244162-803834f70033?w=400'],
      primaryImageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=400',
      rating: 4.9,
      reviewCount: 127,
      city: 'Los Angeles',
      state: 'CA',
      isActive: true,
      approvalStatus: 'approved',
    },
    {
      id: '2',
      businessName: 'Elite Event Productions',
      category: 'Entertainment',
      imageUrls: ['https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400'],
      primaryImageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400',
      rating: 4.7,
      reviewCount: 89,
      city: 'San Diego',
      state: 'CA',
      isActive: true,
      approvalStatus: 'approved',
    },
    {
      id: '3',
      stageName: 'DJ Spark',
      category: 'Entertainment',
      imageUrls: ['https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=400'],
      primaryImageUrl: 'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=400',
      rating: 4.8,
      reviewCount: 156,
      city: 'Los Angeles',
      state: 'CA',
      isActive: false,
      approvalStatus: 'pending',
    },
    {
      id: '4',
      businessName: 'Floral Dreams',
      category: 'Vendors',
      imageUrls: ['https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400'],
      primaryImageUrl: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400',
      rating: 4.6,
      reviewCount: 64,
      city: 'Santa Monica',
      state: 'CA',
      isActive: true,
      approvalStatus: 'approved',
    },
  ];

  const displayListings = listings.length > 0 ? listings : mockListings;

  const filteredListings = displayListings.filter((listing) => {
    const name = listing.businessName || listing.stageName || listing.venueName || '';
    if (searchQuery && !name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (filter === 'active' && !listing.isActive) return false;
    if (filter === 'pending' && listing.approvalStatus !== 'pending') return false;
    if (filter === 'inactive' && listing.isActive) return false;
    return true;
  });

  const getDisplayName = (listing: Provider) => {
    return listing.businessName || listing.stageName || listing.venueName || listing.vendorName || 'Unnamed';
  };

  const getStatusInfo = (listing: Provider) => {
    if (listing.approvalStatus === 'pending') {
      return { label: 'Pending', color: 'bg-amber-500' };
    }
    if (listing.isActive) {
      return { label: 'Active', color: 'bg-emerald-500' };
    }
    return { label: 'Inactive', color: 'bg-gray-400' };
  };

  return (
    <div className="px-4 sm:px-6 lg:px-10 xl:px-20 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Listings</h1>
          <p className="text-sm text-gray-500 mt-1">{filteredListings.length} services</p>
        </div>
        <Link
          href="/provider/dashboard/listings/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#44646c] text-white rounded-full hover:bg-[#3a565d] transition-colors text-sm font-semibold shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add listing
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search listings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:border-[#44646c] focus:ring-2 focus:ring-[#44646c]/20"
          />
        </div>
        <div className="flex items-center gap-2">
          {(['all', 'active', 'pending', 'inactive'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                filter === f
                  ? 'bg-[#44646c] text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Listings Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden border border-gray-200">
              <div className="aspect-[4/3] bg-gray-100 animate-pulse" />
              <div className="p-3 space-y-2">
                <div className="h-4 bg-gray-100 rounded animate-pulse w-3/4" />
                <div className="h-3 bg-gray-100 rounded animate-pulse w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredListings.length === 0 ? (
        <div className="bg-[#44646c]/5 rounded-3xl p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mx-auto mb-4">
            <Plus className="w-7 h-7 text-[#44646c]" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No listings yet</h3>
          <p className="text-sm text-gray-500 mb-6 max-w-xs mx-auto">
            Create your first listing to start receiving bookings.
          </p>
          <Link
            href="/provider/dashboard/listings/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#44646c] text-white rounded-full text-sm font-semibold hover:bg-[#3a565d] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create listing
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredListings.map((listing) => {
            const status = getStatusInfo(listing);
            return (
              <div
                key={listing.id}
                onClick={() => router.push(`/provider/dashboard/listings/${listing.id}/edit`)}
                className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg hover:border-[#44646c]/20 transition-all group cursor-pointer"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] bg-gray-100">
                  {listing.primaryImageUrl ? (
                    <Image
                      src={listing.primaryImageUrl}
                      alt={getDisplayName(listing)}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                      No image
                    </div>
                  )}

                  {/* Status dot */}
                  <div className="absolute top-2 left-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${status.color} ring-2 ring-white`} />
                  </div>

                  {/* Actions */}
                  <div className={`absolute top-2 right-2 transition-opacity ${showDropdown === listing.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setShowDropdown(showDropdown === listing.id ? null : listing.id);
                        }}
                        className="p-1.5 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                      >
                        <MoreHorizontal className="w-4 h-4 text-gray-600" />
                      </button>
                      {showDropdown === listing.id && (
                        <div
                          className="absolute right-0 top-full mt-1 w-36 bg-white rounded-xl shadow-lg border border-gray-200 py-1 z-20"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowDropdown(null);
                              router.push(`/providers/${listing.category.toLowerCase()}/${listing.id}`);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            View
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowDropdown(null);
                              router.push(`/provider/dashboard/listings/${listing.id}/edit`);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            Edit
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowDropdown(null);
                              // TODO: Implement duplicate functionality
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            <Copy className="w-3.5 h-3.5" />
                            Duplicate
                          </button>
                          <div className="border-t border-gray-100 my-1" />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowDropdown(null);
                              // TODO: Implement delete functionality with confirmation
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
                </div>

                {/* Content */}
                <div className="p-3">
                  <div className="flex items-start justify-between gap-1 mb-1">
                    <h3 className="text-sm font-semibold text-gray-900 truncate">
                      {getDisplayName(listing)}
                    </h3>
                    {listing.rating && (
                      <div className="flex items-center gap-0.5 shrink-0">
                        <Star className="w-3 h-3 fill-gray-900 text-gray-900" />
                        <span className="text-xs font-medium">{listing.rating}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mb-2">
                    {listing.category === 'FoodBeverage' ? 'Food & Beverage' : listing.category}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {Math.floor(Math.random() * 300) + 50}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {Math.floor(Math.random() * 15) + 2}
                      </span>
                    </div>
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                      status.label === 'Active' ? 'bg-emerald-50 text-emerald-600' :
                      status.label === 'Pending' ? 'bg-amber-50 text-amber-600' :
                      'bg-gray-100 text-gray-500'
                    }`}>
                      {status.label}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Add New Card */}
          <Link
            href="/provider/dashboard/listings/new"
            className="bg-[#44646c]/5 rounded-xl border-2 border-dashed border-[#44646c]/20 hover:border-[#44646c]/40 hover:bg-[#44646c]/10 transition-all flex flex-col items-center justify-center aspect-[4/3] group"
          >
            <div className="w-10 h-10 rounded-full bg-[#44646c]/10 flex items-center justify-center mb-2 group-hover:bg-[#44646c]/20 transition-colors">
              <Plus className="w-5 h-5 text-[#44646c]" />
            </div>
            <span className="text-sm font-medium text-[#44646c]">Add listing</span>
          </Link>
        </div>
      )}
    </div>
  );
}
