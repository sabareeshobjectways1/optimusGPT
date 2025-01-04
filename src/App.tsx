import React from 'react';
import { Header } from './components/Header';
import { ChatMessage } from './components/ChatMessage';
import { ImageUpload } from './components/ImageUpload';
import { CameraCapture } from './components/CameraCapture';
import { ChatInput } from './components/ChatInput';
import { useChat } from './hooks/useChat';
import { ThemeProvider } from './contexts/ThemeContext';

export default function App() {
  const { 
    messages, 
    input, 
    isLoading,
    isVoiceMode,
    showImageUpload,
    showCamera,
    handleInputChange,
    handleSubmit,
    handleImageUpload,
    toggleVoiceMode,
    stopResponse,
    setShowImageUpload,
    setShowCamera
  } = useChat();

  return (
    <ThemeProvider>
      <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
        <Header />

        <main className="flex-1 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto py-6 px-4">
            <div className="max-w-5xl mx-auto space-y-6">
              {messages.map((message, index) => (
                <ChatMessage key={index} message={message} />
              ))}
            </div>
          </div>

          <ChatInput
            input={input}
            isLoading={isLoading}
            isVoiceMode={isVoiceMode}
            onInputChange={handleInputChange}
            onSubmit={() => handleSubmit(input)}
            onImageSelect={() => setShowImageUpload(true)}
            onCameraSelect={() => setShowCamera(true)}
            onVoiceToggle={toggleVoiceMode}
            onStopResponse={stopResponse}
          />
        </main>

        {showImageUpload && (
          <ImageUpload
            onImageUpload={handleImageUpload}
            onClose={() => setShowImageUpload(false)}
          />
        )}

        {showCamera && (
          <CameraCapture
            onCapture={handleImageUpload}
            onClose={() => setShowCamera(false)}
          />
        )}
      </div>
    </ThemeProvider>
  );
}