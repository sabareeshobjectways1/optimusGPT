import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Image, X } from 'lucide-react';
import type { UploadState } from '../types';

interface ImageUploadProps {
  onImageUpload: (file: File, prompt: string) => void;
  onClose: () => void;
}

export function ImageUpload({ onImageUpload, onClose }: ImageUploadProps) {
  const [uploadState, setUploadState] = useState<UploadState>({
    file: null,
    preview: '',
    prompt: ''
  });

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadState(prev => ({
          ...prev,
          file,
          preview: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxFiles: 1
  });

  const handleSubmit = () => {
    if (uploadState.file && uploadState.prompt.trim()) {
      onImageUpload(uploadState.file, uploadState.prompt);
      onClose();
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
        
        <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
        
        {!uploadState.preview ? (
          <div
            {...getRootProps()}
            className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 transition-colors bg-gray-50"
          >
            <input {...getInputProps()} />
            <Image className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            {isDragActive ? (
              <p className="text-blue-600">Drop the image here...</p>
            ) : (
              <div>
                <p className="text-gray-600 mb-2">Drag & drop an image here, or click to select</p>
                <p className="text-sm text-gray-500">Supports: JPG, PNG, GIF, WebP</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <img 
              src={uploadState.preview} 
              alt="Preview" 
              className="w-full h-48 object-cover rounded-lg"
            />
            <textarea
              value={uploadState.prompt}
              onChange={(e) => setUploadState(prev => ({ ...prev, prompt: e.target.value }))}
              placeholder="What would you like to know about this image?"
              className="w-full p-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              rows={3}
            />
            <div className="flex gap-3">
              <button
                onClick={() => setUploadState({ file: null, preview: '', prompt: '' })}
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