import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Spinner from './ui/Spinner';

const RequireAuth = () => {
  const { userInfo, status } = useSelector((state) => state.auth);
  const location = useLocation();

  // If we have user info from the persisted state, render the content immediately.
  // The background getUserProfile call will handle re-validation.
  if (userInfo) {
    return <Outlet />;
  }

  // If we don't have user info, we need to check the status of the initial profile fetch.
  // Show a spinner only on the very first load when status is idle or loading.
  if (status === 'idle' || status === 'loading') {
    return <Spinner />;
  }

  // If the check is done and there's still no userInfo, redirect to login.
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuth;