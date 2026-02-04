'use client';

import { OnboardingStepProps } from '../types';
import OnboardingStepWrapper from '../OnboardingStepWrapper';
import { Check, ExternalLink } from 'lucide-react';

const termsItems = [
  {
    id: 'terms-of-service',
    title: 'Terms of Service',
    description: 'Understand your rights and responsibilities as a provider on Eventini.',
    link: '/legal/terms',
  },
  {
    id: 'privacy-policy',
    title: 'Privacy Policy',
    description: 'How we collect, use, and protect your personal information.',
    link: '/legal/privacy',
  },
  {
    id: 'provider-agreement',
    title: 'Provider Agreement',
    description: 'Standards and expectations for service providers on our platform.',
    link: '/legal/terms',
  },
  {
    id: 'payment-terms',
    title: 'Payment Terms',
    description: 'How and when you will receive payments for your services.',
    link: '/legal/terms',
  },
];

export default function TermsConditions({
  data,
  updateData,
  onNext,
  onBack,
}: OnboardingStepProps) {
  const isValid = data.termsAccepted;

  const handleToggleTerms = () => {
    updateData({ termsAccepted: !data.termsAccepted });
  };

  return (
    <OnboardingStepWrapper
      title="Terms & Conditions"
      subtitle="Please review and accept our terms to continue"
      onNext={onNext}
      onBack={onBack}
      canContinue={isValid}
      nextLabel="Accept & Continue"
    >
      <div className="mt-4 space-y-4 sm:space-y-6">
        {/* Terms Links */}
        <div className="space-y-2 sm:space-y-3">
          {termsItems.map((item) => (
            <a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-100 rounded-xl hover:bg-gray-200 active:bg-gray-200 transition-colors group"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <h4 className="font-medium text-sm sm:text-base text-gray-900 group-hover:text-[#44646c] group-active:text-[#44646c]">
                    {item.title}
                  </h4>
                  <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                </div>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">{item.description}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Agreement Checkbox */}
        <div
          onClick={handleToggleTerms}
          className={`flex items-start gap-3 sm:gap-4 p-3 sm:p-4 border-2 rounded-xl cursor-pointer transition-all active:scale-[0.99] ${
            data.termsAccepted
              ? 'border-[#44646c] bg-[#44646c]/5'
              : 'border-gray-200 hover:border-gray-300 active:bg-gray-50'
          }`}
        >
          <div
            className={`w-5 h-5 sm:w-6 sm:h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
              data.termsAccepted
                ? 'border-[#44646c] bg-[#44646c]'
                : 'border-gray-300 bg-white'
            }`}
          >
            {data.termsAccepted && <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />}
          </div>
          <div>
            <p className="text-sm sm:text-base text-gray-900">
              I have read and agree to the{' '}
              <span className="font-medium">Terms of Service</span>,{' '}
              <span className="font-medium">Privacy Policy</span>,{' '}
              <span className="font-medium">Provider Agreement</span>, and{' '}
              <span className="font-medium">Payment Terms</span>.
            </p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1.5 sm:mt-2">
              By checking this box, you confirm that you are authorized to provide services
              on behalf of your business.
            </p>
          </div>
        </div>

        {/* Important Notice */}
        <div className="p-3 sm:p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <h4 className="font-medium text-sm sm:text-base text-amber-800 mb-1">Important</h4>
          <p className="text-xs sm:text-sm text-amber-700">
            Once you accept these terms, your profile will be submitted for review.
            Our team typically reviews new providers within 24-48 hours.
          </p>
        </div>
      </div>
    </OnboardingStepWrapper>
  );
}
