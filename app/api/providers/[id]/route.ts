import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

const CATEGORY_COLLECTIONS = {
  FoodBeverage: 'Providers/FoodBeverage/providers',
  Entertainment: 'Providers/Entertainment/providers',
  Venues: 'Providers/Venues/providers',
  Vendors: 'Providers/Vendors/providers',
};

function extractName(data: Record<string, unknown>): string {
  return (
    (data.businessTitle as string) ||
    (data.businessName as string) ||
    (data.name as string) ||
    (data.providerName as string) ||
    (data.vendorName as string) ||
    (data.stageArtistName as string) ||
    (data.stageName as string) ||
    (data.actName as string) ||
    (data.venueName as string) ||
    (data.contactName as string) ||
    ''
  );
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

async function findProviderById(id: string) {
  // First check ActiveProviders
  try {
    const activeDoc = await adminDb.collection('ActiveProviders').doc(id).get();
    if (activeDoc.exists) {
      const data = activeDoc.data() || {};
      const category = (data.category as string) || 'Vendors';

      // Also fetch the details subcollection from the category collection
      const detailsData = await fetchProviderDetails(category, id);

      return { id: activeDoc.id, ...data, detailsSubcollection: detailsData, source: 'ActiveProviders' };
    }
  } catch (e) {
    console.error('Error checking ActiveProviders:', e);
  }

  // Search in category collections
  for (const [category, path] of Object.entries(CATEGORY_COLLECTIONS)) {
    try {
      const doc = await adminDb.collection(path).doc(id).get();
      if (doc.exists) {
        const data = doc.data() || {};

        // Fetch the details subcollection
        const detailsData = await fetchProviderDetails(category, id);

        return { id: doc.id, ...data, category, detailsSubcollection: detailsData, source: path };
      }
    } catch (e) {
      console.error(`Error checking ${path}:`, e);
    }
  }

  return null;
}

// Fetch provider details from the details subcollection
async function fetchProviderDetails(category: string, providerId: string): Promise<Record<string, unknown>> {
  try {
    const detailsRef = adminDb
      .collection('Providers')
      .doc(category)
      .collection('providers')
      .doc(providerId)
      .collection('details');

    const snapshot = await detailsRef.get();
    const details: Record<string, unknown> = {};

    snapshot.docs.forEach(doc => {
      details[doc.id] = doc.data();
    });

    return details;
  } catch (error) {
    console.error(`Error fetching ${category} provider details subcollection:`, error);
    return {};
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const rawProvider = await findProviderById(id);

    if (!rawProvider) {
      return NextResponse.json(
        { error: 'Provider not found' },
        { status: 404 }
      );
    }

    const data = rawProvider as Record<string, unknown>;
    const formData = (data.formData as Record<string, unknown>) || {};
    const category = (data.category as string) || 'Vendors';

    // Get the details subcollection data
    const detailsSubcollection = (data.detailsSubcollection as Record<string, unknown>) || {};

    // Extract nested details objects from both main doc and subcollection
    // Note: subcollection docs are named 'food', 'venue', 'entertainment', 'vendor', 'pricing', etc.
    const foodBeverageDetails = (data.foodBeverageDetails as Record<string, unknown>) ||
      (detailsSubcollection.food as Record<string, unknown>) ||
      (detailsSubcollection.foodBeverage as Record<string, unknown>) || {};
    const entertainmentDetails = (data.entertainmentDetails as Record<string, unknown>) ||
      (detailsSubcollection.entertainment as Record<string, unknown>) || {};
    const venueDetails = (data.venueDetails as Record<string, unknown>) ||
      (detailsSubcollection.venue as Record<string, unknown>) || {};
    const vendorDetails = (data.vendorDetails as Record<string, unknown>) ||
      (detailsSubcollection.vendor as Record<string, unknown>) || {};
    const pricingDetails = (detailsSubcollection.pricing as Record<string, unknown>) || {};
    const socialMedia = (data.socialMedia as Record<string, unknown>) || {};

    // Build common fields
    const provider: Record<string, unknown> = {
      id: data.id,
      category,
      name: extractName(data),
      contactName: data.contactName || null,
      phone: data.phone || null,
      email: data.email || null,
      address: data.address || null,
      website: data.website || null,
      city: data.city || null,
      state: data.state || null,
      zipCode: data.zipCode || null,
      rating: data.rating || data.averageRating || null,
      reviewCount: data.reviewCount || data.totalReviews || null,
      imageUrls: extractImageUrls(data),
      primaryImageUrl: data.primaryImageUrl || data.coverPhoto || formData.coverPhoto || null,
      specialFeatures: data.specialFeatures || [],
      serviceRadius: data.serviceRadius || null,
      yearsInBusiness: data.yearsInBusiness || data.yearsInOperation || null,

      // Bio and description
      bio: data.bio || data.description || null,
      description: data.description || data.bio || null,

      // Identity tags (nonprofit, woman-owned, veteran-owned, etc.)
      ownerIdentityTags: data.ownerIdentityTags || [],

      // Lead time and availability
      leadTimeRequired: data.leadTimeRequired || null,
      calendarAvailability: data.calendarAvailability || null,

      // Social media
      socialMedia: {
        instagram: socialMedia.instagram || null,
        facebook: socialMedia.facebook || null,
        tiktok: socialMedia.tiktok || null,
        twitter: socialMedia.twitter || null,
        linkedin: socialMedia.linkedin || null,
        youtube: socialMedia.youtube || null,
      },

      // Cancellation policy
      cancellationPolicy: data.cancellationPolicy || null,
      cancellationPolicyDetails: data.cancellationPolicyDetails || null,
    };

    // Add category-specific fields
    if (category === 'FoodBeverage') {
      const cuisineTypes = data.cuisineTypes || foodBeverageDetails.cuisineTypes || formData.cuisineTypes;
      const serviceStyle = data.serviceStyle || foodBeverageDetails.serviceStyles || foodBeverageDetails.serviceStyle || formData.serviceStyle;
      const dietarySpecialties = data.dietarySpecialties || foodBeverageDetails.dietarySpecialties || formData.dietarySpecialties;
      const traits = data.traits || foodBeverageDetails.traits || formData.traits;

      provider.cuisineTypes = Array.isArray(cuisineTypes) ? cuisineTypes.join(', ') : cuisineTypes || null;
      provider.serviceStyle = Array.isArray(serviceStyle) ? serviceStyle.join(', ') : serviceStyle || null;
      provider.dietarySpecialties = Array.isArray(dietarySpecialties) ? dietarySpecialties : [];
      provider.traits = Array.isArray(traits) ? traits : [];
      provider.minimumGuarantee = data.minimumGuarantee || foodBeverageDetails.minimumGuarantee || null;
      provider.foodTruckDimensions = data.foodTruckDimensions || foodBeverageDetails.foodTruckDimensions || null;

      // Menu items - check all possible sources
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
    }

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

      // Pricing
      provider.compensationFlatFee = data.compensationFlatFee || entertainmentDetails.typicalPerformanceFee || null;
      provider.compensationHourly = data.compensationHourly || null;
      provider.feeStructureDetails = entertainmentDetails.feeStructureDetails || [];

      // Media - check multiple sources
      const music = data.music || formData.music || entertainmentDetails.photos;
      const videos = data.videos || formData.videos || entertainmentDetails.videos;
      provider.demoAudio = Array.isArray(music) && music.length > 0 ? music[0] : null;
      provider.performanceVideo = Array.isArray(videos) && videos.length > 0 ? videos[0] : null;
      provider.allAudio = Array.isArray(music) ? music : [];
      provider.allVideos = Array.isArray(videos) ? videos : [];

      // Travel
      provider.travelPolicy = entertainmentDetails.travelPolicy || null;
      provider.travelNotes = entertainmentDetails.travelNotes || null;
      provider.basedIn = entertainmentDetails.basedIn || null;

      // Setup/teardown
      provider.setupTime = entertainmentDetails.setupTime || null;
      provider.teardownTime = entertainmentDetails.teardownTime || null;
      provider.amplification = entertainmentDetails.amplification || null;
      provider.performanceAreaRequirements = entertainmentDetails.performanceAreaRequirements || null;

      // Nonprofit flexibility for entertainment
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
    }

    if (category === 'Vendors') {
      const productCategory = data.productCategory;
      const inventoryModel = data.inventoryModel;

      provider.productCategory = Array.isArray(productCategory) ? productCategory.join(', ') : productCategory || null;
      provider.productionType = data.productionType || null;
      provider.averagePriceRange = data.averagePriceRange || null;
      provider.inventoryModel = Array.isArray(inventoryModel) ? inventoryModel.join(', ') : inventoryModel || null;
      provider.minimumOrderRequirement = data.minimumOrderRequirement || null;

      // Products and services
      provider.serviceItems = formData.serviceItems || formData.services || [];
      provider.productItems = formData.productItems || formData.products || [];
    }

    return NextResponse.json({ provider });
  } catch (error) {
    console.error('Error fetching provider:', error);
    return NextResponse.json(
      { error: 'Failed to fetch provider' },
      { status: 500 }
    );
  }
}
