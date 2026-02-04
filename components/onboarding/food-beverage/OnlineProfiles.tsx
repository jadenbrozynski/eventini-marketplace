'use client';

import { OnboardingStepProps } from '../types';
import OnboardingStepWrapper from '../OnboardingStepWrapper';
import { Globe, Instagram, Facebook } from 'lucide-react';

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

interface SocialInputProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  prefix?: string;
}

function SocialInput({ icon, label, value, onChange, placeholder, prefix }: SocialInputProps) {
  return (
    <div>
      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
        {label}
      </label>
      <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#44646c] focus-within:border-transparent">
        <div className="flex items-center gap-1.5 sm:gap-2 pl-3 sm:pl-4 pr-2 py-3 sm:py-4 bg-gray-50 border-r border-gray-300">
          {icon}
          {prefix && <span className="text-xs sm:text-sm text-gray-500">{prefix}</span>}
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-2 sm:px-3 py-3 sm:py-4 focus:outline-none text-sm sm:text-base text-gray-900 placeholder-gray-400"
        />
      </div>
    </div>
  );
}

export default function OnlineProfiles({
  data,
  updateData,
  onNext,
  onBack,
}: OnboardingStepProps) {
  const isValid = true;

  return (
    <OnboardingStepWrapper
      title="Add your online profiles"
      subtitle="Help customers find you across the web"
      onNext={onNext}
      onBack={onBack}
      canContinue={isValid}
      nextLabel="Continue"
    >
      <div className="mt-4 space-y-4 sm:space-y-5">
        <SocialInput
          icon={<Globe className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />}
          label="Website"
          value={data.website}
          onChange={(value) => updateData({ website: value })}
          placeholder="www.yourbusiness.com"
          prefix="https://"
        />

        <SocialInput
          icon={<Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />}
          label="Instagram"
          value={data.instagram}
          onChange={(value) => updateData({ instagram: value })}
          placeholder="username"
          prefix="@"
        />

        <SocialInput
          icon={<Facebook className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />}
          label="Facebook"
          value={data.facebook}
          onChange={(value) => updateData({ facebook: value })}
          placeholder="page-name"
          prefix="facebook.com/"
        />

        <SocialInput
          icon={<TikTokIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />}
          label="TikTok"
          value={data.tiktok}
          onChange={(value) => updateData({ tiktok: value })}
          placeholder="username"
          prefix="@"
        />

        {/* Skip Notice */}
        <div className="p-3 sm:p-4 bg-gray-100 rounded-xl">
          <p className="text-xs sm:text-sm text-gray-600">
            All fields are optional. You can add or update these later from your dashboard.
          </p>
        </div>
      </div>
    </OnboardingStepWrapper>
  );
}
