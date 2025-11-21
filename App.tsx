import React, { useState } from 'react';
// Fix: Corrected the import path for AuthProvider to include the 'frontend' directory.
import { AuthProvider } from './frontend/context/AuthContext'; // THIS LINE IS MODIFIED
import { useAuth } from './frontend/hooks/useAuth'; // Assuming useAuth is also in frontend/hooks
import LoginComponent from './frontend/components/Login'; // Assuming components are also in frontend/components
import RegisterComponent from './frontend/components/Register'; // Assuming components are also in frontend/components
import SkinDetector from './frontend/components/SkinDetector'; // Assuming components are also in frontend/components
import Header from './frontend/components/Header'; // Assuming components are also in frontend/components


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
    <div className="min-h-screen text-slate-800 dark:text-slate-200 font-sans">
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