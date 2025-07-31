'use client';

import { useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import LocationSearchInput from '../components/locationSeachInput';
import TimeCard from '../components/timeCard';
import fetchSunData from '../lib/fetchSunData';
import useAuthCheck from '../lib/useAuthCheck';
import { GithubAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function Page() {
  const [selected, setSelected] = useState(null);
  const [sunrise, setSunrise] = useState('');
  const [sunset, setSunset] = useState('');
  const [dayLength, setDayLength] = useState('');
  const [loading, setLoading] = useState(false);

  const { user, loading: authLoading } = useAuthCheck();

  const getData = async () => {
    if (!selected) return;
    setLoading(true);
    const { lat, lng } = selected;
    const data = await fetchSunData(lat, lng);
    setSunrise(data.sunrise);
    setSunset(data.sunset);
    setDayLength(data.dayLength);
    setLoading(false);
  };

  const handleGitHubLogin = async () => {
    const provider = new GithubAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('GitHub Login Error:', error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Sign out failed:', error.message);
    }
  };

  if (authLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-peach via-soft-blue to-lavender">
        <p className="text-xl font-inter text-earth">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-peach via-soft-blue to-lavender">
      <Header />

      <div className="flex-1 flex items-center justify-center px-4">
        {!user ? (
          <div className="bg-white/30 backdrop-blur-lg p-6 rounded-2xl shadow-xl w-full max-w-md text-center border border-white/50">
            <p className="font-orbitron text-xl mb-4 text-earth">Sign in to continue</p>
            <button
              onClick={handleGitHubLogin}
              className="w-full bg-white text-earth hover:bg-black hover:text-white py-3 px-6 rounded-xl font-medium shadow-lg transition"
            >
              Sign in with GitHub
            </button>
          </div>
        ) : (
          <div className="bg-white/30 backdrop-blur-lg p-6 rounded-2xl shadow-xl w-full max-w-md text-center border border-white/50">
            <LocationSearchInput onSelect={setSelected} />
            <TimeCard
              sunrise={sunrise}
              sunset={sunset}
              dayLength={dayLength}
            />
            <button
              onClick={getData}
              disabled={loading || !selected}
              className={`mt-6 w-full py-3 rounded-xl font-medium text-white ${
                loading || !selected
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600'
              }`}
            >
              {loading ? 'Loading...' : 'Get Times'}
            </button>

            <button
              onClick={handleSignOut}
              className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl font-medium shadow-md"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
