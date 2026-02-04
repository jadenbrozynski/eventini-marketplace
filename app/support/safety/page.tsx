import { Metadata } from 'next';
import Link from 'next/link';
import { StaticPageLayout } from '@/components/layout/StaticPageLayout';
import { Shield, CheckCircle, AlertTriangle, Users, Lock, Phone, FileText, Eye } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Safety Information | Eventini',
  description: 'Learn about how Eventini keeps hosts and providers safe on our marketplace platform.',
};

function SafetyCard({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-[#44646c]/10 flex items-center justify-center">
          <Icon className="w-6 h-6 text-[#44646c]" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="text-gray-600">
        {children}
      </div>
    </div>
  );
}

export default function SafetyPage() {
  return (
    <StaticPageLayout
      title="Safety Information"
      subtitle="Your safety is our priority. Learn how Eventini protects hosts and providers."
      breadcrumbs={[
        { label: 'Support', href: '/support/help-center' },
        { label: 'Safety' },
      ]}
      maxWidth="wide"
    >
      {/* Hero Section */}
      <div className="bg-[#44646c] rounded-2xl p-8 md:p-12 text-white mb-12">
        <div className="flex items-center gap-4 mb-4">
          <Shield className="w-10 h-10" />
          <h2 className="text-2xl md:text-3xl font-bold">Committed to Your Safety</h2>
        </div>
        <p className="text-white/80 text-lg max-w-3xl">
          At Eventini, we&apos;ve built multiple layers of protection to ensure every booking is safe,
          reliable, and trustworthy. From verified providers to secure payments, we&apos;ve got you covered.
        </p>
      </div>

      {/* Safety Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <SafetyCard icon={CheckCircle} title="Provider Verification">
          <p className="mb-3">
            Every provider on Eventini goes through our verification process:
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-1 shrink-0" />
              <span>Business identity verification</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-1 shrink-0" />
              <span>Required licenses and permits check</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-1 shrink-0" />
              <span>Insurance documentation review</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-1 shrink-0" />
              <span>Profile accuracy validation</span>
            </li>
          </ul>
        </SafetyCard>

        <SafetyCard icon={Lock} title="Secure Payments">
          <p className="mb-3">
            All payments are processed securely through our platform:
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-1 shrink-0" />
              <span>Encrypted payment processing</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-1 shrink-0" />
              <span>Funds held securely until service completion</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-1 shrink-0" />
              <span>Clear refund policies</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-1 shrink-0" />
              <span>Transaction records for every booking</span>
            </li>
          </ul>
        </SafetyCard>

        <SafetyCard icon={Eye} title="Reviews and Ratings">
          <p className="mb-3">
            Our transparent review system helps you make informed decisions:
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-1 shrink-0" />
              <span>Reviews only from verified bookings</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-1 shrink-0" />
              <span>Two-way rating system for accountability</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-1 shrink-0" />
              <span>Fraud detection on suspicious reviews</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-1 shrink-0" />
              <span>Response options for providers</span>
            </li>
          </ul>
        </SafetyCard>

        <SafetyCard icon={Users} title="Community Standards">
          <p className="mb-3">
            All users must adhere to our community guidelines:
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-1 shrink-0" />
              <span>Zero tolerance for discrimination</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-1 shrink-0" />
              <span>Respectful communication required</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-1 shrink-0" />
              <span>Enforcement of platform policies</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-1 shrink-0" />
              <span>Account suspension for violations</span>
            </li>
          </ul>
        </SafetyCard>
      </div>

      {/* Safety Tips Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Safety Tips</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* For Hosts */}
          <div className="bg-blue-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              For Hosts
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium shrink-0">1</span>
                <span>Always book and pay through the Eventini platform to maintain protection</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium shrink-0">2</span>
                <span>Review provider ratings, reviews, and photos before booking</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium shrink-0">3</span>
                <span>Communicate through the platform to keep a record of all agreements</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium shrink-0">4</span>
                <span>Verify event details with your provider before the event date</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium shrink-0">5</span>
                <span>Report any suspicious activity immediately</span>
              </li>
            </ul>
          </div>

          {/* For Providers */}
          <div className="bg-green-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-600" />
              For Providers
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-medium shrink-0">1</span>
                <span>Only accept payments through the Eventini platform</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-medium shrink-0">2</span>
                <span>Maintain up-to-date insurance and necessary permits</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-medium shrink-0">3</span>
                <span>Verify event details and venue access before arriving</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-medium shrink-0">4</span>
                <span>Document event setup and completion with photos</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-medium shrink-0">5</span>
                <span>Report any issues or safety concerns immediately</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Reporting Section */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-12">
        <div className="flex items-start gap-4">
          <AlertTriangle className="w-8 h-8 text-amber-600 shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Report a Safety Concern</h3>
            <p className="text-gray-600 mb-4">
              If you experience or witness any safety issues, please report them immediately.
              We take all reports seriously and investigate promptly.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:support@eventini.io"
                className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Contact Support
              </a>
              <Link
                href="/support/help-center"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-amber-300 text-amber-700 rounded-lg font-medium hover:bg-amber-50 transition-colors"
              >
                <FileText className="w-4 h-4" />
                Help Center
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Food Safety Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Food Safety Standards</h2>
        <div className="bg-gray-50 rounded-xl p-6">
          <p className="text-gray-600 mb-4">
            All food and beverage providers on Eventini must meet strict food safety requirements:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Health Department Permits</p>
                <p className="text-sm text-gray-600">Valid local health department permits required</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Food Handler Certification</p>
                <p className="text-sm text-gray-600">Certified food handlers on staff</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Liability Insurance</p>
                <p className="text-sm text-gray-600">General liability coverage required</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Regular Inspections</p>
                <p className="text-sm text-gray-600">Compliance with health inspection standards</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-[#44646c] rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-2">Questions About Safety?</h2>
        <p className="text-white/80 mb-6 max-w-lg mx-auto">
          Our team is available to answer any questions about our safety measures and policies.
        </p>
        <a
          href="mailto:support@eventini.io"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#44646c] rounded-full font-semibold hover:bg-gray-100 transition-colors"
        >
          Contact Us
        </a>
      </div>
    </StaticPageLayout>
  );
}
