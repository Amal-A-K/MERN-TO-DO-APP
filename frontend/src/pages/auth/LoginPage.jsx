import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser as login } from '../../features/auth/authSlice';
import { toast } from 'react-toastify';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Card from '../../components/ui/Card';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(email);
  const isFormValid = isEmailValid && email.length > 0 && password.length >= 8;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      toast.error('Please enter a valid email and password.');
      return;
    }
    try {
      await dispatch(login({ email, password })).unwrap();
      navigate('/');
    } catch (err) {
      toast.error(err.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="flex justify-center items-center">
      <Card className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={email.length > 0 && !isEmailValid ? 'border-red-500' : ''}
              required
            />
            {email.length > 0 && !isEmailValid && (
              <p className="text-red-500 text-xs mt-1">Please enter a valid email address.</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block mb-2">Password</label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <AiOutlineEyeInvisible className="h-5 w-5" /> : <AiOutlineEye className="h-5 w-5" />}
              </button>
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={!isFormValid}>
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;