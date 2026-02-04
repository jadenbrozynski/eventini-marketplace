import { Metadata } from 'next';
import Link from 'next/link';
import { StaticPageLayout } from '@/components/layout/StaticPageLayout';
import { Calendar, CheckCircle, Lightbulb, ArrowLeft, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Managing Your Calendar | Eventini',
  description: 'Block dates, sync with external calendars, and keep your availability up to date on Eventini.',
};

export default function ManagingCalendarGuidePage() {
  return (
    <StaticPageLayout
      title="Managing Your Calendar"
      subtitle="Keep your availability accurate and avoid double-bookings"
      breadcrumbs={[
        { label: 'Providers', href: '/providers/resources' },
        { label: 'Guides', href: '/providers/resources' },
        { label: 'Managing Calendar' },
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
            <Calendar className="w-6 h-6 text-[#44646c]" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 mb-2">Your Calendar = Your Reputation</h2>
            <p className="text-gray-600">
              An accurate calendar prevents double-bookings, shows hosts you're professional,
              and helps you capture every opportunity.
            </p>
          </div>
        </div>
      </div>

      {/* Warning */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <p className="text-sm text-red-800">
            <strong>Important:</strong> Double-bookings hurt your reputation and can result in cancellation penalties.
            Always keep your calendar updated!
          </p>
        </div>
      </div>

      {/* Section 1: Blocking Dates */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">1. Blocking Unavailable Dates</h2>
        <p className="text-gray-600 mb-4">
          Proactively block dates when you can't work to prevent inquiries for those times.
        </p>

        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
          <h3 className="font-semibold text-gray-900 mb-3">When to Block Dates</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600">Personal commitments and vacations</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600">Events booked through other channels</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600">Equipment maintenance or prep days</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600">Days you need rest between large events</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Section 2: Calendar Sync */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">2. Syncing External Calendars</h2>
        <p className="text-gray-600 mb-4">
          Connect your Google, Apple, or Outlook calendar to automatically sync your availability.
        </p>

        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
          <h3 className="font-semibold text-gray-900 mb-3">How Calendar Sync Works</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600">Events from your external calendar automatically block those dates</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600">Eventini bookings can be added to your external calendar</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600">Changes sync in both directions automatically</span>
            </li>
          </ul>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">
              <strong>Pro tip:</strong> Create a dedicated calendar for your business events to keep personal and work separate.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Best Practices */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">3. Calendar Best Practices</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-xl p-5">
            <h4 className="font-semibold text-gray-900 mb-2">Do</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                Update immediately when plans change
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                Block travel time for distant events
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                Review your calendar weekly
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                Plan ahead for busy seasons
              </li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-xl p-5">
            <h4 className="font-semibold text-gray-900 mb-2">Don't</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 text-red-500 shrink-0 mt-0.5">✕</span>
                Accept bookings without checking calendar
              </li>
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 text-red-500 shrink-0 mt-0.5">✕</span>
                Leave dates open you can't actually work
              </li>
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 text-red-500 shrink-0 mt-0.5">✕</span>
                Forget to block setup/teardown time
              </li>
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 text-red-500 shrink-0 mt-0.5">✕</span>
                Wait to update after booking elsewhere
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="bg-[#44646c] rounded-2xl p-8 text-center text-white">
        <h2 className="text-xl font-bold mb-2">Keep Your Calendar Current</h2>
        <p className="text-white/80 mb-6">
          Check your calendar now and block any dates you're unavailable.
        </p>
        <Link
          href="/provider/dashboard/calendar"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#44646c] rounded-full font-semibold hover:bg-gray-100 transition-colors"
        >
          Go to Calendar
        </Link>
      </div>
    </StaticPageLayout>
  );
}
