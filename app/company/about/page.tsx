import { Metadata } from 'next';
import Link from 'next/link';
import { StaticPageLayout } from '@/components/layout/StaticPageLayout';
import { Sparkles, Zap, Heart, TrendingUp, Flag, Target } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Eventini',
  description: 'Learn about Eventini\'s mission to connect event hosts with amazing providers and create memorable experiences.',
};

const pillars = [
  {
    icon: Sparkles,
    title: 'Visibility Boost',
    description: 'Stand out with curated storefronts, seasonal spotlights, and SEO-optimized listings.',
    features: ['Curated provider profiles', 'Seasonal spotlights', 'SEO-optimized listings'],
  },
  {
    icon: Zap,
    title: 'Effortless Operations',
    description: 'Centralize requests, payments, and logistics with automations you can fine-tune.',
    features: ['Booking management', 'Payment processing', 'Calendar sync'],
  },
  {
    icon: Heart,
    title: 'Guest Delight',
    description: 'Deliver memorable experiences with feedback insights and curated upsell ideas.',
    features: ['Review system', 'Performance insights', 'Retention tools'],
  },
];

const roadmap = [
  {
    phase: "What's live now",
    timeLabel: 'Today',
    icon: Flag,
    items: [
      'Smart availability sync across marketplaces',
      'Inbox AI suggestions for faster replies',
      'Performance dashboard refreshed weekly',
    ],
  },
  {
    phase: 'On the horizon',
    timeLabel: 'Next 60 days',
    icon: TrendingUp,
    items: [
      'Dynamic pricing nudges based on demand',
      'Guest milestone messaging templates',
      'Menu collaboration with co-hosts',
    ],
  },
  {
    phase: 'Looking ahead',
    timeLabel: 'Later this year',
    icon: Target,
    items: [
      'Insights marketplace with industry benchmarks',
      'Eventini Certified training for teams',
      'API access for custom workflows',
    ],
  },
];

const values = [
  {
    title: 'Provider-First',
    description: 'We build tools that help providers succeed, because when they win, everyone wins.',
  },
  {
    title: 'Trust & Transparency',
    description: 'Clear pricing, honest communication, and verified reviews build lasting relationships.',
  },
  {
    title: 'Continuous Improvement',
    description: 'We listen to feedback and constantly evolve our platform to serve users better.',
  },
  {
    title: 'Community',
    description: 'We\'re building more than a marketplace—we\'re creating a community of event professionals.',
  },
];

export default function AboutPage() {
  return (
    <StaticPageLayout
      title="About Eventini"
      subtitle="Built for providers who create joy"
      breadcrumbs={[
        { label: 'Company', href: '/company/careers' },
        { label: 'About' },
      ]}
      maxWidth="wide"
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#44646c] to-[#2d4249] rounded-2xl p-8 md:p-12 text-white mb-12">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5" />
          <span className="text-xs font-semibold uppercase tracking-wide opacity-80">Our Mission</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 max-w-3xl">
          Eventini elevates experiential pros with storytelling storefronts, automation that stays out of your way,
          and tools that turn first-timers into loyal fans.
        </h2>
        <p className="text-lg text-white/80 max-w-2xl">
          We believe every event should be memorable, and every provider should have the tools to make that happen.
        </p>
      </div>

      {/* Our Story */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 text-lg leading-relaxed">
            Eventini was born from a simple observation: talented event providers—food trucks, caterers,
            entertainers, and vendors—struggled to reach the hosts who needed them most. Meanwhile, event
            planners spent countless hours searching for reliable services across fragmented marketplaces.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mt-4">
            We built Eventini to bridge this gap. Our platform makes it easy for providers to showcase
            their unique offerings while giving hosts a seamless way to discover, book, and pay for
            services—all in one place.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mt-4">
            Today, Eventini powers thousands of events, from intimate gatherings to large corporate functions.
            We&apos;re proud to support the entrepreneurs and small businesses that make every celebration special.
          </p>
        </div>
      </div>

      {/* Three Pillars */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Three Ways We Have Your Back</h2>
        <p className="text-gray-600 mb-8">Our platform is built on three core pillars that help providers succeed.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.title} className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="w-12 h-12 rounded-xl bg-[#44646c]/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[#44646c]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{pillar.title}</h3>
                <p className="text-gray-600 mb-4">{pillar.description}</p>
                <ul className="space-y-2">
                  {pillar.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-gray-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#44646c]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Values */}
      <div className="bg-[#44646c]/5 rounded-2xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((value) => (
            <div key={value.title} className="bg-white rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Roadmap */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Where We&apos;re Headed Together</h2>
        <p className="text-gray-600 mb-8">We co-create features with providers like you. Here&apos;s what&apos;s coming.</p>

        <div className="space-y-6">
          {roadmap.map((phase, index) => {
            const Icon = phase.icon;
            return (
              <div key={phase.phase} className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    index === 0 ? 'bg-green-100' : index === 1 ? 'bg-blue-100' : 'bg-purple-100'
                  }`}>
                    <Icon className={`w-5 h-5 ${
                      index === 0 ? 'text-green-600' : index === 1 ? 'text-blue-600' : 'text-purple-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{phase.phase}</h3>
                    <p className="text-sm text-gray-500">{phase.timeLabel}</p>
                  </div>
                </div>
                <ul className="space-y-2 pl-14">
                  {phase.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Join Us CTA */}
      <div className="bg-[#44646c] rounded-2xl p-8 md:p-12 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Join the Eventini Community</h2>
        <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
          Whether you&apos;re a provider looking to grow your business or a host planning your next event,
          we&apos;re here to help create amazing experiences.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/providers/signup"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#44646c] rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            Become a Provider
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white rounded-full font-semibold text-lg hover:bg-white/20 transition-colors"
          >
            Explore Providers
          </Link>
        </div>
      </div>
    </StaticPageLayout>
  );
}
