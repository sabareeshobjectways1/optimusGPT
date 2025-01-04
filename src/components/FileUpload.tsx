import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileText, X, Upload, AlertCircle } from 'lucide-react';
import { FileUploadState, SUPPORTED_FILE_TYPES } from '../types/files';
import { getFileType } from '../utils/fileUtils';

interface FileUploadProps {
  onFileUpload: (file: File, prompt: string) => void;
  onClose: () => void;
}

export function FileUpload({ onFileUpload, onClose }: FileUploadProps) {
  const [uploadState, setUploadState] = useState<FileUploadState>({
    file: null,
    preview: '',
    prompt: '',
    type: null
  });
  const [error, setError] = useState<string>('');

  const onDrop = (acceptedFiles: File[], rejectedFiles: any[]) => {
    if (rejectedFiles.length > 0) {
      setError('File type not supported or file is too large');
      return;
    }

    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const fileType = getFileType(file);
      
      if (!fileType) {
        setError('Unsupported file type');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadState({
          file,
          preview: e.target?.result as string,
          prompt: '',
          type: fileType
        });
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: Object.values(SUPPORTED_FILE_TYPES).reduce((acc, type) => ({ ...acc, ...type.accept }), {}),
    maxSize: Math.max(...Object.values(SUPPORTED_FILE_TYPES).map(type => type.maxSize)),
    multiple: false
  });

  const handleSubmit = () => {
    if (uploadState.file && uploadState.prompt.trim()) {
      onFileUpload(uploadState.file, uploadState.prompt);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>
        
        <h2 className="text-xl font-semibold mb-4">Upload File</h2>
        
        {!uploadState.file ? (
          <div
            {...getRootProps()}
            className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 transition-colors bg-gray-50"
          >
            <input {...getInputProps()} />
            <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            {isDragActive ? (
              <p className="text-blue-600">Drop the file here...</p>
            ) : (
              <div>
                <p className="text-gray-600 mb-2">Drag & drop a file here, or click to select</p>
                <p className="text-sm text-gray-500">
                  Supports: Images, Documents (DOC, DOCX, TXT), Spreadsheets (XLS, XLSX, CSV), PDFs
                </p>
                <p className="text-sm text-gray-500 mt-1">Max size: 10MB</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <FileText className="w-8 h-8 text-blue-500" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {uploadState.file.name}
                </p>
                <p className="text-sm text-gray-500">
                  {(uploadState.file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            
            <textarea
              value={uploadState.prompt}
              onChange={(e) => setUploadState(prev => ({ ...prev, prompt: e.target.value }))}
              placeholder="What would you like to know about this file?"
              className="w-full p-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              rows={3}
            />
            
            {error && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                <AlertCircle className="w-5 h-5" />
                <p className="text-sm">{error}</p>
              </div>
            )}
            
            <div className="flex gap-3">
              <button
                onClick={() => setUploadState({ file: null, preview: '', prompt: '', type: null })}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!uploadState.prompt.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex-1"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}