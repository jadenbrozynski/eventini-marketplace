import { Metadata } from 'next';
import Link from 'next/link';
import { StaticPageLayout } from '@/components/layout/StaticPageLayout';
import { MessageSquare, CheckCircle, Lightbulb, ArrowLeft, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Communication Best Practices | Eventini',
  description: 'Respond quickly, set expectations clearly, and build great relationships with hosts on Eventini.',
};

export default function CommunicationGuidePage() {
  return (
    <StaticPageLayout
      title="Communication Best Practices"
      subtitle="Build trust and win bookings through great communication"
      breadcrumbs={[
        { label: 'Providers', href: '/providers/resources' },
        { label: 'Guides', href: '/providers/resources' },
        { label: 'Communication' },
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
            <MessageSquare className="w-6 h-6 text-[#44646c]" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 mb-2">Communication Builds Confidence</h2>
            <p className="text-gray-600">
              Hosts choose providers they trust. Clear, prompt communication shows you're reliable
              and professional before they even book.
            </p>
          </div>
        </div>
      </div>

      {/* Response Time */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <p className="text-sm text-blue-800">
            <strong>Response time matters:</strong> Providers who respond within 2 hours are 3x more likely to get booked.
            Enable notifications so you never miss an inquiry!
          </p>
        </div>
      </div>

      {/* Section 1: First Response */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">1. Crafting Your First Response</h2>
        <p className="text-gray-600 mb-4">
          Your first message sets the tone. Make it count!
        </p>

        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
          <h3 className="font-semibold text-gray-900 mb-3">Include in Your Response</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600">Thank them for reaching out</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600">Confirm you're available (or offer alternative dates)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600">Answer their specific questions</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600">Ask clarifying questions if needed</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600">Suggest next steps</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Section 2: Setting Expectations */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">2. Setting Clear Expectations</h2>
        <p className="text-gray-600 mb-4">
          Misunderstandings lead to disappointment. Be upfront about everything.
        </p>

        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
          <h3 className="font-semibold text-gray-900 mb-3">What to Clarify Early</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Pricing</strong> – All fees, minimums, and what's included</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Timeline</strong> – Arrival, setup, service, and teardown times</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Requirements</strong> – Power, space, access needs</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Policies</strong> – Cancellation, weather, changes</span>
            </li>
          </ul>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">
              <strong>Pro tip:</strong> It's better to over-communicate than under-communicate.
              Hosts appreciate knowing exactly what to expect.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Pre-Event Communication */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">3. Pre-Event Check-Ins</h2>
        <p className="text-gray-600 mb-4">
          Keep hosts informed as the event approaches.
        </p>

        <div className="space-y-4">
          <div className="bg-gray-50 rounded-xl p-5">
            <h4 className="font-semibold text-gray-900 mb-2">1 Week Before</h4>
            <p className="text-gray-600 text-sm">Confirm all details and ask if anything has changed</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-5">
            <h4 className="font-semibold text-gray-900 mb-2">2-3 Days Before</h4>
            <p className="text-gray-600 text-sm">Reconfirm time, address, and contact info for day-of</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-5">
            <h4 className="font-semibold text-gray-900 mb-2">Day Of</h4>
            <p className="text-gray-600 text-sm">Send a quick message when you're on your way</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="bg-[#44646c] rounded-2xl p-8 text-center text-white">
        <h2 className="text-xl font-bold mb-2">Check Your Messages</h2>
        <p className="text-white/80 mb-6">
          Have pending inquiries? Respond now while it's fresh.
        </p>
        <Link
          href="/provider/dashboard/messages"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#44646c] rounded-full font-semibold hover:bg-gray-100 transition-colors"
        >
          Go to Messages
        </Link>
      </div>
    </StaticPageLayout>
  );
}
