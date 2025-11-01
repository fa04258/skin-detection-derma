
import React, { useState } from 'react';
// Fix: Corrected the import path for useAuth from hooks/useAuth.ts
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import LoginComponent from './components/Login';
import RegisterComponent from './components/Register';
import SkinDetector from './components/SkinDetector';
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  );
};

const MainContent: React.FC = () => {
  const { user } = useAuth();
  const [isRegistering, setIsRegistering] = useState<boolean>(false);

  const toggleAuthMode = () => {
    setIsRegistering(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans">
      {user ? (
        <>
          <Header />
          <main className="p-4 md:p-8">
            <SkinDetector />
          </main>
        </>
      ) : (
        <div className="flex items-center justify-center min-h-screen p-4">
          {isRegistering ? (
            <RegisterComponent onToggleAuthMode={toggleAuthMode} />
          ) : (
            <LoginComponent onToggleAuthMode={toggleAuthMode} />
          )}
        </div>
      )}
    </div>
  );
};

export default App;