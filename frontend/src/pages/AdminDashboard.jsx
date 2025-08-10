import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Users, FileSpreadsheet, BarChart3, LogOut, UserCheck, UserX, Shield, Settings, Eye } from 'lucide-react';
import api from '../services/authService';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [pendingUsers, setPendingUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPendingUsers();
    fetchAllUsers();
  }, []);

  const fetchPendingUsers = async () => {
    try {
      const response = await api.get('/auth/pending-users');
      setPendingUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching pending users:', error);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const response = await api.get('/auth/users');
      setAllUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleUserApproval = async (userId, approve) => {
    setLoading(true);
    try {
      await api.put(`/auth/approve-user/${userId}`, { approve });
      toast.success(`User ${approve ? 'approved' : 'rejected'} successfully`);
      fetchPendingUsers();
      fetchAllUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error processing request');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Header */}
      <header className="glass-effect border-b border-white/20 animate-fade-in-down">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="animate-slide-in-left">
              <div className="flex items-center space-x-4">
                <div>
                  <h1 className="text-4xl font-bold gradient-text mb-2">Admin Dashboard</h1>
                  <p className="text-gray-600 text-lg">Welcome, <span className="font-semibold text-primary-700">{user?.name}</span>! {user?.role === 'super_admin' ? '🔱' : '🛡️'}</p>
                </div>
                {user?.role === 'super_admin' && pendingUsers.length > 0 && (
                  <div className="relative animate-bounce">
                    <div className="bg-gradient-to-r from-accent-500 to-danger-500 text-white px-4 py-2 rounded-full shadow-lg">
                      <div className="flex items-center space-x-2">
                        <UserCheck className="h-5 w-5" />
                        <span className="font-semibold">{pendingUsers.length} Pending Request{pendingUsers.length > 1 ? 's' : ''}</span>
                      </div>
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-danger-500 rounded-full animate-ping"></div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-6 animate-slide-in-right">
              <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-accent-100 to-secondary-100 rounded-full">
                <Shield className="w-4 h-4 text-accent-600" />
                <span className="text-sm font-semibold text-gray-700 capitalize">{user?.role === 'super_admin' ? 'Super Admin' : 'Admin'}</span>
              </div>
              <Button variant="outline" onClick={handleLogout} className="hover-lift">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <Card className="hover-lift animate-scale-in" style={{animationDelay: '0.1s'}}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-lg font-semibold text-gray-700">Pending Approvals</CardTitle>
                <div className="p-3 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl shadow-lg">
                  <UserCheck className="h-6 w-6 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-gray-900 mb-2">{pendingUsers.length}</div>
                <p className="text-sm text-gray-600 flex items-center">
                  <span className="w-2 h-2 bg-accent-500 rounded-full mr-2 animate-pulse"></span>
                  Admin requests
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift animate-scale-in" style={{animationDelay: '0.2s'}}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-lg font-semibold text-gray-700">Total Users</CardTitle>
                <div className="p-3 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl shadow-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-gray-900 mb-2">{allUsers.length}</div>
                <p className="text-sm text-gray-600 flex items-center">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mr-2 animate-pulse"></span>
                  Active users
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift animate-scale-in" style={{animationDelay: '0.3s'}}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-lg font-semibold text-gray-700">Total Files</CardTitle>
                <div className="p-3 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl shadow-lg">
                  <FileSpreadsheet className="h-6 w-6 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-gray-900 mb-2">0</div>
                <p className="text-sm text-gray-600 flex items-center">
                  <span className="w-2 h-2 bg-secondary-500 rounded-full mr-2 animate-pulse"></span>
                  Excel files
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift animate-scale-in" style={{animationDelay: '0.4s'}}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-lg font-semibold text-gray-700">Analytics</CardTitle>
                <div className="p-3 bg-gradient-to-br from-success-500 to-success-600 rounded-xl shadow-lg">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-gray-900 mb-2">0</div>
                <p className="text-sm text-gray-600 flex items-center">
                  <span className="w-2 h-2 bg-success-500 rounded-full mr-2 animate-pulse"></span>
                  Reports generated
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Pending Approvals - Only for Super Admin */}
          {user?.role === 'super_admin' && (
            <Card className="mb-8 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              <CardHeader>
                <CardTitle gradient className="text-2xl">Admin Access Requests</CardTitle>
                <CardDescription className="text-base">
                  {pendingUsers.length > 0 ? 'Review and approve admin access requests' : 'No pending admin requests at this time'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {pendingUsers.length > 0 ? (
                  <div className="space-y-4">
                    {pendingUsers.map((pendingUser, index) => (
                      <div key={pendingUser._id} className="flex items-center justify-between p-4 bg-white/50 rounded-xl border border-gray-200 animate-slide-in-left" style={{animationDelay: `${0.1 * index}s`}}>
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-lg">{pendingUser.name.charAt(0)}</span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{pendingUser.name}</h3>
                            <p className="text-gray-600">{pendingUser.email}</p>
                            <p className="text-sm text-accent-600">Requested: Admin Access</p>
                            <p className="text-xs text-gray-500">Submitted: {new Date(pendingUser.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex space-x-3">
                          <Button
                            variant="success"
                            size="sm"
                            onClick={() => handleUserApproval(pendingUser._id, true)}
                            disabled={loading}
                            className="hover-lift"
                          >
                            <UserCheck className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleUserApproval(pendingUser._id, false)}
                            disabled={loading}
                            className="hover-lift"
                          >
                            <UserX className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 animate-fade-in">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-success-100 to-primary-100 rounded-full flex items-center justify-center mb-4">
                      <UserCheck className="h-8 w-8 text-success-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">All caught up!</h3>
                    <p className="text-gray-500">No pending admin requests to review</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card className="animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <CardHeader>
              <CardTitle gradient className="text-2xl">Admin Actions</CardTitle>
              <CardDescription className="text-base">
                Manage users, files, and system settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Button className="h-24 flex-col hover-lift animate-slide-in-left" style={{animationDelay: '0.1s'}}>
                  <Users className="h-8 w-8 mb-3" />
                  <span className="font-semibold">Manage Users</span>
                </Button>
                <Button variant="secondary" className="h-24 flex-col hover-lift animate-scale-in" style={{animationDelay: '0.2s'}}>
                  <FileSpreadsheet className="h-8 w-8 mb-3" />
                  <span className="font-semibold">All Files</span>
                </Button>
                <Button variant="accent" className="h-24 flex-col hover-lift animate-slide-in-right" style={{animationDelay: '0.3s'}}>
                  <Eye className="h-8 w-8 mb-3" />
                  <span className="font-semibold">Analytics</span>
                </Button>
                <Button variant="outline" className="h-24 flex-col hover-lift animate-fade-in" style={{animationDelay: '0.4s'}}>
                  <Settings className="h-8 w-8 mb-3" />
                  <span className="font-semibold">Settings</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* User Management */}
          <Card className="mt-8 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
            <CardHeader>
              <CardTitle gradient className="text-2xl">User Management</CardTitle>
              <CardDescription className="text-base">
                Overview of all registered users
              </CardDescription>
            </CardHeader>
            <CardContent>
              {allUsers.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">User</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Role</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allUsers.map((user, index) => (
                        <tr key={user._id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors animate-fade-in" style={{animationDelay: `${0.1 * index}s`}}>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-semibold text-sm">{user.name.charAt(0)}</span>
                              </div>
                              <span className="font-medium text-gray-900">{user.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-600">{user.email}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              user.role === 'admin' ? 'bg-accent-100 text-accent-700' : 
                              user.role === 'super_admin' ? 'bg-danger-100 text-danger-700' :
                              'bg-primary-100 text-primary-700'
                            }`}>
                              {user.role.replace('_', ' ').toUpperCase()}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-success-100 text-success-700">
                              Active
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">No users found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      
      {/* Floating background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-accent-200/30 to-secondary-200/30 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-br from-primary-200/30 to-accent-200/30 rounded-full blur-2xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>
    </div>
  );
};

export default AdminDashboard;