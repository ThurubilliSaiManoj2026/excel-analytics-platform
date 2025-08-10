import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card';
import toast from 'react-hot-toast';

const schema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  confirmPassword: yup.string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  requestedRole: yup.string().required('Please select a role'),
});

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register: registerUser, loading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const password = watch('password');

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    if (password.length >= 6) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['bg-danger-500', 'bg-accent-500', 'bg-yellow-500', 'bg-primary-500', 'bg-success-500'];
    
    return {
      strength,
      label: labels[strength - 1] || '',
      color: colors[strength - 1] || '',
    };
  };

  const passwordStrength = getPasswordStrength(password);

  const onSubmit = async (data) => {
    try {
      const { confirmPassword, ...userData } = data;
      
      // Call the registration API directly without using the auth context for admin requests
      if (userData.requestedRole === 'admin') {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001/api'}/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
        
        const result = await response.json();
        
        if (!response.ok) {
          throw new Error(result.message || 'Registration failed');
        }
        
        toast.success(result.message || 'Admin registration request submitted successfully!');
        navigate('/login');
        return;
      }
      
      // For regular users, use the auth context
      await registerUser(userData);
      toast.success('User registration successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-secondary-400/20 to-accent-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-primary-400/20 to-secondary-400/20 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-accent-300/10 to-primary-300/10 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>
      
      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center animate-fade-in-down">
          <div className="mx-auto h-16 w-16 bg-gradient-to-br from-secondary-500 to-accent-500 rounded-2xl flex items-center justify-center mb-6 animate-bounce-in shadow-lg">
            <UserPlus className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold gradient-text mb-2">Join Us Today</h2>
          <p className="text-gray-600">Create your Excel Analytics Platform account</p>
        </div>
        
        <Card className="animate-scale-in">
          <CardHeader className="text-center">
            <CardTitle gradient>Create your account</CardTitle>
            <CardDescription>
              Start your journey with powerful Excel analytics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="animate-slide-in-left" style={{animationDelay: '0.1s'}}>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  error={!!errors.name}
                  {...register('name')}
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-danger-600 animate-fade-in">{errors.name.message}</p>
                )}
              </div>

              <div className="animate-slide-in-right" style={{animationDelay: '0.2s'}}>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  error={!!errors.email}
                  {...register('email')}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-danger-600 animate-fade-in">{errors.email.message}</p>
                )}
              </div>

              <div className="animate-slide-in-left" style={{animationDelay: '0.25s'}}>
                <label htmlFor="requestedRole" className="block text-sm font-semibold text-gray-700 mb-2">
                  Account Type
                </label>
                <select
                  id="requestedRole"
                  className="flex h-12 w-full rounded-xl border-2 bg-white/80 backdrop-blur-sm px-4 py-3 text-base font-medium transition-all duration-300 focus-visible:outline-none border-gray-200 hover:border-gray-300 focus:border-primary-500 focus:ring-primary-500/20 focus:shadow-lg focus:shadow-primary-500/10"
                  {...register('requestedRole')}
                >
                  <option value="">Select account type</option>
                  <option value="user">Regular User - Instant Access</option>
                  <option value="admin">Admin - Requires Super Admin Approval</option>
                </select>
                {errors.requestedRole && (
                  <p className="mt-2 text-sm text-danger-600 animate-fade-in">{errors.requestedRole.message}</p>
                )}
                <div className="mt-2 text-sm text-gray-500">
                  <p className="mb-1">📊 <strong>Regular User:</strong> Upload and analyze Excel files instantly</p>
                  <p>🛡️ <strong>Admin:</strong> Manage users and system settings (requires approval)</p>
                </div>
              </div>

              <div className="animate-slide-in-left" style={{animationDelay: '0.3s'}}>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a strong password"
                    autoComplete="new-password"
                    error={!!errors.password}
                    {...register('password')}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {password && (
                  <div className="mt-3 animate-fade-in">
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full transition-all duration-500 ${passwordStrength.color}`}
                          style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{passwordStrength.label}</span>
                    </div>
                  </div>
                )}
                {errors.password && (
                  <p className="mt-2 text-sm text-danger-600 animate-fade-in">{errors.password.message}</p>
                )}
              </div>

              <div className="animate-slide-in-right" style={{animationDelay: '0.4s'}}>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    error={!!errors.confirmPassword}
                    {...register('confirmPassword')}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-danger-600 animate-fade-in">{errors.confirmPassword.message}</p>
                )}
              </div>

              <div className="animate-fade-in-up" style={{animationDelay: '0.5s'}}>
                <Button
                  type="submit"
                  variant="secondary"
                  className="w-full"
                  loading={loading}
                  disabled={loading}
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </div>
            </form>

            <div className="mt-8 text-center animate-fade-in" style={{animationDelay: '0.6s'}}>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white/80 text-gray-500">Already have an account?</span>
                </div>
              </div>
              <p className="mt-4 text-base text-gray-600">
                <Link
                  to="/login"
                  className="font-semibold text-secondary-600 hover:text-secondary-700 transition-colors duration-200 hover:underline"
                >
                  Sign in here →
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterForm;