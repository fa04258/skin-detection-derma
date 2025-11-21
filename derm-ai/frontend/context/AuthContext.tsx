// frontend/context/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';

// Define your API base URL
// IMPORTANT: Ensure this matches your backend server URL
const API_URL = 'http://localhost:5000/api';

// Define the shape of the User object returned by your backend
export interface User {
  id: string;
  username: string;
  email: string;
}

// Define the shape of the AuthContext's value
export interface AuthContextType {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  // CHANGE 1: Register no longer returns a boolean, it resolves on success or throws an error
  register: (email: string, password: string, username: string) => Promise<void>; 
  logout: () => void;
}

// Create the AuthContext
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component that manages the authentication state
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        try {
          const response = await axios.get(`${API_URL}/users/profile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Failed to fetch user profile with existing token:', error);
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
          setIsAuthenticated(false);
        }
      }
      setLoading(false);
    };
    initializeAuth();
  }, [token]);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/users/login`, { email, password });
      const { token: newToken, user: userData } = response.data;

      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(userData);
      setIsAuthenticated(true);
      return true;
    } catch (err: any) {
      console.error('Login error:', err.response?.data?.msg || err.message);
      // CHANGE 2: Throw specific login error message
      throw new Error(err.response?.data?.msg || 'Login failed due to an unexpected error.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Handles user registration
  // CHANGE 3: Update return type to Promise<void>
  const register = useCallback(async (email: string, password: string, username: string): Promise<void> => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/users/register`, { username, email, password });
      // If registration is successful, do nothing (resolve the promise)
      // The RegisterComponent will handle showing a success message and redirecting.
      
      // CHANGE 4: No longer return true, just let the promise resolve
      return; 
    } catch (err: any) {
      console.error('Registration error:', err.response?.data?.msg || err.message);
      // CHANGE 5: Throw the specific error message from the backend!
      throw new Error(err.response?.data?.msg || 'Registration failed due to an unexpected error.'); 
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const value = {
    token,
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};