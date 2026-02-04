'use client';

import { OnboardingStepProps } from '../types';
import OnboardingStepWrapper from '../OnboardingStepWrapper';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

type PolicyType = 'Flexible' | 'Moderate' | 'Strict';

const policies: {
  id: PolicyType;
  label: string;
  summary: string;
  details: string[];
}[] = [
  {
    id: 'Flexible',
    label: 'Flexible',
    summary: 'Full refund up to 7 days before event',
    details: [
      'Full refund if cancelled 7+ days before event',
      '50% refund if cancelled 3-7 days before event',
      'No refund if cancelled less than 3 days before',
    ],
  },
  {
    id: 'Moderate',
    label: 'Moderate',
    summary: 'Full refund up to 14 days before event',
    details: [
      'Full refund if cancelled 14+ days before event',
      '50% refund if cancelled 7-14 days before event',
      'No refund if cancelled less than 7 days before',
    ],
  },
  {
    id: 'Strict',
    label: 'Strict',
    summary: 'Full refund up to 30 days before event',
    details: [
      'Full refund if cancelled 30+ days before event',
      '50% refund if cancelled 14-30 days before event',
      'No refund if cancelled less than 14 days before',
    ],
  },
];

const depositOptions = [
  { value: '25', label: '25%' },
  { value: '50', label: '50%' },
  { value: '75', label: '75%' },
  { value: '100', label: '100%' },
];

export default function CancellationPolicy({
  data,
  updateData,
  onNext,
  onBack,
}: OnboardingStepProps) {
  const [expandedPolicy, setExpandedPolicy] = useState<PolicyType | null>(null);

  const isValid = data.cancellationPolicy !== '' && data.depositDueAtBooking !== '';

  const handlePolicySelect = (policyId: PolicyType) => {
    updateData({ cancellationPolicy: policyId });
  };

  const toggleExpanded = (policyId: PolicyType, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedPolicy(expandedPolicy === policyId ? null : policyId);
  };

  return (
    <OnboardingStepWrapper
      title="Set your cancellation policy"
      subtitle="Choose how cancellations are handled"
      onNext={onNext}
      onBack={onBack}
      canContinue={isValid}
    >
      <div className="mt-4 space-y-4 sm:space-y-6">
        {/* Cancellation Policy Cards */}
        <div className="space-y-2 sm:space-y-3">
          <label className="block text-xs sm:text-sm font-medium text-gray-700">
            Cancellation policy
          </label>

          {policies.map((policy) => {
            const isSelected = data.cancellationPolicy === policy.id;
            const isExpanded = expandedPolicy === policy.id;

            return (
              <div
                key={policy.id}
                onClick={() => handlePolicySelect(policy.id)}
                className={`relative rounded-xl border-2 cursor-pointer transition-all overflow-hidden active:scale-[0.99] ${
                  isSelected
                    ? 'border-[#44646c] bg-[#44646c]/5'
                    : 'border-gray-200 bg-white hover:border-gray-300 active:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between p-3 sm:p-4">
                  <div className="flex items-center gap-2.5 sm:gap-3 flex-1">
                    <div
                      className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        isSelected ? 'border-[#44646c] bg-[#44646c]' : 'border-gray-300'
                      }`}
                    >
                      {isSelected && <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-medium text-sm sm:text-base text-gray-900">{policy.label}</h4>
                      <p className="text-xs sm:text-sm text-gray-500 truncate">{policy.summary}</p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => toggleExpanded(policy.id, e)}
                    className="p-1.5 sm:p-2 hover:bg-gray-100 active:bg-gray-200 rounded-full transition-colors flex-shrink-0"
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                    )}
                  </button>
                </div>

                {isExpanded && (
                  <div className="px-3 sm:px-4 pb-3 sm:pb-4 pt-0">
                    <div className="pl-6 sm:pl-8 border-l-2 border-gray-200 ml-2 sm:ml-2.5">
                      <ul className="space-y-1.5 sm:space-y-2">
                        {policy.details.map((detail, index) => (
                          <li key={index} className="text-xs sm:text-sm text-gray-600">
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Deposit Selection */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">
            Deposit required at booking
          </label>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {depositOptions.map((option) => {
              const isSelected = data.depositDueAtBooking === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => updateData({ depositDueAtBooking: option.value })}
                  className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all active:scale-[0.97] ${
                    isSelected
                      ? 'bg-[#44646c] text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-200'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 sm:w-4 sm:h-4" />}
                  {option.label}
                </button>
              );
            })}
          </div>
          <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-gray-500">
            The remaining balance will be due before the event
          </p>
        </div>

        {/* Summary */}
        {isValid && (
          <div className="p-3 sm:p-4 bg-[#44646c]/10 rounded-xl border border-[#44646c]/20">
            <h4 className="font-medium text-sm sm:text-base text-gray-900 mb-1">Your policy</h4>
            <p className="text-xs sm:text-sm text-gray-600">
              {data.cancellationPolicy} cancellation with {data.depositDueAtBooking}% deposit required at booking.
            </p>
          </div>
        )}
      </div>
    </OnboardingStepWrapper>
  );
}
