
import { useState } from 'react';
import { 
  Plus, 
  Search, 
  Download, 
  ArrowUpDown,
  Trash2, 
  Edit, 
  Users,
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

// Mock data for schools
const schoolsData = [
  {
    id: "s1",
    name: "Delhi Public School",
    location: "New Delhi",
    contactPerson: "Rajiv Sharma",
    contactEmail: "rajiv@dps.edu",
    studentsCount: 1245,
    teachersCount: 87,
    status: "active",
    createdAt: "2023-05-12"
  },
  {
    id: "s2",
    name: "St. Xavier's School",
    location: "Mumbai",
    contactPerson: "Sarah D'Souza",
    contactEmail: "sarah@sxs.edu",
    studentsCount: 980,
    teachersCount: 65,
    status: "active",
    createdAt: "2023-04-18"
  },
  {
    id: "s3",
    name: "Kendriya Vidyalaya",
    location: "Bangalore",
    contactPerson: "Arun Kumar",
    contactEmail: "arun@kv.edu",
    studentsCount: 1120,
    teachersCount: 72,
    status: "active",
    createdAt: "2023-06-03"
  },
  {
    id: "s4",
    name: "Army Public School",
    location: "Pune",
    contactPerson: "Major Vijay Singh",
    contactEmail: "vijay@aps.edu",
    studentsCount: 780,
    teachersCount: 58,
    status: "active",
    createdAt: "2023-03-25"
  },
  {
    id: "s5",
    name: "DAV Model School",
    location: "Chandigarh",
    contactPerson: "Neha Gupta",
    contactEmail: "neha@dav.edu",
    studentsCount: 850,
    teachersCount: 63,
    status: "inactive",
    createdAt: "2023-07-09"
  },
];

const SchoolsManagement = () => {
  const { toast } = useToast();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [isAddSchoolDialogOpen, setIsAddSchoolDialogOpen] = useState(false);
  const [newSchoolName, setNewSchoolName] = useState('');
  const [newSchoolLocation, setNewSchoolLocation] = useState('');
  const [newSchoolContact, setNewSchoolContact] = useState('');
  const [newSchoolEmail, setNewSchoolEmail] = useState('');
  
  // Filter schools based on search
  const filteredSchools = schoolsData.filter(school => {
    return school.name.toLowerCase().includes(searchText.toLowerCase()) ||
           school.location.toLowerCase().includes(searchText.toLowerCase()) ||
           school.contactPerson.toLowerCase().includes(searchText.toLowerCase());
  });
  
  const handleAddSchool = () => {
    // In a real app, this would call an API to add the school
    toast({
      title: "School Added",
      description: "The school has been successfully added to the platform.",
    });
    setIsAddSchoolDialogOpen(false);
    // Reset form
    setNewSchoolName('');
    setNewSchoolLocation('');
    setNewSchoolContact('');
    setNewSchoolEmail('');
  };
  
  const handleGenerateCredentials = (schoolId: string) => {
    // In a real app, this would call an API to generate credentials
    toast({
      title: "Credentials Generated",
      description: "Login credentials have been generated and are ready for download.",
    });
  };
  
  const handleDeleteSchool = (schoolId: string) => {
    // In a real app, this would call an API to delete the school
    toast({
      title: "School Deleted",
      description: "The school has been successfully removed from the platform.",
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
              <h1 className="text-2xl font-bold">Schools Management</h1>
              <p className="text-slate-500">Manage schools and their access to the platform</p>
            </div>
            
            <Dialog open={isAddSchoolDialogOpen} onOpenChange={setIsAddSchoolDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  className="mt-4 md:mt-0 bg-brand-purple hover:bg-brand-purple-dark"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New School
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New School</DialogTitle>
                  <DialogDescription>
                    Enter the details of the school you want to add to the platform.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      School Name
                    </label>
                    <Input 
                      id="name" 
                      value={newSchoolName}
                      onChange={(e) => setNewSchoolName(e.target.value)}
                      placeholder="Enter school name"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <label htmlFor="location" className="text-sm font-medium">
                      Location
                    </label>
                    <Input 
                      id="location" 
                      value={newSchoolLocation}
                      onChange={(e) => setNewSchoolLocation(e.target.value)}
                      placeholder="City, State"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <label htmlFor="contact" className="text-sm font-medium">
                      Contact Person
                    </label>
                    <Input 
                      id="contact" 
                      value={newSchoolContact}
                      onChange={(e) => setNewSchoolContact(e.target.value)}
                      placeholder="Full name"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Contact Email
                    </label>
                    <Input 
                      id="email" 
                      type="email"
                      value={newSchoolEmail}
                      onChange={(e) => setNewSchoolEmail(e.target.value)}
                      placeholder="email@school.edu"
                    />
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddSchoolDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddSchool}>
                    Add School
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle>Find Schools</CardTitle>
              <CardDescription>
                Search for schools by name, location, or contact person
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search schools..."
                  className="pl-8"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">School Name</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Contact Person</TableHead>
                      <TableHead>Students</TableHead>
                      <TableHead>Teachers</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSchools.length > 0 ? (
                      filteredSchools.map((school) => (
                        <TableRow key={school.id}>
                          <TableCell className="font-medium">{school.name}</TableCell>
                          <TableCell>{school.location}</TableCell>
                          <TableCell>
                            <div>{school.contactPerson}</div>
                            <div className="text-sm text-slate-500">{school.contactEmail}</div>
                          </TableCell>
                          <TableCell>{school.studentsCount}</TableCell>
                          <TableCell>{school.teachersCount}</TableCell>
                          <TableCell>
                            <div className={`px-2 py-1 rounded-full text-xs font-medium w-fit ${
                              school.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-slate-100 text-slate-800'
                            }`}>
                              {school.status === 'active' ? 'Active' : 'Inactive'}
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
                                  Edit Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Users className="h-4 w-4 mr-2" />
                                  Manage Users
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleGenerateCredentials(school.id)}>
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
                                  onClick={() => handleDeleteSchool(school.id)}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete School
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-6 text-slate-500">
                          No schools found. Try adjusting your search or add a new school.
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

export default SchoolsManagement;
