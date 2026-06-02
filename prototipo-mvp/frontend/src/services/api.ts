import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  signup: (data: any) => api.post('/auth/signup', data),
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  logout: () => localStorage.removeItem('token'),
};

export const jobService = {
  getRecommendations: (limit = 20) =>
    api.get(`/vagas/recomendadas?limit=${limit}`),
  getAll: (filters?: any) => api.get('/vagas', { params: filters }),
  getById: (id: string) => api.get(`/vagas/${id}`),
  apply: (jobId: string) => api.post(`/vagas/${jobId}/apply`),
};

export const cvService = {
  upload: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/cv/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

export const docsService = {
  upload: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/docs/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

export const userService = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data: any) => api.put('/users/profile', data),
};

export default api;
