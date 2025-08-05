import mongoose from 'mongoose';

const TodoListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for the list']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('TodoList', TodoListSchema);