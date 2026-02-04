// Shared types for provider onboarding flow

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

export interface CateringPackage {
  id: string;
  name: string;
  description: string;
  pricePerPerson: number;
  minimumGuests: number;
  items: string[];
}

export interface OnboardingData {
  // Provider Type
  providerType: 'food-beverage' | 'entertainment' | 'venue' | 'vendor' | '';

  // Service Selection
  serviceTypes: string[];

  // Location
  serviceLocation: string;
  city: string;
  state: string;

  // Contact
  phone: string;
  email: string;

  // Business Info
  coverPhoto: string;
  businessName: string;
  photos: string[];
  videos: string[];

  // Qualifications
  yearsInBusiness: string;
  roleInBusiness: string;

  // Online Profiles
  website: string;
  instagram: string;
  facebook: string;
  tiktok: string;

  // About
  bio: string;
  cuisineTypes: string[];
  minimumGuarantee: string;

  // Service Area (used by existing ServiceArea.tsx)
  serviceRadius: number;
  mileageFee: string;
  serviceFee: string;

  // Menu (used by existing MenuManagement.tsx)
  aLaCarteMenu: MenuItem[];
  cateringPackages: CateringPackage[];
  taxRate: number;

  // Vendor DNA (used by existing VendorDNA.tsx)
  nonprofitFlexibility?: {
    reduceMinimum: boolean;
    reducedMinimumValue: number;
    waiveMinimum: boolean;
    discountedMenu: boolean;
    discountPercentageValue: number;
  };
  highVolumePartner?: {
    reduceMinimum: boolean;
    reducedMinimumValue: number;
    waiveMinimum: boolean;
  };

  // Few More Details (used by existing FewMoreDetails.tsx)
  leadTime: string;
  calendarManagement: string;
  traits: string[];
  dietarySpecialties: string[];

  // Cancellation Policy
  cancellationPolicy: 'Flexible' | 'Moderate' | 'Strict' | '';
  depositDueAtBooking: string;

  // Terms
  termsAccepted: boolean;
}

export interface OnboardingStepProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const initialOnboardingData: OnboardingData = {
  providerType: '',
  serviceTypes: [],
  serviceLocation: '',
  city: '',
  state: '',
  phone: '',
  email: '',
  coverPhoto: '',
  businessName: '',
  photos: [],
  videos: [],
  yearsInBusiness: '',
  roleInBusiness: '',
  website: '',
  instagram: '',
  facebook: '',
  tiktok: '',
  bio: '',
  cuisineTypes: [],
  minimumGuarantee: '',
  serviceRadius: 25,
  mileageFee: '',
  serviceFee: '',
  aLaCarteMenu: [],
  cateringPackages: [],
  taxRate: 0,
  nonprofitFlexibility: {
    reduceMinimum: false,
    reducedMinimumValue: 0,
    waiveMinimum: false,
    discountedMenu: false,
    discountPercentageValue: 0,
  },
  highVolumePartner: {
    reduceMinimum: false,
    reducedMinimumValue: 0,
    waiveMinimum: false,
  },
  leadTime: '',
  calendarManagement: '',
  traits: [],
  dietarySpecialties: [],
  cancellationPolicy: '',
  depositDueAtBooking: '',
  termsAccepted: false,
};
