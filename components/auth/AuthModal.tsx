'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { X, CheckCircle, Calendar, MessageCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const router = useRouter();
  const { signInAsDemo } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleSignIn = () => {
    setIsLoading(true);

    // Use demo login and redirect to provider onboarding for new providers
    setTimeout(() => {
      signInAsDemo();
      setIsLoading(false);
      onSuccess?.();
      onClose();
      // New providers go to onboarding, existing providers go to dashboard
      // For now, always send to onboarding as this is a new flow
      router.push('/provider/onboarding');
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-[420px] bg-white rounded-2xl shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* Content with generous padding */}
        <div className="p-10">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Image
              src="/eventini-logo.png"
              alt="Eventini"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              Welcome to Eventini
            </h3>
            <p className="text-gray-500">
              Sign in to manage your listings and bookings
            </p>
          </div>

          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-gray-300 border-t-[#44646c] rounded-full animate-spin" />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            )}
            <span className="text-gray-700 font-medium text-base">
              {isLoading ? 'Signing in...' : 'Continue with Google'}
            </span>
          </button>

          {/* Benefits */}
          <div className="mt-10 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#44646c]/10 flex items-center justify-center shrink-0">
                <CheckCircle className="w-5 h-5 text-[#44646c]" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Manage your listings</p>
                <p className="text-sm text-gray-500">Create and update your service offerings</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#44646c]/10 flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5 text-[#44646c]" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Track bookings</p>
                <p className="text-sm text-gray-500">View and manage your calendar</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#44646c]/10 flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5 text-[#44646c]" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Connect with clients</p>
                <p className="text-sm text-gray-500">Message event planners directly</p>
              </div>
            </div>
          </div>

          {/* Terms */}
          <p className="text-xs text-gray-400 text-center mt-10 pt-6 border-t border-gray-100">
            By continuing, you agree to Eventini&apos;s{' '}
            <Link href="/legal/terms" className="text-[#44646c] hover:underline">Terms of Service</Link>
            {' '}and{' '}
            <Link href="/legal/privacy" className="text-[#44646c] hover:underline">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
