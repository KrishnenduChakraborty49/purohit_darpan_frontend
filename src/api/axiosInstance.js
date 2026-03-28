import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'https://purohit-darpan-backend-q7b6.onrender.com/api';

const axiosInstance = axios.create({
  baseURL: API_BASE,
  timeout: 120000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor: attach JWT token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('pd_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle 401 globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('pd_token');
      localStorage.removeItem('pd_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
