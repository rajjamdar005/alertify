"use client";

import React, { useState, useEffect } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import app from "../../firebase/firebase";
import Link from "next/link";

const Header = () => {
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user || null);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-white  shadow-md">
      <nav className="flex items-center justify-between px-6 py-4 max-w-screen-xl mx-auto">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              className="btn btn-ghost btn-circle flex items-center justify-center"
              onClick={toggleMenu}
              aria-expanded={menuOpen}
              aria-haspopup="true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </button>
            {menuOpen && (
              <ul
                className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg"
                aria-label="submenu"
              >
                <li>
                  <Link href="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Homepage
                  </Link>
                </li>
                <li>
                  <Link href="/portfolio" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    About
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>

        {/* Center */}
        <div className="text-xl font-semibold text-gray-800">
          <Link href="/">Alertify</Link>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <button
                className="btn btn-ghost btn-circle text-gray-600 hover:text-gray-900"
                onClick={handleLogout}
                aria-label="logout"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>
              <div className="relative">
                <button
                  className="btn btn-ghost btn-circle text-gray-600 hover:text-gray-900"
                  aria-label="notifications"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full px-1.5 py-0.5">
                    0
                  </span>
                </button>
              </div>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="text-gray-700 hover:text-gray-900">
                Login
              </Link>
              <Link href="/auth/register" className="text-gray-700 hover:text-gray-900">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
