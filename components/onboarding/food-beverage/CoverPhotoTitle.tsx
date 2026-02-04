'use client';

import { useState } from 'react';
import { OnboardingStepProps } from '../types';
import OnboardingStepWrapper from '../OnboardingStepWrapper';
import { X } from 'lucide-react';

export default function CoverPhotoTitle({
  data,
  updateData,
  onNext,
  onBack,
}: OnboardingStepProps) {
  const [previewUrl, setPreviewUrl] = useState<string>(data.coverPhoto);

  const isValid = data.businessName.trim().length >= 3;
  const charCount = data.businessName.length;
  const maxChars = 50;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      updateData({ coverPhoto: url });
    }
  };

  const handleRemovePhoto = () => {
    setPreviewUrl('');
    updateData({ coverPhoto: '' });
  };

  const handleBusinessNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, maxChars);
    updateData({ businessName: value });
  };

  return (
    <OnboardingStepWrapper
      title="Add a cover photo and title"
      subtitle="Make a great first impression"
      onNext={onNext}
      onBack={onBack}
      canContinue={isValid}
    >
      <div className="mt-4 space-y-4 sm:space-y-6">
        {/* Cover Photo Upload */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
            Cover photo
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-3 border border-gray-300 rounded-xl text-sm"
          />

          {previewUrl && (
            <div className="relative mt-3">
              <img
                src={previewUrl}
                alt="Cover preview"
                className="w-full h-40 sm:h-48 object-cover rounded-xl"
              />
              <button
                onClick={handleRemovePhoto}
                className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100"
              >
                <X className="w-4 h-4 text-gray-700" />
              </button>
            </div>
          )}

          <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-gray-500">
            Recommended: 1600 x 900 pixels (16:9 ratio)
          </p>
        </div>

        {/* Business Name Input */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
            Business name
          </label>
          <input
            type="text"
            value={data.businessName}
            onChange={handleBusinessNameChange}
            placeholder="e.g., Maria's Catering Co."
            className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#44646c] focus:border-transparent text-sm sm:text-base text-gray-900 placeholder-gray-400"
          />
          <div className="flex justify-between mt-1">
            <p className="text-xs sm:text-sm text-gray-500">
              This will be displayed on your listing
            </p>
            <p className={`text-xs sm:text-sm ${charCount >= maxChars ? 'text-red-500' : 'text-gray-500'}`}>
              {charCount}/{maxChars}
            </p>
          </div>
        </div>

        {/* Preview */}
        {(previewUrl || data.businessName) && (
          <div className="p-3 sm:p-4 bg-gray-100 rounded-xl">
            <p className="text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">Preview</p>
            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
              {previewUrl && (
                <div className="h-20 sm:h-24 overflow-hidden">
                  <img
                    src={previewUrl}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-2.5 sm:p-3">
                <h4 className="font-semibold text-sm sm:text-base text-gray-900">
                  {data.businessName || 'Your Business Name'}
                </h4>
                <p className="text-xs sm:text-sm text-gray-500">
                  {data.city && data.state ? `${data.city}, ${data.state}` : 'Your Location'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </OnboardingStepWrapper>
  );
}
