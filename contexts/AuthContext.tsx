'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  User,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, googleProvider, db, isFirebaseConfigured } from '@/lib/firebase';

interface ProviderProfile {
  id: string;
  userId: string;
  email: string;
  displayName: string;
  photoURL?: string;
  isProvider: boolean;
  providerId?: string;
  createdAt: Date;
}

// Demo host user for testing
const DEMO_HOST_USER = {
  uid: 'demo-host-123',
  email: 'host@eventini.com',
  displayName: 'Demo Host',
  photoURL: null,
} as User;

interface AuthContextType {
  user: User | null;
  providerProfile: ProviderProfile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInAsDemo: () => void;
  signOut: () => Promise<void>;
  isProvider: boolean;
  isConfigured: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [providerProfile, setProviderProfile] = useState<ProviderProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If Firebase isn't configured, don't try to listen for auth changes
    if (!isFirebaseConfigured || !auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);

      if (user && db) {
        // Check if user has a provider profile
        try {
          const profileRef = doc(db, 'ProviderUsers', user.uid);
          const profileSnap = await getDoc(profileRef);

          if (profileSnap.exists()) {
            setProviderProfile(profileSnap.data() as ProviderProfile);
          } else {
            setProviderProfile(null);
          }
        } catch (error) {
          console.error('Error fetching provider profile:', error);
          setProviderProfile(null);
        }
      } else {
        setProviderProfile(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    if (!isFirebaseConfigured || !auth || !googleProvider) {
      throw new Error('Firebase is not configured. Please add your Firebase credentials to .env.local');
    }

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      if (db) {
        // Check if user already has a provider profile
        const profileRef = doc(db, 'ProviderUsers', user.uid);
        const profileSnap = await getDoc(profileRef);

        if (!profileSnap.exists()) {
          // Create new provider profile
          const newProfile: ProviderProfile = {
            id: user.uid,
            userId: user.uid,
            email: user.email || '',
            displayName: user.displayName || '',
            photoURL: user.photoURL || undefined,
            isProvider: true,
            createdAt: new Date(),
          };

          await setDoc(profileRef, {
            ...newProfile,
            createdAt: serverTimestamp(),
          });

          setProviderProfile(newProfile);
        } else {
          setProviderProfile(profileSnap.data() as ProviderProfile);
        }
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  };

  const signInAsDemo = () => {
    // Set demo host user (no Firebase required)
    setUser(DEMO_HOST_USER);
    setProviderProfile(null); // Demo user is a host, not a provider
  };

  const signOut = async () => {
    // Handle demo user sign out
    if (user?.uid === 'demo-host-123') {
      setUser(null);
      setProviderProfile(null);
      return;
    }

    if (!auth) return;

    try {
      await firebaseSignOut(auth);
      setUser(null);
      setProviderProfile(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      providerProfile,
      loading,
      signInWithGoogle,
      signInAsDemo,
      signOut,
      isProvider: !!providerProfile?.isProvider,
      isConfigured: isFirebaseConfigured,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
