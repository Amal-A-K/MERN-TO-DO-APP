import React from 'react';

// Helper to combine class names cleanly
const cn = (...classes) => classes.filter(Boolean).join(' ');

const Input = ({ className, ...props }) => {
  const baseClasses = 'w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-violet-500';
  return <input className={cn(baseClasses, className)} {...props} />;
};

export default Input;