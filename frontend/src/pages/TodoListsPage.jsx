import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodoLists, createTodoList, deleteTodoList } from '../features/todos/todoSlice';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import Spinner from '../components/ui/Spinner';
import { TiTrash } from 'react-icons/ti';
import { AiOutlineEye } from 'react-icons/ai';

const TodoListsPage = () => {
  const dispatch = useDispatch();
  const { lists, status } = useSelector((state) => state.todos);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newListName, setNewListName] = useState('');

  useEffect(() => {
    dispatch(getTodoLists());
  }, [dispatch]);

  const handleCreateList = async () => {
    try {
      await dispatch(createTodoList({ name: newListName })).unwrap();
      setNewListName('');
      setIsModalOpen(false);
    } catch (err) {
      toast.error(err.message || 'Failed to create list.');
    }
  };

  if (status === 'loading') {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Todo Lists</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          Create New List
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lists.map((list) => (
          <div key={list._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-violet-300 hover:bg-violet-400">
            <h2 className="text-xl font-semibold mb-2">{list.name}</h2>
            <div className="flex space-x-2">
              <Button
                as="link"
                to={`/lists/${list._id}`}
                size="sm"
              >
                <AiOutlineEye className="h-5 w-5" />
              </Button>
              <Button
                variant="danger"
                onClick={() => dispatch(deleteTodoList(list._id))}
                size="sm"
              >
                <TiTrash className="h-5 w-5" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-semibold mb-4">Create New List</h2>
        <Input
          type="text"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          placeholder="List name"
          className="mb-4"
        />
        <div className="flex justify-end space-x-2">
          <Button
            variant="secondary"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </Button>
          <Button onClick={handleCreateList}>Create</Button>
        </div>
      </Modal>
    </div>
  );
};

export default TodoListsPage;