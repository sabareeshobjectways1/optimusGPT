import React, { useState, useEffect } from 'react';
import { Mic, MicOff, StopCircle } from 'lucide-react';
import { speechService } from '../services/speechService';
import { cn } from '../utils/classNames';

interface VoiceInputProps {
  onVoiceInput: (text: string) => void;
  isVoiceMode: boolean;
  onVoiceModeToggle: () => void;
  onStopResponse: () => void;
  isLoading: boolean;
}

export function VoiceInput({ 
  onVoiceInput, 
  isVoiceMode,
  onVoiceModeToggle,
  onStopResponse,
  isLoading 
}: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (!isVoiceMode) {
      handleStopListening();
    }
  }, [isVoiceMode]);

  const handleStartListening = () => {
    setIsListening(true);
    speechService.startListening(
      (text) => onVoiceInput(text),
      () => setIsListening(false)
    );
  };

  const handleStopListening = () => {
    setIsListening(false);
    speechService.stopListening();
  };

  if (!isVoiceMode) {
    return (
      <button
        onClick={onVoiceModeToggle}
        className="p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
        title="Enable voice mode"
      >
        <Mic className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="flex gap-2">
      {isLoading ? (
        <button
          onClick={onStopResponse}
          className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors animate-pulse"
          title="Stop response"
        >
          <StopCircle className="w-5 h-5" />
        </button>
      ) : (
        <button
          onClick={isListening ? handleStopListening : handleStartListening}
          className={cn(
            "p-2 rounded-full transition-colors",
            isListening 
              ? "bg-red-500 text-white hover:bg-red-600" 
              : "bg-blue-500 text-white hover:bg-blue-600"
          )}
          title={isListening ? "Stop listening" : "Start listening"}
        >
          {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>
      )}
      <button
        onClick={onVoiceModeToggle}
        className="p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
        title="Disable voice mode"
      >
        <MicOff className="w-5 h-5" />
      </button>
    </div>
  );
}