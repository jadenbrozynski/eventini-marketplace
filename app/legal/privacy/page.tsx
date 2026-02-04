import { Metadata } from 'next';
import { StaticPageLayout } from '@/components/layout/StaticPageLayout';
import { Shield, Mail, Database, Lock, Globe, Users, FileText, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Eventini',
  description: 'Learn how Eventini collects, uses, and protects your personal information.',
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

export default function PrivacyPolicyPage() {
  return (
    <StaticPageLayout
      title="Privacy Policy"
      subtitle="Last updated: January 15, 2026"
      breadcrumbs={[
        { label: 'Legal', href: '/legal/terms' },
        { label: 'Privacy Policy' },
      ]}
      maxWidth="medium"
    >
      <div className="text-gray-600 mb-8">
        <p className="mb-4">
          At Eventini, we take your privacy seriously. This Privacy Policy explains how Eventini LLC
          (&quot;Eventini,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses, discloses, and protects your information
          when you use our marketplace platform and services.
        </p>
        <p>
          By using Eventini, you agree to the collection and use of information in accordance with this policy.
        </p>
      </div>

      <SectionCard icon={Database} title="Information We Collect">
        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">Personal Information</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li><strong>Account Information:</strong> Names, email addresses, phone numbers, and physical addresses when you create an account</li>
          <li><strong>Authentication Data:</strong> Information received when you sign in with Google OAuth, including your Google profile information</li>
          <li><strong>Profile Information:</strong> Photos, bios, and preferences you choose to share</li>
        </ul>

        <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">Business Information (Providers)</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li><strong>Business Details:</strong> Business names, descriptions, service categories, and pricing structures</li>
          <li><strong>Financial Information:</strong> Tax rates, referral earnings, deposit settings, and payout details</li>
          <li><strong>Certifications:</strong> Professional licenses, insurance documentation, and identity verification</li>
          <li><strong>Identity Tags:</strong> Self-reported status such as nonprofit, woman-owned, or veteran-owned business</li>
          <li><strong>Media:</strong> Photos, videos, audio demos, and promotional materials uploaded to your profile</li>
        </ul>

        <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">Event and Booking Data</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li><strong>Event Information:</strong> Guest counts, event types, dates, times, and venue details</li>
          <li><strong>Location Data:</strong> Full addresses, service radius, and geographic preferences</li>
          <li><strong>Communications:</strong> Messages exchanged between hosts and providers, including content, timestamps, and read status</li>
        </ul>

        <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">Analytics and Usage Data</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li><strong>Performance Metrics:</strong> Profile views, booking counts, ratings, and reviews</li>
          <li><strong>Platform Usage:</strong> How you interact with our services, features used, and preferences</li>
          <li><strong>Device Information:</strong> Browser type, operating system, and device identifiers</li>
        </ul>
      </SectionCard>

      <SectionCard icon={FileText} title="How We Use Your Information">
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li><strong>Platform Operations:</strong> To facilitate connections between hosts and providers, process bookings, and enable payments</li>
          <li><strong>Account Management:</strong> To create and maintain your account, verify identity, and provide customer support</li>
          <li><strong>Communications:</strong> To send booking confirmations, updates, reminders, and important notices about our services</li>
          <li><strong>Personalization:</strong> To customize your experience and provide relevant recommendations</li>
          <li><strong>Analytics:</strong> To understand usage patterns, improve our services, and develop new features</li>
          <li><strong>Safety and Security:</strong> To detect and prevent fraud, abuse, and security threats</li>
          <li><strong>Legal Compliance:</strong> To comply with applicable laws, regulations, and legal processes</li>
          <li><strong>Marketing:</strong> With your consent, to send promotional communications about our services</li>
        </ul>
      </SectionCard>

      <SectionCard icon={Users} title="Information Sharing and Disclosure">
        <p className="text-gray-600 mb-4">We share your information in the following circumstances:</p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">With Other Users</h3>
        <p className="text-gray-600 mb-4">
          When you book or provide services, relevant information is shared between hosts and providers to facilitate the transaction.
          This includes names, contact details, event information, and communications.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">Service Providers</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li><strong>Google:</strong> For authentication services via Google OAuth</li>
          <li><strong>Firebase:</strong> For database, authentication, and storage services</li>
          <li><strong>Payment Processors:</strong> To process payments and payouts</li>
          <li><strong>Toast POS:</strong> For integrated point-of-sale services (for providers who opt in)</li>
          <li><strong>Analytics Providers:</strong> To help us understand platform usage</li>
        </ul>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">Legal Requirements</h3>
        <p className="text-gray-600">
          We may disclose information when required by law, to protect our rights, or in response to valid legal processes.
        </p>
      </SectionCard>

      <SectionCard icon={Lock} title="Data Security">
        <p className="text-gray-600 mb-4">
          We implement robust security measures to protect your information:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li><strong>Encryption:</strong> Data is encrypted in transit and at rest using industry-standard protocols</li>
          <li><strong>Access Controls:</strong> Strict access controls limit who can view and modify data</li>
          <li><strong>Firebase Security Rules:</strong> We use Firebase security rules to protect database access</li>
          <li><strong>Regular Audits:</strong> We conduct regular security audits and vulnerability assessments</li>
          <li><strong>Secure Authentication:</strong> We use OAuth 2.0 for secure authentication</li>
        </ul>
        <p className="text-gray-600 mt-4">
          While we strive to protect your information, no method of electronic transmission or storage is 100% secure.
          We cannot guarantee absolute security.
        </p>
      </SectionCard>

      <SectionCard icon={Shield} title="Your Rights and Choices">
        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">Access and Correction</h3>
        <p className="text-gray-600 mb-4">
          You can access and update most of your personal information through your account settings.
          For information you cannot access directly, contact us at support@eventini.io.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">Data Deletion</h3>
        <p className="text-gray-600 mb-4">
          You can request deletion of your account and personal data by contacting support@eventini.io.
          Some information may be retained for legal or business purposes.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">Communications</h3>
        <p className="text-gray-600 mb-4">
          You can opt out of marketing communications through your account settings or by clicking &quot;unsubscribe&quot; in our emails.
          You cannot opt out of transactional communications related to your bookings.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">Cookies and Tracking</h3>
        <p className="text-gray-600">
          You can manage cookie preferences through your browser settings. Disabling cookies may affect platform functionality.
        </p>
      </SectionCard>

      <SectionCard icon={Globe} title="California Privacy Rights (CCPA)">
        <p className="text-gray-600 mb-4">
          If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA):
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li><strong>Right to Know:</strong> You can request information about the personal data we collect, use, and disclose</li>
          <li><strong>Right to Delete:</strong> You can request deletion of your personal data, subject to certain exceptions</li>
          <li><strong>Right to Opt-Out:</strong> You can opt out of the sale of your personal information (note: we do not sell personal information)</li>
          <li><strong>Non-Discrimination:</strong> We will not discriminate against you for exercising your privacy rights</li>
        </ul>
        <p className="text-gray-600 mt-4">
          To exercise these rights, contact us at support@eventini.io or call us at the number provided on our website.
        </p>
      </SectionCard>

      <SectionCard icon={Globe} title="GDPR Compliance">
        <p className="text-gray-600 mb-4">
          If you are in the European Economic Area (EEA), you have rights under the General Data Protection Regulation (GDPR):
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li><strong>Legal Basis:</strong> We process your data based on consent, contractual necessity, legitimate interests, or legal obligations</li>
          <li><strong>Data Portability:</strong> You can request a copy of your data in a portable format</li>
          <li><strong>Right to Object:</strong> You can object to certain processing activities</li>
          <li><strong>Right to Restrict:</strong> You can request restriction of processing in certain circumstances</li>
          <li><strong>Automated Decision-Making:</strong> You have rights related to automated decision-making and profiling</li>
        </ul>
      </SectionCard>

      <SectionCard icon={AlertCircle} title="Children's Privacy">
        <p className="text-gray-600">
          Eventini is not intended for children under 18 years of age. We do not knowingly collect personal information
          from children under 18. If you believe we have collected information from a child under 18, please contact us
          immediately at support@eventini.io.
        </p>
      </SectionCard>

      <SectionCard icon={FileText} title="Changes to This Policy">
        <p className="text-gray-600">
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
          Privacy Policy on this page and updating the &quot;Last updated&quot; date. For significant changes, we will provide
          additional notice, such as email notification or a prominent notice on our platform.
        </p>
      </SectionCard>

      <SectionCard icon={Mail} title="Contact Us">
        <p className="text-gray-600 mb-4">
          If you have questions about this Privacy Policy or our privacy practices, please contact us:
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
