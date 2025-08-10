import { useAuth } from '../contexts/AuthContext';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  // Route to appropriate dashboard based on user role
  if (user?.role === 'super_admin') {
    return <AdminDashboard />;
  }
  
  if (user?.role === 'admin') {
    return <AdminDashboard />;
  }
  
  // Default to user dashboard for regular users
  return <UserDashboard />;
};

export default Dashboard;