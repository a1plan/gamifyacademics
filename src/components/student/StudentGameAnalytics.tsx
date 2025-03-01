
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ArrowUpRight, 
  Award, 
  Clock, 
  BarChart2, 
  BookOpen,
  Brain,
  BarChart3
} from 'lucide-react';

// Sample data - in a real app this would come from the database
const progressData = [
  { name: 'Week 1', score: 65 },
  { name: 'Week 2', score: 59 },
  { name: 'Week 3', score: 80 },
  { name: 'Week 4', score: 81 },
  { name: 'Week 5', score: 76 },
  { name: 'Week 6', score: 85 },
  { name: 'Week 7', score: 90 },
  { name: 'Week 8', score: 92 },
];

const subjectScores = [
  { subject: 'Math', score: 85 },
  { subject: 'Science', score: 78 },
  { subject: 'English', score: 92 },
  { subject: 'History', score: 65 },
  { subject: 'Geography', score: 70 },
];

const gameStats = [
  {
    id: 1,
    name: 'Math Quest',
    subject: 'Mathematics',
    lastPlayed: '2 hours ago',
    highScore: 92,
    improvement: '+12%',
  },
  {
    id: 2,
    name: 'Science Explorer',
    subject: 'Science',
    lastPlayed: '1 day ago',
    highScore: 78,
    improvement: '+5%',
  },
  {
    id: 3,
    name: 'Grammar Galaxy',
    subject: 'English',
    lastPlayed: '3 days ago',
    highScore: 85,
    improvement: '+8%',
  },
];

const StudentGameAnalytics = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-primary" />
              Your Learning Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="progress">
              <TabsList className="mb-4">
                <TabsTrigger value="progress">Weekly Progress</TabsTrigger>
                <TabsTrigger value="subjects">Subject Breakdown</TabsTrigger>
              </TabsList>
              <TabsContent value="progress">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={progressData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#9b87f5" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="score" 
                        stroke="#9b87f5" 
                        fillOpacity={1} 
                        fill="url(#colorScore)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              <TabsContent value="subjects">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={subjectScores}
                      margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="subject" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Bar dataKey="score" fill="#9b87f5" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Your Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-amber-100">
                    <Award className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium">Math Champion</p>
                    <p className="text-sm text-muted-foreground">Top 10% in class</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-green-100">
                    <BookOpen className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Knowledge Explorer</p>
                    <p className="text-sm text-muted-foreground">Completed 25 games</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-blue-100">
                    <Brain className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Quick Learner</p>
                    <p className="text-sm text-muted-foreground">10-day streak</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Recent Games Performance
          </CardTitle>
          <Select defaultValue="all">
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              <SelectItem value="math">Mathematics</SelectItem>
              <SelectItem value="science">Science</SelectItem>
              <SelectItem value="english">English</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {gameStats.map((game) => (
              <div key={game.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">{game.name}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs bg-muted px-2 py-1 rounded-full">{game.subject}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {game.lastPlayed}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-2xl font-semibold">{game.highScore}</p>
                    <p className="text-xs text-muted-foreground">High Score</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-green-600 flex items-center gap-1">
                      {game.improvement} <ArrowUpRight className="h-3 w-3" />
                    </p>
                    <p className="text-xs text-muted-foreground">Improvement</p>
                  </div>
                  <Button variant="outline" size="sm">Play Again</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentGameAnalytics;
