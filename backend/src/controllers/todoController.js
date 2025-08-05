import TodoList from '../models/TodoList.js';
import TodoItem from '../models/TodoItem.js';
import asyncHandler from 'express-async-handler';

// @desc    Get all todo lists for user
// @route   GET /api/todos/lists
// @access  Private
export const getTodoLists = asyncHandler(async (req, res) => {
  const lists = await TodoList.find({ user: req.user._id });
  res.json(lists);
});

// @desc    Create new todo list
// @route   POST /api/todos/lists
// @access  Private
export const createTodoList = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const list = await TodoList.create({
    name,
    user: req.user._id
  });

  res.status(201).json(list);
});

// @desc    Update todo list
// @route   PUT /api/todos/lists/:id
// @access  Private
export const updateTodoList = asyncHandler(async (req, res) => {
  const list = await TodoList.findById(req.params.id);

  if (!list) {
    res.status(404);
    throw new Error('Todo list not found');
  }

  if (list.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to update this list');
  }

  const updatedList = await TodoList.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  res.json(updatedList);
});

// @desc    Delete todo list
// @route   DELETE /api/todos/lists/:id
// @access  Private
export const deleteTodoList = asyncHandler(async (req, res) => {
  const list = await TodoList.findById(req.params.id);

  if (!list) {
    res.status(404);
    throw new Error('Todo list not found');
  }

  if (list.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to delete this list');
  }

  // Delete all items in the list
  await TodoItem.deleteMany({ list: list._id });
  await list.deleteOne();

  res.json({ message: 'Todo list removed' });
});

// @desc    Get todo items for list
// @route   GET /api/todos/lists/:listId/items
// @access  Private
export const getTodoItems = asyncHandler(async (req, res) => {
  const list = await TodoList.findOne({
    _id: req.params.listId,
    user: req.user._id
  });

  if (!list) {
    res.status(404);
    throw new Error('Todo list not found');
  }

  const items = await TodoItem.find({ list: list._id });
  res.json(items);
});

// @desc    Create new todo item
// @route   POST /api/todos/lists/:listId/items
// @access  Private
export const createTodoItem = asyncHandler(async (req, res) => {
  const list = await TodoList.findOne({
    _id: req.params.listId,
    user: req.user._id
  });

  if (!list) {
    res.status(404);
    throw new Error('Todo list not found');
  }

  const item = await TodoItem.create({
    text: req.body.text,
    list: list._id
  });

  res.status(201).json(item);
});

// @desc    Update todo item
// @route   PUT /api/todos/lists/:listId/items/:itemId
// @access  Private
export const updateTodoItem = asyncHandler(async (req, res) => {
  const list = await TodoList.findOne({
    _id: req.params.listId,
    user: req.user._id
  });

  if (!list) {
    res.status(404);
    throw new Error('Todo list not found');
  }

  const item = await TodoItem.findOneAndUpdate(
    { _id: req.params.itemId, list: list._id },
    { text: req.body.text, completed: req.body.completed },
    { new: true }
  );

  if (!item) {
    res.status(404);
    throw new Error('Todo item not found');
  }

  res.json(item);
});

// @desc    Delete todo item
// @route   DELETE /api/todos/lists/:listId/items/:itemId
// @access  Private
export const deleteTodoItem = asyncHandler(async (req, res) => {
  const list = await TodoList.findOne({
    _id: req.params.listId,
    user: req.user._id
  });

  if (!list) {
    res.status(404);
    throw new Error('Todo list not found');
  }

  const item = await TodoItem.findOneAndDelete({
    _id: req.params.itemId,
    list: list._id
  });

  if (!item) {
    res.status(404);
    throw new Error('Todo item not found');
  }

  res.json({ message: 'Todo item removed' });
});