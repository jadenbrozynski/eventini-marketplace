'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { StaticPageLayout } from '@/components/layout/StaticPageLayout';
import { Sparkles, TrendingUp, Zap, Heart, CheckCircle, ArrowRight, Star, Users, Calendar, DollarSign } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const pillars = [
  {
    icon: Sparkles,
    title: 'Visibility Boost',
    description: 'Stand out with curated storefronts, seasonal spotlights, and SEO-optimized listings that put your business in front of the right hosts.',
  },
  {
    icon: Zap,
    title: 'Effortless Operations',
    description: 'Centralize requests, payments, and logistics with automations you can fine-tune. Spend less time on admin and more time doing what you love.',
  },
  {
    icon: Heart,
    title: 'Guest Delight',
    description: 'Deliver memorable experiences with feedback insights and curated upsell ideas. Turn first-timers into loyal fans.',
  },
];

const benefits = [
  'Free to join and create your listing',
  'Control your own pricing and availability',
  'Get paid securely after each event',
  'Access to thousands of potential hosts',
  'Calendar and booking management tools',
  'Performance insights and analytics',
  'Dedicated provider support team',
  '$50 referral bonus for each provider you refer',
];

const providerTypes = [
  { name: 'Food & Beverage', examples: 'Food trucks, caterers, bartenders, coffee carts' },
  { name: 'Entertainment', examples: 'DJs, musicians, photographers, videographers' },
  { name: 'Venues', examples: 'Event spaces, outdoor venues, unique locations' },
  { name: 'Vendors', examples: 'Florists, decorators, rental companies, planners' },
];

export default function ProviderSignupPage() {
  const router = useRouter();
  const { user, signInAsDemo } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleGetStarted = () => {
    if (user) {
      router.push('/provider/dashboard');
    } else {
      setIsLoading(true);
      setTimeout(() => {
        signInAsDemo();
        setIsLoading(false);
        router.push('/provider/dashboard');
      }, 500);
    }
  };

  return (
    <StaticPageLayout
      title="Become a Provider"
      subtitle="Join thousands of providers who grow their business on Eventini"
      breadcrumbs={[
        { label: 'Providers', href: '/providers/resources' },
        { label: 'Become a Provider' },
      ]}
      maxWidth="wide"
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#44646c] to-[#2d4249] rounded-2xl p-8 md:p-12 text-white mb-12">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-6 h-6" />
            <span className="text-sm font-semibold uppercase tracking-wide opacity-80">About Eventini</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Built for providers who create joy.
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Eventini elevates experiential pros with storytelling storefronts, automation that stays out of your way,
            and tools that turn first-timers into loyal fans.
          </p>
          <button
            onClick={handleGetStarted}
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#44646c] rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-gray-300 border-t-[#44646c] rounded-full animate-spin" />
                Getting started...
              </>
            ) : (
              <>
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Three Pillars */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Three ways Eventini has your back</h2>
        <p className="text-gray-600 mb-8">See how the platform flexes for your business.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.title} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-[#44646c]/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[#44646c]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{pillar.title}</h3>
                <p className="text-gray-600">{pillar.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Provider Types */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Who can join Eventini?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {providerTypes.map((type) => (
            <div key={type.name} className="bg-gray-50 rounded-xl p-5 flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900">{type.name}</h3>
                <p className="text-sm text-gray-600">{type.examples}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-[#44646c]/5 rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Why providers love Eventini</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {benefits.map((benefit) => (
            <div key={benefit} className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-[#44646c] shrink-0" />
              <span className="text-gray-700">{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-[#44646c] text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Create your profile</h3>
            <p className="text-sm text-gray-600">Sign up and add your business details, photos, and pricing</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-[#44646c] text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Get discovered</h3>
            <p className="text-sm text-gray-600">Hosts find you through search, categories, and recommendations</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-[#44646c] text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Accept bookings</h3>
            <p className="text-sm text-gray-600">Review requests and accept the events that fit your schedule</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-[#44646c] text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
              4
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Get paid</h3>
            <p className="text-sm text-gray-600">Receive secure payments after each successful event</p>
          </div>
        </div>
      </div>

      {/* Real Reviews */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">What users are saying</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <div className="flex items-center gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="font-semibold text-gray-900 mb-2">Very user friendly! Great concept</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>McGrizle-E</span>
              <span>Jan 25, 2026</span>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <div className="flex items-center gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="font-semibold text-gray-900 mb-1">Time Saver !!</p>
            <p className="text-gray-600 mb-3">As an entrepreneur closing catering gigs can be time consuming. Eventini has made this process a lot smoother.</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Aloading414</span>
              <span>Nov 10, 2025</span>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Preview */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Providers ask, we deliver</h2>
        <div className="space-y-4">
          <details className="group bg-white border border-gray-200 rounded-xl">
            <summary className="flex items-center justify-between cursor-pointer p-6">
              <span className="font-medium text-gray-900">How does Eventini pricing work for providers?</span>
              <span className="text-gray-400 group-open:rotate-180 transition-transform">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </summary>
            <div className="px-6 pb-6 text-gray-600">
              You keep full control. Choose flat-rate or percentage-based fees per event, and toggle add-on
              pricing any time. Eventini only charges a service fee when you get booked.
            </div>
          </details>

          <details className="group bg-white border border-gray-200 rounded-xl">
            <summary className="flex items-center justify-between cursor-pointer p-6">
              <span className="font-medium text-gray-900">Will I get help setting things up?</span>
              <span className="text-gray-400 group-open:rotate-180 transition-transform">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </summary>
            <div className="px-6 pb-6 text-gray-600">
              Absolutely. Our onboarding specialists guide you through storefront design, menu creation,
              and operational best practices. Book a kickoff call under Support.
            </div>
          </details>

          <details className="group bg-white border border-gray-200 rounded-xl">
            <summary className="flex items-center justify-between cursor-pointer p-6">
              <span className="font-medium text-gray-900">What tools help me nurture guest relationships?</span>
              <span className="text-gray-400 group-open:rotate-180 transition-transform">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </summary>
            <div className="px-6 pb-6 text-gray-600">
              Use guest timelines, automated thank-you notes, and retention nudges to stay top-of-mind.
              Track loyalty and upsell opportunities from your dashboard.
            </div>
          </details>
        </div>
        <div className="mt-4 text-center">
          <Link href="/support/help-center" className="text-[#44646c] font-medium hover:underline">
            View all FAQs in Help Center
          </Link>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#44646c] rounded-2xl p-8 md:p-12 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to grow your business?</h2>
        <p className="text-white/80 mb-8 max-w-xl mx-auto">
          Join Eventini today and start connecting with hosts who are looking for exactly what you offer.
          It&apos;s free to create your listing.
        </p>
        <button
          onClick={handleGetStarted}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#44646c] rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Getting started...' : 'Start Your Free Listing'}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </StaticPageLayout>
  );
}
