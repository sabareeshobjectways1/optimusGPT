import { useState, useCallback, useRef } from 'react';
import { Message } from '../types';
import { sendMessageToGemini } from '../services/geminiService';
import { streamResponse } from '../services/streamingService';
import { speechService } from '../services/speechService';
import { useAbortController } from './useAbortController';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const abortController = useAbortController();
  const processingRef = useRef(false);

  const stopResponse = useCallback(() => {
    abortController.abortCurrent();
    speechService.abort();
    setIsLoading(false);
    processingRef.current = false;
  }, [abortController]);

  const handleSubmit = async (text: string, imageData?: string) => {
    if (!text.trim() && !imageData) return;
    if (processingRef.current && isVoiceMode) return;

    processingRef.current = true;
    abortController.abortCurrent();

    const userMessage: Message = {
      role: 'user',
      content: text,
      timestamp: new Date(),
      image: imageData
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const controller = abortController.createController();

    try {
      const response = await sendMessageToGemini(text, imageData);
      
      if (controller.signal.aborted) return;

      const assistantMessage: Message = {
        role: 'assistant',
        content: '',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);

      let fullResponse = '';
      for await (const chunk of streamResponse(response)) {
        if (controller.signal.aborted) break;
        fullResponse = chunk;
        setMessages(prev => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          lastMessage.content = chunk;
          return newMessages;
        });
      }

      if (isVoiceMode && !controller.signal.aborted) {
        await speechService.speak(fullResponse);
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error:', error);
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: 'I apologize, but I encountered an error processing your request. Please try again.',
          timestamp: new Date()
        }]);
      }
    } finally {
      setIsLoading(false);
      processingRef.current = false;
    }
  };

  const handleImageUpload = useCallback((file: File, prompt: string) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target?.result as string;
      handleSubmit(prompt, imageData);
    };
    reader.readAsDataURL(file);
  }, [handleSubmit]);

  const toggleVoiceMode = useCallback(() => {
    setIsVoiceMode(prev => {
      const newVoiceMode = !prev;
      
      if (!newVoiceMode) {
        speechService.stopListening();
        speechService.stopSpeaking();
        processingRef.current = false;
      } else {
        const handleVoiceInput = (text: string) => {
          if (!processingRef.current) {
            handleSubmit(text);
          }
        };

        speechService.startListening(handleVoiceInput, () => {});
      }
      
      return newVoiceMode;
    });
  }, [handleSubmit]);

  return {
    messages,
    input,
    isLoading,
    isVoiceMode,
    showImageUpload,
    showCamera,
    handleInputChange: setInput,
    handleSubmit,
    handleImageUpload,
    toggleVoiceMode,
    stopResponse,
    setShowImageUpload,
    setShowCamera
  };
}