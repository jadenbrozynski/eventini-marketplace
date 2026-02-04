'use client';

import { useParams } from 'next/navigation';
import { AppRedirect } from '@/components/common/AppRedirect';

export default function ReferralPage() {
  const params = useParams();
  const code = params.code as string;

  return (
    <AppRedirect 
      deepLink={`refer/${code}`}
      title="Referral Link"
      description="Opening your referral in the app..."
    />
  );
}
