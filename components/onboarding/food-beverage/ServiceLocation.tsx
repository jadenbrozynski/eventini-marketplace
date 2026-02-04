'use client';

import { useState } from 'react';
import { OnboardingStepProps } from '../types';
import OnboardingStepWrapper from '../OnboardingStepWrapper';
import { MapPin, Search } from 'lucide-react';

const citySuggestions = [
  { city: 'New York', state: 'NY' },
  { city: 'Los Angeles', state: 'CA' },
  { city: 'Chicago', state: 'IL' },
  { city: 'Houston', state: 'TX' },
  { city: 'Phoenix', state: 'AZ' },
  { city: 'Philadelphia', state: 'PA' },
  { city: 'San Antonio', state: 'TX' },
  { city: 'San Diego', state: 'CA' },
  { city: 'Dallas', state: 'TX' },
  { city: 'Austin', state: 'TX' },
  { city: 'San Francisco', state: 'CA' },
  { city: 'Seattle', state: 'WA' },
  { city: 'Denver', state: 'CO' },
  { city: 'Boston', state: 'MA' },
  { city: 'Atlanta', state: 'GA' },
  { city: 'Miami', state: 'FL' },
  { city: 'Portland', state: 'OR' },
  { city: 'Nashville', state: 'TN' },
];

export default function ServiceLocation({
  data,
  updateData,
  onNext,
  onBack,
}: OnboardingStepProps) {
  const [searchValue, setSearchValue] = useState(data.serviceLocation);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const isValid = data.city !== '' && data.state !== '';

  const filteredSuggestions = searchValue
    ? citySuggestions.filter(
        (s) =>
          s.city.toLowerCase().includes(searchValue.toLowerCase()) ||
          s.state.toLowerCase().includes(searchValue.toLowerCase())
      )
    : citySuggestions.slice(0, 6);

  const handleSelectLocation = (city: string, state: string) => {
    const location = `${city}, ${state}`;
    setSearchValue(location);
    updateData({
      serviceLocation: location,
      city,
      state,
    });
    setShowSuggestions(false);
  };

  const handleInputChange = (value: string) => {
    setSearchValue(value);
    setShowSuggestions(true);
    if (value !== data.serviceLocation) {
      updateData({
        serviceLocation: '',
        city: '',
        state: '',
      });
    }
  };

  return (
    <OnboardingStepWrapper
      title="Where will you offer your services?"
      subtitle="Enter your primary service location"
      onNext={onNext}
      onBack={onBack}
      canContinue={isValid}
    >
      <div className="mt-4 space-y-4">
        {/* Location Input */}
        <div className="relative">
          <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Search for a city..."
            className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#44646c] focus:border-transparent text-sm sm:text-base text-gray-900 placeholder-gray-400"
          />

          {showSuggestions && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-60 sm:max-h-64 overflow-y-auto">
              {filteredSuggestions.length > 0 ? (
                filteredSuggestions.map((suggestion) => (
                  <button
                    key={`${suggestion.city}-${suggestion.state}`}
                    onClick={() => handleSelectLocation(suggestion.city, suggestion.state)}
                    className="w-full flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-gray-50 active:bg-gray-100 transition-colors text-left"
                  >
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-900">
                      {suggestion.city}, {suggestion.state}
                    </span>
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-gray-500 text-sm">
                  No locations found
                </div>
              )}
            </div>
          )}
        </div>

        {/* Selected Location Display */}
        {data.city && data.state && (
          <div className="flex items-center gap-3 p-3 sm:p-4 bg-[#44646c]/10 rounded-xl border border-[#44646c]/20">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#44646c] flex items-center justify-center flex-shrink-0">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="min-w-0">
              <p className="font-medium text-sm sm:text-base text-gray-900 truncate">
                {data.city}, {data.state}
              </p>
              <p className="text-xs sm:text-sm text-gray-500">Primary service location</p>
            </div>
          </div>
        )}

        {/* Service Types Display */}
        {data.serviceTypes.length > 0 && (
          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs sm:text-sm font-medium text-gray-700 mb-2">Selected services:</p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {data.serviceTypes.map((serviceId) => (
                <span
                  key={serviceId}
                  className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm"
                >
                  {serviceId
                    .split('-')
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {showSuggestions && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowSuggestions(false)}
        />
      )}
    </OnboardingStepWrapper>
  );
}
