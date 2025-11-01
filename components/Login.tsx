
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

interface LoginComponentProps {
  onToggleAuthMode: () => void;
}

const LoginComponent: React.FC<LoginComponentProps> = ({ onToggleAuthMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (email && password) {
      const success = login(email, password);
      if (!success) {
        setError("Your credentials are not matched with signup data.");
      }
      // On successful login, the user state is set in context, and App.tsx will handle the redirect.
    } else {
      setError("Please fill in both fields.");
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-slate-800">
      <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white">Welcome Back!</h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {error && <p className="text-sm text-center text-red-500 bg-red-100 dark:bg-red-900/30 p-2 rounded-md">{error}</p>}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Email address
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 text-slate-900 bg-slate-50 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
              placeholder="you@example.com"
            />
          </div>
        </div>
        <div>
          <label htmlFor="password"  className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Password
          </label>
          <div className="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 text-slate-900 bg-slate-50 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
              placeholder="••••••••"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            Sign in
          </button>
        </div>
      </form>
      <p className="text-sm text-center text-slate-600 dark:text-slate-400">
        Don't have an account?{' '}
        <button onClick={onToggleAuthMode} className="font-medium text-teal-600 hover:text-teal-500">
          Register here
        </button>
      </p>
    </div>
  );
};

export default LoginComponent;