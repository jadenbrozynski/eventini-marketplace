'use client';

import { useState, useEffect, useCallback } from 'react';
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

export function useProviders(options: UseProvidersOptions = {}): UseProvidersReturn {
  const { category = 'all', featured, limit } = options;
  const [providers, setProviders] = useState<Provider[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProviders = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (category !== 'all') params.set('category', category);
      if (featured !== undefined) params.set('featured', String(featured));
      if (limit !== undefined) params.set('limit', String(limit));

      const response = await fetch(`/api/providers?${params.toString()}`);

      if (!response.ok) {
        throw new Error('Failed to fetch providers');
      }

      const data = await response.json();
      setProviders(data.providers || []);
    } catch (err) {
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
