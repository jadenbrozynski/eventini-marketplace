import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin';
import type { Provider, ProviderCategory } from '@/types';

// Force dynamic rendering - don't prerender during build
export const dynamic = 'force-dynamic';

// Category-aware name extraction matching EventiniMockUp's getProviderDisplayName
function extractBusinessName(data: Record<string, unknown>): string {
  const formData = (data.formData as Record<string, unknown>) || {};
  const category = ((data.category as string) || '').toLowerCase();

  const checkValue = (val: unknown): val is string =>
    typeof val === 'string' && val !== 'N/A' && val.trim() !== '';

  // Venues: prioritize venueName
  if (category.includes('venue')) {
    if (checkValue(data.venueName)) return data.venueName;
    if (checkValue(formData.venueName)) return formData.venueName as string;
    if (checkValue(data.businessName)) return data.businessName as string;
    if (checkValue(formData.businessName)) return formData.businessName as string;
    if (checkValue(formData.businessTitle)) return formData.businessTitle as string;
  }

  // Entertainment: prioritize stageName/stageArtistName
  if (category.includes('entertainment')) {
    if (checkValue(data.stageName)) return data.stageName as string;
    if (checkValue(formData.stageName)) return formData.stageName as string;
    if (checkValue(formData.stageArtistName)) return formData.stageArtistName as string;
    if (checkValue(data.businessName)) return data.businessName as string;
    if (checkValue(formData.businessName)) return formData.businessName as string;
  }

  // F&B, Vendors, etc.: prioritize businessName/businessTitle
  if (checkValue(data.businessName)) return data.businessName as string;
  if (checkValue(formData.businessName)) return formData.businessName as string;
  if (checkValue(data.businessTitle)) return data.businessTitle as string;
  if (checkValue(formData.businessTitle)) return formData.businessTitle as string;
  if (checkValue(data.stageName)) return data.stageName as string;
  if (checkValue(data.venueName)) return data.venueName as string;

  // Fallback to any name field
  if (checkValue(data.name)) return data.name as string;
  if (checkValue(data.providerName)) return data.providerName as string;
  if (checkValue(data.vendorName)) return data.vendorName as string;
  if (checkValue(data.contactName)) return data.contactName as string;

  return '';
}

function extractPrimaryImage(data: Record<string, unknown>): string | null {
  return (
    (data.primaryImageUrl as string) ||
    (data.coverPhoto as string) ||
    ((data.businessPhotos as string[])?.[0]) ||
    ((data.photos as string[])?.[0]) ||
    ((data.imageUrls as string[])?.[0]) ||
    null
  );
}

function extractImageUrls(data: Record<string, unknown>): string[] {
  const urls: string[] = [];

  if (Array.isArray(data.imageUrls)) urls.push(...data.imageUrls);
  if (Array.isArray(data.businessPhotos)) urls.push(...data.businessPhotos);
  if (Array.isArray(data.photos)) urls.push(...data.photos);
  if (data.coverPhoto && typeof data.coverPhoto === 'string') {
    if (!urls.includes(data.coverPhoto)) urls.unshift(data.coverPhoto);
  }
  if (data.primaryImageUrl && typeof data.primaryImageUrl === 'string') {
    if (!urls.includes(data.primaryImageUrl)) urls.unshift(data.primaryImageUrl);
  }

  return [...new Set(urls)];
}

// Helper to extract location from multiple possible sources (matching EventiniMockUp pattern)
function extractLocation(data: Record<string, unknown>): { city: string | null; state: string | null; serviceLocation: string | null } {
  const formData = (data.formData as Record<string, unknown>) || {};
  const category = (data.category as string) || '';

  // Helper to get serviceLocation (full "City, State" string)
  const getServiceLocation = (): string | null => {
    if (formData.serviceLocation) return formData.serviceLocation as string;
    if (data.serviceLocation) return data.serviceLocation as string;
    if (formData.serviceAreaLocation) return formData.serviceAreaLocation as string;
    if (data.serviceAreaLocation) return data.serviceAreaLocation as string;
    return null;
  };

  // Helper to get city
  const getCity = (): string | null => {
    // Try to extract from serviceLocation first
    const serviceLocation = getServiceLocation();
    if (serviceLocation && serviceLocation.includes(',')) {
      const parts = serviceLocation.split(',').map(p => p.trim());
      if (parts.length >= 2) return parts[0];
    }

    // Direct city field
    if (data.city) return data.city as string;
    if (formData.city) return formData.city as string;

    // Residential address
    if ((data.residentialAddress as any)?.city) return (data.residentialAddress as any).city;
    if ((formData.residentialAddress as any)?.city) return (formData.residentialAddress as any).city;

    // Business city
    if (data.businessCity) return data.businessCity as string;
    if (formData.businessCity) return formData.businessCity as string;

    // Category-specific
    if (category === 'Venues') {
      if (formData.venueCity) return formData.venueCity as string;
      if ((formData.venueAddress as any)?.city) return (formData.venueAddress as any).city;
    }

    if (category === 'Entertainment') {
      const basedIn = data.basedIn || formData.basedIn;
      if (basedIn && typeof basedIn === 'string') {
        if (basedIn.includes(',')) {
          const parts = basedIn.split(',').map(p => p.trim());
          if (parts.length >= 2) return parts[0];
        }
        return basedIn;
      }
    }

    // Try to parse from location string
    const location = data.location as string;
    if (location && typeof location === 'string' && location.includes(',')) {
      const parts = location.split(',').map(p => p.trim());
      if (parts.length === 2) return parts[0];
      if (parts.length >= 3) {
        const lastPart = parts[parts.length - 1];
        if (/^\d{5}/.test(lastPart)) {
          return parts.length >= 3 ? parts[parts.length - 3] : parts[0];
        }
        return parts[parts.length - 2];
      }
    }

    return null;
  };

  // Helper to get state
  const getState = (): string | null => {
    // Try to extract from serviceLocation first
    const serviceLocation = getServiceLocation();
    if (serviceLocation && serviceLocation.includes(',')) {
      const parts = serviceLocation.split(',').map(p => p.trim());
      if (parts.length >= 2) return parts[1];
    }

    // Direct state field
    if (data.state) return data.state as string;
    if (formData.state) return formData.state as string;

    // Residential address
    if ((data.residentialAddress as any)?.state) return (data.residentialAddress as any).state;
    if ((formData.residentialAddress as any)?.state) return (formData.residentialAddress as any).state;

    // Business state
    if (data.businessState) return data.businessState as string;
    if (formData.businessState) return formData.businessState as string;

    // Category-specific
    if (category === 'Venues') {
      if (formData.venueState) return formData.venueState as string;
      if ((formData.venueAddress as any)?.state) return (formData.venueAddress as any).state;
    }

    if (category === 'Entertainment') {
      const basedIn = data.basedIn || formData.basedIn;
      if (basedIn && typeof basedIn === 'string' && basedIn.includes(',')) {
        const parts = basedIn.split(',').map(p => p.trim());
        if (parts.length >= 2) return parts[1];
      }
    }

    // Try to parse from location string
    const location = data.location as string;
    if (location && typeof location === 'string' && location.includes(',')) {
      const parts = location.split(',').map(p => p.trim());
      if (parts.length >= 2) {
        const lastPart = parts[parts.length - 1];
        if (/^\d{5}/.test(lastPart) && parts.length >= 3) {
          return parts[parts.length - 2];
        }
        if (lastPart.length === 2 && /^[A-Z]{2}$/i.test(lastPart)) {
          return lastPart.toUpperCase();
        }
        return parts[parts.length - 1];
      }
    }

    return null;
  };

  return {
    city: getCity(),
    state: getState(),
    serviceLocation: getServiceLocation(),
  };
}

// Fetch ONLY from ActiveProviders collection - these are providers that have been
// approved and are actively listed on the marketplace
export async function GET(request: NextRequest) {
  const adminDb = getAdminDb();

  if (!adminDb) {
    return NextResponse.json(
      { error: 'Database not configured' },
      { status: 503 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') as ProviderCategory | null;

    const providers: Provider[] = [];

    // Only fetch from ActiveProviders collection
    let query = adminDb.collection('ActiveProviders');

    // Filter by category if specified
    if (category) {
      query = query.where('category', '==', category) as typeof query;
    }

    const snapshot = await query.get();

    for (const doc of snapshot.docs) {
      const data = doc.data();

      // Skip providers marked as inactive
      if (data.inactive === true) {
        continue;
      }

      // Extract location from multiple possible sources
      const location = extractLocation(data);

      const provider: Provider = {
        id: doc.id,
        businessName: extractBusinessName(data),
        stageName: data.stageName as string | undefined,
        venueName: data.venueName as string | undefined,
        vendorName: data.vendorName as string | undefined,
        contactName: data.contactName as string | undefined,
        phone: data.phone as string | undefined,
        email: data.email as string | undefined,
        address: data.address as string | undefined,
        city: location.city || undefined,
        state: location.state || undefined,
        serviceLocation: location.serviceLocation || undefined,
        zipCode: data.zipCode as string | undefined,
        imageUrls: extractImageUrls(data),
        primaryImageUrl: extractPrimaryImage(data) || undefined,
        category: (data.category as ProviderCategory) || 'Vendors',
        isListed: true,
        isActive: true,
        approvalStatus: 'approved',
        featured: data.featured as boolean | undefined,
        rating: data.rating as number | undefined,
        reviewCount: data.reviewCount as number | undefined,
        yearsInBusiness: data.yearsInBusiness as string | undefined,
        serviceRadius: data.serviceRadius as number | undefined,
        specialFeatures: data.specialFeatures as string[] | undefined,
      };

      providers.push(provider);
    }

    // Sort by rating (highest first), then by name
    providers.sort((a, b) => {
      if ((b.rating || 0) !== (a.rating || 0)) {
        return (b.rating || 0) - (a.rating || 0);
      }
      const nameA = a.businessName || a.stageName || a.venueName || '';
      const nameB = b.businessName || b.stageName || b.venueName || '';
      return nameA.localeCompare(nameB);
    });

    return NextResponse.json({
      providers,
      total: providers.length,
    });
  } catch (error) {
    console.error('Error in active providers API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch active providers' },
      { status: 500 }
    );
  }
}
