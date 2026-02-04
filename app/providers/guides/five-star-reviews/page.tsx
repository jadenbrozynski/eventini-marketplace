import { Metadata } from 'next';
import Link from 'next/link';
import { StaticPageLayout } from '@/components/layout/StaticPageLayout';
import { Star, CheckCircle, Lightbulb, ArrowLeft, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Getting 5-Star Reviews | Eventini',
  description: 'Deliver exceptional service and turn happy customers into glowing testimonials on Eventini.',
};

export default function FiveStarReviewsGuidePage() {
  return (
    <StaticPageLayout
      title="Getting 5-Star Reviews"
      subtitle="Turn great experiences into lasting testimonials"
      breadcrumbs={[
        { label: 'Providers', href: '/providers/resources' },
        { label: 'Guides', href: '/providers/resources' },
        { label: '5-Star Reviews' },
      ]}
      maxWidth="medium"
    >
      <Link href="/providers/resources" className="inline-flex items-center gap-2 text-[#44646c] font-medium mb-8 hover:underline">
        <ArrowLeft className="w-4 h-4" />
        Back to Resources
      </Link>

      {/* Introduction */}
      <div className="bg-[#44646c]/5 rounded-2xl p-6 mb-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#44646c]/10 flex items-center justify-center shrink-0">
            <Star className="w-6 h-6 text-[#44646c]" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 mb-2">Reviews Build Your Business</h2>
            <p className="text-gray-600">
              Great reviews attract more bookings. Hosts trust other hosts' experiences,
              making reviews your most powerful marketing tool.
            </p>
          </div>
        </div>
      </div>

      {/* Section 1: Delivering Excellence */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">1. Deliver Excellence Every Time</h2>
        <p className="text-gray-600 mb-4">
          5-star reviews start with 5-star service. Consistently exceeding expectations is the foundation.
        </p>

        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
          <h3 className="font-semibold text-gray-900 mb-3">What Creates 5-Star Experiences</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Be early</strong> – Arrive with time to spare for setup</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Be prepared</strong> – Have everything you need and backups</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Be friendly</strong> – Engage positively with guests</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Be flexible</strong> – Handle unexpected changes gracefully</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Go above and beyond</strong> – Small extras make big impressions</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Section 2: Asking for Reviews */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">2. How to Ask for Reviews</h2>
        <p className="text-gray-600 mb-4">
          Happy customers often forget to leave reviews. A gentle reminder helps.
        </p>

        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
          <h3 className="font-semibold text-gray-900 mb-3">Best Practices for Asking</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600">Wait 1-2 days after the event (let them enjoy the memories)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600">Send a personal thank-you message first</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600">Explain that reviews help your small business</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600">Make it easy – Eventini sends review requests automatically</span>
            </li>
          </ul>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">
              <strong>Pro tip:</strong> A simple "I'd really appreciate it if you could share your experience"
              is more effective than elaborate requests.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Responding to Reviews */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">3. Responding to Reviews</h2>
        <p className="text-gray-600 mb-4">
          Responding to reviews shows you care and builds trust with future customers.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Heart className="w-5 h-5 text-green-600" />
              <h4 className="font-semibold text-gray-900">Positive Reviews</h4>
            </div>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Thank them sincerely</li>
              <li>• Reference something specific from their event</li>
              <li>• Invite them back for future events</li>
            </ul>
          </div>
          <div className="bg-orange-50 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-5 h-5 text-orange-600" />
              <h4 className="font-semibold text-gray-900">Constructive Reviews</h4>
            </div>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Stay professional and calm</li>
              <li>• Acknowledge their feedback</li>
              <li>• Explain what you'll do differently</li>
              <li>• Take detailed discussions offline</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="bg-[#44646c] rounded-2xl p-8 text-center text-white">
        <h2 className="text-xl font-bold mb-2">Check Your Reviews</h2>
        <p className="text-white/80 mb-6">
          See your latest reviews and respond to build stronger relationships.
        </p>
        <Link
          href="/provider/dashboard"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#44646c] rounded-full font-semibold hover:bg-gray-100 transition-colors"
        >
          Go to Dashboard
        </Link>
      </div>
    </StaticPageLayout>
  );
}
