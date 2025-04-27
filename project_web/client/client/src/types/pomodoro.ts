export interface PomodoroSession {
  id: string;
  taskId: string;
  status: 'active' | 'paused' | 'completed';
  remainingTime: number;
  createdAt: string;
  updatedAt: string;
}

export interface PomodoroStats {
  totalSessions: number;
  completedSessions: number;
  totalFocusTime: number;
  averageFocusTime: number;
  dailyStats: {
    date: string;
    sessions: number;
    focusTime: number;
  }[];
}

export interface CreatePomodoroData {
  taskId: string;
  duration: number;
} 