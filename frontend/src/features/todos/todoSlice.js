import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import api from '../../utils/api';

const API_URL = '/todos';

// Async thunks for Todo Lists
export const getTodoLists = createAsyncThunk(
  'todos/getLists',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/lists`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createTodoList = createAsyncThunk(
  'todos/createList',
  async (listData, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/lists`, listData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteTodoList = createAsyncThunk(
  'todos/deleteList',
  async (listId, { rejectWithValue }) => {
    try {
      await api.delete(`${API_URL}/lists/${listId}`);
      return listId; // Return the id to identify which list to remove
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTodoItem = createAsyncThunk(
  'todos/updateItem',
  async ({ listId, itemId, completed }, { rejectWithValue }) => {
    try {
      const response = await api.put(`${API_URL}/lists/${listId}/items/${itemId}`, { completed });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteTodoItem = createAsyncThunk(
  'todos/deleteItem',
  async ({ listId, itemId }, { rejectWithValue }) => {
    try {
      await api.delete(`${API_URL}/lists/${listId}/items/${itemId}`);
      return { listId, itemId };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunks for Todo Items
export const getTodoItems = createAsyncThunk(
  'todos/getItems',
  async (listId, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/lists/${listId}/items`);
      return { listId, items: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createTodoItem = createAsyncThunk(
  'todos/createItem',
  async ({ listId, text }, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/lists/${listId}/items`, { text });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    lists: [],
    itemsByList: {}, // Store items keyed by listId
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Lists
      .addCase(getTodoLists.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTodoLists.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.lists = action.payload;
      })
      .addCase(getTodoLists.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to get lists';
      })
      // Get Items
      .addCase(getTodoItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTodoItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.itemsByList[action.payload.listId] = action.payload.items;
      })
      .addCase(getTodoItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to get items';
      })
      // Create List
      .addCase(createTodoList.fulfilled, (state, action) => {
        state.lists.push(action.payload);
      })
      // Delete List
      .addCase(deleteTodoList.fulfilled, (state, action) => {
        // action.payload is the listId
        state.lists = state.lists.filter((list) => list._id !== action.payload);
      })
      // Create Item
      .addCase(createTodoItem.fulfilled, (state, action) => {
        const listId = action.payload.list;
        if (!state.itemsByList[listId]) {
          state.itemsByList[listId] = [];
        }
        state.itemsByList[listId].push(action.payload);
      })
      // Update Item
      .addCase(updateTodoItem.fulfilled, (state, action) => {
        const updatedItem = action.payload;
        const listId = updatedItem.list;
        const itemIndex = state.itemsByList[listId]?.findIndex(
          (item) => item._id === updatedItem._id
        );
        if (itemIndex !== -1 && state.itemsByList[listId]) {
          state.itemsByList[listId][itemIndex] = updatedItem;
        }
      })
      // Delete Item
      .addCase(deleteTodoItem.fulfilled, (state, action) => {
        const { listId, itemId } = action.payload;
        state.itemsByList[listId] = state.itemsByList[listId]?.filter((item) => item._id !== itemId);
      });
  },
});

export default todoSlice.reducer;

// Selectors
const selectLists = (state) => state.todos.lists;
const selectItemsByList = (state) => state.todos.itemsByList;

export const selectListById = createSelector(
  [selectLists, (state, listId) => listId],
  (lists, listId) => lists.find((list) => list._id === listId)
);

// Create a stable empty array reference to avoid creating new arrays in the selector.
const emptyItems = [];

export const selectItemsForList = createSelector(
  [selectItemsByList, (state, listId) => listId],
  (itemsByList, listId) => itemsByList[listId] || emptyItems
);