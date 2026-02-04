import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.trim(),
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN?.trim(),
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID?.trim(),
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET?.trim(),
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID?.trim(),
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID?.trim(),
};

console.log('=== FIREBASE CONFIG DEBUG ===');
console.log('apiKey exists:', !!firebaseConfig.apiKey);
console.log('authDomain:', firebaseConfig.authDomain);
console.log('projectId:', firebaseConfig.projectId);
console.log('storageBucket:', firebaseConfig.storageBucket);
console.log('messagingSenderId:', firebaseConfig.messagingSenderId);
console.log('appId exists:', !!firebaseConfig.appId);
console.log('appId value:', firebaseConfig.appId);

// Check if Firebase is properly configured
const isFirebaseConfigured = !!(
  firebaseConfig.apiKey &&
  firebaseConfig.authDomain &&
  firebaseConfig.projectId
);

// Initialize Firebase only if configured
let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let auth: Auth | null = null;
let googleProvider: GoogleAuthProvider | null = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    db = getFirestore(app);
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
    console.log('=== FIREBASE INITIALIZED SUCCESSFULLY ===');
  } catch (error) {
    console.error('=== FIREBASE INIT ERROR ===', error);
  }
} else {
  console.error('=== FIREBASE NOT CONFIGURED ===');
  console.error('Missing:', {
    apiKey: !firebaseConfig.apiKey,
    authDomain: !firebaseConfig.authDomain,
    projectId: !firebaseConfig.projectId,
  });
}

export { app, db, auth, googleProvider, isFirebaseConfigured };
