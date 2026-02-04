'use client';

import { useState } from 'react';
import Link from 'next/link';
import { StaticPageLayout } from '@/components/layout/StaticPageLayout';
import { Search, ChevronRight, Users, Briefcase, CreditCard, FileText, Plug, Award, HelpCircle } from 'lucide-react';

type Category = 'all' | 'hosts' | 'providers' | 'payments' | 'policies' | 'integrations' | 'superhost';
type Audience = 'All' | 'Host' | 'Provider' | 'Venue';

interface Article {
  id: string;
  title: string;
  category: Category;
  audience: Audience;
  summary: string;
}

const articles: Article[] = [
  // Host Articles
  {
    id: 'getting-started-host',
    title: 'Getting started as a new host on Eventini',
    category: 'hosts',
    audience: 'Host',
    summary: 'Learn how to create your account, post your first event, and connect with providers.',
  },
  {
    id: 'booking-first-provider',
    title: 'Booking your first food truck or caterer',
    category: 'hosts',
    audience: 'Host',
    summary: 'Post an event, review offers, and confirm your booking — all inside Eventini.',
  },
  {
    id: 'minimum-guarantees',
    title: 'Understanding minimum guarantees',
    category: 'hosts',
    audience: 'Host',
    summary: 'Why some providers require a minimum spend and how Eventini shows it to you before booking.',
  },
  {
    id: 'changes-cancellations-refunds-host',
    title: 'Changes, cancellations, and refunds for hosts',
    category: 'hosts',
    audience: 'Host',
    summary: 'How to edit an event, cancel a provider, and when refunds may apply.',
  },
  {
    id: 'multiple-providers-one-event',
    title: 'Managing multiple providers for one event',
    category: 'hosts',
    audience: 'Host',
    summary: 'Book food, drinks, rentals, and entertainment in one flow.',
  },
  {
    id: 'plan-with-moonboards',
    title: 'Plan your event with MoonBoards',
    category: 'hosts',
    audience: 'Host',
    summary: 'Use MoonBoards to collect inspiration and let Eventini recommend real providers that match your theme.',
  },
  // Provider Articles
  {
    id: 'provider-onboarding',
    title: 'Getting approved as a provider',
    category: 'providers',
    audience: 'Provider',
    summary: 'Submit your business details so hosts can start booking you on Eventini.',
  },
  {
    id: 'provider-fees-payouts',
    title: 'Provider fees and payouts',
    category: 'providers',
    audience: 'Provider',
    summary: "Understand Eventini's provider fee and when you receive your funds.",
  },
  {
    id: 'managing-provider-availability',
    title: 'Managing your availability and calendar',
    category: 'providers',
    audience: 'Provider',
    summary: 'Use the in-app calendar to block dates, add bookings, quick book, or run a manual discovery call.',
  },
  {
    id: 'accept-decline-request-provider',
    title: 'What happens when you accept or decline a request',
    category: 'providers',
    audience: 'Provider',
    summary: "Understand the process and implications when you accept or decline a host's booking request.",
  },
  // Payment Articles
  {
    id: 'host-payments-fees',
    title: 'How payments and fees work for hosts',
    category: 'payments',
    audience: 'Host',
    summary: 'Eventini charges a small host fee to keep the platform running and to support secure payments.',
  },
  {
    id: 'open-tab-payment-host',
    title: 'How to pay your open tab after the event',
    category: 'payments',
    audience: 'Host',
    summary: 'Learn how open-tab payments work with food trucks and how to pay the final balance after your event.',
  },
  // Policy Articles
  {
    id: 'community-policies',
    title: 'Eventini community policies',
    category: 'policies',
    audience: 'All',
    summary: 'How we keep the Eventini marketplace safe, respectful, and reliable.',
  },
  // Integration Articles
  {
    id: 'integrations-toast-pos',
    title: 'Connecting Eventini with Toast POS',
    category: 'integrations',
    audience: 'Provider',
    summary: 'Use your POS data to streamline event service.',
  },
  // Superhost Articles
  {
    id: 'high-volume-host',
    title: 'High-volume hosts',
    category: 'superhost',
    audience: 'Host',
    summary: 'Learn how reliable, data-backed hosts can earn preferred status and may qualify for reduced minimums.',
  },
];

const categories = [
  { id: 'all', label: 'All Articles', icon: HelpCircle },
  { id: 'hosts', label: 'Hosts', icon: Users },
  { id: 'providers', label: 'Providers', icon: Briefcase },
  { id: 'payments', label: 'Payments', icon: CreditCard },
  { id: 'policies', label: 'Policies', icon: FileText },
  { id: 'integrations', label: 'Integrations', icon: Plug },
  { id: 'superhost', label: 'Superhost', icon: Award },
];

const audiences = ['All', 'Host', 'Provider', 'Venue'] as const;

function getCategoryIcon(category: Category) {
  const cat = categories.find(c => c.id === category);
  return cat?.icon || HelpCircle;
}

function getCategoryLabel(category: Category) {
  const cat = categories.find(c => c.id === category);
  return cat?.label || 'General';
}

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [selectedAudience, setSelectedAudience] = useState<Audience>('All');

  const filteredArticles = articles.filter(article => {
    const matchesSearch = searchQuery === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;

    const matchesAudience = selectedAudience === 'All' || article.audience === selectedAudience || article.audience === 'All';

    return matchesSearch && matchesCategory && matchesAudience;
  });

  return (
    <StaticPageLayout
      title="Help Center"
      subtitle="Find answers to common questions about using Eventini"
      breadcrumbs={[
        { label: 'Support', href: '/support/help-center' },
        { label: 'Help Center' },
      ]}
      maxWidth="wide"
    >
      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for help articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#44646c] focus:border-transparent text-gray-900 placeholder-gray-500"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(category => {
          const Icon = category.icon;
          const isActive = selectedCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id as Category)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isActive
                  ? 'bg-[#44646c] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              {category.label}
            </button>
          );
        })}
      </div>

      {/* Audience Filter */}
      <div className="flex items-center gap-4 mb-8">
        <span className="text-sm font-medium text-gray-700">Filter by audience:</span>
        <div className="flex gap-2">
          {audiences.map(audience => (
            <button
              key={audience}
              onClick={() => setSelectedAudience(audience)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                selectedAudience === audience
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {audience}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <p className="text-sm text-gray-500 mb-6">
        Showing {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''}
      </p>

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredArticles.map(article => {
            const CategoryIcon = getCategoryIcon(article.category);
            return (
              <Link
                key={article.id}
                href={`/support/help-center/${article.id}`}
                className="group bg-white border border-gray-200 rounded-xl p-5 hover:border-[#44646c] hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#44646c]/10 flex items-center justify-center">
                      <CategoryIcon className="w-4 h-4 text-[#44646c]" />
                    </div>
                    <span className="text-xs font-medium text-[#44646c] uppercase tracking-wide">
                      {getCategoryLabel(article.category)}
                    </span>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                    {article.audience}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#44646c] transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {article.summary}
                </p>
                <div className="flex items-center text-sm text-[#44646c] font-medium">
                  Read article
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No articles found</h3>
          <p className="text-gray-500 max-w-sm mx-auto">
            Try adjusting your search or filters to find what you&apos;re looking for.
          </p>
        </div>
      )}

      {/* Contact Support */}
      <div className="mt-12 bg-[#44646c] rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-2">Still need help?</h2>
        <p className="text-white/80 mb-6 max-w-lg mx-auto">
          Can&apos;t find what you&apos;re looking for? Our support team is here to help.
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
