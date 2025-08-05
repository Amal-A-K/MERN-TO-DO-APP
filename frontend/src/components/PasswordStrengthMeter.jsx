import React from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';

const Requirement = ({ met, label }) => (
  <div className={`flex items-center text-sm ${met ? 'text-green-500' : 'text-gray-500'}`}>
    {met ? <FaCheck className="mr-2" /> : <FaTimes className="mr-2" />}
    {label}
  </div>
);

const PasswordStrengthMeter = ({ password }) => {
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*]/.test(password);

  return (
    <div className="mt-2 space-y-1 text-left">
      <Requirement met={hasMinLength} label="At least 8 characters" />
      <Requirement met={hasUppercase} label="Contains an uppercase letter" />
      <Requirement met={hasLowercase} label="Contains a lowercase letter" />
      <Requirement met={hasNumber} label="Contains a number" />
      <Requirement met={hasSpecialChar} label="Contains a special character (!@#$%^&*)" />
    </div>
  );
};

export default PasswordStrengthMeter;