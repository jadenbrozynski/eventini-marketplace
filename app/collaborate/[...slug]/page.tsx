'use client';

import { useParams } from 'next/navigation';
import { AppRedirect } from '@/components/common/AppRedirect';

export default function CollaboratePage() {
  const params = useParams();
  const slug = params.slug as string[];
  const path = slug.join('/');

  return (
    <AppRedirect 
      deepLink={`collaborate/${path}`}
      title="Collaboration Invite"
      description="Opening collaboration in the app..."
    />
  );
}
