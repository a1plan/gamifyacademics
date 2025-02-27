
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart, 
  PieChart as PieChartIcon, 
  LineChart as LineChartIcon, 
  Users, 
  Clock, 
  Check,
  X,
  ArrowLeft,
  Download,
  Filter,
  Calendar,
  School,
  BookOpen,
  Gamepad2
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import AdminSidebar from '@/components/admin/AdminSidebar';

// Mock data for charts
const usageData = [
  { day: 'Mon', games: 420, minutes: 12600 },
  { day: 'Tue', games: 380, minutes: 11400 },
  { day: 'Wed', games: 450, minutes: 13500 },
  { day: 'Thu', games: 520, minutes: 15600 },
  { day: 'Fri', games: 490, minutes: 14700 },
  { day: 'Sat', games: 200, minutes: 6000 },
  { day: 'Sun', games: 150, minutes: 4500 },
];

const performanceBySubject = [
  { subject: 'Math', averageScore: 78, completionRate: 85 },
  { subject: 'Science', averageScore: 82, completionRate: 77 },
  { subject: 'English', averageScore: 85, completionRate: 90 },
  { subject: 'Social Studies', averageScore: 75, completionRate: 80 },
  { subject: 'Computer Science', averageScore: 88, completionRate: 72 },
];

const userTypeDistribution = [
  { name: 'Students', value: 6500 },
  { name: 'Teachers', value: 850 },
  { name: 'Admins', value: 120 },
];

const gradeDistribution = [
  { name: 'Grade 1-3', value: 1200 },
  { name: 'Grade 4-6', value: 1800 },
  { name: 'Grade 7-9', value: 2100 },
  { name: 'Grade 10-12', value: 1400 },
];

const COLORS = ['#9b87f5', '#f587b8', '#87f5e9', '#f5d787', '#87a9f5'];

const AnalyticsDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [timeRange, setTimeRange] = useState('last-7-days');
  const [selectedSchool, setSelectedSchool] = useState('all');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  
  // Mock data for key metrics
  const keyMetrics = [
    {
      title: "Total Sessions",
      value: "42,850",
      change: "+18% from last period",
      trend: "up",
      icon: <Gamepad2 className="h-5 w-5 text-brand-purple" />,
    },
    {
      title: "Active Users",
      value: "7,465",
      change: "+12% from last period",
      trend: "up",
      icon: <Users className="h-5 w-5 text-emerald-600" />,
    },
    {
      title: "Avg. Session Time",
      value: "24 min",
      change: "+5% from last period",
      trend: "up",
      icon: <Clock className="h-5 w-5 text-blue-600" />,
    },
    {
      title: "Completion Rate",
      value: "76%",
      change: "+4% from last period",
      trend: "up",
      icon: <Check className="h-5 w-5 text-amber-600" />,
    },
  ];
  
  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-slate-200 shadow-md rounded-md">
          <p className="text-sm font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value} {entry.name === 'minutes' ? 'mins' : ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
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
          {isSidebarOpen ? <X className="h-5 w-5" /> : <BarChart className="h-5 w-5" />}
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
              onClick={() => navigate('/admin')}
              className="mr-4"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
              <p className="text-slate-500">Game usage and performance analytics</p>
            </div>
          </div>
          
          {/* Filters */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center">
                  <Filter className="h-5 w-5 text-slate-500 mr-2" />
                  <span className="font-medium">Filters:</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
                  <div className="w-full">
                    <Select 
                      value={timeRange}
                      onValueChange={setTimeRange}
                    >
                      <SelectTrigger className="w-full">
                        <Calendar className="h-4 w-4 mr-2 text-slate-500" />
                        <SelectValue placeholder="Time range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="yesterday">Yesterday</SelectItem>
                        <SelectItem value="last-7-days">Last 7 days</SelectItem>
                        <SelectItem value="last-30-days">Last 30 days</SelectItem>
                        <SelectItem value="this-month">This month</SelectItem>
                        <SelectItem value="last-month">Last month</SelectItem>
                        <SelectItem value="custom">Custom range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="w-full">
                    <Select 
                      value={selectedSchool}
                      onValueChange={setSelectedSchool}
                    >
                      <SelectTrigger className="w-full">
                        <School className="h-4 w-4 mr-2 text-slate-500" />
                        <SelectValue placeholder="School" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Schools</SelectItem>
                        <SelectItem value="dps">Delhi Public School</SelectItem>
                        <SelectItem value="svs">St. Xavier's School</SelectItem>
                        <SelectItem value="kv">Kendriya Vidyalaya</SelectItem>
                        <SelectItem value="aps">Army Public School</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="w-full">
                    <Select 
                      value={selectedGrade}
                      onValueChange={setSelectedGrade}
                    >
                      <SelectTrigger className="w-full">
                        <Users className="h-4 w-4 mr-2 text-slate-500" />
                        <SelectValue placeholder="Grade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Grades</SelectItem>
                        <SelectItem value="grade-1-3">Grade 1-3</SelectItem>
                        <SelectItem value="grade-4-6">Grade 4-6</SelectItem>
                        <SelectItem value="grade-7-9">Grade 7-9</SelectItem>
                        <SelectItem value="grade-10-12">Grade 10-12</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="w-full">
                    <Select 
                      value={selectedSubject}
                      onValueChange={setSelectedSubject}
                    >
                      <SelectTrigger className="w-full">
                        <BookOpen className="h-4 w-4 mr-2 text-slate-500" />
                        <SelectValue placeholder="Subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Subjects</SelectItem>
                        <SelectItem value="math">Mathematics</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="social">Social Studies</SelectItem>
                        <SelectItem value="cs">Computer Science</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button variant="outline" className="ml-auto whitespace-nowrap">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {keyMetrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-slate-500 mb-1">{metric.title}</p>
                      <p className="text-2xl font-bold">{metric.value}</p>
                      <p className="text-xs mt-1 flex items-center">
                        {metric.trend === "up" ? (
                          <LineChartIcon className="h-3 w-3 text-emerald-600 mr-1" />
                        ) : (
                          <LineChartIcon className="h-3 w-3 text-red-600 mr-1 rotate-180" />
                        )}
                        <span className={metric.trend === "up" ? "text-emerald-600" : "text-red-600"}>
                          {metric.change}
                        </span>
                      </p>
                    </div>
                    <div className="p-3 rounded-full bg-brand-accent-purple/10">
                      {metric.icon}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Tabs defaultValue="usage" className="w-full">
            <TabsList className="mb-6 bg-slate-100">
              <TabsTrigger value="usage" className="data-[state=active]:bg-white">
                <LineChartIcon className="h-4 w-4 mr-2" />
                Usage Analytics
              </TabsTrigger>
              <TabsTrigger value="performance" className="data-[state=active]:bg-white">
                <BarChart className="h-4 w-4 mr-2" />
                Performance Analytics
              </TabsTrigger>
              <TabsTrigger value="demographics" className="data-[state=active]:bg-white">
                <PieChartIcon className="h-4 w-4 mr-2" />
                User Demographics
              </TabsTrigger>
            </TabsList>
            
            {/* Usage Analytics Tab */}
            <TabsContent value="usage" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Game Usage Over Time</CardTitle>
                  <CardDescription>
                    Number of game sessions and time spent by day
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={usageData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis 
                          dataKey="day" 
                          stroke="#94a3b8" 
                          fontSize={12} 
                          tickLine={false}
                          axisLine={{ stroke: '#e2e8f0' }}
                        />
                        <YAxis 
                          yAxisId="left"
                          stroke="#94a3b8" 
                          fontSize={12} 
                          tickLine={false}
                          axisLine={{ stroke: '#e2e8f0' }}
                        />
                        <YAxis 
                          yAxisId="right"
                          orientation="right"
                          stroke="#94a3b8" 
                          fontSize={12} 
                          tickLine={false}
                          axisLine={{ stroke: '#e2e8f0' }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="games"
                          name="Game Sessions"
                          stroke="#9b87f5"
                          strokeWidth={2}
                          dot={{ stroke: '#9b87f5', strokeWidth: 2, r: 4, fill: '#fff' }}
                          activeDot={{ r: 6, stroke: '#9b87f5', strokeWidth: 2, fill: '#9b87f5' }}
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="minutes"
                          name="minutes"
                          stroke="#f587b8"
                          strokeWidth={2}
                          dot={{ stroke: '#f587b8', strokeWidth: 2, r: 4, fill: '#fff' }}
                          activeDot={{ r: 6, stroke: '#f587b8', strokeWidth: 2, fill: '#f587b8' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Most Popular Games</CardTitle>
                    <CardDescription>
                      Games with the highest number of sessions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: "Math Quest Adventure", sessions: 3240, subject: "Mathematics" },
                        { name: "Science Explorer", sessions: 2850, subject: "Science" },
                        { name: "Grammar Galaxy", sessions: 2530, subject: "English" },
                        { name: "History Time Machine", sessions: 2180, subject: "History" },
                        { name: "Coding Adventures", sessions: 1970, subject: "Computer Science" },
                      ].map((game, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-brand-accent-purple/20 text-brand-purple font-medium">
                              {index + 1}
                            </div>
                            <div className="ml-4">
                              <p className="font-medium">{game.name}</p>
                              <Badge variant="outline" className="text-xs">
                                {game.subject}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{game.sessions.toLocaleString()}</p>
                            <p className="text-xs text-slate-500">sessions</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Usage by Device Type</CardTitle>
                    <CardDescription>
                      Distribution of game sessions by device
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'Desktop', value: 45 },
                              { name: 'Tablet', value: 35 },
                              { name: 'Mobile', value: 20 },
                            ]}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {[
                              { name: 'Desktop', value: 45 },
                              { name: 'Tablet', value: 35 },
                              { name: 'Mobile', value: 20 },
                            ].map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Performance Analytics Tab */}
            <TabsContent value="performance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance by Subject</CardTitle>
                  <CardDescription>
                    Average scores and completion rates across subjects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={performanceBySubject}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis 
                          dataKey="subject" 
                          stroke="#94a3b8" 
                          fontSize={12} 
                          tickLine={false}
                          axisLine={{ stroke: '#e2e8f0' }}
                        />
                        <YAxis 
                          stroke="#94a3b8" 
                          fontSize={12} 
                          tickLine={false}
                          axisLine={{ stroke: '#e2e8f0' }}
                          domain={[0, 100]}
                        />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="averageScore" name="Average Score (%)" fill="#9b87f5" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="completionRate" name="Completion Rate (%)" fill="#f587b8" radius={[4, 4, 0, 0]} />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Top Performing Students</CardTitle>
                    <CardDescription>
                      Students with the highest average scores
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: "Priya Singh", grade: "Grade 8", score: 95, school: "Delhi Public School" },
                        { name: "Rahul Verma", grade: "Grade 10", score: 93, school: "St. Xavier's School" },
                        { name: "Ananya Patel", grade: "Grade 7", score: 92, school: "Kendriya Vidyalaya" },
                        { name: "Vikram Singh", grade: "Grade 9", score: 90, school: "Delhi Public School" },
                        { name: "Neha Gupta", grade: "Grade 11", score: 89, school: "Army Public School" },
                      ].map((student, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-amber-100 text-amber-600 font-medium">
                              {index + 1}
                            </div>
                            <div className="ml-4">
                              <p className="font-medium">{student.name}</p>
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline" className="text-xs">
                                  {student.grade}
                                </Badge>
                                <span className="text-xs text-slate-500">{student.school}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{student.score}%</p>
                            <p className="text-xs text-slate-500">avg. score</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Distribution</CardTitle>
                    <CardDescription>
                      Distribution of student scores across all games
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsBarChart
                          data={[
                            { range: '0-20%', count: 120 },
                            { range: '21-40%', count: 250 },
                            { range: '41-60%', count: 850 },
                            { range: '61-80%', count: 1250 },
                            { range: '81-100%', count: 950 },
                          ]}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                          <XAxis 
                            dataKey="range" 
                            stroke="#94a3b8" 
                            fontSize={12} 
                            tickLine={false}
                            axisLine={{ stroke: '#e2e8f0' }}
                          />
                          <YAxis 
                            stroke="#94a3b8" 
                            fontSize={12} 
                            tickLine={false}
                            axisLine={{ stroke: '#e2e8f0' }}
                          />
                          <Tooltip />
                          <Bar 
                            dataKey="count" 
                            name="Students" 
                            fill="#9b87f5" 
                            radius={[4, 4, 0, 0]} 
                          />
                        </RechartsBarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Demographics Tab */}
            <TabsContent value="demographics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>User Type Distribution</CardTitle>
                    <CardDescription>
                      Breakdown of users by type
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={userTypeDistribution}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, value, percent }) => 
                              `${name}: ${value} (${(percent * 100).toFixed(0)}%)`
                            }
                          >
                            {userTypeDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Grade Distribution</CardTitle>
                    <CardDescription>
                      Breakdown of students by grade level
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={gradeDistribution}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, value, percent }) => 
                              `${name}: ${value} (${(percent * 100).toFixed(0)}%)`
                            }
                          >
                            {gradeDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Usage by School</CardTitle>
                  <CardDescription>
                    Game session distribution across schools
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={[
                          { school: 'Delhi Public School', sessions: 8500, students: 1200 },
                          { school: 'St. Xavier\'s School', sessions: 7200, students: 980 },
                          { school: 'Kendriya Vidyalaya', sessions: 6800, students: 1050 },
                          { school: 'Army Public School', sessions: 5500, students: 850 },
                          { school: 'DAV Model School', sessions: 4900, students: 760 },
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis 
                          dataKey="school" 
                          stroke="#94a3b8" 
                          fontSize={12} 
                          tickLine={false}
                          axisLine={{ stroke: '#e2e8f0' }}
                        />
                        <YAxis 
                          yAxisId="left"
                          stroke="#94a3b8" 
                          fontSize={12} 
                          tickLine={false}
                          axisLine={{ stroke: '#e2e8f0' }}
                        />
                        <YAxis 
                          yAxisId="right"
                          orientation="right"
                          stroke="#94a3b8" 
                          fontSize={12} 
                          tickLine={false}
                          axisLine={{ stroke: '#e2e8f0' }}
                        />
                        <Tooltip />
                        <Legend />
                        <Bar 
                          yAxisId="left"
                          dataKey="sessions" 
                          name="Total Sessions" 
                          fill="#9b87f5" 
                          radius={[4, 4, 0, 0]} 
                        />
                        <Bar 
                          yAxisId="right"
                          dataKey="students" 
                          name="Active Students" 
                          fill="#f587b8" 
                          radius={[4, 4, 0, 0]} 
                        />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
