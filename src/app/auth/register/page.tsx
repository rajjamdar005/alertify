"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { auth, db } from '../../firebase/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import Image from 'next/image'; // Import the Image component from next/image

const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [name, setName] = useState<string>(''); 
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        name: name, 
        createdAt: new Date(),
      });

      router.push('/auth/form');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          name: user.displayName || "",
          createdAt: new Date(),
        });
      }

      router.push('/auth/form');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-green-200 via-blue-200 to-purple-200">
      <div className="flex w-full max-w-5xl rounded-xl shadow-lg bg-white overflow-hidden">
        <div className="w-full md:w-1/2 p-12">
          <h2 className="text-4xl font-bold text-gray-800 font-poppins mb-4">
            Create an account<span className="wave">🎉</span>
          </h2>
          <p className="mb-6 text-gray-600 font-inter">Join us by creating an account</p>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div className="mb-4">
            <label className="block text-sm text-gray-600 font-inter mb-2">Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-600 font-inter mb-2">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-600 font-inter mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm text-gray-600 font-inter mb-2">Confirm Password</label>
            <input 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <button 
            className="w-full px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200 mb-4"
            onClick={handleSignUp}
          >
            Sign Up
          </button>

          <button 
            className="w-full px-4 py-2 text-gray-800 bg-white border-2 border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200 flex items-center justify-center"
            onClick={handleGoogleSignUp}
          >
            <Image src="/images/google.png" alt="Google Icon" width={24} height={24} className="mr-2" />
            Sign Up with Google
          </button>
        </div>

        <div
          className="hidden md:block md:w-1/2 bg-cover bg-center rounded-r-xl"
          style={{ 
            backgroundImage: "url('/images/alert.jpg')",
          }}
        >
        </div>
      </div>
    </div>
  );
};

export default SignUp;
