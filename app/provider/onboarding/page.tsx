'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { OnboardingData, initialOnboardingData } from '@/components/onboarding/types';

// Step Components
import ProviderTypeSelection from '@/components/onboarding/food-beverage/ProviderTypeSelection';
import ServiceTypeSelection from '@/components/onboarding/food-beverage/ServiceTypeSelection';
import ServiceLocation from '@/components/onboarding/food-beverage/ServiceLocation';
import CreateListing from '@/components/onboarding/food-beverage/CreateListing';
import CoverPhotoTitle from '@/components/onboarding/food-beverage/CoverPhotoTitle';
import PhotosVideos from '@/components/onboarding/food-beverage/PhotosVideos';
import Qualifications from '@/components/onboarding/food-beverage/Qualifications';
import OnlineProfiles from '@/components/onboarding/food-beverage/OnlineProfiles';
import AboutYou from '@/components/onboarding/food-beverage/AboutYou';
import ServiceArea from '@/components/onboarding/food-beverage/ServiceArea';
import MenuManagement from '@/components/onboarding/food-beverage/MenuManagement';
import VendorDNA from '@/components/onboarding/food-beverage/VendorDNA';
import FewMoreDetails from '@/components/onboarding/food-beverage/FewMoreDetails';
import CancellationPolicy from '@/components/onboarding/food-beverage/CancellationPolicy';
import TermsConditions from '@/components/onboarding/food-beverage/TermsConditions';
import ReviewRequest from '@/components/onboarding/food-beverage/ReviewRequest';

const TOTAL_STEPS = 16;

export default function ProviderOnboardingPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<OnboardingData>(() => ({
    ...initialOnboardingData,
  }));

  // Set email from auth user
  useEffect(() => {
    if (user?.email) {
      setData(prev => ({ ...prev, email: user.email || '' }));
    }
  }, [user?.email]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  const updateData = (updates: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleComplete = () => {
    // TODO: Submit data to backend
    console.log('Onboarding complete:', data);
    router.push('/provider/dashboard');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-56px)] min-h-[calc(100dvh-56px)]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#44646c]" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const stepProps = {
    data,
    updateData,
    onNext: handleNext,
    onBack: handleBack,
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <ProviderTypeSelection {...stepProps} />;
      case 1:
        return <ServiceTypeSelection {...stepProps} />;
      case 2:
        return <ServiceLocation {...stepProps} />;
      case 3:
        return <CreateListing {...stepProps} />;
      case 4:
        return <CoverPhotoTitle {...stepProps} />;
      case 5:
        return <PhotosVideos {...stepProps} />;
      case 6:
        return <Qualifications {...stepProps} />;
      case 7:
        return <OnlineProfiles {...stepProps} />;
      case 8:
        return <AboutYou {...stepProps} />;
      case 9:
        return <ServiceArea {...stepProps} />;
      case 10:
        return <MenuManagement {...stepProps} />;
      case 11:
        return <VendorDNA {...stepProps} />;
      case 12:
        return <FewMoreDetails {...stepProps} />;
      case 13:
        return <CancellationPolicy {...stepProps} />;
      case 14:
        return <TermsConditions {...stepProps} />;
      case 15:
        return <ReviewRequest {...stepProps} onComplete={handleComplete} />;
      default:
        return <ProviderTypeSelection {...stepProps} />;
    }
  };

  return (
    <div className="relative">
      {/* Progress Bar - Responsive */}
      <div className="fixed top-[56px] sm:top-[64px] left-0 right-0 z-10 bg-white">
        <div className="w-full max-w-2xl mx-auto">
          <div className="h-1 bg-gray-200">
            <div
              className="h-full bg-[#44646c] transition-all duration-300 ease-out"
              style={{ width: `${((currentStep + 1) / TOTAL_STEPS) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="pt-1">
        {renderStep()}
      </div>
    </div>
  );
}
