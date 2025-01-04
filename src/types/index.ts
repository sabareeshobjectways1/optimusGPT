export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  image?: string;
  generatedImage?: boolean;
}

export interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
        inline_data?: {
          mime_type: string;
          data: string;
        };
      }[];
    };
  }[];
  error?: {
    message: string;
    status: string;
  };
}

export interface UploadState {
  file: File | null;
  preview: string;
  prompt: string;
}