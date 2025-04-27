import { useState, useEffect, useRef } from 'react';
import { pomodoroApi } from '../api/pomodoro';
import { PomodoroSession, PomodoroStats } from '../types/pomodoro';

interface PomodoroState {
  session: PomodoroSession | null;
  stats: PomodoroStats | null;
  loading: boolean;
  error: string | null;
}

export const usePomodoro = () => {
  const [state, setState] = useState<PomodoroState>({
    session: null,
    stats: null,
    loading: false,
    error: null,
  });
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startSession = async (taskId: string) => {
    setState({ ...state, loading: true, error: null });
    try {
      const session = await pomodoroApi.startSession(taskId);
      setState({
        ...state,
        session,
        loading: false,
        error: null,
      });
    } catch (error: any) {
      setState({
        ...state,
        loading: false,
        error: error.response?.data?.message || 'Failed to start session',
      });
    }
  };

  const pauseSession = async () => {
    if (!state.session) return;
    setState({ ...state, loading: true, error: null });
    try {
      const session = await pomodoroApi.pauseSession(state.session.id);
      setState({
        ...state,
        session,
        loading: false,
        error: null,
      });
    } catch (error: any) {
      setState({
        ...state,
        loading: false,
        error: error.response?.data?.message || 'Failed to pause session',
      });
    }
  };

  const completeSession = async () => {
    if (!state.session) return;
    setState({ ...state, loading: true, error: null });
    try {
      const session = await pomodoroApi.completeSession(state.session.id);
      setState({
        ...state,
        session: null,
        loading: false,
        error: null,
      });
      fetchStats();
    } catch (error: any) {
      setState({
        ...state,
        loading: false,
        error: error.response?.data?.message || 'Failed to complete session',
      });
    }
  };

  const fetchStats = async () => {
    setState({ ...state, loading: true, error: null });
    try {
      const stats = await pomodoroApi.getStats();
      setState({
        ...state,
        stats,
        loading: false,
        error: null,
      });
    } catch (error: any) {
      setState({
        ...state,
        loading: false,
        error: error.response?.data?.message || 'Failed to fetch stats',
      });
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    if (state.session && state.session.status === 'active') {
      timerRef.current = setInterval(() => {
        setState(prev => ({
          ...prev,
          session: prev.session ? {
            ...prev.session,
            remainingTime: Math.max(0, prev.session.remainingTime - 1),
          } : null,
        }));
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [state.session?.status]);

  return {
    session: state.session,
    stats: state.stats,
    loading: state.loading,
    error: state.error,
    startSession,
    pauseSession,
    completeSession,
    fetchStats,
  };
}; 