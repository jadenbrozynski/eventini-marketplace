'use client';

import { useParams } from 'next/navigation';
import { AppRedirect } from '@/components/common/AppRedirect';

export default function CollaboratePage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <AppRedirect 
      deepLink={`collaborate/${id}`}
      title="Collaboration Invite"
      description="Opening collaboration in the app..."
    />
  );
}
