
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';

// Mock data for the chart
const data = [
  { day: '1', users: 420 },
  { day: '2', users: 460 },
  { day: '3', users: 475 },
  { day: '4', users: 510 },
  { day: '5', users: 495 },
  { day: '6', users: 520 },
  { day: '7', users: 580 },
  { day: '8', users: 540 },
  { day: '9', users: 550 },
  { day: '10', users: 590 },
  { day: '11', users: 620 },
  { day: '12', users: 600 },
  { day: '13', users: 630 },
  { day: '14', users: 650 },
  { day: '15', users: 680 },
  { day: '16', users: 660 },
  { day: '17', users: 640 },
  { day: '18', users: 680 },
  { day: '19', users: 720 },
  { day: '20', users: 700 },
  { day: '21', users: 750 },
  { day: '22', users: 780 },
  { day: '23', users: 790 },
  { day: '24', users: 810 },
  { day: '25', users: 830 },
  { day: '26', users: 850 },
  { day: '27', users: 880 },
  { day: '28', users: 920 },
  { day: '29', users: 900 },
  { day: '30', users: 950 },
];

const UserActivityChart = () => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-slate-200 shadow-md rounded-md">
          <p className="text-sm font-medium">{`Day ${label}`}</p>
          <p className="text-sm text-brand-purple">{`${payload[0].value} active users`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
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
            stroke="#94a3b8" 
            fontSize={12} 
            tickLine={false}
            axisLine={{ stroke: '#e2e8f0' }}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="users"
            stroke="#9b87f5"
            strokeWidth={2}
            dot={{ stroke: '#9b87f5', strokeWidth: 2, r: 4, fill: '#fff' }}
            activeDot={{ r: 6, stroke: '#9b87f5', strokeWidth: 2, fill: '#9b87f5' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserActivityChart;
