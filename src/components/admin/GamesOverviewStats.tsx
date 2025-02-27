
import { Card, CardContent } from "@/components/ui/card";
import { 
  Gamepad2, 
  BookOpen, 
  Users, 
  School, 
  TrendingUp, 
  Clock 
} from 'lucide-react';

const statsItems = [
  {
    title: "Total Games",
    value: "124",
    change: "+12% from last month",
    trend: "up",
    icon: <Gamepad2 className="h-5 w-5 text-indigo-600" />,
    bgColor: "bg-indigo-50",
  },
  {
    title: "Active Users",
    value: "8,642",
    change: "+18% from last month",
    trend: "up",
    icon: <Users className="h-5 w-5 text-emerald-600" />,
    bgColor: "bg-emerald-50",
  },
  {
    title: "Schools",
    value: "87",
    change: "+5 schools this month",
    trend: "up",
    icon: <School className="h-5 w-5 text-blue-600" />,
    bgColor: "bg-blue-50",
  },
  {
    title: "Subjects Covered",
    value: "18",
    change: "Across all grades",
    trend: "neutral",
    icon: <BookOpen className="h-5 w-5 text-amber-600" />,
    bgColor: "bg-amber-50",
  },
  {
    title: "Total Gameplay Hours",
    value: "42,380",
    change: "+22% from last month",
    trend: "up",
    icon: <Clock className="h-5 w-5 text-rose-600" />,
    bgColor: "bg-rose-50",
  },
  {
    title: "Avg. Completion Rate",
    value: "76%",
    change: "+4% from last month",
    trend: "up",
    icon: <TrendingUp className="h-5 w-5 text-purple-600" />,
    bgColor: "bg-purple-50",
  },
];

const GamesOverviewStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {statsItems.map((item, index) => (
        <Card key={index}>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">{item.title}</p>
                <p className="text-2xl font-bold">{item.value}</p>
                <p className="text-xs mt-1 flex items-center">
                  {item.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 text-emerald-600 mr-1" />
                  ) : item.trend === "down" ? (
                    <TrendingUp className="h-3 w-3 text-red-600 mr-1 rotate-180" />
                  ) : null}
                  <span className={item.trend === "up" ? "text-emerald-600" : item.trend === "down" ? "text-red-600" : "text-slate-500"}>
                    {item.change}
                  </span>
                </p>
              </div>
              <div className={`p-3 rounded-full ${item.bgColor}`}>
                {item.icon}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default GamesOverviewStats;
