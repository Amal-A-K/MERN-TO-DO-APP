import { Link } from 'react-router-dom';

// Helper to combine class names cleanly
const cn = (...classes) => classes.filter(Boolean).join(' ');

const Button = ({
  as,
  to,
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center rounded-md font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantClasses = {
    primary: 'bg-violet-600 text-white hover:bg-violet-700 focus:ring-violet-500',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const combinedClasses = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if (as === 'link') {
    return (
      <Link to={to} className={combinedClasses} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={combinedClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;