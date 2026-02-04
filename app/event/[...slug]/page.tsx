'use client';

import { useParams } from 'next/navigation';
import { AppRedirect } from '@/components/common/AppRedirect';

export default function EventPage() {
  const params = useParams();
  const slug = params.slug as string[];
  const path = slug.join('/');

  return (
    <AppRedirect 
      deepLink={`event/${path}`}
      title="Event Details"
      description="Opening event in the app..."
    />
  );
}
