import { Metadata } from 'next';
import Link from 'next/link';
import { StaticPageLayout } from '@/components/layout/StaticPageLayout';
import { DollarSign, CheckCircle, Lightbulb, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pricing Strategies That Work | Eventini',
  description: 'Set competitive prices, use minimum guarantees effectively, and maximize your earnings on Eventini.',
};

export default function PricingStrategiesGuidePage() {
  return (
    <StaticPageLayout
      title="Pricing Strategies That Work"
      subtitle="Set prices that win bookings while maximizing your earnings"
      breadcrumbs={[
        { label: 'Providers', href: '/providers/resources' },
        { label: 'Guides', href: '/providers/resources' },
        { label: 'Pricing Strategies' },
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
            <DollarSign className="w-6 h-6 text-[#44646c]" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 mb-2">Finding Your Sweet Spot</h2>
            <p className="text-gray-600">
              Pricing is both an art and a science. The right price attracts quality bookings while
              ensuring your business remains profitable and sustainable.
            </p>
          </div>
        </div>
      </div>

      {/* Section 1: Know Your Costs */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">1. Know Your Costs</h2>
        <p className="text-gray-600 mb-4">
          Before setting prices, understand exactly what each event costs you.
        </p>

        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
          <h3 className="font-semibold text-gray-900 mb-3">Cost Categories</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Direct costs</strong> – Food, supplies, equipment rental</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Labor</strong> – Your time and any staff you bring</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Transportation</strong> – Fuel, vehicle wear, mileage</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600"><strong>Overhead</strong> – Insurance, licenses, marketing</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Section 2: Minimum Guarantees */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">2. Using Minimum Guarantees</h2>
        <p className="text-gray-600 mb-4">
          Minimum guarantees protect your time and ensure every event is worth doing.
        </p>

        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
          <h3 className="font-semibold text-gray-900 mb-3">How to Set Your Minimum</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600">Calculate your break-even point for the smallest event you'd do</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600">Add a margin for profit and unexpected costs</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600">Consider the opportunity cost of that time slot</span>
            </li>
          </ul>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">
              <strong>Pro tip:</strong> Your minimum should make you comfortable saying yes to the booking.
              If you feel resentful at your minimum price, it's too low.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Pricing Models */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">3. Choose Your Pricing Model</h2>

        <div className="space-y-4">
          <div className="bg-gray-50 rounded-xl p-5">
            <h4 className="font-semibold text-gray-900 mb-2">Per Person Pricing</h4>
            <p className="text-gray-600 text-sm mb-2">Best for: Catering, food trucks, bar services</p>
            <p className="text-gray-600 text-sm">Scales naturally with event size. Easy for hosts to understand and budget.</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-5">
            <h4 className="font-semibold text-gray-900 mb-2">Flat Fee Pricing</h4>
            <p className="text-gray-600 text-sm mb-2">Best for: Entertainment, photography, DJs</p>
            <p className="text-gray-600 text-sm">Simple and predictable. Great when your costs don't vary much by guest count.</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-5">
            <h4 className="font-semibold text-gray-900 mb-2">Hourly Pricing</h4>
            <p className="text-gray-600 text-sm mb-2">Best for: Venues, performers, rental items</p>
            <p className="text-gray-600 text-sm">Flexible for varying event durations. Combine with minimum hours.</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-5">
            <h4 className="font-semibold text-gray-900 mb-2">Package Pricing</h4>
            <p className="text-gray-600 text-sm mb-2">Best for: Full-service providers</p>
            <p className="text-gray-600 text-sm">Bundle services at different tiers. Makes upselling natural.</p>
          </div>
        </div>
      </section>

      {/* Section 4: Competitive Analysis */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">4. Research the Competition</h2>
        <p className="text-gray-600 mb-4">
          Understanding market rates helps you position your pricing competitively.
        </p>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600">Browse other providers in your category and area</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600">Note their pricing structure and what's included</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600">Identify what makes your service different or better</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <span className="text-gray-600">Price based on your unique value, not just matching others</span>
            </li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <div className="bg-[#44646c] rounded-2xl p-8 text-center text-white">
        <h2 className="text-xl font-bold mb-2">Ready to Optimize Your Pricing?</h2>
        <p className="text-white/80 mb-6">
          Update your pricing in your dashboard to start attracting the right bookings.
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
