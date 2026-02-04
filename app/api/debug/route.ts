import { NextResponse } from 'next/server';
import { getAdminDb, hasAdminCredentials, getInitError } from '@/lib/firebase-admin';

export const dynamic = 'force-dynamic';

export async function GET() {
  const adminDb = getAdminDb();
  const initError = getInitError();

  const debug: Record<string, unknown> = {
    env: {
      hasProjectId: !!process.env.FIREBASE_PROJECT_ID,
      projectId: process.env.FIREBASE_PROJECT_ID?.substring(0, 10) + '...',
      hasClientEmail: !!process.env.FIREBASE_CLIENT_EMAIL,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL?.substring(0, 20) + '...',
      hasPrivateKey: !!process.env.FIREBASE_PRIVATE_KEY,
      privateKeyLength: process.env.FIREBASE_PRIVATE_KEY?.length || 0,
      privateKeyStart: process.env.FIREBASE_PRIVATE_KEY?.substring(0, 30),
      privateKeyEnd: process.env.FIREBASE_PRIVATE_KEY?.substring((process.env.FIREBASE_PRIVATE_KEY?.length || 0) - 30),
    },
    firebase: {
      hasAdminCredentials,
      adminDbExists: !!adminDb,
      initError: initError?.message || null,
    } as Record<string, unknown>,
  };

  // Try a simple Firestore query if connected
  if (adminDb) {
    try {
      const collections = await adminDb.listCollections();
      (debug.firebase as Record<string, unknown>).collections = collections.map(c => c.id);

      // Try to get ActiveProviders count
      const activeSnapshot = await adminDb.collection('ActiveProviders').limit(5).get();
      (debug.firebase as Record<string, unknown>).activeProvidersCount = activeSnapshot.size;
      (debug.firebase as Record<string, unknown>).activeProviderIds = activeSnapshot.docs.map(d => d.id);
    } catch (e) {
      (debug.firebase as Record<string, unknown>).queryError = e instanceof Error ? e.message : String(e);
    }
  }

  return NextResponse.json(debug);
}
