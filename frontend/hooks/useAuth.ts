// frontend/hooks/useAuth.tsx
import { useContext } from 'react';
import { AuthContext, AuthContextType } from '../context/AuthContext'; // Import from AuthContext file

// Custom hook to consume the AuthContext
export const useAuth = (): AuthContextType => { // Specify return type
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};