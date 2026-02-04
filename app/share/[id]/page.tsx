'use client';

import { useParams } from 'next/navigation';
import { AppRedirect } from '@/components/common/AppRedirect';

export default function SharePage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <AppRedirect 
      deepLink={`share/${id}`}
      title="Shared Content"
      description="Opening in the app..."
    />
  );
}
