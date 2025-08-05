import api from '../../utils/api';

const todoService = {
  getLists: async () => {
    const response = await api.get('/todos/lists');
    return response.data;
  },

  createList: async (name) => {
    const response = await api.post('/todos/lists', { name });
    return response.data;
  },

  updateList: async (id, name) => {
    const response = await api.put(`/todos/lists/${id}`, { name });
    return response.data;
  },

  deleteList: async (id) => {
    await api.delete(`/todos/lists/${id}`);
  },

  getItems: async (listId) => {
    const response = await api.get(`/todos/lists/${listId}/items`);
    return response.data;
  },

  createItem: async (listId, text) => {
    const response = await api.post(`/todos/lists/${listId}/items`, { text });
    return response.data;
  },

  updateItem: async (listId, itemId, data) => {
    const response = await api.put(`/todos/lists/${listId}/items/${itemId}`, data);
    return response.data;
  },

  deleteItem: async (listId, itemId) => {
    await api.delete(`/todos/lists/${listId}/items/${itemId}`);
  }
};

export default todoService;