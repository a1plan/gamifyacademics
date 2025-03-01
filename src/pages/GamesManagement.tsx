
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  ArrowUpDown,
  Trash2, 
  Edit, 
  Eye
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from '@/components/ui/use-toast';
import AdminSidebar from '@/components/admin/AdminSidebar';

// Mock data for games
const gamesData = [
  {
    id: "g1",
    title: "Math Quest Adventure",
    subject: "Mathematics",
    grade: "Grade 3-5",
    format: "SCORM 1.2",
    uploadedAt: "2023-06-15",
    status: "active",
    plays: 342
  },
  {
    id: "g2",
    title: "Science Explorer",
    subject: "Science",
    grade: "Grade 6-8",
    format: "xAPI",
    uploadedAt: "2023-05-22",
    status: "active",
    plays: 251
  },
  {
    id: "g3",
    title: "Grammar Galaxy",
    subject: "English",
    grade: "Grade 4-6",
    format: "SCORM 2004",
    uploadedAt: "2023-07-03",
    status: "inactive",
    plays: 178
  },
  {
    id: "g4",
    title: "History Heroes",
    subject: "History",
    grade: "Grade 5-7",
    format: "SCORM 1.2",
    uploadedAt: "2023-04-18",
    status: "active",
    plays: 295
  },
  {
    id: "g5",
    title: "Geography Explorer",
    subject: "Geography",
    grade: "Grade 4-6",
    format: "xAPI",
    uploadedAt: "2023-08-09",
    status: "active",
    plays: 127
  },
];

const GamesManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  
  // Filter games based on search and filters
  const filteredGames = gamesData.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchText.toLowerCase()) ||
                          game.subject.toLowerCase().includes(searchText.toLowerCase());
    const matchesGrade = selectedGrade ? game.grade.includes(selectedGrade) : true;
    const matchesSubject = selectedSubject ? game.subject === selectedSubject : true;
    const matchesStatus = selectedStatus ? game.status === selectedStatus : true;
    
    return matchesSearch && matchesGrade && matchesSubject && matchesStatus;
  });
  
  const handleDeleteGame = (gameId: string) => {
    // In a real app, this would call an API to delete the game
    toast({
      title: "Game Deleted",
      description: "The game has been successfully deleted.",
    });
  };
  
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile sidebar toggle - same as in AdminDashboard */}
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
              <h1 className="text-2xl font-bold">Games Management</h1>
              <p className="text-slate-500">Manage all educational games in the platform</p>
            </div>
            <Button 
              className="mt-4 md:mt-0 bg-brand-purple hover:bg-brand-purple-dark"
              onClick={() => navigate('/admin/games/upload')}
            >
              <Plus className="h-4 w-4 mr-2" />
              Upload New Game
            </Button>
          </div>
          
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle>Filter Games</CardTitle>
              <CardDescription>
                Search and filter to find specific games
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Search by title or subject..."
                      className="pl-8"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                  </div>
                </div>
                
                <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                  <SelectTrigger>
                    <SelectValue placeholder="Grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Grades</SelectItem>
                    <SelectItem value="Grade 3">Grade 3</SelectItem>
                    <SelectItem value="Grade 4">Grade 4</SelectItem>
                    <SelectItem value="Grade 5">Grade 5</SelectItem>
                    <SelectItem value="Grade 6">Grade 6</SelectItem>
                    <SelectItem value="Grade 7">Grade 7</SelectItem>
                    <SelectItem value="Grade 8">Grade 8</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Subjects</SelectItem>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                    <SelectItem value="Science">Science</SelectItem>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="History">History</SelectItem>
                    <SelectItem value="Geography">Geography</SelectItem>
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
                      <TableHead className="w-[250px]">Game Title</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Format</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Plays</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredGames.length > 0 ? (
                      filteredGames.map((game) => (
                        <TableRow key={game.id}>
                          <TableCell className="font-medium">{game.title}</TableCell>
                          <TableCell>{game.subject}</TableCell>
                          <TableCell>{game.grade}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{game.format}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={game.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'}>
                              {game.status === 'active' ? 'Active' : 'Inactive'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">{game.plays}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <ArrowUpDown className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  Preview
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  className="text-red-600"
                                  onClick={() => handleDeleteGame(game.id)}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-6 text-slate-500">
                          No games found. Try adjusting your filters or upload a new game.
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

export default GamesManagement;
