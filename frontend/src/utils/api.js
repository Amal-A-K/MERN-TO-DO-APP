import axios from 'axios';
import { logoutUser } from '../features/auth/authSlice';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true
});

/**
 * Injects the Redux store to dispatch actions from the interceptor.
 * This is called from main.jsx to avoid circular dependencies.
 * @param {import('@reduxjs/toolkit').Store} store The Redux store.
 */
export const setupInterceptors = (store) => {
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401 && !error.config.url.endsWith('/login')) {
        store.dispatch(logoutUser());
      }
      return Promise.reject(error);
    }
  );
};

export default api;