import React from 'react';
import { Camera, Mic, Image } from 'lucide-react';

interface MediaButtonsProps {
  onImageClick: () => void;
  onCameraClick: () => void;
  onVoiceClick: () => void;
  isVoiceActive: boolean;
}

export function MediaButtons({ 
  onImageClick, 
  onCameraClick, 
  onVoiceClick,
  isVoiceActive 
}: MediaButtonsProps) {
  return (
    <div className="flex gap-2">
      <button
        onClick={onImageClick}
        className="p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-blue-600 transition-all duration-200"
        title="Upload image"
      >
        <Image className="w-5 h-5" />
      </button>
      <button
        onClick={onCameraClick}
        className="p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-blue-600 transition-all duration-200"
        title="Take photo"
      >
        <Camera className="w-5 h-5" />
      </button>
      <button
        onClick={onVoiceClick}
        className={`p-2 rounded-full transition-all duration-200 ${
          isVoiceActive 
            ? 'bg-blue-100 text-blue-600' 
            : 'hover:bg-gray-100 text-gray-600 hover:text-blue-600'
        }`}
        title={isVoiceActive ? "Stop voice" : "Start voice"}
      >
        <Mic className="w-5 h-5" />
      </button>
    </div>
  );
}