'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Search, ArrowLeft } from 'lucide-react';
import { Footer } from './Footer';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface StaticPageLayoutProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
  children: React.ReactNode;
  maxWidth?: 'narrow' | 'medium' | 'wide';
}

export function StaticPageLayout({
  title,
  subtitle,
  breadcrumbs,
  children,
  maxWidth = 'medium',
}: StaticPageLayoutProps) {
  const maxWidthClasses = {
    narrow: 'max-w-2xl',
    medium: 'max-w-4xl',
    wide: 'max-w-6xl',
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header - Same as marketplace */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-10 xl:px-20">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <Image
                src="/eventini-logo.png"
                alt="Eventini"
                width={56}
                height={56}
                className="object-contain"
              />
            </Link>

            {/* Search Bar - Centered, same as marketplace */}
            <div className="flex-1 flex justify-center px-4 md:px-8">
              <Link href="/" className="flex items-center border border-gray-300 rounded-full px-2 py-1.5 shadow-sm hover:shadow-md transition-all max-w-xl w-full bg-white">
                <div className="flex items-center divide-x divide-gray-200 flex-1">
                  <div className="px-4 py-1">
                    <span className="text-sm font-medium text-gray-900">Anywhere</span>
                  </div>
                  <div className="px-4 py-1 hidden sm:block">
                    <span className="text-sm font-medium text-gray-900">Any date</span>
                  </div>
                  <div className="px-4 py-1 flex-1 hidden md:block">
                    <span className="text-sm text-gray-400">Plan your event</span>
                  </div>
                </div>
                <div className="w-8 h-8 bg-[#44646c] rounded-full flex items-center justify-center shrink-0">
                  <Search className="w-4 h-4 text-white" />
                </div>
              </Link>
            </div>

            {/* Right side - Back to Marketplace */}
            <div className="flex items-center gap-4 shrink-0">
              <Link
                href="/"
                className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Marketplace</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 sm:px-6 lg:px-10 xl:px-20 py-8 md:py-12">
        <div className={`mx-auto ${maxWidthClasses[maxWidth]}`}>
          {/* Breadcrumbs */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
              <Link href="/" className="hover:text-gray-900 transition-colors">
                Home
              </Link>
              {breadcrumbs.map((crumb, index) => (
                <span key={index} className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4" />
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-gray-900 transition-colors">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-gray-900">{crumb.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {title}
            </h1>
            {subtitle && (
              <p className="text-lg text-gray-600">
                {subtitle}
              </p>
            )}
          </div>

          {/* Page Content */}
          {children}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
