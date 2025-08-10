import { Link } from 'react-router-dom';
import { ShieldX } from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-danger-400/20 to-accent-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-primary-400/20 to-danger-400/20 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="max-w-md w-full relative z-10">
        <Card className="animate-bounce-in">
          <CardHeader className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-danger-500 to-danger-600 mb-6 animate-pulse shadow-lg">
              <ShieldX className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-danger-600 mb-2">Access Denied</CardTitle>
            <CardDescription className="text-base">
              You don't have permission to access this resource.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-8 leading-relaxed">
              Please contact your administrator if you believe this is an error.
            </p>
            <Link to="/dashboard">
              <Button className="hover-lift">
                Go to Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Unauthorized;