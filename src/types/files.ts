export type SupportedFileType = 
  | 'image' 
  | 'document' 
  | 'spreadsheet' 
  | 'pdf';

export interface FileUploadState {
  file: File | null;
  preview: string;
  prompt: string;
  type: SupportedFileType | null;
}

export const SUPPORTED_FILE_TYPES = {
  image: {
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxSize: 5 * 1024 * 1024, // 5MB
  },
  document: {
    accept: {
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  },
  spreadsheet: {
    accept: {
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'text/csv': ['.csv']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  },
  pdf: {
    accept: {
      'application/pdf': ['.pdf']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  }
};