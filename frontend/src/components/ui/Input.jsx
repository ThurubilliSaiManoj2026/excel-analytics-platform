import { forwardRef } from 'react';

const Input = forwardRef(({ 
  className = '', 
  type = 'text',
  error = false,
  ...props 
}, ref) => {
  const baseClasses = 'flex h-12 w-full rounded-xl border-2 bg-white/80 backdrop-blur-sm px-4 py-3 text-base font-medium ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 transition-all duration-300 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 input-focus';
  
  const normalClasses = 'border-gray-200 hover:border-gray-300 focus:border-primary-500 focus:ring-primary-500/20 focus:shadow-lg focus:shadow-primary-500/10';
  const errorClasses = 'border-danger-300 hover:border-danger-400 focus:border-danger-500 focus:ring-danger-500/20 focus:shadow-lg focus:shadow-danger-500/10';

  return (
    <input
      type={type}
      className={`${baseClasses} ${error ? errorClasses : normalClasses} ${className}`}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export default Input;