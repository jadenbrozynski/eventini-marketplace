'use client';

import { useState, useEffect, useCallback } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { EventiniEvent } from '@/types/events';

interface UseEventsReturn {
  events: EventiniEvent[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useEvents(): UseEventsReturn {
  const [events, setEvents] = useState<EventiniEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchEvents = useCallback(async () => {
    if (!db) {
      setError(new Error('Firebase not configured'));
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const eventsRef = collection(db, 'EventiniEvents');
      const snapshot = await getDocs(eventsRef);
      const fetchedEvents: EventiniEvent[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        fetchedEvents.push({
          id: doc.id,
          applink: (data.applink as string) || '',
          eventDescription: (data.eventDescription as string) || '',
          eventlink: (data.eventlink as string) || '',
          eventname: (data.eventname as string) || '',
          hostimg: (data.hostimg as string) || '',
          providerimg: (data.providerimg as string) || '',
        });
      });

      setEvents(fetchedEvents);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return {
    events,
    isLoading,
    error,
    refetch: fetchEvents,
  };
}
