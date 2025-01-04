import React from 'react';
import { X, Settings, HelpCircle, Github } from 'lucide-react';
import { ModelSelector } from './ModelSelector';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '../utils/classNames';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Drawer({ isOpen, onClose }: DrawerProps) {
  return (
    <>
      <div
        className={cn(
          "fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity z-40",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      <div
        className={cn(
          "fixed right-0 top-0 h-full w-80 shadow-2xl transition-transform duration-300 ease-in-out z-50",
          "bg-white dark:bg-gray-900",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="p-4 flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Settings</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Model</label>
              <ModelSelector />
            </div>

            
              
              <ThemeToggle />

              
            </div>
          </div>

          <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              <p>Version 1.0.0</p>
              <p className="mt-1">© Optimus GPT. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}