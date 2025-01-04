import React from 'react';
import { Download } from 'lucide-react';

interface ImageMessageProps {
  imageUrl: string;
  alt?: string;
}

export function ImageMessage({ imageUrl, alt }: ImageMessageProps) {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'generated-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative group">
      <img
        src={imageUrl}
        alt={alt || "Generated image"}
        className="max-w-full sm:max-w-md rounded-lg shadow-md mb-4 animate-scaleIn"
      />
      <button
        onClick={handleDownload}
        className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
        title="Download image"
      >
        <Download className="w-4 h-4" />
      </button>
    </div>
  );
}