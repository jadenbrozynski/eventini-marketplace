import { Metadata } from 'next';
import Link from 'next/link';
import { StaticPageLayout } from '@/components/layout/StaticPageLayout';
import { Home, FileText, HelpCircle, Briefcase, Building2, Map } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sitemap | Eventini',
  description: 'Navigate all pages on the Eventini marketplace platform.',
};

const siteStructure = [
  {
    title: 'Main',
    icon: Home,
    links: [
      { name: 'Home', href: '/' },
      { name: 'Browse Providers', href: '/' },
    ],
  },
  {
    title: 'Legal',
    icon: FileText,
    links: [
      { name: 'Privacy Policy', href: '/legal/privacy' },
      { name: 'Terms of Service', href: '/legal/terms' },
    ],
  },
  {
    title: 'Support',
    icon: HelpCircle,
    links: [
      { name: 'Help Center', href: '/support/help-center' },
      { name: 'Safety Information', href: '/support/safety' },
      { name: 'Cancellation Options', href: '/support/cancellation' },
    ],
  },
  {
    title: 'Providers',
    icon: Briefcase,
    links: [
      { name: 'Become a Provider', href: '/providers/signup' },
      { name: 'Provider Resources', href: '/providers/resources' },
      { name: 'Community Forum', href: '/providers/forum' },
      { name: 'Provider Dashboard', href: '/provider/dashboard' },
    ],
  },
  {
    title: 'Company',
    icon: Building2,
    links: [
      { name: 'About Us', href: '/company/about' },
      { name: 'Careers', href: '/company/careers' },
      { name: 'Press', href: '/company/press' },
    ],
  },
];

export default function SitemapPage() {
  return (
    <StaticPageLayout
      title="Sitemap"
      subtitle="Find your way around Eventini"
      breadcrumbs={[
        { label: 'Sitemap' },
      ]}
      maxWidth="wide"
    >
      {/* Visual Map */}
      <div className="bg-[#44646c]/5 rounded-2xl p-8 mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Map className="w-6 h-6 text-[#44646c]" />
          <h2 className="text-xl font-bold text-gray-900">All Pages</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteStructure.map((section) => {
            const Icon = section.icon;
            return (
              <div key={section.title}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[#44646c]/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-[#44646c]" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{section.title}</h3>
                </div>
                <ul className="space-y-2 pl-10">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-gray-600 hover:text-[#44646c] hover:underline transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* All Links List */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete Page List</h2>
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 font-semibold text-gray-900">Page</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-900">Section</th>
                <th className="text-left py-3 px-6 font-semibold text-gray-900">URL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {siteStructure.flatMap((section) =>
                section.links.map((link) => (
                  <tr key={`${section.title}-${link.href}`} className="hover:bg-gray-50">
                    <td className="py-3 px-6">
                      <Link href={link.href} className="text-[#44646c] hover:underline font-medium">
                        {link.name}
                      </Link>
                    </td>
                    <td className="py-3 px-6 text-gray-500">{section.title}</td>
                    <td className="py-3 px-6 font-mono text-sm text-gray-400">{link.href}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/"
          className="bg-[#44646c] rounded-xl p-6 text-white hover:bg-[#3a565d] transition-colors"
        >
          <Home className="w-8 h-8 mb-3" />
          <h3 className="font-semibold text-lg mb-1">Explore Marketplace</h3>
          <p className="text-white/70 text-sm">Browse providers for your next event</p>
        </Link>

        <Link
          href="/providers/signup"
          className="bg-gray-100 rounded-xl p-6 hover:bg-gray-200 transition-colors"
        >
          <Briefcase className="w-8 h-8 text-[#44646c] mb-3" />
          <h3 className="font-semibold text-lg text-gray-900 mb-1">Become a Provider</h3>
          <p className="text-gray-600 text-sm">Join our marketplace and grow your business</p>
        </Link>

        <Link
          href="/support/help-center"
          className="bg-gray-100 rounded-xl p-6 hover:bg-gray-200 transition-colors"
        >
          <HelpCircle className="w-8 h-8 text-[#44646c] mb-3" />
          <h3 className="font-semibold text-lg text-gray-900 mb-1">Get Help</h3>
          <p className="text-gray-600 text-sm">Find answers in our Help Center</p>
        </Link>
      </div>
    </StaticPageLayout>
  );
}
