import axios from 'axios';

// Vite exposes env variables on the `import.meta.env` object.
// VITE_API_URL will be set in Render's environment variables.
// In development, it will be undefined and fall back to a relative path,
// which will be handled by the Vite proxy in vite.config.js.
const API_URL = import.meta.env.VITE_API_URL || '';

const api = axios.create({
  baseURL: API_URL,
});

export default api;