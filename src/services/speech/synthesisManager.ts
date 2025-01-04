export class SynthesisManager {
  private synthesis: SpeechSynthesis;
  private currentVoice: SpeechSynthesisVoice | null = null;

  constructor() {
    this.synthesis = window.speechSynthesis;
    this.setupVoices();
  }

  private setupVoices() {
    this.synthesis.addEventListener('voiceschanged', () => {
      this.currentVoice = this.synthesis.getVoices().find(voice => voice.default) || null;
    });
  }

  async speak(text: string, language: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
      let currentIndex = 0;

      const speakNextSentence = () => {
        if (currentIndex >= sentences.length) {
          resolve();
          return;
        }

        const utterance = new SpeechSynthesisUtterance(sentences[currentIndex]);
        utterance.lang = language;
        
        const voices = this.synthesis.getVoices();
        const voice = voices.find(v => v.lang.startsWith(language)) || 
                     voices.find(v => v.lang.startsWith(language.split('-')[0])) ||
                     this.currentVoice;
        
        if (voice) utterance.voice = voice;

        utterance.onend = () => {
          currentIndex++;
          speakNextSentence();
        };
        utterance.onerror = reject;
        
        this.synthesis.speak(utterance);
      };

      speakNextSentence();
    });
  }

  stop() {
    this.synthesis.cancel();
  }
}