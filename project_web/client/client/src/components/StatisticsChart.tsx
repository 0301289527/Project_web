import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface StatisticsData {
  date: string;
  completedTasks: number;
  pomodoroSessions: number;
}

interface StatisticsChartProps {
  data: StatisticsData[];
}

export const StatisticsChart: React.FC<StatisticsChartProps> = ({ data }) => {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="completedTasks"
            name="完成任务数"
            fill="#8884d8"
          />
          <Bar
            dataKey="pomodoroSessions"
            name="番茄钟次数"
            fill="#82ca9d"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}; 