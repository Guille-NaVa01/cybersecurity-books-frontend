/**
 * api/axios.js
 *
 * Configured Axios instance for the Books Dashboard API.
 * An interceptor reads the JWT from localStorage and injects it as a
 * Bearer token in every outgoing request.  A console.log prints the
 * token (truncated) so it is visible in DevTools during the demo.
 */
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// ── Request interceptor: inject JWT ──────────────────────────────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response interceptor: surface 401 globally ───────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('[JWT] Token rejected by server (401). Clearing session.');
      localStorage.removeItem('access_token');
      localStorage.removeItem('username');
      window.dispatchEvent(new Event('auth:unauthorized'));
    }
    return Promise.reject(error);
  }
);

export default api;
