import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import type { Provider, ProviderCategory } from '@/types';

const CATEGORY_COLLECTIONS: Record<ProviderCategory, string> = {
  FoodBeverage: 'Providers/FoodBeverage/providers',
  Entertainment: 'Providers/Entertainment/providers',
  Venues: 'Providers/Venues/providers',
  Vendors: 'Providers/Vendors/providers',
};

function convertTimestamp(timestamp: unknown): string | null {
  if (!timestamp) return null;

  // Handle Firestore Timestamp
  if (typeof timestamp === 'object' && timestamp !== null && 'toDate' in timestamp) {
    return (timestamp as { toDate: () => Date }).toDate().toISOString();
  }

  // Handle serialized timestamp with _seconds
  if (typeof timestamp === 'object' && timestamp !== null && '_seconds' in timestamp) {
    const ts = timestamp as { _seconds: number };
    return new Date(ts._seconds * 1000).toISOString();
  }

  // Handle Date object
  if (timestamp instanceof Date) {
    return timestamp.toISOString();
  }

  // Handle ISO string
  if (typeof timestamp === 'string') {
    return timestamp;
  }

  // Handle number (milliseconds)
  if (typeof timestamp === 'number') {
    return new Date(timestamp).toISOString();
  }

  return null;
}

function extractBusinessName(data: Record<string, unknown>): string {
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

async function fetchProvidersFromCollection(
  collectionPath: string,
  category: ProviderCategory
): Promise<Provider[]> {
  try {
    const snapshot = await adminDb.collection(collectionPath).get();
    const providers: Provider[] = [];

    for (const doc of snapshot.docs) {
      const data = doc.data();

      // Skip non-active or non-listed providers
      if (data.isActive === false || data.isListed === false) {
        continue;
      }

      // Skip non-approved providers
      if (data.approvalStatus && data.approvalStatus !== 'approved') {
        continue;
      }

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
        city: data.city as string | undefined,
        state: data.state as string | undefined,
        zipCode: data.zipCode as string | undefined,
        imageUrls: extractImageUrls(data),
        primaryImageUrl: extractPrimaryImage(data) || undefined,
        category,
        isListed: data.isListed as boolean | undefined,
        isActive: data.isActive as boolean | undefined,
        approvalStatus: data.approvalStatus as 'pending' | 'approved' | 'rejected' | undefined,
        featured: data.featured as boolean | undefined,
        rating: data.rating as number | undefined,
        reviewCount: data.reviewCount as number | undefined,
        yearsInBusiness: data.yearsInBusiness as string | undefined,
        serviceRadius: data.serviceRadius as number | undefined,
        specialFeatures: data.specialFeatures as string[] | undefined,
        createdAt: convertTimestamp(data.createdAt) || undefined,
        updatedAt: convertTimestamp(data.updatedAt) || undefined,
      };

      providers.push(provider);
    }

    return providers;
  } catch (error) {
    console.error(`Error fetching from ${collectionPath}:`, error);
    return [];
  }
}

async function fetchActiveProviders(): Promise<Provider[]> {
  try {
    const snapshot = await adminDb.collection('ActiveProviders').get();
    const providers: Provider[] = [];

    for (const doc of snapshot.docs) {
      const data = doc.data();

      const provider: Provider = {
        id: doc.id,
        businessName: extractBusinessName(data),
        stageName: data.stageName as string | undefined,
        venueName: data.venueName as string | undefined,
        vendorName: data.vendorName as string | undefined,
        contactName: data.contactName as string | undefined,
        phone: data.phone as string | undefined,
        email: data.email as string | undefined,
        city: data.city as string | undefined,
        state: data.state as string | undefined,
        imageUrls: extractImageUrls(data),
        primaryImageUrl: extractPrimaryImage(data) || undefined,
        category: (data.category as ProviderCategory) || 'Vendors',
        isListed: true,
        isActive: true,
        approvalStatus: 'approved',
        featured: data.featured as boolean | undefined,
        rating: data.rating as number | undefined,
        reviewCount: data.reviewCount as number | undefined,
        createdAt: convertTimestamp(data.createdAt) || undefined,
        updatedAt: convertTimestamp(data.updatedAt) || undefined,
      };

      providers.push(provider);
    }

    return providers;
  } catch (error) {
    console.error('Error fetching ActiveProviders:', error);
    return [];
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') as ProviderCategory | null;
    const featured = searchParams.get('featured');
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam, 10) : undefined;

    let allProviders: Provider[] = [];

    // If specific category requested
    if (category && CATEGORY_COLLECTIONS[category]) {
      allProviders = await fetchProvidersFromCollection(
        CATEGORY_COLLECTIONS[category],
        category
      );
    } else {
      // Fetch from all collections
      const [activeProviders, ...categoryProviders] = await Promise.all([
        fetchActiveProviders(),
        ...Object.entries(CATEGORY_COLLECTIONS).map(([cat, path]) =>
          fetchProvidersFromCollection(path, cat as ProviderCategory)
        ),
      ]);

      // Combine and deduplicate by ID
      const providerMap = new Map<string, Provider>();

      // Active providers take priority
      for (const provider of activeProviders) {
        providerMap.set(provider.id, provider);
      }

      // Add category providers if not already present
      for (const providers of categoryProviders) {
        for (const provider of providers) {
          if (!providerMap.has(provider.id)) {
            providerMap.set(provider.id, provider);
          }
        }
      }

      allProviders = Array.from(providerMap.values());
    }

    // Filter by featured if requested
    if (featured === 'true') {
      allProviders = allProviders.filter((p) => p.featured === true);
    }

    // Sort by rating (highest first), then by name
    allProviders.sort((a, b) => {
      if ((b.rating || 0) !== (a.rating || 0)) {
        return (b.rating || 0) - (a.rating || 0);
      }
      const nameA = a.businessName || a.stageName || a.venueName || '';
      const nameB = b.businessName || b.stageName || b.venueName || '';
      return nameA.localeCompare(nameB);
    });

    // Apply limit if specified
    if (limit && limit > 0) {
      allProviders = allProviders.slice(0, limit);
    }

    return NextResponse.json({
      providers: allProviders,
      total: allProviders.length,
    });
  } catch (error) {
    console.error('Error in providers API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch providers' },
      { status: 500 }
    );
  }
}
