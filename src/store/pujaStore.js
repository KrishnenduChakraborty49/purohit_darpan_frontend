import { create } from 'zustand';
import axiosInstance from '../api/axiosInstance';

export const FALLBACK_PUJAS = [
  {
    id: 10,
    name: 'Kali Puja',
    nameDevanagari: 'শ্রীশ্রী দক্ষিণকালী পূজা',
    description: 'Complete ritual procedure for Kartik Amavasya Shyama Puja - Shodashopachara Puja and Tantrokto Home.',
    durationMinutes: 180,
    difficulty: 'ADVANCED',
    category: 'Shakti',
    thumbnailUrl: '/images/kali_closeup.jpg',
    isActive: true,
  },
  {
    id: 3,
    name: 'Durga Puja',
    nameDevanagari: 'দুর্গা পূজা',
    description: 'Worship of the Divine Mother for victory.',
    durationMinutes: 300,
    difficulty: 'ADVANCED',
    category: 'Shakti',
    thumbnailUrl: '/images/durga_closeup.jpg',
    isActive: true,
  },
  {
    id: 2,
    name: 'Lakshmi Puja',
    nameDevanagari: 'লক্ষ্মী পূজা',
    description: 'Worship for wealth and prosperity.',
    durationMinutes: 90,
    difficulty: 'BEGINNER',
    category: 'Wealth',
    thumbnailUrl: '/images/lakshmi_closeup.jpg',
    isActive: true,
  },
  {
    id: 1,
    name: 'Ganesh Puja',
    nameDevanagari: 'গণেশ পূজা',
    description: 'Foundational ritual for removing obstacles.',
    durationMinutes: 60,
    difficulty: 'BEGINNER',
    category: 'Vighnaharta',
    thumbnailUrl: '/images/ganesh_closeup.jpg',
    isActive: true,
  },
  {
    id: 8,
    name: 'Saraswati Puja',
    nameDevanagari: 'সরস্বতী পূজা',
    description: 'Worship of Knowledge and Arts.',
    durationMinutes: 60,
    difficulty: 'BEGINNER',
    category: 'Knowledge',
    thumbnailUrl: '/images/saraswati_closeup.jpg',
    isActive: true,
  },
  {
    id: 9,
    name: 'Shiv Puja',
    nameDevanagari: 'শিব পূজা',
    description: 'Worship of Lord Mahadev — the destroyer and transformer. Attain blessings, peace and liberation.',
    durationMinutes: 90,
    difficulty: 'INTERMEDIATE',
    category: 'Shaivism',
    thumbnailUrl: '/images/shiv_closeup.jpg',
    isActive: true,
  },
];

export const KALI_PUJA_STEPS = [
  {
    id: 101,
    pujaId: 10,
    stepOrder: 1,
    title: 'Shodashopachara Puja',
    titleDevanagari: 'षोडशोपचार पूजा',
    titleBengali: 'ষোড়শোপচার পূজা',
    description: '<h3>ষোড়শোপচার পূজা (Shodashopachara Puja)</h3><p>মা দক্ষিণকালিকার উদ্দেশ্যে ষোড়শ উপাচারে যথাবিধি পূজা নিবেদন — আসন, স্বাগত, পদ্য, অর্ঘ্য, আচমনীয়, স্নানীয়, বসন, ভূষণ, গন্ধ, পুষ্প, ধূপ, দীপ, নৈবেদ্য, পানীয় ও তাম্বুল প্রদান।</p><div class="bg-amber-950/30 p-3 rounded-lg border border-orange-500/20 mt-2"><p class="text-orange-300 font-semibold">জবা পুষ্প প্রদান মন্ত্র:</p><p class="italic text-orange-200">ওঁ রক্তচন্দন সংমিশ্রং রক্তপুষ্পং মনোহরম্। কাল্যৈ দত্তং ময়া দেব্যৈ গৃহাণ পরমেশ্বরী॥</p><p class="text-orange-300 font-semibold mt-2">বসন ও অর্ঘ্য নিবেদন মন্ত্র:</p><p class="italic text-orange-200">ওঁ রক্তবস্ত্রযুগং দেবি সর্বকামার্থসিদ্ধয়ে। ময়া নিবেদিতং ভক্ত্যা গৃহাণ পরমেশ্বরী॥</p></div>',
    videoUrl: 'https://youtu.be/N4wpFi0iyxw?si=ca12IbkVCK1B479I',
    pdfResource: {
      id: 10,
      title: 'শ্রীশ্রীদক্ষিণকালী পূজা পদ্ধতি — সম্পূর্ণ গাইড',
      resourceType: 'DOCX',
      fileUrl: '/docs/kali_puja_guide.html',
      isDownloadable: true
    },
  },
  {
    id: 102,
    pujaId: 10,
    stepOrder: 2,
    title: 'Tantrokto Home',
    titleDevanagari: 'तन्त्रोक्त होम',
    titleBengali: 'তন্ত্রোক্ত হোম',
    description: '<h3>তন্ত্রোক্ত হোম (Tantrokto Home)</h3><p>দেবী কালীর প্রতি তান্ত্রিক বিধান অনুযায়ী হোম ও যজ্ঞবিধি — স্থণ্ডিল নির্মাণ, অগ্নিসংস্কার, বিশ্বামিত্র গোত্রীয় যজ্ঞভুক্ অগ্নি স্থাপন, কুশণ্ডিকা, আজ্যভাগাহুতি, দেবী কালীর সিদ্ধ মূলমন্ত্রে আহুতি এবং মহাব্যাহৃতি ও পূর্ণাহুতি প্রদান।</p><div class="bg-amber-950/30 p-3 rounded-lg border border-orange-500/20 mt-2"><p class="text-orange-300 font-semibold">অগ্নি আবাহন মন্ত্র:</p><p class="italic text-orange-200">ওঁ অগ্নিং দূতং পুরোধায় হব্যবাহমুপব্রুবে। দেবাঁ আসাদয়াদিহ॥ ওঁ যজ্ঞভুগগ্নয়ে নমঃ।</p><p class="text-orange-300 font-semibold mt-2">দেবী কালীর হোম আহুতি মূলমন্ত্র:</p><p class="italic text-orange-200">ওঁ ক্রীঁ দক্ষিণকালিকায়ৈ স্বাহা (ॐ क्रीं काल्यै स्वाहा) — ১০৮ বার যথাবিধি ঘৃতাহুতি।</p><p class="text-orange-300 font-semibold mt-2">পূর্ণাহুতি মন্ত্র:</p><p class="italic text-orange-200">ওঁ পূর্ণমদঃ পূর্ণমিদং পূর্ণাৎ পূর্ণমুদচ্যতে। পূর্ণস্য পূর্ণমাদায় পূর্ণমেবাবশিষ্যতে॥ স্বাহা।</p></div>',
    videoUrl: 'https://youtu.be/62qCR6aaUbw?si=Nr_P-AZXnHcSkpRE',
    pdfResource: {
      id: 10,
      title: 'শ্রীশ্রীদক্ষিণকালী পূজা পদ্ধতি — সম্পূর্ণ গাইড',
      resourceType: 'DOCX',
      fileUrl: '/docs/kali_puja_guide.html',
      isDownloadable: true
    },
  }
];

export const usePujaStore = create((set, get) => ({
  pujas: FALLBACK_PUJAS,
  currentPuja: null,
  currentSteps: [],
  currentStep: null,
  activeFormat: 'DOC',
  loading: false,
  error: null,

  fetchPujas: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await axiosInstance.get('/pujas');
      if (Array.isArray(data) && data.length > 0) {
        const hasKali = data.some(p => p.name.toLowerCase().includes('kali'));
        const combined = hasKali ? data : [FALLBACK_PUJAS[0], ...data];
        set({ pujas: combined, loading: false });
      } else {
        set({ pujas: FALLBACK_PUJAS, loading: false });
      }
    } catch (err) {
      console.warn('Backend waking up, using fallback pujas:', err.message);
      set({ pujas: FALLBACK_PUJAS, loading: false });
    }
  },

  fetchPuja: async (pujaId) => {
    set({ loading: true, error: null });
    const isKali = String(pujaId) === '10' || String(pujaId).toLowerCase().includes('kali');
    try {
      const [pujaRes, stepsRes] = await Promise.all([
        axiosInstance.get(`/pujas/${pujaId}`),
        axiosInstance.get(`/pujas/${pujaId}/steps`),
      ]);
      let steps = (stepsRes.data && stepsRes.data.length > 0) 
        ? stepsRes.data 
        : (isKali ? KALI_PUJA_STEPS : []);

      if (isKali) {
        // Enforce the 2 specific steps (Shodashopachara Puja & Tantrokto Home)
        if (steps.length !== 2 || steps[0]?.title !== 'Shodashopachara Puja' || steps[1]?.title !== 'Tantrokto Home') {
          steps = KALI_PUJA_STEPS;
        } else {
          steps = steps.map((s, idx) => ({
            ...s,
            pdfResource: s.pdfResource || KALI_PUJA_STEPS[idx]?.pdfResource || KALI_PUJA_STEPS[0].pdfResource
          }));
        }
      }

      set({
        currentPuja: pujaRes.data,
        currentSteps: steps,
        currentStep: steps[0] || null,
        loading: false,
      });
    } catch (err) {
      console.warn('Using local fallback for puja:', pujaId, err.message);
      const fallbackPuja = FALLBACK_PUJAS.find(p => String(p.id) === String(pujaId)) || (isKali ? FALLBACK_PUJAS[0] : null);
      const fallbackSteps = isKali ? KALI_PUJA_STEPS : [];
      if (fallbackPuja) {
        set({
          currentPuja: fallbackPuja,
          currentSteps: fallbackSteps,
          currentStep: fallbackSteps[0] || null,
          loading: false,
        });
      } else {
        set({ error: err.message, loading: false });
      }
    }
  },

  setCurrentStep: (step) => set({ currentStep: step }),

  setActiveFormat: (format) => set({ activeFormat: format }),

  updateProgress: async (userId, pujaId, stepId, format, completed) => {
    try {
      await axiosInstance.post('/progress/update', {
        userId, pujaId, stepId, format, completed,
      });
    } catch (err) {
      console.error('Progress update failed:', err);
    }
  },

  updateStep: async (pujaId, stepId, stepData) => {
    try {
      const { data } = await axiosInstance.put(`/pujas/${pujaId}/steps/${stepId}`, stepData);
      set((state) => ({
        currentSteps: state.currentSteps.map((s) => (s.id === stepId ? { ...s, ...data } : s)),
        currentStep: state.currentStep?.id === stepId ? { ...state.currentStep, ...data } : state.currentStep,
      }));
      return data;
    } catch (err) {
      console.warn('API step update fallback to local state:', err.message);
      set((state) => ({
        currentSteps: state.currentSteps.map((s) => (s.id === stepId ? { ...s, ...stepData } : s)),
        currentStep: state.currentStep?.id === stepId ? { ...state.currentStep, ...stepData } : state.currentStep,
      }));
      return stepData;
    }
  },

  addStep: async (pujaId, stepData) => {
    try {
      const { data } = await axiosInstance.post(`/pujas/${pujaId}/steps`, stepData);
      set((state) => ({
        currentSteps: [...state.currentSteps, data],
      }));
      return data;
    } catch (err) {
      console.warn('API add step fallback to local state:', err.message);
      const newStep = { ...stepData, id: Date.now() };
      set((state) => ({
        currentSteps: [...state.currentSteps, newStep],
      }));
      return newStep;
    }
  },
}));
