import api from '../../utils/api';

const todoService = {
  getLists: async () => {
    const response = await api.get('/api/todos/lists');
    return response.data;
  },

  createList: async (name) => {
    const response = await api.post('/api/todos/lists', { name });
    return response.data;
  },

  updateList: async (id, name) => {
    const response = await api.put(`/api/todos/lists/${id}`, { name });
    return response.data;
  },

  deleteList: async (id) => {
    await api.delete(`/api/todos/lists/${id}`);
  },

  getItems: async (listId) => {
    const response = await api.get(`/api/todos/lists/${listId}/items`);
    return response.data;
  },

  createItem: async (listId, text) => {
    const response = await api.post(`/api/todos/lists/${listId}/items`, { text });
    return response.data;
  },

  updateItem: async (listId, itemId, data) => {
    const response = await api.put(`/api/todos/lists/${listId}/items/${itemId}`, data);
    return response.data;
  },

  deleteItem: async (listId, itemId) => {
    await api.delete(`/api/todos/lists/${listId}/items/${itemId}`);
  }
};

export default todoService;