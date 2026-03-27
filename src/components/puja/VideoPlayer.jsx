import { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import { useAuthStore } from '../../store/authStore';
import axiosInstance from '../../api/axiosInstance';
import { Bookmark, Play, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

export default function VideoPlayer({ step, onComplete }) {
  const { user } = useAuthStore();
  const playerRef = useRef(null);
  const [played, setPlayed] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [bookmarks, setBookmarks] = useState([]);
  const [bookmarkLabel, setBookmarkLabel] = useState('');
  const [showBookmarkInput, setShowBookmarkInput] = useState(false);
  const [transcriptRef, setTranscriptRef] = useState(null);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const handleProgress = ({ played, playedSeconds }) => {
    setCurrentTime(Math.floor(playedSeconds));
    if (played > 0.95) onComplete?.();
  };

  const saveBookmark = async () => {
    if (!user || !step.videoUrl) return;
    try {
      await axiosInstance.post('/bookmarks/video', {
        userId: user.userId,
        stepId: step.id,
        videoUrl: step.videoUrl,
        timestampSeconds: currentTime,
        label: bookmarkLabel || `Bookmark at ${formatTime(currentTime)}`,
      });
      setBookmarkLabel('');
      setShowBookmarkInput(false);
      toast.success(`Bookmark saved at ${formatTime(currentTime)} 🔖`);
    } catch {
      toast.error('Failed to save bookmark');
    }
  };

  const jumpTo = (seconds) => {
    if (playerRef.current) {
      playerRef.current.seekTo(seconds, 'seconds');
    }
  };

  if (!step.videoUrl) {
    return (
      <div className="bg-stone-900/60 border border-orange-500/15 rounded-2xl p-12 text-center">
        <Play size={40} className="mx-auto text-orange-400/30 mb-3" />
        <p className="text-orange-200/50">No video available for this step.</p>
      </div>
    );
  }

  return (
    <div className="bg-stone-900/60 border border-orange-500/15 rounded-2xl overflow-hidden">
      {/* Video player */}
      <div className="aspect-video bg-black relative">
        <ReactPlayer
          ref={playerRef}
          url={step.videoUrl}
          width="100%"
          height="100%"
          controls
          onProgress={handleProgress}
          onEnded={onComplete}
          config={{
            youtube: { playerVars: { showinfo: 1 } },
          }}
        />
      </div>

      {/* Controls under video */}
      <div className="p-4 border-t border-orange-500/10">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-orange-400/60 text-xs flex items-center gap-1">
            <Clock size={12} /> {formatTime(currentTime)}
          </span>

          {showBookmarkInput ? (
            <div className="flex items-center gap-2 flex-1">
              <input
                value={bookmarkLabel}
                onChange={(e) => setBookmarkLabel(e.target.value)}
                placeholder={`Label for ${formatTime(currentTime)}`}
                className="flex-1 bg-stone-800 border border-orange-500/20 text-orange-200
                           text-xs px-3 py-1.5 rounded-lg outline-none"
              />
              <button onClick={saveBookmark}
                className="text-xs bg-orange-500/30 text-orange-300 px-3 py-1.5 rounded-lg hover:bg-orange-500/40">
                Save
              </button>
              <button onClick={() => setShowBookmarkInput(false)}
                className="text-xs text-orange-400/60 hover:text-orange-300 px-2">✕</button>
            </div>
          ) : (
            <button
              onClick={() => setShowBookmarkInput(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                         bg-orange-500/15 text-orange-400 border border-orange-500/30
                         text-xs hover:bg-orange-500/25 transition-all">
              <Bookmark size={12} /> Bookmark this moment
            </button>
          )}
        </div>

        {/* Saved bookmarks */}
        {bookmarks.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {bookmarks.map((bm) => (
              <button
                key={bm.id}
                onClick={() => jumpTo(bm.timestampSeconds)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg
                           bg-stone-700/80 text-orange-300 text-xs
                           border border-orange-500/20 hover:bg-stone-600/80 transition-all">
                🔖 {bm.label} ({formatTime(bm.timestampSeconds)})
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Transcript */}
      {step.videoTranscript && (
        <div className="p-4 border-t border-orange-500/10 max-h-40 overflow-y-auto">
          <h4 className="text-orange-400/60 text-xs font-medium uppercase tracking-wider mb-2">
            Transcript
          </h4>
          <p className="text-orange-200/60 text-sm leading-relaxed">{step.videoTranscript}</p>
        </div>
      )}
    </div>
  );
}


