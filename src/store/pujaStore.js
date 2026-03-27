import { create } from 'zustand';
import axiosInstance from '../api/axiosInstance';

export const usePujaStore = create((set, get) => ({
  pujas: [],
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
      set({ pujas: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  fetchPuja: async (pujaId) => {
    set({ loading: true, error: null });
    try {
      const [pujaRes, stepsRes] = await Promise.all([
        axiosInstance.get(`/pujas/${pujaId}`),
        axiosInstance.get(`/pujas/${pujaId}/steps`),
      ]);
      set({
        currentPuja: pujaRes.data,
        currentSteps: stepsRes.data,
        currentStep: stepsRes.data[0] || null,
        loading: false,
      });
    } catch (err) {
      set({ error: err.message, loading: false });
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
}));
