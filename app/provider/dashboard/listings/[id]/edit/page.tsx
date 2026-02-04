'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

// Types
interface ProviderFormData {
  // Basic Info
  businessName: string;
  stageName: string;
  venueName: string;
  vendorName: string;
  contactName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  website: string;
  yearsInBusiness: string;
  roleInBusiness: string;
  bio: string;

  // Category
  category: 'FoodBeverage' | 'Entertainment' | 'Venues' | 'Vendors';

  // Media
  photos: string[];
  videos: string[];

  // Social Media
  socialMedia: {
    instagram: string;
    facebook: string;
    tiktok: string;
    twitter: string;
    youtube: string;
  };

  // Service Area
  serviceRadius: string;
  mileageFee: string;
  leadTime: string;
  calendarManagement: string;

  // Food & Beverage specific
  cuisineTypes: string[];
  serviceStyles: string[];
  dietarySpecialties: string[];
  minimumGuarantee: string;

  // Entertainment specific
  entertainerType: string;
  musicGenres: string[];
  typicalSetDuration: string;
  setupTime: string;
  teardownTime: string;
  performanceFee: string;
  equipmentProvided: string[];

  // Venue specific
  venueCapacity: string;
  venueType: string;
  amenities: string[];

  // Vendors specific
  vendorServices: string[];

  // Owner Identity
  ownerIdentityTags: string[];

  // DNA Traits
  specialFeatures: string[];

  // Documents
  hasW9Form: boolean;
  w9FormStatus: 'verified' | 'pending' | 'denied';
  hasCertificateOfInsurance: boolean;
  insuranceStatus: 'verified' | 'pending' | 'denied';

  // Stripe / Payout
  stripeConnectStatus: 'none' | 'pending' | 'restricted' | 'active';

  // Status
  isActive: boolean;
  approvalStatus: 'pending' | 'approved' | 'rejected';
}

const defaultFormData: ProviderFormData = {
  businessName: '',
  stageName: '',
  venueName: '',
  vendorName: '',
  contactName: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  website: '',
  yearsInBusiness: '',
  roleInBusiness: '',
  bio: '',
  category: 'FoodBeverage',
  photos: [],
  videos: [],
  socialMedia: {
    instagram: '',
    facebook: '',
    tiktok: '',
    twitter: '',
    youtube: '',
  },
  serviceRadius: '',
  mileageFee: '',
  leadTime: '',
  calendarManagement: '',
  cuisineTypes: [],
  serviceStyles: [],
  dietarySpecialties: [],
  minimumGuarantee: '',
  entertainerType: '',
  musicGenres: [],
  typicalSetDuration: '',
  setupTime: '',
  teardownTime: '',
  performanceFee: '',
  equipmentProvided: [],
  venueCapacity: '',
  venueType: '',
  amenities: [],
  vendorServices: [],
  ownerIdentityTags: [],
  specialFeatures: [],
  hasW9Form: false,
  w9FormStatus: 'pending',
  hasCertificateOfInsurance: false,
  insuranceStatus: 'pending',
  stripeConnectStatus: 'none',
  isActive: true,
  approvalStatus: 'pending',
};

// Mock data
const mockListingData: Record<string, ProviderFormData> = {
  '1': {
    ...defaultFormData,
    businessName: 'Gourmet Delights Catering',
    category: 'FoodBeverage',
    contactName: 'Maria Rodriguez',
    phone: '(310) 555-0123',
    email: 'maria@gourmetdelights.com',
    address: '123 Culinary Ave',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90001',
    website: 'www.gourmetdelights.com',
    yearsInBusiness: '5+ years',
    roleInBusiness: 'Owner',
    bio: 'Award-winning catering service specializing in farm-to-table cuisine for weddings, corporate events, and private celebrations.',
    photos: [
      'https://images.unsplash.com/photo-1555244162-803834f70033?w=800',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800',
    ],
    socialMedia: {
      instagram: '@gourmetdelights',
      facebook: 'GourmetDelightsCatering',
      tiktok: '@gourmetdelights',
      twitter: '',
      youtube: '',
    },
    serviceRadius: '50',
    mileageFee: '$1.50/mile',
    leadTime: '2 weeks',
    calendarManagement: 'Google Calendar',
    cuisineTypes: ['American', 'Mediterranean', 'Asian Fusion'],
    serviceStyles: ['Buffet', 'Plated', 'Food Stations'],
    dietarySpecialties: ['Vegan', 'Gluten-Free', 'Kosher'],
    minimumGuarantee: '50 guests',
    ownerIdentityTags: ['Woman-Owned', 'Latina-Owned'],
    specialFeatures: ['Farm-to-Table', 'Sustainable Practices', 'Custom Menu Design'],
    hasW9Form: true,
    w9FormStatus: 'verified',
    hasCertificateOfInsurance: true,
    insuranceStatus: 'verified',
    stripeConnectStatus: 'active',
    isActive: true,
    approvalStatus: 'approved',
  },
  '2': {
    ...defaultFormData,
    businessName: 'Elite Event Productions',
    category: 'Entertainment',
    stageName: 'Elite Events',
    contactName: 'David Kim',
    phone: '(619) 555-0456',
    email: 'david@eliteevents.com',
    city: 'San Diego',
    state: 'CA',
    bio: 'Full-service entertainment and production company for unforgettable events.',
    photos: [
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800',
      'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800',
    ],
    entertainerType: 'DJ / MC',
    musicGenres: ['Top 40', 'Hip Hop', 'EDM', 'Latin'],
    typicalSetDuration: '4 hours',
    setupTime: '2 hours',
    teardownTime: '1 hour',
    performanceFee: '$1,500 - $3,000',
    equipmentProvided: ['Sound System', 'Lighting', 'Wireless Mics'],
    hasW9Form: true,
    w9FormStatus: 'verified',
    hasCertificateOfInsurance: false,
    insuranceStatus: 'pending',
    stripeConnectStatus: 'pending',
    isActive: true,
    approvalStatus: 'approved',
  },
  '3': {
    ...defaultFormData,
    stageName: 'DJ Spark',
    category: 'Entertainment',
    contactName: 'Jason Spark',
    phone: '(323) 555-0789',
    email: 'booking@djspark.com',
    city: 'Los Angeles',
    state: 'CA',
    bio: 'High-energy DJ bringing the party vibes to any event.',
    photos: [
      'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=800',
    ],
    entertainerType: 'DJ',
    musicGenres: ['EDM', 'House', 'Hip Hop'],
    hasW9Form: false,
    w9FormStatus: 'pending',
    hasCertificateOfInsurance: false,
    insuranceStatus: 'pending',
    stripeConnectStatus: 'none',
    isActive: false,
    approvalStatus: 'pending',
  },
  '4': {
    ...defaultFormData,
    businessName: 'Floral Dreams',
    category: 'Vendors',
    vendorName: 'Floral Dreams',
    contactName: 'Sarah Chen',
    phone: '(310) 555-0321',
    email: 'sarah@floraldreams.com',
    city: 'Santa Monica',
    state: 'CA',
    bio: 'Stunning floral arrangements and decor for weddings and special events.',
    photos: [
      'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=800',
      'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=800',
    ],
    vendorServices: ['Wedding Florals', 'Event Decor', 'Centerpieces', 'Bouquets'],
    hasW9Form: true,
    w9FormStatus: 'verified',
    hasCertificateOfInsurance: true,
    insuranceStatus: 'pending',
    stripeConnectStatus: 'active',
    isActive: true,
    approvalStatus: 'approved',
  },
};

// SVG Icons as components
const ArrowLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 19l-7-7 7-7"/>
  </svg>
);

const SaveIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
    <polyline points="17 21 17 13 7 13 7 21"/>
    <polyline points="7 3 7 8 15 8"/>
  </svg>
);

const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const ClockIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const AlertCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

const PlusIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const TrashIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
  </svg>
);

const UploadIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="17 8 12 3 7 8"/>
    <line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
);

const ExternalLinkIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

// Status Badge Component
function StatusBadge({ status, type }: { status: 'verified' | 'pending' | 'denied' | 'none' | 'active' | 'restricted'; type: 'document' | 'stripe' }) {
  const config = {
    verified: { label: 'Verified', bg: 'bg-emerald-50', text: 'text-emerald-700', icon: CheckCircleIcon },
    active: { label: 'Connected', bg: 'bg-emerald-50', text: 'text-emerald-700', icon: CheckCircleIcon },
    pending: { label: 'Pending', bg: 'bg-amber-50', text: 'text-amber-700', icon: ClockIcon },
    restricted: { label: 'Restricted', bg: 'bg-amber-50', text: 'text-amber-700', icon: AlertCircleIcon },
    denied: { label: 'Denied', bg: 'bg-red-50', text: 'text-red-700', icon: AlertCircleIcon },
    none: { label: 'Not Set Up', bg: 'bg-gray-100', text: 'text-gray-600', icon: ClockIcon },
  };

  const { label, bg, text, icon: Icon } = config[status] || config.pending;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${bg} ${text}`}>
      <Icon className="w-3.5 h-3.5" />
      {label}
    </span>
  );
}

// Document Card Component
function DocumentCard({
  title,
  description,
  status,
  onUpload,
  onView,
}: {
  title: string;
  description: string;
  status: 'verified' | 'pending' | 'denied';
  onUpload: () => void;
  onView?: () => void;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 hover:border-[#44646c]/30 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
          <p className="text-xs text-gray-500 mt-0.5">{description}</p>
          <div className="mt-2">
            <StatusBadge status={status} type="document" />
          </div>
        </div>
        <div className="flex gap-2">
          {status === 'verified' && onView && (
            <button
              onClick={onView}
              className="p-2 text-gray-500 hover:text-[#44646c] hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ExternalLinkIcon />
            </button>
          )}
          <button
            onClick={onUpload}
            className="px-3 py-1.5 text-xs font-medium text-[#44646c] bg-[#44646c]/10 rounded-lg hover:bg-[#44646c]/20 transition-colors"
          >
            {status === 'verified' ? 'Replace' : 'Upload'}
          </button>
        </div>
      </div>
    </div>
  );
}

// Input Field Component
function InputField({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#44646c] focus:ring-2 focus:ring-[#44646c]/20 transition-all"
      />
    </div>
  );
}

// Textarea Field Component
function TextareaField({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#44646c] focus:ring-2 focus:ring-[#44646c]/20 transition-all resize-none"
      />
    </div>
  );
}

// Chip Select Component
function ChipSelect({
  label,
  options,
  selected,
  onChange,
}: {
  label: string;
  options: { label: string; value: string }[];
  selected: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
              selected === option.value
                ? 'bg-[#44646c] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// Tag Input Component
function TagInput({
  label,
  tags,
  onChange,
  suggestions = [],
  placeholder = 'Add...',
}: {
  label: string;
  tags: string[];
  onChange: (tags: string[]) => void;
  suggestions?: string[];
  placeholder?: string;
}) {
  const [inputValue, setInputValue] = useState('');

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      onChange([...tags, tag]);
    }
    setInputValue('');
  };

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#44646c]/10 text-[#44646c] rounded-full text-sm font-medium"
          >
            {tag}
            <button
              onClick={() => removeTag(tag)}
              className="hover:bg-[#44646c]/20 rounded-full p-0.5 transition-colors"
            >
              <XIcon className="w-3.5 h-3.5" />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addTag(inputValue);
            }
          }}
          placeholder={placeholder}
          className="flex-1 px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#44646c] focus:ring-2 focus:ring-[#44646c]/20 transition-all"
        />
        <button
          onClick={() => addTag(inputValue)}
          disabled={!inputValue.trim()}
          className="px-4 py-2 bg-[#44646c] text-white rounded-xl text-sm font-medium hover:bg-[#3a565d] transition-colors disabled:opacity-50"
        >
          Add
        </button>
      </div>
      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {suggestions
            .filter((s) => !tags.includes(s))
            .slice(0, 6)
            .map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => addTag(suggestion)}
                className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs hover:bg-gray-200 transition-colors"
              >
                + {suggestion}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}

export default function EditListingPage() {
  const params = useParams();
  const router = useRouter();
  const listingId = params.id as string;

  const [formData, setFormData] = useState<ProviderFormData>(defaultFormData);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'services' | 'documents'>('general');
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const loadListing = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 300));
      const data = mockListingData[listingId];
      if (data) {
        setFormData(data);
      }
      setLoading(false);
    };
    loadListing();
  }, [listingId]);

  const updateFormData = <K extends keyof ProviderFormData>(field: K, value: ProviderFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
    setHasChanges(false);
  };

  const getDisplayName = () => {
    return formData.businessName || formData.stageName || formData.venueName || formData.vendorName || 'Unnamed';
  };

  const removePhoto = (index: number) => {
    updateFormData('photos', formData.photos.filter((_, i) => i !== index));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header Skeleton */}
        <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
                <div className="space-y-2">
                  <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-20 bg-gray-200 rounded-full animate-pulse" />
                <div className="h-10 w-24 bg-gray-200 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-6xl mx-auto">
            {/* Photo Grid Skeleton */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-6">
              <div className="grid grid-cols-4 gap-1 h-64">
                <div className="col-span-2 row-span-2 bg-gray-200 animate-pulse" />
                <div className="bg-gray-200 animate-pulse" />
                <div className="bg-gray-200 animate-pulse" />
                <div className="bg-gray-200 animate-pulse" />
                <div className="bg-gray-200 animate-pulse" />
              </div>
              <div className="p-4 border-t border-gray-100 flex items-center justify-between">
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-28 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>

            {/* Tabs Skeleton */}
            <div className="flex gap-1 p-1 bg-gray-100 rounded-xl mb-6 w-fit">
              <div className="h-10 w-28 bg-gray-200 rounded-lg animate-pulse" />
              <div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse" />
              <div className="h-10 w-40 bg-gray-200 rounded-lg animate-pulse" />
            </div>

            {/* Content Grid Skeleton */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Main Content Skeleton */}
              <div className="lg:col-span-2 space-y-6">
                {/* Card 1 */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                  <div className="h-5 w-40 bg-gray-200 rounded animate-pulse mb-4" />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2 space-y-2">
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                      <div className="h-10 w-full bg-gray-200 rounded-xl animate-pulse" />
                    </div>
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="space-y-2">
                        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                        <div className="h-10 w-full bg-gray-200 rounded-xl animate-pulse" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                  <div className="h-5 w-36 bg-gray-200 rounded animate-pulse mb-4" />
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="h-4 w-28 bg-gray-200 rounded animate-pulse" />
                      <div className="h-24 w-full bg-gray-200 rounded-xl animate-pulse" />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                        <div className="flex gap-2">
                          {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-10 w-20 bg-gray-200 rounded-xl animate-pulse" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                  <div className="h-5 w-28 bg-gray-200 rounded animate-pulse mb-4" />
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="space-y-2">
                        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                        <div className="h-10 w-full bg-gray-200 rounded-xl animate-pulse" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar Skeleton */}
              <div className="space-y-6">
                {/* Status Card */}
                <div className="bg-white rounded-2xl border border-gray-200 p-5">
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-4" />
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                      <div className="h-6 w-11 bg-gray-200 rounded-full animate-pulse" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                      <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Stats Card */}
                <div className="bg-white rounded-2xl border border-gray-200 p-5">
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-4" />
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                        <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Checklist Card */}
                <div className="bg-white rounded-2xl border border-gray-200 p-5">
                  <div className="h-4 w-36 bg-gray-200 rounded animate-pulse mb-4" />
                  <div className="space-y-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse" />
                        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Preview Button */}
                <div className="h-12 w-full bg-gray-200 rounded-xl animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const yearsOptions = [
    { label: 'Under 1 year', value: 'Under 1 year' },
    { label: '1-2 years', value: '1-2 years' },
    { label: '3-4 years', value: '3-4 years' },
    { label: '5+ years', value: '5+ years' },
  ];

  const roleOptions = [
    { label: 'Owner', value: 'Owner' },
    { label: 'Manager', value: 'Manager' },
    { label: 'Employee', value: 'Employee' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/provider/dashboard/listings')}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
              >
                <ArrowLeftIcon />
              </button>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Edit Listing</h1>
                <p className="text-sm text-gray-500">{getDisplayName()}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                formData.approvalStatus === 'approved'
                  ? 'bg-emerald-50 text-emerald-700'
                  : formData.approvalStatus === 'pending'
                  ? 'bg-amber-50 text-amber-700'
                  : 'bg-red-50 text-red-700'
              }`}>
                {formData.approvalStatus.charAt(0).toUpperCase() + formData.approvalStatus.slice(1)}
              </span>
              <button
                onClick={handleSave}
                disabled={!hasChanges || saving}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#44646c] text-white rounded-full text-sm font-semibold hover:bg-[#3a565d] transition-colors disabled:opacity-50"
              >
                {saving ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <SaveIcon />
                )}
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section with Photos */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-6">
            <div className="grid grid-cols-4 gap-1 h-64">
              {/* Main Photo */}
              <div className="col-span-2 row-span-2 relative group">
                {formData.photos[0] ? (
                  <Image
                    src={formData.photos[0]}
                    alt="Cover"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400">No cover photo</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <button className="opacity-0 group-hover:opacity-100 px-4 py-2 bg-white rounded-full text-sm font-medium shadow-lg transition-opacity">
                    Change Cover
                  </button>
                </div>
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-medium">
                  Cover Photo
                </div>
              </div>
              {/* Secondary Photos */}
              {[1, 2, 3, 4].map((index) => (
                <div key={index} className="relative group bg-gray-100">
                  {formData.photos[index] ? (
                    <>
                      <Image
                        src={formData.photos[index]}
                        alt={`Photo ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2">
                        <button
                          onClick={() => removePhoto(index)}
                          className="opacity-0 group-hover:opacity-100 p-2 bg-white rounded-full shadow-lg transition-opacity hover:bg-red-50"
                        >
                          <TrashIcon className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </>
                  ) : (
                    <button className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 hover:bg-gray-200 transition-colors">
                      <PlusIcon className="w-6 h-6" />
                      <span className="text-xs mt-1">Add</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-100 flex items-center justify-between">
              <p className="text-sm text-gray-500">{formData.photos.length} photos uploaded</p>
              <button className="text-sm font-medium text-[#44646c] hover:underline">
                Manage all photos
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 p-1 bg-gray-100 rounded-xl mb-6 w-fit">
            {(['general', 'services', 'documents'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab === 'general' ? 'General Info' : tab === 'services' ? 'Services & Menu' : 'Documents & Payout'}
              </button>
            ))}
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {activeTab === 'general' && (
                <>
                  {/* Business Information */}
                  <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <h2 className="text-base font-semibold text-gray-900 mb-4">Business Information</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <InputField
                          label={formData.category === 'Entertainment' ? 'Stage / Artist Name' : 'Business Name'}
                          value={formData.businessName || formData.stageName || formData.vendorName}
                          onChange={(v) => updateFormData('businessName', v)}
                          required
                        />
                      </div>
                      <InputField
                        label="Contact Name"
                        value={formData.contactName}
                        onChange={(v) => updateFormData('contactName', v)}
                      />
                      <InputField
                        label="Phone"
                        value={formData.phone}
                        onChange={(v) => updateFormData('phone', v)}
                        type="tel"
                      />
                      <InputField
                        label="Email"
                        value={formData.email}
                        onChange={(v) => updateFormData('email', v)}
                        type="email"
                      />
                      <InputField
                        label="Website"
                        value={formData.website}
                        onChange={(v) => updateFormData('website', v)}
                      />
                      <div className="sm:col-span-2">
                        <InputField
                          label="Street Address"
                          value={formData.address}
                          onChange={(v) => updateFormData('address', v)}
                        />
                      </div>
                      <InputField
                        label="City"
                        value={formData.city}
                        onChange={(v) => updateFormData('city', v)}
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <InputField
                          label="State"
                          value={formData.state}
                          onChange={(v) => updateFormData('state', v)}
                        />
                        <InputField
                          label="ZIP"
                          value={formData.zipCode}
                          onChange={(v) => updateFormData('zipCode', v)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* About & Experience */}
                  <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <h2 className="text-base font-semibold text-gray-900 mb-4">About & Experience</h2>
                    <div className="space-y-4">
                      <TextareaField
                        label="Bio / Description"
                        value={formData.bio}
                        onChange={(v) => updateFormData('bio', v)}
                        placeholder="Tell potential clients about your business, experience, and what makes you unique..."
                        rows={5}
                      />
                      <div className="grid sm:grid-cols-2 gap-4">
                        <ChipSelect
                          label="Years in Business"
                          options={yearsOptions}
                          selected={formData.yearsInBusiness}
                          onChange={(v) => updateFormData('yearsInBusiness', v)}
                        />
                        <ChipSelect
                          label="Your Role"
                          options={roleOptions}
                          selected={formData.roleInBusiness}
                          onChange={(v) => updateFormData('roleInBusiness', v)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <h2 className="text-base font-semibold text-gray-900 mb-4">Social Media</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <InputField
                        label="Instagram"
                        value={formData.socialMedia.instagram}
                        onChange={(v) => updateFormData('socialMedia', { ...formData.socialMedia, instagram: v })}
                        placeholder="@username"
                      />
                      <InputField
                        label="Facebook"
                        value={formData.socialMedia.facebook}
                        onChange={(v) => updateFormData('socialMedia', { ...formData.socialMedia, facebook: v })}
                        placeholder="Page name or URL"
                      />
                      <InputField
                        label="TikTok"
                        value={formData.socialMedia.tiktok}
                        onChange={(v) => updateFormData('socialMedia', { ...formData.socialMedia, tiktok: v })}
                        placeholder="@username"
                      />
                      <InputField
                        label="YouTube"
                        value={formData.socialMedia.youtube}
                        onChange={(v) => updateFormData('socialMedia', { ...formData.socialMedia, youtube: v })}
                        placeholder="Channel URL"
                      />
                    </div>
                  </div>

                  {/* Owner Identity */}
                  <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <h2 className="text-base font-semibold text-gray-900 mb-1">Owner Identity & Representation</h2>
                    <p className="text-sm text-gray-500 mb-4">Help clients find businesses that represent their values</p>
                    <TagInput
                      label="Identity Tags"
                      tags={formData.ownerIdentityTags}
                      onChange={(v) => updateFormData('ownerIdentityTags', v)}
                      suggestions={['Woman-Owned', 'Minority-Owned', 'Veteran-Owned', 'LGBTQ+-Owned', 'Family-Owned', 'Black-Owned']}
                    />
                  </div>
                </>
              )}

              {activeTab === 'services' && (
                <>
                  {/* Service Area */}
                  <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <h2 className="text-base font-semibold text-gray-900 mb-4">Service Area & Availability</h2>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <InputField
                        label="Service Radius (miles)"
                        value={formData.serviceRadius}
                        onChange={(v) => updateFormData('serviceRadius', v)}
                        placeholder="e.g., 50"
                      />
                      <InputField
                        label="Mileage Fee"
                        value={formData.mileageFee}
                        onChange={(v) => updateFormData('mileageFee', v)}
                        placeholder="e.g., $1.50/mile"
                      />
                      <InputField
                        label="Lead Time Required"
                        value={formData.leadTime}
                        onChange={(v) => updateFormData('leadTime', v)}
                        placeholder="e.g., 2 weeks"
                      />
                    </div>
                  </div>

                  {/* Category-specific sections */}
                  {formData.category === 'FoodBeverage' && (
                    <>
                      <div className="bg-white rounded-2xl border border-gray-200 p-6">
                        <h2 className="text-base font-semibold text-gray-900 mb-4">Cuisine & Service Style</h2>
                        <div className="space-y-6">
                          <TagInput
                            label="Cuisine Types"
                            tags={formData.cuisineTypes}
                            onChange={(v) => updateFormData('cuisineTypes', v)}
                            suggestions={['American', 'Italian', 'Mexican', 'Asian', 'Mediterranean', 'BBQ', 'Seafood']}
                          />
                          <TagInput
                            label="Service Styles"
                            tags={formData.serviceStyles}
                            onChange={(v) => updateFormData('serviceStyles', v)}
                            suggestions={['Buffet', 'Plated', 'Food Stations', 'Family Style', 'Food Truck', 'Drop-off']}
                          />
                          <TagInput
                            label="Dietary Specialties"
                            tags={formData.dietarySpecialties}
                            onChange={(v) => updateFormData('dietarySpecialties', v)}
                            suggestions={['Vegan', 'Vegetarian', 'Gluten-Free', 'Kosher', 'Halal', 'Nut-Free']}
                          />
                          <InputField
                            label="Minimum Guest Guarantee"
                            value={formData.minimumGuarantee}
                            onChange={(v) => updateFormData('minimumGuarantee', v)}
                            placeholder="e.g., 50 guests"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {formData.category === 'Entertainment' && (
                    <div className="bg-white rounded-2xl border border-gray-200 p-6">
                      <h2 className="text-base font-semibold text-gray-900 mb-4">Performance Details</h2>
                      <div className="space-y-6">
                        <InputField
                          label="Entertainer Type"
                          value={formData.entertainerType}
                          onChange={(v) => updateFormData('entertainerType', v)}
                          placeholder="e.g., DJ, Live Band, Magician"
                        />
                        <TagInput
                          label="Music Genres"
                          tags={formData.musicGenres}
                          onChange={(v) => updateFormData('musicGenres', v)}
                          suggestions={['Top 40', 'Hip Hop', 'EDM', 'R&B', 'Rock', 'Jazz', 'Latin', 'Country']}
                        />
                        <div className="grid sm:grid-cols-3 gap-4">
                          <InputField
                            label="Set Duration"
                            value={formData.typicalSetDuration}
                            onChange={(v) => updateFormData('typicalSetDuration', v)}
                            placeholder="e.g., 4 hours"
                          />
                          <InputField
                            label="Setup Time"
                            value={formData.setupTime}
                            onChange={(v) => updateFormData('setupTime', v)}
                            placeholder="e.g., 2 hours"
                          />
                          <InputField
                            label="Teardown Time"
                            value={formData.teardownTime}
                            onChange={(v) => updateFormData('teardownTime', v)}
                            placeholder="e.g., 1 hour"
                          />
                        </div>
                        <TagInput
                          label="Equipment Provided"
                          tags={formData.equipmentProvided}
                          onChange={(v) => updateFormData('equipmentProvided', v)}
                          suggestions={['Sound System', 'Lighting', 'Microphones', 'DJ Equipment', 'Fog Machine']}
                        />
                        <InputField
                          label="Performance Fee Range"
                          value={formData.performanceFee}
                          onChange={(v) => updateFormData('performanceFee', v)}
                          placeholder="e.g., $1,500 - $3,000"
                        />
                      </div>
                    </div>
                  )}

                  {formData.category === 'Vendors' && (
                    <div className="bg-white rounded-2xl border border-gray-200 p-6">
                      <h2 className="text-base font-semibold text-gray-900 mb-4">Services Offered</h2>
                      <TagInput
                        label="Services"
                        tags={formData.vendorServices}
                        onChange={(v) => updateFormData('vendorServices', v)}
                        suggestions={['Wedding Florals', 'Event Decor', 'Centerpieces', 'Photo Booth', 'Event Planning']}
                      />
                    </div>
                  )}

                  {/* Special Features */}
                  <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <h2 className="text-base font-semibold text-gray-900 mb-1">What Makes You Unique</h2>
                    <p className="text-sm text-gray-500 mb-4">Highlight your special features and differentiators</p>
                    <TagInput
                      label="Special Features"
                      tags={formData.specialFeatures}
                      onChange={(v) => updateFormData('specialFeatures', v)}
                      suggestions={['Farm-to-Table', 'Sustainable', 'Award-Winning', 'Custom Menus', 'Bilingual']}
                    />
                  </div>
                </>
              )}

              {activeTab === 'documents' && (
                <>
                  {/* Required Documents */}
                  <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <h2 className="text-base font-semibold text-gray-900 mb-1">Required Documents</h2>
                    <p className="text-sm text-gray-500 mb-4">These documents are required to receive bookings</p>
                    <div className="space-y-3">
                      <DocumentCard
                        title="W-9 Form"
                        description="Required for tax reporting purposes"
                        status={formData.w9FormStatus}
                        onUpload={() => {}}
                        onView={formData.hasW9Form ? () => {} : undefined}
                      />
                      <DocumentCard
                        title="Certificate of Insurance"
                        description="Liability insurance documentation"
                        status={formData.insuranceStatus}
                        onUpload={() => {}}
                        onView={formData.hasCertificateOfInsurance ? () => {} : undefined}
                      />
                    </div>
                  </div>

                  {/* Payout Setup */}
                  <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <h2 className="text-base font-semibold text-gray-900 mb-1">Payout Account</h2>
                    <p className="text-sm text-gray-500 mb-4">Connect your bank account to receive payments</p>
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-gray-900">Stripe Connect</span>
                            <StatusBadge status={formData.stripeConnectStatus} type="stripe" />
                          </div>
                          <p className="text-xs text-gray-500">
                            {formData.stripeConnectStatus === 'active'
                              ? 'Your payout account is connected and ready to receive payments.'
                              : formData.stripeConnectStatus === 'pending'
                              ? 'Your account setup is in progress. Complete verification to receive payments.'
                              : 'Set up your payout account to start receiving payments from bookings.'}
                          </p>
                        </div>
                        <button className="px-4 py-2 bg-[#44646c] text-white rounded-xl text-sm font-medium hover:bg-[#3a565d] transition-colors whitespace-nowrap">
                          {formData.stripeConnectStatus === 'active' ? 'Manage' : 'Set Up'}
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Status Card */}
              <div className="bg-white rounded-2xl border border-gray-200 p-5">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Listing Status</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Visibility</span>
                    <button
                      onClick={() => updateFormData('isActive', !formData.isActive)}
                      className={`relative w-11 h-6 rounded-full transition-colors ${
                        formData.isActive ? 'bg-[#44646c]' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                          formData.isActive ? 'translate-x-5' : ''
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Approval</span>
                    <span className={`text-sm font-medium ${
                      formData.approvalStatus === 'approved' ? 'text-emerald-600' :
                      formData.approvalStatus === 'pending' ? 'text-amber-600' : 'text-red-600'
                    }`}>
                      {formData.approvalStatus.charAt(0).toUpperCase() + formData.approvalStatus.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-2xl border border-gray-200 p-5">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Performance</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Profile Views</span>
                    <span className="text-sm font-semibold text-gray-900">342</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Bookings</span>
                    <span className="text-sm font-semibold text-gray-900">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Rating</span>
                    <span className="text-sm font-semibold text-gray-900">4.9</span>
                  </div>
                </div>
              </div>

              {/* Completion Checklist */}
              <div className="bg-white rounded-2xl border border-gray-200 p-5">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Completion Checklist</h3>
                <div className="space-y-2">
                  {[
                    { label: 'Business info', done: !!formData.businessName },
                    { label: 'Photos uploaded', done: formData.photos.length >= 3 },
                    { label: 'W-9 form', done: formData.w9FormStatus === 'verified' },
                    { label: 'Insurance', done: formData.insuranceStatus === 'verified' },
                    { label: 'Payout account', done: formData.stripeConnectStatus === 'active' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        item.done ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {item.done ? <CheckCircleIcon className="w-3.5 h-3.5" /> : <span className="w-2 h-2 bg-current rounded-full" />}
                      </div>
                      <span className={`text-sm ${item.done ? 'text-gray-900' : 'text-gray-500'}`}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preview Button */}
              <button className="w-full py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                Preview Listing
                <ExternalLinkIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
