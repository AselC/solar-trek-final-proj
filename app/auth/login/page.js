// app/auth/login/page.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import {
  GithubAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from 'firebase/auth';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/auth/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGitHubLogin = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      router.push('/auth/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Login to Solar Trek</h2>

        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login with Email
          </button>
        </form>

        <div className="mt-6">
          <button
            onClick={handleGitHubLogin}
            className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-900"
          >
            Login with GitHub
          </button>
        </div>
      </div>
    </div>
  );
}
