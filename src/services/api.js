import axios from 'axios';

const guessApiBase = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl) return envUrl;

  // Production: use Render backend URL
  if (import.meta.env.PROD) {
    return 'https://sowbackend.onrender.com/api';
  }

  // Development: use localhost
  const { protocol, hostname } = window.location;
  const host = /\d+\.\d+\.\d+\.\d+/.test(hostname) ? hostname : 'localhost';
  return `${protocol}//${host}:8001/api`;
};

const API_BASE_URL = guessApiBase();

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  // (response) => response,d
  (response) => {
    const payload = response?.data;
    const normalized = (payload && typeof payload === 'object' && 'data' in payload)
      ? payload
      : { data: payload };
    response.data = normalized;
    return response;
  },
);

export const termsAPI = {
  getAll: () => api.get('/terms'),
};


export const pricelistAPI = {
  getAll: () => api.get('/pricelist'),
  update: (id, data) => api.put(`/pricelist/${id}`, data),
};

export default api;
