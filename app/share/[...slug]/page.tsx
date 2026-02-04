'use client';

import { useParams } from 'next/navigation';
import { AppRedirect } from '@/components/common/AppRedirect';

export default function SharePage() {
  const params = useParams();
  const slug = params.slug as string[];
  const path = slug.join('/');

  return (
    <AppRedirect 
      deepLink={`share/${path}`}
      title="Shared Content"
      description="Opening in the app..."
    />
  );
}
