import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { cn } from '../utils/classNames';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors",
        "dark:text-gray-300 dark:hover:bg-gray-800",
        "text-gray-700 hover:bg-gray-100"
      )}
    >
      {theme === 'dark' ? (
        <>
          <Sun className="w-5 h-5" />
          <span>Light Mode</span>
        </>
      ) : (
        <>
          <Moon className="w-5 h-5" />
          <span>Dark Mode</span>
        </>
      )}
    </button>
  );
}