import { useState, useRef } from 'react';
import { useAIStore } from '../../store/aiStore';
import { useAuthStore } from '../../store/authStore';
import WordTooltip from './WordTooltip';

/**
 * Renders a single clickable Sanskrit word from a shlok.
 * On click: shows WordTooltip with the meaning and "Ask AI" button.
 */
export default function ShlokWord({ word, shlokText, pujaContext }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const ref = useRef(null);

  // Strip punctuation for clean word lookup
  const cleanWord = word.replace(/[।॥,;:.!?]/g, '').trim();

  const handleClick = (e) => {
    if (!cleanWord) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({
      top: rect.bottom + window.scrollY + 6,
      left: Math.max(0, rect.left + window.scrollX - 60),
    });
    setShowTooltip(true);
    e.stopPropagation();
  };

  if (!cleanWord) {
    return <span className="font-devanagari text-orange-300/50">{word}</span>;
  }

  return (
    <>
      <span
        ref={ref}
        onClick={handleClick}
        data-word={cleanWord}
        data-shlok={shlokText}
        className="font-devanagari text-orange-200 cursor-pointer
                   border-b border-dotted border-orange-400/40
                   hover:text-orange-300 hover:border-orange-400/80
                   transition-colors duration-150 rounded-sm
                   hover:bg-orange-400/10 px-0.5"
      >
        {word}
      </span>

      {showTooltip && (
        <WordTooltip
          word={cleanWord}
          shlokText={shlokText}
          pujaContext={pujaContext}
          position={position}
          onClose={() => setShowTooltip(false)}
        />
      )}
    </>
  );
}
