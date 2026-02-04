'use client';

import { useState } from 'react';

// SVG Icons
const SparklesIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z"/>
  </svg>
);

const TrendingUpIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
    <polyline points="17 6 23 6 23 12"/>
  </svg>
);

const DollarSignIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23"/>
    <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
  </svg>
);

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const LockIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0110 0v4"/>
  </svg>
);

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

export default function AccelerateProgramPage() {
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [formData, setFormData] = useState({
    reason: '',
    experience: '',
    goals: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const benefits = [
    {
      icon: TrendingUpIcon,
      title: 'Premium Placement',
      description: 'Prime positioning across the platform',
      value: '$950',
      valueLabel: 'value',
    },
    {
      icon: DollarSignIcon,
      title: 'Referral Earnings',
      description: 'Earn from successful referrals',
      value: '2.5%',
      valueLabel: 'commission',
    },
    {
      icon: CalendarIcon,
      title: 'Partnership Term',
      description: 'With renewal opportunities',
      value: '6',
      valueLabel: 'months',
    },
  ];

  const eligibilityCriteria = [
    'Verified provider account',
    'Minimum 3 completed bookings',
    'Average rating of 4.5+',
    'No recent policy violations',
  ];

  const steps = [
    { num: '1', title: 'Apply', desc: 'Submit your application' },
    { num: '2', title: 'Review', desc: '5-7 business days' },
    { num: '3', title: 'Earn', desc: 'Start getting benefits' },
  ];

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5">
            <CheckIcon className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Application Submitted</h1>
          <p className="text-gray-600 text-sm mb-6">
            We'll review your application and get back to you within 5-7 business days.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setShowRequestForm(false);
            }}
            className="px-6 py-2.5 bg-[#44646c] text-white rounded-full text-sm font-medium hover:bg-[#3a565d] transition-colors"
          >
            Back to Program
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-10 xl:px-20 py-6">
        {/* Compact Hero */}
        <div className="relative overflow-hidden bg-gradient-to-r from-[#44646c] to-[#3a565d] rounded-2xl p-6 md:p-8 mb-6">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1 px-2.5 py-0.5 bg-white/20 backdrop-blur rounded-full">
                  <LockIcon className="w-3 h-3 text-white" />
                  <span className="text-xs font-medium text-white">Invite Only</span>
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Eventini Accelerate Program
              </h1>
              <p className="text-sm text-white/80 max-w-xl">
                An exclusive partnership for top-performing providers. Get premium visibility and earn recurring revenue through referrals.
              </p>
            </div>

            {!showRequestForm && (
              <button
                onClick={() => setShowRequestForm(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#44646c] rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors shadow-lg shrink-0"
              >
                <SparklesIcon className="w-4 h-4" />
                Request Access
              </button>
            )}
          </div>
        </div>

        {showRequestForm ? (
          /* Application Form - Compact */
          <div className="max-w-xl mx-auto">
            <div className="bg-white rounded-2xl border border-gray-200 p-5 md:p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-1">Request Access</h2>
              <p className="text-sm text-gray-500 mb-5">Tell us why you'd be a great fit</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Why are you interested?
                  </label>
                  <textarea
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    rows={2}
                    required
                    placeholder="What excites you about the program..."
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#44646c] focus:ring-2 focus:ring-[#44646c]/20 transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your experience on Eventini
                  </label>
                  <textarea
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    rows={2}
                    required
                    placeholder="Your history, notable events, client feedback..."
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#44646c] focus:ring-2 focus:ring-[#44646c]/20 transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Goals for the next 6 months
                  </label>
                  <textarea
                    value={formData.goals}
                    onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                    rows={2}
                    required
                    placeholder="Your growth plans..."
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#44646c] focus:ring-2 focus:ring-[#44646c]/20 transition-all resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowRequestForm(false)}
                    className="flex-1 py-2.5 border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-[#44646c] text-white rounded-full text-sm font-semibold hover:bg-[#3a565d] transition-colors"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          /* Main Content - Horizontal Layout */
          <div className="space-y-6">
            {/* Benefits - Horizontal Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl border border-gray-200 p-5 hover:border-[#44646c]/30 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#44646c]/10 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-[#44646c]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm">{benefit.title}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">{benefit.description}</p>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-[#44646c]">{benefit.value}</span>
                        <span className="text-xs text-gray-500">{benefit.valueLabel}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* How It Works + Eligibility - Side by Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* How It Works - Horizontal Steps */}
              <div className="bg-white rounded-2xl border border-gray-200 p-5">
                <h3 className="font-semibold text-gray-900 mb-4">How It Works</h3>
                <div className="flex items-center justify-between">
                  {steps.map((step, index) => (
                    <div key={index} className="flex items-center">
                      <div className="text-center">
                        <div className="w-10 h-10 rounded-full bg-[#44646c] text-white text-sm font-semibold flex items-center justify-center mx-auto mb-2">
                          {step.num}
                        </div>
                        <p className="font-medium text-gray-900 text-sm">{step.title}</p>
                        <p className="text-xs text-gray-500">{step.desc}</p>
                      </div>
                      {index < steps.length - 1 && (
                        <ArrowRightIcon className="w-5 h-5 text-gray-300 mx-3 shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Eligibility - Compact */}
              <div className="bg-[#44646c]/5 rounded-2xl p-5">
                <h3 className="font-semibold text-gray-900 mb-3">Eligibility</h3>
                <div className="grid grid-cols-2 gap-2">
                  {eligibilityCriteria.map((criteria, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                        <CheckIcon className="w-2.5 h-2.5 text-emerald-600" />
                      </div>
                      <span className="text-xs text-gray-600">{criteria}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setShowRequestForm(true)}
                  className="w-full mt-4 py-2.5 bg-[#44646c] text-white rounded-full text-sm font-semibold hover:bg-[#3a565d] transition-colors flex items-center justify-center gap-2"
                >
                  <SparklesIcon className="w-4 h-4" />
                  Request Access
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}
