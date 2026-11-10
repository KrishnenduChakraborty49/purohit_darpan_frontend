import { create } from 'zustand';
import axiosInstance from '../api/axiosInstance';

export const FALLBACK_PUJAS = [
  {
    id: 10,
    name: 'Kali Puja',
    nameDevanagari: 'काली पूजा',
    description: 'Complete ritual procedure for Kartik Amavasya Shyama Puja - invocation, shodashopachara worship, pushpanjali, and midnight arati.',
    durationMinutes: 180,
    difficulty: 'ADVANCED',
    category: 'Shakti',
    thumbnailUrl: '/images/kali_closeup.jpg',
    isActive: true,
  },
  {
    id: 3,
    name: 'Durga Puja',
    nameDevanagari: 'दुर्गा पूजा',
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
    nameDevanagari: 'लक्ष्मी पूजा',
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
    nameDevanagari: 'गणेश पूजा',
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
    nameDevanagari: 'सरस्वती पूजा',
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
    nameDevanagari: 'शिव पूजा',
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
    title: 'Achamana & Svastivachana',
    titleDevanagari: 'आचमन एवं स्वस्तिवाचन',
    titleBengali: 'আচমন ও স্বস্তিবচন',
    description: '<h3>আচমন ও স্বস্তিবচন (Achamana & Svastivachana)</h3><p>পবিত্র গঙ্গাজল কুশীতে নিয়ে তিনবার আচমন এবং ওঁ বিষ্ণু স্মরণ। স্বস্তিবাচন মন্ত্র পাঠ করে পূজার শুভারম্ভ করা হয়।</p><div class="bg-amber-950/30 p-3 rounded-lg border border-orange-500/20 mt-2"><p class="text-orange-300 font-semibold">মন্ত্র:</p><p class="italic text-orange-200">ওঁ তদ্বিষ্ণোঃ পরমং পদং সদা পশ্যন্তি সূরয়ঃ দিবীব চক্ষুরাততম্।</p></div>',
    videoUrl: 'https://www.youtube.com/watch?v=kYJ5oQ6zFZs'
  },
  {
    id: 102,
    pujaId: 10,
    stepOrder: 2,
    title: 'Sankalpa & Ghatasthapana',
    titleDevanagari: 'संकल्प एवं घटस्थापन',
    titleBengali: 'সংকল্প ও ঘটস্থাপন',
    description: '<h3>সংকল্প ও ঘটস্থাপন (Sankalpa & Ghatasthapana)</h3><p>কার্তিক অমাবস্যা তিথিতে মা কালীর পূজার সংকল্প গ্রহণ এবং পঞ্চগুঁড়ি, গঙ্গামৃত্তিকা ও পঞ্চপল্লব সহযোগে মঙ্গলঘট স্থাপন।</p><div class="bg-amber-950/30 p-3 rounded-lg border border-orange-500/20 mt-2"><p class="text-orange-300 font-semibold">সংকল্প বাক্য:</p><p class="italic text-orange-200">বিষ্ণুরোম্ তৎসৎ অদ্য কার্তিকী অমাবস্যায়াং তিথৌ... শ্রীমদ্দক্ষিণকালিকা প্রীতিকামঃ পূজাকর্মাহং করিষ্যে।</p></div>',
    videoUrl: 'https://www.youtube.com/watch?v=yQt_GhyWOXc'
  },
  {
    id: 103,
    pujaId: 10,
    stepOrder: 3,
    title: 'Maa Kali Dhyana & Avahana',
    titleDevanagari: 'माँ काली ध्यान एवं आवाहन',
    titleBengali: 'মা কালীর ধ্যান ও আবাহন',
    description: '<h3>মা কালীর ধ্যান ও আবাহন (Maa Kali Dhyana & Avahana)</h3><p>শ্রী শ্রী দক্ষিণকালিকার দিব্য ধ্যান ও প্রাণপ্রতিষ্ঠা। করালবদনা চতুর্ভুজা খড়্গধারিণী মা ভবতারিণীর রূপ ধ্যান।</p><div class="bg-amber-950/30 p-3 rounded-lg border border-orange-500/20 mt-2"><p class="text-orange-300 font-semibold">ধ্যান মন্ত্র:</p><p class="italic text-orange-200">ওঁ করালবদনাং ঘোরাং মুক্তকেশীং চতুর্ভুজাং। কালিকাং দক্ষিণাং দিব্যাং মুণ্ডমালাবিভূষিতাম্॥ সদাহাস্যাননাং দেবীং পীনোন্নতপয়োধরাম্। মহামেঘপ্রভাং শ্যামাং ত্রিনেত্রাং বরদাভয়াম্॥</p></div>',
    videoUrl: 'https://www.youtube.com/watch?v=JAl7pjMa2q8'
  },
  {
    id: 104,
    pujaId: 10,
    stepOrder: 4,
    title: 'Shodashopachara Puja',
    titleDevanagari: 'षोडशोपचार पूजा',
    titleBengali: 'ষোড়শোপচারে পূজা',
    description: '<h3>ষোড়শোপচারে পূজা ও অর্ঘ্য প্রদান (Shodashopachara Puja)</h3><p>দেবীকে ষোড়শ উপচার নিবেদন — আসন, স্বাগত, পদ্য, অর্ঘ্য, আচমনীয়, মধুপর্ক, স্নানীয়, বস্ত্র, ভূষণ, গন্ধ (রক্তচন্দন), পুষ্প (১০৮ লাল জবা ফুল), ধূপ, দীপ, নৈবেদ্য, পানীয় ও তাম্বুল।</p><div class="bg-amber-950/30 p-3 rounded-lg border border-orange-500/20 mt-2"><p class="text-orange-300 font-semibold">জবা পুষ্প প্রদান মন্ত্র:</p><p class="italic text-orange-200">ওঁ রক্তচন্দন সংমিশ্রং রক্তপুষ্পং মনোহরম্। কাল্যৈ দত্তং ময়া দেব্যৈ গৃহাণ পরমেশ্বরী॥</p></div>',
    videoUrl: 'https://www.youtube.com/watch?v=5u-uulot9X4'
  },
  {
    id: 105,
    pujaId: 10,
    stepOrder: 5,
    title: 'Pushpanjali & Japa Mantra',
    titleDevanagari: 'पुष्पाञ्जलि एवं मूल मन्त्र',
    titleBengali: 'পুষ্পাঞ্জলি মন্ত্র ও জপ',
    description: '<h3>পুষ্পাঞ্জলি ও মূল বীজ মন্ত্র (Pushpanjali & Japa)</h3><p>ভক্তবৃন্দের সমবেত পুষ্পাঞ্জলি এবং দেবী কালীর সিদ্ধ বীজমন্ত্র জপ।</p><div class="bg-amber-950/30 p-3 rounded-lg border border-orange-500/20 mt-2"><p class="text-orange-300 font-semibold">পুষ্পাঞ্জলি মন্ত্র:</p><p class="italic text-orange-200">ওঁ জয়ন্তী মঙ্গলা কালী ভদ্রকালী কপালিনী। দুর্গা শিবা ক্ষমা ধাত্রী স্বাহা স্বধা নমোঽস্তু তে॥<br/>এষ সচন্দন পুষ্পবিল্বপত্রাঞ্জলিঃ শ্রীমদ্দক্ষিণকালিকায়ৈ নমঃ।</p><p class="text-orange-300 font-semibold mt-2">মূল বীজ মন্ত্র:</p><p class="italic text-orange-200">ওঁ ক্রীঁ কাল্যৈ নমঃ (ॐ क्रीं काल्यै नमः)</p></div>',
    videoUrl: 'https://www.youtube.com/watch?v=roS3QBV_xyU'
  },
  {
    id: 106,
    pujaId: 10,
    stepOrder: 6,
    title: 'Nishitha Aarti & Visarjan',
    titleDevanagari: 'निशीथ आरती एवं विसर्जन',
    titleBengali: 'নিশীথ আরতি ও বিসর্জন',
    description: '<h3>নিশীথ আরতি, স্তব ও বিসর্জন (Nishitha Aarti & Visarjan)</h3><p>অমাবস্যার নিশীথকালে পঞ্চপ্রদীপ ও কর্পূর আরতি। দেবীস্তোত্র পাঠ, অপরাধ ভঞ্জন স্তব এবং সর্বশেষে মায়ের শান্তিজল গ্রহণ।</p><div class="bg-amber-950/30 p-3 rounded-lg border border-orange-500/20 mt-2"><p class="text-orange-300 font-semibold">প্রণাম মন্ত্র:</p><p class="italic text-orange-200">সর্বমঙ্গল মঙ্গল্যে শিবে সর্বার্থ সাধিকে। শরণ্যে ত্র্যম্বকে গৌরি নারায়ণি নমোঽস্তু তে॥</p></div>',
    videoUrl: 'https://www.youtube.com/watch?v=uBr9f0tMrGs'
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
      const steps = (stepsRes.data && stepsRes.data.length > 0) 
        ? stepsRes.data 
        : (isKali ? KALI_PUJA_STEPS : []);
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
