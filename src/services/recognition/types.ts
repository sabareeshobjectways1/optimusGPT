export interface RecognitionCallbacks {
  onResult: (text: string) => void;
  onEnd: () => void;
}

export interface RecognitionState {
  isListening: boolean;
  lastTranscript: string;
  lastDetectedLanguage: string;
}