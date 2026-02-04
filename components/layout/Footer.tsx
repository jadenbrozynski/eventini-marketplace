'use client';

import Link from 'next/link';

interface FooterProps {
  variant?: 'full' | 'minimal';
}

export function Footer({ variant = 'full' }: FooterProps) {
  if (variant === 'minimal') {
    return (
      <footer className="border-t border-gray-200 bg-white mt-auto">
        <div className="px-4 sm:px-6 lg:px-10 xl:px-20 py-4">
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-500">© 2026 Eventini</p>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <Link href="/legal/privacy" className="hover:text-gray-900">Privacy</Link>
              <Link href="/legal/terms" className="hover:text-gray-900">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="border-t border-gray-200 bg-white mt-auto">
      <div className="px-4 sm:px-6 lg:px-10 xl:px-20 py-6 sm:py-8">
        {/* Mobile: Simple single row, Desktop: Multi-column */}
        <div className="hidden sm:grid sm:grid-cols-3 md:grid-cols-4 gap-8 mb-6">
          {/* Support */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3 text-sm">Support</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/support/help-center" className="hover:text-gray-900">Help Center</Link></li>
              <li><Link href="/support/safety" className="hover:text-gray-900">Safety</Link></li>
              <li><Link href="/support/cancellation" className="hover:text-gray-900">Cancellation</Link></li>
            </ul>
          </div>

          {/* Providers */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3 text-sm">Providers</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/providers/signup" className="hover:text-gray-900">Become a Provider</Link></li>
              <li><Link href="/providers/resources" className="hover:text-gray-900">Resources</Link></li>
              <li><Link href="/providers/forum" className="hover:text-gray-900">Community</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3 text-sm">Company</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/company/about" className="hover:text-gray-900">About</Link></li>
              <li><Link href="/company/careers" className="hover:text-gray-900">Careers</Link></li>
              <li><Link href="/company/press" className="hover:text-gray-900">Press</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="hidden md:block">
            <h4 className="font-medium text-gray-900 mb-3 text-sm">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/legal/privacy" className="hover:text-gray-900">Privacy Policy</Link></li>
              <li><Link href="/legal/terms" className="hover:text-gray-900">Terms of Service</Link></li>
              <li><Link href="/sitemap" className="hover:text-gray-900">Sitemap</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:border-t sm:border-gray-200 sm:pt-6">
          <p className="text-xs text-gray-500">© 2026 Eventini LLC</p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <Link href="/legal/privacy" className="hover:text-gray-900">Privacy</Link>
            <span className="text-gray-300">·</span>
            <Link href="/legal/terms" className="hover:text-gray-900">Terms</Link>
            <span className="text-gray-300 hidden sm:inline">·</span>
            <Link href="/sitemap" className="hover:text-gray-900 hidden sm:inline">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
