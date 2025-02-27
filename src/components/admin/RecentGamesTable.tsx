
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MoreHorizontal, 
  Calendar, 
  TrendingUp, 
  FileSymlink 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for recently uploaded games
const recentGames = [
  {
    id: "game-1",
    title: "Math Quest Adventure",
    subject: "Mathematics",
    grade: "Grade 5",
    uploadDate: "2023-12-01",
    uploadedBy: {
      name: "Priya Sharma",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    format: "SCORM 2004",
    status: "Active"
  },
  {
    id: "game-2",
    title: "Science Explorer: Chemical Reactions",
    subject: "Science",
    grade: "Grade 8",
    uploadDate: "2023-11-28",
    uploadedBy: {
      name: "Rahul Verma",
      avatar: "https://i.pravatar.cc/150?img=12"
    },
    format: "xAPI",
    status: "Pending"
  },
  {
    id: "game-3",
    title: "Grammar Galaxy",
    subject: "English",
    grade: "Grade 3",
    uploadDate: "2023-11-25",
    uploadedBy: {
      name: "Ananya Patel",
      avatar: "https://i.pravatar.cc/150?img=9"
    },
    format: "SCORM 1.2",
    status: "Active"
  },
  {
    id: "game-4",
    title: "History Time Machine: Ancient India",
    subject: "History",
    grade: "Grade 7",
    uploadDate: "2023-11-22",
    uploadedBy: {
      name: "Vikram Singh",
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    format: "xAPI",
    status: "Active"
  },
  {
    id: "game-5",
    title: "Coding Adventures with Python",
    subject: "Computer Science",
    grade: "Grade 10",
    uploadDate: "2023-11-20",
    uploadedBy: {
      name: "Neha Gupta",
      avatar: "https://i.pravatar.cc/150?img=25"
    },
    format: "SCORM 2004",
    status: "Draft"
  }
];

const RecentGamesTable = () => {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Game</TableHead>
            <TableHead>Grade & Subject</TableHead>
            <TableHead>Format</TableHead>
            <TableHead>Upload Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentGames.map((game) => (
            <TableRow key={game.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-brand-accent-purple/50 rounded-md flex items-center justify-center">
                    <FileSymlink className="h-5 w-5 text-brand-purple" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{game.title}</p>
                    <div className="flex items-center text-xs text-slate-500">
                      <Avatar className="h-4 w-4 mr-1">
                        <AvatarImage src={game.uploadedBy.avatar} alt={game.uploadedBy.name} />
                        <AvatarFallback className="text-[8px]">
                          {game.uploadedBy.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {game.uploadedBy.name}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <Badge variant="outline" className="bg-brand-accent-purple/20 border-brand-accent-purple/30 text-brand-purple">
                    {game.grade}
                  </Badge>
                  <p className="text-xs text-slate-500">{game.subject}</p>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary" className="font-normal">
                  {game.format}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center text-xs text-slate-500">
                  <Calendar className="h-3.5 w-3.5 mr-1.5" />
                  {new Date(game.uploadDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  className={
                    game.status === 'Active' ? 'bg-green-100 text-green-700 hover:bg-green-100' :
                    game.status === 'Pending' ? 'bg-amber-100 text-amber-700 hover:bg-amber-100' :
                    'bg-slate-100 text-slate-700 hover:bg-slate-100'
                  }
                >
                  {game.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Edit Game</DropdownMenuItem>
                    <DropdownMenuItem>View Analytics</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Delete Game</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentGamesTable;
