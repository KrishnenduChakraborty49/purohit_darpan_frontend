import { useEffect, useRef, useState } from 'react';
import { useAIStore } from '../../store/aiStore';
import { useAuthStore } from '../../store/authStore';
import axiosInstance from '../../api/axiosInstance';
import { X, Sparkles, Volume2 } from 'lucide-react';

/**
 * Floating tooltip popup for a tapped Sanskrit word.
 * Shows brief meaning and an "Ask AI" button to open the full AI panel.
 */
export default function WordTooltip({ word, shlokText, pujaContext, position, onClose }) {
  const { explainWord, openPanel } = useAIStore();
  const { user } = useAuthStore();
  const [meaning, setMeaning] = useState(null);
  const [loading, setLoading] = useState(true);
  const tooltipRef = useRef(null);

  // Find word meaning from the mantra's wordMeanings JSON (passed via shlok context)
  // Or fall back to AI lookup
  useEffect(() => {
    const controller = new AbortController();
    fetchWordMeaning(controller.signal);
    return () => controller.abort();
  }, [word]);

  useEffect(() => {
    // Close on outside click
    const handler = (e) => {
      if (tooltipRef.current && !tooltipRef.current.contains(e.target)) {
        onClose();
      }
    };
    setTimeout(() => document.addEventListener('mousedown', handler), 10);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  const fetchWordMeaning = async (signal) => {
    setLoading(true);
    try {
      // Quick lookup — try the current mantra context embedded in page
      const storedMantras = document.querySelectorAll('[data-word-meanings]');
      for (const el of storedMantras) {
        const meanings = JSON.parse(el.dataset.wordMeanings || '[]');
        const found = meanings.find((m) => m.word === word);
        if (found) {
          setMeaning(found);
          setLoading(false);
          return;
        }
      }
      // Fallback: basic meaning from AI (non-blocking, short)
      setMeaning({ word, meaning: 'Click "Ask Guru" for a full explanation', role: '' });
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  const handleAskAI = () => {
    explainWord(word, shlokText, user?.userId, pujaContext);
    openPanel();
    onClose();
  };

  return (
    <div
      ref={tooltipRef}
      style={{ top: position.top, left: position.left }}
      className="fixed z-[9999] w-64 animate-fade-in"
    >
      <div className="bg-amber-950/95 backdrop-blur-md border border-orange-500/40
                      rounded-xl shadow-sacred overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-orange-500/20
                        bg-gradient-to-r from-orange-900/60 to-amber-900/60">
          <span className="font-devanagari text-orange-200 font-semibold">{word}</span>
          <button onClick={onClose} className="text-orange-400/60 hover:text-orange-300 transition-colors">
            <X size={14} />
          </button>
        </div>

        {/* Content */}
        <div className="px-4 py-3">
          {loading ? (
            <div className="flex items-center gap-2 text-orange-300/60 text-xs">
              <div className="w-3 h-3 border border-orange-400/40 border-t-orange-400 rounded-full animate-spin" />
              Looking up...
            </div>
          ) : meaning ? (
            <div className="space-y-1">
              <p className="text-orange-100 text-sm">{meaning.meaning}</p>
              {meaning.role && (
                <p className="text-orange-400/60 text-xs italic">{meaning.role}</p>
              )}
            </div>
          ) : (
            <p className="text-orange-200/60 text-xs">Meaning not found</p>
          )}
        </div>

        {/* Ask AI button */}
        <div className="px-4 pb-3">
          <button
            onClick={handleAskAI}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg
                       bg-gradient-saffron text-white text-xs font-medium
                       hover:shadow-saffron transition-all duration-200">
            <Sparkles size={12} />
            Ask Guru for full explanation
          </button>
        </div>
      </div>
    </div>
  );
}
