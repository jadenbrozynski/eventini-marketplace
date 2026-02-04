'use client';

import { OnboardingData } from '../types';
import OnboardingStepWrapper from '../OnboardingStepWrapper';

interface FewMoreDetailsProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const leadTimeOptions = [
  { id: '24-hours', label: '24 hours', description: 'Last-minute bookings welcome' },
  { id: '48-hours', label: '48 hours', description: 'Short notice is fine' },
  { id: '1-week', label: '1 week', description: 'Standard lead time' },
  { id: '2-weeks', label: '2 weeks', description: 'Need time to prepare' },
  { id: '1-month', label: '1 month+', description: 'Larger events only' },
];

const calendarOptions = [
  { id: 'instant', name: 'Instant booking', description: 'Clients can book available dates without approval', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
  { id: 'request', name: 'Request to book', description: 'Review and approve each booking request', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
  { id: 'inquiry', name: 'Inquiry only', description: 'Clients send inquiries, you follow up manually', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" /></svg> },
];

const dietaryOptions = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut-Free', 'Keto', 'Paleo', 'Halal', 'Kosher', 'Low Sodium'];

const traitOptions = [
  { id: 'organic', label: 'Organic', icon: '🌿' },
  { id: 'local', label: 'Locally Sourced', icon: '📍' },
  { id: 'fresh', label: 'Farm Fresh', icon: '🥬' },
  { id: 'artisanal', label: 'Artisanal', icon: '👨‍🍳' },
  { id: 'traditional', label: 'Traditional', icon: '📜' },
  { id: 'innovative', label: 'Innovative', icon: '💡' },
  { id: 'sustainable', label: 'Sustainable', icon: '♻️' },
  { id: 'family-style', label: 'Family Style', icon: '👨‍👩‍👧‍👦' },
];

export default function FewMoreDetails({ data, updateData, onNext, onBack }: FewMoreDetailsProps) {
  const toggleDietary = (option: string) => {
    const current = data.dietarySpecialties || [];
    if (current.includes(option)) updateData({ dietarySpecialties: current.filter(d => d !== option) });
    else updateData({ dietarySpecialties: [...current, option] });
  };

  const toggleTrait = (id: string) => {
    const current = data.traits || [];
    if (current.includes(id)) updateData({ traits: current.filter(t => t !== id) });
    else updateData({ traits: [...current, id] });
  };

  const isValid = Boolean(data.leadTime && data.calendarManagement);

  return (
    <OnboardingStepWrapper title="A few more details" subtitle="Help us understand how you operate" onNext={onNext} onBack={onBack} canContinue={isValid}>
      <div className="space-y-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Minimum lead time <span className="text-red-500">*</span></label>
          <p className="text-sm text-gray-500 mb-3">How much notice do you need before an event?</p>
          <div className="space-y-2">
            {leadTimeOptions.map((option) => (
              <button key={option.id} onClick={() => updateData({ leadTime: option.id })} className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all flex items-center justify-between ${data.leadTime === option.id ? 'border-[#44646c] bg-[#44646c]/5' : 'border-gray-200 hover:border-gray-300'}`}>
                <div><span className="font-medium text-gray-900">{option.label}</span><span className="text-sm text-gray-500 ml-2">— {option.description}</span></div>
                {data.leadTime === option.id && <svg className="w-5 h-5 text-[#44646c]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">How would you like to manage bookings? <span className="text-red-500">*</span></label>
          <p className="text-sm text-gray-500 mb-3">Choose how clients can book your services</p>
          <div className="space-y-3">
            {calendarOptions.map((option) => (
              <button key={option.id} onClick={() => updateData({ calendarManagement: option.id })} className={`w-full text-left p-4 rounded-xl border-2 transition-all ${data.calendarManagement === option.id ? 'border-[#44646c] bg-[#44646c]/5' : 'border-gray-200 hover:border-gray-300'}`}>
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${data.calendarManagement === option.id ? 'bg-[#44646c] text-white' : 'bg-gray-100 text-gray-600'}`}>{option.icon}</div>
                  <div className="flex-1"><h4 className="font-medium text-gray-900">{option.name}</h4><p className="text-sm text-gray-500">{option.description}</p></div>
                  {data.calendarManagement === option.id && <svg className="w-5 h-5 text-[#44646c] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Dietary accommodations</label>
          <p className="text-sm text-gray-500 mb-3">What dietary needs can you accommodate?</p>
          <div className="flex flex-wrap gap-2">
            {dietaryOptions.map((option) => <button key={option} onClick={() => toggleDietary(option)} className={`px-4 py-2.5 rounded-full border-2 text-sm font-medium transition-all ${data.dietarySpecialties?.includes(option) ? 'border-[#44646c] bg-[#44646c]/5 text-[#44646c]' : 'border-gray-200 hover:border-gray-300 text-gray-700'}`}>{option}</button>)}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">What makes you unique?</label>
          <p className="text-sm text-gray-500 mb-3">Select traits that describe your culinary approach</p>
          <div className="grid grid-cols-2 gap-2">
            {traitOptions.map((trait) => <button key={trait.id} onClick={() => toggleTrait(trait.id)} className={`px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all flex items-center gap-2 ${data.traits?.includes(trait.id) ? 'border-[#44646c] bg-[#44646c]/5 text-[#44646c]' : 'border-gray-200 hover:border-gray-300 text-gray-700'}`}><span>{trait.icon}</span>{trait.label}</button>)}
          </div>
        </div>
      </div>
    </OnboardingStepWrapper>
  );
}
