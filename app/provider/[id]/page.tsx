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
  Pause,
  X,
  Grid3X3,
  Award,
  Leaf,
  ShieldCheck,
  Calendar,
  Car,
  Wifi,
  Volume2,
  DollarSign,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  ExternalLink,
} from 'lucide-react';

interface MenuItem {
  id?: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  category?: string;
  dietaryBadges?: string[];
  isAvailable?: boolean;
}

interface CateringPackage {
  name: string;
  description?: string;
  basePrice: number;
  image?: string;
}

interface NonprofitFlexibility {
  reduceMinimum?: boolean;
  reducedMinimum?: string;
  waiveMinimum?: boolean;
  discountedMenu?: boolean;
  discountPercentage?: string;
  freeServices?: boolean;
  reduceFee?: boolean;
  waiveFee?: boolean;
}

interface HighVolumePartner {
  reduceMinimum?: boolean;
  reducedMinimum?: string;
  waiveMinimum?: boolean;
  packageDeals?: boolean;
  reduceFee?: boolean;
  reduceFeeValue?: number;
}

interface SocialMedia {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
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
  zipCode?: string;
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
  calendarAvailability?: string;
  socialMedia?: SocialMedia;
  cancellationPolicy?: string;
  cancellationPolicyDetails?: string;

  // Food & Beverage
  cuisineTypes?: string;
  serviceStyle?: string;
  dietarySpecialties?: string[];
  traits?: string[];
  minimumGuarantee?: string;
  foodTruckDimensions?: string;
  menuAlaCarte?: string;
  menuCatering?: string;
  aLaCarteMenu?: MenuItem[];
  cateringPackages?: CateringPackage[];
  taxRate?: number;
  nonprofitFlexibility?: NonprofitFlexibility;
  highVolumePartner?: HighVolumePartner;

  // Entertainment
  genres?: string;
  performanceType?: string;
  performanceLength?: string;
  technicalRequirements?: string;
  performanceTypes?: string[];
  performanceStyles?: string[];
  specializations?: string[];
  achievements?: string;
  compensationFlatFee?: string;
  compensationHourly?: string;
  feeStructureDetails?: string[];
  demoAudio?: string;
  performanceVideo?: string;
  allAudio?: string[];
  allVideos?: string[];
  travelPolicy?: string;
  travelNotes?: string;
  basedIn?: string;
  setupTime?: string;
  teardownTime?: string;
  amplification?: string;
  performanceAreaRequirements?: string;

  // Venues
  venueType?: string;
  capacitySeated?: string;
  capacityStanding?: string;
  squareFootage?: string;
  layoutOptions?: string;
  amenities?: string[];
  accessibility?: string[];
  includedRentals?: string[];
  parking?: string;
  parkingDetails?: string;
  kitchenAccess?: string;
  kitchenAccessDetails?: string;
  alcoholPolicy?: string;
  alcoholPolicyDetails?: string;
  securityRequirements?: string;
  securityCameras?: boolean;
  wifiAvailable?: boolean;
  wifiName?: string;
  houseRules?: string[];
  noiseCurfew?: string;
  noiseCurfewRestrictions?: string;
  preferredVendorList?: boolean;
  allowOutsideVendors?: boolean;
  externalVendorsAllowed?: string;
  rentalFeeHourly?: string;
  rentalFeeFlat?: string;
  minimumSpendRequirement?: string;
  minimumHours?: string;
  cleaningFee?: string;
  cleaningFeeAmount?: string;
  depositRequired?: string;
  requiresInsurance?: boolean;
  insuranceLiabilityRequirements?: string;
  historicLandmark?: boolean;
  waterfront?: boolean;
  rooftop?: boolean;
  uniqueArchitecture?: boolean;
  fullService?: boolean;
  blankCanvas?: boolean;
  ecoFriendly?: boolean;
  customDifferentiators?: string[];

  // Vendors
  productCategory?: string;
  productionType?: string;
  averagePriceRange?: string;
  inventoryModel?: string;
  minimumOrderRequirement?: string;
  serviceItems?: any[];
  productItems?: any[];
}

// Loading skeleton for detail page
function DetailSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center">
          <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-4 gap-2 h-[400px] rounded-xl overflow-hidden mb-8">
          <div className="col-span-2 row-span-2 bg-gray-200 animate-pulse" />
          <div className="bg-gray-200 animate-pulse" />
          <div className="bg-gray-200 animate-pulse" />
          <div className="bg-gray-200 animate-pulse" />
          <div className="bg-gray-200 animate-pulse" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-10 w-3/4 bg-gray-200 rounded animate-pulse" />
            <div className="h-6 w-1/2 bg-gray-200 rounded animate-pulse" />
            <div className="h-32 w-full bg-gray-200 rounded animate-pulse" />
          </div>
          <div>
            <div className="h-64 w-full bg-gray-200 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Identity tag badge component
function IdentityTag({ tag }: { tag: string }) {
  const tagConfig: Record<string, { label: string; icon: React.ReactNode; bgColor: string; textColor: string }> = {
    'nonprofit': { label: 'Nonprofit', icon: <Heart className="w-3 h-3" />, bgColor: 'bg-green-100', textColor: 'text-green-800' },
    'woman-owned': { label: 'Woman-Owned', icon: <Award className="w-3 h-3" />, bgColor: 'bg-purple-100', textColor: 'text-purple-800' },
    'veteran-owned': { label: 'Veteran-Owned', icon: <ShieldCheck className="w-3 h-3" />, bgColor: 'bg-blue-100', textColor: 'text-blue-800' },
    'minority-owned': { label: 'Minority-Owned', icon: <Award className="w-3 h-3" />, bgColor: 'bg-orange-100', textColor: 'text-orange-800' },
    'lgbtq-owned': { label: 'LGBTQ+ Owned', icon: <Award className="w-3 h-3" />, bgColor: 'bg-pink-100', textColor: 'text-pink-800' },
    'eco-friendly': { label: 'Eco-Friendly', icon: <Leaf className="w-3 h-3" />, bgColor: 'bg-green-100', textColor: 'text-green-800' },
    'local': { label: 'Local Business', icon: <MapPin className="w-3 h-3" />, bgColor: 'bg-amber-100', textColor: 'text-amber-800' },
    'family-owned': { label: 'Family-Owned', icon: <Users className="w-3 h-3" />, bgColor: 'bg-rose-100', textColor: 'text-rose-800' },
  };

  const normalizedTag = tag.toLowerCase().replace(/\s+/g, '-');
  const config = tagConfig[normalizedTag] || { label: tag, icon: <Award className="w-3 h-3" />, bgColor: 'bg-gray-100', textColor: 'text-gray-800' };

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.textColor}`}>
      {config.icon}
      {config.label}
    </span>
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
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  useEffect(() => {
    async function fetchProvider() {
      try {
        const res = await fetch(`/api/providers/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setProvider(data.provider);
        }
      } catch (error) {
        console.error('Error fetching provider:', error);
      } finally {
        setIsLoading(false);
      }
    }

    if (params.id) {
      fetchProvider();
    }
  }, [params.id]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'FoodBeverage': return <Utensils className="w-5 h-5" />;
      case 'Entertainment': return <Music className="w-5 h-5" />;
      case 'Venues': return <Building2 className="w-5 h-5" />;
      case 'Vendors': return <Package className="w-5 h-5" />;
      default: return null;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'FoodBeverage': return 'Catering';
      case 'Entertainment': return 'Entertainment';
      case 'Venues': return 'Venue';
      case 'Vendors': return 'Vendor';
      default: return category;
    }
  };

  if (isLoading) {
    return <DetailSkeleton />;
  }

  if (!provider) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Provider not found</h1>
          <p className="text-gray-500 mb-4">The provider you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/" className="text-black underline hover:text-gray-700 font-medium">
            Back to marketplace
          </Link>
        </div>
      </div>
    );
  }

  const images = provider.imageUrls?.length > 0 ? provider.imageUrls :
    provider.primaryImageUrl ? [provider.primaryImageUrl] : [];

  const location = provider.city && provider.state ? `${provider.city}, ${provider.state}` : provider.city || provider.state || '';

  const hasNonprofitFlexibility = provider.nonprofitFlexibility && (
    provider.nonprofitFlexibility.reduceMinimum ||
    provider.nonprofitFlexibility.waiveMinimum ||
    provider.nonprofitFlexibility.discountedMenu ||
    provider.nonprofitFlexibility.freeServices ||
    provider.nonprofitFlexibility.reduceFee ||
    provider.nonprofitFlexibility.waiveFee
  );

  const hasHighVolumePartner = provider.highVolumePartner && (
    provider.highVolumePartner.reduceMinimum ||
    provider.highVolumePartner.waiveMinimum ||
    provider.highVolumePartner.packageDeals ||
    provider.highVolumePartner.reduceFee
  );

  // Full-screen photo gallery modal
  if (showAllPhotos) {
    return (
      <div className="fixed inset-0 bg-white z-50 overflow-auto">
        <div className="sticky top-0 bg-white border-b z-10">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <button
              onClick={() => setShowAllPhotos(false)}
              className="flex items-center gap-2 text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors"
            >
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
                <Image
                  src={image}
                  alt={`${provider.name} photo ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium hidden sm:inline">Back</span>
          </button>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors">
              <Share2 className="w-5 h-5" />
              <span className="font-medium underline hidden sm:inline">Share</span>
            </button>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
              <span className="font-medium underline hidden sm:inline">Save</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">{provider.name}</h1>

        {/* Identity Tags */}
        {provider.ownerIdentityTags && provider.ownerIdentityTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {provider.ownerIdentityTags.map((tag, index) => (
              <IdentityTag key={index} tag={tag} />
            ))}
          </div>
        )}

        {/* Image Gallery */}
        <div className="relative mb-8">
          {images.length >= 5 ? (
            <div className="grid grid-cols-4 gap-2 h-[300px] sm:h-[400px] rounded-xl overflow-hidden">
              <div className="col-span-2 row-span-2 relative cursor-pointer" onClick={() => setShowAllPhotos(true)}>
                <Image
                  src={images[0]}
                  alt={provider.name}
                  fill
                  className="object-cover hover:opacity-90 transition-opacity"
                  priority
                />
              </div>
              {images.slice(1, 5).map((image, index) => (
                <div key={index} className="relative cursor-pointer" onClick={() => setShowAllPhotos(true)}>
                  <Image
                    src={image}
                    alt={`${provider.name} ${index + 2}`}
                    fill
                    className="object-cover hover:opacity-90 transition-opacity"
                  />
                </div>
              ))}
            </div>
          ) : images.length > 0 ? (
            <div className="relative h-[300px] sm:h-[400px] rounded-xl overflow-hidden cursor-pointer" onClick={() => setShowAllPhotos(true)}>
              <Image
                src={images[currentImageIndex]}
                alt={provider.name}
                fill
                className="object-cover"
                priority
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length); }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-800" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setCurrentImageIndex((prev) => (prev + 1) % images.length); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-800" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index); }}
                        className={`w-2 h-2 rounded-full transition-colors ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="h-[300px] sm:h-[400px] bg-gray-100 rounded-xl flex items-center justify-center">
              <span className="text-gray-400">No images available</span>
            </div>
          )}

          {images.length > 1 && (
            <button
              onClick={() => setShowAllPhotos(true)}
              className="absolute bottom-4 right-4 flex items-center gap-2 bg-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:bg-gray-50 transition-colors"
            >
              <Grid3X3 className="w-4 h-4" />
              Show all photos
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Category and location header */}
            <div className="flex items-center justify-between pb-6 border-b">
              <div>
                <div className="flex items-center gap-2 text-lg font-medium text-gray-900">
                  {getCategoryIcon(provider.category)}
                  <span>{getCategoryLabel(provider.category)}</span>
                  {location && (
                    <>
                      <span className="text-gray-400">in</span>
                      <span>{location}</span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-2 text-gray-600 flex-wrap">
                  {provider.yearsInBusiness && provider.yearsInBusiness !== 'N/A' && (
                    <span>{provider.yearsInBusiness} years experience</span>
                  )}
                  {provider.serviceRadius && provider.serviceRadius > 0 && (
                    <>
                      <span className="w-1 h-1 bg-gray-400 rounded-full" />
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
              {provider.rating && (
                <div className="flex items-center gap-1 text-lg">
                  <Star className="w-5 h-5 fill-black" />
                  <span className="font-semibold">{provider.rating.toFixed(2)}</span>
                  {provider.reviewCount && (
                    <span className="text-gray-500 font-normal">({provider.reviewCount} reviews)</span>
                  )}
                </div>
              )}
            </div>

            {/* Community Support Badges */}
            {(hasNonprofitFlexibility || hasHighVolumePartner) && (
              <div className="py-6 border-b">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Community Support</h2>
                <div className="flex flex-wrap gap-3">
                  {hasNonprofitFlexibility && (
                    <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-4 py-3">
                      <Heart className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-900">Nonprofit Friendly</p>
                        <p className="text-sm text-green-700">
                          {provider.nonprofitFlexibility?.waiveMinimum || provider.nonprofitFlexibility?.waiveFee
                            ? 'May waive minimums/fees'
                            : provider.nonprofitFlexibility?.reduceMinimum || provider.nonprofitFlexibility?.reduceFee
                            ? 'Offers reduced rates'
                            : provider.nonprofitFlexibility?.discountedMenu || provider.nonprofitFlexibility?.discountPercentage
                            ? `${provider.nonprofitFlexibility.discountPercentage || 'Special'} discount available`
                            : 'Special pricing available'}
                        </p>
                      </div>
                    </div>
                  )}
                  {hasHighVolumePartner && (
                    <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
                      <Users className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-blue-900">High Volume Partner</p>
                        <p className="text-sm text-blue-700">
                          {provider.highVolumePartner?.packageDeals
                            ? 'Package deals available'
                            : provider.highVolumePartner?.waiveMinimum
                            ? 'May waive minimums'
                            : 'Special rates for frequent bookings'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* About Section */}
            <div className="py-8 border-b">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About {provider.name}</h2>
              {(provider.bio || provider.description) ? (
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{provider.bio || provider.description}</p>
              ) : (
                <p className="text-gray-600 leading-relaxed">
                  {provider.category === 'FoodBeverage' && provider.cuisineTypes && (
                    <>{provider.name} specializes in {provider.cuisineTypes} cuisine{provider.serviceStyle && `, offering ${provider.serviceStyle} service`}. {provider.specialFeatures && provider.specialFeatures.length > 0 && `Special features include ${provider.specialFeatures.join(', ')}.`}</>
                  )}
                  {provider.category === 'Entertainment' && (
                    <>{provider.name} {provider.performanceType && `is a ${provider.performanceType}`}{provider.genres && ` performing ${provider.genres}`}. {provider.performanceLength && `Typical performance length is ${provider.performanceLength}.`} {provider.achievements && provider.achievements}</>
                  )}
                  {provider.category === 'Venues' && (
                    <>{provider.name} is a {provider.venueType} venue{provider.squareFootage && ` with ${provider.squareFootage} sq ft of space`}. {provider.capacityStanding && `Can accommodate up to ${provider.capacityStanding} guests standing`}{provider.capacitySeated && ` or ${provider.capacitySeated} seated`}.</>
                  )}
                  {provider.category === 'Vendors' && provider.productCategory && (
                    <>{provider.name} specializes in {provider.productCategory} products. {provider.productionType && `Production type: ${provider.productionType}.`}</>
                  )}
                </p>
              )}
            </div>

            {/* Category-specific details */}
            {provider.category === 'FoodBeverage' && (
              <>
                {/* Service Details */}
                <div className="py-8 border-b">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Service Details</h2>
                  <div className="grid grid-cols-2 gap-6">
                    {provider.cuisineTypes && provider.cuisineTypes !== 'N/A' && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Cuisine Types</p>
                        <p className="text-gray-900">{provider.cuisineTypes}</p>
                      </div>
                    )}
                    {provider.serviceStyle && provider.serviceStyle !== 'N/A' && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Service Style</p>
                        <p className="text-gray-900">{provider.serviceStyle}</p>
                      </div>
                    )}
                    {provider.minimumGuarantee && provider.minimumGuarantee !== 'N/A' && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Minimum Guarantee</p>
                        <p className="text-gray-900">${provider.minimumGuarantee}</p>
                      </div>
                    )}
                    {provider.foodTruckDimensions && provider.foodTruckDimensions !== 'N/A' && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Food Truck Dimensions</p>
                        <p className="text-gray-900">{provider.foodTruckDimensions}</p>
                      </div>
                    )}
                  </div>

                  {/* Dietary Specialties */}
                  {provider.dietarySpecialties && provider.dietarySpecialties.length > 0 && (
                    <div className="mt-6">
                      <p className="text-sm text-gray-500 mb-2">Dietary Specialties</p>
                      <div className="flex flex-wrap gap-2">
                        {provider.dietarySpecialties.map((specialty, index) => (
                          <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Menu Section */}
                {(provider.aLaCarteMenu && provider.aLaCarteMenu.length > 0) || (provider.cateringPackages && provider.cateringPackages.length > 0) || provider.menuAlaCarte || provider.menuCatering ? (
                  <div className="py-8 border-b">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Menu</h2>
                    <div className="flex bg-gray-100 rounded-lg p-1 mb-6 w-fit">
                      <button
                        onClick={() => setSelectedMenuType('alacarte')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                          selectedMenuType === 'alacarte' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        A la Carte
                      </button>
                      <button
                        onClick={() => setSelectedMenuType('catering')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                          selectedMenuType === 'catering' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        Catering Packages
                      </button>
                    </div>

                    {selectedMenuType === 'alacarte' ? (
                      provider.aLaCarteMenu && provider.aLaCarteMenu.length > 0 ? (
                        <div className="space-y-6">
                          {/* Group items by category */}
                          {(() => {
                            const categories = [...new Set(provider.aLaCarteMenu.map(item => item.category || 'Other'))];
                            return categories.map((category, catIndex) => (
                              <div key={catIndex}>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">{category}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {provider.aLaCarteMenu!
                                    .filter(item => (item.category || 'Other') === category)
                                    .map((item, index) => (
                                      <div key={item.id || index} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                                        {item.image && (
                                          <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                                          </div>
                                        )}
                                        <div className="flex-1 min-w-0">
                                          <div className="flex justify-between items-start">
                                            <h4 className="font-medium text-gray-900">{item.name}</h4>
                                            <span className="font-semibold text-gray-900 ml-2">${typeof item.price === 'number' ? item.price.toFixed(2) : item.price}</span>
                                          </div>
                                          {item.description && <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.description}</p>}
                                          {item.dietaryBadges && item.dietaryBadges.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mt-2">
                                              {item.dietaryBadges.map((badge, i) => (
                                                <span key={i} className="px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs">{badge}</span>
                                              ))}
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    ))}
                                </div>
                              </div>
                            ));
                          })()}
                        </div>
                      ) : (
                        <p className="text-gray-600">{provider.menuAlaCarte || 'Menu available upon request'}</p>
                      )
                    ) : (
                      provider.cateringPackages && provider.cateringPackages.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {provider.cateringPackages.map((pkg, index) => (
                            <div key={index} className="border rounded-xl overflow-hidden">
                              {pkg.image && (
                                <div className="relative h-40">
                                  <Image src={pkg.image} alt={pkg.name} fill className="object-cover" />
                                </div>
                              )}
                              <div className="p-4">
                                <h4 className="font-semibold text-gray-900">{pkg.name}</h4>
                                {pkg.description && <p className="text-sm text-gray-600 mt-1">{pkg.description}</p>}
                                <p className="text-lg font-semibold text-gray-900 mt-2">Starting at ${pkg.basePrice}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-600">{provider.menuCatering || 'Catering menu available upon request'}</p>
                      )
                    )}
                  </div>
                ) : null}
              </>
            )}

            {provider.category === 'Entertainment' && (
              <>
                {/* Performance Details */}
                <div className="py-8 border-b">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Performance Details</h2>
                  <div className="grid grid-cols-2 gap-6">
                    {provider.genres && provider.genres !== 'N/A' && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Genres</p>
                        <p className="text-gray-900">{provider.genres}</p>
                      </div>
                    )}
                    {provider.performanceType && provider.performanceType !== 'N/A' && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Performance Type</p>
                        <p className="text-gray-900">{provider.performanceType}</p>
                      </div>
                    )}
                    {provider.performanceLength && provider.performanceLength !== 'N/A' && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Performance Length</p>
                        <p className="text-gray-900">{provider.performanceLength}</p>
                      </div>
                    )}
                    {provider.setupTime && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Setup Time</p>
                        <p className="text-gray-900">{provider.setupTime}</p>
                      </div>
                    )}
                    {provider.technicalRequirements && provider.technicalRequirements !== 'N/A' && (
                      <div className="col-span-2">
                        <p className="text-sm text-gray-500 mb-1">Technical Requirements</p>
                        <p className="text-gray-900">{provider.technicalRequirements}</p>
                      </div>
                    )}
                  </div>

                  {/* Specializations */}
                  {provider.specializations && provider.specializations.length > 0 && (
                    <div className="mt-6">
                      <p className="text-sm text-gray-500 mb-2">Specializations</p>
                      <div className="flex flex-wrap gap-2">
                        {provider.specializations.map((spec, index) => (
                          <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Pricing */}
                {(provider.compensationFlatFee || provider.compensationHourly) && (
                  <div className="py-8 border-b">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Pricing</h2>
                    <div className="grid grid-cols-2 gap-6">
                      {provider.compensationFlatFee && provider.compensationFlatFee !== 'N/A' && (
                        <div className="bg-gray-50 p-4 rounded-xl">
                          <p className="text-sm text-gray-500 mb-1">Flat Fee</p>
                          <p className="text-2xl font-semibold text-gray-900">${provider.compensationFlatFee}</p>
                        </div>
                      )}
                      {provider.compensationHourly && provider.compensationHourly !== 'N/A' && (
                        <div className="bg-gray-50 p-4 rounded-xl">
                          <p className="text-sm text-gray-500 mb-1">Hourly Rate</p>
                          <p className="text-2xl font-semibold text-gray-900">${provider.compensationHourly}<span className="text-base font-normal text-gray-500">/hour</span></p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Demo Media */}
                {(provider.demoAudio || provider.performanceVideo) && (
                  <div className="py-8 border-b">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Demo Media</h2>
                    <div className="space-y-6">
                      {provider.demoAudio && (
                        <div className="bg-gray-50 p-4 rounded-xl">
                          <p className="text-sm text-gray-500 mb-3 flex items-center gap-2">
                            <Music className="w-4 h-4" />
                            Demo Audio
                          </p>
                          <audio controls className="w-full">
                            <source src={provider.demoAudio} type="audio/mpeg" />
                            Your browser does not support the audio element.
                          </audio>
                        </div>
                      )}
                      {provider.performanceVideo && (
                        <div className="bg-gray-50 p-4 rounded-xl">
                          <p className="text-sm text-gray-500 mb-3 flex items-center gap-2">
                            <Play className="w-4 h-4" />
                            Performance Video
                          </p>
                          <video controls className="w-full rounded-lg aspect-video bg-black">
                            <source src={provider.performanceVideo} type="video/mp4" />
                            Your browser does not support the video element.
                          </video>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Travel Info */}
                {(provider.travelPolicy || provider.basedIn) && (
                  <div className="py-8 border-b">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Travel Information</h2>
                    <div className="grid grid-cols-2 gap-6">
                      {provider.basedIn && (
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Based In</p>
                          <p className="text-gray-900">{provider.basedIn}</p>
                        </div>
                      )}
                      {provider.travelPolicy && (
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Travel Policy</p>
                          <p className="text-gray-900">{provider.travelPolicy}</p>
                        </div>
                      )}
                      {provider.travelNotes && (
                        <div className="col-span-2">
                          <p className="text-sm text-gray-500 mb-1">Travel Notes</p>
                          <p className="text-gray-900">{provider.travelNotes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}

            {provider.category === 'Venues' && (
              <>
                {/* Venue Details */}
                <div className="py-8 border-b">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Venue Details</h2>
                  <div className="grid grid-cols-2 gap-6">
                    {provider.venueType && provider.venueType !== 'N/A' && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Venue Type</p>
                        <p className="text-gray-900">{provider.venueType}</p>
                      </div>
                    )}
                    {provider.squareFootage && provider.squareFootage !== 'N/A' && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Square Footage</p>
                        <p className="text-gray-900">{provider.squareFootage} sq ft</p>
                      </div>
                    )}
                    {provider.capacitySeated && provider.capacitySeated !== 'N/A' && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Seated Capacity</p>
                        <p className="text-gray-900">{provider.capacitySeated} guests</p>
                      </div>
                    )}
                    {provider.capacityStanding && provider.capacityStanding !== 'N/A' && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Standing Capacity</p>
                        <p className="text-gray-900">{provider.capacityStanding} guests</p>
                      </div>
                    )}
                    {provider.layoutOptions && provider.layoutOptions !== 'N/A' && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Layout Options</p>
                        <p className="text-gray-900">{provider.layoutOptions}</p>
                      </div>
                    )}
                    {provider.parking && provider.parking !== 'N/A' && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Parking</p>
                        <p className="text-gray-900">{provider.parking}</p>
                      </div>
                    )}
                  </div>

                  {/* Venue Differentiators */}
                  {(provider.historicLandmark || provider.waterfront || provider.rooftop || provider.uniqueArchitecture || provider.fullService || provider.blankCanvas || provider.ecoFriendly) && (
                    <div className="mt-6">
                      <p className="text-sm text-gray-500 mb-2">Special Features</p>
                      <div className="flex flex-wrap gap-2">
                        {provider.historicLandmark && (
                          <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">Historic Landmark</span>
                        )}
                        {provider.waterfront && (
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Waterfront</span>
                        )}
                        {provider.rooftop && (
                          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Rooftop</span>
                        )}
                        {provider.uniqueArchitecture && (
                          <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">Unique Architecture</span>
                        )}
                        {provider.fullService && (
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Full Service</span>
                        )}
                        {provider.blankCanvas && (
                          <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">Blank Canvas</span>
                        )}
                        {provider.ecoFriendly && (
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm flex items-center gap-1">
                            <Leaf className="w-3 h-3" /> Eco-Friendly
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Amenities & Services */}
                {(provider.amenities && provider.amenities.length > 0) || (provider.includedRentals && provider.includedRentals.length > 0) ? (
                  <div className="py-8 border-b">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Amenities & Included Items</h2>
                    {provider.amenities && provider.amenities.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-500 mb-2">Amenities</p>
                        <div className="grid grid-cols-2 gap-3">
                          {provider.amenities.map((amenity, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                              <span className="text-gray-700">{amenity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {provider.includedRentals && provider.includedRentals.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Included with Rental</p>
                        <div className="grid grid-cols-2 gap-3">
                          {provider.includedRentals.map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                              <span className="text-gray-700">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : null}

                {/* Policies */}
                <div className="py-8 border-b">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Venue Policies</h2>
                  <div className="space-y-4">
                    {provider.kitchenAccess && (
                      <div className="flex items-start gap-3">
                        <Utensils className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-900">Kitchen Access</p>
                          <p className="text-gray-600">{provider.kitchenAccess}{provider.kitchenAccessDetails && ` - ${provider.kitchenAccessDetails}`}</p>
                        </div>
                      </div>
                    )}
                    {provider.alcoholPolicy && (
                      <div className="flex items-start gap-3">
                        <span className="text-gray-400 mt-0.5 text-lg">🍷</span>
                        <div>
                          <p className="font-medium text-gray-900">Alcohol Policy</p>
                          <p className="text-gray-600">{provider.alcoholPolicy}{provider.alcoholPolicyDetails && ` - ${provider.alcoholPolicyDetails}`}</p>
                        </div>
                      </div>
                    )}
                    {provider.wifiAvailable && (
                      <div className="flex items-start gap-3">
                        <Wifi className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-900">WiFi Available</p>
                          {provider.wifiName && <p className="text-gray-600">Network: {provider.wifiName}</p>}
                        </div>
                      </div>
                    )}
                    {provider.noiseCurfew && (
                      <div className="flex items-start gap-3">
                        <Volume2 className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-900">Noise Curfew</p>
                          <p className="text-gray-600">{provider.noiseCurfew}{provider.noiseCurfewRestrictions && ` - ${provider.noiseCurfewRestrictions}`}</p>
                        </div>
                      </div>
                    )}
                    {provider.allowOutsideVendors !== undefined && (
                      <div className="flex items-start gap-3">
                        <Package className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-900">Outside Vendors</p>
                          <p className="text-gray-600">{provider.allowOutsideVendors ? 'Outside vendors allowed' : 'Must use preferred vendors'}</p>
                        </div>
                      </div>
                    )}
                    {provider.requiresInsurance && (
                      <div className="flex items-start gap-3">
                        <ShieldCheck className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-900">Insurance Required</p>
                          <p className="text-gray-600">{provider.insuranceLiabilityRequirements || 'Event insurance required'}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Pricing */}
                {(provider.rentalFeeHourly || provider.rentalFeeFlat || provider.minimumSpendRequirement) && (
                  <div className="py-8 border-b">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Pricing</h2>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                      {provider.rentalFeeHourly && provider.rentalFeeHourly !== 'N/A' && (
                        <div className="bg-gray-50 p-4 rounded-xl">
                          <p className="text-sm text-gray-500 mb-1">Hourly Rate</p>
                          <p className="text-2xl font-semibold text-gray-900">${provider.rentalFeeHourly}<span className="text-base font-normal text-gray-500">/hour</span></p>
                          {provider.minimumHours && <p className="text-sm text-gray-500 mt-1">{provider.minimumHours} hour minimum</p>}
                        </div>
                      )}
                      {provider.rentalFeeFlat && provider.rentalFeeFlat !== 'N/A' && (
                        <div className="bg-gray-50 p-4 rounded-xl">
                          <p className="text-sm text-gray-500 mb-1">Flat Fee</p>
                          <p className="text-2xl font-semibold text-gray-900">${provider.rentalFeeFlat}</p>
                        </div>
                      )}
                      {provider.minimumSpendRequirement && provider.minimumSpendRequirement !== 'N/A' && (
                        <div className="bg-gray-50 p-4 rounded-xl">
                          <p className="text-sm text-gray-500 mb-1">Minimum Spend</p>
                          <p className="text-2xl font-semibold text-gray-900">${provider.minimumSpendRequirement}</p>
                        </div>
                      )}
                      {provider.cleaningFeeAmount && (
                        <div className="bg-gray-50 p-4 rounded-xl">
                          <p className="text-sm text-gray-500 mb-1">Cleaning Fee</p>
                          <p className="text-2xl font-semibold text-gray-900">${provider.cleaningFeeAmount}</p>
                        </div>
                      )}
                      {provider.depositRequired && (
                        <div className="bg-gray-50 p-4 rounded-xl">
                          <p className="text-sm text-gray-500 mb-1">Deposit</p>
                          <p className="text-2xl font-semibold text-gray-900">${provider.depositRequired}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}

            {provider.category === 'Vendors' && (
              <>
                {/* Product Details */}
                <div className="py-8 border-b">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Product Details</h2>
                  <div className="grid grid-cols-2 gap-6">
                    {provider.productCategory && provider.productCategory !== 'N/A' && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Product Category</p>
                        <p className="text-gray-900">{provider.productCategory}</p>
                      </div>
                    )}
                    {provider.productionType && provider.productionType !== 'N/A' && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Production Type</p>
                        <p className="text-gray-900">{provider.productionType}</p>
                      </div>
                    )}
                    {provider.averagePriceRange && provider.averagePriceRange !== 'N/A' && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Price Range</p>
                        <p className="text-gray-900">{provider.averagePriceRange}</p>
                      </div>
                    )}
                    {provider.inventoryModel && provider.inventoryModel !== 'N/A' && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Inventory Model</p>
                        <p className="text-gray-900">{provider.inventoryModel}</p>
                      </div>
                    )}
                    {provider.minimumOrderRequirement && provider.minimumOrderRequirement !== 'N/A' && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Minimum Order</p>
                        <p className="text-gray-900">${provider.minimumOrderRequirement}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Products/Services List */}
                {((provider.serviceItems && provider.serviceItems.length > 0) || (provider.productItems && provider.productItems.length > 0)) && (
                  <div className="py-8 border-b">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Products & Services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {provider.serviceItems?.map((item: any, index: number) => (
                        <div key={`service-${index}`} className="border rounded-xl overflow-hidden">
                          {item.photo && (
                            <div className="relative h-40">
                              <Image src={item.photo} alt={item.name || 'Service'} fill className="object-cover" />
                            </div>
                          )}
                          <div className="p-4">
                            <h4 className="font-semibold text-gray-900">{item.name}</h4>
                            {item.description && <p className="text-sm text-gray-600 mt-1">{item.description}</p>}
                            {item.price && <p className="text-lg font-semibold text-gray-900 mt-2">${item.price}</p>}
                          </div>
                        </div>
                      ))}
                      {provider.productItems?.map((item: any, index: number) => (
                        <div key={`product-${index}`} className="border rounded-xl overflow-hidden">
                          {item.photo && (
                            <div className="relative h-40">
                              <Image src={item.photo} alt={item.name || 'Product'} fill className="object-cover" />
                            </div>
                          )}
                          <div className="p-4">
                            <h4 className="font-semibold text-gray-900">{item.name}</h4>
                            {item.description && <p className="text-sm text-gray-600 mt-1">{item.description}</p>}
                            {item.price && <p className="text-lg font-semibold text-gray-900 mt-2">${item.price}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Special Features */}
            {provider.specialFeatures && provider.specialFeatures.length > 0 && (
              <div className="py-8 border-b">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">What this provider offers</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {provider.specialFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-6 h-6 text-gray-900" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Cancellation Policy */}
            {provider.cancellationPolicy && (
              <div className="py-8 border-b">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Cancellation Policy</h2>
                <p className="text-gray-600">{provider.cancellationPolicy}</p>
                {provider.cancellationPolicyDetails && (
                  <p className="text-gray-600 mt-2">{provider.cancellationPolicyDetails}</p>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 border border-gray-200 rounded-xl p-6 shadow-lg">
              {/* Price highlight */}
              {provider.category === 'Entertainment' && provider.compensationFlatFee && provider.compensationFlatFee !== 'N/A' && (
                <div className="mb-4">
                  <span className="text-2xl font-semibold">${provider.compensationFlatFee}</span>
                  <span className="text-gray-500"> flat fee</span>
                </div>
              )}
              {provider.category === 'Venues' && provider.rentalFeeHourly && provider.rentalFeeHourly !== 'N/A' && (
                <div className="mb-4">
                  <span className="text-2xl font-semibold">${provider.rentalFeeHourly}</span>
                  <span className="text-gray-500"> / hour</span>
                </div>
              )}
              {provider.category === 'FoodBeverage' && provider.minimumGuarantee && provider.minimumGuarantee !== 'N/A' && (
                <div className="mb-4">
                  <span className="text-2xl font-semibold">${provider.minimumGuarantee}</span>
                  <span className="text-gray-500"> minimum</span>
                </div>
              )}

              <button className="w-full bg-black text-white font-semibold py-3 px-4 rounded-lg hover:bg-gray-800 transition-all mb-3">
                Request Quote
              </button>
              <button className="w-full border border-gray-900 text-gray-900 font-semibold py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors mb-6">
                Message Provider
              </button>

              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-4">
                  {provider.phone && provider.phone !== 'N/A' && (
                    <a href={`tel:${provider.phone}`} className="flex items-center gap-3 text-gray-700 hover:text-gray-900 group">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Phone</p>
                        <p className="text-sm font-medium">{provider.phone}</p>
                      </div>
                    </a>
                  )}
                  {provider.email && provider.email !== 'N/A' && (
                    <a href={`mailto:${provider.email}`} className="flex items-center gap-3 text-gray-700 hover:text-gray-900 group">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="text-sm font-medium truncate max-w-[180px]">{provider.email}</p>
                      </div>
                    </a>
                  )}
                  {provider.website && provider.website !== 'N/A' && (
                    <a
                      href={provider.website.startsWith('http') ? provider.website : `https://${provider.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-700 hover:text-gray-900 group"
                    >
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                        <Globe className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Website</p>
                        <p className="text-sm font-medium text-black underline">Visit website</p>
                      </div>
                    </a>
                  )}
                  {provider.address && provider.address !== 'N/A' && (
                    <div className="flex items-center gap-3 text-gray-700">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Location</p>
                        <p className="text-sm font-medium">{provider.address}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Social Media Links */}
                {provider.socialMedia && (provider.socialMedia.instagram || provider.socialMedia.facebook || provider.socialMedia.twitter || provider.socialMedia.youtube) && (
                  <div className="mt-6 pt-6 border-t">
                    <p className="text-xs text-gray-500 mb-3">Social Media</p>
                    <div className="flex gap-3">
                      {provider.socialMedia.instagram && (
                        <a href={provider.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                          <Instagram className="w-5 h-5 text-gray-700" />
                        </a>
                      )}
                      {provider.socialMedia.facebook && (
                        <a href={provider.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                          <Facebook className="w-5 h-5 text-gray-700" />
                        </a>
                      )}
                      {provider.socialMedia.twitter && (
                        <a href={provider.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                          <Twitter className="w-5 h-5 text-gray-700" />
                        </a>
                      )}
                      {provider.socialMedia.youtube && (
                        <a href={provider.socialMedia.youtube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                          <Youtube className="w-5 h-5 text-gray-700" />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <p className="text-center text-xs text-gray-500 mt-6">
                You won&apos;t be charged yet
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
