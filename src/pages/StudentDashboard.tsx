import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Trophy, 
  Star, 
  MessageSquare, 
  Award, 
  Gift, 
  ArrowLeft,
  BarChart3,
  BookOpen,
  Gamepad2,
  ChevronRight,
  Sparkles,
  MapPin,
  UserCircle,
  Clock,
  ThumbsUp,
  GraduationCap,
  Pencil,
  Camera,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

// Mock data
const studentInfo = {
  id: "st-12345",
  name: "Arjun Sharma",
  grade: "Grade 8",
  school: "Delhi Public School",
  avatar: "https://i.pravatar.cc/150?img=11",
  joinedDate: "September 2023",
  totalPoints: 2450,
  completedGames: 18,
  hoursPlayed: 24,
  streakDays: 14,
  level: 5,
  bio: "Hi, I'm Arjun! I love solving math problems and playing educational games. I want to become a scientist one day."
};

const learningPath = [
  { id: 1, title: "Mathematics Chapter 4", status: "completed", progress: 100 },
  { id: 2, title: "Science Chapter 3", status: "in-progress", progress: 65 },
  { id: 3, title: "English Grammar", status: "upcoming", progress: 0 },
  { id: 4, title: "History of India", status: "upcoming", progress: 0 }
];

const unlockedGames = [
  { 
    id: "game-1", 
    title: "Math Quest Adventure", 
    subject: "Mathematics", 
    chapter: 4, 
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    lastPlayed: "Today",
    score: 85,
    badges: 3,
    difficulty: "Medium"
  },
  { 
    id: "game-2", 
    title: "Science Explorer", 
    subject: "Science", 
    chapter: 3, 
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    lastPlayed: "Yesterday",
    score: 78,
    badges: 2,
    difficulty: "Hard"
  },
  { 
    id: "game-3", 
    title: "Grammar Galaxy", 
    subject: "English", 
    chapter: 2, 
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    lastPlayed: "3 days ago",
    score: 92,
    badges: 4,
    difficulty: "Easy"
  },
  { 
    id: "game-4", 
    title: "Indian History Adventure", 
    subject: "History", 
    chapter: 1, 
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    lastPlayed: "1 week ago",
    score: 70,
    badges: 1,
    difficulty: "Medium"
  }
];

const leaderboard = [
  { rank: 1, name: "Priya Singh", avatar: "https://i.pravatar.cc/150?img=5", points: 3200, grade: "Grade 8" },
  { rank: 2, name: "Rahul Verma", avatar: "https://i.pravatar.cc/150?img=12", points: 2900, grade: "Grade 8" },
  { rank: 3, name: "Arjun Sharma", avatar: "https://i.pravatar.cc/150?img=11", points: 2450, grade: "Grade 8", isCurrentUser: true },
  { rank: 4, name: "Anika Patel", avatar: "https://i.pravatar.cc/150?img=9", points: 2300, grade: "Grade 8" },
  { rank: 5, name: "Dev Kumar", avatar: "https://i.pravatar.cc/150?img=8", points: 2100, grade: "Grade 8" }
];

const gameComments = [
  { 
    id: 1, 
    gameId: "game-1", 
    user: "Arjun Sharma", 
    avatar: "https://i.pravatar.cc/150?img=11", 
    comment: "This game really helped me understand fractions better!", 
    date: "2 days ago",
    likes: 5
  },
  { 
    id: 2, 
    gameId: "game-2", 
    user: "Priya Singh", 
    avatar: "https://i.pravatar.cc/150?img=5", 
    comment: "The 3D models of cells were amazing. I can finally visualize the cell structure!",  
    date: "1 week ago",
    likes: 12
  },
  { 
    id: 3, 
    gameId: "game-3", 
    user: "Rahul Verma", 
    avatar: "https://i.pravatar.cc/150?img=12", 
    comment: "The grammar exercises are challenging but fun!",  
    date: "3 days ago",
    likes: 8
  }
];

const badges = [
  { id: "badge-1", title: "Math Master", description: "Completed all math games with >80% score", image: "🏆", date: "2 weeks ago" },
  { id: "badge-2", title: "Science Explorer", description: "Discovered all elements in the periodic table game", image: "🔬", date: "1 month ago" },
  { id: "badge-3", title: "Grammar Guru", description: "Perfect score in advanced grammar challenge", image: "📝", date: "3 weeks ago" },
  { id: "badge-4", title: "History Buff", description: "Completed the Indian history timeline challenge", image: "⏳", date: "2 months ago" },
  { id: "badge-5", title: "14-Day Streak", description: "Logged in and completed at least one game for 14 consecutive days", image: "🔥", date: "Today" }
];

const goodies = [
  { id: "goodie-1", title: "Custom Avatar Items", points: 500, image: "👕", claimed: false },
  { id: "goodie-2", title: "Printable Certificate", points: 1000, image: "📜", claimed: true },
  { id: "goodie-3", title: "Digital Sticker Pack", points: 300, image: "🌟", claimed: true },
  { id: "goodie-4", title: "Exclusive Game Theme", points: 750, image: "🎮", claimed: false },
  { id: "goodie-5", title: "Virtual Pet", points: 1500, image: "🐕", claimed: false }
];

// Calculate student progress
const overallProgress = (learningPath.reduce((acc, item) => acc + item.progress, 0) / (learningPath.length * 100)) * 100;

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  const [loadingGame, setLoadingGame] = useState(false);
  const [commentsList, setCommentsList] = useState(gameComments);
  const [activeTab, setActiveTab] = useState('overview');
  const [goodiesList, setGoodiesList] = useState(goodies);
  
  // Profile editing state
  const [studentData, setStudentData] = useState(studentInfo);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [newBio, setNewBio] = useState(studentInfo.bio);
  const [newAvatarUrl, setNewAvatarUrl] = useState(studentInfo.avatar);
  const [avatarOptions] = useState([
    "https://i.pravatar.cc/150?img=11",
    "https://i.pravatar.cc/150?img=12",
    "https://i.pravatar.cc/150?img=13",
    "https://i.pravatar.cc/150?img=14",
    "https://i.pravatar.cc/150?img=15",
    "https://i.pravatar.cc/150?img=16",
  ]);

  const selectedGame = unlockedGames.find(game => game.id === selectedGameId);

  const playGame = (gameId: string) => {
    setLoadingGame(true);
    setTimeout(() => {
      setLoadingGame(false);
      toast({
        title: "Game Launched",
        description: `You've started playing ${unlockedGames.find(g => g.id === gameId)?.title}. Have fun!`,
      });
    }, 1500);
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !selectedGameId) return;

    const newCommentObj = {
      id: commentsList.length + 1,
      gameId: selectedGameId,
      user: studentData.name,
      avatar: studentData.avatar,
      comment: newComment,
      date: "Just now",
      likes: 0
    };

    setCommentsList([newCommentObj, ...commentsList]);
    setNewComment('');

    toast({
      title: "Comment Added",
      description: "Your comment has been posted successfully!",
    });
  };

  const claimGoodie = (goodieId: string) => {
    setGoodiesList(goodiesList.map(goodie => 
      goodie.id === goodieId ? { ...goodie, claimed: true } : goodie
    ));

    toast({
      title: "Goodie Claimed!",
      description: `You've successfully claimed ${goodiesList.find(g => g.id === goodieId)?.title}!`,
    });
  };

  // Profile editing functions
  const handleSaveBio = () => {
    setStudentData({
      ...studentData,
      bio: newBio
    });
    setIsEditingBio(false);
    
    toast({
      title: "Profile Updated",
      description: "Your bio has been updated successfully.",
    });
  };

  const handleSelectAvatar = (avatarUrl: string) => {
    setNewAvatarUrl(avatarUrl);
  };

  const handleSaveAvatar = () => {
    setStudentData({
      ...studentData,
      avatar: newAvatarUrl
    });
    setIsEditingAvatar(false);
    
    toast({
      title: "Profile Updated",
      description: "Your avatar has been updated successfully.",
    });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="container max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-bold flex items-center gap-2">
                Student Dashboard
                <Badge variant="outline" className="ml-2 bg-brand-accent-purple/50">
                  {studentData.grade}
                </Badge>
              </h1>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/role-selection')}
              >
                Switch Role
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left sidebar - Profile */}
          <div className="w-full md:w-80 lg:w-96">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8"
            >
              <div className="h-32 bg-gradient-to-r from-brand-purple to-brand-purple-light relative">
                <div className="absolute -bottom-16 left-6">
                  <div className="relative">
                    <Avatar className="h-32 w-32 border-4 border-white shadow-md">
                      <AvatarImage src={studentData.avatar} alt={studentData.name} />
                      <AvatarFallback className="text-2xl bg-brand-purple text-white">
                        {studentData.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <Button 
                      size="icon" 
                      className="absolute bottom-0 right-0 bg-white hover:bg-slate-100 text-slate-700 shadow-md h-8 w-8"
                      onClick={() => setIsEditingAvatar(true)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="pt-20 pb-6 px-6">
                <h2 className="text-2xl font-bold">{studentData.name}</h2>
                <div className="flex items-center text-sm text-slate-500 mt-1 mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  {studentData.school}
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <p className="text-xs text-slate-500 mb-1">Total Points</p>
                    <p className="text-xl font-bold text-brand-purple">
                      {studentData.totalPoints}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <p className="text-xs text-slate-500 mb-1">Games Completed</p>
                    <p className="text-xl font-bold text-brand-purple">
                      {studentData.completedGames}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4 mb-5">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-700 font-medium">Level {studentData.level}</span>
                      <span className="text-slate-500">Level {studentData.level + 1}</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1.5 text-slate-400" />
                      <span>{studentData.hoursPlayed} hrs played</span>
                    </div>
                    <div className="flex items-center">
                      <Sparkles className="h-4 w-4 mr-1.5 text-orange-400" />
                      <span>{studentData.streakDays} day streak</span>
                    </div>
                  </div>
                </div>
                
                {/* Bio Section */}
                <div className="p-4 bg-slate-50 rounded-lg mb-5 relative">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm font-medium text-slate-700">About Me</h3>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 text-slate-400 hover:text-brand-purple"
                      onClick={() => {
                        setNewBio(studentData.bio);
                        setIsEditingBio(true);
                      }}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <p className="text-sm text-slate-600">{studentData.bio}</p>
                </div>
                
                <Button className="w-full bg-brand-purple hover:bg-brand-purple-dark gap-2">
                  <UserCircle className="h-4 w-4" />
                  Edit Profile
                </Button>
              </div>
            </motion.div>
            
            {/* Learning Path */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100">
                <h3 className="text-lg font-semibold flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-brand-purple" />
                  Learning Path
                </h3>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Overall Progress</span>
                  <span>{Math.round(overallProgress)}%</span>
                </div>
                <Progress value={overallProgress} className="h-2 mb-6" />
                
                <div className="space-y-4">
                  {learningPath.map((item, index) => (
                    <div 
                      key={item.id}
                      className={`relative pl-8 before:content-[''] before:absolute before:left-3 before:top-2 before:w-2 before:h-2 before:rounded-full ${
                        item.status === 'completed' ? 'before:bg-green-500' : 
                        item.status === 'in-progress' ? 'before:bg-brand-purple' : 
                        'before:bg-slate-300'
                      } ${
                        index < learningPath.length - 1 ? 'pb-4 after:content-[""] after:absolute after:left-[14px] after:top-4 after:w-0.5 after:h-full after:bg-slate-200' : ''
                      }`}
                    >
                      <div className="mb-1">
                        <span className="text-sm font-medium">{item.title}</span>
                        <span className={`text-xs ml-2 px-2 py-0.5 rounded-full ${
                          item.status === 'completed' ? 'bg-green-100 text-green-700' : 
                          item.status === 'in-progress' ? 'bg-brand-purple/10 text-brand-purple' : 
                          'bg-slate-100 text-slate-500'
                        }`}>
                          {item.status === 'completed' ? 'Completed' : 
                           item.status === 'in-progress' ? 'In Progress' : 
                           'Upcoming'}
                        </span>
                      </div>
                      {item.status !== 'upcoming' && (
                        <div className="w-full mt-1">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-500">{item.progress}% complete</span>
                          </div>
                          <Progress value={item.progress} className="h-1.5" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Main content area */}
          <div className="flex-1">
            <Tabs 
              defaultValue="overview" 
              className="w-full"
              onValueChange={setActiveTab}
            >
              <TabsList className="grid grid-cols-4 md:grid-cols-4 lg:w-[600px] mb-6">
                <TabsTrigger value="overview" className="text-sm">
                  <Gamepad2 className="h-4 w-4 mr-2 hidden sm:inline" />
                  My Games
                </TabsTrigger>
                <TabsTrigger value="leaderboard" className="text-sm">
                  <Trophy className="h-4 w-4 mr-2 hidden sm:inline" />
                  Leaderboard
                </TabsTrigger>
                <TabsTrigger value="badges" className="text-sm">
                  <Award className="h-4 w-4 mr-2 hidden sm:inline" />
                  Badges
                </TabsTrigger>
                <TabsTrigger value="goodies" className="text-sm">
                  <Gift className="h-4 w-4 mr-2 hidden sm:inline" />
                  Goodies
                </TabsTrigger>
              </TabsList>
              
              {/* My Games Tab */}
              <TabsContent value="overview" className="space-y-8">
                {selectedGameId && selectedGame ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={selectedGame.image} 
                        alt={selectedGame.title}
                        className="w-full h-full object-cover"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute top-4 left-4"
                        onClick={() => setSelectedGameId(null)}
                      >
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        Back to Games
                      </Button>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                        <div className="p-6 text-white">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge className="bg-brand-purple border-none">
                              {selectedGame.subject}
                            </Badge>
                            <Badge variant="outline" className="text-white border-white/50">
                              Chapter {selectedGame.chapter}
                            </Badge>
                            <Badge variant="outline" className="text-white border-white/50">
                              {selectedGame.difficulty}
                            </Badge>
                          </div>
                          <h2 className="text-2xl font-bold mb-1">{selectedGame.title}</h2>
                          <p className="text-white/80">
                            Last played: {selectedGame.lastPlayed}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center p-4 bg-slate-50 rounded-lg">
                          <div className="flex items-center justify-center mb-1 text-brand-purple">
                            <Star className="h-5 w-5" />
                          </div>
                          <p className="text-lg font-bold">{selectedGame.score}%</p>
                          <p className="text-xs text-slate-500">Current Score</p>
                        </div>
                        <div className="text-center p-4 bg-slate-50 rounded-lg">
                          <div className="flex items-center justify-center mb-1 text-amber-500">
                            <Award className="h-5 w-5" />
                          </div>
                          <p className="text-lg font-bold">{selectedGame.badges}</p>
                          <p className="text-xs text-slate-500">Badges Earned</p>
                        </div>
                        <div className="text-center p-4 bg-slate-50 rounded-lg">
                          <div className="flex items-center justify-center mb-1 text-green-500">
                            <Trophy className="h-5 w-5" />
                          </div>
                          <p className="text-lg font-bold">#{selectedGame.score > 90 ? 1 : selectedGame.score > 80 ? 2 : 3}</p>
                          <p className="text-xs text-slate-500">Your Rank</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-center mb-8">
                        <Button 
                          className="bg-brand-purple hover:bg-brand-purple-dark min-w-[200px]"
                          onClick={() => playGame(selectedGame.id)}
                          disabled={loadingGame}
                        >
                          {loadingGame ? "Loading..." : "Play Now"}
                        </Button>
                      </div>
                      
                      {/* Game Comments */}
                      <div className="border-t border-slate-100 pt-6">
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                          <MessageSquare className="h-5 w-5 mr-2 text-brand-purple" />
                          Comments & Feedback
                        </h3>
                        
                        <form onSubmit={handleSubmitComment} className="mb-6">
                          <div className="flex items-start gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={studentData.avatar} alt={studentData.name} />
                              <AvatarFallback>{studentData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <textarea 
                                className="w-full border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple/50"
                                placeholder="Share your thoughts about this game..."
                                rows={3}
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                              ></textarea>
                              <div className="flex justify-end mt-2">
                                <Button 
                                  className="bg-brand-purple hover:bg-brand-purple-dark"
                                  disabled={!newComment.trim()}
                                  type="submit"
                                >
                                  Post Comment
                                </Button>
                              </div>
                            </div>
                          </div>
                        </form>
                        
                        <div className="space-y-4">
                          {commentsList
                            .filter(comment => comment.gameId === selectedGameId)
                            .map(comment => (
                              <div key={comment.id} className="flex gap-3">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage src={comment.avatar} alt={comment.user} />
                                  <AvatarFallback>{comment.user.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="bg-slate-50 rounded-lg p-3">
                                    <div className="flex justify-between items-start mb-1">
                                      <span className="font-medium">{comment.user}</span>
                                      <span className="text-xs text-slate-500">{comment.date}</span>
                                    </div>
                                    <p className="text-sm text-slate-700">{comment.comment}</p>
                                  </div>
                                  <div className="flex items-center mt-1 ml-1">
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 px-2 text-xs text-slate-500 hover:text-brand-purple"
                                    >
                                      <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                                      {comment.likes || 0} {comment.likes === 1 ? 'Like' : 'Likes'}
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 px-2 text-xs text-slate-500 hover:text-brand-purple"
                                    >
                                      Reply
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          
                          {commentsList.filter(comment => comment.gameId === selectedGameId).length === 0 && (
                            <div className="text-center py-8 text-slate-500">
                              <MessageSquare className="h-12 w-12 mx-auto mb-3 text-slate-300" />
                              <p>No comments yet. Be the first to share your thoughts!</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {unlockedGames.map((game) => (
                      <motion.div
                        key={game.id}
                        variants={item}
                        whileHover={{ scale: 1.02 }}
                        className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden transition-all duration-200 hover:shadow-md cursor-pointer"
                        onClick={() => setSelectedGameId(game.id)}
                      >
                        <div className="relative h-40">
                          <img 
                            src={game.image}
                            alt={game.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                            <div className="p-4 text-white">
                              <div className="flex items-center space-x-2 mb-1">
                                <Badge className="bg-brand-purple border-none text-xs">
                                  {game.subject}
                                </Badge>
                                <Badge variant="outline" className="text-white border-white/50 text-xs">
                                  Chapter {game.chapter}
                                </Badge>
                              </div>
                              <h3 className="font-bold">{game.title}</h3>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4">
                          <div className="flex justify-between items-center text-sm mb-2">
                            <div className="flex items-center text-slate-500">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>Last played: {game.lastPlayed}</span>
                            </div>
                            <div className="flex items-center text-amber-500 font-medium">
                              <Star className="h-4 w-4 mr-1" />
                              <span>{game.score}%</span>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-slate-500">
                              {game.badges} {game.badges === 1 ? 'badge' : 'badges'} earned
                            </span>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-brand-purple hover:bg-brand-purple/10"
                              onClick={(e) => {
                                e.stopPropagation();
                                playGame(game.id);
                              }}
                            >
                              Play Now
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
