'use client';

import Image from 'next/image';
import Link from 'next/link';

interface FooterProps {
  variant?: 'full' | 'minimal';
}

export function Footer({ variant = 'full' }: FooterProps) {
  if (variant === 'minimal') {
    return (
      <footer className="border-t border-gray-200 bg-gray-50 mt-auto">
        <div className="px-4 sm:px-6 lg:px-10 xl:px-20 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-xs sm:text-sm text-gray-500">
              © 2026 Eventini LLC
            </p>
            <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-600">
              <Link href="/legal/privacy" className="hover:text-gray-900 hover:underline">Privacy</Link>
              <Link href="/legal/terms" className="hover:text-gray-900 hover:underline">Terms</Link>
              <Link href="/support/help-center" className="hover:text-gray-900 hover:underline">Help</Link>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-auto">
      <div className="px-4 sm:px-6 lg:px-10 xl:px-20 py-8 sm:py-12">
        {/* Mobile: Compact 2-column layout, Desktop: 4-column */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Brand - Full width on mobile */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <Image
                src="/eventini-logo.png"
                alt="Eventini"
                width={40}
                height={40}
                className="object-contain sm:w-14 sm:h-14"
              />
              <span className="text-xl sm:text-2xl font-bold" style={{ color: '#44646c' }}>
                Eventini
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">
              Find the perfect vendors for your next event. From catering to entertainment, we&apos;ve got you covered.
            </p>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-2 sm:mb-4 text-sm sm:text-base">Support</h4>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-600">
              <li>
                <Link href="/support/help-center" className="hover:text-gray-900 hover:underline">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/support/safety" className="hover:text-gray-900 hover:underline">
                  Safety Info
                </Link>
              </li>
              <li>
                <Link href="/support/cancellation" className="hover:text-gray-900 hover:underline">
                  Cancellation
                </Link>
              </li>
            </ul>
          </div>

          {/* Providers */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-2 sm:mb-4 text-sm sm:text-base">Providers</h4>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-600">
              <li>
                <Link href="/providers/signup" className="hover:text-gray-900 hover:underline">
                  Become a Provider
                </Link>
              </li>
              <li>
                <Link href="/providers/resources" className="hover:text-gray-900 hover:underline">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/providers/forum" className="hover:text-gray-900 hover:underline">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Company - Hidden on small mobile, shown on larger */}
          <div className="hidden sm:block">
            <h4 className="font-semibold text-gray-900 mb-2 sm:mb-4 text-sm sm:text-base">Eventini</h4>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-600">
              <li>
                <Link href="/company/about" className="hover:text-gray-900 hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/company/careers" className="hover:text-gray-900 hover:underline">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/company/press" className="hover:text-gray-900 hover:underline">
                  Press
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-4 sm:pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-xs sm:text-sm text-gray-500">
            © 2026 Eventini LLC
          </p>
          <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-600">
            <Link href="/legal/privacy" className="hover:text-gray-900 hover:underline">Privacy</Link>
            <Link href="/legal/terms" className="hover:text-gray-900 hover:underline">Terms</Link>
            <Link href="/sitemap" className="hover:text-gray-900 hover:underline hidden sm:inline">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
