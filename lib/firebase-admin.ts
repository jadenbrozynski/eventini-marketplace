import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

// Check if we're in a build phase - only skip if explicitly building
const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build';

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

// Format the private key - handle various escaping scenarios from Vercel env vars
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

  // Handle the case where the key might be double-escaped
  // (e.g., \\\\n instead of \\n)
  while (formattedKey.includes('\\\\n')) {
    formattedKey = formattedKey.replace(/\\\\n/g, '\\n');
  }

  // Replace literal \n with actual newlines
  formattedKey = formattedKey.replace(/\\n/g, '\n');

  // Trim any leading/trailing whitespace
  formattedKey = formattedKey.trim();

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
    console.log('Firebase Admin credentials not configured:', {
      hasProjectId: !!process.env.FIREBASE_PROJECT_ID,
      hasClientEmail: !!process.env.FIREBASE_CLIENT_EMAIL,
      hasPrivateKey: !!process.env.FIREBASE_PRIVATE_KEY,
      privateKeyLength: process.env.FIREBASE_PRIVATE_KEY?.length || 0,
    });
    return;
  }

  try {
    const privateKey = formatPrivateKey(process.env.FIREBASE_PRIVATE_KEY);

    if (!privateKey) {
      console.error('Firebase private key is empty after formatting');
      _initError = new Error('Invalid private key format');
      return;
    }

    // Log key format for debugging (first and last few chars only)
    const keyStart = privateKey.substring(0, 30);
    const keyEnd = privateKey.substring(privateKey.length - 30);
    console.log('Private key format check:', {
      startsCorrectly: keyStart.includes('-----BEGIN'),
      endsCorrectly: keyEnd.includes('-----END'),
      totalLength: privateKey.length,
    });

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
    console.log('Firebase Admin initialized successfully');
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
