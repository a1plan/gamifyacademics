
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowUp, Clock, Award, Star, BarChart2, TrendingUp } from 'lucide-react';

// Mock student performance data
const subjectPerformance = [
  { subject: 'Mathematics', score: 85, change: '+5%', trend: 'up' },
  { subject: 'Science', score: 78, change: '+3%', trend: 'up' },
  { subject: 'English', score: 92, change: '+7%', trend: 'up' },
  { subject: 'Social Studies', score: 70, change: '-2%', trend: 'down' },
  { subject: 'Computer Science', score: 88, change: '+4%', trend: 'up' },
];

// Progress over time
const progressOverTime = [
  { date: 'Week 1', score: 65 },
  { date: 'Week 2', score: 68 },
  { date: 'Week 3', score: 72 },
  { date: 'Week 4', score: 75 },
  { date: 'Week 5', score: 70 },
  { date: 'Week 6', score: 78 },
  { date: 'Week 7', score: 82 },
  { date: 'Week 8', score: 85 },
];

// Time spent by subject (minutes)
const timeSpentBySubject = [
  { subject: 'Math', time: 320 },
  { subject: 'Science', time: 280 },
  { subject: 'English', time: 210 },
  { subject: 'Social', time: 180 },
  { subject: 'CS', time: 150 },
];

const StudentGameAnalytics = () => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-slate-200 shadow-md rounded-md">
          <p className="text-sm font-medium">{label}</p>
          <p className="text-sm text-brand-purple">
            Score: {payload[0].value}%
          </p>
        </div>
      );
    }
    return null;
  };

  const TimeTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-slate-200 shadow-md rounded-md">
          <p className="text-sm font-medium">{label}</p>
          <p className="text-sm text-brand-purple">
            Time: {payload[0].value} mins
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>My Performance Analytics</CardTitle>
        <CardDescription>
          Track your progress and performance across subjects
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="mb-6 bg-slate-100">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white">
              <TrendingUp className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="progress" className="data-[state=active]:bg-white">
              <BarChart2 className="h-4 w-4 mr-2" />
              Progress
            </TabsTrigger>
            <TabsTrigger value="time" className="data-[state=active]:bg-white">
              <Clock className="h-4 w-4 mr-2" />
              Time Spent
            </TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-50 p-4 rounded-lg flex flex-col items-center justify-center text-center">
                  <Star className="h-8 w-8 text-amber-500 mb-2" />
                  <p className="text-2xl font-bold">82%</p>
                  <p className="text-xs text-slate-500">Average Score</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg flex flex-col items-center justify-center text-center">
                  <Award className="h-8 w-8 text-brand-purple mb-2" />
                  <p className="text-2xl font-bold">18</p>
                  <p className="text-xs text-slate-500">Games Completed</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg flex flex-col items-center justify-center text-center">
                  <Clock className="h-8 w-8 text-emerald-500 mb-2" />
                  <p className="text-2xl font-bold">24h</p>
                  <p className="text-xs text-slate-500">Total Time</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-3">Performance by Subject</h4>
                <div className="space-y-4">
                  {subjectPerformance.map((subject, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-2 h-12 rounded-full mr-3 ${
                          subject.score >= 90 ? 'bg-green-500' :
                          subject.score >= 80 ? 'bg-brand-purple' :
                          subject.score >= 70 ? 'bg-amber-500' :
                          'bg-red-500'
                        }`} />
                        <div>
                          <p className="font-medium">{subject.subject}</p>
                          <Badge 
                            variant="outline" 
                            className={`text-xs mt-1 ${
                              subject.trend === 'up' 
                                ? 'bg-green-50 text-green-700 border-green-200' 
                                : 'bg-red-50 text-red-700 border-red-200'
                            }`}
                          >
                            {subject.trend === 'up' ? (
                              <ArrowUp className="h-3 w-3 mr-1" />
                            ) : (
                              <ArrowUp className="h-3 w-3 mr-1 rotate-180" />
                            )}
                            {subject.change}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-2xl font-bold">{subject.score}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Progress Tab */}
          <TabsContent value="progress">
            <div className="space-y-6">
              <div className="h-80">
                <h4 className="text-sm font-medium mb-3">Score Progress Over Time</h4>
                <ResponsiveContainer width="100%" height="100%">
                  