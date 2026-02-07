'use client';

import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { EventRole } from '@/types/events';

interface UseEventEmailSubmitReturn {
  submitEmail: (email: string, eventId: string, eventName: string, role: EventRole) => Promise<void>;
  isSubmitting: boolean;
  error: Error | null;
}

export function useEventEmailSubmit(): UseEventEmailSubmitReturn {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  async function submitEmail(email: string, eventId: string, eventName: string, role: EventRole) {
    if (!db) {
      throw new Error('Firebase not configured');
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const emailsRef = collection(db, 'EventiniEventsEmails');
      await addDoc(emailsRef, {
        email,
        eventId,
        eventName,
        role,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      const e = err instanceof Error ? err : new Error('Failed to submit email');
      setError(e);
      throw e;
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    submitEmail,
    isSubmitting,
    error,
  };
}
