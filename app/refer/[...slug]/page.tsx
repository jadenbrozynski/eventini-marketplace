'use client';

import { useParams } from 'next/navigation';
import { AppRedirect } from '@/components/common/AppRedirect';

export default function ReferralPage() {
  const params = useParams();
  const slug = params.slug as string[];
  const path = slug.join('/');

  return (
    <AppRedirect 
      deepLink={`refer/${path}`}
      title="Referral Link"
      description="Opening your referral in the app..."
    />
  );
}
