import express from 'express';
import {
  getTodoLists,
  createTodoList,
  updateTodoList,
  deleteTodoList,
  getTodoItems,
  createTodoItem,
  updateTodoItem,
  deleteTodoItem
} from '../controllers/todoController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// List routes
router.route('/lists')
  .get(protect, getTodoLists)
  .post(protect, createTodoList);

router.route('/lists/:id')
  .put(protect, updateTodoList)
  .delete(protect, deleteTodoList);

// Item routes
router.route('/lists/:listId/items')
  .get(protect, getTodoItems)
  .post(protect, createTodoItem);

router.route('/lists/:listId/items/:itemId')
  .put(protect, updateTodoItem)
  .delete(protect, deleteTodoItem);

export default router;