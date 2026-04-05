import { createContext, useEffect, useMemo, useState } from 'react';
import authService from '../services/authService';
import { mockUser } from '../utils/constants';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (authService.isAuthenticated()) {
      setUser(mockUser);
    }
  }, []);

  const login = async (email, password) => {
    await authService.login(email, password);
    setUser({ ...mockUser, email });
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, login, logout, isAuthenticated: Boolean(user) }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
