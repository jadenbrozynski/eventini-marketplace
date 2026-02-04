import type { Metadata, Viewport } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Provider Onboarding | Eventini',
  description: 'Complete your provider profile to start accepting bookings on Eventini Marketplace',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen min-h-[100dvh] bg-white">
      {/* Header - Responsive */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200 safe-top">
        <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/eventini-logo.png"
              alt="Eventini"
              width={40}
              height={40}
              className="object-contain sm:w-12 sm:h-12"
            />
          </Link>
          <span className="text-xs sm:text-sm text-gray-500 font-medium">Provider Setup</span>
        </div>
      </header>

      {/* Main Content - Responsive container */}
      <main className="w-full max-w-2xl mx-auto">
        {children}
      </main>
    </div>
  );
}
