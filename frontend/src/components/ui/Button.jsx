import { forwardRef } from 'react';

const Button = forwardRef(({ 
  className = '', 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  loading = false,
  children, 
  ...props 
}, ref) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transform hover:scale-105 active:scale-95 button-glow';
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/40 focus-visible:ring-primary-500',
    secondary: 'bg-gradient-to-r from-secondary-500 to-secondary-600 text-white hover:from-secondary-600 hover:to-secondary-700 shadow-lg shadow-secondary-500/25 hover:shadow-xl hover:shadow-secondary-500/40 focus-visible:ring-secondary-500',
    accent: 'bg-gradient-to-r from-accent-500 to-accent-600 text-white hover:from-accent-600 hover:to-accent-700 shadow-lg shadow-accent-500/25 hover:shadow-xl hover:shadow-accent-500/40 focus-visible:ring-accent-500',
    outline: 'border-2 border-primary-300 bg-white/80 backdrop-blur-sm text-primary-700 hover:bg-primary-50 hover:border-primary-400 shadow-md hover:shadow-lg focus-visible:ring-primary-500',
    ghost: 'text-primary-700 hover:bg-primary-100/80 backdrop-blur-sm hover:shadow-md focus-visible:ring-primary-500',
    danger: 'bg-gradient-to-r from-danger-500 to-danger-600 text-white hover:from-danger-600 hover:to-danger-700 shadow-lg shadow-danger-500/25 hover:shadow-xl hover:shadow-danger-500/40 focus-visible:ring-danger-500',
    success: 'bg-gradient-to-r from-success-500 to-success-600 text-white hover:from-success-600 hover:to-success-700 shadow-lg shadow-success-500/25 hover:shadow-xl hover:shadow-success-500/40 focus-visible:ring-success-500',
  };
  
  const sizes = {
    sm: 'h-9 px-4 text-sm',
    md: 'h-11 px-6 py-2 text-base',
    lg: 'h-13 px-8 text-lg',
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      ref={ref}
      {...props}
    >
      {loading && (
        <div className="animate-spin -ml-1 mr-3 h-5 w-5 border-2 border-white/30 border-t-white rounded-full"></div>
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
});

Button.displayName = 'Button';

export default Button;