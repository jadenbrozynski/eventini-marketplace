import { Metadata } from 'next';
import Link from 'next/link';
import { StaticPageLayout } from '@/components/layout/StaticPageLayout';
import { Calendar, AlertCircle, CheckCircle, Clock, DollarSign, HelpCircle, Info } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cancellation Options | Eventini',
  description: 'Understand cancellation policies, refund timelines, and deposit requirements on Eventini.',
};

export default function CancellationPage() {
  return (
    <StaticPageLayout
      title="Cancellation Options"
      subtitle="Understand our cancellation policies and how refunds work"
      breadcrumbs={[
        { label: 'Support', href: '/support/help-center' },
        { label: 'Cancellation' },
      ]}
      maxWidth="medium"
    >
      {/* Overview */}
      <div className="bg-[#44646c]/5 border border-[#44646c]/20 rounded-xl p-6 mb-8">
        <div className="flex items-start gap-4">
          <Info className="w-6 h-6 text-[#44646c] shrink-0 mt-0.5" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">How Cancellation Policies Work</h2>
            <p className="text-gray-600">
              Each provider on Eventini sets their own cancellation policy. The policy determines your refund
              eligibility based on when you cancel relative to your event date. You&apos;ll always see the applicable
              policy before confirming your booking.
            </p>
          </div>
        </div>
      </div>

      {/* Policy Tiers */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Cancellation Policy Tiers</h2>

      <div className="space-y-6 mb-12">
        {/* Flexible */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="bg-green-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Flexible</h3>
                <p className="text-sm text-gray-600">Most lenient cancellation terms</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <h4 className="font-medium text-gray-900 mb-3">Host Cancellations:</h4>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">30+ days before event</p>
                  <p className="text-sm text-gray-600">Full refund</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-yellow-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">14-29 days before event</p>
                  <p className="text-sm text-gray-600">50% refund</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Less than 14 days before event</p>
                  <p className="text-sm text-gray-600">No refund</p>
                </div>
              </div>
            </div>
            <h4 className="font-medium text-gray-900 mb-3">If Provider Cancels:</h4>
            <ul className="text-gray-600 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Must provide 30 days notice
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Full refund to host
              </li>
            </ul>
          </div>
        </div>

        {/* Moderate */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="bg-yellow-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Moderate</h3>
                <p className="text-sm text-gray-600">Balanced cancellation terms</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <h4 className="font-medium text-gray-900 mb-3">Host Cancellations:</h4>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">60+ days before event</p>
                  <p className="text-sm text-gray-600">Full refund</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-yellow-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">30-59 days before event</p>
                  <p className="text-sm text-gray-600">50% refund</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Less than 30 days before event</p>
                  <p className="text-sm text-gray-600">No refund</p>
                </div>
              </div>
            </div>
            <h4 className="font-medium text-gray-900 mb-3">If Provider Cancels:</h4>
            <ul className="text-gray-600 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Must provide 60 days notice
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Full refund to host
              </li>
            </ul>
          </div>
        </div>

        {/* Strict */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="bg-red-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Strict</h3>
                <p className="text-sm text-gray-600">Most restrictive cancellation terms</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <h4 className="font-medium text-gray-900 mb-3">Host Cancellations:</h4>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">90+ days before event</p>
                  <p className="text-sm text-gray-600">Full refund</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Less than 90 days before event</p>
                  <p className="text-sm text-gray-600">No refund</p>
                </div>
              </div>
            </div>
            <h4 className="font-medium text-gray-900 mb-3">If Provider Cancels:</h4>
            <ul className="text-gray-600 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Must provide 90 days notice
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Full refund to host
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Deposit Options */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Deposit Requirements</h2>

      <div className="bg-gray-50 rounded-xl p-6 mb-12">
        <p className="text-gray-600 mb-6">
          Providers may require a deposit at the time of booking. The deposit amount varies by provider:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
            <div className="w-12 h-12 rounded-full bg-[#44646c]/10 flex items-center justify-center mx-auto mb-3">
              <DollarSign className="w-6 h-6 text-[#44646c]" />
            </div>
            <p className="text-2xl font-bold text-gray-900">25%</p>
            <p className="text-sm text-gray-600">Lower commitment upfront</p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border-2 border-[#44646c]">
            <div className="w-12 h-12 rounded-full bg-[#44646c]/10 flex items-center justify-center mx-auto mb-3">
              <DollarSign className="w-6 h-6 text-[#44646c]" />
            </div>
            <p className="text-2xl font-bold text-gray-900">50%</p>
            <p className="text-sm text-gray-600">Standard industry practice</p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center border border-gray-200">
            <div className="w-12 h-12 rounded-full bg-[#44646c]/10 flex items-center justify-center mx-auto mb-3">
              <DollarSign className="w-6 h-6 text-[#44646c]" />
            </div>
            <p className="text-2xl font-bold text-gray-900">75%</p>
            <p className="text-sm text-gray-600">Higher commitment upfront</p>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-4 text-center">
          The remaining balance is typically due before or at the event, depending on the provider&apos;s terms.
        </p>
      </div>

      {/* Summary Table */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Policy Comparison</h2>

      <div className="overflow-x-auto mb-12">
        <table className="min-w-full bg-white rounded-xl border border-gray-200 overflow-hidden">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Policy</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Full Refund</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">50% Refund</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">No Refund</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Provider Notice</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="py-4 px-6 font-medium text-gray-900">Flexible</td>
              <td className="py-4 px-6 text-gray-600">30+ days</td>
              <td className="py-4 px-6 text-gray-600">14-29 days</td>
              <td className="py-4 px-6 text-gray-600">&lt;14 days</td>
              <td className="py-4 px-6 text-gray-600">30 days</td>
            </tr>
            <tr>
              <td className="py-4 px-6 font-medium text-gray-900">Moderate</td>
              <td className="py-4 px-6 text-gray-600">60+ days</td>
              <td className="py-4 px-6 text-gray-600">30-59 days</td>
              <td className="py-4 px-6 text-gray-600">&lt;30 days</td>
              <td className="py-4 px-6 text-gray-600">60 days</td>
            </tr>
            <tr>
              <td className="py-4 px-6 font-medium text-gray-900">Strict</td>
              <td className="py-4 px-6 text-gray-600">90+ days</td>
              <td className="py-4 px-6 text-gray-600">N/A</td>
              <td className="py-4 px-6 text-gray-600">&lt;90 days</td>
              <td className="py-4 px-6 text-gray-600">90 days</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Special Circumstances */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Special Circumstances</h2>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-12">
        <div className="flex items-start gap-4">
          <HelpCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Extenuating Circumstances</h3>
            <p className="text-gray-600 mb-4">
              In cases of force majeure, severe weather, or other extraordinary circumstances that prevent
              an event from taking place, please contact our support team. We evaluate each situation
              individually and may offer exceptions to standard cancellation policies.
            </p>
            <p className="text-sm text-gray-500">
              Contact us at <a href="mailto:support@eventini.io" className="text-[#44646c] underline">support@eventini.io</a> with
              documentation of your circumstances.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>

      <div className="space-y-4 mb-12">
        <details className="group bg-white border border-gray-200 rounded-xl">
          <summary className="flex items-center justify-between cursor-pointer p-6">
            <span className="font-medium text-gray-900">How do I cancel a booking?</span>
            <span className="text-gray-400 group-open:rotate-180 transition-transform">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </summary>
          <div className="px-6 pb-6 text-gray-600">
            To cancel a booking, go to your event dashboard, select the booking you wish to cancel, and
            click &quot;Request Cancellation.&quot; Your refund amount will be calculated based on the provider&apos;s
            cancellation policy and how far in advance you&apos;re cancelling.
          </div>
        </details>

        <details className="group bg-white border border-gray-200 rounded-xl">
          <summary className="flex items-center justify-between cursor-pointer p-6">
            <span className="font-medium text-gray-900">When will I receive my refund?</span>
            <span className="text-gray-400 group-open:rotate-180 transition-transform">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </summary>
          <div className="px-6 pb-6 text-gray-600">
            Refunds are typically processed within 5-10 business days and returned to your original
            payment method. The exact timing may vary depending on your bank or payment provider.
          </div>
        </details>

        <details className="group bg-white border border-gray-200 rounded-xl">
          <summary className="flex items-center justify-between cursor-pointer p-6">
            <span className="font-medium text-gray-900">Can I modify a booking instead of cancelling?</span>
            <span className="text-gray-400 group-open:rotate-180 transition-transform">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </summary>
          <div className="px-6 pb-6 text-gray-600">
            Yes, you can request modifications such as date changes, guest count updates, or service
            adjustments. Contact the provider through the platform to discuss modifications. Note that
            the provider may accept or decline modification requests based on their availability.
          </div>
        </details>

        <details className="group bg-white border border-gray-200 rounded-xl">
          <summary className="flex items-center justify-between cursor-pointer p-6">
            <span className="font-medium text-gray-900">What if the provider cancels on me?</span>
            <span className="text-gray-400 group-open:rotate-180 transition-transform">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </summary>
          <div className="px-6 pb-6 text-gray-600">
            If a provider cancels your booking, you&apos;ll receive a full refund of all payments made.
            Providers who cancel are required to give notice according to their policy tier, and repeated
            cancellations may affect their standing on the platform.
          </div>
        </details>
      </div>

      {/* Contact CTA */}
      <div className="bg-[#44646c] rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-2">Need to Cancel or Modify a Booking?</h2>
        <p className="text-white/80 mb-6 max-w-lg mx-auto">
          Our support team can help with cancellation requests and answer any questions about refunds.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="mailto:support@eventini.io"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#44646c] rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Contact Support
          </a>
          <Link
            href="/support/help-center"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-full font-semibold hover:bg-white/20 transition-colors"
          >
            Help Center
          </Link>
        </div>
      </div>
    </StaticPageLayout>
  );
}
