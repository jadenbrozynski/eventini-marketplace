'use client';

import { OnboardingData } from '../types';
import OnboardingStepWrapper from '../OnboardingStepWrapper';
import { useState } from 'react';

interface VendorDNAProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

type QuestionKey = 'nonprofit-flexible' | 'nonprofit-waive' | 'nonprofit-discount' | 'high-volume' | 'high-volume-flexible';

interface Question {
  id: QuestionKey;
  category: string;
  title: string;
  description: string;
  hasSlider?: boolean;
  sliderLabel?: string;
  sliderMax?: number;
  sliderUnit?: string;
}

const questions: Question[] = [
  { id: 'nonprofit-flexible', category: 'Community Impact', title: 'Would you consider reducing your minimum guarantee for nonprofit organizations?', description: 'Help support local nonprofits by offering more flexible terms.', hasSlider: true, sliderLabel: 'Reduced minimum', sliderMax: 100, sliderUnit: '%' },
  { id: 'nonprofit-waive', category: 'Community Impact', title: 'Would you consider waiving your minimum guarantee entirely for qualifying nonprofits?', description: 'Some providers waive minimums for registered 501(c)(3) organizations.' },
  { id: 'nonprofit-discount', category: 'Community Impact', title: 'Would you offer a discount on menu items for nonprofit events?', description: 'A menu discount can make your services more accessible to organizations with limited budgets.', hasSlider: true, sliderLabel: 'Discount percentage', sliderMax: 30, sliderUnit: '%' },
  { id: 'high-volume', category: 'High Volume Partner', title: 'Are you interested in being a high-volume partner?', description: 'High-volume partners commit to handling multiple events per week and receive priority placement.' },
  { id: 'high-volume-flexible', category: 'High Volume Partner', title: 'Would you offer flexible minimums for recurring high-volume bookings?', description: 'Clients booking multiple events may appreciate reduced minimums in exchange for guaranteed volume.', hasSlider: true, sliderLabel: 'Minimum reduction', sliderMax: 50, sliderUnit: '%' },
];

export default function VendorDNA({ data, updateData, onNext, onBack }: VendorDNAProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<QuestionKey, boolean | null>>({
    'nonprofit-flexible': data.nonprofitFlexibility?.reduceMinimum || null,
    'nonprofit-waive': data.nonprofitFlexibility?.waiveMinimum || null,
    'nonprofit-discount': data.nonprofitFlexibility?.discountedMenu || null,
    'high-volume': data.highVolumePartner?.reduceMinimum || null,
    'high-volume-flexible': data.highVolumePartner?.waiveMinimum || null,
  });
  const [sliderValues, setSliderValues] = useState<Record<string, number>>({
    'nonprofit-flexible': data.nonprofitFlexibility?.reducedMinimumValue || 25,
    'nonprofit-discount': data.nonprofitFlexibility?.discountPercentageValue || 10,
    'high-volume-flexible': data.highVolumePartner?.reducedMinimumValue || 20,
  });

  const question = questions[currentQuestion];
  const totalQuestions = questions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleAnswer = (answer: boolean) => {
    setAnswers(prev => ({ ...prev, [question.id]: answer }));
    if (answer && question.hasSlider) return;
    if (currentQuestion < totalQuestions - 1) setTimeout(() => setCurrentQuestion(prev => prev + 1), 300);
  };

  const handleSliderConfirm = () => {
    if (currentQuestion < totalQuestions - 1) setCurrentQuestion(prev => prev + 1);
  };

  const handleComplete = () => {
    updateData({
      nonprofitFlexibility: { reduceMinimum: answers['nonprofit-flexible'] || false, reducedMinimumValue: sliderValues['nonprofit-flexible'] || 0, waiveMinimum: answers['nonprofit-waive'] || false, discountedMenu: answers['nonprofit-discount'] || false, discountPercentageValue: sliderValues['nonprofit-discount'] || 0 },
      highVolumePartner: { reduceMinimum: answers['high-volume'] || false, reducedMinimumValue: sliderValues['high-volume-flexible'] || 0, waiveMinimum: answers['high-volume-flexible'] || false },
    });
    onNext();
  };

  const isLastQuestion = currentQuestion === totalQuestions - 1;
  const currentAnswer = answers[question.id];
  const showSlider = currentAnswer === true && question.hasSlider;

  return (
    <OnboardingStepWrapper title="Vendor DNA" subtitle="Help us match you with the right events" onNext={isLastQuestion && (currentAnswer !== null) ? handleComplete : undefined} onBack={currentQuestion > 0 ? () => setCurrentQuestion(prev => prev - 1) : onBack} canContinue={isLastQuestion && currentAnswer !== null} nextLabel={isLastQuestion ? 'Continue' : undefined}>
      <div className="space-y-6">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-2"><span>Question {currentQuestion + 1} of {totalQuestions}</span><span>{Math.round(progress)}%</span></div>
        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden mb-6"><div className="h-full bg-[#44646c] transition-all duration-300" style={{ width: `${progress}%` }} /></div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#44646c]/10 rounded-full"><svg className="w-4 h-4 text-[#44646c]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg><span className="text-sm font-medium text-[#44646c]">{question.category}</span></div>
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{question.title}</h3>
          <p className="text-gray-600 mb-6">{question.description}</p>
          <div className="flex gap-3">
            <button onClick={() => handleAnswer(true)} className={`flex-1 py-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${currentAnswer === true ? 'bg-[#44646c] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Yes</button>
            <button onClick={() => handleAnswer(false)} className={`flex-1 py-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${currentAnswer === false ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>No</button>
          </div>
          {showSlider && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between mb-3"><span className="text-sm font-medium text-gray-700">{question.sliderLabel}</span><span className="text-lg font-semibold text-[#44646c]">{sliderValues[question.id] || 0}{question.sliderUnit}</span></div>
              <input type="range" min={0} max={question.sliderMax} step={5} value={sliderValues[question.id] || 0} onChange={(e) => setSliderValues(prev => ({ ...prev, [question.id]: parseInt(e.target.value) }))} className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#44646c]" />
              <div className="flex justify-between text-xs text-gray-500 mt-1"><span>0{question.sliderUnit}</span><span>{question.sliderMax}{question.sliderUnit}</span></div>
              {!isLastQuestion && <button onClick={handleSliderConfirm} className="w-full mt-4 py-3 bg-[#44646c] text-white rounded-xl font-medium hover:bg-[#3a565d] transition-colors">Continue</button>}
            </div>
          )}
        </div>
        <div className="flex justify-center gap-2 pt-4">{questions.map((_, idx) => <button key={idx} onClick={() => setCurrentQuestion(idx)} className={`w-2.5 h-2.5 rounded-full transition-all ${idx === currentQuestion ? 'bg-[#44646c] w-6' : answers[questions[idx].id] !== null ? 'bg-[#44646c]/40' : 'bg-gray-300'}`} />)}</div>
      </div>
    </OnboardingStepWrapper>
  );
}
