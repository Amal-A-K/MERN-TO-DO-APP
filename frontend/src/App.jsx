import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Layout.jsx';
import RequireAuth from './components/RequireAuth';
import LoginPage from './pages/auth/LoginPage.jsx';
import RegisterPage from './pages/auth/RegisterPage.jsx';
import DashboardPage from './pages/DashboardPage';
import TodoListsPage from './pages/TodoListsPage';
import TodoItemsPage from './pages/TodoItemsPage';
import { getUserProfile } from './features/auth/authSlice';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public routes */}
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />

          {/* Protected routes */}
          <Route element={<RequireAuth />}>
            <Route index element={<DashboardPage />} />
            <Route path="lists" element={<TodoListsPage />} />
            <Route path="lists/:listId" element={<TodoItemsPage />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}

export default App;