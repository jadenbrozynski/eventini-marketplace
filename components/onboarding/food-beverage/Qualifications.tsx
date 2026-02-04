'use client';

import { OnboardingStepProps } from '../types';
import OnboardingStepWrapper from '../OnboardingStepWrapper';
import { ChevronDown, Check } from 'lucide-react';
import { useState } from 'react';

const yearsOptions = [
  { value: 'less-than-1', label: 'Less than 1 year' },
  { value: '1-2', label: '1-2 years' },
  { value: '3-5', label: '3-5 years' },
  { value: '5-10', label: '5-10 years' },
  { value: '10-plus', label: '10+ years' },
];

const roleOptions = [
  { value: 'owner', label: 'Owner' },
  { value: 'manager', label: 'Manager' },
  { value: 'chef', label: 'Chef' },
  { value: 'event-coordinator', label: 'Event Coordinator' },
  { value: 'staff', label: 'Staff Member' },
  { value: 'other', label: 'Other' },
];

interface DropdownProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  placeholder: string;
}

function Dropdown({ label, value, options, onChange, placeholder }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((o) => o.value === value);

  return (
    <div className="relative">
      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
        {label}
      </label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 sm:px-4 py-3 sm:py-4 border border-gray-300 rounded-xl bg-white text-left focus:outline-none focus:ring-2 focus:ring-[#44646c] focus:border-transparent active:bg-gray-50"
      >
        <span className={`text-sm sm:text-base ${selectedOption ? 'text-gray-900' : 'text-gray-400'}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-20 max-h-60 sm:max-h-64 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-gray-50 active:bg-gray-100 transition-colors text-left"
              >
                <span className="text-sm sm:text-base text-gray-900">{option.label}</span>
                {value === option.value && (
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#44646c]" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function Qualifications({
  data,
  updateData,
  onNext,
  onBack,
}: OnboardingStepProps) {
  const isValid = data.yearsInBusiness !== '' && data.roleInBusiness !== '';

  return (
    <OnboardingStepWrapper
      title="Share your qualifications"
      subtitle="Help customers learn about your experience"
      onNext={onNext}
      onBack={onBack}
      canContinue={isValid}
    >
      <div className="mt-4 space-y-4 sm:space-y-6">
        <Dropdown
          label="Years in business"
          value={data.yearsInBusiness}
          options={yearsOptions}
          onChange={(value) => updateData({ yearsInBusiness: value })}
          placeholder="Select experience level"
        />

        <Dropdown
          label="Your role in the business"
          value={data.roleInBusiness}
          options={roleOptions}
          onChange={(value) => updateData({ roleInBusiness: value })}
          placeholder="Select your role"
        />

        {/* Experience Summary */}
        {isValid && (
          <div className="p-3 sm:p-4 bg-[#44646c]/10 rounded-xl border border-[#44646c]/20">
            <h4 className="font-medium text-sm sm:text-base text-gray-900 mb-1.5 sm:mb-2">Your profile</h4>
            <p className="text-xs sm:text-sm text-gray-600">
              {roleOptions.find((r) => r.value === data.roleInBusiness)?.label} with{' '}
              {yearsOptions.find((y) => y.value === data.yearsInBusiness)?.label.toLowerCase()} of experience
            </p>
          </div>
        )}
      </div>
    </OnboardingStepWrapper>
  );
}
