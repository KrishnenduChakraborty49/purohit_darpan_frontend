import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axiosInstance from '../api/axiosInstance';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (username, password) => {
        const { data } = await axiosInstance.post('/auth/login', { username, password });
        localStorage.setItem('pd_token', data.token);
        set({ user: data, token: data.token, isAuthenticated: true });
        return data;
      },

      register: async (payload) => {
        const { data } = await axiosInstance.post('/auth/register', payload);
        localStorage.setItem('pd_token', data.token);
        set({ user: data, token: data.token, isAuthenticated: true });
        return data;
      },

      logout: () => {
        localStorage.removeItem('pd_token');
        localStorage.removeItem('pd_user');
        set({ user: null, token: null, isAuthenticated: false });
      },

      updateFcmToken: async (fcmToken) => {
        const userId = get().user?.userId;
        if (!userId) return;
        await axiosInstance.post('/notifications/register-token', { userId, fcmToken });
      },
    }),
    {
      name: 'pd_auth',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
