'use client';

import { OnboardingStepProps } from '../types';
import OnboardingStepWrapper from '../OnboardingStepWrapper';
import { X, Check } from 'lucide-react';

const MIN_PHOTOS = 3;

export default function PhotosVideos({
  data,
  updateData,
  onNext,
  onBack,
}: OnboardingStepProps) {
  const photoCount = data.photos.length;
  const isValid = photoCount >= MIN_PHOTOS;

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPhotos: string[] = [];
      Array.from(files).forEach((file) => {
        const url = URL.createObjectURL(file);
        newPhotos.push(url);
      });
      updateData({ photos: [...data.photos, ...newPhotos] });
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newVideos: string[] = [];
      Array.from(files).forEach((file) => {
        const url = URL.createObjectURL(file);
        newVideos.push(url);
      });
      updateData({ videos: [...data.videos, ...newVideos] });
    }
  };

  const handleRemovePhoto = (index: number) => {
    const newPhotos = data.photos.filter((_, i) => i !== index);
    updateData({ photos: newPhotos });
  };

  const handleRemoveVideo = (index: number) => {
    const newVideos = data.videos.filter((_, i) => i !== index);
    updateData({ videos: newVideos });
  };

  return (
    <OnboardingStepWrapper
      title="Add photos and videos"
      subtitle="Show off your work with high-quality media"
      onNext={onNext}
      onBack={onBack}
      canContinue={isValid}
    >
      <div className="mt-4 space-y-4 sm:space-y-6">
        {/* Photo Requirement Indicator */}
        <div className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-full ${
          isValid ? 'bg-[#44646c]/10 text-[#44646c]' : 'bg-amber-50 text-amber-700'
        }`}>
          {isValid ? <Check className="w-4 h-4 sm:w-5 sm:h-5" /> : <Camera className="w-4 h-4 sm:w-5 sm:h-5" />}
          <span className="font-medium text-xs sm:text-sm">
            {photoCount} of {MIN_PHOTOS} photos minimum
          </span>
        </div>

        {/* Photos Section */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
            Photos (minimum {MIN_PHOTOS})
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handlePhotoChange}
            className="w-full p-3 border border-gray-300 rounded-xl text-sm"
          />

          {data.photos.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mt-3">
              {data.photos.map((photo, index) => (
                <div key={index} className="relative aspect-square rounded-xl overflow-hidden">
                  <img
                    src={photo}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => handleRemovePhoto(index)}
                    className="absolute top-1 right-1 w-6 h-6 bg-black/60 rounded-full flex items-center justify-center hover:bg-black/80"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Videos Section */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
            Videos <span className="text-gray-400">(optional)</span>
          </label>
          <input
            type="file"
            accept="video/*"
            multiple
            onChange={handleVideoChange}
            className="w-full p-3 border border-gray-300 rounded-xl text-sm"
          />

          {data.videos.length > 0 && (
            <div className="grid grid-cols-2 gap-2 mt-3">
              {data.videos.map((video, index) => (
                <div key={index} className="relative aspect-video rounded-xl overflow-hidden bg-gray-900">
                  <video src={video} className="w-full h-full object-cover" />
                  <button
                    onClick={() => handleRemoveVideo(index)}
                    className="absolute top-1 right-1 w-6 h-6 bg-black/60 rounded-full flex items-center justify-center hover:bg-black/80"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tips */}
        <div className="p-3 sm:p-4 bg-gray-100 rounded-xl">
          <h4 className="font-medium text-sm sm:text-base text-gray-900 mb-1.5 sm:mb-2">Photo tips</h4>
          <ul className="text-xs sm:text-sm text-gray-600 space-y-1">
            <li>• Use well-lit, high-resolution images</li>
            <li>• Show a variety of dishes or services</li>
            <li>• Include photos from real events</li>
            <li>• Avoid heavily filtered images</li>
          </ul>
        </div>
      </div>
    </OnboardingStepWrapper>
  );
}
