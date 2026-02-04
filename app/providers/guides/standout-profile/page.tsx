import { Metadata } from 'next';
import Link from 'next/link';
import { StaticPageLayout } from '@/components/layout/StaticPageLayout';
import { Camera, CheckCircle, Lightbulb, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Creating a Standout Profile | Eventini',
  description: 'Learn how to write compelling descriptions, take great photos, and showcase your best work on Eventini.',
};

export default function StandoutProfileGuidePage() {
  return (
    <StaticPageLayout
      title="Creating a Standout Profile"
      subtitle="Make a great first impression and attract more bookings"
      breadcrumbs={[
        { label: 'Providers', href: '/providers/resources' },
        { label: 'Guides', href: '/providers/resources' },
        { label: 'Standout Profile' },
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
            <Camera className="w-6 h-6 text-[#44646c]" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 mb-2">Why Your Profile Matters</h2>
            <p className="text-gray-600">
              Your profile is often the first thing potential hosts see. A well-crafted profile builds trust,
              showcases your expertise, and helps you stand out from the competition.
            </p>
          </div>
        </div>
      </div>

      {/* Section 1: Profile Photos */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">1. High-Quality Photos</h2>
        <p className="text-gray-600 mb-4">
          Photos are the most important element of your profile. They show hosts exactly what they can expect.
        </p>

        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
          <h3 className="font-semibold text-gray-900 mb-3">Photo Best Practices</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Use natural lighting</strong> – Photos taken during the day or at well-lit events look more professional</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Show your setup</strong> – Include photos of your full setup at real events</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Capture action shots</strong> – Photos of you working show personality and professionalism</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Include variety</strong> – Mix close-ups, wide shots, and detail shots</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Minimum 5 photos</strong> – Profiles with more photos get significantly more inquiries</span>
            </li>
          </ul>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">
              <strong>Pro tip:</strong> Ask a friend to take photos at your next event, or hire a photographer for a few hours.
              The investment pays off quickly in increased bookings.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Compelling Description */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">2. Write a Compelling Description</h2>
        <p className="text-gray-600 mb-4">
          Your description should tell hosts who you are, what you offer, and why they should book you.
        </p>

        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
          <h3 className="font-semibold text-gray-900 mb-3">What to Include</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Your story</strong> – How did you get started? What drives your passion?</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Your specialties</strong> – What makes your service unique?</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Experience highlights</strong> – Notable events, clients, or achievements</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Service details</strong> – What's included, setup requirements, etc.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Section 3: Complete All Fields */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">3. Complete Every Field</h2>
        <p className="text-gray-600 mb-4">
          Profiles with complete information rank higher in search results and convert better.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-medium text-gray-900 mb-2">Essential Fields</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Business name</li>
              <li>• Service area / location</li>
              <li>• Contact information</li>
              <li>• Pricing and packages</li>
              <li>• Availability calendar</li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-medium text-gray-900 mb-2">Bonus Fields</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Social media links</li>
              <li>• Certifications / awards</li>
              <li>• Years in business</li>
              <li>• Special features</li>
              <li>• Dietary accommodations</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="bg-[#44646c] rounded-2xl p-8 text-center text-white">
        <h2 className="text-xl font-bold mb-2">Ready to Update Your Profile?</h2>
        <p className="text-white/80 mb-6">
          Apply these tips to create a profile that attracts more bookings.
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
