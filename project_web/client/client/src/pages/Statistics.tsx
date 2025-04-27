import React from 'react';

const Statistics: React.FC = () => {
  // Sample data
  const weeklyData = {
    completedTasks: 15,
    totalPomodoros: 28,
    totalWorkTime: 700, // minutes
    dailyStats: [
      { day: 'Monday', pomodoros: 5, tasks: 3 },
      { day: 'Tuesday', pomodoros: 4, tasks: 2 },
      { day: 'Wednesday', pomodoros: 6, tasks: 4 },
      { day: 'Thursday', pomodoros: 3, tasks: 2 },
      { day: 'Friday', pomodoros: 4, tasks: 2 },
      { day: 'Saturday', pomodoros: 3, tasks: 1 },
      { day: 'Sunday', pomodoros: 3, tasks: 1 },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Statistics</h1>

      {/* Weekly Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Completed Tasks</h3>
          <p className="text-3xl font-bold text-indigo-600">
            {weeklyData.completedTasks}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Total Pomodoros</h3>
          <p className="text-3xl font-bold text-indigo-600">
            {weeklyData.totalPomodoros}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Total Focus Time</h3>
          <p className="text-3xl font-bold text-indigo-600">
            {Math.floor(weeklyData.totalWorkTime / 60)} hours{' '}
            {weeklyData.totalWorkTime % 60} minutes
          </p>
        </div>
      </div>

      {/* Daily Statistics */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Daily Statistics</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Day
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pomodoros
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Completed Tasks
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {weeklyData.dailyStats.map((day) => (
                <tr key={day.day}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {day.day}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {day.pomodoros}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {day.tasks}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Statistics; 