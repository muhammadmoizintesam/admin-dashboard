'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  username: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // true until localStorage is checked
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // Check authentication status on mount
    const loggedIn = localStorage.getItem('isLoggedIn');
    const savedUsername = localStorage.getItem('username');

    if (loggedIn === 'true' && savedUsername) {
      setIsLoggedIn(true);
      setUsername(savedUsername);
    }
    setIsLoading(false); // Done checking — now safe to redirect
  }, []);

  // Listen for storage changes to sync across tabs/components
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'isLoggedIn') {
        const loggedIn = e.newValue;
        const savedUsername = localStorage.getItem('username');

        if (loggedIn === 'true' && savedUsername) {
          setIsLoggedIn(true);
          setUsername(savedUsername);
        } else {
          setIsLoggedIn(false);
          setUsername(null);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simulate authentication (in real app, this would be an API call)
    // For demo purposes, accept any non-empty username and password
    if (username.trim() && password.trim()) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);
      setIsLoggedIn(true);
      setUsername(username);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
