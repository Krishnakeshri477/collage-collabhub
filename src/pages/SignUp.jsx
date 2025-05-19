// src/pages/auth/Signup.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/Auth/AuthForm';
import GoogleAuthBtn from '../components/Auth/GoogleAuthBtn';

const Signup = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      // Replace with your actual API call
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Store token and redirect (implementation depends on your auth system)
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Create a new account
          </h2>
        </div>
        <div className="bg-gray-800 py-8 px-4 shadow rounded-lg sm:px-10 space-y-6">
          <GoogleAuthBtn isLogin={false} />
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-800 text-gray-400">Or sign up with email</span>
            </div>
          </div>
          <AuthForm isLogin={false} onSubmit={handleSubmit} error={error} />
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-400">
            Already have an account?{' '}
            <a href="/login" className="font-medium text-blue-400 hover:text-blue-300">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;