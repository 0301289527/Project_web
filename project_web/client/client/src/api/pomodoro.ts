import api from './axios';
import { PomodoroSession, PomodoroStats, CreatePomodoroData } from '../types/pomodoro';

export const pomodoroApi = {
  getAll: async (): Promise<PomodoroSession[]> => {
    const response = await api.get('/pomodoro');
    return response.data;
  },

  getById: async (id: string): Promise<PomodoroSession> => {
    const response = await api.get(`/pomodoro/${id}`);
    return response.data;
  },

  create: async (data: CreatePomodoroData): Promise<PomodoroSession> => {
    const response = await api.post('/pomodoro', data);
    return response.data;
  },

  update: async (id: string, data: Partial<PomodoroSession>): Promise<PomodoroSession> => {
    const response = await api.put(`/pomodoro/${id}`, data);
    return response.data;
  },

  complete: async (id: string): Promise<PomodoroSession> => {
    const response = await api.post(`/pomodoro/${id}/complete`);
    return response.data;
  },

  getStatistics: async (): Promise<PomodoroStats> => {
    const response = await api.get('/pomodoro/statistics');
    return response.data;
  },
}; 