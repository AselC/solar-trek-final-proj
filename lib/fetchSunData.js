export default async function fetchSunData(lat, lng) {
  const response = await fetch(
    `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&formatted=0`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch sunrise/sunset data');
  }

  const result = await response.json();
  const { sunrise, sunset, day_length } = result.results;

  // Format to readable time (HH:MM)
  const formatTime = (isoStr) =>
    new Date(isoStr).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

  return {
    sunrise: formatTime(sunrise),
    sunset: formatTime(sunset),
    dayLength: new Date(day_length * 1000).toISOString().substr(11, 8),
  };
}
