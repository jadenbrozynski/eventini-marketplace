'use client';

import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface OnboardingStepWrapperProps {
  title: string;
  subtitle: string;
  onNext?: () => void;
  onBack?: () => void;
  canContinue: boolean;
  nextLabel?: string;
  showBackButton?: boolean;
  children: React.ReactNode;
}

export default function OnboardingStepWrapper({
  title,
  subtitle,
  onNext,
  onBack,
  canContinue,
  nextLabel = 'Continue',
  showBackButton = true,
  children,
}: OnboardingStepWrapperProps) {
  return (
    <div className="flex flex-col min-h-[calc(100vh-56px)] sm:min-h-[calc(100vh-64px)] min-h-[calc(100dvh-56px)] sm:min-h-[calc(100dvh-64px)]">
      {/* Header */}
      <div className="px-4 sm:px-6 pt-6 sm:pt-8 pb-4 sm:pb-6">
        {showBackButton && onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 active:text-gray-900 mb-4 sm:mb-6 transition-colors -ml-1 p-1 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </button>
        )}
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1 sm:mb-2">{title}</h1>
        <p className="text-sm sm:text-base text-gray-500">{subtitle}</p>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-28 sm:pb-32">
        {children}
      </div>

      {/* Fixed Bottom Navigation - Safe area aware */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 sm:px-6 pt-3 sm:pt-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] sm:pb-[calc(1rem+env(safe-area-inset-bottom))]">
        <div className="w-full max-w-2xl mx-auto">
          <button
            onClick={onNext}
            disabled={!canContinue}
            className={`w-full h-11 sm:h-12 rounded-full text-sm sm:text-base font-semibold transition-all active:scale-[0.98] ${
              canContinue
                ? 'bg-[#44646c] text-white hover:bg-[#3a565d] shadow-md hover:shadow-lg active:bg-[#3a565d]'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {nextLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
