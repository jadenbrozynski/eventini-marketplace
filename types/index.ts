export type ProviderCategory = 'FoodBeverage' | 'Entertainment' | 'Venues' | 'Vendors';

export interface Provider {
  id: string;
  providerSkeletonId?: string;

  // Business identity - different fields for different categories
  businessName?: string;
  stageName?: string;        // Entertainment
  venueName?: string;        // Venues
  vendorName?: string;       // Vendors

  // Contact info
  contactName?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;

  // Media
  imageUrls: string[];
  primaryImageUrl?: string;
  videoUrls?: string[];

  // Category and status
  category: ProviderCategory;
  isListed?: boolean;
  isActive?: boolean;
  approvalStatus?: 'pending' | 'approved' | 'rejected';
  featured?: boolean;

  // Ratings and reviews
  rating?: number;
  reviewCount?: number;

  // Business details
  yearsInBusiness?: string;
  serviceRadius?: number;
  specialFeatures?: string[];

  // Timestamps
  createdAt?: string;
  updatedAt?: string;
}

export interface UpcomingEvent {
  id: string;
  name: string;
  date: Date;
  location: string;
  time: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  notificationCount?: number;
}

// Helper function to get display name for a provider
export function getProviderDisplayName(provider: Provider): string {
  return provider.businessName ||
         provider.stageName ||
         provider.venueName ||
         provider.vendorName ||
         provider.contactName ||
         'Unnamed Provider';
}

// Helper function to get primary image URL
export function getProviderImage(provider: Provider): string | null {
  return provider.primaryImageUrl || provider.imageUrls?.[0] || null;
}

// Helper function to get location string
export function getProviderLocation(provider: Provider): string {
  if (provider.city && provider.state) {
    return `${provider.city}, ${provider.state}`;
  }
  return provider.city || provider.state || '';
}
