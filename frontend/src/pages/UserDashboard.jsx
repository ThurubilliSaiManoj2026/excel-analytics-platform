import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { FileSpreadsheet, BarChart3, LogOut, Upload, Eye, Settings } from 'lucide-react';

const UserDashboard = () => {
  const { user, logout } = useAuth();

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
              <h1 className="text-4xl font-bold gradient-text mb-2">Excel Analytics Platform</h1>
              <p className="text-gray-600 text-lg">Welcome back, <span className="font-semibold text-primary-700">{user?.name}</span>! 📊</p>
            </div>
            <div className="flex items-center space-x-6 animate-slide-in-right">
              <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full">
                <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></div>
                <span className="text-sm font-semibold text-gray-700 capitalize">{user?.role}</span>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <Card className="hover-lift animate-scale-in" style={{animationDelay: '0.1s'}}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-lg font-semibold text-gray-700">My Files</CardTitle>
                <div className="p-3 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl shadow-lg">
                  <FileSpreadsheet className="h-6 w-6 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-gray-900 mb-2">0</div>
                <p className="text-sm text-gray-600 flex items-center">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mr-2 animate-pulse"></span>
                  Excel files uploaded
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift animate-scale-in" style={{animationDelay: '0.2s'}}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-lg font-semibold text-gray-700">Data Processed</CardTitle>
                <div className="p-3 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl shadow-lg">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-gray-900 mb-2">0</div>
                <p className="text-sm text-gray-600 flex items-center">
                  <span className="w-2 h-2 bg-secondary-500 rounded-full mr-2 animate-pulse"></span>
                  Total rows analyzed
                </p>
              </CardContent>
            </Card>

            <Card className="hover-lift animate-scale-in" style={{animationDelay: '0.3s'}}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-lg font-semibold text-gray-700">Analytics</CardTitle>
                <div className="p-3 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl shadow-lg">
                  <Eye className="h-6 w-6 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-gray-900 mb-2">0</div>
                <p className="text-sm text-gray-600 flex items-center">
                  <span className="w-2 h-2 bg-accent-500 rounded-full mr-2 animate-pulse"></span>
                  Reports generated
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <CardHeader>
              <CardTitle gradient className="text-2xl">Quick Actions</CardTitle>
              <CardDescription className="text-base">
                Upload and analyze your Excel files with powerful tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Button className="h-24 flex-col hover-lift animate-slide-in-left" style={{animationDelay: '0.1s'}}>
                  <Upload className="h-8 w-8 mb-3" />
                  <span className="font-semibold">Upload File</span>
                </Button>
                <Button variant="secondary" className="h-24 flex-col hover-lift animate-scale-in" style={{animationDelay: '0.2s'}}>
                  <BarChart3 className="h-8 w-8 mb-3" />
                  <span className="font-semibold">View Analytics</span>
                </Button>
                <Button variant="accent" className="h-24 flex-col hover-lift animate-slide-in-right" style={{animationDelay: '0.3s'}}>
                  <FileSpreadsheet className="h-8 w-8 mb-3" />
                  <span className="font-semibold">My Files</span>
                </Button>
                <Button variant="outline" className="h-24 flex-col hover-lift animate-fade-in" style={{animationDelay: '0.4s'}}>
                  <Settings className="h-8 w-8 mb-3" />
                  <span className="font-semibold">Settings</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="mt-8 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <CardHeader>
              <CardTitle gradient className="text-2xl">Recent Activity</CardTitle>
              <CardDescription className="text-base">
                Your latest file uploads and analytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 animate-bounce-in">
                <div className="mx-auto w-24 h-24 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mb-6 animate-float">
                  <FileSpreadsheet className="h-12 w-12 text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No files uploaded yet</h3>
                <p className="text-gray-500 mb-6">Upload your first Excel file to start analyzing your data</p>
                <Button variant="primary" className="hover-lift">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Your First File
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      {/* Floating background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-primary-200/30 to-secondary-200/30 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-br from-secondary-200/30 to-accent-200/30 rounded-full blur-2xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>
    </div>
  );
};

export default UserDashboard;