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
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Safety Tips</h2>
        <p className="text-gray-600 mb-6">Best practices to keep your bookings safe and secure</p>

        {/* For Hosts */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#44646c]/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-[#44646c]" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">For Hosts</h3>
              <span className="text-xs text-[#44646c] uppercase tracking-wide font-medium">5 essential tips</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Book on platform', desc: 'Always book and pay through Eventini to maintain protection and secure payment guarantees' },
              { title: 'Review before booking', desc: 'Check provider ratings, verified reviews, and photos to make informed decisions' },
              { title: 'Keep communication logged', desc: 'Use in-app messaging to maintain a record of all agreements and discussions' },
              { title: 'Verify details', desc: 'Confirm event specifics with your provider before your event date' },
              { title: 'Report concerns', desc: 'Flag any suspicious activity immediately through our reporting system' },
            ].map((tip, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-[#44646c] hover:shadow-md transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 rounded-lg bg-[#44646c] text-white flex items-center justify-center text-xs font-bold">{index + 1}</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">Host</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{tip.title}</h4>
                <p className="text-sm text-gray-600">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* For Providers */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#44646c]/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#44646c]" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">For Providers</h3>
              <span className="text-xs text-[#44646c] uppercase tracking-wide font-medium">5 essential tips</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Platform payments only', desc: 'Only accept payments through Eventini to ensure secure transactions and payout protection' },
              { title: 'Stay compliant', desc: 'Keep your insurance and necessary permits up-to-date and visible on your profile' },
              { title: 'Verify before arrival', desc: 'Confirm event details and venue access requirements before your arrival' },
              { title: 'Document everything', desc: 'Take photos of event setup and completion for your records and protection' },
              { title: 'Report issues', desc: 'Flag any safety concerns or problems immediately through our support system' },
            ].map((tip, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-[#44646c] hover:shadow-md transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 rounded-lg bg-[#44646c] text-white flex items-center justify-center text-xs font-bold">{index + 1}</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">Provider</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{tip.title}</h4>
                <p className="text-sm text-gray-600">{tip.desc}</p>
              </div>
            ))}
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
