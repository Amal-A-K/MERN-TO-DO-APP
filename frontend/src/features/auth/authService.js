import api from '../../utils/api';

const authService = {
  register: async (email, password) => {
    const response = await api.post('/auth/register', { email, password });
    return response.data;
  },

  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  logout: async () => {
    await api.post('/auth/logout');
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  }
};

export default authService;