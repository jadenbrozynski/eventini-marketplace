import { Metadata } from 'next';
import Image from 'next/image';
import { StaticPageLayout } from '@/components/layout/StaticPageLayout';
import { Mail, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Press | Eventini',
  description: 'Press resources, media kit, and contact information for Eventini.',
};

const pressFeatures = [
  {
    source: 'Visit Milwaukee',
    title: 'Eventini',
    summary: 'Featured on Visit Milwaukee as a local business connecting event planners with vendors.',
    url: 'https://www.visitmilwaukee.org/listing/eventini/15706/',
  },
  {
    source: 'MKE Startup News',
    title: 'Eventini App Connects Event Planners with Vendors',
    summary: 'Coverage of how Eventini is helping event planners find and book local vendors for their events.',
    url: 'https://mkestartup.news/eventini-app-connects-event-planners-with-vendors/',
  },
  {
    source: 'Facebook',
    title: 'Eventini Community Feature',
    summary: 'Community spotlight and engagement with local event providers.',
    url: 'https://www.facebook.com/photo.php?fbid=1393393335079564&id=100032267336769&set=a.710983973320507',
  },
];

export default function PressPage() {
  return (
    <StaticPageLayout
      title="Press"
      subtitle="Resources and information for media inquiries"
      breadcrumbs={[
        { label: 'Company', href: '/company/about' },
        { label: 'Press' },
      ]}
      maxWidth="wide"
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#44646c] to-[#2d4249] rounded-2xl p-8 md:p-12 text-white mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shrink-0">
            <Image
              src="/eventini-logo.png"
              alt="Eventini"
              width={48}
              height={48}
              className="object-contain"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Eventini LLC</h2>
            <p className="text-white/80">The marketplace for event services</p>
          </div>
        </div>
        <p className="text-lg text-white/80 max-w-2xl mb-6">
          Eventini connects event hosts with top-rated providers including caterers, food trucks, entertainers,
          and venues. Our platform makes it easy to discover, book, and pay for event services.
        </p>
        <a
          href="mailto:press@eventini.io"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#44646c] rounded-full font-semibold hover:bg-gray-100 transition-colors"
        >
          <Mail className="w-5 h-5" />
          Contact Press Team
        </a>
      </div>

      {/* Press & Media */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Press & Media</h2>
        <div className="space-y-4">
          {pressFeatures.map((feature) => (
            <a
              key={feature.title}
              href={feature.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-[#44646c] transition-all"
            >
              <p className="text-sm text-[#44646c] font-medium mb-2">{feature.source}</p>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.summary}</p>
              <span className="text-[#44646c] font-medium text-sm flex items-center gap-1">
                Read More <ExternalLink className="w-4 h-4" />
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Company Boilerplate */}
      <div className="bg-gray-50 rounded-2xl p-8 mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">About Eventini</h2>
        <p className="text-gray-600 mb-4">
          Eventini is a marketplace platform that connects event hosts with providers including caterers,
          food trucks, entertainers, venues, and vendors. Founded with the mission to make event planning
          easier and more accessible, Eventini enables small businesses to reach new customers while giving
          hosts a seamless way to discover, book, and pay for services.
        </p>
        <p className="text-gray-600">
          The platform features verified provider profiles, secure payments, transparent reviews, and tools
          for managing bookings and communications.
        </p>
      </div>

      {/* Brand Guidelines */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Brand Guidelines</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Primary Color</h3>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg" style={{ backgroundColor: '#44646c' }} />
              <div>
                <p className="font-mono text-sm text-gray-600">#44646c</p>
                <p className="text-sm text-gray-500">Eventini Teal</p>
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Logo Usage</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Use the full-color logo on light backgrounds</li>
              <li>• Maintain clear space around the butterfly icon</li>
              <li>• Do not stretch, rotate, or alter the logo</li>
              <li>• Contact us for partnership or co-branding uses</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-[#44646c] rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-2">Media Inquiries</h2>
        <p className="text-white/80 mb-6 max-w-lg mx-auto">
          For press inquiries, interviews, or additional information, please contact our communications team.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="mailto:press@eventini.io"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#44646c] rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            <Mail className="w-5 h-5" />
            press@eventini.io
          </a>
        </div>
      </div>
    </StaticPageLayout>
  );
}
