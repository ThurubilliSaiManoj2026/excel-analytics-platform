const Card = ({ className = '', children, hover = true, ...props }) => (
  <div
    className={`rounded-2xl glass-effect text-gray-900 shadow-xl animate-fade-in-up ${hover ? 'card-hover' : ''} ${className}`}
    {...props}
  >
    {children}
  </div>
);

const CardHeader = ({ className = '', children, ...props }) => (
  <div className={`flex flex-col space-y-2 p-8 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ className = '', children, gradient = false, ...props }) => (
  <h3
    className={`text-2xl font-bold leading-tight tracking-tight ${gradient ? 'gradient-text' : 'text-gray-900'} ${className}`}
    {...props}
  >
    {children}
  </h3>
);

const CardDescription = ({ className = '', children, ...props }) => (
  <p className={`text-base text-gray-600 leading-relaxed ${className}`} {...props}>
    {children}
  </p>
);

const CardContent = ({ className = '', children, ...props }) => (
  <div className={`p-8 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

const CardFooter = ({ className = '', children, ...props }) => (
  <div className={`flex items-center p-8 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };