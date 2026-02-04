import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

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

  // If the key is JSON-encoded (starts with "), parse it
  if (key.startsWith('"') && key.endsWith('"')) {
    try {
      key = JSON.parse(key);
    } catch {
      // Not valid JSON, continue with original
    }
  }

  // Replace escaped newlines with actual newlines
  return key ? key.replace(/\\n/g, '\n') : '';
}

// Lazy initialization - only initialize when getAdminDb is called
function initializeFirebaseAdmin(): void {
  if (_initialized) return;
  _initialized = true;

  if (!hasAdminCredentials) return;

  try {
    const privateKey = formatPrivateKey(process.env.FIREBASE_PRIVATE_KEY);

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
