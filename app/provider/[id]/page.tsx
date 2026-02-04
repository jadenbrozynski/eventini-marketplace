'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  Star,
  Heart,
  Share2,
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  Users,
  ChevronLeft,
  ChevronRight,
  Music,
  Utensils,
  Building2,
  Package,
  CheckCircle2,
  Play,
  X,
  Grid3X3,
  Award,
  Leaf,
  ShieldCheck,
  Wifi,
  Volume2,
  DollarSign,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Navigation,
  Sparkles,
  Lock,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import ServiceAreaMap from '@/components/ServiceAreaMap';

interface MenuItem {
  id?: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  imageUrl?: string;
  category?: string;
  dietaryBadges?: string[];
}

interface CateringPackage {
  id?: string;
  name: string;
  description?: string;
  basePrice?: number;
  costPerPerson?: number;
  price?: number;
  pricingType?: string;
  image?: string;
  imageUrl?: string;
  menuItems?: any[];
  menuCategories?: any[];
  beverages?: any[];
  addOns?: any[];
  rules?: any[];
}

interface ProviderDetails {
  id: string;
  category: string;
  name: string;
  contactName?: string;
  phone?: string;
  email?: string;
  address?: string;
  website?: string;
  city?: string;
  state?: string;
  lat?: number;
  lng?: number;
  rating?: number;
  reviewCount?: number;
  imageUrls: string[];
  primaryImageUrl?: string;
  specialFeatures?: string[];
  serviceRadius?: number;
  yearsInBusiness?: string;
  bio?: string;
  description?: string;
  ownerIdentityTags?: string[];
  leadTimeRequired?: string;
  socialMedia?: any;
  cancellationPolicy?: string;
  cuisineTypes?: string;
  serviceStyle?: string;
  dietarySpecialties?: string[];
  traits?: string[];
  minimumGuarantee?: string;
  foodTruckDimensions?: string;
  aLaCarteMenu?: MenuItem[];
  cateringPackages?: CateringPackage[];
  nonprofitFlexibility?: any;
  highVolumePartner?: any;
  genres?: string;
  performanceType?: string;
  performanceLength?: string;
  technicalRequirements?: string;
  specializations?: string[];
  compensationFlatFee?: string;
  compensationHourly?: string;
  basedIn?: string;
  travelPolicy?: string;
  venueType?: string;
  capacitySeated?: string;
  capacityStanding?: string;
  squareFootage?: string;
  amenities?: string[];
  includedRentals?: string[];
  parking?: string;
  kitchenAccess?: string;
  alcoholPolicy?: string;
  wifiAvailable?: boolean;
  rentalFeeHourly?: string;
  rentalFeeFlat?: string;
  minimumSpendRequirement?: string;
  historicLandmark?: boolean;
  waterfront?: boolean;
  rooftop?: boolean;
  ecoFriendly?: boolean;
  productCategory?: string;
  inventoryModel?: string;
  minimumOrderRequirement?: string;
  serviceItems?: any[];
  productItems?: any[];
  // Availability
  calendarAvailability?: string;
  // Deposit
  depositPercentage?: number;
  depositDueAtBooking?: string;
}

// Highlight row component (Airbnb style)
function HighlightRow({ icon: Icon, title, subtitle }: { icon: any; title: string; subtitle: string }) {
  return (
    <div className="flex items-start gap-4 py-4">
      <Icon className="w-6 h-6 text-gray-700 flex-shrink-0 mt-0.5" />
      <div>
        <p className="font-medium text-gray-900 text-[15px]">{title}</p>
        <p className="text-gray-500 text-sm">{subtitle}</p>
      </div>
    </div>
  );
}

// Catering package card with expandable details
function CateringPackageCard({ pkg, onViewDetails }: { pkg: CateringPackage; onViewDetails: () => void }) {
  const price = pkg.costPerPerson || pkg.basePrice || pkg.price || 0;
  const pricingType = pkg.pricingType || 'per_person';
  const image = pkg.image || pkg.imageUrl;

  return (
    <button
      onClick={onViewDetails}
      className="w-full text-left border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow bg-white"
    >
      <div className="relative h-32 bg-gray-100">
        {image ? (
          <Image src={image} alt={pkg.name} fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Utensils className="w-8 h-8 text-gray-300" />
          </div>
        )}
        <div className="absolute bottom-2 right-2 bg-white px-2 py-1 rounded-md text-sm font-semibold shadow">
          ${price}{pricingType === 'flat_fee' ? '' : '/person'}
        </div>
      </div>
      <div className="p-3">
        <h4 className="font-semibold text-gray-900 text-sm">{pkg.name || 'Package'}</h4>
        {pkg.description && (
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{pkg.description}</p>
        )}
        <p className="text-xs text-[#44646c] font-medium mt-2">Tap to view details</p>
      </div>
    </button>
  );
}

// Menu Item Detail Modal
function MenuItemDetailModal({ item, onClose }: { item: any; onClose: () => void }) {
  const itemImage = item.image || item.imageUrl;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Image - only show if exists */}
        {itemImage ? (
          <div className="relative h-56 bg-gray-100">
            <Image src={itemImage} alt={item.name} fill className="object-cover" />
          </div>
        ) : (
          <div className="h-32 bg-gray-100 flex items-center justify-center">
            <Utensils className="w-12 h-12 text-gray-300" />
          </div>
        )}

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-3 mb-3">
            <h2 className="text-lg font-semibold text-gray-900">{item.name}</h2>
            {item.price && (
              <span className="text-lg font-bold text-gray-900 shrink-0">
                ${typeof item.price === 'number' ? item.price.toFixed(2) : item.price}
              </span>
            )}
          </div>

          {item.description && (
            <p className="text-gray-600 text-sm leading-relaxed mb-4">{item.description}</p>
          )}

          {/* Dietary badges */}
          {item.dietaryBadges && item.dietaryBadges.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {item.dietaryBadges.map((badge: string, i: number) => (
                <span key={i} className="px-2.5 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                  {badge}
                </span>
              ))}
            </div>
          )}

          <button
            onClick={onClose}
            className="w-full bg-[#44646c] text-white font-semibold py-3 rounded-xl hover:bg-[#3a565d] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// Menu item card with image (clickable)
function MenuItemCard({ item, index, onClick }: { item: any; index: number; onClick: () => void }) {
  const itemImage = item.image || item.imageUrl;

  return (
    <button
      onClick={onClick}
      className="flex flex-col p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-left w-full"
    >
      {itemImage ? (
        <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-gray-200 mb-2">
          <Image src={itemImage} alt={item.name || 'Menu item'} fill className="object-cover" />
        </div>
      ) : (
        <div className="w-full aspect-[4/3] rounded-lg bg-gray-200 mb-2 flex items-center justify-center">
          <Utensils className="w-8 h-8 text-gray-400" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 text-sm line-clamp-2">{item.name}</p>
        {item.description && (
          <p className="text-xs text-gray-500 line-clamp-2 mt-1">{item.description}</p>
        )}
        {item.price > 0 && (
          <p className="text-sm font-semibold text-[#44646c] mt-2">
            ${typeof item.price === 'number' ? item.price.toFixed(2) : item.price}
          </p>
        )}
      </div>
    </button>
  );
}

// Package detail modal - Listing page style
function PackageDetailModal({ pkg, onClose }: { pkg: CateringPackage; onClose: () => void }) {
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const price = pkg.costPerPerson || pkg.basePrice || pkg.price || 0;
  const pricingType = pkg.pricingType || 'per_person';
  const image = pkg.image || pkg.imageUrl;
  const menuItems = pkg.menuItems || [];
  const menuCategories = pkg.menuCategories || [];
  const beverages = pkg.beverages || [];
  const addOns = pkg.addOns || [];
  const rules = pkg.rules || [];

  return (
    <>
      <div className="fixed inset-0 z-50 bg-white overflow-auto">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
          <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
            <button onClick={onClose} className="flex items-center gap-1 text-gray-700 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back</span>
            </button>
            <div className="text-right">
              <span className="text-lg font-semibold text-gray-900">${price}</span>
              <span className="text-sm text-gray-500 ml-1">{pricingType === 'flat_fee' ? 'flat' : '/person'}</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-4 py-6">
          {/* Title */}
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">{pkg.name}</h1>
          {pkg.description && (
            <p className="text-gray-500 text-sm mb-4">{pkg.description}</p>
          )}

          {/* Image - Matching listing page style */}
          {image && (
            <div className="relative h-[200px] sm:h-[280px] rounded-xl overflow-hidden bg-gray-100 mb-6">
              <Image src={image} alt={pkg.name} fill className="object-cover" />
            </div>
          )}

          {/* Menu Categories */}
          {menuCategories.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-4">
                Menu
              </h2>
              {menuCategories.map((cat: any, idx: number) => (
                <div key={idx} className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900">{cat.name}</h3>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {(cat.items || []).length} items
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {(cat.items || []).map((item: any, i: number) => (
                      <MenuItemCard
                        key={i}
                        item={item}
                        index={idx * 10 + i}
                        onClick={() => setSelectedItem(item)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Legacy Menu Items */}
          {menuItems.length > 0 && menuCategories.length === 0 && (
            <div className="mb-8">
              <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-4">
                Included Items
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {menuItems.map((item: any, i: number) => {
                  const itemObj = typeof item === 'string' ? { name: item } : item;
                  return (
                    <MenuItemCard
                      key={i}
                      item={itemObj}
                      index={i}
                      onClick={() => setSelectedItem(itemObj)}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* Beverages */}
          {beverages.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-4">
                Beverages
              </h2>
              {(() => {
                const hasImages = beverages.some((item: any) => {
                  const bevObj = typeof item === 'string' ? {} : item;
                  return bevObj.image || bevObj.imageUrl;
                });

                if (hasImages) {
                  return (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {beverages.map((item: any, i: number) => {
                        const bevObj = typeof item === 'string' ? { name: item } : item;
                        const bevImage = bevObj.image || bevObj.imageUrl;
                        return (
                          <div key={i} className="flex flex-col p-3 bg-blue-50 rounded-xl">
                            {bevImage ? (
                              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-blue-100 mb-2">
                                <Image src={bevImage} alt={bevObj.name || 'Beverage'} fill className="object-cover" />
                              </div>
                            ) : (
                              <div className="w-full aspect-[4/3] rounded-lg bg-blue-100 mb-2 flex items-center justify-center">
                                <span className="text-2xl">🥤</span>
                              </div>
                            )}
                            <p className="font-medium text-gray-900 text-sm line-clamp-2">{bevObj.name}</p>
                            {bevObj.price > 0 && (
                              <p className="text-sm font-semibold text-blue-600 mt-1">
                                ${typeof bevObj.price === 'number' ? bevObj.price.toFixed(2) : bevObj.price}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                }

                // No images - show simple list
                return (
                  <div className="grid grid-cols-2 gap-2">
                    {beverages.map((item: any, i: number) => {
                      const bevName = typeof item === 'string' ? item : item.name;
                      const bevPrice = typeof item === 'object' ? item.price : null;
                      return (
                        <div key={i} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                          <span className="text-sm text-gray-700">{bevName}</span>
                          {bevPrice > 0 && (
                            <span className="text-sm font-medium text-blue-600">${bevPrice}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>
          )}

          {/* Add-ons */}
          {addOns.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-4">
                Add-ons
              </h2>
              {(() => {
                const hasImages = addOns.some((item: any) => {
                  const addOnObj = typeof item === 'string' ? {} : item;
                  return addOnObj.image || addOnObj.imageUrl;
                });

                if (hasImages) {
                  return (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {addOns.map((item: any, i: number) => {
                        const addOnObj = typeof item === 'string' ? { name: item } : item;
                        const addOnImage = addOnObj.image || addOnObj.imageUrl;
                        return (
                          <div key={i} className="flex flex-col p-3 bg-amber-50 rounded-xl">
                            {addOnImage ? (
                              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-amber-100 mb-2">
                                <Image src={addOnImage} alt={addOnObj.name || 'Add-on'} fill className="object-cover" />
                              </div>
                            ) : (
                              <div className="w-full aspect-[4/3] rounded-lg bg-amber-100 mb-2 flex items-center justify-center">
                                <span className="text-2xl">✨</span>
                              </div>
                            )}
                            <p className="font-medium text-gray-900 text-sm line-clamp-2">{addOnObj.name}</p>
                            {addOnObj.price > 0 && (
                              <p className="text-sm font-semibold text-amber-600 mt-1">
                                +${typeof addOnObj.price === 'number' ? addOnObj.price.toFixed(2) : addOnObj.price}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                }

                // No images - show simple list
                return (
                  <div className="space-y-2">
                    {addOns.map((item: any, i: number) => {
                      const addOnObj = typeof item === 'string' ? { name: item } : item;
                      return (
                        <div key={i} className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                          <span className="text-sm text-gray-700">{addOnObj.name}</span>
                          {addOnObj.price > 0 && (
                            <span className="text-sm font-medium text-amber-600">+${addOnObj.price}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>
          )}

          {/* Package Rules */}
          {rules.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-4">
                Selection Rules
              </h2>
              <div className="space-y-2">
                {rules.map((rule: any, i: number) => {
                  const ruleText = typeof rule === 'string' ? rule : rule.text || rule.description || rule.name;
                  const requiredSelection = typeof rule === 'object' ? rule.requiredSelection : null;
                  return (
                    <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-[#44646c] flex items-center justify-center shrink-0">
                        <span className="text-sm font-bold text-white">{requiredSelection || i + 1}</span>
                      </div>
                      <p className="text-sm text-gray-700 flex-1">{ruleText}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Book button */}
          <div className="sticky bottom-0 bg-white pt-4 pb-6 border-t border-gray-100 -mx-4 px-4">
            <button
              onClick={onClose}
              className="w-full bg-[#44646c] text-white font-semibold py-4 rounded-xl hover:bg-[#3a565d] transition-colors text-lg"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Menu Item Detail Modal */}
      {selectedItem && (
        <MenuItemDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </>
  );
}

export default function ProviderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [provider, setProvider] = useState<ProviderDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [selectedMenuType, setSelectedMenuType] = useState<'alacarte' | 'catering'>('alacarte');
  const [selectedPackage, setSelectedPackage] = useState<CateringPackage | null>(null);
  const [showAllHighlights, setShowAllHighlights] = useState(false);
  const [showAllAlaCarteItems, setShowAllAlaCarteItems] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    async function fetchProvider() {
      try {
        const res = await fetch(`/api/providers/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setProvider(data.provider);
          // Default to catering if no a la carte items
          if (data.provider?.cateringPackages?.length > 0 && !data.provider?.aLaCarteMenu?.length) {
            setSelectedMenuType('catering');
          }
        }
      } catch (error) {
        console.error('Error fetching provider:', error);
      } finally {
        setIsLoading(false);
      }
    }
    if (params.id) fetchProvider();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header Skeleton */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gray-200 rounded animate-pulse" />
              <div className="w-12 h-4 bg-gray-200 rounded animate-pulse hidden sm:block" />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-16 h-8 bg-gray-200 rounded-lg animate-pulse" />
              <div className="w-16 h-8 bg-gray-200 rounded-lg animate-pulse" />
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-6">
          {/* Title Skeleton */}
          <div className="h-8 w-2/3 bg-gray-200 rounded animate-pulse mb-2" />

          {/* Stats Row Skeleton */}
          <div className="flex items-center gap-3 mb-4">
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Image Gallery Skeleton */}
          <div className="grid grid-cols-4 gap-2 h-[280px] sm:h-[340px] rounded-xl overflow-hidden mb-6">
            <div className="col-span-2 row-span-2 bg-gray-200 animate-pulse" />
            <div className="bg-gray-200 animate-pulse" />
            <div className="bg-gray-200 animate-pulse" />
            <div className="bg-gray-200 animate-pulse" />
            <div className="bg-gray-200 animate-pulse" />
          </div>

          {/* Content Grid Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description Skeleton */}
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200" />

              {/* Highlights Skeleton */}
              <div className="space-y-4">
                <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse" />
                      <div className="flex-1 space-y-1">
                        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                        <div className="h-3 w-32 bg-gray-200 rounded animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200" />

              {/* Menu Section Skeleton */}
              <div className="space-y-4">
                <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
                <div className="flex gap-2">
                  <div className="h-10 w-24 bg-gray-200 rounded-full animate-pulse" />
                  <div className="h-10 w-32 bg-gray-200 rounded-full animate-pulse" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="bg-gray-100 rounded-xl p-3">
                      <div className="aspect-[4/3] bg-gray-200 rounded-lg animate-pulse mb-2" />
                      <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-1" />
                      <div className="h-3 w-2/3 bg-gray-200 rounded animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Skeleton */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
                <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-12 w-full bg-gray-200 rounded-xl animate-pulse" />
                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-28 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Provider not found</h1>
          <Link href="/" className="text-[#44646c] underline text-sm">Back to marketplace</Link>
        </div>
      </div>
    );
  }

  const images = provider.imageUrls?.length > 0 ? provider.imageUrls : provider.primaryImageUrl ? [provider.primaryImageUrl] : [];
  const location = provider.city && provider.state ? `${provider.city}, ${provider.state}` : provider.city || provider.state || '';

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'FoodBeverage': return Utensils;
      case 'Entertainment': return Music;
      case 'Venues': return Building2;
      case 'Vendors': return Package;
      default: return Package;
    }
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'FoodBeverage': return 'Catering';
      case 'Entertainment': return 'Entertainment';
      case 'Venues': return 'Venue';
      case 'Vendors': return 'Vendor';
      default: return cat;
    }
  };

  // Build highlights for the provider
  const buildHighlights = () => {
    const highlights: { icon: any; title: string; subtitle: string }[] = [];

    if (provider.category === 'FoodBeverage') {
      if (provider.cuisineTypes) {
        highlights.push({ icon: Utensils, title: `${provider.cuisineTypes} Cuisine`, subtitle: 'Authentic flavors & dishes' });
      }
      if (provider.minimumGuarantee) {
        highlights.push({ icon: DollarSign, title: `$${provider.minimumGuarantee} minimum`, subtitle: 'Minimum order requirement' });
      }
      if (provider.serviceStyle) {
        highlights.push({ icon: Users, title: provider.serviceStyle, subtitle: 'Service style' });
      }
      if (provider.dietarySpecialties?.length) {
        highlights.push({ icon: Leaf, title: provider.dietarySpecialties.join(', '), subtitle: 'Dietary accommodations available' });
      }
      if (provider.traits?.length) {
        highlights.push({ icon: Sparkles, title: provider.traits.join(', '), subtitle: 'What makes this provider special' });
      }
    }

    if (provider.category === 'Entertainment') {
      if (provider.genres) {
        highlights.push({ icon: Music, title: provider.genres, subtitle: 'Music genres' });
      }
      if (provider.performanceType) {
        highlights.push({ icon: Star, title: provider.performanceType, subtitle: 'Performance type' });
      }
      if (provider.performanceLength) {
        highlights.push({ icon: Clock, title: provider.performanceLength, subtitle: 'Typical performance length' });
      }
      if (provider.compensationFlatFee) {
        highlights.push({ icon: DollarSign, title: `$${provider.compensationFlatFee} flat fee`, subtitle: 'Starting price' });
      }
    }

    if (provider.category === 'Venues') {
      if (provider.venueType) {
        highlights.push({ icon: Building2, title: provider.venueType, subtitle: 'Venue type' });
      }
      if (provider.capacityStanding || provider.capacitySeated) {
        const cap = provider.capacityStanding || provider.capacitySeated;
        highlights.push({ icon: Users, title: `Up to ${cap} guests`, subtitle: provider.capacityStanding ? 'Standing capacity' : 'Seated capacity' });
      }
      if (provider.squareFootage) {
        highlights.push({ icon: Grid3X3, title: `${provider.squareFootage} sq ft`, subtitle: 'Total space' });
      }
      if (provider.parking) {
        highlights.push({ icon: Navigation, title: provider.parking, subtitle: 'Parking available' });
      }
    }

    if (provider.category === 'Vendors') {
      if (provider.productCategory) {
        highlights.push({ icon: Package, title: provider.productCategory, subtitle: 'Product category' });
      }
      if (provider.inventoryModel) {
        highlights.push({ icon: CheckCircle2, title: provider.inventoryModel, subtitle: 'Inventory model' });
      }
      if (provider.minimumOrderRequirement) {
        highlights.push({ icon: DollarSign, title: `$${provider.minimumOrderRequirement} minimum`, subtitle: 'Minimum order' });
      }
    }

    // Common highlights
    if (provider.serviceRadius) {
      highlights.push({ icon: Navigation, title: `${provider.serviceRadius} mile service area`, subtitle: 'Will travel to your event' });
    }
    if (provider.yearsInBusiness && provider.yearsInBusiness !== 'N/A') {
      highlights.push({ icon: Award, title: `${provider.yearsInBusiness} years experience`, subtitle: 'Established business' });
    }

    return highlights;
  };

  const highlights = buildHighlights();
  const visibleHighlights = showAllHighlights ? highlights : highlights.slice(0, 3);

  // Photo gallery modal
  if (showAllPhotos) {
    return (
      <div className="fixed inset-0 bg-white z-50 overflow-auto">
        <div className="sticky top-0 bg-white border-b z-10">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <button onClick={() => setShowAllPhotos(false)} className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded-lg">
              <X className="w-5 h-5" />
              <span className="font-medium">Close</span>
            </button>
            <span className="text-sm text-gray-500">{images.length} photos</span>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {images.map((image, index) => (
              <div key={index} className={`relative ${index === 0 ? 'md:col-span-2 aspect-[16/9]' : 'aspect-square'} rounded-lg overflow-hidden`}>
                <Image src={image} alt={`Photo ${index + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <button onClick={() => router.back()} className="flex items-center gap-1 text-gray-700 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium hidden sm:inline">Back</span>
          </button>
          <div className="flex items-center gap-1">
            <button className="flex items-center gap-1 hover:bg-gray-100 px-3 py-1.5 rounded-lg text-sm">
              <Share2 className="w-4 h-4" />
              <span className="underline font-medium">Share</span>
            </button>
            <button onClick={() => setIsFavorite(!isFavorite)} className="flex items-center gap-1 hover:bg-gray-100 px-3 py-1.5 rounded-lg text-sm">
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
              <span className="underline font-medium">Save</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">{provider.name}</h1>

        {/* Quick stats row */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4 flex-wrap">
          {provider.rating && (
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-black" />
              <span className="font-medium text-gray-900">{provider.rating.toFixed(1)}</span>
              {provider.reviewCount && <span>({provider.reviewCount} reviews)</span>}
            </span>
          )}
          {provider.rating && location && <span className="text-gray-400">·</span>}
          {location && <span>{location}</span>}
        </div>

        {/* Image Gallery */}
        <div className="relative mb-6">
          {images.length >= 5 ? (
            <div className="grid grid-cols-4 gap-2 h-[280px] sm:h-[340px] rounded-xl overflow-hidden">
              <div className="col-span-2 row-span-2 relative cursor-pointer" onClick={() => setShowAllPhotos(true)}>
                <Image src={images[0]} alt={provider.name} fill className="object-cover hover:opacity-95 transition-opacity" priority />
              </div>
              {images.slice(1, 5).map((image, index) => (
                <div key={index} className="relative cursor-pointer" onClick={() => setShowAllPhotos(true)}>
                  <Image src={image} alt={`Photo ${index + 2}`} fill className="object-cover hover:opacity-95 transition-opacity" />
                </div>
              ))}
            </div>
          ) : images.length > 0 ? (
            <div className="relative h-[280px] sm:h-[340px] rounded-xl overflow-hidden">
              <Image src={images[currentImageIndex]} alt={provider.name} fill className="object-cover" priority />
              {images.length > 1 && (
                <>
                  <button onClick={() => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)} className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)} className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="h-[280px] bg-gray-100 rounded-xl flex items-center justify-center">
              <span className="text-gray-400 text-sm">No images available</span>
            </div>
          )}
          {images.length > 1 && (
            <button onClick={() => setShowAllPhotos(true)} className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg text-xs font-medium shadow-md hover:bg-gray-50">
              <Grid3X3 className="w-3.5 h-3.5" />
              Show all photos
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Category header */}
            <div className="flex items-center justify-between pb-6 border-b border-gray-200">
              <div>
                <div className="flex items-center gap-2 text-lg text-gray-900">
                  {(() => { const Icon = getCategoryIcon(provider.category); return <Icon className="w-5 h-5" />; })()}
                  <span className="font-medium">{getCategoryLabel(provider.category)}</span>
                  {location && (
                    <>
                      <span className="text-gray-400 font-normal">in</span>
                      <span className="font-normal">{location}</span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1 text-sm text-gray-500 flex-wrap">
                  {provider.yearsInBusiness && provider.yearsInBusiness !== 'N/A' && <span>{provider.yearsInBusiness}+ years experience</span>}
                  {provider.serviceRadius && provider.serviceRadius > 0 && (
                    <>
                      {provider.yearsInBusiness && <span className="w-1 h-1 bg-gray-400 rounded-full" />}
                      <span>{provider.serviceRadius} mile service area</span>
                    </>
                  )}
                  {provider.leadTimeRequired && provider.leadTimeRequired !== 'N/A' && (
                    <>
                      <span className="w-1 h-1 bg-gray-400 rounded-full" />
                      <span>{provider.leadTimeRequired} lead time</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Highlights Section (Airbnb style) */}
            {highlights.length > 0 && (
              <div className="py-6 border-b border-gray-200">
                <div className="divide-y divide-gray-100">
                  {visibleHighlights.map((h, i) => (
                    <HighlightRow key={i} icon={h.icon} title={h.title} subtitle={h.subtitle} />
                  ))}
                </div>
                {highlights.length > 3 && (
                  <button
                    onClick={() => setShowAllHighlights(!showAllHighlights)}
                    className="flex items-center gap-1 mt-2 text-sm font-medium text-gray-900 underline"
                  >
                    {showAllHighlights ? 'Show less' : `Show all ${highlights.length} highlights`}
                    {showAllHighlights ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                )}
              </div>
            )}

            {/* About Section */}
            {(provider.bio || provider.description) && (
              <div className="py-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">About {provider.name}</h2>
                {(() => {
                  const text = provider.bio || provider.description || '';
                  const isLong = text.length > 300;
                  const displayText = showFullDescription || !isLong ? text : text.slice(0, 300) + '...';
                  return (
                    <>
                      <p className="text-gray-600 text-[15px] leading-relaxed whitespace-pre-line">{displayText}</p>
                      {isLong && (
                        <button
                          onClick={() => setShowFullDescription(!showFullDescription)}
                          className="mt-3 text-[15px] font-semibold text-gray-900 underline hover:text-gray-700 transition-colors"
                        >
                          {showFullDescription ? 'Show less' : 'Read more'}
                        </button>
                      )}
                    </>
                  );
                })()}
              </div>
            )}

            {/* Menu Section (Food & Beverage) */}
            {provider.category === 'FoodBeverage' && ((provider.aLaCarteMenu?.length || 0) > 0 || (provider.cateringPackages?.length || 0) > 0) && (
              <div className="py-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Menu</h2>

                {/* Menu Toggle */}
                {(provider.aLaCarteMenu?.length || 0) > 0 && (provider.cateringPackages?.length || 0) > 0 && (
                  <div className="flex bg-gray-100 rounded-lg p-1 mb-5 w-fit">
                    <button
                      onClick={() => setSelectedMenuType('alacarte')}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${selectedMenuType === 'alacarte' ? 'bg-[#44646c] text-white' : 'text-gray-600'}`}
                    >
                      À La Carte
                    </button>
                    <button
                      onClick={() => setSelectedMenuType('catering')}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${selectedMenuType === 'catering' ? 'bg-[#44646c] text-white' : 'text-gray-600'}`}
                    >
                      Catering Packages
                    </button>
                  </div>
                )}

                {/* A La Carte */}
                {selectedMenuType === 'alacarte' && provider.aLaCarteMenu && provider.aLaCarteMenu.length > 0 && (() => {
                  const hasImages = provider.aLaCarteMenu.some(item => item.image || item.imageUrl);
                  const displayedItems = showAllAlaCarteItems ? provider.aLaCarteMenu : provider.aLaCarteMenu.slice(0, hasImages ? 8 : 6);
                  const remainingCount = provider.aLaCarteMenu.length - (hasImages ? 8 : 6);

                  if (hasImages) {
                    return (
                      <div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                          {displayedItems.map((item, index) => {
                            const itemImage = item.image || item.imageUrl;
                            return (
                              <div key={item.id || index} className="flex flex-col p-3 bg-gray-50 rounded-xl">
                                {itemImage ? (
                                  <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-gray-200 mb-2">
                                    <Image src={itemImage} alt={item.name} fill className="object-cover" />
                                  </div>
                                ) : (
                                  <div className="w-full aspect-[4/3] rounded-lg bg-gray-200 mb-2 flex items-center justify-center">
                                    <Utensils className="w-8 h-8 text-gray-400" />
                                  </div>
                                )}
                                <p className="font-medium text-gray-900 text-sm line-clamp-2">{item.name}</p>
                                {item.description && (
                                  <p className="text-xs text-gray-500 line-clamp-2 mt-1">{item.description}</p>
                                )}
                                {item.price > 0 && (
                                  <p className="text-sm font-semibold text-[#44646c] mt-2">
                                    ${typeof item.price === 'number' ? item.price.toFixed(2) : item.price}
                                  </p>
                                )}
                              </div>
                            );
                          })}
                        </div>
                        {remainingCount > 0 && !showAllAlaCarteItems && (
                          <button
                            onClick={() => setShowAllAlaCarteItems(true)}
                            className="text-sm text-[#44646c] font-medium mt-4 hover:underline"
                          >
                            +{remainingCount} more items
                          </button>
                        )}
                        {showAllAlaCarteItems && provider.aLaCarteMenu.length > 8 && (
                          <button
                            onClick={() => setShowAllAlaCarteItems(false)}
                            className="text-sm text-[#44646c] font-medium mt-4 hover:underline"
                          >
                            Show less
                          </button>
                        )}
                      </div>
                    );
                  }

                  // No images - show list format
                  return (
                    <div className="space-y-3">
                      {displayedItems.map((item, index) => (
                        <div key={item.id || index} className="flex justify-between items-start py-2 border-b border-gray-100 last:border-0">
                          <div className="flex-1 min-w-0 pr-4">
                            <p className="font-medium text-gray-900 text-sm">{item.name}</p>
                            {item.description && <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{item.description}</p>}
                          </div>
                          {item.price > 0 && (
                            <span className="font-medium text-gray-900 text-sm">${typeof item.price === 'number' ? item.price.toFixed(2) : item.price}</span>
                          )}
                        </div>
                      ))}
                      {remainingCount > 0 && !showAllAlaCarteItems && (
                        <button
                          onClick={() => setShowAllAlaCarteItems(true)}
                          className="text-sm text-[#44646c] font-medium hover:underline"
                        >
                          +{remainingCount} more items
                        </button>
                      )}
                      {showAllAlaCarteItems && provider.aLaCarteMenu.length > 6 && (
                        <button
                          onClick={() => setShowAllAlaCarteItems(false)}
                          className="text-sm text-[#44646c] font-medium hover:underline"
                        >
                          Show less
                        </button>
                      )}
                    </div>
                  );
                })()}

                {/* Catering Packages */}
                {selectedMenuType === 'catering' && provider.cateringPackages && provider.cateringPackages.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {provider.cateringPackages.map((pkg, index) => (
                      <CateringPackageCard
                        key={pkg.id || index}
                        pkg={pkg}
                        onViewDetails={() => setSelectedPackage(pkg)}
                      />
                    ))}
                  </div>
                )}

                {/* Empty states */}
                {selectedMenuType === 'alacarte' && (!provider.aLaCarteMenu || provider.aLaCarteMenu.length === 0) && (
                  <p className="text-sm text-gray-500">No à la carte items available</p>
                )}
                {selectedMenuType === 'catering' && (!provider.cateringPackages || provider.cateringPackages.length === 0) && (
                  <p className="text-sm text-gray-500">No catering packages available</p>
                )}
              </div>
            )}

            {/* Services Offered (for Vendors) */}
            {provider.category === 'Vendors' && provider.serviceItems && provider.serviceItems.length > 0 && (
              <div className="py-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Services Offered</h2>

                {/* Category filter pills if there are multiple categories */}
                {(() => {
                  const categories = [...new Set(provider.serviceItems.map((s: any) => s.category).filter(Boolean))] as string[];
                  if (categories.length > 1) {
                    return (
                      <div className="flex flex-wrap gap-2 mb-4">
                        <button className="px-4 py-2 rounded-full text-sm font-medium bg-[#44646c] text-white">
                          All
                        </button>
                        {categories.map((cat, i) => (
                          <button key={i} className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200">
                            {cat}
                          </button>
                        ))}
                      </div>
                    );
                  }
                  return null;
                })()}

                <div className="space-y-4">
                  {provider.serviceItems.map((service: any, index: number) => {
                    const serviceImage = service.image || service.photo || (service.photos && service.photos[0]);
                    return (
                      <div key={index} className="border border-gray-200 rounded-xl p-4">
                        {serviceImage && (
                          <button
                            onClick={() => setFullScreenImage(serviceImage)}
                            className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100 mb-4 block cursor-pointer group"
                          >
                            <Image src={serviceImage} alt={service.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                            {/* Click to view tag */}
                            <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5">
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                              </svg>
                              Click to view
                            </div>
                          </button>
                        )}
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{service.name}</h3>
                            {service.category && (
                              <p className="text-xs text-gray-500 mt-0.5">{service.category}</p>
                            )}
                          </div>
                          {service.price > 0 && (
                            <div className="text-right">
                              <p className="text-lg font-bold text-gray-900">${typeof service.price === 'number' ? service.price.toLocaleString() : service.price}</p>
                              {service.pricingUnit && (
                                <p className="text-xs text-gray-500">{service.pricingUnit}</p>
                              )}
                            </div>
                          )}
                        </div>
                        {service.serviceDetails && (
                          <p className="text-sm text-gray-600 mt-3 line-clamp-3">{service.serviceDetails}</p>
                        )}
                        {service.maxQuantity && (
                          <p className="text-xs text-gray-500 mt-2">Max quantity: {service.maxQuantity}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Products (for Vendors) */}
            {provider.category === 'Vendors' && provider.productItems && provider.productItems.length > 0 && (
              <div className="py-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Products</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {provider.productItems.map((product: any, index: number) => {
                    const productImage = product.image || product.photo || (product.photos && product.photos[0]);
                    return (
                      <div key={index} className="border border-gray-200 rounded-xl p-3">
                        {productImage && (
                          <button
                            onClick={() => setFullScreenImage(productImage)}
                            className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100 mb-3 block cursor-pointer group"
                          >
                            <Image src={productImage} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                            <div className="absolute bottom-1.5 right-1.5 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-full flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                              </svg>
                              View
                            </div>
                          </button>
                        )}
                        <h3 className="font-medium text-gray-900 text-sm">{product.name}</h3>
                        {product.price > 0 && (
                          <p className="text-sm font-semibold text-[#44646c] mt-1">${product.price}</p>
                        )}
                        {product.description && (
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{product.description}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* What this place offers (amenities for venues) */}
            {provider.category === 'Venues' && provider.amenities && provider.amenities.length > 0 && (
              <div className="py-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">What this venue offers</h2>
                <div className="grid grid-cols-2 gap-3">
                  {provider.amenities.slice(0, 8).map((amenity, index) => (
                    <div key={index} className="flex items-center gap-3 text-sm text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-gray-500" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
                {provider.amenities.length > 8 && (
                  <p className="text-sm text-gray-500 mt-3">+{provider.amenities.length - 8} more amenities</p>
                )}
              </div>
            )}

            {/* Special Features */}
            {provider.specialFeatures && provider.specialFeatures.length > 0 && (
              <div className="py-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">What this provider offers</h2>
                <div className="grid grid-cols-2 gap-3">
                  {provider.specialFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 text-sm text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-gray-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Things to Know Section */}
            {(provider.cancellationPolicy || provider.leadTimeRequired || provider.calendarAvailability) && (
              <div className="py-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Things to know</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Cancellation Policy */}
                  {provider.cancellationPolicy && (
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                        <X className="w-4 h-4" />
                        Cancellation policy
                      </h3>
                      <p className="text-sm text-gray-600 capitalize">{provider.cancellationPolicy}</p>
                      {provider.cancellationPolicy === 'flexible' && (
                        <p className="text-xs text-gray-500 mt-1">Full refund 30+ days before event</p>
                      )}
                      {provider.cancellationPolicy === 'moderate' && (
                        <p className="text-xs text-gray-500 mt-1">Full refund 60+ days before event</p>
                      )}
                      {provider.cancellationPolicy === 'strict' && (
                        <p className="text-xs text-gray-500 mt-1">Full refund 90+ days before event</p>
                      )}
                    </div>
                  )}

                  {/* Lead Time */}
                  {provider.leadTimeRequired && (
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Booking notice
                      </h3>
                      <p className="text-sm text-gray-600">{provider.leadTimeRequired} advance notice required</p>
                    </div>
                  )}

                  {/* Availability */}
                  {provider.calendarAvailability && (
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Availability
                      </h3>
                      <p className="text-sm text-gray-600 capitalize">{provider.calendarAvailability}</p>
                    </div>
                  )}

                  {/* Deposit (if available) */}
                  {provider.depositPercentage && provider.depositPercentage > 0 && (
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        Deposit required
                      </h3>
                      <p className="text-sm text-gray-600">{provider.depositPercentage}% deposit to book</p>
                      {provider.depositDueAtBooking && (
                        <p className="text-xs text-gray-500 mt-1">Due {provider.depositDueAtBooking}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Service Area Map Section */}
            {provider.serviceRadius && provider.serviceRadius > 0 && (
              <div className="py-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Service area</h2>
                <div className="h-[300px] rounded-xl overflow-hidden">
                  <ServiceAreaMap
                    lat={provider.lat}
                    lng={provider.lng}
                    serviceRadius={provider.serviceRadius}
                    providerName={provider.name}
                    city={provider.city}
                    state={provider.state}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 border border-gray-200 rounded-xl p-5 shadow-lg">
              {/* Price */}
              <div className="mb-4">
                {provider.category === 'FoodBeverage' && provider.minimumGuarantee && (
                  <>
                    <span className="text-xl font-semibold">${provider.minimumGuarantee}</span>
                    <span className="text-gray-500 text-sm"> minimum</span>
                  </>
                )}
                {provider.category === 'Entertainment' && provider.compensationFlatFee && (
                  <>
                    <span className="text-xl font-semibold">${provider.compensationFlatFee}</span>
                    <span className="text-gray-500 text-sm"> starting</span>
                  </>
                )}
                {provider.category === 'Venues' && (provider.rentalFeeHourly || provider.rentalFeeFlat) && (
                  <>
                    <span className="text-xl font-semibold">${provider.rentalFeeHourly || provider.rentalFeeFlat}</span>
                    <span className="text-gray-500 text-sm">{provider.rentalFeeHourly ? ' /hour' : ' flat'}</span>
                  </>
                )}
                {provider.category === 'Vendors' && provider.minimumOrderRequirement && (
                  <>
                    <span className="text-xl font-semibold">${provider.minimumOrderRequirement}</span>
                    <span className="text-gray-500 text-sm"> minimum order</span>
                  </>
                )}
              </div>

              <button className="w-full bg-[#44646c] text-white font-semibold py-3 px-4 rounded-lg hover:bg-[#3a565d] transition-colors mb-3">
                Book
              </button>
              <button className="w-full border border-gray-300 text-gray-900 font-semibold py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors mb-4">
                Message Provider
              </button>

              <p className="text-center text-xs text-gray-500 mb-5">You won&apos;t be charged yet</p>

              {/* Contact Information - Blurred */}
              <div className="border-t pt-5">
                <h3 className="font-semibold text-gray-900 text-sm mb-3">Contact Information</h3>
                <div className="relative">
                  <div className="space-y-3 blur-sm select-none pointer-events-none">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <Phone className="w-4 h-4 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Phone</p>
                        <p className="text-sm">(555) 123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <Mail className="w-4 h-4 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Email</p>
                        <p className="text-sm">contact@example.com</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-white/60 rounded-lg">
                    <div className="text-center">
                      <Lock className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                      <p className="text-xs text-gray-500 font-medium">Available after booking</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              {provider.socialMedia && (provider.socialMedia.instagram || provider.socialMedia.facebook) && (
                <div className="mt-5 pt-5 border-t">
                  <p className="text-xs text-gray-500 mb-2">Follow on social</p>
                  <div className="flex gap-2">
                    {provider.socialMedia.instagram && (
                      <a href={provider.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">
                        <Instagram className="w-4 h-4 text-gray-600" />
                      </a>
                    )}
                    {provider.socialMedia.facebook && (
                      <a href={provider.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">
                        <Facebook className="w-4 h-4 text-gray-600" />
                      </a>
                    )}
                    {provider.socialMedia.twitter && (
                      <a href={provider.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">
                        <Twitter className="w-4 h-4 text-gray-600" />
                      </a>
                    )}
                    {provider.socialMedia.youtube && (
                      <a href={provider.socialMedia.youtube} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">
                        <Youtube className="w-4 h-4 text-gray-600" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Package Detail Modal */}
      {selectedPackage && (
        <PackageDetailModal pkg={selectedPackage} onClose={() => setSelectedPackage(null)} />
      )}

      {/* Full Screen Image Modal */}
      {fullScreenImage && (
        <div className="fixed inset-0 z-[70] bg-black flex items-center justify-center">
          {/* Close button */}
          <button
            onClick={() => setFullScreenImage(null)}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Image */}
          <div className="relative w-full h-full max-w-5xl max-h-[90vh] m-4">
            <Image
              src={fullScreenImage}
              alt="Full screen view"
              fill
              className="object-contain"
            />
          </div>

          {/* Click outside to close */}
          <div
            className="absolute inset-0 -z-10"
            onClick={() => setFullScreenImage(null)}
          />
        </div>
      )}
    </div>
  );
}
