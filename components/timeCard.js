import WeatherForecast from './WeatherForecast'; // Make sure this path is correct

export default function TimeCard({ sunrise, sunset, dayLength, weather }) {
  const cardStyle = `
    p-4 rounded-2xl text-center text-earth
    bg-gradient-to-br from-peach/60 via-soft-blue/50 to-lavender/60
    shadow-md
  `;

  const labelStyle = 'text-sm text-earth/70 font-semibold uppercase mb-1 tracking-wider';
  const valueStyle = 'text-xl font-orbitron text-earth';

  return (
    <div className="space-y-5 w-full">
      <div className={cardStyle}>
        <p className={labelStyle}>🌅 Sunrise</p>
        <p className={valueStyle}>{sunrise}</p>
      </div>

      <div className={cardStyle}>
        <p className={labelStyle}>🌇 Sunset</p>
        <p className={valueStyle}>{sunset}</p>
      </div>

      <div className={cardStyle}>
        <p className={labelStyle}>⏱ Day Length</p>
        <p className={valueStyle}>{dayLength}</p>
      </div>

      {weather && <WeatherForecast weather={weather} />}
    </div>
  );
}
