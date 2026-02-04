'use client';

import { OnboardingStepProps } from '../types';
import { CheckCircle2, Clock, Mail, ArrowRight } from 'lucide-react';

interface ReviewRequestProps extends OnboardingStepProps {
  onComplete: () => void;
}

export default function ReviewRequest({
  data,
  onComplete,
}: ReviewRequestProps) {
  const steps = [
    {
      icon: CheckCircle2,
      title: 'Profile submitted',
      description: 'Your provider profile has been submitted for review.',
      status: 'complete',
    },
    {
      icon: Clock,
      title: 'Under review',
      description: 'Our team will review your profile within 24-48 hours.',
      status: 'current',
    },
    {
      icon: Mail,
      title: 'Email notification',
      description: `We'll notify you at ${data.email} when approved.`,
      status: 'upcoming',
    },
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-120px)] min-h-[calc(100dvh-120px)] px-4 sm:px-6 pt-8 sm:pt-10 pb-28 sm:pb-32">
      {/* Success Icon */}
      <div className="flex justify-center mb-6 sm:mb-8">
        <div className="relative">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#44646c]/10 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-[#44646c]" />
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1.5 sm:mb-2">
          You&apos;re almost there!
        </h1>
        <p className="text-sm sm:text-base text-gray-500">
          Your profile has been submitted for review
        </p>
      </div>

      {/* Business Summary */}
      <div className="bg-gray-100 rounded-xl p-3 sm:p-4 mb-6 sm:mb-8">
        <div className="flex items-center gap-3 sm:gap-4">
          {data.coverPhoto ? (
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden flex-shrink-0">
              <img
                src={data.coverPhoto}
                alt={data.businessName}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gray-300 flex-shrink-0" />
          )}
          <div className="min-w-0">
            <h3 className="font-semibold text-sm sm:text-base text-gray-900 truncate">{data.businessName || 'Your Business'}</h3>
            <p className="text-xs sm:text-sm text-gray-500">
              {data.city && data.state ? `${data.city}, ${data.state}` : 'Your Location'}
            </p>
            <div className="flex flex-wrap gap-1 mt-1">
              {data.serviceTypes.slice(0, 2).map((type) => (
                <span
                  key={type}
                  className="text-[10px] sm:text-xs bg-gray-200 text-gray-600 px-1.5 sm:px-2 py-0.5 rounded-full"
                >
                  {type.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                </span>
              ))}
              {data.serviceTypes.length > 2 && (
                <span className="text-[10px] sm:text-xs bg-gray-200 text-gray-600 px-1.5 sm:px-2 py-0.5 rounded-full">
                  +{data.serviceTypes.length - 2}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={index} className="flex items-start gap-3 sm:gap-4">
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  step.status === 'complete'
                    ? 'bg-[#44646c]/10'
                    : step.status === 'current'
                    ? 'bg-amber-100'
                    : 'bg-gray-100'
                }`}
              >
                <Icon
                  className={`w-4 h-4 sm:w-5 sm:h-5 ${
                    step.status === 'complete'
                      ? 'text-[#44646c]'
                      : step.status === 'current'
                      ? 'text-amber-600'
                      : 'text-gray-400'
                  }`}
                />
              </div>
              <div className="min-w-0">
                <h4
                  className={`font-medium text-sm sm:text-base ${
                    step.status === 'upcoming' ? 'text-gray-400' : 'text-gray-900'
                  }`}
                >
                  {step.title}
                </h4>
                <p
                  className={`text-xs sm:text-sm ${
                    step.status === 'upcoming' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* What's Next */}
      <div className="bg-[#44646c] text-white rounded-xl p-3 sm:p-4 mb-6 sm:mb-8">
        <h4 className="font-medium text-sm sm:text-base mb-1.5 sm:mb-2">What happens next?</h4>
        <ul className="text-xs sm:text-sm text-white/80 space-y-1.5 sm:space-y-2">
          <li>• Our team reviews your profile for completeness</li>
          <li>• Once approved, your listing goes live on Eventini</li>
          <li>• You can start receiving booking requests immediately</li>
        </ul>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 sm:px-6 pt-3 sm:pt-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] sm:pb-[calc(1rem+env(safe-area-inset-bottom))]">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={onComplete}
            className="w-full h-11 sm:h-12 rounded-full text-sm sm:text-base font-semibold bg-[#44646c] text-white hover:bg-[#3a565d] active:bg-[#3a565d] shadow-md hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            Go to Dashboard
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
