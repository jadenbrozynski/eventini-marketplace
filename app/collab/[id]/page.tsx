'use client';

import { useParams } from 'next/navigation';
import { AppRedirect } from '@/components/common/AppRedirect';

export default function CollabPage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <AppRedirect 
      deepLink={`collab/${id}`}
      title="Collaboration Invite"
      description="Opening collaboration in the app..."
    />
  );
}
