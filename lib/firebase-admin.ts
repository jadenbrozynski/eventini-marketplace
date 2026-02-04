import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

// Check if we're in a build/prerender phase - skip Firebase in these cases
const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build' ||
                     process.env.NODE_ENV === 'production' && typeof window === 'undefined' && !process.env.VERCEL_URL;

// Check if all required environment variables are present
const hasAdminCredentials = !!(
  process.env.FIREBASE_PROJECT_ID &&
  process.env.FIREBASE_CLIENT_EMAIL &&
  process.env.FIREBASE_PRIVATE_KEY
);

let _app: App | null = null;
let _adminDb: Firestore | null = null;
let _initialized = false;
let _initError: Error | null = null;

// Format the private key - handle various escaping scenarios
function formatPrivateKey(key: string | undefined): string {
  if (!key) return '';

  let formattedKey = key;

  // If the key is JSON-encoded (wrapped in quotes), parse it
  if (formattedKey.startsWith('"') && formattedKey.endsWith('"')) {
    try {
      formattedKey = JSON.parse(formattedKey);
    } catch {
      // Not valid JSON, continue with original
    }
  }

  // Replace literal \n with actual newlines (common in env vars)
  formattedKey = formattedKey.replace(/\\n/g, '\n');

  // Ensure proper PEM format
  if (!formattedKey.includes('-----BEGIN')) {
    return '';
  }

  return formattedKey;
}

// Lazy initialization - only initialize when getAdminDb is called at RUNTIME
function initializeFirebaseAdmin(): void {
  if (_initialized) return;
  _initialized = true;

  // Skip initialization during build phase
  if (isBuildPhase) {
    console.log('Skipping Firebase Admin initialization during build phase');
    return;
  }

  if (!hasAdminCredentials) {
    console.log('Firebase Admin credentials not configured');
    return;
  }

  try {
    const privateKey = formatPrivateKey(process.env.FIREBASE_PRIVATE_KEY);

    if (!privateKey) {
      console.error('Firebase private key is empty or invalid after formatting');
      _initError = new Error('Invalid private key format');
      return;
    }

    // Initialize Firebase Admin SDK with environment variables
    const firebaseAdminConfig = {
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey,
      }),
    };

    // Initialize Firebase Admin SDK
    _app = getApps().length === 0 ? initializeApp(firebaseAdminConfig) : getApps()[0];

    // Initialize Firestore
    _adminDb = getFirestore(_app);
  } catch (error) {
    console.error('Failed to initialize Firebase Admin:', error);
    _initError = error instanceof Error ? error : new Error(String(error));
  }
}

// Export getters that trigger lazy initialization
function getAdminDb(): Firestore | null {
  initializeFirebaseAdmin();
  return _adminDb;
}

function getApp(): App | null {
  initializeFirebaseAdmin();
  return _app;
}

function getInitError(): Error | null {
  initializeFirebaseAdmin();
  return _initError;
}

// For backwards compatibility, export as properties
export const app = null as App | null; // Use getApp() instead
export const adminDb = null as Firestore | null; // Use getAdminDb() instead

export { hasAdminCredentials, getAdminDb, getApp, getInitError };
export default null;
