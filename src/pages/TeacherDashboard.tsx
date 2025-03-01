
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { toast } from "sonner";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Gamepad2, 
  Lock, 
  LockOpen, 
  ChevronLeft, 
  ChevronRight, 
  Grid,
  BookOpen, 
  GraduationCap,
  ArrowLeft,
  Search,
  Users,
  Trophy,
  Award,
  BarChart3,
  Calendar,
  Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";

// Mock data for grades
const grades = [
  "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", 
  "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10",
  "Grade 11", "Grade 12"
];

// Mock data for subjects per grade
const subjects = {
  "Grade 1": ["Mathematics", "English", "Science", "Social Studies"],
  "Grade 2": ["Mathematics", "English", "Science", "Social Studies"],
  "Grade 3": ["Mathematics", "English", "Science", "Social Studies", "Environmental Studies"],
  "Grade 4": ["Mathematics", "English", "Science", "Social Studies", "Environmental Studies"],
  "Grade 5": ["Mathematics", "English", "Science", "Social Studies", "Environmental Studies"],
  "Grade 6": ["Mathematics", "English", "Science", "Social Studies", "Hindi", "Sanskrit"],
  "Grade 7": ["Mathematics", "English", "Science", "Social Studies", "Hindi", "Sanskrit"],
  "Grade 8": ["Mathematics", "English", "Science", "Social Studies", "Hindi", "Sanskrit"],
  "Grade 9": ["Mathematics", "English", "Science", "Social Studies", "Hindi", "Sanskrit"],
  "Grade 10": ["Mathematics", "English", "Science", "Social Studies", "Hindi", "Sanskrit"],
  "Grade 11": ["Physics", "Chemistry", "Biology", "Mathematics", "English", "Computer Science"],
  "Grade 12": ["Physics", "Chemistry", "Biology", "Mathematics", "English", "Computer Science"]
};

// Mock data for games per subject
const getGamesForSubject = (grade: string, subject: string) => {
  // In a real app, this would come from an API
  const chapters = subject === "Mathematics" ? 10 : 
                   subject === "Science" ? 12 :
                   subject === "English" ? 8 : 6;
  
  return Array.from({ length: chapters }, (_, i) => ({
    id: `${grade}-${subject}-${i+1}`,
    title: `${subject} Chapter ${i+1} Game`,
    chapter: i+1,
    description: `Interactive game covering ${subject} concepts from Chapter ${i+1}`,
    image: `https://source.unsplash.com/random/300x200?${subject.toLowerCase()},${i+1}`,
    isLocked: Math.random() > 0.7, // Randomly locked
    difficulty: ["Easy", "Medium", "Hard"][Math.floor(Math.random() * 3)],
    duration: `${Math.floor(Math.random() * 30) + 15} minutes`
  }));
};

// Mock data for students and their progress
const getMockStudents = (grade: string, subject: string) => {
  return Array.from({ length: 15 }, (_, i) => ({
    id: `student-${grade}-${i+1}`,
    name: `Student ${i+1}`,
    avatar: `https://source.unsplash.com/random/100x100?face,${i+1}`,
    progress: Math.floor(Math.random() * 101), // 0-100
    completedGames: Math.floor(Math.random() * 8) + 1,
    totalGames: 8,
    lastActive: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toLocaleDateString(),
    score: Math.floor(Math.random() * 501) + 500, // 500-1000
    averageScore: Math.floor(Math.random() * 41) + 60, // 60-100
    timeSpent: `${Math.floor(Math.random() * 10) + 2}h ${Math.floor(Math.random() * 50) + 10}m`,
    badges: Math.floor(Math.random() * 11)
  }));
};

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const { toast: shadcnToast } = useToast();
  const [selectedGrade, setSelectedGrade] = useState<string>(grades[0]);
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [games, setGames] = useState<any[]>([]);
  const [view, setView] = useState<'grades' | 'subjects' | 'games' | 'students'>('grades');
  const [gridView, setGridView] = useState<boolean>(true);
  const [students, setStudents] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortCriteria, setSortCriteria] = useState<string>("score");
  
  // Track if we're authenticated
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isTeacher, setIsTeacher] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          // Check if the user is a teacher
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();
            
          if (profileError) {
            console.error("Error fetching profile:", profileError);
            setIsAuthenticated(false);
            setIsTeacher(false);
          } else {
            setIsAuthenticated(true);
            setIsTeacher(profileData?.role === 'teacher');
            
            if (profileData?.role !== 'teacher') {
              toast.error("Access denied. You need teacher permissions to view this page.");
              navigate('/role-selection');
            }
          }
        } else {
          setIsAuthenticated(false);
          toast.error("You need to be logged in to access this page");
          navigate('/role-selection');
        }
      } catch (error) {
        console.error("Session check error:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserSession();
  }, [navigate]);

  useEffect(() => {
    if (selectedSubject) {
      setGames(getGamesForSubject(selectedGrade, selectedSubject));
      setStudents(getMockStudents(selectedGrade, selectedSubject));
    }
  }, [selectedGrade, selectedSubject]);

  const handleGradeSelect = (grade: string) => {
    setSelectedGrade(grade);
    setView('subjects');
  };

  const handleSubjectSelect = (subject: string) => {
    setSelectedSubject(subject);
    setGames(getGamesForSubject(selectedGrade, subject));
    setStudents(getMockStudents(selectedGrade, subject));
    setView('games');
  };

  const handleBackToGrades = () => {
    setView('grades');
    setSelectedSubject("");
  };

  const handleBackToSubjects = () => {
    setView('subjects');
  };

  const handleBackToGames = () => {
    setView('games');
  };

  const toggleGameLock = (gameId: string) => {
    setGames(games.map(game => 
      game.id === gameId ? { ...game, isLocked: !game.isLocked } : game
    ));

    const game = games.find(g => g.id === gameId);
    if (game) {
      const newStatus = !game.isLocked ? "locked" : "unlocked";
      shadcnToast({
        title: `Game ${newStatus}`,
        description: `"${game.title}" has been ${newStatus} for students.`,
      });
    }
  };

  const viewStudentProgress = () => {
    setView('students');
  };

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortCriteria === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortCriteria === 'progress') {
      return b.progress - a.progress;
    } else if (sortCriteria === 'score') {
      return b.score - a.score;
    } else if (sortCriteria === 'active') {
      return new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime();
    }
    return 0;
  });

  const topPerformers = [...students].sort((a, b) => b.score - a.score).slice(0, 5);

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-purple mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !isTeacher) {
    return null; // Navigation happens in useEffect
  }

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
              <h1 className="text-xl font-bold">
                Teacher Dashboard
              </h1>
            </div>
            
            <div className="flex items-center space-x-3">
              {view === 'games' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={viewStudentProgress}
                >
                  <Users className="h-4 w-4 mr-2" />
                  View Student Progress
                </Button>
              )}
              {view === 'games' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setGridView(!gridView)}
                >
                  <Grid className="h-4 w-4 mr-2" />
                  {gridView ? "List View" : "Grid View"}
                </Button>
              )}
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

      {/* Navigation breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="container max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center text-sm text-slate-500">
            <Button 
              variant="ghost" 
              className="px-2 py-1 h-auto text-sm"
              onClick={() => setView('grades')}
            >
              Grades
            </Button>
            {view !== 'grades' && (
              <>
                <ChevronRight className="h-4 w-4 mx-1" />
                <Button 
                  variant="ghost" 
                  className="px-2 py-1 h-auto text-sm"
                  onClick={() => setView('subjects')}
                >
                  {selectedGrade}
                </Button>
              </>
            )}
            {(view === 'games' || view === 'students') && (
              <>
                <ChevronRight className="h-4 w-4 mx-1" />
                <Button 
                  variant="ghost" 
                  className="px-2 py-1 h-auto text-sm"
                  onClick={() => setView('games')}
                >
                  {selectedSubject}
                </Button>
              </>
            )}
            {view === 'students' && (
              <>
                <ChevronRight className="h-4 w-4 mx-1" />
                <span className="px-2 py-1">
                  Student Progress
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="container max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {view === 'grades' && (
            <motion.div
              key="grades"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Select Grade</h2>
                <p className="text-slate-500">
                  Choose a grade to view and manage subject games
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {grades.map((grade) => (
                  <motion.div
                    key={grade}
                    variants={item}
                    whileHover={{ scale: 1.03 }}
                    className="cursor-pointer"
                    onClick={() => handleGradeSelect(grade)}
                  >
                    <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 text-center hover:border-brand-purple hover:shadow transition-all duration-200">
                      <div className="w-12 h-12 mx-auto bg-brand-purple/10 rounded-full flex items-center justify-center mb-4">
                        <GraduationCap className="h-6 w-6 text-brand-purple" />
                      </div>
                      <h3 className="font-semibold">{grade}</h3>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {view === 'subjects' && (
            <motion.div
              key="subjects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    {selectedGrade} Subjects
                  </h2>
                  <p className="text-slate-500">
                    Select a subject to view and manage games
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={handleBackToGrades}
                    className="gap-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Back to Grades
                  </Button>
                </div>
              </div>

              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {(subjects[selectedGrade as keyof typeof subjects] || []).map((subject) => (
                  <motion.div
                    key={subject}
                    variants={item}
                    whileHover={{ scale: 1.03 }}
                    className="cursor-pointer"
                    onClick={() => handleSubjectSelect(subject)}
                  >
                    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden hover:border-brand-purple hover:shadow transition-all duration-200">
                      <div className="h-32 bg-gradient-to-r from-brand-purple/80 to-brand-accent-purple/80 flex items-center justify-center">
                        <BookOpen className="h-12 w-12 text-white" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg">{subject}</h3>
                        <p className="text-sm text-slate-500 mt-1">
                          {subject === "Mathematics" ? "10" : 
                            subject === "Science" ? "12" :
                            subject === "English" ? "8" : "6"} chapters
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {view === 'games' && (
            <motion.div
              key="games"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    {selectedGrade} - {selectedSubject} Games
                  </h2>
                  <p className="text-slate-500">
                    Toggle lock/unlock to control student access to games
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    onClick={handleBackToSubjects}
                    className="gap-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Back to Subjects
                  </Button>
                  <Button
                    variant="default"
                    onClick={viewStudentProgress}
                    className="bg-brand-purple hover:bg-brand-purple/90"
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                </div>
              </div>

              {/* Overall class stats cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-500">Average Completion</p>
                        <h3 className="text-2xl font-bold mt-1">67%</h3>
                      </div>
                      <div className="h-12 w-12 bg-brand-purple/10 rounded-full flex items-center justify-center">
                        <Trophy className="h-6 w-6 text-brand-purple" />
                      </div>
                    </div>
                    <Progress value={67} className="h-2 mt-4" />
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-500">Average Score</p>
                        <h3 className="text-2xl font-bold mt-1">78/100</h3>
                      </div>
                      <div className="h-12 w-12 bg-green-500/10 rounded-full flex items-center justify-center">
                        <Award className="h-6 w-6 text-green-500" />
                      </div>
                    </div>
                    <Progress value={78} className="h-2 mt-4 bg-secondary [&>div]:bg-green-500" />
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-500">Active Students</p>
                        <h3 className="text-2xl font-bold mt-1">24/30</h3>
                      </div>
                      <div className="h-12 w-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-blue-500" />
                      </div>
                    </div>
                    <Progress value={80} className="h-2 mt-4 bg-secondary [&>div]:bg-blue-500" />
                  </CardContent>
                </Card>
              </div>

              {gridView ? (
                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={container}
                  initial="hidden"
                  animate="show"
                >
                  {games.map((game) => (
                    <motion.div
                      key={game.id}
                      variants={item}
                      className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-all duration-200"
                    >
                      <div className="relative h-48">
                        <img 
                          src={game.image} 
                          alt={game.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                          <div className="p-4 text-white">
                            <div className="flex items-center mb-1">
                              <span className="text-xs font-medium bg-brand-purple/90 px-2 py-0.5 rounded-full">
                                Chapter {game.chapter}
                              </span>
                              <span className="mx-2 text-xs">•</span>
                              <span className="text-xs font-medium bg-slate-600/90 px-2 py-0.5 rounded-full">
                                {game.difficulty}
                              </span>
                            </div>
                            <h3 className="font-semibold text-lg">{game.title}</h3>
                          </div>
                        </div>
                        <div className="absolute top-2 right-2">
                          <Button
                            variant={game.isLocked ? "default" : "outline"}
                            size="icon"
                            className={`h-8 w-8 ${game.isLocked ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleGameLock(game.id);
                            }}
                          >
                            {game.isLocked ? (
                              <Lock className="h-4 w-4 text-white" />
                            ) : (
                              <LockOpen className="h-4 w-4 text-white" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-slate-600 mb-3">{game.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-500">
                            <span className="font-medium">Duration:</span> {game.duration}
                          </span>
                          <Button
                            variant="link"
                            className="p-0 h-auto text-brand-purple"
                          >
                            Preview Game
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                  <div className="grid grid-cols-12 gap-4 p-4 font-medium text-sm text-slate-600 border-b border-slate-200">
                    <div className="col-span-5">Game Title</div>
                    <div className="col-span-1 text-center">Chapter</div>
                    <div className="col-span-2">Difficulty</div>
                    <div className="col-span-2">Duration</div>
                    <div className="col-span-2 text-right">Status</div>
                  </div>
                  <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                  >
                    {games.map((game) => (
                      <motion.div 
                        key={game.id}
                        variants={item}
                        className="grid grid-cols-12 gap-4 p-4 items-center border-b border-slate-100 hover:bg-slate-50"
                      >
                        <div className="col-span-5 flex items-center gap-3">
                          <div className="h-10 w-10 rounded overflow-hidden flex-shrink-0">
                            <img 
                              src={game.image} 
                              alt={game.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{game.title}</h3>
                            <p className="text-xs text-slate-500 line-clamp-1">{game.description}</p>
                          </div>
                        </div>
                        <div className="col-span-1 text-center">
                          <span className="inline-block px-2 py-1 rounded-full bg-brand-purple/10 text-brand-purple text-xs font-medium">
                            {game.chapter}
                          </span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-sm">{game.difficulty}</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-sm">{game.duration}</span>
                        </div>
                        <div className="col-span-2 text-right flex items-center justify-end gap-2">
                          <Button variant="link" size="sm" className="h-8 text-brand-purple">
                            Preview
                          </Button>
                          <Button
                            variant={game.isLocked ? "default" : "outline"}
                            size="sm"
                            className={`h-8 ${game.isLocked ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                            onClick={() => toggleGameLock(game.id)}
                          >
                            {game.isLocked ? (
                              <>
                                <Lock className="h-4 w-4 mr-1" />
                                Locked
                              </>
                            ) : (
                              <>
                                <LockOpen className="h-4 w-4 mr-1" />
                                Unlocked
                              </>
                            )}
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              )}
            </motion.div>
          )}

          {view === 'students' && (
            <motion.div
              key="students"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    {selectedGrade} - {selectedSubject} Student Progress
                  </h2>
                  <p className="text-slate-500">
                    Track student performance and achievements
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={handleBackToGames}
                    className="gap-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Back to Games
                  </Button>
                </div>
              </div>

              {/* Class analytics cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-slate-500">Class Average</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">78%</div>
                    <p className="text-xs text-green-500 flex items-center mt-1">
                      <ChevronRight className="h-3 w-3 rotate-90" /> 
                      +12% from last month
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-slate-500">Completion Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">62%</div>
                    <p className="text-xs text-green-500 flex items-center mt-1">
                      <ChevronRight className="h-3 w-3 rotate-90" /> 
                      +5% from last month
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-slate-500">Avg. Time Spent</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">4h 23m</div>
                    <p className="text-xs text-green-500 flex items-center mt-1">
                      <ChevronRight className="h-3 w-3 rotate-90" /> 
                      +42m from last month
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-slate-500">Active Students</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">26/30</div>
                    <p className="text-xs text-red-500 flex items-center mt-1">
                      <ChevronRight className="h-3 w-3 -rotate-90" /> 
                      -2 from last month
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Top performers and student list */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle className="text-lg">Top Performers</CardTitle>
                    <CardDescription>Students with highest scores</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {topPerformers.map((student, index) => (
                        <div key={student.id} className="flex items-center gap-3">
                          <div className="relative">
                            {index < 3 && (
                              <div className={`absolute -top-1 -right-1 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold text-white
                                ${index === 0 ? 'bg-amber-500' : index === 1 ? 'bg-slate-400' : 'bg-amber-800'}`}>
                                {index + 1}
                              </div>
                            )}
                            <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-white shadow">
                              <img 
                                src={student.avatar} 
                                alt={student.name}
                                className="w-full h-full object-cover" 
                              />
                            </div>
                          </div>
                          <div className="flex-grow">
                            <h4 className="font-medium">{student.name}</h4>
                            <div className="flex items-center">
                              <Progress value={student.progress} className="h-1.5 mr-2 w-16" />
                              <span className="text-xs text-slate-500">{student.progress}%</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">{student.score}</div>
                            <div className="text-xs text-slate-500">points</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button variant="outline" className="w-full" size="sm">
                      View All Rankings
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="col-span-1 lg:col-span-2">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <CardTitle className="text-lg">Student Progress</CardTitle>
                        <CardDescription>Track individual student performance</CardDescription>
                      </div>
                      <div className="flex space-x-2 w-full md:w-auto">
                        <div className="relative flex-grow md:flex-grow-0">
                          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                          <Input
                            type="text"
                            placeholder="Search students..."
                            className="pl-8 w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                        <div className="flex items-center">
                          <Button variant="outline" size="icon">
                            <Filter className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-sm text-slate-500">Sort by:</span>
                        <Button
                          variant={sortCriteria === 'score' ? 'default' : 'outline'}
                          size="sm"
                          className={sortCriteria === 'score' ? 'bg-brand-purple hover:bg-brand-purple/90' : ''}
                          onClick={() => setSortCriteria('score')}
                        >
                          Score
                        </Button>
                        <Button
                          variant={sortCriteria === 'progress' ? 'default' : 'outline'}
                          size="sm"
                          className={sortCriteria === 'progress' ? 'bg-brand-purple hover:bg-brand-purple/90' : ''}
                          onClick={() => setSortCriteria('progress')}
                        >
                          Progress
                        </Button>
                        <Button
                          variant={sortCriteria === 'name' ? 'default' : 'outline'}
                          size="sm"
                          className={sortCriteria === 'name' ? 'bg-brand-purple hover:bg-brand-purple/90' : ''}
                          onClick={() => setSortCriteria('name')}
                        >
                          Name
                        </Button>
                        <Button
                          variant={sortCriteria === 'active' ? 'default' : 'outline'}
                          size="sm"
                          className={sortCriteria === 'active' ? 'bg-brand-purple hover:bg-brand-purple/90' : ''}
                          onClick={() => setSortCriteria('active')}
                        >
                          Last Active
                        </Button>
                      </div>
                    
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Student</TableHead>
                            <TableHead>Progress</TableHead>
                            <TableHead>Score</TableHead>
                            <TableHead>Completed</TableHead>
                            <TableHead>Last Active</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {sortedStudents.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={6} className="text-center h-32">
                                <div className="flex flex-col items-center justify-center text-slate-500">
                                  <Search className="h-8 w-8 mb-2 text-slate-400" />
                                  <p>No students found matching your search.</p>
                                </div>
                              </TableCell>
                            </TableRow>
                          ) : (
                            sortedStudents.map((student) => (
                              <TableRow key={student.id}>
                                <TableCell>
                                  <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full overflow-hidden">
                                      <img 
                                        src={student.avatar} 
                                        alt={student.name}
                                        className="w-full h-full object-cover" 
                                      />
                                    </div>
                                    <span className="font-medium">{student.name}</span>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <Progress value={student.progress} className="h-2 w-16" />
                                    <span className="text-sm">{student.progress}%</span>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="font-medium">{student.score}</div>
                                  <div className="text-xs text-slate-500">{student.averageScore}% avg</div>
                                </TableCell>
                                <TableCell>
                                  {student.completedGames}/{student.totalGames}
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3 text-slate-400" />
                                    <span className="text-sm">{student.lastActive}</span>
                                  </div>
                                </TableCell>
                                <TableCell className="text-right">
                                  <Button variant="outline" size="sm">View Details</Button>
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default TeacherDashboard;
