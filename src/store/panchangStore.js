import { create } from 'zustand';
import axiosInstance from '../api/axiosInstance';
import { format } from 'date-fns';

export const usePanchangStore = create((set, get) => ({
  today: null,
  selectedDate: new Date(),
  monthData: [],
  festivals: [],
  loading: false,
  error: null,

  fetchToday: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await axiosInstance.get('/panchang/today');
      set({ today: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  fetchDate: async (date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    set({ loading: true, error: null, selectedDate: date });
    try {
      const { data } = await axiosInstance.get(`/panchang/date/${dateStr}`);
      set({ today: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  fetchMonth: async (yearMonth) => {
    // yearMonth: 'yyyy-MM' string
    set({ loading: true, error: null });
    try {
      const { data } = await axiosInstance.get(`/panchang/month/${yearMonth}`);
      set({ monthData: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  fetchUpcomingFestivals: async (days = 30) => {
    try {
      const { data } = await axiosInstance.get(`/festivals/upcoming?days=${days}`);
      set({ festivals: data });
    } catch (err) {
      console.error('Festival fetch error:', err);
    }
  },
}));
