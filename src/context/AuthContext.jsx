import { createContext, useState, useEffect, useCallback } from 'react';
import { loginUser, registerUser, getCurrentUser } from '../api/auth';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }
    getCurrentUser()
      .then(setUser)
      .catch(() => localStorage.removeItem('token'))
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (email, password) => {
    const data = await loginUser(email, password);
    localStorage.setItem('token', data.access_token);
    const me = await getCurrentUser();
    setUser(me);
  }, []);

  const register = useCallback(async (email, password) => {
    await registerUser(email, password);
    await login(email, password);
  }, [login]);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
