'use client';

import { useState, useEffect } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import LocationSearchInput from '../components/locationSeachInput';
import TimeCard from '../components/timeCard';
import SavedLocations from '../components/savedLocations';
import fetchSunData from '../lib/fetchSunData';
import fetchWeather from '../lib/fetchWeather';
import useAuthCheck from '../lib/useAuthCheck';
import { GithubAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { saveLocation, getSavedLocations, deleteLocation } from '../lib/savedLocationsService';
import { Bookmark } from 'lucide-react';

export default function Page() {
  const [selected, setSelected] = useState(null);
  const [sunrise, setSunrise] = useState('');
  const [sunset, setSunset] = useState('');
  const [dayLength, setDayLength] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [savedLocations, setSavedLocations] = useState([]);
  const [saving, setSaving] = useState(false);

  const { user, loading: authLoading } = useAuthCheck();

  useEffect(() => {
    if (user) {
      loadSavedLocations();
    }
  }, [user]);

  useEffect(() => {
    if (selected) {
      getData(); // ✅ Auto-fetch when a location is selected
    }
  }, [selected]);

  const loadSavedLocations = async () => {
    try {
      const data = await getSavedLocations(user.uid);
      setSavedLocations(data);
    } catch (error) {
      console.error('Failed to load saved locations:', error);
    }
  };

  const getData = async () => {
    if (!selected) return;
    setLoading(true);

    const { lat, lng } = selected;

    try {
      const sunData = await fetchSunData(lat, lng);
      setSunrise(sunData.sunrise);
      setSunset(sunData.sunset);
      setDayLength(sunData.dayLength);

      const weatherData = await fetchWeather(lat, lng);
      setWeather(weatherData);
    } catch (error) {
      console.error('Data fetch failed:', error);
    } finally {
      setLoading(false);
    }
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

  const handleSaveLocation = async () => {
    if (!selected || !user) return;
    setSaving(true);

    try {
      await saveLocation(user.uid, selected);
      await loadSavedLocations();
    } catch (error) {
      console.error('Failed to save location:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteLocation = async (docId) => {
    try {
      await deleteLocation(docId);
      await loadSavedLocations();
    } catch (error) {
      console.error('Failed to delete location:', error);
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
          <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-xl w-full max-w-md text-center border border-neutral-200">
            <div className="relative">
              <LocationSearchInput onSelect={setSelected} />
              {selected && (
                <button
                  onClick={handleSaveLocation}
                  disabled={saving}
                  className="absolute top-2 right-2 p-2 bg-transparent hover:scale-110 transition-transform"
                  title="Save this location"
                >
                  <Bookmark size={20} className="text-earth" />
                </button>
              )}
            </div>

            <SavedLocations
              savedLocations={savedLocations}
              onSelect={setSelected}
              onDelete={handleDeleteLocation}
            />

            <TimeCard
              sunrise={sunrise}
              sunset={sunset}
              dayLength={dayLength}
              weather={weather}
            />

            <button
              onClick={handleSignOut}
              className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl font-medium shadow-md"
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
