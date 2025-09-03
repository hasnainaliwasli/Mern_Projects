import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('pf_token'));
  const [user, setUser]   = useState(() => {
    const raw = localStorage.getItem('pf_user');
    return raw ? JSON.parse(raw) : null;
  });
  const isAuthed = !!token;

  const login = async (email, password) => {
    const { data } = await api.post('/api/users/login', { email, password });
    localStorage.setItem('pf_token', data.token);
    localStorage.setItem('pf_user', JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
    return data.user;
  };

  const register = async (name, email, password) => {
    const { data } = await api.post('/api/users/register', { name, email, password });
    localStorage.setItem('pf_token', data.token);
    localStorage.setItem('pf_user', JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem('pf_token');
    localStorage.removeItem('pf_user');
    setToken(null);
    setUser(null);
  };

  const value = useMemo(() => ({ token, user, isAuthed, login, register, logout }), [token, user, isAuthed]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
