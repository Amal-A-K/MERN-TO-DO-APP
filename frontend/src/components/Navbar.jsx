import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { logoutUser as logout } from '../features/auth/authSlice';

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate('/login');
    } catch (err) {
      toast.error('Logout failed. Please try again.');
    }
  };

  return (
    <nav className="bg-gradient-to-r from-violet-600 to-violet-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Todo App
        </Link>
        <div className="flex items-center space-x-4">
          {userInfo ? (
            <>
              <Link to="/lists" className="hover:text-violet-200">
                My Lists
              </Link>
              <button
                onClick={handleLogout}
                className="hover:text-violet-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;