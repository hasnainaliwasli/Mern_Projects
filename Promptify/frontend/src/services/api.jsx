import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Attach token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('pf_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Optional: global 401 handler
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      localStorage.removeItem('pf_token');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default api;

export const loginApi = (email, password) =>
  api.post('/api/users/login', { email, password });

export const registerApi = (name, email, password) =>
  api.post('/api/users/register', { name, email, password });
