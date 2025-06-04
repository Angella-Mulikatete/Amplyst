"use client";

import type { User, UserRole } from '../types';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  currentUser: User | null;
  currentRole: UserRole | null;
  login: (email: string, role: UserRole) => void;
  signup: (email: string, name: string, role: UserRole) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentRole, setCurrentRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading user from storage
    const storedUser = localStorage.getItem('currentUser');
    const storedRole = localStorage.getItem('currentRole') as UserRole;
    if (storedUser && storedRole) {
      setCurrentUser(JSON.parse(storedUser));
      setCurrentRole(storedRole);
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, role: UserRole) => {
    const user: User = { id: Date.now().toString(), email, role, name: email.split('@')[0] };
    setCurrentUser(user);
    setCurrentRole(role);
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('currentRole', role as string);
  };

  const signup = (email: string, name: string, role: UserRole) => {
    // In a real app, this would involve an API call
    const user: User = { id: Date.now().toString(), email, name, role };
    setCurrentUser(user);
    setCurrentRole(role);
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('currentRole', role as string);
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentRole(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentRole');
  };

  const switchRole = (role: UserRole) => {
    if (currentUser && role) {
      const updatedUser = { ...currentUser, role };
      setCurrentUser(updatedUser);
      setCurrentRole(role);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      localStorage.setItem('currentRole', role);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, currentRole, login, signup, logout, switchRole, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
