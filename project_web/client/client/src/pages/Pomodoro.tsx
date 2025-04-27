import React, { useState, useEffect } from 'react';

const Pomodoro: React.FC = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [sessionType, setSessionType] = useState<'work' | 'break'>('work');

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Time's up, switch session type
            setIsActive(false);
            if (sessionType === 'work') {
              setSessionType('break');
              setMinutes(5);
            } else {
              setSessionType('work');
              setMinutes(25);
            }
            // TODO: Play notification sound
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, sessionType]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    if (sessionType === 'work') {
      setMinutes(25);
    } else {
      setMinutes(5);
    }
    setSeconds(0);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
            {sessionType === 'work' ? 'Work Time' : 'Break Time'}
          </h2>
          <div className="text-6xl font-bold text-indigo-600 mb-8">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          <div className="space-x-4">
            <button
              onClick={toggleTimer}
              className={`px-6 py-3 rounded-md text-white font-medium ${
                isActive
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {isActive ? 'Pause' : 'Start'}
            </button>
            <button
              onClick={resetTimer}
              className="px-6 py-3 rounded-md text-white font-medium bg-gray-600 hover:bg-gray-700"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="mt-8">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Pomodoro Technique</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Work Time: 25 minutes</li>
              <li>• Break Time: 5 minutes</li>
              <li>• Focus on work, avoid distractions</li>
              <li>• Take relaxing activities during breaks</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pomodoro; 