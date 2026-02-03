'use client';

import { useProviders } from './useProviders';

export function useFeaturedProviders(limit?: number) {
  return useProviders({
    featured: true,
    limit,
  });
}
