import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useAuth = (requireAuth = true) => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (requireAuth && !userInfo) {
      navigate('/login');
    } else if (!requireAuth && userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate, requireAuth]);

  return userInfo;
};

export default useAuth;