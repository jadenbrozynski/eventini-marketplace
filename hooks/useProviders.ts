'use client';

import { useState, useEffect, useCallback } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Provider, ProviderCategory } from '@/types';

interface UseProvidersOptions {
  category?: ProviderCategory | 'all';
  featured?: boolean;
  limit?: number;
}

interface UseProvidersReturn {
  providers: Provider[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

function extractBusinessName(data: Record<string, unknown>): string {
  return (
    (data.businessTitle as string) ||
    (data.businessName as string) ||
    (data.name as string) ||
    (data.stageName as string) ||
    (data.venueName as string) ||
    (data.vendorName as string) ||
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
  return [...new Set(urls)];
}

function extractLocation(data: Record<string, unknown>): { city: string | null; state: string | null } {
  const formData = (data.formData as Record<string, unknown>) || {};

  let city: string | null = null;
  let state: string | null = null;

  // Try serviceLocation first (format: "City, State")
  const serviceLocation = (formData.serviceLocation || data.serviceLocation) as string;
  if (serviceLocation && serviceLocation.includes(',')) {
    const parts = serviceLocation.split(',').map(p => p.trim());
    if (parts.length >= 2) {
      city = parts[0];
      state = parts[1];
    }
  }

  // Fallback to direct fields
  if (!city) city = (data.city || formData.city) as string || null;
  if (!state) state = (data.state || formData.state) as string || null;

  return { city, state };
}

export function useProviders(options: UseProvidersOptions = {}): UseProvidersReturn {
  const { category = 'all', featured, limit } = options;
  const [providers, setProviders] = useState<Provider[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProviders = useCallback(async () => {
    if (!db) {
      setError(new Error('Firebase not configured'));
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Read directly from ActiveProviders collection
      const activeProvidersRef = collection(db, 'ActiveProviders');
      let q = query(activeProvidersRef);

      // Filter by category if specified
      if (category !== 'all') {
        q = query(activeProvidersRef, where('category', '==', category));
      }

      const snapshot = await getDocs(q);
      const fetchedProviders: Provider[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data();

        // Skip inactive providers
        if (data.inactive === true) return;

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
          city: location.city || undefined,
          state: location.state || undefined,
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
        };

        fetchedProviders.push(provider);
      });

      // Filter by featured if requested
      let result = fetchedProviders;
      if (featured !== undefined) {
        result = result.filter(p => p.featured === featured);
      }

      // Sort by rating
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));

      // Apply limit
      if (limit && limit > 0) {
        result = result.slice(0, limit);
      }

      setProviders(result);
    } catch (err) {
      console.error('=== FIREBASE ERROR ===');
      console.error('Error type:', err instanceof Error ? err.name : typeof err);
      console.error('Error message:', err instanceof Error ? err.message : String(err));
      console.error('Full error:', err);
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setIsLoading(false);
    }
  }, [category, featured, limit]);

  useEffect(() => {
    fetchProviders();
  }, [fetchProviders]);

  return {
    providers,
    isLoading,
    error,
    refetch: fetchProviders,
  };
}
