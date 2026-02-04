import { Metadata } from 'next';
import { StaticPageLayout } from '@/components/layout/StaticPageLayout';
import { FileText, Users, CreditCard, Calendar, Shield, AlertTriangle, Scale, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | Eventini',
  description: 'Read the terms and conditions that govern your use of the Eventini marketplace platform.',
};

function SectionCard({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-gray-50 rounded-xl p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-[#44646c]/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-[#44646c]" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      </div>
      <div className="prose prose-gray max-w-none">
        {children}
      </div>
    </div>
  );
}

export default function TermsOfServicePage() {
  return (
    <StaticPageLayout
      title="Terms of Service"
      subtitle="Last updated: January 15, 2026"
      breadcrumbs={[
        { label: 'Legal', href: '/legal/privacy' },
        { label: 'Terms of Service' },
      ]}
      maxWidth="medium"
    >
      <div className="text-gray-600 mb-8">
        <p className="mb-4">
          Welcome to Eventini. These Terms of Service (&quot;Terms&quot;) govern your access to and use of the Eventini
          marketplace platform, website, mobile application, and services (collectively, the &quot;Platform&quot;).
        </p>
        <p className="mb-4">
          By accessing or using Eventini, you agree to be bound by these Terms. If you do not agree to these Terms,
          you may not access or use the Platform.
        </p>
        <p>
          Eventini LLC (&quot;Eventini,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates this Platform to connect event hosts with
          service providers including caterers, food trucks, entertainers, venues, and other vendors.
        </p>
      </div>

      <SectionCard icon={FileText} title="1. Acceptance of Terms">
        <p className="text-gray-600 mb-4">
          By creating an account or using Eventini, you confirm that:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>You are at least 18 years of age</li>
          <li>You have the legal capacity to enter into binding contracts</li>
          <li>You will comply with these Terms and all applicable laws and regulations</li>
          <li>If representing a business, you have authority to bind that business to these Terms</li>
        </ul>
      </SectionCard>

      <SectionCard icon={Users} title="2. Account Registration">
        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">Creating an Account</h3>
        <p className="text-gray-600 mb-4">
          To use most features of Eventini, you must create an account using Google OAuth or another supported
          authentication method. You agree to provide accurate, current, and complete information during registration.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">Account Responsibility</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>You are responsible for maintaining the security of your account credentials</li>
          <li>You are responsible for all activities that occur under your account</li>
          <li>You must notify us immediately of any unauthorized use of your account</li>
          <li>You may not share, transfer, or sell your account to another person</li>
        </ul>
      </SectionCard>

      <SectionCard icon={Users} title="3. Provider Obligations">
        <p className="text-gray-600 mb-4">
          If you register as a provider (caterer, food truck, entertainer, venue, or other service provider), you agree to:
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">Listing Accuracy</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>Provide accurate and up-to-date information about your services, pricing, and availability</li>
          <li>Clearly disclose all fees, minimum guarantees, and pricing structures</li>
          <li>Update your listings promptly when information changes</li>
        </ul>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">Compliance and Standards</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>Maintain all required licenses, permits, and insurance for your services</li>
          <li>Comply with all applicable health, safety, and food handling regulations</li>
          <li>Authorize Eventini to conduct quality and standards checks as needed</li>
          <li>Accurately represent any identity tags (nonprofit, woman-owned, veteran-owned, etc.)</li>
        </ul>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">Tax Obligations</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>You are responsible for collecting and remitting applicable sales taxes</li>
          <li>You must accurately set your tax rate in your provider settings</li>
          <li>Eventini facilitates tax collection but does not assume tax liability on your behalf</li>
        </ul>
      </SectionCard>

      <SectionCard icon={Users} title="4. Host/Consumer Obligations">
        <p className="text-gray-600 mb-4">
          If you use Eventini to book services, you agree to:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>Provide accurate event information including date, time, location, and guest count</li>
          <li>Communicate clearly with providers about your requirements and expectations</li>
          <li>Honor your booking commitments and payment obligations</li>
          <li>Provide accurate guest count estimates, understanding that providers plan based on your projections</li>
          <li>Review and understand provider cancellation policies before booking</li>
        </ul>
      </SectionCard>

      <SectionCard icon={Calendar} title="5. Bookings and Transactions">
        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">Booking Process</h3>
        <p className="text-gray-600 mb-4">
          When you submit a booking request, it is sent to the provider for acceptance. A binding agreement is formed
          when the provider accepts and you complete any required payment or deposit.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">Eventini&apos;s Role</h3>
        <p className="text-gray-600 mb-4">
          Eventini acts as a marketplace platform facilitating connections between hosts and providers.
          We are not a party to the service agreement between you and the provider, and we are not responsible
          for the quality, safety, or legality of services provided.
        </p>
      </SectionCard>

      <SectionCard icon={Calendar} title="6. Cancellation Policies">
        <p className="text-gray-600 mb-4">
          Providers set their own cancellation policies. Eventini offers three standard policy tiers:
        </p>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-600 mb-4">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Policy</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Full Refund</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">50% Refund</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">No Refund</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 font-medium">Flexible</td>
                <td className="py-3 px-4">30+ days before</td>
                <td className="py-3 px-4">14-29 days before</td>
                <td className="py-3 px-4">&lt;14 days before</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 font-medium">Moderate</td>
                <td className="py-3 px-4">60+ days before</td>
                <td className="py-3 px-4">30-59 days before</td>
                <td className="py-3 px-4">&lt;30 days before</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Strict</td>
                <td className="py-3 px-4">90+ days before</td>
                <td className="py-3 px-4">N/A</td>
                <td className="py-3 px-4">&lt;90 days before</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-gray-600">
          If a provider cancels, the host receives a full refund of any payments made. Providers who cancel
          must provide notice according to their policy tier.
        </p>
      </SectionCard>

      <SectionCard icon={CreditCard} title="7. Payments and Fees">
        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">Deposit Requirements</h3>
        <p className="text-gray-600 mb-4">
          Providers may require deposits at the time of booking. Standard deposit options are 25%, 50%, or 75%
          of the total booking amount. The deposit amount is clearly displayed before you confirm your booking.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">Open Tab Payments</h3>
        <p className="text-gray-600 mb-4">
          Some providers offer open tab service where the final amount depends on actual consumption.
          Hosts are responsible for paying the final tab amount after the event, including any difference
          if a minimum guarantee was not met.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">Platform Fees</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li><strong>Host Fee:</strong> A 5% platform fee is added to the provider&apos;s quote</li>
          <li><strong>Provider Fee:</strong> Providers pay a service fee (e.g., 15%) on completed bookings</li>
        </ul>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">Referral Program</h3>
        <p className="text-gray-600">
          Providers can earn $50 for each qualified referral. Referral earnings are subject to program terms
          and may change at our discretion.
        </p>
      </SectionCard>

      <SectionCard icon={Shield} title="8. Ratings and Reviews">
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>Both hosts and providers may leave ratings and reviews after completed events</li>
          <li>Reviews must be honest, accurate, and based on genuine experiences</li>
          <li>Reviews may not contain hate speech, harassment, or false statements</li>
          <li>We reserve the right to remove reviews that violate our policies</li>
          <li>Attempts to manipulate ratings or reviews may result in account termination</li>
        </ul>
      </SectionCard>

      <SectionCard icon={AlertTriangle} title="9. Prohibited Conduct">
        <p className="text-gray-600 mb-4">You agree not to:</p>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>Provide false or misleading information</li>
          <li>Circumvent the Platform to avoid fees or complete transactions off-platform</li>
          <li>Harass, abuse, or threaten other users</li>
          <li>Post content that infringes intellectual property rights</li>
          <li>Use the Platform for illegal purposes</li>
          <li>Attempt to gain unauthorized access to Platform systems</li>
          <li>Interfere with the proper operation of the Platform</li>
          <li>Scrape or collect user data without authorization</li>
        </ul>
      </SectionCard>

      <SectionCard icon={Scale} title="10. Limitation of Liability">
        <p className="text-gray-600 mb-4">
          TO THE MAXIMUM EXTENT PERMITTED BY LAW:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>EVENTINI PROVIDES THE PLATFORM &quot;AS IS&quot; WITHOUT WARRANTIES OF ANY KIND</li>
          <li>WE ARE NOT LIABLE FOR THE ACTIONS, CONTENT, OR SERVICES OF USERS</li>
          <li>WE ARE NOT RESPONSIBLE FOR SERVICE QUALITY, SAFETY, OR LEGALITY</li>
          <li>OUR TOTAL LIABILITY IS LIMITED TO THE GREATER OF $100 OR THE FEES PAID TO US IN THE PAST 12 MONTHS</li>
          <li>WE ARE NOT LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES</li>
        </ul>
      </SectionCard>

      <SectionCard icon={Scale} title="11. Dispute Resolution">
        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">Between Users</h3>
        <p className="text-gray-600 mb-4">
          Disputes between hosts and providers should first be resolved directly between the parties.
          You may contact support@eventini.io for assistance, but Eventini is not obligated to mediate disputes.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">With Eventini</h3>
        <p className="text-gray-600 mb-4">
          Any disputes with Eventini shall be resolved through binding arbitration in accordance with the
          American Arbitration Association rules. You agree to waive any right to participate in a class action.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">Governing Law</h3>
        <p className="text-gray-600">
          These Terms are governed by the laws of the State of California, without regard to conflict of law principles.
        </p>
      </SectionCard>

      <SectionCard icon={AlertTriangle} title="12. Account Termination">
        <p className="text-gray-600 mb-4">
          We may suspend or terminate your account if you:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>Violate these Terms or our policies</li>
          <li>Engage in fraudulent or illegal activity</li>
          <li>Receive consistently poor ratings or reviews</li>
          <li>Fail to maintain required licenses or insurance (providers)</li>
          <li>Provide false or misleading information</li>
        </ul>
        <p className="text-gray-600 mt-4">
          You may terminate your account at any time by contacting support@eventini.io. Outstanding obligations
          survive account termination.
        </p>
      </SectionCard>

      <SectionCard icon={FileText} title="13. Intellectual Property">
        <p className="text-gray-600 mb-4">
          All content and materials on Eventini, including logos, designs, and software, are owned by Eventini
          or our licensors and are protected by intellectual property laws.
        </p>
        <p className="text-gray-600">
          By posting content on Eventini, you grant us a non-exclusive, worldwide, royalty-free license to use,
          display, and distribute that content in connection with the Platform.
        </p>
      </SectionCard>

      <SectionCard icon={FileText} title="14. Changes to Terms">
        <p className="text-gray-600">
          We may modify these Terms at any time. We will notify you of material changes by posting the updated
          Terms on the Platform and updating the &quot;Last updated&quot; date. Your continued use of Eventini after
          changes become effective constitutes acceptance of the modified Terms.
        </p>
      </SectionCard>

      <SectionCard icon={Mail} title="15. Contact Information">
        <p className="text-gray-600 mb-4">
          For questions about these Terms, please contact us:
        </p>
        <ul className="list-none space-y-2 text-gray-600">
          <li><strong>Email:</strong> support@eventini.io</li>
          <li><strong>Payment Inquiries:</strong> payouts@eventini.io</li>
          <li><strong>Address:</strong> Eventini LLC, Milwaukee, WI</li>
        </ul>
      </SectionCard>
    </StaticPageLayout>
  );
}
