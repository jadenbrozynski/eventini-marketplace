'use client';

import { useState, useEffect } from 'react';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface UseProviderReturn {
  provider: Record<string, unknown> | null;
  isLoading: boolean;
  error: Error | null;
}

// Category-aware name extraction
function extractName(data: Record<string, unknown>, category?: string): string {
  const formData = (data.formData as Record<string, unknown>) || {};
  const cat = (category || (data.category as string) || '').toLowerCase();

  const checkValue = (val: unknown): val is string =>
    typeof val === 'string' && val !== 'N/A' && val.trim() !== '';

  if (cat.includes('venue')) {
    if (checkValue(data.venueName)) return data.venueName;
    if (checkValue(formData.venueName)) return formData.venueName as string;
  }

  if (cat.includes('entertainment')) {
    if (checkValue(data.stageName)) return data.stageName as string;
    if (checkValue(formData.stageName)) return formData.stageName as string;
    if (checkValue(formData.stageArtistName)) return formData.stageArtistName as string;
  }

  if (checkValue(data.businessName)) return data.businessName as string;
  if (checkValue(formData.businessName)) return formData.businessName as string;
  if (checkValue(data.businessTitle)) return data.businessTitle as string;
  if (checkValue(formData.businessTitle)) return formData.businessTitle as string;
  if (checkValue(data.stageName)) return data.stageName as string;
  if (checkValue(data.venueName)) return data.venueName as string;
  if (checkValue(data.name)) return data.name as string;
  if (checkValue(data.contactName)) return data.contactName as string;

  return '';
}

function extractImageUrls(data: Record<string, unknown>): string[] {
  const urls: string[] = [];
  const formData = (data.formData as Record<string, unknown>) || {};

  if (Array.isArray(data.imageUrls)) urls.push(...data.imageUrls);
  if (Array.isArray(data.businessPhotos)) urls.push(...data.businessPhotos);
  if (Array.isArray(data.photos)) urls.push(...data.photos);
  if (Array.isArray(data.venuePhotos)) urls.push(...data.venuePhotos);
  if (Array.isArray(formData.venuePhotos)) urls.push(...(formData.venuePhotos as string[]));
  if (Array.isArray(formData.businessPhotos)) urls.push(...(formData.businessPhotos as string[]));
  if (data.coverPhoto && typeof data.coverPhoto === 'string') {
    if (!urls.includes(data.coverPhoto)) urls.unshift(data.coverPhoto);
  }
  if (formData.coverPhoto && typeof formData.coverPhoto === 'string') {
    if (!urls.includes(formData.coverPhoto as string)) urls.unshift(formData.coverPhoto as string);
  }
  if (data.primaryImageUrl && typeof data.primaryImageUrl === 'string') {
    if (!urls.includes(data.primaryImageUrl)) urls.unshift(data.primaryImageUrl);
  }

  return [...new Set(urls)];
}

function transformProviderData(rawData: Record<string, unknown>, detailsData: Record<string, unknown> = {}): Record<string, unknown> {
  const data = rawData;
  const formData = (data.formData as Record<string, unknown>) || {};
  const category = (data.category as string) || 'Vendors';

  // Extract nested details
  const foodBeverageDetails = (data.foodBeverageDetails as Record<string, unknown>) ||
    (detailsData.food as Record<string, unknown>) ||
    (detailsData.foodBeverage as Record<string, unknown>) || {};
  const entertainmentDetails = (data.entertainmentDetails as Record<string, unknown>) ||
    (detailsData.entertainment as Record<string, unknown>) || {};
  const venueDetails = (data.venueDetails as Record<string, unknown>) ||
    (detailsData.venue as Record<string, unknown>) || {};
  const vendorDetails = (data.vendorDetails as Record<string, unknown>) ||
    (detailsData.vendor as Record<string, unknown>) || {};
  const pricingDetails = (detailsData.pricing as Record<string, unknown>) || {};
  const socialMedia = (data.socialMedia as Record<string, unknown>) || {};

  // Helper to get serviceLocation
  const getServiceLocation = (): string | null => {
    if (formData.serviceLocation) return formData.serviceLocation as string;
    if (data.serviceLocation) return data.serviceLocation as string;
    if (formData.serviceAreaLocation) return formData.serviceAreaLocation as string;
    if (data.serviceAreaLocation) return data.serviceAreaLocation as string;
    if (foodBeverageDetails.serviceLocation) return foodBeverageDetails.serviceLocation as string;
    if (entertainmentDetails.serviceLocation) return entertainmentDetails.serviceLocation as string;
    return null;
  };

  // Helper to get city
  const getCity = (): string | null => {
    const serviceLocation = getServiceLocation();
    if (serviceLocation && serviceLocation.includes(',')) {
      const parts = serviceLocation.split(',').map(p => p.trim());
      if (parts.length >= 2) return parts[0];
    }
    if (data.city) return data.city as string;
    if (formData.city) return formData.city as string;
    if ((data.residentialAddress as any)?.city) return (data.residentialAddress as any).city;
    if ((formData.residentialAddress as any)?.city) return (formData.residentialAddress as any).city;
    return null;
  };

  // Helper to get state
  const getState = (): string | null => {
    const serviceLocation = getServiceLocation();
    if (serviceLocation && serviceLocation.includes(',')) {
      const parts = serviceLocation.split(',').map(p => p.trim());
      if (parts.length >= 2) return parts[1];
    }
    if (data.state) return data.state as string;
    if (formData.state) return formData.state as string;
    if ((data.residentialAddress as any)?.state) return (data.residentialAddress as any).state;
    if ((formData.residentialAddress as any)?.state) return (formData.residentialAddress as any).state;
    return null;
  };

  // Helper to get coordinates
  const getCoordinates = (): { lat: number | null; lng: number | null } => {
    if (data.lat && data.lng) return { lat: data.lat as number, lng: data.lng as number };
    if ((data.coordinates as any)?.lat) return { lat: (data.coordinates as any).lat, lng: (data.coordinates as any).lng };
    if ((formData.coordinates as any)?.lat) return { lat: (formData.coordinates as any).lat, lng: (formData.coordinates as any).lng };
    if ((foodBeverageDetails.serviceAreaCoordinates as any)?.lat) {
      return { lat: (foodBeverageDetails.serviceAreaCoordinates as any).lat, lng: (foodBeverageDetails.serviceAreaCoordinates as any).lng };
    }
    return { lat: null, lng: null };
  };

  // Helper to get service radius
  const getServiceRadius = (): number | null => {
    if (data.serviceRadius) return data.serviceRadius as number;
    if (formData.serviceRadius) return formData.serviceRadius as number;
    if (foodBeverageDetails.serviceRadius) return foodBeverageDetails.serviceRadius as number;
    if (entertainmentDetails.serviceRadius) return entertainmentDetails.serviceRadius as number;
    if (vendorDetails.serviceRadius) return vendorDetails.serviceRadius as number;
    return null;
  };

  const coords = getCoordinates();

  // Build base provider object
  const provider: Record<string, unknown> = {
    id: data.id,
    category,
    name: extractName(data, category),
    contactName: data.contactName || null,
    phone: data.phone || formData.phone || null,
    email: data.email || formData.email || null,
    address: data.address || formData.address || data.location || null,
    website: data.website || formData.website || null,
    city: getCity(),
    state: getState(),
    zipCode: data.zipCode || formData.zipCode || null,
    lat: coords.lat,
    lng: coords.lng,
    rating: data.rating || data.averageRating || null,
    reviewCount: data.reviewCount || data.totalReviews || null,
    imageUrls: extractImageUrls(data),
    primaryImageUrl: data.primaryImageUrl || data.coverPhoto || formData.coverPhoto || null,
    specialFeatures: data.specialFeatures || [],
    serviceRadius: getServiceRadius(),
    serviceLocation: getServiceLocation(),
    yearsInBusiness: data.yearsInBusiness || data.yearsInOperation || formData.yearsInBusiness || null,
    bio: data.bio || data.description || formData.bio || null,
    description: data.description || data.bio || formData.description || null,
    ownerIdentityTags: data.ownerIdentityTags || formData.ownerIdentityTags || [],
    leadTimeRequired: data.leadTimeRequired || formData.leadTimeRequired || null,
    socialMedia: {
      instagram: socialMedia.instagram || formData.instagram || null,
      facebook: socialMedia.facebook || formData.facebook || null,
      tiktok: socialMedia.tiktok || formData.tiktok || null,
      twitter: socialMedia.twitter || null,
      youtube: socialMedia.youtube || formData.youtube || null,
    },
    cancellationPolicy: data.cancellationPolicy || formData.cancellationPolicy || null,
    depositPercentage: data.depositPercentage || formData.depositPercentage || null,
    depositDueAtBooking: data.depositDueAtBooking || formData.depositDueAtBooking || null,
  };

  // FoodBeverage-specific fields
  if (category === 'FoodBeverage') {
    const cuisineTypes = data.cuisineTypes || foodBeverageDetails.cuisineTypes || formData.cuisineTypes;
    const serviceStyle = data.serviceStyle || foodBeverageDetails.serviceStyles || formData.serviceStyle;
    const dietarySpecialties = data.dietarySpecialties || foodBeverageDetails.dietarySpecialties || formData.dietarySpecialties;
    const traits = data.traits || foodBeverageDetails.traits || formData.traits;

    provider.cuisineTypes = Array.isArray(cuisineTypes) ? cuisineTypes.join(', ') : cuisineTypes || null;
    provider.serviceStyle = Array.isArray(serviceStyle) ? serviceStyle.join(', ') : serviceStyle || null;
    provider.dietarySpecialties = Array.isArray(dietarySpecialties) ? dietarySpecialties : [];
    provider.traits = Array.isArray(traits) ? traits : [];
    provider.minimumGuarantee = data.minimumGuarantee || foodBeverageDetails.minimumGuarantee || formData.minimumGuarantee || null;
    provider.foodTruckDimensions = data.foodTruckDimensions || foodBeverageDetails.foodTruckDimensions || null;

    // Menu items - check all possible sources
    provider.aLaCarteMenu = foodBeverageDetails.aLaCarteMenu || formData.aLaCarteMenu || data.aLaCarteMenu || [];
    provider.cateringPackages = foodBeverageDetails.cateringPackages || formData.cateringPackages || data.cateringPackages || [];
    provider.taxRate = foodBeverageDetails.taxRate || formData.taxRate || pricingDetails.taxRate || null;

    // Nonprofit flexibility
    const nonprofitFlex = foodBeverageDetails.nonprofitFlexibility as Record<string, unknown> | undefined;
    provider.nonprofitFlexibility = nonprofitFlex ? {
      reduceMinimum: nonprofitFlex.reduceMinimum || false,
      reducedMinimum: nonprofitFlex.reducedMinimum || null,
      waiveMinimum: nonprofitFlex.waiveMinimum || false,
      discountedMenu: nonprofitFlex.discountedMenu || false,
      discountPercentage: nonprofitFlex.discountPercentage || null,
    } : null;

    // High volume partner
    const highVolume = foodBeverageDetails.highVolumePartner as Record<string, unknown> | undefined;
    provider.highVolumePartner = highVolume ? {
      reduceMinimum: highVolume.reduceMinimum || false,
      reducedMinimum: highVolume.reducedMinimum || null,
      waiveMinimum: highVolume.waiveMinimum || false,
    } : null;

    provider.offersPickup = foodBeverageDetails.offersPickup || formData.offersPickup || false;
    provider.offersDelivery = foodBeverageDetails.offersDelivery || formData.offersDelivery || false;
  }

  // Entertainment-specific fields
  if (category === 'Entertainment') {
    const genres = data.genres || formData.genres || entertainmentDetails.genres;
    provider.genres = Array.isArray(genres) ? genres.join(', ') : genres || null;
    provider.performanceType = data.performanceType || entertainmentDetails.entertainerType || formData.entertainerType || null;
    provider.performanceLength = data.performanceLength || entertainmentDetails.typicalSetDuration || null;
    provider.technicalRequirements = entertainmentDetails.technicalRequirements || null;
    provider.compensationFlatFee = data.compensationFlatFee || entertainmentDetails.typicalPerformanceFee || null;
    provider.compensationHourly = data.compensationHourly || null;
    provider.basedIn = entertainmentDetails.basedIn || data.basedIn || null;
    provider.travelPolicy = entertainmentDetails.travelPolicy || null;
  }

  // Venues-specific fields
  if (category === 'Venues') {
    const venueType = data.venueType || venueDetails.venueType;
    const amenities = data.amenities || venueDetails.amenities;
    const includedRentals = data.includedRentals || venueDetails.includedRentals;

    provider.venueType = Array.isArray(venueType) ? venueType.join(', ') : venueType || null;
    provider.capacitySeated = data.capacitySeated || venueDetails.capacitySeated || null;
    provider.capacityStanding = data.capacityStanding || venueDetails.capacityStanding || null;
    provider.squareFootage = data.squareFootage || venueDetails.squareFootage || null;
    provider.amenities = Array.isArray(amenities) ? amenities : [];
    provider.includedRentals = Array.isArray(includedRentals) ? includedRentals : [];
    provider.parking = data.parking || venueDetails.parking || null;
    provider.kitchenAccess = data.kitchenAccess || venueDetails.kitchenAccess || null;
    provider.alcoholPolicy = data.alcoholPolicy || venueDetails.alcoholPolicy || null;
    provider.wifiAvailable = venueDetails.wifiAvailable || false;
    provider.rentalFeeHourly = data.rentalFeeHourly || venueDetails.hourlyRate || null;
    provider.rentalFeeFlat = data.rentalFeeFlat || venueDetails.rentalFeeAmount || null;
    provider.venueSpaces = formData.venueSpaces || venueDetails.venueSpaces || data.venueSpaces || [];
  }

  // Vendors-specific fields
  if (category === 'Vendors') {
    provider.productCategory = data.productCategory || vendorDetails.productCategory || null;
    provider.minimumOrderRequirement = data.minimumOrderRequirement || vendorDetails.minimumOrder || null;
    provider.productItems = vendorDetails.productItems || formData.productItems || data.productItems || [];
    provider.productTypes = data.productTypes || vendorDetails.productTypes || [];
    provider.serviceItems = vendorDetails.serviceItems || formData.serviceItems || [];
  }

  return provider;
}

export function useProvider(providerId: string | null): UseProviderReturn {
  const [provider, setProvider] = useState<Record<string, unknown> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProvider() {
      if (!providerId) {
        setIsLoading(false);
        return;
      }

      if (!db) {
        setError(new Error('Firebase not configured'));
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        let rawData: Record<string, unknown> | null = null;
        let detailsData: Record<string, unknown> = {};
        let category = '';

        // Try ActiveProviders collection first
        const activeDocRef = doc(db, 'ActiveProviders', providerId);
        const activeSnapshot = await getDoc(activeDocRef);

        if (activeSnapshot.exists()) {
          rawData = { id: activeSnapshot.id, ...activeSnapshot.data() };
          category = (rawData.category as string) || 'Vendors';
        } else {
          // Try category-specific collections
          const categories = ['FoodBeverage', 'Entertainment', 'Venues', 'Vendors'];
          for (const cat of categories) {
            const catDocRef = doc(db, `Providers/${cat}/providers`, providerId);
            const catSnapshot = await getDoc(catDocRef);
            if (catSnapshot.exists()) {
              rawData = { id: catSnapshot.id, category: cat, ...catSnapshot.data() };
              category = cat;
              break;
            }
          }
        }

        if (!rawData) {
          setProvider(null);
          setIsLoading(false);
          return;
        }

        // Try to fetch details subcollection
        if (category) {
          try {
            const detailsRef = collection(db, `Providers/${category}/providers/${providerId}/details`);
            const detailsSnapshot = await getDocs(detailsRef);
            detailsSnapshot.forEach(doc => {
              detailsData[doc.id] = doc.data();
            });
          } catch (e) {
            // Details subcollection may not exist, that's ok
          }
        }

        const transformedProvider = transformProviderData(rawData, detailsData);
        setProvider(transformedProvider);
      } catch (err) {
        console.error('Error fetching provider:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchProvider();
  }, [providerId]);

  return { provider, isLoading, error };
}
