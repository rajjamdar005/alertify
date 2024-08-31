"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../firebase/firebase';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>(''); // To store success messages
  const router = useRouter();

  const handleLogin = async () => {
    setError(''); // Clear previous errors
    setSuccess(''); // Clear previous success messages
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess('Login successful!'); // Success message
      router.push('/home'); // Redirect to homepage after login
    } catch (err: any) {
      // Handle specific error messages based on Firebase Auth errors
      switch (err.code) {
        case 'auth/user-not-found':
          setError('No user found with this email.');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password. Please try again.');
          break;
        case 'auth/invalid-email':
          setError('Invalid email format.');
          break;
        default:
          setError('An error occurred. Please try again.');
      }
    }
  };

  const handleGoogleLogin = async () => {
    setError(''); // Clear previous errors
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      setSuccess('Google login successful!');
      router.push('/home'); // Redirect to homepage after Google login
    } catch (err: any) {
      setError(err.message); // Display error message if Google login fails
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-5xl rounded-3xl shadow-2xl bg-white overflow-hidden">
        <div className="w-full md:w-1/2 p-12">
          <h2 className="text-4xl font-bold text-gray-800 font-poppins">
            Welcome back<span className="wave">👋</span>
          </h2>
          <p className="mt-2 text-gray-500 font-inter">Please enter your details</p>

          {error && <p className="text-red-500 mt-2">{error}</p>}
          {success && <p className="text-green-500 mt-2">{success}</p>}

          <div className="mt-6">
            <label className="block text-sm text-gray-600 font-inter">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring focus:ring-green-300"
              required
            />
          </div>

          <div className="mt-4">
            <div className="flex justify-between">
              <label className="block text-sm text-gray-600 font-inter">Password</label>
              <a href="#" className="text-xs text-gray-500 hover:underline">Forgot Password?</a>
            </div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring focus:ring-green-300"
              required
            />
          </div>

          <div className="mt-6">
            <button 
              className="w-full px-4 py-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600 focus:outline-none transition duration-200"
              onClick={handleLogin}
            >
              Log in
            </button>
          </div>

          {/* Google Login Button */}
          <div className="mt-4">
            <button 
              className="w-full px-4 py-2 text-black bg-white border-2 border-black-500 rounded-md hover:bg-gray-200 focus:outline-none transition duration-200 flex items-center justify-center"
              onClick={handleGoogleLogin}
            >
              <img src="/images/google.png" alt="Google Icon" className="w-6 h-6 mr-2" />
              Log in with Google
            </button>
          </div>

          <p className="mt-8 text-xs font-light text-center text-gray-400 font-inter">
            Don't have an account? <a href="/auth/register" className="font-medium text-gray-700 hover:underline">Sign Up</a>
          </p>
        </div>

        <div
          className="hidden md:block md:w-1/2 bg-cover bg-center bg-no-repeat rounded-r-3xl"
          style={{ 
            backgroundImage: "url('/images/alert.jpg')",
            minHeight: '100%' 
          }}
        >
        </div>
      </div>
    </div>
  );
};

export default SignIn;
