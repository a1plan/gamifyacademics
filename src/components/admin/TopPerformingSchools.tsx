
import { School } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const topSchools = [
  { 
    name: "Delhi Public School", 
    location: "New Delhi", 
    activeStudents: 1245, 
    avgScore: 87, 
    engagement: 92 
  },
  { 
    name: "St. Xavier's School", 
    location: "Mumbai", 
    activeStudents: 980, 
    avgScore: 85, 
    engagement: 89 
  },
  { 
    name: "Kendriya Vidyalaya", 
    location: "Bangalore", 
    activeStudents: 1120, 
    avgScore: 83, 
    engagement: 87 
  },
  { 
    name: "Army Public School", 
    location: "Pune", 
    activeStudents: 780, 
    avgScore: 81, 
    engagement: 86 
  },
  { 
    name: "DAV Model School", 
    location: "Chandigarh", 
    activeStudents: 850, 
    avgScore: 79, 
    engagement: 84 
  },
];

const TopPerformingSchools = () => {
  return (
    <div className="space-y-5">
      {topSchools.map((school, index) => (
        <div key={index} className="space-y-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <div className="bg-brand-purple/10 rounded-full p-2 mr-3">
                <School className="h-5 w-5 text-brand-purple" />
              </div>
              <div>
                <h4 className="font-medium text-sm">{school.name}</h4>
                <p className="text-xs text-slate-500">{school.location}</p>
              </div>
            </div>
            <Badge className="text-xs bg-brand-purple">
              {school.activeStudents} students
            </Badge>
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Avg. Score</span>
              <span className="font-medium">{school.avgScore}%</span>
            </div>
            <Progress value={school.avgScore} className="h-1.5" />
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Engagement</span>
              <span className="font-medium">{school.engagement}%</span>
            </div>
            <Progress value={school.engagement} className="h-1.5" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopPerformingSchools;
