
import React from 'react';
import { useAuth } from '../hooks/useAuth';

const Header: React.FC = () => {
  const { logout, user } = useAuth();

  return (
    <header className="bg-white dark:bg-slate-800 shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
          Derm-AI: Skin Health Assistant
        </h1>
        <div className="flex items-center space-x-4">
          {user && <span className="hidden sm:block text-sm text-slate-500 dark:text-slate-400">Welcome, {user.email}</span>}
          <button
            onClick={logout}
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;