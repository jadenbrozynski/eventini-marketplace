'use client';

import { useParams } from 'next/navigation';
import { AppRedirect } from '@/components/common/AppRedirect';

export default function EventPage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <AppRedirect 
      deepLink={`event/${id}`}
      title="Event Details"
      description="Opening event in the app..."
    />
  );
}
