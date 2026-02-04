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
        <div className="px-4 sm:px-6 lg:px-10 xl:px-20 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © 2026 Eventini LLC All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-600">
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
      <div className="px-4 sm:px-6 lg:px-10 xl:px-20 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src="/eventini-logo.png"
                alt="Eventini"
                width={56}
                height={56}
                className="object-contain"
              />
              <span className="text-2xl font-bold" style={{ color: '#44646c' }}>
                Eventini
              </span>
            </Link>
            <p className="text-sm text-gray-500">
              Find the perfect vendors for your next event. From catering to entertainment, we&apos;ve got you covered.
            </p>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <Link href="/support/help-center" className="hover:text-gray-900 hover:underline">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/support/safety" className="hover:text-gray-900 hover:underline">
                  Safety Information
                </Link>
              </li>
              <li>
                <Link href="/support/cancellation" className="hover:text-gray-900 hover:underline">
                  Cancellation Options
                </Link>
              </li>
            </ul>
          </div>

          {/* Providers */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Providers</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <Link href="/providers/signup" className="hover:text-gray-900 hover:underline">
                  Become a Provider
                </Link>
              </li>
              <li>
                <Link href="/providers/resources" className="hover:text-gray-900 hover:underline">
                  Provider Resources
                </Link>
              </li>
              <li>
                <Link href="/providers/forum" className="hover:text-gray-900 hover:underline">
                  Community Forum
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Eventini</h4>
            <ul className="space-y-3 text-sm text-gray-600">
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
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © 2026 Eventini LLC All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <Link href="/legal/privacy" className="hover:text-gray-900 hover:underline">Privacy</Link>
            <Link href="/legal/terms" className="hover:text-gray-900 hover:underline">Terms</Link>
            <Link href="/sitemap" className="hover:text-gray-900 hover:underline">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
