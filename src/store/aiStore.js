import { create } from 'zustand';
import axiosInstance from '../api/axiosInstance';

export const useAIStore = create((set, get) => ({
  messages: [],
  isOpen: false,
  isLoading: false,
  context: null, // { currentPuja, currentStep, currentShlok }

  setContext: (ctx) => set({ context: ctx }),

  openPanel: () => set({ isOpen: true }),
  closePanel: () => set({ isOpen: false }),
  togglePanel: () => set((s) => ({ isOpen: !s.isOpen })),

  sendQuestion: async (question, userId) => {
    const { context } = get();
    const userMsg = { role: 'user', content: question, timestamp: new Date() };
    set((s) => ({ messages: [...s.messages, userMsg], isLoading: true }));

    try {
      const { data } = await axiosInstance.post('/ai/query', {
        question,
        userId,
        userContext: context
          ? `Current Puja: ${context.currentPuja?.name || ''}. Current Step: ${context.currentStep?.title || ''}.`
          : null,
        contextPujaId: context?.currentPuja?.id,
        contextStepId: context?.currentStep?.id,
      });

      const aiMsg = { role: 'assistant', content: data.response, timestamp: new Date() };
      set((s) => ({ messages: [...s.messages, aiMsg], isLoading: false }));
    } catch (err) {
      const errMsg = { role: 'assistant', content: '🙏 I apologize, I am temporarily unavailable. Please try again.', timestamp: new Date() };
      set((s) => ({ messages: [...s.messages, errMsg], isLoading: false }));
    }
  },

  explainWord: async (word, shlokContext, userId, pujaContext) => {
    set((s) => ({
      messages: [...s.messages, { role: 'user', content: `Explain: "${word}" in the shlok`, timestamp: new Date() }],
      isLoading: true,
      isOpen: true,
    }));

    try {
      const { data } = await axiosInstance.post('/ai/explain-word', {
        word, shlokContext, pujaContext, userId,
      });
      const aiMsg = { role: 'assistant', content: data.response, timestamp: new Date() };
      set((s) => ({ messages: [...s.messages, aiMsg], isLoading: false }));
    } catch {
      set((s) => ({ isLoading: false }));
    }
  },

  clearMessages: () => set({ messages: [] }),

  sendFeedback: async (queryLogId, userId, rating, comment) => {
    try {
      await axiosInstance.post('/ai/feedback', { queryLogId, userId, rating, comment });
    } catch (err) {
      console.error('Feedback failed:', err);
    }
  },
}));
