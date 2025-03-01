
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, 
  FileText, 
  X, 
  ArrowLeft, 
  Loader2,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import AdminSidebar from '@/components/admin/AdminSidebar';
import { supabase } from '@/integrations/supabase/client';

// Data for grades, subjects, and supported formats
const grades = [
  "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", 
  "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10",
  "Grade 11", "Grade 12"
];

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

const supportedFormats = [
  { format: "SCORM 1.2", description: "Older SCORM standard, widely supported" },
  { format: "SCORM 2004", description: "Updated SCORM standard with enhanced sequencing" },
  { format: "xAPI (Tin Can)", description: "Modern standard that tracks learning experiences" },
  { format: "cmi5", description: "Profile for xAPI specifically for LMS interoperability" },
];

const GameUpload = () => {
  const navigate = useNavigate();
  const { toast: uiToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  // Form state
  const [gameTitle, setGameTitle] = useState('');
  const [gameDescription, setGameDescription] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [chapterNumber, setChapterNumber] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [learningStandards, setLearningStandards] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('');
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };
  
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setThumbnailFile(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const clearFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const clearThumbnail = () => {
    setThumbnailFile(null);
    setThumbnailPreview(null);
    if (thumbnailInputRef.current) {
      thumbnailInputRef.current.value = '';
    }
  };
  
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!gameTitle || !selectedGrade || !selectedSubject || !uploadedFile || !selectedFormat) {
      uiToast({
        title: "Missing Fields",
        description: "Please fill in all the required fields and upload a game file",
        variant: "destructive",
      });
      return;
    }
    
    setIsUploading(true);
    setUploadProgress(10);
    
    try {
      // Create a FormData object to send the files and metadata
      const formData = new FormData();
      formData.append('gameFile', uploadedFile);
      
      if (thumbnailFile) {
        formData.append('thumbnail', thumbnailFile);
      }
      
      // Add game metadata as JSON
      const gameData = {
        title: gameTitle,
        description: gameDescription,
        grade: selectedGrade,
        subject: selectedSubject,
        chapterNumber: chapterNumber || null,
        difficulty: difficulty || null,
        estimatedTime: estimatedTime || null,
        format: selectedFormat,
        learningStandards: learningStandards || null,
      };
      
      formData.append('gameData', JSON.stringify(gameData));
      
      setUploadProgress(30);
      
      // Upload the game using the Edge Function
      const { data, error } = await supabase.functions.invoke('upload-game', {
        body: formData,
      });
      
      setUploadProgress(90);
      
      if (error) {
        throw new Error(error.message);
      }
      
      setUploadProgress(100);
      
      // Show success message
      toast.success('Game Uploaded', {
        description: `${gameTitle} has been uploaded and is now available in the game library.`,
        duration: 5000,
      });
      
      // Navigate back to the games management page
      setTimeout(() => {
        navigate('/admin/games');
      }, 1000);
    } catch (error) {
      console.error('Upload error:', error);
      uiToast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : 'Something went wrong during the upload.',
        variant: "destructive",
      });
      setUploadProgress(0);
      setIsUploading(false);
    }
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
          {isSidebarOpen ? <X className="h-5 w-5" /> : <div className="h-5 w-5"></div>}
        </Button>
      </div>

      {/* Sidebar */}
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main content */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'ml-0'}`}>
        <main className="p-6">
          <div className="flex items-center mb-8">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/admin/games')}
              className="mr-4"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Upload New Game</h1>
              <p className="text-slate-500">Add a new educational game to the platform</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Game Details</CardTitle>
                  <CardDescription>
                    Enter information about the educational game
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpload} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Game Title <span className="text-red-500">*</span>
                        </label>
                        <Input 
                          value={gameTitle}
                          onChange={(e) => setGameTitle(e.target.value)}
                          placeholder="Enter the game title"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Grade <span className="text-red-500">*</span>
                        </label>
                        <Select 
                          value={selectedGrade}
                          onValueChange={(value) => {
                            setSelectedGrade(value);
                            setSelectedSubject('');
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select grade" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {grades.map((grade) => (
                                <SelectItem key={grade} value={grade}>
                                  {grade}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Subject <span className="text-red-500">*</span>
                        </label>
                        <Select 
                          value={selectedSubject}
                          onValueChange={setSelectedSubject}
                          disabled={!selectedGrade}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={selectedGrade ? "Select subject" : "Select grade first"} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {selectedGrade && 
                                subjects[selectedGrade as keyof typeof subjects]?.map((subject) => (
                                  <SelectItem key={subject} value={subject}>
                                    {subject}
                                  </SelectItem>
                                ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Chapter Number
                        </label>
                        <Input 
                          type="number"
                          min="1"
                          value={chapterNumber}
                          onChange={(e) => setChapterNumber(e.target.value)}
                          placeholder="e.g., 5"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Difficulty Level
                        </label>
                        <Select 
                          value={difficulty}
                          onValueChange={setDifficulty}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Easy">Easy</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="Hard">Hard</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Estimated Time (minutes)
                        </label>
                        <Input 
                          type="number"
                          min="1"
                          value={estimatedTime}
                          onChange={(e) => setEstimatedTime(e.target.value)}
                          placeholder="e.g., 20"
                        />
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium">
                          Learning Standards/Outcomes
                        </label>
                        <Textarea 
                          value={learningStandards}
                          onChange={(e) => setLearningStandards(e.target.value)}
                          placeholder="List the learning standards or outcomes addressed by this game"
                          rows={3}
                        />
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium">
                          Game Description
                        </label>
                        <Textarea 
                          value={gameDescription}
                          onChange={(e) => setGameDescription(e.target.value)}
                          placeholder="Provide a brief description of the game and its educational content"
                          rows={4}
                        />
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium">
                          Thumbnail Image
                        </label>
                        {thumbnailPreview ? (
                          <div className="relative w-full h-48 border rounded-md overflow-hidden group">
                            <img 
                              src={thumbnailPreview} 
                              alt="Thumbnail preview" 
                              className="w-full h-full object-cover"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={clearThumbnail}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="border border-dashed border-slate-300 rounded-md p-6 text-center">
                            <Input
                              ref={thumbnailInputRef}
                              type="file"
                              id="thumbnail-upload"
                              className="hidden"
                              accept="image/*"
                              onChange={handleThumbnailChange}
                            />
                            <label
                              htmlFor="thumbnail-upload"
                              className="cursor-pointer flex flex-col items-center justify-center"
                            >
                              <Upload className="h-8 w-8 text-slate-400 mb-2" />
                              <p className="text-sm text-slate-500">
                                Click to upload a thumbnail image
                              </p>
                              <p className="text-xs text-slate-400 mt-1">
                                PNG, JPG or GIF (max 2MB)
                              </p>
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Upload Game File
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-slate-400" />
                        </TooltipTrigger>
                        <TooltipContent className="w-80">
                          <p>Upload your game as a zip file. The game should be packaged according to SCORM or xAPI standards.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {uploadedFile ? (
                    <div className="border rounded-md p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FileText className="h-6 w-6 text-brand-purple mr-2" />
                          <div>
                            <p className="font-medium text-sm">{uploadedFile.name}</p>
                            <p className="text-xs text-slate-500">
                              {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={clearFile}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="border border-dashed border-slate-300 rounded-md p-6 text-center">
                      <Input
                        ref={fileInputRef}
                        type="file"
                        id="file-upload"
                        className="hidden"
                        accept=".zip,.scorm,.xapi"
                        onChange={handleFileChange}
                      />
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer flex flex-col items-center justify-center"
                      >
                        <Upload className="h-8 w-8 text-slate-400 mb-2" />
                        <p className="text-sm text-slate-500">
                          Click to upload your game package
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          ZIP, SCORM or xAPI files (max 500MB)
                        </p>
                      </label>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Game Format</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Select Format <span className="text-red-500">*</span>
                      </label>
                      <Select 
                        value={selectedFormat}
                        onValueChange={setSelectedFormat}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                          {supportedFormats.map((format) => (
                            <SelectItem key={format.format} value={format.format}>
                              {format.format}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Supported Formats:</h4>
                      <div className="space-y-2">
                        {supportedFormats.map((format) => (
                          <div key={format.format} className="flex items-start">
                            <Badge variant="outline" className="mr-2 mt-0.5">
                              {format.format}
                            </Badge>
                            <p className="text-xs text-slate-500">
                              {format.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <Button
                      type="submit"
                      className="w-full bg-brand-purple hover:bg-brand-purple-dark"
                      disabled={isUploading}
                      onClick={handleUpload}
                    >
                      {isUploading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Uploading... ({uploadProgress}%)
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Game
                        </>
                      )}
                    </Button>
                    
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => navigate('/admin/games')}
                      disabled={isUploading}
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default GameUpload;
