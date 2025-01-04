import { RecognitionManager } from './recognition/recognitionManager';
import { SynthesisManager } from './speech/synthesisManager';
import type { RecognitionCallbacks } from './recognition/types';

class SpeechService {
  private recognition: RecognitionManager;
  private synthesis: SynthesisManager;
  private abortController: AbortController | null = null;

  constructor() {
    this.recognition = new RecognitionManager();
    this.synthesis = new SynthesisManager();
  }

  startListening(onResult: (text: string) => void, onEnd: () => void): void {
    const callbacks: RecognitionCallbacks = {
      onResult,
      onEnd
    };
    this.recognition.start(callbacks);
  }

  stopListening(): void {
    this.recognition.stop();
  }

  async speak(text: string): Promise<void> {
    const language = this.recognition.getState().lastDetectedLanguage;
    return this.synthesis.speak(text, language);
  }

  stopSpeaking(): void {
    this.synthesis.stop();
  }

  abort(): void {
    this.abortController?.abort();
    this.stopSpeaking();
    this.stopListening();
  }
}

export const speechService = new SpeechService();