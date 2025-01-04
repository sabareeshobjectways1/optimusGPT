import React from 'react';
import { CopyButton } from './CopyButton';
import { cn } from '../utils/classNames';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  return (
    <div className="relative group">
      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <CopyButton 
          content={code} 
          className="bg-gray-800 hover:bg-gray-700 text-gray-300 shadow-lg" 
        />
      </div>
      <pre className={cn(
        "bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-xl overflow-x-auto my-4",
        "border border-gray-800 dark:border-gray-700"
      )}>
        <div className="flex items-center justify-between mb-2">
          {language && (
            <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
              {language}
            </span>
          )}
        </div>
        <code className={language ? `language-${language}` : ''}>
          {code}
        </code>
      </pre>
    </div>
  );
}