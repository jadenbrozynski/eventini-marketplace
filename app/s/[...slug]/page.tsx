'use client';

import { useParams } from 'next/navigation';
import { AppRedirect } from '@/components/common/AppRedirect';

export default function ShortSharePage() {
  const params = useParams();
  const slug = params.slug as string[];
  const path = slug.join('/');

  return (
    <AppRedirect 
      deepLink={`s/${path}`}
      title="Shared Content"
      description="Opening in the app..."
    />
  );
}
