
import { useState } from 'react';
import { 
  Bar, 
  BarChart, 
  CartesianGrid, 
  Legend, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Filter, Download, Users, User, BookOpen } from 'lucide-react';

// Mock student progress data
const studentScoreData = [
  { name: 'Priya S.', math: 85, science: 92, english: 78, social: 88, cs: 95 },
  { name: 'Rahul V.', math: 92, science: 88, english: 82, social: 75, cs: 90 },
  { name: 'Ananya P.', math: 78, science: 85, english: 90, social: 82, cs: 75 },
  { name: 'Vikram S.', math: 88, science: 76, english: 85, social: 90, cs: 82 },
  { name: 'Neha G.', math: 95, science: 90, english: 80, social: 78, cs: 88 },
  { name: 'Arjun M.', math: 80, science: 85, english: 75, social: 68, cs: 92 },
  { name: 'Kavita T.', math: 75, science: 82, english: 90, social: 85, cs: 78 },
  { name: 'Suresh K.', math: 82, science: 88, english: 72, social: 78, cs: 85 },
];

// Game completion data
const gameCompletionData = [
  { name: 'Math Quest', completed: 32, inProgress: 8, notStarted: 4 },
  { name: 'Science Explorer', completed: 28, inProgress: 12, notStarted: 4 },
  { name: 'Grammar Galaxy', completed: 35, inProgress: 5, notStarted: 4 },
  { name: 'History Adventure', completed: 25, inProgress: 10, notStarted: 9 },
  { name: 'Coding Challenge', completed: 22, inProgress: 15, notStarted: 7 },
];

// Subject colors for the chart
const subjectColors = {
  math: '#9b87f5',
  science: '#f587b8',
  english: '#87f5e9',
  social: '#f5d787',
  cs: '#87a9f5'
};

const gameStatusColors = {
  completed: '#4ade80',
  inProgress: '#facc15',
  notStarted: '#94a3b8'
};

const StudentProgressChart = () => {
  const [activeTab, setActiveTab] = useState('scores');
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-slate-200 shadow-md rounded-md">
          <p className="text-sm font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}%
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const GameCompletionTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-slate-200 shadow-md rounded-md">
          <p className="text-sm font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value} students
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle>Student Progress Analytics</CardTitle>
            <CardDescription>
              View student performance across games and subjects
            </CardDescription>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="scores" onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="scores">
              <User className="h-4 w-4 mr-2" />
              Student Scores
            </TabsTrigger>
            <TabsTrigger value="games">
              <BookOpen className="h-4 w-4 mr-2" />
              Game Completion
            </TabsTrigger>
            <TabsTrigger value="subjects">
              <Users className="h-4 w-4 mr-2" />
              Subject Performance
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="scores" className="mt-0">
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={studentScoreData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
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
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="math" name="Mathematics" fill={subjectColors.math} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="science" name="Science" fill={subjectColors.science} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="english" name="English" fill={subjectColors.english} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="social" name="Social Studies" fill={subjectColors.social} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="cs" name="Computer Science" fill={subjectColors.cs} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="games" className="mt-0">
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={gameCompletionData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
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
                  <Tooltip content={<GameCompletionTooltip />} />
                  <Legend />
                  <Bar 
                    stackId="a" 
                    dataKey="completed" 
                    name="Completed" 
                    fill={gameStatusColors.completed} 
                    radius={[0, 0, 0, 0]} 
                  />
                  <Bar 
                    stackId="a" 
                    dataKey="inProgress" 
                    name="In Progress" 
                    fill={gameStatusColors.inProgress} 
                    radius={[0, 0, 0, 0]} 
                  />
                  <Bar 
                    stackId="a" 
                    dataKey="notStarted" 
                    name="Not Started" 
                    fill={gameStatusColors.notStarted} 
                    radius={[0, 0, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="subjects" className="mt-0">
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { subject: 'Mathematics', avgScore: 85, completionRate: 78 },
                    { subject: 'Science', avgScore: 82, completionRate: 75 },
                    { subject: 'English', avgScore: 80, completionRate: 82 },
                    { subject: 'Social Studies', avgScore: 75, completionRate: 68 },
                    { subject: 'Computer Science', avgScore: 88, completionRate: 72 },
                  ]}
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
                  <Bar dataKey="avgScore" name="Average Score (%)" fill="#9b87f5" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="completionRate" name="Completion Rate (%)" fill="#f587b8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default StudentProgressChart;
