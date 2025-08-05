import mongoose from 'mongoose';

const TodoItemSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Please provide text for the todo item']
  },
  completed: {
    type: Boolean,
    default: false
  },
  list: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TodoList',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('TodoItem', TodoItemSchema);