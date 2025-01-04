import { SupportedFileType, SUPPORTED_FILE_TYPES } from '../types/files';

export function getFileType(file: File): SupportedFileType | null {
  const { type: mimeType } = file;
  
  // Check each file type category
  for (const [fileType, config] of Object.entries(SUPPORTED_FILE_TYPES)) {
    const acceptedTypes = Object.entries(config.accept).flatMap(([mime, extensions]) => {
      return extensions.map(ext => ({
        mime,
        extension: ext.toLowerCase()
      }));
    });

    // Check if the file matches any of the accepted types
    const matches = acceptedTypes.some(({ mime, extension }) => {
      return mimeType === mime || file.name.toLowerCase().endsWith(extension);
    });

    if (matches) {
      return fileType as SupportedFileType;
    }
  }

  return null;
}