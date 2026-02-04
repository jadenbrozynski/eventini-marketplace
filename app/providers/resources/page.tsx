import { Metadata } from 'next';
import Link from 'next/link';
import { StaticPageLayout } from '@/components/layout/StaticPageLayout';
import { BookOpen, Video, FileText, Download, CheckCircle, Calendar, DollarSign, MessageSquare, Camera, Star, Settings, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Provider Resources | Eventini',
  description: 'Guides, best practices, and tools to help you succeed as an Eventini provider.',
};

const guides = [
  {
    icon: Camera,
    title: 'Creating a Standout Profile',
    description: 'Learn how to write compelling descriptions, take great photos, and showcase your best work.',
    category: 'Getting Started',
    href: '/providers/guides/standout-profile',
  },
  {
    icon: DollarSign,
    title: 'Pricing Strategies That Work',
    description: 'Set competitive prices, use minimum guarantees effectively, and maximize your earnings.',
    category: 'Business',
    href: '/providers/guides/pricing-strategies',
  },
  {
    icon: Calendar,
    title: 'Managing Your Calendar',
    description: 'Block dates, sync with external calendars, and keep your availability up to date.',
    category: 'Operations',
    href: '/providers/guides/managing-calendar',
  },
  {
    icon: MessageSquare,
    title: 'Communication Best Practices',
    description: 'Respond quickly, set expectations clearly, and build great relationships with hosts.',
    category: 'Customer Service',
    href: '/providers/guides/communication',
  },
  {
    icon: Star,
    title: 'Getting 5-Star Reviews',
    description: 'Deliver exceptional service and turn happy customers into glowing testimonials.',
    category: 'Growth',
    href: '/providers/guides/five-star-reviews',
  },
  {
    icon: Settings,
    title: 'Operational Excellence',
    description: 'Streamline your workflow from booking confirmation to post-event follow-up.',
    category: 'Operations',
    href: '/providers/guides/operational-excellence',
  },
];

const quickTips = [
  'Respond to inquiries within 2 hours for better visibility',
  'Keep your calendar updated to avoid double-bookings',
  'Add at least 5 high-quality photos to your profile',
  'Set clear expectations in your listing description',
  'Follow up with hosts after events for reviews',
  'Use the referral program to earn extra income',
];

const manuals = [
  {
    title: 'Food & Beverage Manual 2026',
    description: 'Complete operations guide for caterers, food trucks, and bar services',
    href: '/manuals/food-beverage-manual-2026.pdf',
    icon: FileText,
  },
  {
    title: 'Entertainment Manual 2026',
    description: 'Best practices for DJs, musicians, performers, and entertainment providers',
    href: '/manuals/entertainment-manual-2026.pdf',
    icon: FileText,
  },
  {
    title: 'Venue Manual 2026',
    description: 'Operations guide for venue owners and space rental providers',
    href: '/manuals/venue-manual-2026.pdf',
    icon: FileText,
  },
  {
    title: 'Vendor Service Manual 2026',
    description: 'Guide for decorators, photographers, planners, and other event vendors',
    href: '/manuals/vendor-service-manual-2026.pdf',
    icon: FileText,
  },
];

export default function ProviderResourcesPage() {
  return (
    <StaticPageLayout
      title="Provider Resources"
      subtitle="Everything you need to build a successful business on Eventini"
      breadcrumbs={[
        { label: 'Providers', href: '/providers/signup' },
        { label: 'Resources' },
      ]}
      maxWidth="wide"
    >
      {/* Quick Start Section */}
      <div className="bg-[#44646c] rounded-2xl p-8 md:p-12 text-white mb-12">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-8 h-8" />
          <h2 className="text-2xl font-bold">Quick Start Guide</h2>
        </div>
        <p className="text-white/80 mb-8 max-w-2xl">
          New to Eventini? Follow these steps to get your listing live and start receiving bookings.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/10 rounded-xl p-4">
            <div className="w-8 h-8 rounded-full bg-white text-[#44646c] flex items-center justify-center font-bold mb-3">
              1
            </div>
            <h3 className="font-semibold mb-1">Complete Your Profile</h3>
            <p className="text-sm text-white/70">Add photos, description, and services</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <div className="w-8 h-8 rounded-full bg-white text-[#44646c] flex items-center justify-center font-bold mb-3">
              2
            </div>
            <h3 className="font-semibold mb-1">Set Your Pricing</h3>
            <p className="text-sm text-white/70">Define rates, minimums, and packages</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <div className="w-8 h-8 rounded-full bg-white text-[#44646c] flex items-center justify-center font-bold mb-3">
              3
            </div>
            <h3 className="font-semibold mb-1">Update Availability</h3>
            <p className="text-sm text-white/70">Mark your calendar with available dates</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <div className="w-8 h-8 rounded-full bg-white text-[#44646c] flex items-center justify-center font-bold mb-3">
              4
            </div>
            <h3 className="font-semibold mb-1">Go Live</h3>
            <p className="text-sm text-white/70">Publish and start getting inquiries</p>
          </div>
        </div>
      </div>

      {/* Guides Grid */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Provider Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide) => {
            const Icon = guide.icon;
            return (
              <Link key={guide.title} href={guide.href} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-[#44646c] transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#44646c]/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#44646c]" />
                  </div>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                    {guide.category}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{guide.title}</h3>
                <p className="text-gray-600">{guide.description}</p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-blue-50 rounded-2xl p-8 mb-12">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900">Quick Tips for Success</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickTips.map((tip, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <span className="text-gray-700">{tip}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Downloadable Manuals */}
      <div className="mb-12" id="manuals">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Provider Manuals</h2>
        <p className="text-gray-600 mb-6">Download the complete operations manual for your provider category.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {manuals.map((manual) => {
            const Icon = manual.icon;
            return (
              <a
                key={manual.title}
                href={manual.href}
                download
                className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4 hover:shadow-md hover:border-[#44646c] transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-[#44646c]/10 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-[#44646c]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{manual.title}</h3>
                  <p className="text-sm text-gray-600">{manual.description}</p>
                </div>
                <div className="flex items-center gap-2 text-[#44646c]">
                  <span className="text-sm font-medium">PDF</span>
                  <Download className="w-4 h-4" />
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Video Tutorials Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Video Tutorials</h2>
          <span className="text-sm text-gray-500">Coming soon</span>
        </div>
        <div className="bg-gray-100 rounded-2xl p-12 text-center">
          <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Video tutorials coming soon</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            We&apos;re creating video guides to help you get the most out of Eventini.
            Check back soon for walkthroughs and tips.
          </p>
        </div>
      </div>

      {/* Best Practices */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Provider Best Practices</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-[#44646c] transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#44646c]/10 flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6 text-[#44646c]" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-3">Before the Event</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#44646c] mt-0.5 shrink-0" />
                Confirm all event details 48 hours before
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#44646c] mt-0.5 shrink-0" />
                Verify venue access, parking, and load-in
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#44646c] mt-0.5 shrink-0" />
                Review special requests or dietary needs
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#44646c] mt-0.5 shrink-0" />
                Ensure equipment and supplies are ready
              </li>
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-[#44646c] transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#44646c]/10 flex items-center justify-center mb-4">
              <Settings className="w-6 h-6 text-[#44646c]" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-3">During the Event</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#44646c] mt-0.5 shrink-0" />
                Arrive on time for setup
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#44646c] mt-0.5 shrink-0" />
                Communicate with the host throughout
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#44646c] mt-0.5 shrink-0" />
                Document your setup with photos
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#44646c] mt-0.5 shrink-0" />
                Handle any issues professionally
              </li>
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-[#44646c] transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#44646c]/10 flex items-center justify-center mb-4">
              <Star className="w-6 h-6 text-[#44646c]" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-3">After the Event</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#44646c] mt-0.5 shrink-0" />
                Clean up your area thoroughly
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#44646c] mt-0.5 shrink-0" />
                Thank the host and ask for feedback
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#44646c] mt-0.5 shrink-0" />
                Submit final charges through the app
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-[#44646c] mt-0.5 shrink-0" />
                Send a follow-up requesting a review
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Support CTA */}
      <div className="bg-[#44646c] rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-2">Need More Help?</h2>
        <p className="text-white/80 mb-6 max-w-lg mx-auto">
          Our provider success team is here to help you grow your business on Eventini.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/support/help-center"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#44646c] rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Help Center
          </Link>
          <a
            href="mailto:support@eventini.io"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-full font-semibold hover:bg-white/20 transition-colors"
          >
            Contact Support
          </a>
        </div>
      </div>
    </StaticPageLayout>
  );
}
