
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

type AnalyticsData = {
  student: string;
  score: number;
  completionTime: number;
  attempts: number;
};

const GameAnalyticsChart = ({ data, chartType }: { data: AnalyticsData[], chartType: 'scores' | 'time' | 'attempts' }) => {
  // Transform data for chart display based on the chart type
  const chartData = data.map(item => {
    if (chartType === 'scores') {
      return {
        name: item.student,
        Score: item.score
      };
    } else if (chartType === 'time') {
      return {
        name: item.student,
        'Time (minutes)': item.completionTime / 60 // Convert seconds to minutes
      };
    } else {
      return {
        name: item.student,
        Attempts: item.attempts
      };
    }
  });

  // Determine chart color based on type
  const getBarColor = () => {
    switch (chartType) {
      case 'scores':
        return '#8884d8';
      case 'time':
        return '#82ca9d';
      case 'attempts':
        return '#ffc658';
      default:
        return '#8884d8';
    }
  };

  // Get the data key based on chart type
  const getDataKey = () => {
    switch (chartType) {
      case 'scores':
        return 'Score';
      case 'time':
        return 'Time (minutes)';
      case 'attempts':
        return 'Attempts';
      default:
        return '';
    }
  };

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white', 
              border: '1px solid #e2e8f0',
              borderRadius: '4px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
            }} 
          />
          <Legend />
          <Bar 
            dataKey={getDataKey()} 
            fill={getBarColor()} 
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GameAnalyticsChart;
