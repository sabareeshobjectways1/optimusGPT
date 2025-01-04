import React from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '../utils/classNames';
import { models } from '../config/models';

export function ModelSelector() {
  return (
    <div className="relative w-full">
      <select 
        className={cn(
          "w-full appearance-none border rounded-lg pl-10 pr-12 py-2.5 text-sm font-medium",
          "transition-all cursor-pointer",
          "dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200",
          "bg-white border-gray-200 text-gray-700",
          "hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        )}
        defaultValue="gemini-2.0-flash-exp"
      >
        {models.map((model) => (
          <option 
            key={model.id} 
            value={model.id} 
            className={cn(
              "py-2",
              model.isNew && "text-blue-600 dark:text-blue-400 font-semibold"
            )}
          >
            {model.name} {model.isNew && '(NEW)'}
          </option>
        ))}
      </select>
      <Sparkles className="w-4 h-4 text-blue-500 absolute left-3 top-1/2 -translate-y-1/2" />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg className="w-4 h-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}