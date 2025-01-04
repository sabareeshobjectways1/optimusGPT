import React from 'react';
import { Send, StopCircle } from 'lucide-react';
import { MediaButtons } from './MediaButtons';

interface ChatInputProps {
  input: string;
  isLoading: boolean;
  isVoiceMode: boolean;
  onInputChange: (value: string) => void;
  onSubmit: () => void;
  onImageSelect: () => void;
  onCameraSelect: () => void;
  onVoiceToggle: () => void;
  onStopResponse: () => void;
}

export function ChatInput({
  input,
  isLoading,
  isVoiceMode,
  onInputChange,
  onSubmit,
  onImageSelect,
  onCameraSelect,
  onVoiceToggle,
  onStopResponse
}: ChatInputProps) {
  return (
    <div className="bg-white/80 backdrop-blur-lg border-t border-gray-100 p-4 transition-all duration-300">
      <div className="max-w-5xl mx-auto flex gap-2 items-center">
        <MediaButtons
          onImageClick={onImageSelect}
          onCameraClick={onCameraSelect}
          onVoiceClick={onVoiceToggle}
          isVoiceActive={isVoiceMode}
        />
        
        <div className="flex-1 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !isLoading && onSubmit()}
            placeholder={isVoiceMode ? "Listening..." : "Message Gemini..."}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 placeholder:text-gray-400"
            disabled={isLoading || isVoiceMode}
          />
        </div>
        
        <button
          onClick={isLoading ? onStopResponse : onSubmit}
          disabled={(!input.trim() && !isVoiceMode)}
          className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-sm"
        >
          {isLoading ? (
            <StopCircle className="w-5 h-5" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
}