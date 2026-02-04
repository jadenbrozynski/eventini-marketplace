import { Metadata } from 'next';
import Link from 'next/link';
import { StaticPageLayout } from '@/components/layout/StaticPageLayout';
import { Settings, CheckCircle, Lightbulb, ArrowLeft, ClipboardList } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Operational Excellence | Eventini',
  description: 'Streamline your workflow from booking confirmation to post-event follow-up on Eventini.',
};

export default function OperationalExcellenceGuidePage() {
  return (
    <StaticPageLayout
      title="Operational Excellence"
      subtitle="Streamline your workflow from booking to follow-up"
      breadcrumbs={[
        { label: 'Providers', href: '/providers/resources' },
        { label: 'Guides', href: '/providers/resources' },
        { label: 'Operations' },
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
            <Settings className="w-6 h-6 text-[#44646c]" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 mb-2">Systems Create Success</h2>
            <p className="text-gray-600">
              Having reliable processes means less stress, fewer mistakes, and happier clients.
              Build systems that let you focus on what you do best.
            </p>
          </div>
        </div>
      </div>

      {/* Section 1: Booking Confirmation */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">1. When You Get a Booking</h2>
        <p className="text-gray-600 mb-4">
          Start every event on the right foot with a clear confirmation process.
        </p>

        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <ClipboardList className="w-5 h-5 text-[#44646c]" />
            <h3 className="font-semibold text-gray-900">Booking Confirmation Checklist</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600">Send confirmation message with all details</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600">Block the date on all your calendars</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600">Add to your planning/prep schedule</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600">Note any special requests or requirements</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600">Schedule staff if needed</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Section 2: Pre-Event Prep */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">2. Pre-Event Preparation</h2>
        <p className="text-gray-600 mb-4">
          The week before your event is critical. Use this timeline to stay on track.
        </p>

        <div className="space-y-4">
          <div className="bg-gray-50 rounded-xl p-5">
            <h4 className="font-semibold text-gray-900 mb-2">1 Week Before</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Review event details and special requests</li>
              <li>• Confirm with host – any changes?</li>
              <li>• Order supplies and inventory</li>
              <li>• Confirm staff availability</li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-xl p-5">
            <h4 className="font-semibold text-gray-900 mb-2">2-3 Days Before</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Final supply check</li>
              <li>• Prep what you can ahead of time</li>
              <li>• Confirm venue address and access</li>
              <li>• Check weather forecast</li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-xl p-5">
            <h4 className="font-semibold text-gray-900 mb-2">Day Before</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Load equipment and supplies</li>
              <li>• Review timeline and logistics</li>
              <li>• Charge devices, check equipment</li>
              <li>• Get a good night's sleep!</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 3: Day Of */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">3. Day of Event</h2>

        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
          <h3 className="font-semibold text-gray-900 mb-3">Event Day Workflow</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Arrive early</strong> – At least 30-60 minutes before setup time</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Introduce yourself</strong> – Connect with the host and venue contact</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Document your setup</strong> – Take photos for your portfolio</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Check in with host</strong> – Confirm everything looks good</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Clean up thoroughly</strong> – Leave the space better than you found it</span>
            </li>
          </ul>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">
              <strong>Pro tip:</strong> Create a packing checklist specific to your service.
              Check it every time – even experienced providers forget things!
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Post-Event */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">4. Post-Event Follow-Up</h2>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-3">After Every Event</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600">Send thank-you message within 24 hours</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600">Submit final charges if applicable</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600">Request a review (1-2 days after)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600">Add photos to your portfolio</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600">Note any lessons learned for next time</span>
            </li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <div className="bg-[#44646c] rounded-2xl p-8 text-center text-white">
        <h2 className="text-xl font-bold mb-2">Download Your Category Manual</h2>
        <p className="text-white/80 mb-6">
          Get detailed operational guidance specific to your provider type.
        </p>
        <Link
          href="/providers/resources#manuals"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#44646c] rounded-full font-semibold hover:bg-gray-100 transition-colors"
        >
          View Manuals
        </Link>
      </div>
    </StaticPageLayout>
  );
}
