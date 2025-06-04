// global-provider.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { account } from './appwrite'; 
import { Models } from 'appwrite';

type User = Models.User<Models.Preferences> | null;

interface AuthContextType {
  user: User;
  loading: boolean;
  login: (userData: User) => void;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const refreshUser = async () => {
    try {
      const userData = await account.get();
      setUser(userData);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await account.deleteSession('current');
    setUser(null);
  };

  const login = (userData: User) => {
    setUser(userData);
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useGlobalAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useGlobalAuth must be used within a GlobalProvider');
  }
  return context;
};
