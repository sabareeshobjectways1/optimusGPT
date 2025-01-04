export class RecognitionManager {
  private recognition: SpeechRecognition | null = null;
  private state: RecognitionState = {
    isListening: false,
    lastTranscript: '',
    lastDetectedLanguage: 'en-US'
  };
  private restartTimeout: NodeJS.Timeout | null = null;
  private silenceTimeout: NodeJS.Timeout | null = null;
  private interimTranscript = '';
  private finalTranscript = '';

  constructor() {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      this.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      this.setupRecognition();
    }
  }

  private setupRecognition() {
    if (!this.recognition) return;
    
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'auto';
  }

  private resetSilenceTimeout(callbacks: RecognitionCallbacks) {
    if (this.silenceTimeout) {
      clearTimeout(this.silenceTimeout);
    }
    
    // Wait for 2 seconds of silence before sending the final transcript
    this.silenceTimeout = setTimeout(() => {
      if (this.finalTranscript.trim()) {
        callbacks.onResult(this.finalTranscript.trim());
        this.finalTranscript = '';
        this.interimTranscript = '';
      }
    }, 2000);
  }

  start(callbacks: RecognitionCallbacks) {
    if (!this.recognition || this.state.isListening) return;

    this.state.isListening = true;
    this.state.lastTranscript = '';
    this.interimTranscript = '';
    this.finalTranscript = '';

    this.recognition.onresult = (event) => {
      let interim = '';
      
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcript = event.results[i][0].transcript;
        
        if (event.results[i].isFinal) {
          this.finalTranscript += ' ' + transcript;
          if (event.results[i][0].lang) {
            this.state.lastDetectedLanguage = event.results[i][0].lang;
          }
        } else {
          interim += transcript;
        }
      }

      this.interimTranscript = interim;
      this.resetSilenceTimeout(callbacks);
    };

    this.recognition.onend = () => {
      if (this.state.isListening) {
        if (this.restartTimeout) {
          clearTimeout(this.restartTimeout);
        }
        
        this.restartTimeout = setTimeout(() => {
          if (this.state.isListening) {
            this.recognition?.start();
          }
        }, 150);
      }
    };

    try {
      this.recognition.start();
    } catch (error) {
      console.error('Recognition start error:', error);
      this.stop();
    }
  }

  stop() {
    this.state.isListening = false;
    if (this.restartTimeout) {
      clearTimeout(this.restartTimeout);
      this.restartTimeout = null;
    }
    if (this.silenceTimeout) {
      clearTimeout(this.silenceTimeout);
      this.silenceTimeout = null;
    }
    this.interimTranscript = '';
    this.finalTranscript = '';
    try {
      this.recognition?.stop();
    } catch (error) {
      console.error('Recognition stop error:', error);
    }
  }

  getState(): RecognitionState {
    return { ...this.state };
  }
}