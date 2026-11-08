import { create } from 'zustand';
import axiosInstance from '../api/axiosInstance';

const API_BASE = import.meta.env.VITE_API_URL || 'https://purohit-darpan-backend-q7b6.onrender.com/api';

export const useAIStore = create((set, get) => ({
  messages: [],
  isOpen: false,
  isLoading: false,
  isStreaming: false,
  context: null, // { currentPuja, currentStep, currentShlok }

  setContext: (ctx) => set({ context: ctx }),

  openPanel: () => set({ isOpen: true }),
  closePanel: () => set({ isOpen: false }),
  togglePanel: () => set((s) => ({ isOpen: !s.isOpen })),

  sendQuestion: async (question, userId) => {
    const { context } = get();
    const userMsg = { role: 'user', content: question, timestamp: new Date() };

    // 1. Immediately display user message and empty streaming assistant bubble
    set((s) => ({
      messages: [
        ...s.messages,
        userMsg,
        { role: 'assistant', content: '', timestamp: new Date(), isStreaming: true }
      ],
      isLoading: true,
      isStreaming: true
    }));

    const userContext = context
      ? `Current Puja: ${context.currentPuja?.name || ''}. Current Step: ${context.currentStep?.title || ''}.`
      : '';

    const streamUrl = `${API_BASE}/ai/ask/stream?question=${encodeURIComponent(question)}${userContext ? `&userContext=${encodeURIComponent(userContext)}` : ''}`;

    let accumulatedContent = '';

    try {
      const response = await fetch(streamUrl, {
        method: 'GET',
        headers: {
          'Accept': 'text/event-stream'
        }
      });

      if (!response.ok || !response.body) {
        throw new Error(`SSE stream failed with status ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data:')) {
            const data = line.slice(5);
            if (data === '[DONE]') {
              continue;
            }
            accumulatedContent += data === '' ? '\n' : data;

            // Real-time word-by-word streaming update into React state
            set((s) => {
              const msgs = [...s.messages];
              const last = msgs[msgs.length - 1];
              if (last && last.role === 'assistant') {
                last.content = accumulatedContent;
              }
              return { messages: msgs, isLoading: false };
            });
          }
        }
      }

      // Finish streaming cleanly
      set((s) => {
        const msgs = [...s.messages];
        const last = msgs[msgs.length - 1];
        if (last && last.role === 'assistant') {
          last.isStreaming = false;
        }
        return { messages: msgs, isLoading: false, isStreaming: false };
      });

    } catch (streamErr) {
      console.warn('Real-time streaming fallback to standard query:', streamErr);

      // Fallback: Use standard blocking /ai/query if SSE is interrupted or unsupported
      try {
        const { data } = await axiosInstance.post('/ai/query', {
          question,
          userId,
          userContext: userContext || null,
          contextPujaId: context?.currentPuja?.id,
          contextStepId: context?.currentStep?.id,
        });

        set((s) => {
          const msgs = [...s.messages];
          const last = msgs[msgs.length - 1];
          if (last && last.role === 'assistant') {
            last.content = data.response || '';
            last.isStreaming = false;
          }
          return { messages: msgs, isLoading: false, isStreaming: false };
        });
      } catch (fallbackErr) {
        set((s) => {
          const msgs = [...s.messages];
          const last = msgs[msgs.length - 1];
          if (last && last.role === 'assistant') {
            last.content = '🙏 I apologize, I am temporarily unavailable. Please try asking again.';
            last.isStreaming = false;
          }
          return { messages: msgs, isLoading: false, isStreaming: false };
        });
      }
    }
  },

  explainWord: async (word, shlokContext, userId, pujaContext) => {
    set((s) => ({
      messages: [
        ...s.messages, 
        { role: 'user', content: `Explain: "${word}" in the shlok`, timestamp: new Date() },
        { role: 'assistant', content: '', timestamp: new Date(), isStreaming: true }
      ],
      isLoading: true,
      isStreaming: true,
      isOpen: true,
    }));

    try {
      const { data } = await axiosInstance.post('/ai/explain-word', {
        word, shlokContext, pujaContext, userId,
      });
      set((s) => {
        const msgs = [...s.messages];
        const last = msgs[msgs.length - 1];
        if (last && last.role === 'assistant') {
          last.content = data.response || '';
          last.isStreaming = false;
        }
        return { messages: msgs, isLoading: false, isStreaming: false };
      });
    } catch {
      set((s) => {
        const msgs = [...s.messages];
        const last = msgs[msgs.length - 1];
        if (last && last.role === 'assistant') {
          last.content = 'I could not retrieve the word explanation at this time.';
          last.isStreaming = false;
        }
        return { messages: msgs, isLoading: false, isStreaming: false };
      });
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
