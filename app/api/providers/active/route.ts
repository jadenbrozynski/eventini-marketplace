import { NextRequest, NextResponse } from 'next/server';
import { adminDb, hasAdminCredentials } from '@/lib/firebase-admin';
import type { Provider, ProviderCategory } from '@/types';

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

// Fetch ONLY from ActiveProviders collection - these are providers that have been
// approved and are actively listed on the marketplace
export async function GET(request: NextRequest) {
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
