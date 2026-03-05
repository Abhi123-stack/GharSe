import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, ChevronDown } from 'lucide-react';
import ChatMessage from './ChatMessage';
import { generateBotResponse } from '../utils/chatbotLogic';
import { useGetMenu } from '../hooks/useQueries';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const WELCOME_MESSAGE: Message = {
  id: 'welcome',
  text: "Namaste! 🙏 Welcome to **Gharse** — your home for authentic flavors!\n\nI can help you with:\n• Our **menu** and prices\n• Specific dish details\n• Ordering information\n\nWhat would you like to know?",
  sender: 'bot',
  timestamp: new Date(),
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { data: menuData } = useGetMenu();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      text: trimmed,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botText = generateBotResponse(trimmed, menuData || []);
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        text: botText,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600 + Math.random() * 400);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickReplies = ['Show Menu', 'Prices', 'Breakfast', 'Beverages'];

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 md:right-6 w-[340px] md:w-[380px] h-[520px] bg-card rounded-3xl shadow-2xl border border-border/50 flex flex-col z-50 chat-slide-up overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-brand-saffron-dark to-brand-saffron px-5 py-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="/assets/generated/gharse-logo.dim_512x512.png"
                  alt="Gharse"
                  className="w-10 h-10 rounded-full object-cover border-2 border-white/30"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm leading-tight">Gharse Support</h3>
                <p className="text-white/70 text-xs">Online • Typically replies instantly</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1 bg-background/50">
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                text={msg.text}
                sender={msg.sender}
                timestamp={msg.timestamp}
              />
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-saffron to-brand-saffron-dark flex items-center justify-center text-white text-xs font-bold shadow-sm">
                  G
                </div>
                <div className="bg-accent border border-border/50 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                  <div className="flex gap-1 items-center">
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div className="px-4 py-2 flex gap-2 overflow-x-auto flex-shrink-0 border-t border-border/30 bg-background/30">
            {quickReplies.map((reply) => (
              <button
                key={reply}
                onClick={() => {
                  setInput(reply);
                  setTimeout(() => {
                    const userMsg: Message = {
                      id: `user-${Date.now()}`,
                      text: reply,
                      sender: 'user',
                      timestamp: new Date(),
                    };
                    setMessages((prev) => [...prev, userMsg]);
                    setIsTyping(true);
                    setTimeout(() => {
                      const botText = generateBotResponse(reply, menuData || []);
                      const botMsg: Message = {
                        id: `bot-${Date.now()}`,
                        text: botText,
                        sender: 'bot',
                        timestamp: new Date(),
                      };
                      setMessages((prev) => [...prev, botMsg]);
                      setIsTyping(false);
                    }, 600);
                  }, 0);
                }}
                className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full border border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 font-medium"
              >
                {reply}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-border/50 flex items-center gap-2 bg-card flex-shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about our menu..."
              className="flex-1 bg-accent/50 border border-border/50 rounded-full px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim()}
              className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95 flex-shrink-0 shadow-sm"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-4 md:right-6 w-14 h-14 rounded-full bg-gradient-to-br from-brand-saffron to-brand-saffron-dark text-white shadow-brand hover:shadow-card-hover flex items-center justify-center z-50 transition-all duration-300 hover:scale-110 active:scale-95 animate-pulse-glow"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <ChevronDown className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>
    </>
  );
}
