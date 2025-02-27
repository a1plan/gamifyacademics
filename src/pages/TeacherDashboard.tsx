
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { 
  Gamepad2, 
  Lock, 
  LockOpen, 
  ChevronLeft, 
  ChevronRight, 
  Grid,
  BookOpen, 
  GraduationCap,
  ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

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

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedGrade, setSelectedGrade] = useState<string>(grades[0]);
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [games, setGames] = useState<any[]>([]);
  const [view, setView] = useState<'grades' | 'subjects' | 'games'>('grades');
  const [gridView, setGridView] = useState<boolean>(true);

  useEffect(() => {
    if (selectedSubject) {
      setGames(getGamesForSubject(selectedGrade, selectedSubject));
    }
  }, [selectedGrade, selectedSubject]);

  const handleGradeSelect = (grade: string) => {
    setSelectedGrade(grade);
    setView('subjects');
  };

  const handleSubjectSelect = (subject: string) => {
    setSelectedSubject(subject);
    setGames(getGamesForSubject(selectedGrade, subject));
    setView('games');
  };

  const handleBackToGrades = () => {
    setView('grades');
    setSelectedSubject("");
  };

  const handleBackToSubjects = () => {
    setView('subjects');
  };

  const toggleGameLock = (gameId: string) => {
    setGames(games.map(game => 
      game.id === gameId ? { ...game, isLocked: !game.isLocked } : game
    ));

    const game = games.find(g => g.id === gameId);
    if (game) {
      const newStatus = !game.isLocked ? "locked" : "unlocked";
      toast({
        title: `Game ${newStatus}`,
        description: `"${game.title}" has been ${newStatus} for students.`,
      });
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
              <h1 className="text-xl font-bold">
                Teacher Dashboard
              </h1>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setGridView(!gridView)}
              >
                <Grid className="h-4 w-4 mr-2" />
                {gridView ? "List View" : "Grid View"}
              </Button>
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
            {view === 'games' && (
              <>
                <ChevronRight className="h-4 w-4 mx-1" />
                <span className="px-2 py-1">
                  {selectedSubject}
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
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    {selectedGrade} - {selectedSubject} Games
                  </h2>
                  <p className="text-slate-500">
                    Toggle lock/unlock to control student access to games
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={handleBackToSubjects}
                    className="gap-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Back to Subjects
                  </Button>
                </div>
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
        </AnimatePresence>
      </main>
    </div>
  );
};

export default TeacherDashboard;
