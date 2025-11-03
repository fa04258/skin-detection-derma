import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

interface RegisterComponentProps {
  onToggleAuthMode: () => void;
}

const RegisterComponent: React.FC<RegisterComponentProps> = ({ onToggleAuthMode }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsSubmitting(true);

    if (!username || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      setIsSubmitting(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      setIsSubmitting(false);
      return;
    }

    try {
      // CHANGE 1: 'register' no longer returns a boolean, it resolves on success
      await register(email, password, username); 
      
      setSuccessMessage('Registration successful! Redirecting to login page...');
      setTimeout(() => {
        onToggleAuthMode();
        setIsSubmitting(false);
      }, 3000);
      
    } catch (err: any) { // CHANGE 2: Catch the thrown error
      // CHANGE 3: Display the specific error message from the caught error
      setError(err.message || "An unexpected error occurred during registration."); 
      console.error("Register component error:", err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-slate-800">
      <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white">Create an Account</h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {error && <p className="text-sm text-center text-red-500 bg-red-100 dark:bg-red-900/30 p-2 rounded-md">{error}</p>}
        {successMessage && <p className="text-sm text-center text-green-500 bg-green-100 dark:bg-green-900/30 p-2 rounded-md">{successMessage}</p>}
        
        <div>
          <label htmlFor="username-register" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Username
          </label>
          <div className="mt-1">
            <input
              id="username-register"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isSubmitting}
              className="w-full px-3 py-2 text-slate-900 bg-slate-50 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white disabled:opacity-50"
              placeholder="Your unique username"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email-register" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Email address
          </label>
          <div className="mt-1">
            <input
              id="email-register"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              className="w-full px-3 py-2 text-slate-900 bg-slate-50 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white disabled:opacity-50"
              placeholder="you@example.com"
            />
          </div>
        </div>
        <div>
          <label htmlFor="password-register" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Password
          </label>
          <div className="mt-1">
            <input
              id="password-register"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
              className="w-full px-3 py-2 text-slate-900 bg-slate-50 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white disabled:opacity-50"
              placeholder="••••••••"
            />
          </div>
        </div>
        <div>
          <label htmlFor="confirm-password-register" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Confirm Password
          </label>
          <div className="mt-1">
            <input
              id="confirm-password-register"
              name="confirm-password"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isSubmitting}
              className="w-full px-3 py-2 text-slate-900 bg-slate-50 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white disabled:opacity-50"
              placeholder="••••••••"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </div>
      </form>
      <p className="text-sm text-center text-slate-600 dark:text-slate-400">
        Already have an account?{' '}
        <button onClick={onToggleAuthMode} className="font-medium text-teal-600 hover:text-teal-500">
          Sign in
        </button>
      </p>
    </div>
  );
};

export default RegisterComponent;