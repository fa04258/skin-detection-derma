// frontend/context/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';

// Define your API base URL
// IMPORTANT: Ensure this matches your backend server URL
const API_URL = 'http://localhost:5000/api';

// Define the shape of the User object returned by your backend
export interface User { // Export this interface as it might be used elsewhere
  id: string;
  username: string;
  email: string;
}

// Define the shape of the AuthContext's value
export interface AuthContextType { // Export this interface too
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean; // Indicates if an authentication operation is in progress
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, username: string) => Promise<boolean>;
  logout: () => void;
}

// Create the AuthContext
export const AuthContext = createContext<AuthContextType | undefined>(undefined); // Export AuthContext

// AuthProvider component that manages the authentication state
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);
  const [loading, setLoading] = useState<boolean>(true); // Initial loading state for auth check

  // Effect to re-authenticate and fetch user details on initial load or token change
  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        try {
          // Make a request to the protected profile endpoint to validate token
          // and fetch the complete user object from the backend.
          const response = await axios.get(`${API_URL}/users/profile`, {
            headers: {
              Authorization: `Bearer ${token}`, // Send the JWT with the request
            },
          });
          setUser(response.data); // Set the full user object from the backend
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Failed to fetch user profile with existing token:', error);
          // If the token is invalid or expired, clear it and reset auth state
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
          setIsAuthenticated(false);
        }
      }
      setLoading(false); // Authentication initialization is complete
    };
    initializeAuth();
  }, [token]); // Re-run this effect if the token changes

  // Handles user login
  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/users/login`, { email, password });
      const { token: newToken, user: userData } = response.data; // Backend sends new token and user object

      localStorage.setItem('token', newToken); // Store the new token
      setToken(newToken);
      setUser(userData); // Set the full user object in context
      setIsAuthenticated(true);
      return true; // Login successful
    } catch (err: any) {
      console.error('Login error:', err.response?.data || err.message);
      // You can add more specific error handling here if needed
      return false; // Login failed
    } finally {
      setLoading(false); // Always reset loading state
    }
  }, []);

  // Handles user registration
  const register = useCallback(async (email: string, password: string, username: string): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/users/register`, { username, email, password });
      // For registration, we typically just get a success message and token (optional auto-login)
      // If your backend auto-logs in after registration, you'd use response.data.token and response.data.user here
      // const { token: newToken, user: userData } = response.data;

      // In this example, we're not auto-logging in after register, just returning success.
      // The frontend RegisterComponent will then redirect to Login.
      return true; // Registration successful
    } catch (err: any) {
      console.error('Registration error:', err.response?.data?.msg || err.message);
      // You can add more specific error handling here
      return false; // Registration failed
    } finally {
      setLoading(false); // Always reset loading state
    }
  }, []);

  // Handles user logout
  const logout = useCallback(() => {
    localStorage.removeItem('token'); // Remove token from local storage
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  // The value provided to components wrapped by AuthProvider
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