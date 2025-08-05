import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { registerUser as register } from '../../features/auth/authSlice';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Input from '../../components/ui/Input'; 
import PasswordStrengthMeter from '../../components/PasswordStrengthMeter';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(email);

  const isPasswordValid =
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password) &&
    /[!@#$%^&*]/.test(password);

  const isFormSubmittable = isPasswordValid && isEmailValid && email.length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEmailValid) {
      toast.error('Please enter a valid email address.');
      return;
    }
    if (!isPasswordValid) {
      toast.error('Please create a stronger password.');
      return;
    }
    try {
      await dispatch(register({ email, password })).unwrap();
      toast.success('Registration successful!');
      navigate('/');
    } catch (err) {
      toast.error(err.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center">
      <Card className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Register</h1>
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
            <PasswordStrengthMeter password={password} />
          </div>
          <Button type="submit" className="w-full" disabled={!isFormSubmittable}>
            Register
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default RegisterPage;