'use client';

import { OnboardingData } from '../types';
import OnboardingStepWrapper from '../OnboardingStepWrapper';

interface ServiceAreaProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const radiusOptions = [10, 15, 25, 50, 75, 100];

export default function ServiceArea({ data, updateData, onNext, onBack }: ServiceAreaProps) {
  const isValid = data.serviceRadius > 0;

  return (
    <OnboardingStepWrapper title="Set your service area" subtitle="How far are you willing to travel for events?" onNext={onNext} onBack={onBack} canContinue={isValid}>
      <div className="space-y-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">Service radius from {data.city || 'your location'}</label>
          <div className="flex flex-wrap gap-3 mb-6">
            {radiusOptions.map((radius) => (
              <button key={radius} onClick={() => updateData({ serviceRadius: radius })} className={`px-5 py-3 rounded-xl border-2 text-sm font-medium transition-all ${data.serviceRadius === radius ? 'border-[#44646c] bg-[#44646c] text-white' : 'border-gray-200 hover:border-gray-300 text-gray-700'}`}>{radius} miles</button>
            ))}
          </div>
          <div className="bg-gray-50 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-600">Custom radius</span>
              <span className="text-lg font-semibold text-[#44646c]">{data.serviceRadius} miles</span>
            </div>
            <input type="range" min={5} max={150} step={5} value={data.serviceRadius} onChange={(e) => updateData({ serviceRadius: parseInt(e.target.value) })} className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#44646c]" />
            <div className="flex justify-between text-xs text-gray-500 mt-2"><span>5 mi</span><span>150 mi</span></div>
          </div>
        </div>

        <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-[#44646c]/10 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-[#44646c]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
              </div>
              <p className="text-sm text-gray-500">Your service area: <span className="font-medium">{data.serviceRadius} mile radius</span></p>
              <p className="text-xs text-gray-400 mt-1">Centered on {data.city || 'your location'}{data.state ? `, ${data.state}` : ''}</p>
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none"><div className="w-24 h-24 rounded-full border-2 border-[#44646c]/20 animate-ping" style={{ animationDuration: '3s' }}></div></div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none"><div className="w-32 h-32 rounded-full border border-[#44646c]/10"></div></div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none"><div className="w-48 h-48 rounded-full border border-[#44646c]/5"></div></div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-4">Travel fees (optional)</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1.5">Mileage fee</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-4 flex items-center text-gray-500">$</span>
                <input type="text" value={data.mileageFee} onChange={(e) => updateData({ mileageFee: e.target.value })} placeholder="0.00" className="w-full pl-8 pr-20 py-3 rounded-xl border border-gray-300 focus:border-[#44646c] focus:ring-1 focus:ring-[#44646c] outline-none transition-colors" />
                <span className="absolute inset-y-0 right-4 flex items-center text-gray-500">per mile</span>
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1.5">Flat service/travel fee</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-4 flex items-center text-gray-500">$</span>
                <input type="text" value={data.serviceFee} onChange={(e) => updateData({ serviceFee: e.target.value })} placeholder="0.00" className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-300 focus:border-[#44646c] focus:ring-1 focus:ring-[#44646c] outline-none transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </OnboardingStepWrapper>
  );
}
