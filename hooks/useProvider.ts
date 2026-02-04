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
  if (Array.isArray(data.mediaGallery)) urls.push(...data.mediaGallery);
  if (Array.isArray(data.galleryMedia)) urls.push(...data.galleryMedia);
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

  // Extract nested details from both main doc and subcollection
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
    if (foodBeverageDetails.serviceAreaLocation) return foodBeverageDetails.serviceAreaLocation as string;
    if (entertainmentDetails.serviceLocation) return entertainmentDetails.serviceLocation as string;
    if (vendorDetails.serviceLocation) return vendorDetails.serviceLocation as string;
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
    if (data.businessCity) return data.businessCity as string;
    if (formData.businessCity) return formData.businessCity as string;

    if (category === 'Venues') {
      if (formData.venueCity) return formData.venueCity as string;
      if ((formData.venueAddress as any)?.city) return (formData.venueAddress as any).city;
    }

    if (category === 'Entertainment') {
      const basedIn = data.basedIn || formData.basedIn || entertainmentDetails.basedIn;
      if (basedIn && typeof basedIn === 'string' && basedIn.includes(',')) {
        return basedIn.split(',')[0].trim();
      }
    }

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
    if (data.businessState) return data.businessState as string;
    if (formData.businessState) return formData.businessState as string;

    if (category === 'Venues') {
      if (formData.venueState) return formData.venueState as string;
      if ((formData.venueAddress as any)?.state) return (formData.venueAddress as any).state;
    }

    if (category === 'Entertainment') {
      const basedIn = data.basedIn || formData.basedIn || entertainmentDetails.basedIn;
      if (basedIn && typeof basedIn === 'string' && basedIn.includes(',')) {
        const parts = basedIn.split(',').map((p: string) => p.trim());
        if (parts.length >= 2) return parts[1];
      }
    }

    return null;
  };

  // Helper to get coordinates
  const getCoordinates = (): { lat: number | null; lng: number | null } => {
    if (data.lat && data.lng) return { lat: data.lat as number, lng: data.lng as number };
    if (data.latitude && data.longitude) return { lat: data.latitude as number, lng: data.longitude as number };
    if ((data.coordinates as any)?.lat) return { lat: (data.coordinates as any).lat, lng: (data.coordinates as any).lng };
    if ((data.location as any)?.lat) return { lat: (data.location as any).lat, lng: (data.location as any).lng };
    if ((formData.coordinates as any)?.lat) return { lat: (formData.coordinates as any).lat, lng: (formData.coordinates as any).lng };
    if (formData.latitude && formData.longitude) return { lat: formData.latitude as number, lng: formData.longitude as number };
    if ((data.geocodedCoordinates as any)?.lat) return { lat: (data.geocodedCoordinates as any).lat, lng: (data.geocodedCoordinates as any).lng };
    if ((foodBeverageDetails.coordinates as any)?.lat) return { lat: (foodBeverageDetails.coordinates as any).lat, lng: (foodBeverageDetails.coordinates as any).lng };
    if ((foodBeverageDetails.serviceAreaCoordinates as any)?.lat) return { lat: (foodBeverageDetails.serviceAreaCoordinates as any).lat, lng: (foodBeverageDetails.serviceAreaCoordinates as any).lng };
    if ((entertainmentDetails.coordinates as any)?.lat) return { lat: (entertainmentDetails.coordinates as any).lat, lng: (entertainmentDetails.coordinates as any).lng };
    if ((entertainmentDetails.serviceAreaCoordinates as any)?.lat) return { lat: (entertainmentDetails.serviceAreaCoordinates as any).lat, lng: (entertainmentDetails.serviceAreaCoordinates as any).lng };
    if ((vendorDetails.coordinates as any)?.lat) return { lat: (vendorDetails.coordinates as any).lat, lng: (vendorDetails.coordinates as any).lng };
    if ((vendorDetails.serviceAreaCoordinates as any)?.lat) return { lat: (vendorDetails.serviceAreaCoordinates as any).lat, lng: (vendorDetails.serviceAreaCoordinates as any).lng };
    if ((venueDetails.coordinates as any)?.lat) return { lat: (venueDetails.coordinates as any).lat, lng: (venueDetails.coordinates as any).lng };

    if (category === 'Venues') {
      if ((formData.venueCoordinates as any)?.lat) return { lat: (formData.venueCoordinates as any).lat, lng: (formData.venueCoordinates as any).lng };
    } else {
      if ((formData.serviceAreaCoordinates as any)?.lat) return { lat: (formData.serviceAreaCoordinates as any).lat, lng: (formData.serviceAreaCoordinates as any).lng };
      if ((data.serviceAreaCoordinates as any)?.lat) return { lat: (data.serviceAreaCoordinates as any).lat, lng: (data.serviceAreaCoordinates as any).lng };
    }

    return { lat: null, lng: null };
  };

  // Helper to get address
  const getAddress = (): string | null => {
    if (data.address) return data.address as string;
    if (formData.address && typeof formData.address === 'string') return formData.address as string;
    if (data.location) return data.location as string;
    if ((data.residentialAddress as any)?.street) return (data.residentialAddress as any).street;
    if ((formData.residentialAddress as any)?.street) return (formData.residentialAddress as any).street;
    if (data.businessAddress) return data.businessAddress as string;
    if (formData.businessAddress) return formData.businessAddress as string;
    if (category === 'Venues') {
      if (formData.venueAddress && typeof formData.venueAddress === 'string') return formData.venueAddress as string;
      if ((formData.venueAddress as any)?.street) return (formData.venueAddress as any).street;
    }
    return null;
  };

  // Helper to get service radius
  const getServiceRadius = (): number | null => {
    if (data.serviceRadius) return data.serviceRadius as number;
    if (formData.serviceRadius) return formData.serviceRadius as number;
    if (foodBeverageDetails.serviceRadius) return foodBeverageDetails.serviceRadius as number;
    if (entertainmentDetails.serviceRadius) return entertainmentDetails.serviceRadius as number;
    if (vendorDetails.serviceRadius) return vendorDetails.serviceRadius as number;
    const driveTime = data.driveTime || formData.driveTime || foodBeverageDetails.driveTime || entertainmentDetails.driveTime || vendorDetails.driveTime;
    if (driveTime) {
      if (typeof driveTime === 'number') return driveTime;
      if (typeof driveTime === 'string') {
        const match = driveTime.match(/(\d+)/);
        if (match) return parseInt(match[1], 10);
      }
    }
    return null;
  };

  const coords = getCoordinates();

  // Build base provider object with ALL common fields
  const provider: Record<string, unknown> = {
    id: data.id,
    category,
    name: extractName(data, category),
    contactName: data.contactName || null,
    phone: data.phone || formData.phone || null,
    email: data.email || formData.email || null,
    address: getAddress(),
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
    calendarAvailability: data.calendarAvailability || formData.calendarAvailability || null,
    socialMedia: {
      instagram: socialMedia.instagram || formData.instagram || null,
      facebook: socialMedia.facebook || formData.facebook || null,
      tiktok: socialMedia.tiktok || formData.tiktok || null,
      twitter: socialMedia.twitter || null,
      linkedin: socialMedia.linkedin || null,
      youtube: socialMedia.youtube || formData.youtube || null,
    },
    cancellationPolicy: data.cancellationPolicy || formData.cancellationPolicy || null,
    cancellationPolicyDetails: data.cancellationPolicyDetails || null,
    depositPercentage: data.depositPercentage || formData.depositPercentage || null,
    depositDueAtBooking: data.depositDueAtBooking || formData.depositDueAtBooking || null,
  };

  // ==================== FOOD & BEVERAGE ====================
  if (category === 'FoodBeverage') {
    const cuisineTypes = data.cuisineTypes || foodBeverageDetails.cuisineTypes || formData.cuisineTypes;
    const serviceStyle = data.serviceStyle || foodBeverageDetails.serviceStyles || foodBeverageDetails.serviceStyle || formData.serviceStyle;
    const dietarySpecialties = data.dietarySpecialties || foodBeverageDetails.dietarySpecialties || formData.dietarySpecialties;
    const traits = data.traits || foodBeverageDetails.traits || formData.traits;

    provider.cuisineTypes = Array.isArray(cuisineTypes) ? cuisineTypes.join(', ') : cuisineTypes || null;
    provider.serviceStyle = Array.isArray(serviceStyle) ? serviceStyle.join(', ') : serviceStyle || null;
    provider.dietarySpecialties = Array.isArray(dietarySpecialties) ? dietarySpecialties : [];
    provider.traits = Array.isArray(traits) ? traits : [];
    provider.minimumGuarantee = data.minimumGuarantee || foodBeverageDetails.minimumGuarantee || formData.minimumGuarantee || null;
    provider.foodTruckDimensions = data.foodTruckDimensions || foodBeverageDetails.foodTruckDimensions || null;

    // Menu items
    provider.menuAlaCarte = data.menuAlaCarte || foodBeverageDetails.menuAlaCarte || formData.menuAlaCarte || null;
    provider.menuCatering = data.menuCatering || foodBeverageDetails.menuCatering || formData.menuCatering || null;
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
      freeServices: nonprofitFlex.freeServices || false,
    } : null;

    // High volume partner
    const highVolume = foodBeverageDetails.highVolumePartner as Record<string, unknown> | undefined;
    provider.highVolumePartner = highVolume ? {
      reduceMinimum: highVolume.reduceMinimum || false,
      reducedMinimum: highVolume.reducedMinimum || null,
      waiveMinimum: highVolume.waiveMinimum || false,
    } : null;

    // Service options
    provider.offersPickup = foodBeverageDetails.offersPickup || formData.offersPickup || data.offersPickup || false;
    provider.offersDelivery = foodBeverageDetails.offersDelivery || formData.offersDelivery || data.offersDelivery || false;
    provider.offersOnSite = foodBeverageDetails.offersOnSite || formData.offersOnSite || data.offersOnSite || false;
    provider.deliveryFee = foodBeverageDetails.deliveryFee || formData.deliveryFee || null;
    provider.pickupLocation = foodBeverageDetails.pickupLocation || formData.pickupLocation || data.pickupLocation || null;

    // Business operations
    provider.hoursOfOperation = foodBeverageDetails.hoursOfOperation || formData.hoursOfOperation || null;
    provider.daysOfOperation = foodBeverageDetails.daysOfOperation || formData.daysOfOperation || [];
    provider.operatingSchedule = foodBeverageDetails.operatingSchedule || formData.operatingSchedule || null;

    // Policies
    provider.cancellationPolicy = foodBeverageDetails.cancellationPolicy || formData.cancellationPolicy || data.cancellationPolicy || null;
    provider.depositPercentage = foodBeverageDetails.depositPercentage || formData.depositPercentage || data.depositPercentage || null;
    provider.calendarAvailability = foodBeverageDetails.calendarAvailability || formData.calendarAvailability || data.calendarAvailability || null;
  }

  // ==================== ENTERTAINMENT ====================
  if (category === 'Entertainment') {
    const genres = data.genres || formData.genres || entertainmentDetails.genres || entertainmentDetails.musicGenres;
    const performanceTypes = entertainmentDetails.performanceTypes;
    const techRequirements = entertainmentDetails.technicalRequirements || entertainmentDetails.equipmentProvided;

    provider.genres = Array.isArray(genres) ? genres.join(', ') : genres || null;
    provider.performanceType = data.performanceType || data.entertainerType || formData.entertainerType || entertainmentDetails.entertainerType || null;
    provider.performanceLength = data.performanceLength || entertainmentDetails.typicalSetDuration || entertainmentDetails.performanceDuration || null;
    provider.technicalRequirements = Array.isArray(techRequirements) ? techRequirements.join(', ') : techRequirements || null;
    provider.performanceTypes = Array.isArray(performanceTypes) ? performanceTypes : [];
    provider.performanceStyles = entertainmentDetails.performanceStyles || [];
    provider.specializations = entertainmentDetails.specializations || [];
    provider.achievements = entertainmentDetails.achievements || null;

    // Act description - THE MAIN BIO FOR ENTERTAINERS
    provider.actDescription = entertainmentDetails.actDescription ||
      formData.actDescription ||
      data.actDescription ||
      entertainmentDetails.description ||
      formData.description ||
      data.description || null;

    // Pricing
    provider.compensationFlatFee = data.compensationFlatFee || entertainmentDetails.typicalPerformanceFee || null;
    provider.compensationHourly = data.compensationHourly || null;
    provider.feeStructureDetails = entertainmentDetails.feeStructureDetails || [];

    // Media
    const music = data.music || formData.music || entertainmentDetails.photos;
    const videos = data.videos || formData.videos || entertainmentDetails.videos;
    provider.demoAudio = Array.isArray(music) && music.length > 0 ? music[0] : null;
    provider.performanceVideo = Array.isArray(videos) && videos.length > 0 ? videos[0] : null;
    provider.allAudio = Array.isArray(music) ? music : [];
    provider.allVideos = Array.isArray(videos) ? videos : [];

    // Travel
    provider.travelPolicy = entertainmentDetails.travelPolicy || null;
    provider.travelNotes = entertainmentDetails.travelNotes || null;
    provider.basedIn = entertainmentDetails.basedIn || data.basedIn || formData.basedIn || null;

    // Setup/teardown
    provider.setupTime = entertainmentDetails.setupTime || null;
    provider.teardownTime = entertainmentDetails.teardownTime || null;
    provider.amplification = entertainmentDetails.amplification || null;
    provider.performanceAreaRequirements = entertainmentDetails.performanceAreaRequirements || null;

    // Policies
    provider.cancellationPolicy = entertainmentDetails.cancellationPolicy || formData.cancellationPolicy || data.cancellationPolicy || null;
    provider.depositPercentage = entertainmentDetails.depositDueAtBooking || formData.depositPercentage || data.depositPercentage || null;
    provider.calendarAvailability = entertainmentDetails.calendarAvailability || entertainmentDetails.calendarManagement || formData.calendarAvailability || data.calendarAvailability || null;

    // Nonprofit flexibility
    const nonprofitFlex = entertainmentDetails.nonprofitFlexibility as Record<string, unknown> | undefined;
    provider.nonprofitFlexibility = nonprofitFlex ? {
      reduceFee: nonprofitFlex.reduceFee || false,
      waiveFee: nonprofitFlex.waiveFee || false,
      discountPercentage: nonprofitFlex.discountPercentageValue || null,
      freeServices: nonprofitFlex.freeServices || false,
    } : null;

    // High volume partner
    const highVolume = entertainmentDetails.highVolumePartner as Record<string, unknown> | undefined;
    provider.highVolumePartner = highVolume ? {
      packageDeals: highVolume.packageDeals || false,
      reduceFee: highVolume.reduceFee || false,
      reduceFeeValue: highVolume.reduceFeeValue || null,
    } : null;
  }

  // ==================== VENUES ====================
  if (category === 'Venues') {
    const venueType = data.venueType || venueDetails.venueType;
    const layoutOptions = data.layoutOptions || venueDetails.layoutOptions;
    const amenities = data.amenities || venueDetails.amenities;
    const accessibility = data.accessibility || venueDetails.accessibility;
    const includedRentals = data.includedRentals || venueDetails.includedRentals;

    provider.venueType = Array.isArray(venueType) ? venueType.join(', ') : venueType || null;
    provider.capacitySeated = data.capacitySeated || venueDetails.capacitySeated || venueDetails.indoorCapacity || null;
    provider.capacityStanding = data.capacityStanding || venueDetails.capacityStanding || venueDetails.outdoorCapacity || null;
    provider.squareFootage = data.squareFootage || venueDetails.squareFootage || null;
    provider.layoutOptions = Array.isArray(layoutOptions) ? layoutOptions.join(', ') : layoutOptions || null;
    provider.amenities = Array.isArray(amenities) ? amenities : [];
    provider.accessibility = Array.isArray(accessibility) ? accessibility : [];
    provider.includedRentals = Array.isArray(includedRentals) ? includedRentals : [];

    // Venue spaces
    const rawVenueSpaces = formData.venueSpaces || venueDetails.venueSpaces || data.venueSpaces || [];
    provider.venueSpaces = Array.isArray(rawVenueSpaces) ? rawVenueSpaces.map((space: any) => ({
      id: space.id || null,
      name: space.name || 'Main Space',
      description: space.description || null,
      squareFeet: space.squareFeet || space.squareFootage || null,
      seatedCapacity: space.seatedCapacity || space.capacitySeated || null,
      standingCapacity: space.standingCapacity || space.capacityStanding || null,
      hourlyRate: space.hourlyRate || space.pricePerHour || null,
      photos: space.photos || [],
      amenities: space.amenities || [],
      layoutOptions: space.layoutOptions || [],
    })) : [];

    // Parking
    provider.parking = data.parking || venueDetails.parking || null;
    provider.parkingDetails = venueDetails.parkingDetails || null;

    // Kitchen and alcohol
    provider.kitchenAccess = data.kitchenAccess || venueDetails.kitchenAccess || null;
    provider.kitchenAccessDetails = venueDetails.kitchenAccessDetails || null;
    provider.alcoholPolicy = data.alcoholPolicy || venueDetails.alcoholPolicy || null;
    provider.alcoholPolicyDetails = venueDetails.alcoholPolicyDetails || null;

    // Security
    provider.securityRequirements = data.securityRequirements || venueDetails.securityRequirements || null;
    provider.securityCameras = venueDetails.securityCameras || false;

    // Wifi
    provider.wifiAvailable = venueDetails.wifiAvailable || false;
    provider.wifiName = venueDetails.wifiName || null;

    // House rules
    provider.houseRules = venueDetails.houseRules || [];
    provider.noiseCurfew = venueDetails.noiseCurfew || null;
    provider.noiseCurfewRestrictions = venueDetails.noiseCurfewRestrictions || null;

    // Vendors policy
    provider.preferredVendorList = venueDetails.preferredVendorList || false;
    provider.allowOutsideVendors = venueDetails.allowOutsideVendors !== false;
    provider.externalVendorsAllowed = venueDetails.externalVendorsAllowed || null;

    // Pricing
    provider.rentalFeeHourly = data.rentalFeeHourly || venueDetails.hourlyRate || null;
    provider.rentalFeeFlat = data.rentalFeeFlat || venueDetails.rentalFeeAmount || venueDetails.typicalRentalFee || null;
    provider.minimumSpendRequirement = data.minimumSpendRequirement || venueDetails.minimumSpendRequirement || venueDetails.minimumSpend || null;
    provider.minimumHours = venueDetails.minimumHours || null;
    provider.cleaningFee = venueDetails.cleaningFee || null;
    provider.cleaningFeeAmount = venueDetails.cleaningFeeAmount || null;
    provider.depositRequired = venueDetails.depositRequired || null;

    // Insurance
    provider.requiresInsurance = venueDetails.requiresInsurance || false;
    provider.insuranceLiabilityRequirements = venueDetails.insuranceLiabilityRequirements || null;

    // Differentiators
    provider.historicLandmark = venueDetails.historicLandmark || false;
    provider.waterfront = venueDetails.waterfront || false;
    provider.rooftop = venueDetails.rooftop || false;
    provider.uniqueArchitecture = venueDetails.uniqueArchitecture || false;
    provider.fullService = venueDetails.fullService || false;
    provider.blankCanvas = venueDetails.blankCanvas || false;
    provider.ecoFriendly = venueDetails.ecoFriendly || false;
    provider.customDifferentiators = venueDetails.customDifferentiators || [];

    // Nonprofit flexibility
    const nonprofitFlex = venueDetails.nonprofitFlexibility as Record<string, unknown> | undefined;
    provider.nonprofitFlexibility = nonprofitFlex || null;

    // Policies
    provider.cancellationPolicy = venueDetails.cancellationPolicy || formData.cancellationPolicy || data.cancellationPolicy || null;
    provider.depositPercentage = venueDetails.depositDueAtBooking || formData.depositPercentage || data.depositPercentage || null;
  }

  // ==================== VENDORS ====================
  if (category === 'Vendors') {
    const productCategory = data.productCategory || vendorDetails.productCategory || formData.productCategory;
    const serviceCategory = data.serviceCategory || vendorDetails.serviceCategory || formData.serviceCategory;
    const inventoryModel = data.inventoryModel || vendorDetails.inventoryModel || formData.inventoryModel;
    const specializations = data.specializations || vendorDetails.specializations || formData.specializations;
    const productTypes = data.productTypes || vendorDetails.productTypes || formData.productTypes;
    const preferredEventTypes = data.preferredEventTypes || vendorDetails.preferredEventTypes || formData.preferredEventTypes;

    provider.productCategory = Array.isArray(productCategory) ? productCategory.join(', ') : productCategory || null;
    provider.serviceCategory = Array.isArray(serviceCategory) ? serviceCategory.join(', ') : serviceCategory || null;
    provider.productionType = data.productionType || vendorDetails.productionType || formData.productionType || null;
    provider.averagePriceRange = data.averagePriceRange || vendorDetails.averagePriceRange || formData.averagePriceRange || null;
    provider.typicalProductPrice = data.typicalProductPrice || vendorDetails.typicalProductPrice || formData.typicalProductPrice || null;
    provider.inventoryModel = Array.isArray(inventoryModel) ? inventoryModel.join(', ') : inventoryModel || null;
    provider.minimumOrderRequirement = data.minimumOrderRequirement || vendorDetails.minimumOrder || formData.minimumOrder || null;
    provider.businessType = vendorDetails.businessType || formData.businessType || data.businessType || null;
    provider.serviceDescription = vendorDetails.serviceDescription || formData.serviceDescription || data.serviceDescription || null;
    provider.productDescription = vendorDetails.productDescription || formData.productDescription || data.productDescription || null;
    provider.specializations = Array.isArray(specializations) ? specializations : [];
    provider.productTypes = Array.isArray(productTypes) ? productTypes : [];
    provider.preferredEventTypes = Array.isArray(preferredEventTypes) ? preferredEventTypes : [];

    // Product-specific features
    provider.customPersonalized = vendorDetails.customPersonalized || formData.customPersonalized || false;
    provider.ecoFriendly = vendorDetails.ecoFriendly || formData.ecoFriendly || false;
    provider.giftReadyPackaging = vendorDetails.giftReadyPackaging || formData.giftReadyPackaging || false;
    provider.locallyMade = vendorDetails.locallyMade || formData.locallyMade || false;
    provider.culturallyInspired = vendorDetails.culturallyInspired || formData.culturallyInspired || false;

    // Service-specific features
    provider.availableWeekends = vendorDetails.availableWeekends || formData.availableWeekends || false;
    provider.sameDayAvailable = vendorDetails.sameDayAvailable || formData.sameDayAvailable || false;
    provider.travelFlexible = vendorDetails.travelFlexible || formData.travelFlexible || false;
    provider.multipleEventsSameDay = vendorDetails.multipleEventsSameDay || formData.multipleEventsSameDay || false;
    provider.bilingual = vendorDetails.bilingual || formData.bilingual || false;
    provider.fullyInsured = vendorDetails.fullyInsured || formData.fullyInsured || false;

    // Travel policy
    provider.travelPolicy = vendorDetails.travelPolicy || formData.travelPolicy || data.travelPolicy || null;
    provider.travelNotes = vendorDetails.travelNotes || formData.travelNotes || data.travelNotes || null;

    // SERVICE ITEMS - check ALL sources
    const rawServiceItems = vendorDetails.serviceItems ||
      formData.serviceItems ||
      vendorDetails.addOnItems ||
      formData.addOnItems ||
      vendorDetails.services ||
      formData.services ||
      data.serviceItems ||
      data.addOnItems ||
      [];

    // Normalize service items
    provider.serviceItems = Array.isArray(rawServiceItems) ? rawServiceItems.map((item: any) => ({
      id: item.id || null,
      name: item.name || '',
      category: item.category || '',
      price: item.price || 0,
      pricingUnit: item.chargeType?.replace?.('_', ' ') || item.pricingUnit || 'per service',
      image: item.photo || item.image || (item.photos && item.photos[0]) || null,
      photos: item.photos || [],
      serviceDetails: item.description || item.serviceDetails || '',
      maxQuantity: item.maxQuantity || null,
    })) : [];

    // PRODUCT ITEMS
    const rawProductItems = vendorDetails.productItems ||
      formData.productItems ||
      vendorDetails.products ||
      formData.products ||
      data.productItems ||
      [];

    provider.productItems = Array.isArray(rawProductItems) ? rawProductItems.map((item: any) => ({
      id: item.id || null,
      name: item.name || '',
      price: item.price || 0,
      description: item.description || '',
      image: item.photo || item.image || (item.photos && item.photos[0]) || null,
      photos: item.photos || [],
    })) : [];

    // Policies
    provider.cancellationPolicy = vendorDetails.cancellationPolicy || formData.cancellationPolicy || data.cancellationPolicy || null;
    provider.depositPercentage = vendorDetails.depositPercentage || formData.depositPercentage || data.depositPercentage || null;
    provider.depositDueAtBooking = vendorDetails.depositDueAtBooking || formData.depositDueAtBooking || data.depositDueAtBooking || null;
    provider.leadTimeRequired = vendorDetails.leadTime || vendorDetails.leadTimeRequired || formData.leadTimeRequired || data.leadTimeRequired || null;
    provider.calendarAvailability = vendorDetails.calendarAvailability || formData.calendarAvailability || data.calendarAvailability || null;
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

        // Fetch details subcollection
        if (category) {
          try {
            const detailsRef = collection(db, `Providers/${category}/providers/${providerId}/details`);
            const detailsSnapshot = await getDocs(detailsRef);
            detailsSnapshot.forEach(docSnap => {
              detailsData[docSnap.id] = docSnap.data();
            });
          } catch (e) {
            // Details subcollection may not exist
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
