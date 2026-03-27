import { useState, useRef, useEffect } from 'react';
import { useAIStore } from '../store/aiStore';
import { useAuthStore } from '../store/authStore';
import {
  X, Send, Sparkles, Loader, ThumbsUp, ThumbsDown,
  RotateCcw, Copy, ChevronDown, MessageCircle
} from 'lucide-react';

const SUGGESTED_QUESTIONS = [
  'What samagri is needed for Ganesh Puja?',
  'Why do we do Kalash Sthapana?',
  'Explain the Gayatri Mantra',
  'What is Brahma Muhurta?',
  'How to perform Achamana?',
];

/** Parses markdown-ish AI response into styled React JSX */
function AIResponseContent({ content }) {
  const lines = content.split('\n');
  return (
    <div className="space-y-2 text-sm leading-relaxed">
      {lines.map((line, i) => {
        if (line.startsWith('## ')) {
          return <h4 key={i} className="text-orange-300 font-semibold text-xs uppercase tracking-wider mt-3 mb-1">{line.replace('## ', '')}</h4>;
        }
        if (line.startsWith('- ') || line.startsWith('* ')) {
          return <li key={i} className="text-orange-100/80 ml-3">• {line.slice(2)}</li>;
        }
        if (/^\d+\. /.test(line)) {
          return <p key={i} className="text-orange-100/80 ml-3">{line}</p>;
        }
        if (line.trim() === '') return <div key={i} className="h-1" />;
        if (/[\u0900-\u097F]/.test(line)) {
          return <p key={i} className="font-devanagari text-orange-300 text-base">{line}</p>;
        }
        return <p key={i} className="text-orange-100/80">{line}</p>;
      })}
    </div>
  );
}

export default function AIAssistant() {
  const { messages, isOpen, isLoading, closePanel, sendQuestion, clearMessages } = useAIStore();
  const { user } = useAuthStore();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const handleSend = async () => {
    const q = input.trim();
    if (!q || isLoading) return;
    setInput('');
    await sendQuestion(q, user?.userId);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop (mobile fullscreen) */}
      <div className="fixed inset-0 z-[9990] sm:hidden bg-black/60 backdrop-blur-sm"
        onClick={closePanel} />

      {/* Panel */}
      <div className="fixed z-[9991]
                      inset-0 sm:inset-auto sm:bottom-6 sm:right-6
                      sm:w-[420px] sm:h-[600px]
                      flex flex-col
                      bg-gradient-to-b from-stone-950 to-amber-950/30
                      border border-orange-500/30
                      sm:rounded-2xl shadow-sacred
                      animate-slide-up">

        {/* Header */}
        <div className="flex items-center justify-between p-4
                        border-b border-orange-500/20
                        bg-gradient-to-r from-amber-950/80 to-orange-950/80
                        sm:rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-saffron
                            flex items-center justify-center shadow-saffron animate-glow">
              <span className="text-xl">🙏</span>
            </div>
            <div>
              <h3 className="text-orange-200 font-semibold">Guru</h3>
              <p className="text-orange-400/60 text-xs">Vedic Ritual Assistant</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {messages.length > 0 && (
              <button onClick={clearMessages}
                className="p-1.5 text-orange-400/60 hover:text-orange-300 transition-colors">
                <RotateCcw size={15} />
              </button>
            )}
            <button onClick={closePanel}
              className="p-1.5 text-orange-400/60 hover:text-orange-300 transition-colors">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto rounded-full bg-orange-500/10 border border-orange-500/20
                              flex items-center justify-center mb-4 animate-float">
                <Sparkles size={28} className="text-orange-400" />
              </div>
              <p className="text-orange-300 font-medium mb-1">Ask Guru anything</p>
              <p className="text-orange-200/50 text-xs mb-6">
                About rituals, mantras, Sanskrit, or samagri
              </p>
              {/* Suggested questions */}
              <div className="space-y-2 text-left">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => { setInput(q); inputRef.current?.focus(); }}
                    className="w-full text-left px-3 py-2.5 rounded-xl
                               bg-orange-500/10 border border-orange-500/20
                               text-orange-200/70 text-xs
                               hover:bg-orange-500/15 hover:text-orange-200
                               transition-all duration-150">
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div key={i}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-saffron flex-shrink-0
                                  flex items-center justify-center shadow-saffron">
                    <span className="text-sm">🙏</span>
                  </div>
                )}
                <div className={`max-w-[85%] rounded-2xl px-4 py-3
                  ${msg.role === 'user'
                    ? 'bg-orange-500/20 border border-orange-500/30 text-orange-100 text-sm rounded-tr-sm'
                    : 'bg-stone-800/80 border border-orange-500/10 rounded-tl-sm'
                  }`}>
                  {msg.role === 'assistant'
                    ? <AIResponseContent content={msg.content} />
                    : <p className="text-sm">{msg.content}</p>
                  }

                  {msg.role === 'assistant' && (
                    <div className="flex items-center gap-2 mt-3 pt-2 border-t border-orange-500/10">
                      <button onClick={() => handleCopy(msg.content)}
                        className="p-1 text-orange-400/40 hover:text-orange-300 transition-colors">
                        <Copy size={12} />
                      </button>
                      <button className="p-1 text-orange-400/40 hover:text-green-400 transition-colors">
                        <ThumbsUp size={12} />
                      </button>
                      <button className="p-1 text-orange-400/40 hover:text-red-400 transition-colors">
                        <ThumbsDown size={12} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}

          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-saffron flex-shrink-0
                              flex items-center justify-center shadow-saffron">
                <span className="text-sm">🙏</span>
              </div>
              <div className="bg-stone-800/80 border border-orange-500/10 rounded-2xl rounded-tl-sm
                              px-4 py-3 flex items-center gap-2">
                <Loader size={14} className="text-orange-400 animate-spin" />
                <span className="text-orange-200/50 text-xs">Guru is thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t border-orange-500/15
                        bg-stone-900/80 sm:rounded-b-2xl">
          <div className="flex items-end gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about mantras, rituals, samagri..."
              rows={1}
              className="flex-1 bg-stone-800/80 border border-orange-500/20
                         text-orange-100 placeholder-orange-300/30
                         rounded-xl px-4 py-2.5 text-sm resize-none outline-none
                         focus:border-orange-400/50 transition-all
                         max-h-32 overflow-y-auto"
              style={{ minHeight: 44 }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="p-2.5 rounded-xl bg-gradient-saffron text-white
                         disabled:opacity-50 disabled:cursor-not-allowed
                         hover:shadow-saffron transition-all duration-200 flex-shrink-0">
              <Send size={18} />
            </button>
          </div>
          <p className="text-orange-400/30 text-[10px] text-center mt-2">
            Press Enter to send • Shift+Enter for new line
          </p>
        </div>
      </div>
    </>
  );
}
