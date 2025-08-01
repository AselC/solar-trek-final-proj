export default function WeatherForecast({ weather }) {
  if (!weather || !weather.time) return null;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-left mb-4 px-1 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600">
        🌦 7-Day Forecast
      </h2>

      <div className="overflow-x-auto pb-1">
        <div className="flex gap-4 w-max px-1">
          {weather.time.map((day, index) => (
            <div
              key={day}
              className="min-w-[100px] p-3 bg-gradient-to-br from-white/70 via-soft-blue/40 to-lavender/50 rounded-xl text-center shadow-lg border border-white/30 backdrop-blur-sm"
            >
              <p className="font-semibold text-sm text-earth mb-1">
                {new Date(day).toLocaleDateString(undefined, {
                  weekday: 'short',
                })}
              </p>
              <p className="text-xs text-earth/60 mb-2">
                {new Date(day).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
              <p className="text-xl font-orbitron text-earth">
                {weather.temperature_2m_max[index]}°C
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
