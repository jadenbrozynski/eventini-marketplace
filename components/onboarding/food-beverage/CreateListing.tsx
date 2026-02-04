'use client';

import { OnboardingStepProps } from '../types';
import OnboardingStepWrapper from '../OnboardingStepWrapper';
import { Phone, Mail, Check } from 'lucide-react';

export default function CreateListing({
  data,
  updateData,
  onNext,
  onBack,
}: OnboardingStepProps) {
  const phoneDigits = data.phone.replace(/\D/g, '');
  const isValidPhone = phoneDigits.length === 10;
  const isValid = isValidPhone && data.email !== '';

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, '');
    const limited = digits.slice(0, 10);
    if (limited.length === 0) return '';
    if (limited.length <= 3) return `(${limited}`;
    if (limited.length <= 6) return `(${limited.slice(0, 3)}) ${limited.slice(3)}`;
    return `(${limited.slice(0, 3)}) ${limited.slice(3, 6)}-${limited.slice(6)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    updateData({ phone: formatted });
  };

  return (
    <OnboardingStepWrapper
      title="Create your listing"
      subtitle="Add your contact information"
      onNext={onNext}
      onBack={onBack}
      canContinue={isValid}
    >
      <div className="mt-4 space-y-4 sm:space-y-6">
        {/* Phone Number Input */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
            Phone number
          </label>
          <div className="relative">
            <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <input
              type="tel"
              value={data.phone}
              onChange={handlePhoneChange}
              placeholder="(555) 555-5555"
              className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#44646c] focus:border-transparent text-sm sm:text-base text-gray-900 placeholder-gray-400"
            />
            {isValidPhone && (
              <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#44646c] flex items-center justify-center">
                  <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
              </div>
            )}
          </div>
          <p className="mt-1 text-xs sm:text-sm text-gray-500">
            We&apos;ll use this to contact you about bookings
          </p>
        </div>

        {/* Email Display */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
            Email address
          </label>
          <div className="relative">
            <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <input
              type="email"
              value={data.email}
              disabled
              className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 border border-gray-200 rounded-xl bg-gray-50 text-sm sm:text-base text-gray-700 cursor-not-allowed"
            />
            <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2">
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#44646c] flex items-center justify-center">
                <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
            </div>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-gray-500">
            Connected via Google sign-in
          </p>
        </div>

        {/* Info Box */}
        <div className="p-3 sm:p-4 bg-gray-100 rounded-xl">
          <h4 className="font-medium text-sm sm:text-base text-gray-900 mb-1">Your privacy matters</h4>
          <p className="text-xs sm:text-sm text-gray-600">
            Your contact information is only shared with customers after they book your services.
          </p>
        </div>
      </div>
    </OnboardingStepWrapper>
  );
}
