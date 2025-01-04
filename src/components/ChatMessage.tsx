import React from 'react';
import { Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Message } from '../types';
import { cn } from '../utils/classNames';
import { CodeBlock } from './CodeBlock';
import { ImageMessage } from './ImageMessage';
import { CopyButton } from './CopyButton';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={cn(
      'flex gap-4 p-4 sm:p-6 rounded-2xl shadow-sm animate-fadeIn group relative',
      isUser ? 'bg-white' : 'bg-blue-50'
    )}>
      <div className="flex-shrink-0">
        <div className={cn(
          'w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-transform hover:scale-110',
          isUser ? 'bg-gradient-to-br from-blue-500 to-blue-600' : 'bg-gradient-to-br from-emerald-500 to-emerald-600'
        )}>
          {isUser ? (
            <User className="w-6 h-6 text-white" />
          ) : (
            <Bot className="w-6 h-6 text-white" />
          )}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="prose prose-sm sm:prose-base max-w-none">
          {message.image && (
            <ImageMessage imageUrl={message.image} />
          )}
          <ReactMarkdown
            components={{
              code: ({ node, inline, className, children, ...props }) => {
                const match = /language-(\w+)/.exec(className || '');
                return !inline ? (
                  <CodeBlock code={String(children)} language={match?.[1]} />
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <CopyButton content={message.content} />
      </div>
    </div>
  );
}