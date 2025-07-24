'use client';

import { useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import LocationSearchInput from '../components/locationSeachInput';
import TimeCard from '../components/timeCard';
import fetchSunData from '../lib/fetchSunData';

export default function Page() {
  const [selected, setSelected] = useState(null);
  const [sunrise, setSunrise] = useState('');
  const [sunset, setSunset] = useState('');
  const [dayLength, setDayLength] = useState('');
  const [loading, setLoading] = useState(false);

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

  return (
    <main className="min-h-screen bg-gradient-to-br from-peach via-soft-blue to-lavender p-6 flex flex-col items-center justify-center">
      <Header />

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
      </div>

      <Footer />
    </main>
  );
}
