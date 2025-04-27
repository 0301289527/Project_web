import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/auth';

interface AuthState {
  user: {
    id: string;
    email: string;
  } | null;
  loading: boolean;
  error: string | null;
}

export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: false,
    error: null,
  });
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    setState({ ...state, loading: true, error: null });
    try {
      const response = await authApi.login({ email, password });
      localStorage.setItem('token', response.token);
      setState({
        user: response.user,
        loading: false,
        error: null,
      });
      navigate('/tasks');
    } catch (error: any) {
      setState({
        ...state,
        loading: false,
        error: error.response?.data?.message || 'Login failed',
      });
    }
  };

  const register = async (email: string, password: string) => {
    setState({ ...state, loading: true, error: null });
    try {
      const response = await authApi.register({ email, password });
      localStorage.setItem('token', response.token);
      setState({
        user: response.user,
        loading: false,
        error: null,
      });
      navigate('/tasks');
    } catch (error: any) {
      setState({
        ...state,
        loading: false,
        error: error.response?.data?.message || 'Registration failed',
      });
    }
  };

  const logout = () => {
    authApi.logout();
    setState({
      user: null,
      loading: false,
      error: null,
    });
    navigate('/login');
  };

  const checkAuth = async () => {
    setState({ ...state, loading: true });
    try {
      const user = await authApi.getCurrentUser();
      setState({
        user,
        loading: false,
        error: null,
      });
    } catch (error) {
      setState({
        user: null,
        loading: false,
        error: null,
      });
    }
  };

  return {
    user: state.user,
    loading: state.loading,
    error: state.error,
    login,
    register,
    logout,
    checkAuth,
  };
}; 