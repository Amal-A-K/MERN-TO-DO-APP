import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import {
  getTodoItems,
  createTodoItem,
  updateTodoItem,
  deleteTodoItem,
  selectListById,
  selectItemsForList,
} from '../features/todos/todoSlice';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import Spinner from '../components/ui/Spinner';
import { TiTrash } from 'react-icons/ti';

const TodoItemsPage = () => {
  const { listId } = useParams();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.todos);
  const items = useSelector((state) => selectItemsForList(state, listId));
  const currentList = useSelector((state) => selectListById(state, listId));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItemText, setNewItemText] = useState('');

  useEffect(() => {
    dispatch(getTodoItems(listId));
  }, [dispatch, listId]);

  const handleCreateItem = async () => {
    try {
      await dispatch(createTodoItem({ listId, text: newItemText })).unwrap();
      setNewItemText('');
      setIsModalOpen(false);
    } catch (err) {
      toast.error(err.message || 'Failed to create item.');
    }
  };

  const handleToggleComplete = (item) => {
    dispatch(updateTodoItem({
      listId,
      itemId: item._id,
      completed: !item.completed,
    }));
  };

  if (status === 'loading') {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Link to="/lists" className="text-violet-500 hover:bg-violet-200 p-2 rounded mb-2 inline-block">
            ← Back to Lists
          </Link>
          <h1 className="text-2xl font-bold">{currentList?.name || 'Todo Items'}</h1>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          Add New Item
        </Button>
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <div key={item._id} className="flex items-center p-3 border rounded-lg bg-violet-300 hover:bg-violet-400 ">
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => handleToggleComplete(item)}
              className="mr-3 h-5 w-5"
            />
            <span className={`flex-grow ${item.completed ? 'line-through text-gray-500' : ''}`}>
              {item.text}
            </span>
            <Button
              variant="danger"
              size="sm"
              onClick={() => dispatch(deleteTodoItem({ listId, itemId: item._id }))}
            >
              <TiTrash className="h-5 w-5" />
            </Button>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
        <Input
          type="text"
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          placeholder="Item text"
          className="mb-4"
        />
        <div className="flex justify-end space-x-2">
          <Button
            variant="secondary"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </Button>
          <Button onClick={handleCreateItem}>Add Item</Button>
        </div>
      </Modal>
    </div>
  );
};

export default TodoItemsPage;