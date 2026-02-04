import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

// Check if all required environment variables are present
const hasAdminCredentials = !!(
  process.env.FIREBASE_PROJECT_ID &&
  process.env.FIREBASE_CLIENT_EMAIL &&
  process.env.FIREBASE_PRIVATE_KEY
);

let app: App | null = null;
let adminDb: Firestore | null = null;

if (hasAdminCredentials) {
  // Initialize Firebase Admin SDK with environment variables
  const firebaseAdminConfig = {
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // Private key comes with escaped newlines from env, need to replace them
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  };

  // Initialize Firebase Admin SDK
  app = getApps().length === 0 ? initializeApp(firebaseAdminConfig) : getApps()[0];

  // Initialize Firestore
  adminDb = getFirestore(app);
}

export { app, adminDb, hasAdminCredentials };
export default app;
