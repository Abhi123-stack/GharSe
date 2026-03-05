interface ChatMessageProps {
  text: string;
  sender: 'user' | 'bot';
  timestamp?: Date;
}

function formatText(text: string): React.ReactNode[] {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    // Bold text
    const parts = line.split(/\*\*(.*?)\*\*/g);
    const formatted = parts.map((part, j) =>
      j % 2 === 1 ? <strong key={j} className="font-semibold">{part}</strong> : part
    );
    return (
      <span key={i}>
        {formatted}
        {i < lines.length - 1 && <br />}
      </span>
    );
  });
}

export default function ChatMessage({ text, sender, timestamp }: ChatMessageProps) {
  const isUser = sender === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-saffron to-brand-saffron-dark flex items-center justify-center text-white text-xs font-bold mr-2 flex-shrink-0 mt-1 shadow-sm">
          G
        </div>
      )}
      <div className={`max-w-[80%] ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
        <div
          className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
            isUser
              ? 'bg-primary text-primary-foreground rounded-br-sm'
              : 'bg-accent text-foreground rounded-bl-sm border border-border/50'
          }`}
        >
          {formatText(text)}
        </div>
        {timestamp && (
          <span className="text-[10px] text-muted-foreground mt-1 px-1">
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        )}
      </div>
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-green to-brand-green-light flex items-center justify-center text-white text-xs font-bold ml-2 flex-shrink-0 mt-1 shadow-sm">
          U
        </div>
      )}
    </div>
  );
}
