'use client';

import { OnboardingStepProps } from '../types';
import OnboardingStepWrapper from '../OnboardingStepWrapper';

// Using the same SVG icons as the marketplace categories
const CategoryIcons = {
  food: (
    <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z" />
    </svg>
  ),
  entertainment: (
    <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
    </svg>
  ),
  venues: (
    <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21" />
    </svg>
  ),
  vendors: (
    <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
    </svg>
  ),
};

const providerTypes = [
  {
    id: 'food-beverage',
    label: 'Catering',
    description: 'Food trucks, catering, bartending',
    icon: CategoryIcons.food,
  },
  {
    id: 'entertainment',
    label: 'Entertainment',
    description: 'DJs, bands, performers, photo booths',
    icon: CategoryIcons.entertainment,
  },
  {
    id: 'venue',
    label: 'Venues',
    description: 'Event spaces, halls, outdoor locations',
    icon: CategoryIcons.venues,
  },
  {
    id: 'vendor',
    label: 'Vendors',
    description: 'Florists, decorators, custom goods',
    icon: CategoryIcons.vendors,
  },
];

export default function ProviderTypeSelection({
  data,
  updateData,
  onNext,
  onBack,
}: OnboardingStepProps) {
  const isValid = data.providerType !== '';

  const handleSelect = (typeId: string) => {
    updateData({ providerType: typeId as OnboardingStepProps['data']['providerType'] });
  };

  return (
    <OnboardingStepWrapper
      title="What type of provider are you?"
      subtitle="Select the category that best describes your services"
      onNext={onNext}
      onBack={onBack}
      canContinue={isValid}
      showBackButton={false}
    >
      <div className="space-y-2 sm:space-y-3 mt-4">
        {providerTypes.map((type) => {
          const isSelected = data.providerType === type.id;

          return (
            <button
              key={type.id}
              onClick={() => handleSelect(type.id)}
              className={`w-full flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3 sm:py-4 rounded-xl transition-all active:scale-[0.98] ${
                isSelected
                  ? 'bg-[#44646c] text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-200'
              }`}
            >
              <span className={`flex items-center justify-center ${isSelected ? 'text-white' : 'text-gray-500'}`}>
                {type.icon}
              </span>
              <div className="text-left flex-1 min-w-0">
                <h3 className={`font-semibold text-sm sm:text-base ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                  {type.label}
                </h3>
                <p className={`text-xs sm:text-sm truncate ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
                  {type.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </OnboardingStepWrapper>
  );
}
