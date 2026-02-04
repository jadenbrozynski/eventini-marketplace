'use client';

import { OnboardingStepProps } from '../types';
import OnboardingStepWrapper from '../OnboardingStepWrapper';
import { Check } from 'lucide-react';

const serviceTypes = [
  { id: 'full-service-catering', label: 'Full Service Catering' },
  { id: 'food-truck', label: 'Food Truck' },
  { id: 'drop-off-catering', label: 'Drop Off Catering' },
  { id: 'pop-up-stall', label: 'Pop-Up Stall' },
  { id: 'beverage-provider', label: 'Beverage Provider' },
  { id: 'packaged-goods', label: 'Packaged Goods' },
  { id: 'beverage-truck', label: 'Beverage Truck' },
  { id: 'pop-up-bar', label: 'Pop-Up Bar' },
];

export default function ServiceTypeSelection({
  data,
  updateData,
  onNext,
  onBack,
}: OnboardingStepProps) {
  const isValid = data.serviceTypes.length > 0;

  const handleToggle = (serviceId: string) => {
    const current = data.serviceTypes;
    if (current.includes(serviceId)) {
      updateData({ serviceTypes: current.filter((id) => id !== serviceId) });
    } else {
      updateData({ serviceTypes: [...current, serviceId] });
    }
  };

  return (
    <OnboardingStepWrapper
      title="Which service will you provide?"
      subtitle="Select all that apply"
      onNext={onNext}
      onBack={onBack}
      canContinue={isValid}
    >
      <div className="flex flex-wrap gap-2 mt-4">
        {serviceTypes.map((service) => {
          const isSelected = data.serviceTypes.includes(service.id);

          return (
            <button
              key={service.id}
              onClick={() => handleToggle(service.id)}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full transition-all active:scale-[0.97] ${
                isSelected
                  ? 'bg-[#44646c] text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 active:bg-gray-200'
              }`}
            >
              {isSelected && <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
              <span className="text-xs sm:text-sm font-medium">{service.label}</span>
            </button>
          );
        })}
      </div>

      {/* Selected count */}
      {data.serviceTypes.length > 0 && (
        <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-500">
          {data.serviceTypes.length} service{data.serviceTypes.length !== 1 ? 's' : ''} selected
        </p>
      )}
    </OnboardingStepWrapper>
  );
}
