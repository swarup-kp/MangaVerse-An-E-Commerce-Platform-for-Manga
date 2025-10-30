import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom'; // --- FIX --- Import Link

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login({ email, password });
      navigate('/profile'); // Redirect to profile on success
    } catch (error) {
      // Error is already handled by toast in context
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-rose-50 via-amber-50 to-rose-100 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-rose-700 mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg text-gray-800 outline-none border border-rose-300 focus:ring-2 focus:ring-rose-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg text-gray-800 outline-none border border-rose-300 focus:ring-2 focus:ring-rose-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-rose-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-rose-600 transition shadow-md disabled:bg-rose-300"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        {/* --- NEW --- Added link to the Register page */}
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{' '}
          <Link to="/register" className="text-rose-600 hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

