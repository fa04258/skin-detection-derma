import React, { createContext, useState, ReactNode } from 'react';
import { User, AuthContextType } from '../types';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// StoredUser will include password for our mock DB in localStorage
interface StoredUser {
    email: string;
    password: string;
}

const getUsersFromStorage = (): StoredUser[] => {
    try {
        const usersJson = localStorage.getItem('derm_ai_users');
        return usersJson ? JSON.parse(usersJson) : [];
    } catch (e) {
        console.error("Failed to parse users from localStorage", e);
        return [];
    }
}

const setUsersInStorage = (users: StoredUser[]) => {
    localStorage.setItem('derm_ai_users', JSON.stringify(users));
}


export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const register = (email: string, password: string): boolean => {
      const users = getUsersFromStorage();
      const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (existingUser) {
          console.error("User with this email already exists.");
          return false; // Registration failed: user exists
      }

      const newUser = { email, password };
      setUsersInStorage([...users, newUser]);
      
      return true; // Registration successful, user will be redirected to login.
  };

  const login = (email: string, password: string): boolean => {
    const users = getUsersFromStorage();
    const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    
    if (foundUser) {
        const mockUser: User = { id: Date.now().toString(), email: foundUser.email };
        setUser(mockUser);
        return true; // Login successful
    }
    
    return false; // Login failed: credentials do not match
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};