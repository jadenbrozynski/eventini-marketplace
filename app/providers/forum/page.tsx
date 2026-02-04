import { Metadata } from 'next';
import Link from 'next/link';
import { StaticPageLayout } from '@/components/layout/StaticPageLayout';
import { Users, MessageCircle, Bell, Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Community Forum | Eventini',
  description: 'Connect with other Eventini providers, share experiences, and learn from the community.',
};

export default function CommunityForumPage() {
  return (
    <StaticPageLayout
      title="Community Forum"
      subtitle="Connect with fellow providers and share experiences"
      breadcrumbs={[
        { label: 'Providers', href: '/providers/signup' },
        { label: 'Community Forum' },
      ]}
      maxWidth="medium"
    >
      {/* Coming Soon Banner */}
      <div className="bg-gradient-to-br from-[#44646c] to-[#2d4249] rounded-2xl p-8 md:p-12 text-white text-center mb-12">
        <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
          <Users className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Coming Soon</h2>
        <p className="text-white/80 text-lg max-w-xl mx-auto mb-8">
          We&apos;re building a community space where Eventini providers can connect, share tips,
          ask questions, and learn from each other.
        </p>
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 rounded-full text-white/90">
          <Bell className="w-5 h-5" />
          <span>We&apos;ll notify you when it launches</span>
        </div>
      </div>

      {/* What to Expect */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">What to Expect</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="w-12 h-12 rounded-xl bg-[#44646c]/10 flex items-center justify-center mb-4">
              <MessageCircle className="w-6 h-6 text-[#44646c]" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Discussion Forums</h3>
            <p className="text-gray-600">
              Ask questions, share experiences, and get advice from experienced providers in your category.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <div className="w-12 h-12 rounded-xl bg-[#44646c]/10 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-[#44646c]" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Networking</h3>
            <p className="text-gray-600">
              Connect with other providers for collaborations, referrals, and professional relationships.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <div className="w-12 h-12 rounded-xl bg-[#44646c]/10 flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6 text-[#44646c]" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Events & Webinars</h3>
            <p className="text-gray-600">
              Join virtual events, training sessions, and Q&A calls with the Eventini team.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <div className="w-12 h-12 rounded-xl bg-[#44646c]/10 flex items-center justify-center mb-4">
              <Bell className="w-6 h-6 text-[#44646c]" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Product Updates</h3>
            <p className="text-gray-600">
              Be the first to know about new features and provide feedback to shape the platform.
            </p>
          </div>
        </div>
      </div>

      {/* In the Meantime */}
      <div className="bg-[#44646c]/5 rounded-2xl p-8 mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">In the Meantime</h2>
        <p className="text-gray-600 mb-6">
          While we build the community forum, here are some ways to connect and get support:
        </p>
        <div className="space-y-4">
          <Link
            href="/support/help-center"
            className="flex items-center justify-between bg-white rounded-xl p-4 hover:shadow-md transition-shadow"
          >
            <div>
              <h3 className="font-semibold text-gray-900">Help Center</h3>
              <p className="text-sm text-gray-600">Browse guides and FAQs for providers</p>
            </div>
            <span className="text-[#44646c]">&rarr;</span>
          </Link>

          <Link
            href="/providers/resources"
            className="flex items-center justify-between bg-white rounded-xl p-4 hover:shadow-md transition-shadow"
          >
            <div>
              <h3 className="font-semibold text-gray-900">Provider Resources</h3>
              <p className="text-sm text-gray-600">Guides, best practices, and downloadable tools</p>
            </div>
            <span className="text-[#44646c]">&rarr;</span>
          </Link>

          <a
            href="mailto:support@eventini.io"
            className="flex items-center justify-between bg-white rounded-xl p-4 hover:shadow-md transition-shadow"
          >
            <div>
              <h3 className="font-semibold text-gray-900">Contact Support</h3>
              <p className="text-sm text-gray-600">Reach out to our provider success team directly</p>
            </div>
            <span className="text-[#44646c]">&rarr;</span>
          </a>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Have Ideas for the Community?</h2>
        <p className="text-gray-600 mb-6">
          We&apos;d love to hear what features you&apos;d find most valuable in a provider community.
        </p>
        <a
          href="mailto:support@eventini.io?subject=Community Forum Feedback"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#44646c] text-white rounded-full font-semibold hover:bg-[#3a565d] transition-colors"
        >
          Share Your Ideas
        </a>
      </div>
    </StaticPageLayout>
  );
}
