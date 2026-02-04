'use client';

import { useState } from 'react';
import Link from 'next/link';
import { StaticPageLayout } from '@/components/layout/StaticPageLayout';
import { Calendar, AlertCircle, CheckCircle, Clock, DollarSign, HelpCircle, ChevronRight, FileText, Users, Briefcase, RefreshCw, CreditCard, Shield } from 'lucide-react';

type PolicyType = 'all' | 'flexible' | 'moderate' | 'strict';
type FaqCategory = 'all' | 'hosts' | 'providers' | 'refunds' | 'process';

interface PolicyInfo {
  id: string;
  name: string;
  description: string;
  fullRefund: string;
  partialRefund: string | null;
  noRefund: string;
  providerNotice: string;
  icon: typeof CheckCircle;
  color: 'green' | 'amber' | 'red';
}

const policies: PolicyInfo[] = [
  {
    id: 'flexible',
    name: 'Flexible Policy',
    description: 'Most lenient terms - great for events with uncertain dates',
    fullRefund: '30+ days before event',
    partialRefund: '14-29 days before event',
    noRefund: 'Less than 14 days',
    providerNotice: '30 days',
    icon: CheckCircle,
    color: 'green',
  },
  {
    id: 'moderate',
    name: 'Moderate Policy',
    description: 'Balanced terms - standard for most event providers',
    fullRefund: '60+ days before event',
    partialRefund: '30-59 days before event',
    noRefund: 'Less than 30 days',
    providerNotice: '60 days',
    icon: Clock,
    color: 'amber',
  },
  {
    id: 'strict',
    name: 'Strict Policy',
    description: 'Most restrictive terms - common for high-demand providers',
    fullRefund: '90+ days before event',
    partialRefund: null,
    noRefund: 'Less than 90 days',
    providerNotice: '90 days',
    icon: AlertCircle,
    color: 'red',
  },
];

const depositOptions = [
  {
    id: 'deposit-25',
    percent: '25%',
    title: '25% Deposit',
    description: 'Lower upfront commitment with larger balance due closer to your event date',
    tag: 'Low',
  },
  {
    id: 'deposit-50',
    percent: '50%',
    title: '50% Deposit',
    description: 'Most common option offering a balanced split between booking and final payment',
    tag: 'Standard',
    featured: true,
  },
  {
    id: 'deposit-75',
    percent: '75%',
    title: '75% Deposit',
    description: 'Higher upfront commitment with a smaller remaining balance before your event',
    tag: 'High',
  },
];

const faqs = [
  {
    id: 'how-to-cancel',
    title: 'How do I cancel a booking?',
    summary: 'Navigate to your Eventini dashboard, find the booking under "My Events," and click "Request Cancellation." You\'ll see your refund amount calculated automatically based on the provider\'s cancellation policy and how many days remain before your event.',
    category: 'hosts',
    audience: 'Host',
    articleId: 'changes-cancellations-refunds-host',
  },
  {
    id: 'refund-timing',
    title: 'When will I receive my refund?',
    summary: 'Refunds are processed within 5-10 business days after cancellation approval. The funds return to your original payment method. Bank processing times may add 2-3 additional days. You\'ll receive an email confirmation when the refund is initiated.',
    category: 'refunds',
    audience: 'Host',
    articleId: 'host-payments-fees',
  },
  {
    id: 'modify-booking',
    title: 'Can I modify instead of cancelling?',
    summary: 'Yes! Contact your provider through the in-app messaging system to request changes like date adjustments, guest count updates, or menu modifications. Providers can accept or decline based on availability. Modifications don\'t trigger cancellation fees.',
    category: 'process',
    audience: 'Host',
    articleId: 'changes-cancellations-refunds-host',
  },
  {
    id: 'provider-cancels',
    title: 'What if my provider cancels?',
    summary: 'You receive a full refund of all payments made, regardless of timing. Providers must give notice per their policy tier. We\'ll help you find a replacement provider and may offer booking credits for the inconvenience. Repeated cancellations affect provider standing.',
    category: 'hosts',
    audience: 'Host',
    articleId: 'changes-cancellations-refunds-host',
  },
  {
    id: 'extenuating',
    title: 'Extenuating circumstances policy',
    summary: 'Force majeure events, severe weather, government restrictions, or documented emergencies may qualify for policy exceptions. Submit a support request with documentation (weather alerts, medical notes, official notices) within 14 days of the event date.',
    category: 'process',
    audience: 'All',
    articleId: 'community-policies',
  },
  {
    id: 'partial-refund',
    title: 'How are partial refunds calculated?',
    summary: 'Partial refunds (typically 50%) are calculated on your total booking amount minus the Eventini service fee and any non-refundable add-ons marked at checkout. The exact amount is shown before you confirm the cancellation request.',
    category: 'refunds',
    audience: 'Host',
    articleId: 'host-payments-fees',
  },
  {
    id: 'provider-cancel-policy',
    title: 'What\'s my cancellation obligation as a provider?',
    summary: 'You must provide notice equal to your policy tier (30/60/90 days). Cancelling without proper notice results in a warning, profile flag, and potential removal after repeated violations. Emergency cancellations should be reported to support immediately.',
    category: 'providers',
    audience: 'Provider',
    articleId: 'provider-fees-payouts',
  },
  {
    id: 'deposit-refund',
    title: 'Is my deposit refundable?',
    summary: 'Deposits follow the same cancellation policy as the full booking. If you cancel within the "full refund" window, your entire deposit is returned. During the partial refund period, you receive 50% of your deposit back. Outside those windows, deposits are non-refundable.',
    category: 'refunds',
    audience: 'Host',
    articleId: 'changes-cancellations-refunds-host',
  },
  {
    id: 'provider-payout-cancel',
    title: 'How does cancellation affect my payout?',
    summary: 'If a host cancels within the no-refund window, you receive your full payout minus the Eventini fee. Partial refund cancellations result in 50% payout. Full refund cancellations mean no payout. Your payout is processed on the standard schedule after the original event date.',
    category: 'providers',
    audience: 'Provider',
    articleId: 'provider-fees-payouts',
  },
];

const policyFilters = [
  { id: 'all', label: 'All Policies', icon: FileText },
  { id: 'flexible', label: 'Flexible', icon: CheckCircle },
  { id: 'moderate', label: 'Moderate', icon: Clock },
  { id: 'strict', label: 'Strict', icon: AlertCircle },
];

const faqFilters = [
  { id: 'all', label: 'All Questions', icon: HelpCircle },
  { id: 'hosts', label: 'Hosts', icon: Users },
  { id: 'providers', label: 'Providers', icon: Briefcase },
  { id: 'refunds', label: 'Refunds', icon: CreditCard },
  { id: 'process', label: 'Process', icon: RefreshCw },
];

const getColorClasses = (color: 'green' | 'amber' | 'red') => {
  switch (color) {
    case 'green':
      return {
        bg: 'bg-green-50',
        border: 'border-green-100',
        iconBg: 'bg-green-100',
        iconColor: 'text-green-600',
        badge: 'bg-green-100 text-green-700',
      };
    case 'amber':
      return {
        bg: 'bg-amber-50',
        border: 'border-amber-100',
        iconBg: 'bg-amber-100',
        iconColor: 'text-amber-600',
        badge: 'bg-amber-100 text-amber-700',
      };
    case 'red':
      return {
        bg: 'bg-red-50',
        border: 'border-red-100',
        iconBg: 'bg-red-100',
        iconColor: 'text-red-600',
        badge: 'bg-red-100 text-red-700',
      };
  }
};

export default function CancellationPage() {
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyType>('all');
  const [selectedFaqCategory, setSelectedFaqCategory] = useState<FaqCategory>('all');

  const filteredPolicies = selectedPolicy === 'all'
    ? policies
    : policies.filter(p => p.id === selectedPolicy);

  const filteredFaqs = selectedFaqCategory === 'all'
    ? faqs
    : faqs.filter(f => f.category === selectedFaqCategory);

  return (
    <StaticPageLayout
      title="Cancellation Options"
      subtitle="Understand cancellation policies, refunds, and deposit requirements"
      breadcrumbs={[
        { label: 'Support', href: '/support/help-center' },
        { label: 'Cancellation' },
      ]}
      maxWidth="wide"
    >
      {/* Policy Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {policyFilters.map(filter => {
          const Icon = filter.icon;
          const isActive = selectedPolicy === filter.id;
          return (
            <button
              key={filter.id}
              onClick={() => setSelectedPolicy(filter.id as PolicyType)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isActive
                  ? 'bg-[#44646c] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              {filter.label}
            </button>
          );
        })}
      </div>

      {/* Results Count */}
      <p className="text-sm text-gray-500 mb-6">
        Showing {filteredPolicies.length} polic{filteredPolicies.length !== 1 ? 'ies' : 'y'}
      </p>

      {/* Policy Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {filteredPolicies.map(policy => {
          const PolicyIcon = policy.icon;
          const colors = getColorClasses(policy.color);
          return (
            <div
              key={policy.id}
              className={`group bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-[#44646c] hover:shadow-md transition-all`}
            >
              {/* Colored Header */}
              <div className={`${colors.bg} ${colors.border} border-b px-5 py-4`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg ${colors.iconBg} flex items-center justify-center`}>
                      <PolicyIcon className={`w-4 h-4 ${colors.iconColor}`} />
                    </div>
                    <span className={`text-xs font-semibold uppercase tracking-wide ${colors.iconColor}`}>
                      {policy.id}
                    </span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${colors.badge}`}>
                    {policy.providerNotice} notice
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#44646c] transition-colors">
                  {policy.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {policy.description}
                </p>

                {/* Refund Timeline */}
                <div className="space-y-2 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                    <span className="text-gray-600">Full refund: <span className="font-medium text-gray-900">{policy.fullRefund}</span></span>
                  </div>
                  {policy.partialRefund ? (
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                      <span className="text-gray-600">50% refund: <span className="font-medium text-gray-900">{policy.partialRefund}</span></span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-gray-300 shrink-0" />
                      <span className="text-gray-400">50% refund: <span className="font-medium">Not available</span></span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                    <span className="text-gray-600">No refund: <span className="font-medium text-gray-900">{policy.noRefund}</span></span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Deposit Options Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Deposit Requirements</h2>
        <p className="text-sm text-gray-500">Providers may require one of these deposit amounts at booking</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {depositOptions.map(deposit => (
          <div
            key={deposit.id}
            className={`group bg-white rounded-xl overflow-hidden hover:shadow-md transition-all ${
              deposit.featured
                ? 'border-2 border-[#44646c] shadow-sm'
                : 'border border-gray-200 hover:border-[#44646c]'
            }`}
          >
            {/* Header - consistent height */}
            <div className={`px-5 py-4 border-b ${deposit.featured ? 'bg-[#44646c]/5 border-[#44646c]/20' : 'bg-gray-50 border-gray-100'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${deposit.featured ? 'bg-[#44646c]/10' : 'bg-gray-200'}`}>
                    <DollarSign className={`w-4 h-4 ${deposit.featured ? 'text-[#44646c]' : 'text-gray-500'}`} />
                  </div>
                  <span className={`text-xs font-semibold uppercase tracking-wide ${deposit.featured ? 'text-[#44646c]' : 'text-gray-500'}`}>
                    Deposit
                  </span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  deposit.featured
                    ? 'bg-[#44646c] text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {deposit.tag}
                </span>
              </div>
            </div>

            {/* Content - consistent structure */}
            <div className="p-5">
              <div className="flex items-baseline gap-2 mb-3">
                <span className={`text-3xl font-bold ${deposit.featured ? 'text-[#44646c]' : 'text-gray-900'}`}>
                  {deposit.percent}
                </span>
                <span className="text-sm text-gray-500">at booking</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#44646c] transition-colors">
                {deposit.title}
              </h3>
              <p className="text-sm text-gray-600 min-h-[48px]">
                {deposit.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Frequently Asked Questions</h2>
        <p className="text-sm text-gray-500 mb-6">Common questions about cancellations and refunds</p>
      </div>

      {/* FAQ Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {faqFilters.map(filter => {
          const Icon = filter.icon;
          const isActive = selectedFaqCategory === filter.id;
          return (
            <button
              key={filter.id}
              onClick={() => setSelectedFaqCategory(filter.id as FaqCategory)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isActive
                  ? 'bg-[#44646c] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              {filter.label}
            </button>
          );
        })}
      </div>

      {/* FAQ Results Count */}
      <p className="text-sm text-gray-500 mb-6">
        Showing {filteredFaqs.length} question{filteredFaqs.length !== 1 ? 's' : ''}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {filteredFaqs.map(faq => (
          <Link
            key={faq.id}
            href={`/support/help-center/${faq.articleId}`}
            className="group bg-white border border-gray-200 rounded-xl p-5 hover:border-[#44646c] hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#44646c]/10 flex items-center justify-center">
                  <HelpCircle className="w-4 h-4 text-[#44646c]" />
                </div>
                <span className="text-xs font-medium text-[#44646c] uppercase tracking-wide">
                  {faq.category}
                </span>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                {faq.audience}
              </span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#44646c] transition-colors">
              {faq.title}
            </h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {faq.summary}
            </p>
            <div className="flex items-center text-sm text-[#44646c] font-medium">
              Read more
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      {/* Contact Support */}
      <div className="mt-12 bg-[#44646c] rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-2">Still need help?</h2>
        <p className="text-white/80 mb-6 max-w-lg mx-auto">
          Our support team can help with cancellation requests and answer questions about refunds.
        </p>
        <a
          href="mailto:support@eventini.io"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#44646c] rounded-full font-semibold hover:bg-gray-100 transition-colors"
        >
          Contact Support
        </a>
      </div>
    </StaticPageLayout>
  );
}
