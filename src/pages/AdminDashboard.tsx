
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Upload, 
  Database, 
  BarChart, 
  Users, 
  School, 
  BookOpen,
  Settings,
  LogOut,
  Menu,
  X,
  Search,
  Gamepad2,
  Bell,
  ChevronDown,
  Plus
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AdminSidebar from '@/components/admin/AdminSidebar';
import RecentGamesTable from '@/components/admin/RecentGamesTable';
import GamesOverviewStats from '@/components/admin/GamesOverviewStats';
import TopPerformingSchools from '@/components/admin/TopPerformingSchools';
import UserActivityChart from '@/components/admin/UserActivityChart';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You've been successfully logged out",
    });
    navigate('/admin-login');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="bg-white"
        >
          {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main content */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'ml-0'}`}>
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm">
          <div className="px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative mr-4">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                <Input 
                  type="search" 
                  placeholder="Search..." 
                  className="w-full md:w-64 pl-9 rounded-md bg-slate-50 border-slate-200 focus-visible:ring-brand-purple"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                  5
                </span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://i.pravatar.cc/150?img=68" alt="Admin" />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block text-sm">
                      <p className="font-medium">Admin User</p>
                    </div>
                    <ChevronDown className="h-4 w-4 text-slate-500" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-slate-500">Manage games, users, and monitor platform analytics</p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-2">
              <Button 
                className="bg-brand-purple hover:bg-brand-purple-dark gap-2"
                onClick={() => navigate('/admin/games/upload')}
              >
                <Upload className="h-4 w-4" />
                Upload Game
              </Button>
            </div>
          </div>

          <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="mb-8 bg-slate-100">
              <TabsTrigger value="overview" className="data-[state=active]:bg-white">
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="games" className="data-[state=active]:bg-white">
                <Gamepad2 className="h-4 w-4 mr-2" />
                Games
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-white">
                <BarChart className="h-4 w-4 mr-2" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="users" className="data-[state=active]:bg-white">
                <Users className="h-4 w-4 mr-2" />
                Users
              </TabsTrigger>
              <TabsTrigger value="schools" className="data-[state=active]:bg-white">
                <School className="h-4 w-4 mr-2" />
                Schools
              </TabsTrigger>
              <TabsTrigger value="curriculum" className="data-[state=active]:bg-white">
                <BookOpen className="h-4 w-4 mr-2" />
                Curriculum
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <GamesOverviewStats />
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>User Activity</CardTitle>
                    <CardDescription>Daily active users over the past 30 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <UserActivityChart />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Top Performing Schools</CardTitle>
                    <CardDescription>Based on student engagement and scores</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <TopPerformingSchools />
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Recently Uploaded Games</CardTitle>
                    <CardDescription>Monitor newly added educational content</CardDescription>
                  </div>
                  <Button variant="outline" onClick={() => navigate('/admin/games')}>
                    View All
                  </Button>
                </CardHeader>
                <CardContent>
                  <RecentGamesTable />
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Game Management Tab */}
            <TabsContent value="games">
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <CardTitle>Game Management</CardTitle>
                      <CardDescription>Upload, edit and manage educational games</CardDescription>
                    </div>
                    <Button 
                      className="mt-4 md:mt-0 bg-brand-purple hover:bg-brand-purple-dark gap-2"
                      onClick={() => navigate('/admin/games/upload')}
                    >
                      <Plus className="h-4 w-4" />
                      Add New Game
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-slate-500 py-20">
                    Game management interface will be displayed here.
                    <br />
                    Click "Add New Game" to upload a new game, or navigate to the Games page.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Analytics Tab */}
            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>Analytics & Reporting</CardTitle>
                  <CardDescription>Comprehensive data on usage and performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-slate-500 py-20">
                    Detailed analytics and reporting interface will be displayed here.
                    <br />
                    Track usage patterns, student performance, and engagement metrics.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Users Tab */}
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <CardTitle>User Management</CardTitle>
                      <CardDescription>Manage teachers, students and administrators</CardDescription>
                    </div>
                    <Button 
                      className="mt-4 md:mt-0 bg-brand-purple hover:bg-brand-purple-dark gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Add New User
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-slate-500 py-20">
                    User management interface will be displayed here.
                    <br />
                    Add, edit or remove user accounts and manage permissions.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Schools Tab */}
            <TabsContent value="schools">
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <CardTitle>School Management</CardTitle>
                      <CardDescription>Add and manage educational institutions</CardDescription>
                    </div>
                    <Button 
                      className="mt-4 md:mt-0 bg-brand-purple hover:bg-brand-purple-dark gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Add New School
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-slate-500 py-20">
                    School management interface will be displayed here.
                    <br />
                    Add, edit or remove schools and customize their access to content.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Curriculum Tab */}
            <TabsContent value="curriculum">
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <CardTitle>Curriculum Management</CardTitle>
                      <CardDescription>Manage grades, subjects and learning standards</CardDescription>
                    </div>
                    <div className="mt-4 md:mt-0 flex gap-2">
                      <Button variant="outline">
                        Add Grade
                      </Button>
                      <Button className="bg-brand-purple hover:bg-brand-purple-dark">
                        Add Subject
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-slate-500 py-20">
                    Curriculum management interface will be displayed here.
                    <br />
                    Define the educational structure used across the platform.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
