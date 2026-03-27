import { useState, useEffect, useCallback } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useAIStore } from '../../store/aiStore';
import axiosInstance from '../../api/axiosInstance';
import ShlokWord from './ShlokWord';
import { PenLine, Highlighter, StickyNote, BookOpen } from 'lucide-react';
import toast from 'react-hot-toast';

export default function DocumentationViewer({ step }) {
  const { user } = useAuthStore();
  const { setContext } = useAIStore();
  const [notes, setNotes] = useState([]);
  const [highlights, setHighlights] = useState([]);
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [savingNote, setSavingNote] = useState(false);
  const [expandedWord, setExpandedWord] = useState(null);

  useEffect(() => {
    if (user && step) {
      loadNotes();
      loadHighlights();
    }
  }, [step?.id]);

  const loadNotes = async () => {
    try {
      const { data } = await axiosInstance.get(`/notes/${user.userId}/${step.id}`);
      setNotes(data);
    } catch { /* silently fail */ }
  };

  const loadHighlights = async () => {
    try {
      const { data } = await axiosInstance.get(`/highlights/${user.userId}/${step.id}`);
      setHighlights(data);
    } catch { /* silently fail */ }
  };

  const saveNote = async () => {
    if (!newNote.trim()) return;
    setSavingNote(true);
    try {
      await axiosInstance.post('/notes', {
        userId: user.userId,
        stepId: step.id,
        noteText: newNote,
      });
      setNewNote('');
      setShowNoteInput(false);
      loadNotes();
      toast.success('Note saved 📝');
    } catch {
      toast.error('Failed to save note');
    } finally {
      setSavingNote(false);
    }
  };

  const handleTextSelect = async () => {
    const selection = window.getSelection();
    if (!selection || selection.toString().trim().length < 3) return;
    const selectedText = selection.toString().trim();
    try {
      await axiosInstance.post('/highlights', {
        userId: user.userId,
        stepId: step.id,
        text: selectedText,
        startOffset: 0,
        endOffset: selectedText.length,
      });
      loadHighlights();
      toast.success('Highlighted! ✨');
    } catch { /* silently fail */ }
    selection.removeAllRanges();
  };

  /**
   * Renders Devanagari mantras with clickable words.
   */
  const renderShloks = () => {
    if (!step.stepMantras?.length) return null;

    return (
      <div className="space-y-6 mt-6">
        {step.stepMantras.map(({ mantra, sequenceOrder }) => (
          <div key={mantra.id}
            className="bg-amber-950/30 border border-orange-500/20 rounded-xl p-5">
            <p className="text-orange-400/60 text-xs mb-3 font-medium uppercase tracking-wider">
              Mantra {sequenceOrder} • {mantra.sourceText}
            </p>

            {/* Devanagari shlok — each word clickable */}
            <div className="font-devanagari text-xl text-orange-200 leading-loose mb-3">
              {mantra.shlokText.split(/\s+/).map((word, i) => (
                <span key={i}>
                  <ShlokWord
                    word={word}
                    shlokText={mantra.shlokText}
                    pujaContext={step.puja?.name || ''}
                    mantraId={mantra.id}
                  />
                  {' '}
                </span>
              ))}
            </div>

            {/* Transliteration */}
            {mantra.transliteration && (
              <p className="text-orange-300/60 text-sm italic leading-relaxed border-t border-orange-500/10 pt-3">
                {mantra.transliteration}
              </p>
            )}

            {/* Word meanings */}
            {mantra.wordMeanings && (
              <details className="mt-3">
                <summary className="text-orange-400/70 text-xs cursor-pointer hover:text-orange-300 transition-colors">
                  📖 Word-by-word meanings
                </summary>
                <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {JSON.parse(mantra.wordMeanings).map((wm, i) => (
                    <div key={i} className="bg-stone-800/60 rounded-lg p-2">
                      <p className="font-devanagari text-orange-300 text-sm">{wm.word}</p>
                      <p className="text-orange-200/60 text-xs mt-0.5">{wm.meaning}</p>
                      {wm.role && (
                        <p className="text-orange-400/40 text-xs mt-0.5 italic">{wm.role}</p>
                      )}
                    </div>
                  ))}
                </div>
              </details>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-stone-900/60 border border-orange-500/15 rounded-2xl p-6">
      {/* Toolbar */}
      <div className="flex items-center gap-2 mb-5 pb-4 border-b border-orange-500/10">
        <button
          onMouseUp={handleTextSelect}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                     bg-yellow-500/15 text-yellow-400 border border-yellow-500/30
                     text-xs hover:bg-yellow-500/25 transition-all">
          <Highlighter size={13} /> Highlight
        </button>
        <button
          onClick={() => setShowNoteInput(!showNoteInput)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                     bg-blue-500/15 text-blue-400 border border-blue-500/30
                     text-xs hover:bg-blue-500/25 transition-all">
          <StickyNote size={13} /> Add Note
        </button>
        <span className="ml-auto text-orange-400/40 text-xs">
          {highlights.length} highlights • {notes.length} notes
        </span>
      </div>

      {/* Note input */}
      {showNoteInput && (
        <div className="mb-5 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl animate-fade-in">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Write your note..."
            rows={3}
            className="w-full bg-transparent text-blue-100 placeholder-blue-300/40
                       text-sm resize-none outline-none"
          />
          <div className="flex justify-end gap-2 mt-2">
            <button onClick={() => setShowNoteInput(false)}
              className="text-xs text-blue-400/60 hover:text-blue-300 px-3 py-1">Cancel</button>
            <button onClick={saveNote} disabled={savingNote}
              className="text-xs bg-blue-500/30 text-blue-300 px-3 py-1.5 rounded-lg hover:bg-blue-500/40 transition-all">
              {savingNote ? 'Saving...' : 'Save Note'}
            </button>
          </div>
        </div>
      )}

      {/* Main description */}
      <div
        className="prose prose-invert max-w-none text-orange-100/80 leading-relaxed text-sm"
        dangerouslySetInnerHTML={{ __html: step.description || '<p>No content available for this step.</p>' }}
      />

      {/* Shloks */}
      {renderShloks()}

      {/* Samagri */}
      {step.stepSamagri?.length > 0 && (
        <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
          <h4 className="text-green-400 font-medium text-sm mb-3 flex items-center gap-2">
            <BookOpen size={15} /> Samagri Required for this step
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {step.stepSamagri.map(({ samagri, quantity, notes: sNote }) => (
              <div key={samagri.id} className="bg-green-500/10 rounded-lg p-2.5">
                <p className="text-green-300 text-sm font-medium">{samagri.name}</p>
                {samagri.nameDevanagari && (
                  <p className="font-devanagari text-green-400/60 text-xs">{samagri.nameDevanagari}</p>
                )}
                {quantity && <p className="text-green-200/50 text-xs mt-1">{quantity}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* User notes */}
      {notes.length > 0 && (
        <div className="mt-6 space-y-2">
          <h4 className="text-blue-400/70 text-xs font-medium uppercase tracking-wider">My Notes</h4>
          {notes.map((note) => (
            <div key={note.id} className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
              <p className="text-blue-200/80 text-sm">{note.noteText}</p>
              <p className="text-blue-400/40 text-xs mt-1">
                {new Date(note.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
