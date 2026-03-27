import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePujaStore } from '../store/pujaStore';
import { useAuthStore } from '../store/authStore';
import { useAIStore } from '../store/aiStore';
import { BookOpen, Play, FileText, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import DocumentationViewer from '../components/puja/DocumentationViewer';
import VideoPlayer from '../components/puja/VideoPlayer';
import PDFViewer from '../components/puja/PDFViewer';

const FORMATS = [
  { key: 'DOC',   label: 'Read',      icon: BookOpen, emoji: '📖' },
  { key: 'VIDEO', label: 'Watch',     icon: Play,     emoji: '🎥' },
  { key: 'PDF',   label: 'Study PDF', icon: FileText,  emoji: '📚' },
];

export default function PujaLearningPage() {
  const { pujaId } = useParams();
  const navigate = useNavigate();
  const { currentPuja, currentSteps, currentStep, activeFormat,
          fetchPuja, setCurrentStep, setActiveFormat, updateProgress, loading } = usePujaStore();
  const { user } = useAuthStore();
  const [isFormatCompleted, setIsFormatCompleted] = useState(false);

  useEffect(() => {
    setIsFormatCompleted(activeFormat === 'DOC');
  }, [currentStep, activeFormat]);
  const { setContext } = useAIStore();

  useEffect(() => {
    if (pujaId) fetchPuja(pujaId);
  }, [pujaId]);

  // Inject context into AI store whenever step/puja changes
  useEffect(() => {
    if (currentPuja && currentStep) {
      setContext({
        currentPuja,
        currentStep,
        currentShlok: currentStep.stepMantras?.[0]?.mantra?.shlokText,
      });
    }
  }, [currentPuja, currentStep]);

  const stepIndex = currentSteps.findIndex((s) => s.id === currentStep?.id);

  const goNext = () => {
    if (stepIndex < currentSteps.length - 1) {
      setCurrentStep(currentSteps[stepIndex + 1]);
      markComplete();
    }
  };

  const goPrev = () => {
    if (stepIndex > 0) setCurrentStep(currentSteps[stepIndex - 1]);
  };

  const markComplete = () => {
    if (user && currentPuja && currentStep) {
      updateProgress(user.userId, currentPuja.id, currentStep.id, activeFormat, true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-sacred flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500/30 border-t-orange-400 rounded-full animate-spin mx-auto mb-4"/>
          <p className="text-orange-300/70 font-devanagari">Loading puja...</p>
        </div>
      </div>
    );
  }

  if (!currentPuja) {
    return (
      <div className="min-h-screen bg-gradient-sacred flex items-center justify-center">
        <div className="text-center text-orange-200/60">
          <p className="text-xl mb-4">Puja not found</p>
          <button onClick={() => navigate('/pujas')} className="text-orange-400 hover:underline">
            ← Back to Pujas
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-950 to-amber-950/20 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* Header */}
        <div className="mb-6 animate-fade-in">
          <button onClick={() => navigate('/pujas')}
            className="text-orange-400/70 hover:text-orange-300 text-sm flex items-center gap-1 mb-3 transition-colors">
            <ChevronLeft size={16} /> All Pujas
          </button>
          <div className="flex items-start justify-between flex-wrap gap-3">
            <div>
              <h1 className="text-2xl font-bold text-orange-200">{currentPuja.name}</h1>
              {currentPuja.nameDevanagari && (
                <p className="font-devanagari text-lg text-orange-400/80 mt-0.5">
                  {currentPuja.nameDevanagari}
                </p>
              )}
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium border
              ${currentPuja.difficulty === 'BEGINNER'
                ? 'bg-green-500/15 text-green-400 border-green-500/30'
                : currentPuja.difficulty === 'INTERMEDIATE'
                ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                : 'bg-red-500/15 text-red-400 border-red-500/30'
              }`}>
              {currentPuja.difficulty}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* Left: Step list */}
          <div className="lg:col-span-1">
            <div className="bg-stone-900/60 border border-orange-500/15 rounded-2xl overflow-hidden">
              <div className="px-4 py-3 border-b border-orange-500/15">
                <h2 className="text-orange-200 font-medium text-sm">
                  Steps ({currentSteps.length})
                </h2>
              </div>
              <div className="max-h-[540px] overflow-y-auto">
                {currentSteps.map((step, idx) => (
                  <button
                    key={step.id}
                    onClick={() => setCurrentStep(step)}
                    className={`w-full text-left px-4 py-3 border-b border-orange-500/10
                               flex items-start gap-3 transition-all duration-150
                               ${currentStep?.id === step.id
                                 ? 'bg-orange-500/15 border-l-2 border-l-orange-400'
                                 : 'hover:bg-orange-500/5'
                               }`}>
                    <span className={`flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center text-xs
                      ${currentStep?.id === step.id ? 'border-orange-400 text-orange-400' : 'border-orange-500/30 text-orange-500/50'}`}>
                      {idx + 1}
                    </span>
                    <div className="min-w-0">
                      <p className={`text-sm truncate ${currentStep?.id === step.id ? 'text-orange-200' : 'text-orange-200/60'}`}>
                        {step.title}
                      </p>
                      {step.titleDevanagari && (
                        <p className="font-devanagari text-xs text-orange-400/50 truncate mt-0.5">
                          {step.titleDevanagari}
                        </p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Format content */}
          <div className="lg:col-span-3 space-y-4">

            {/* Format tabs */}
            <div className="flex gap-2 bg-stone-900/60 border border-orange-500/15 rounded-2xl p-1.5">
              {FORMATS.map(({ key, label, emoji }) => (
                <button
                  key={key}
                  onClick={() => setActiveFormat(key)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl
                             text-sm font-medium transition-all duration-200
                             ${activeFormat === key
                               ? 'bg-gradient-saffron text-white shadow-saffron'
                               : 'text-orange-200/60 hover:text-orange-200 hover:bg-orange-500/8'
                             }`}>
                  <span>{emoji}</span>
                  <span className="hidden sm:block">{label}</span>
                </button>
              ))}
            </div>

            {/* Step header */}
            {currentStep && (
              <div className="bg-stone-900/60 border border-orange-500/15 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-orange-200 font-semibold text-lg">{currentStep.title}</h3>
                  <span className="text-orange-400/50 text-sm">
                    Step {stepIndex + 1} of {currentSteps.length}
                  </span>
                </div>
                {currentStep.titleDevanagari && (
                  <p className="font-devanagari text-orange-400/70 text-base">
                    {currentStep.titleDevanagari}
                  </p>
                )}
              </div>
            )}

            {/* Format content */}
            {currentStep && (
              <div className="animate-fade-in">
                {activeFormat === 'DOC' && <DocumentationViewer step={currentStep} />}
                {activeFormat === 'VIDEO' && <VideoPlayer step={currentStep} onComplete={() => setIsFormatCompleted(true)} />}
                {activeFormat === 'PDF' && <PDFViewer step={currentStep} onComplete={() => setIsFormatCompleted(true)} />}
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={goPrev}
                disabled={stepIndex === 0}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl
                           bg-stone-800/80 border border-orange-500/20 text-orange-200
                           disabled:opacity-40 disabled:cursor-not-allowed
                           hover:bg-stone-700/80 transition-all text-sm">
                <ChevronLeft size={16} /> Previous
              </button>

              <button
                onClick={markComplete}
                disabled={!isFormatCompleted}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl
                           bg-green-600/20 border border-green-500/30 text-green-400
                           disabled:opacity-40 disabled:cursor-not-allowed
                           hover:bg-green-600/30 transition-all text-sm">
                <CheckCircle size={16} /> Mark Complete
              </button>

              <button
                onClick={goNext}
                disabled={stepIndex === currentSteps.length - 1}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl
                           bg-gradient-saffron text-white shadow-saffron
                           disabled:opacity-40 disabled:cursor-not-allowed
                           hover:shadow-lg transition-all text-sm">
                Next <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

