"use client";

import { useState } from 'react';
import { signUpWithEmail, signInWithEmail, signInWithGoogle, signOut } from '@/lib/auth';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async () => {
    try {
      await signUpWithEmail(email, password);
      setMessage('Sign-up successful!');
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const handleSignIn = async () => {
    try {
      await signInWithEmail(email, password);
      setMessage('Sign-in successful!');
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      setMessage('Google sign-in successful!');
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setMessage('Signed out successfully!');
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Authentication</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-2 p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-4 p-2 border rounded"
      />
      <button onClick={handleSignUp} className="mb-2 p-2 bg-blue-500 text-white rounded">
        Sign Up
      </button>
      <button onClick={handleSignIn} className="mb-2 p-2 bg-green-500 text-white rounded">
        Sign In
      </button>
      <button onClick={handleGoogleSignIn} className="mb-2 p-2 bg-red-500 text-white rounded">
        Sign In with Google
      </button>
      <button onClick={handleSignOut} className="p-2 bg-gray-500 text-white rounded">
        Sign Out
      </button>
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </div>
  );
}