export default function TimeCard({ sunrise, sunset, dayLength }) {
  return (
    <div className="space-y-4 w-full">
      <div className="p-4 rounded-xl bg-white/20 border border-white/40 text-center">
        <p className="text-sm text-earth/70 font-semibold uppercase mb-1">🌅 Sunrise</p>
        <p className="text-xl font-orbitron text-earth">{sunrise}</p>
      </div>

      <div className="p-4 rounded-xl bg-white/20 border border-white/40 text-center">
        <p className="text-sm text-earth/70 font-semibold uppercase mb-1">🌇 Sunset</p>
        <p className="text-xl font-orbitron text-earth">{sunset}</p>
      </div>

      <div className="p-4 rounded-xl bg-white/20 border border-white/40 text-center">
        <p className="text-sm text-earth/70 font-semibold uppercase mb-1">⏱ Day Length</p>
        <p className="text-xl font-orbitron text-earth">{dayLength}</p>
      </div>
    </div>
  );
}
