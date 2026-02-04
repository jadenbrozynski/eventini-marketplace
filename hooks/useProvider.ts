'use client';

import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface UseProviderReturn {
  provider: Record<string, unknown> | null;
  isLoading: boolean;
  error: Error | null;
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
        console.error('Firebase db is null');
        setError(new Error('Firebase not configured'));
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        console.log('Fetching provider:', providerId);

        // Try ActiveProviders collection first
        const activeDocRef = doc(db, 'ActiveProviders', providerId);
        const activeSnapshot = await getDoc(activeDocRef);

        if (activeSnapshot.exists()) {
          console.log('Found provider in ActiveProviders');
          setProvider({ id: activeSnapshot.id, ...activeSnapshot.data() });
          setIsLoading(false);
          return;
        }

        // Try category-specific collections
        const categories = ['FoodBeverage', 'Entertainment', 'Venues', 'Vendors'];
        for (const category of categories) {
          const catDocRef = doc(db, `Providers/${category}/providers`, providerId);
          const catSnapshot = await getDoc(catDocRef);
          if (catSnapshot.exists()) {
            console.log(`Found provider in Providers/${category}/providers`);
            setProvider({ id: catSnapshot.id, category, ...catSnapshot.data() });
            setIsLoading(false);
            return;
          }
        }

        console.log('Provider not found');
        setProvider(null);
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
