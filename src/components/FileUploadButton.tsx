import React from 'react';

interface FileUploadButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

export function FileUploadButton({ children, onClick }: FileUploadButtonProps) {
  return (
    <button
      onClick={onClick}
      className="p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors duration-200"
    >
      {children}
    </button>
  );
}