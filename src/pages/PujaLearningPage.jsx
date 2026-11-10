import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePujaStore } from '../store/pujaStore';
import { useAuthStore } from '../store/authStore';
import { useAIStore } from '../store/aiStore';
import { BookOpen, Play, FileText, ChevronLeft, ChevronRight, CheckCircle, Edit3, Plus, X, Save } from 'lucide-react';
import DocumentationViewer from '../components/puja/DocumentationViewer';
import VideoPlayer from '../components/puja/VideoPlayer';
import PDFViewer from '../components/puja/PDFViewer';
import toast from 'react-hot-toast';

const FORMATS = [
  { key: 'DOC',   label: 'Read (পঠন)',      icon: BookOpen, emoji: '📖' },
  { key: 'VIDEO', label: 'Watch (দর্শন)',    icon: Play,     emoji: '🎥' },
  { key: 'PDF',   label: 'Study Material', icon: FileText, emoji: '📄' },
];

export default function PujaLearningPage() {
  const { pujaId } = useParams();
  const navigate = useNavigate();
  const {
    currentPuja,
    currentSteps,
    currentStep,
    activeFormat,
    fetchPuja,
    setCurrentStep,
    setActiveFormat,
    updateProgress,
    updateStep,
    addStep,
    loading
  } = usePujaStore();
  const { user } = useAuthStore();
  const [isFormatCompleted, setIsFormatCompleted] = useState(false);

  // Edit / Add Step Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('edit'); // 'edit' or 'add'
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    titleBengali: '',
    titleDevanagari: '',
    videoUrl: '',
    description: '',
  });

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

  const handleOpenEditModal = (step) => {
    setModalMode('edit');
    setFormData({
      title: step.title || '',
      titleBengali: step.titleBengali || '',
      titleDevanagari: step.titleDevanagari || '',
      videoUrl: step.videoUrl || '',
      description: step.description || '',
    });
    setIsModalOpen(true);
  };

  const handleOpenAddModal = () => {
    setModalMode('add');
    setFormData({
      title: '',
      titleBengali: '',
      titleDevanagari: '',
      videoUrl: '',
      description: '',
    });
    setIsModalOpen(true);
  };

  const handleSaveStep = async () => {
    if (!formData.title.trim()) {
      toast.error('Please enter a step title');
      return;
    }
    setSaving(true);
    try {
      if (modalMode === 'edit') {
        await updateStep(currentPuja.id, currentStep.id, formData);
        toast.success('Step updated successfully! ✨');
      } else {
        await addStep(currentPuja.id, {
          ...formData,
          stepOrder: currentSteps.length + 1,
        });
        toast.success('New step added! 🎉');
      }
      setIsModalOpen(false);
    } catch {
      toast.error('Failed to save step');
    } finally {
      setSaving(false);
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
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border border-orange-500/30 shadow-saffron flex-shrink-0 bg-stone-900">
                {currentPuja.thumbnailUrl ? (
                  <img
                    src={currentPuja.thumbnailUrl}
                    alt={currentPuja.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/images/kali_closeup.jpg';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl">🪔</div>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-orange-200">{currentPuja.name}</h1>
                {currentPuja.nameDevanagari && (
                  <p className="font-devanagari text-lg text-orange-400/80 mt-0.5">
                    {currentPuja.nameDevanagari.includes('?') ? (currentPuja.name.toLowerCase().includes('kali') ? 'শ্রীশ্রী দক্ষিণকালী পূজা' : currentPuja.name) : currentPuja.nameDevanagari}
                  </p>
                )}
              </div>
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
              <div className="px-4 py-3 border-b border-orange-500/15 flex items-center justify-between">
                <h2 className="text-orange-200 font-medium text-sm">Ritual Steps</h2>
                <button
                  onClick={handleOpenAddModal}
                  className="flex items-center gap-1 text-[11px] text-orange-400 hover:text-orange-300 px-2 py-0.5 rounded bg-orange-500/10 border border-orange-500/20"
                >
                  <Plus size={11} /> New Step
                </button>
              </div>

              <div className="divide-y divide-orange-500/10">
                {currentSteps.map((step, idx) => (
                  <button
                    key={step.id || idx}
                    onClick={() => setCurrentStep(step)}
                    className={`w-full text-left px-4 py-3 flex items-start gap-3 transition-colors
                      ${currentStep?.id === step.id
                        ? 'bg-orange-500/15 border-l-2 border-orange-400'
                        : 'hover:bg-orange-500/5 text-orange-200/60'
                      }`}>
                    <span className={`flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center text-xs
                      ${currentStep?.id === step.id ? 'border-orange-400 text-orange-400 font-bold' : 'border-orange-500/30 text-orange-500/50'}`}>
                      {idx + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className={`text-sm truncate ${currentStep?.id === step.id ? 'text-orange-200 font-medium' : 'text-orange-200/60'}`}>
                        {step.title}
                      </p>
                      {step.titleBengali ? (
                        <p className="text-xs text-orange-400/70 truncate mt-0.5 font-medium">
                          {step.titleBengali}
                        </p>
                      ) : step.titleDevanagari ? (
                        <p className="font-devanagari text-xs text-orange-400/50 truncate mt-0.5">
                          {step.titleDevanagari}
                        </p>
                      ) : null}
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

            {/* Step header with Edit option */}
            {currentStep && (
              <div className="bg-stone-900/60 border border-orange-500/15 rounded-2xl p-5">
                <div className="flex items-start justify-between mb-1 flex-wrap gap-2">
                  <div>
                    <h3 className="text-orange-200 font-semibold text-lg">{currentStep.title}</h3>
                    {currentStep.titleBengali && (
                      <p className="text-orange-300 text-sm font-medium mt-0.5">
                        {currentStep.titleBengali}
                      </p>
                    )}
                    {currentStep.titleDevanagari && !currentStep.titleBengali && (
                      <p className="font-devanagari text-orange-400/70 text-base">
                        {currentStep.titleDevanagari}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-orange-400/50 text-xs px-2.5 py-1 rounded-full bg-stone-800/80 border border-orange-500/15">
                      Step {stepIndex + 1} of {currentSteps.length}
                    </span>
                    <button
                      onClick={() => handleOpenEditModal(currentStep)}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-orange-500/15 hover:bg-orange-500/25 border border-orange-500/30 text-orange-300 text-xs transition-all shadow-sm"
                      title="Edit YouTube Video link, Step title, and HTML guide"
                    >
                      <Edit3 size={13} /> Edit Video & Docs
                    </button>
                  </div>
                </div>
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

      {/* Edit / Add Step Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-orange-500/30 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in p-6">
            <div className="flex items-center justify-between pb-4 border-b border-orange-500/20 mb-4">
              <h3 className="text-lg font-bold text-orange-200 flex items-center gap-2">
                <Edit3 className="text-orange-400" size={18} />
                {modalMode === 'edit' ? 'Edit Step (ভিডিও ও গাইড সম্পাদনা)' : 'Add New Step (নতুন ধাপ যুক্ত করুন)'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-stone-400 hover:text-orange-300 p-1.5 rounded-lg hover:bg-stone-800 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-orange-300 font-medium mb-1">
                    Step Title (English) *
                  </label>
                  <input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Achamana & Svastivachana"
                    className="w-full bg-stone-800 border border-orange-500/20 rounded-xl px-3 py-2 text-orange-100 placeholder-stone-500 text-sm focus:border-orange-400 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-orange-300 font-medium mb-1">
                    ধাপের নাম (বাংলা)
                  </label>
                  <input
                    value={formData.titleBengali}
                    onChange={(e) => setFormData({ ...formData, titleBengali: e.target.value })}
                    placeholder="যেমন: আচমন ও স্বস্তিবচন"
                    className="w-full bg-stone-800 border border-orange-500/20 rounded-xl px-3 py-2 text-orange-100 placeholder-stone-500 text-sm focus:border-orange-400 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-orange-300 font-medium mb-1">
                  YouTube Video Link (ভিডিও লিঙ্ক)
                </label>
                <input
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full bg-stone-800 border border-orange-500/20 rounded-xl px-3 py-2 text-orange-100 placeholder-stone-500 text-sm focus:border-orange-400 outline-none"
                />
                <p className="text-xs text-stone-400 mt-1">
                  Paste any YouTube watch or share URL. It will automatically play in the "Watch" tab.
                </p>
              </div>

              <div>
                <label className="block text-xs text-orange-300 font-medium mb-1">
                  Ritual Documentation / HTML Guide (পদ্ধতি ও মন্ত্র গাইড)
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="<p>Write or paste your complete puja guide and HTML here...</p>"
                  rows={8}
                  className="w-full font-mono text-xs bg-stone-800 border border-orange-500/20 rounded-xl p-3 text-orange-100 placeholder-stone-500 focus:border-orange-400 outline-none resize-y leading-relaxed"
                />
                <p className="text-xs text-stone-400 mt-1">
                  Supports standard HTML tags: &lt;h3&gt;, &lt;p&gt;, &lt;div&gt;, &lt;b&gt;, &lt;ul&gt;, etc.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-orange-500/20">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs text-stone-300 hover:bg-stone-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveStep}
                disabled={saving}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-saffron text-white text-xs font-semibold shadow-saffron hover:opacity-95 disabled:opacity-50 transition-all"
              >
                <Save size={14} />
                {saving ? 'Saving...' : 'Save Step'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
