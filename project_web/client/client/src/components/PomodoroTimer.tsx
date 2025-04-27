import React, { useState, useEffect, useCallback } from 'react';
import { Button } from './Button';

interface PomodoroTimerProps {
  initialMinutes?: number;
  onComplete?: () => void;
}

export const PomodoroTimer: React.FC<PomodoroTimerProps> = ({
  initialMinutes = 25,
  onComplete,
}) => {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  const resetTimer = useCallback(() => {
    setMinutes(initialMinutes);
    setSeconds(0);
    setIsActive(false);
  }, [initialMinutes]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
            setIsActive(false);
            if (!isBreak) {
              setIsBreak(true);
              setMinutes(5); // 5分钟休息时间
              setSeconds(0);
              setIsActive(true);
            } else {
              setIsBreak(false);
              resetTimer();
              onComplete?.();
            }
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, minutes, seconds, isBreak, resetTimer, onComplete]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const formatTime = (time: number) => {
    return time.toString().padStart(2, '0');
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="text-4xl font-bold">
        {formatTime(minutes)}:{formatTime(seconds)}
      </div>
      <div className="text-lg text-gray-600">
        {isBreak ? '休息时间' : '工作时间'}
      </div>
      <div className="flex space-x-4">
        <Button
          variant={isActive ? 'danger' : 'primary'}
          onClick={toggleTimer}
        >
          {isActive ? '暂停' : '开始'}
        </Button>
        <Button
          variant="secondary"
          onClick={resetTimer}
        >
          重置
        </Button>
      </div>
    </div>
  );
}; 