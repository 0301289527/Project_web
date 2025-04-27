import { useState, useEffect } from 'react';
import { tasksApi } from '../api/tasks';
import { Task } from '../types/task';

interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

export const useTasks = () => {
  const [state, setState] = useState<TasksState>({
    tasks: [],
    loading: false,
    error: null,
  });

  const fetchTasks = async () => {
    setState({ ...state, loading: true, error: null });
    try {
      const tasks = await tasksApi.getTasks();
      setState({
        tasks,
        loading: false,
        error: null,
      });
    } catch (error: any) {
      setState({
        ...state,
        loading: false,
        error: error.response?.data?.message || 'Failed to fetch tasks',
      });
    }
  };

  const createTask = async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    setState({ ...state, loading: true, error: null });
    try {
      const newTask = await tasksApi.createTask(taskData);
      setState({
        tasks: [...state.tasks, newTask],
        loading: false,
        error: null,
      });
    } catch (error: any) {
      setState({
        ...state,
        loading: false,
        error: error.response?.data?.message || 'Failed to create task',
      });
    }
  };

  const updateTask = async (id: string, taskData: Partial<Task>) => {
    setState({ ...state, loading: true, error: null });
    try {
      const updatedTask = await tasksApi.updateTask(id, taskData);
      setState({
        tasks: state.tasks.map(task => 
          task.id === id ? updatedTask : task
        ),
        loading: false,
        error: null,
      });
    } catch (error: any) {
      setState({
        ...state,
        loading: false,
        error: error.response?.data?.message || 'Failed to update task',
      });
    }
  };

  const deleteTask = async (id: string) => {
    setState({ ...state, loading: true, error: null });
    try {
      await tasksApi.deleteTask(id);
      setState({
        tasks: state.tasks.filter(task => task.id !== id),
        loading: false,
        error: null,
      });
    } catch (error: any) {
      setState({
        ...state,
        loading: false,
        error: error.response?.data?.message || 'Failed to delete task',
      });
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks: state.tasks,
    loading: state.loading,
    error: state.error,
    createTask,
    updateTask,
    deleteTask,
    fetchTasks,
  };
}; 