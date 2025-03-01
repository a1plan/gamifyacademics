
import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter,
  ArrowUpDown,
  Trash2, 
  Edit,
  UserPlus,
  Download,
  Mail
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from '@/components/ui/use-toast';
import AdminSidebar from '@/components/admin/AdminSidebar';

// Mock data for users
const usersData = [
  {
    id: "u1",
    name: "Amit Patel",
    email: "amit.p@dps.edu",
    school: "Delhi Public School",
    role: "teacher",
    grade: "Grade 5",
    subject: "Mathematics",
    status: "active",
    lastLogin: "2023-08-15"
  },
  {
    id: "u2",
    name: "Priya Sharma",
    email: "p.sharma@dps.edu",
    school: "Delhi Public School",
    role: "student",
    grade: "Grade 4",
    subject: null,
    status: "active",
    lastLogin: "2023-08-14"
  },
  {
    id: "u3",
    name: "Rahul Gupta",
    email: "rahul@sxs.edu",
    school: "St. Xavier's School",
    role: "teacher",
    grade: "Grade 7-8",
    subject: "Science",
    status: "active",
    lastLogin: "2023-08-12"
  },
  {
    id: "u4",
    name: "Ananya Singh",
    email: "ananya@kv.edu",
    school: "Kendriya Vidyalaya",
    role: "student",
    grade: "Grade 6",
    subject: null,
    status: "inactive",
    lastLogin: "2023-07-28"
  },
  {
    id: "u5",
    name: "Vikram Mehta",
    email: "vikram@aps.edu",
    school: "Army Public School",
    role: "teacher",
    grade: "Grade 9-10",
    subject: "English",
    status: "active",
    lastLogin: "2023-08-10"
  },
  {
    id: "u6",
    name: "Neha Khanna",
    email: "neha@dav.edu",
    school: "DAV Model School",
    role: "student",
    grade: "Grade 8",
    subject: null,
    status: "active",
    lastLogin: "2023-08-13"
  },
];

// Mock data for schools (for dropdown)
const schools = [
  { id: "s1", name: "Delhi Public School" },
  { id: "s2", name: "St. Xavier's School" },
  { id: "s3", name: "Kendriya Vidyalaya" },
  { id: "s4", name: "Army Public School" },
  { id: "s5", name: "DAV Model School" },
];

const UsersManagement = () => {
  const { toast } = useToast();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  
  // New user form state
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserSchool, setNewUserSchool] = useState('');
  const [newUserRole, setNewUserRole] = useState('');
  const [newUserGrade, setNewUserGrade] = useState('');
  const [newUserSubject, setNewUserSubject] = useState('');
  
  // Filter users based on search and filters
  const filteredUsers = usersData.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchText.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchText.toLowerCase());
    const matchesRole = selectedRole ? user.role === selectedRole : true;
    const matchesSchool = selectedSchool ? user.school === selectedSchool : true;
    const matchesStatus = selectedStatus ? user.status === selectedStatus : true;
    
    return matchesSearch && matchesRole && matchesSchool && matchesStatus;
  });
  
  const handleAddUser = () => {
    // In a real app, this would call an API to add the user
    toast({
      title: "User Added",
      description: "The user has been successfully added to the platform.",
    });
    setIsAddUserDialogOpen(false);
    // Reset form
    setNewUserName('');
    setNewUserEmail('');
    setNewUserSchool('');
    setNewUserRole('');
    setNewUserGrade('');
    setNewUserSubject('');
  };
  
  const handleGenerateCredentials = (userId: string) => {
    // In a real app, this would call an API to generate credentials
    toast({
      title: "Credentials Generated",
      description: "Login credentials have been generated and are ready for download.",
    });
  };
  
  const handleDeleteUser = (userId: string) => {
    // In a real app, this would call an API to delete the user
    toast({
      title: "User Deleted",
      description: "The user has been successfully removed from the platform.",
    });
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
          <div className="h-5 w-5"></div>
        </Button>
      </div>

      {/* Sidebar */}
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main content */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'ml-0'}`}>
        <main className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">Users Management</h1>
              <p className="text-slate-500">Manage teachers and students accounts</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
              <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-brand-purple hover:bg-brand-purple-dark">
                    <Plus className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                  <DialogHeader>
                    <DialogTitle>Add New User</DialogTitle>
                    <DialogDescription>
                      Enter the details of the user you want to add to the platform.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Full Name
                        </label>
                        <Input 
                          id="name" 
                          value={newUserName}
                          onChange={(e) => setNewUserName(e.target.value)}
                          placeholder="Full name"
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <Input 
                          id="email" 
                          type="email"
                          value={newUserEmail}
                          onChange={(e) => setNewUserEmail(e.target.value)}
                          placeholder="Email address"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <label htmlFor="school" className="text-sm font-medium">
                          School
                        </label>
                        <Select value={newUserSchool} onValueChange={setNewUserSchool}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select school" />
                          </SelectTrigger>
                          <SelectContent>
                            {schools.map((school) => (
                              <SelectItem key={school.id} value={school.name}>
                                {school.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid gap-2">
                        <label htmlFor="role" className="text-sm font-medium">
                          Role
                        </label>
                        <Select value={newUserRole} onValueChange={setNewUserRole}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="teacher">Teacher</SelectItem>
                            <SelectItem value="student">Student</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <label htmlFor="grade" className="text-sm font-medium">
                          Grade
                        </label>
                        <Select value={newUserGrade} onValueChange={setNewUserGrade}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select grade" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Grade 1">Grade 1</SelectItem>
                            <SelectItem value="Grade 2">Grade 2</SelectItem>
                            <SelectItem value="Grade 3">Grade 3</SelectItem>
                            <SelectItem value="Grade 4">Grade 4</SelectItem>
                            <SelectItem value="Grade 5">Grade 5</SelectItem>
                            <SelectItem value="Grade 6">Grade 6</SelectItem>
                            <SelectItem value="Grade 7">Grade 7</SelectItem>
                            <SelectItem value="Grade 8">Grade 8</SelectItem>
                            <SelectItem value="Grade 9">Grade 9</SelectItem>
                            <SelectItem value="Grade 10">Grade 10</SelectItem>
                            <SelectItem value="Grade 11">Grade 11</SelectItem>
                            <SelectItem value="Grade 12">Grade 12</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid gap-2">
                        <label htmlFor="subject" className="text-sm font-medium">
                          Subject (Teachers Only)
                        </label>
                        <Select 
                          value={newUserSubject} 
                          onValueChange={setNewUserSubject}
                          disabled={newUserRole !== 'teacher'}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Mathematics">Mathematics</SelectItem>
                            <SelectItem value="Science">Science</SelectItem>
                            <SelectItem value="English">English</SelectItem>
                            <SelectItem value="History">History</SelectItem>
                            <SelectItem value="Geography">Geography</SelectItem>
                            <SelectItem value="Computer Science">Computer Science</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddUserDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddUser}>
                      Add User
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <Button variant="outline">
                <UserPlus className="h-4 w-4 mr-2" />
                Bulk Upload
              </Button>
            </div>
          </div>
          
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle>Filter Users</CardTitle>
              <CardDescription>
                Search and filter to find specific users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Search by name or email..."
                      className="pl-8"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                  </div>
                </div>
                
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Roles</SelectItem>
                    <SelectItem value="teacher">Teacher</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={selectedSchool} onValueChange={setSelectedSchool}>
                  <SelectTrigger>
                    <SelectValue placeholder="School" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Schools</SelectItem>
                    {schools.map((school) => (
                      <SelectItem key={school.id} value={school.name}>
                        {school.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>School</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Grade/Subject</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.school}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={
                              user.role === 'teacher' 
                                ? 'bg-blue-50 text-blue-700 border-blue-200' 
                                : 'bg-purple-50 text-purple-700 border-purple-200'
                            }>
                              {user.role === 'teacher' ? 'Teacher' : 'Student'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div>{user.grade}</div>
                            {user.subject && (
                              <div className="text-xs text-slate-500">{user.subject}</div>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className={`px-2 py-1 rounded-full text-xs font-medium w-fit ${
                              user.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-slate-100 text-slate-800'
                            }`}>
                              {user.status === 'active' ? 'Active' : 'Inactive'}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <ArrowUpDown className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit User
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleGenerateCredentials(user.id)}>
                                  <Download className="h-4 w-4 mr-2" />
                                  Generate Credentials
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Mail className="h-4 w-4 mr-2" />
                                  Send Invitation
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  className="text-red-600"
                                  onClick={() => handleDeleteUser(user.id)}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete User
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-6 text-slate-500">
                          No users found. Try adjusting your filters or add a new user.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default UsersManagement;
