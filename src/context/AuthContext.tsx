import React, { createContext, useContext, useState, useCallback } from 'react';

export interface User {
  name: string;
  email: string;
  avatar: string;
  givenName: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  loginWithGoogle: () => void;
  loginAsGuest: (name: string, email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('graopremium_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const loginWithGoogle = useCallback(() => {
    // Simulating Google OAuth sign-in
    const mockUser: User = {
      name: 'Usuário Google',
      email: 'usuario@gmail.com',
      avatar: '👤',
      givenName: 'Usuário',
    };
    setUser(mockUser);
    localStorage.setItem('graopremium_user', JSON.stringify(mockUser));
    setIsLoginModalOpen(false);
  }, []);

  const loginAsGuest = useCallback((name: string, email: string) => {
    const guestUser: User = {
      name,
      email,
      avatar: name.charAt(0).toUpperCase(),
      givenName: name.split(' ')[0],
    };
    setUser(guestUser);
    localStorage.setItem('graopremium_user', JSON.stringify(guestUser));
    setIsLoginModalOpen(false);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('graopremium_user');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoginModalOpen,
        setIsLoginModalOpen,
        loginWithGoogle,
        loginAsGuest,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
