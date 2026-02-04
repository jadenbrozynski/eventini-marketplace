'use client';

import { OnboardingStepProps } from '../types';
import OnboardingStepWrapper from '../OnboardingStepWrapper';
import { Check } from 'lucide-react';

const cuisineTypes = [
  'American',
  'Mexican',
  'Italian',
  'Asian',
  'Mediterranean',
  'BBQ',
  'Seafood',
  'Southern',
  'French',
  'Indian',
  'Caribbean',
  'Middle Eastern',
  'Fusion',
  'Farm-to-Table',
  'Other',
];

export default function AboutYou({
  data,
  updateData,
  onNext,
  onBack,
}: OnboardingStepProps) {
  const bioLength = data.bio.length;
  const maxBioLength = 500;
  const minBioLength = 50;
  const isValid = data.bio.length >= minBioLength;

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value.slice(0, maxBioLength);
    updateData({ bio: value });
  };

  const handleCuisineToggle = (cuisine: string) => {
    const current = data.cuisineTypes;
    if (current.includes(cuisine)) {
      updateData({ cuisineTypes: current.filter((c) => c !== cuisine) });
    } else {
      updateData({ cuisineTypes: [...current, cuisine] });
    }
  };

  const handleMinimumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    updateData({ minimumGuarantee: value });
  };

  return (
    <OnboardingStepWrapper
      title="Tell us about yourself"
      subtitle="Share your story with potential customers"
      onNext={onNext}
      onBack={onBack}
      canContinue={isValid}
    >
      <div className="mt-4 space-y-4 sm:space-y-6">
        {/* Bio */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
            About your business
          </label>
          <textarea
            value={data.bio}
            onChange={handleBioChange}
            placeholder="Tell customers about your business, your culinary style, what makes you unique..."
            rows={4}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#44646c] focus:border-transparent text-sm sm:text-base text-gray-900 placeholder-gray-400 resize-none"
          />
          <div className="flex justify-between mt-1">
            <p className={`text-xs sm:text-sm ${bioLength < minBioLength ? 'text-amber-600' : 'text-[#44646c]'}`}>
              {bioLength < minBioLength
                ? `${minBioLength - bioLength} more characters needed`
                : 'Great description!'
              }
            </p>
            <p className={`text-xs sm:text-sm ${bioLength >= maxBioLength ? 'text-red-500' : 'text-gray-500'}`}>
              {bioLength}/{maxBioLength}
            </p>
          </div>
        </div>

        {/* Cuisine Types */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
            Cuisine types <span className="text-gray-400">(optional)</span>
          </label>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {cuisineTypes.map((cuisine) => {
              const isSelected = data.cuisineTypes.includes(cuisine);
              return (
                <button
                  key={cuisine}
                  onClick={() => handleCuisineToggle(cuisine)}
                  className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full border text-xs sm:text-sm font-medium transition-all active:scale-[0.97] ${
                    isSelected
                      ? 'border-[#44646c] bg-[#44646c] text-white'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400 active:bg-gray-100'
                  }`}
                >
                  {isSelected && <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3" />}
                  {cuisine}
                </button>
              );
            })}
          </div>
        </div>

        {/* Minimum Guarantee */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
            Minimum order amount <span className="text-gray-400">(optional)</span>
          </label>
          <div className="relative">
            <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm sm:text-base">
              $
            </div>
            <input
              type="text"
              value={data.minimumGuarantee}
              onChange={handleMinimumChange}
              placeholder="500"
              className="w-full pl-7 sm:pl-8 pr-3 sm:pr-4 py-3 sm:py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#44646c] focus:border-transparent text-sm sm:text-base text-gray-900 placeholder-gray-400"
            />
          </div>
          <p className="mt-1 text-xs sm:text-sm text-gray-500">
            Set a minimum order value if applicable
          </p>
        </div>
      </div>
    </OnboardingStepWrapper>
  );
}
