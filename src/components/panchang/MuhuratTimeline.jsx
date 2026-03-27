/**
 * MuhuratTimeline — horizontal time band showing auspicious and inauspicious periods.
 * Maps time slots to a visual bar from sunrise to sunset.
 */
export default function MuhuratTimeline({ panchang }) {
  const parseTime = (timeStr) => {
    if (!timeStr) return null;
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + (m || 0);
  };

  const sunrise = parseTime(panchang.sunrise) || 375; // 6:15 AM
  const sunset  = parseTime(panchang.sunset)  || 1110; // 6:30 PM
  const duration = sunset - sunrise;

  const toPercent = (minutes) => {
    if (!minutes) return 0;
    return Math.max(0, Math.min(100, ((minutes - sunrise) / duration) * 100));
  };

  const slots = [
    {
      label: 'Rahu Kaal',
      start: parseTime(panchang.rahuStart),
      end: parseTime(panchang.rahuEnd),
      color: 'bg-red-500/70',
      dotColor: 'bg-red-400',
      type: 'bad',
    },
    {
      label: 'Gulika',
      start: parseTime(panchang.gulikaStart),
      end: parseTime(panchang.gulikaEnd),
      color: 'bg-orange-600/60',
      dotColor: 'bg-orange-500',
      type: 'bad',
    },
    {
      label: 'Abhijit',
      start: parseTime(panchang.abhijitStart),
      end: parseTime(panchang.abhijitEnd),
      color: 'bg-green-500/70',
      dotColor: 'bg-green-400',
      type: 'good',
    },
  ].filter((s) => s.start !== null && s.end !== null);

  const formatMin = (minutes) => {
    if (!minutes) return '';
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    const ampm = h < 12 ? 'AM' : 'PM';
    return `${h % 12 || 12}:${m.toString().padStart(2, '0')} ${ampm}`;
  };

  return (
    <div className="bg-stone-900/60 border border-orange-500/15 rounded-2xl p-5">
      <h3 className="text-orange-200 font-semibold text-sm mb-4">Muhurat Timeline</h3>

      {/* Timeline bar */}
      <div className="relative h-8 bg-stone-700/60 rounded-full overflow-hidden mb-3">
        {/* Base auspicious coloring for full day */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-amber-400/20" />

        {/* Time slots */}
        {slots.map((slot) => {
          const left = toPercent(slot.start);
          const width = toPercent(slot.end) - left;
          return (
            <div
              key={slot.label}
              className={`absolute top-0 h-full ${slot.color} flex items-center justify-center`}
              style={{ left: `${left}%`, width: `${Math.max(width, 2)}%` }}
              title={`${slot.label}: ${formatMin(slot.start)} – ${formatMin(slot.end)}`}
            >
              {width > 8 && (
                <span className="text-white text-[9px] font-medium truncate px-1">
                  {slot.label}
                </span>
              )}
            </div>
          );
        })}

        {/* Abhijit star marker */}
        {panchang.abhijitStart && (
          <div
            className="absolute top-0 h-full flex items-center"
            style={{ left: `${toPercent((parseTime(panchang.abhijitStart) + parseTime(panchang.abhijitEnd)) / 2)}%` }}>
            <span className="text-white text-xs">★</span>
          </div>
        )}
      </div>

      {/* Time labels */}
      <div className="flex justify-between text-xs text-orange-400/50 mb-4">
        <span>{formatMin(sunrise)}</span>
        <span>Noon</span>
        <span>{formatMin(sunset)}</span>
      </div>

      {/* Legend */}
      <div className="space-y-2">
        {slots.map((slot) => (
          <div key={slot.label} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${slot.dotColor}`} />
              <span className={slot.type === 'good' ? 'text-green-400' : 'text-red-400/80'}>
                {slot.label}
              </span>
            </div>
            <span className="text-orange-200/50">
              {formatMin(slot.start)} – {formatMin(slot.end)}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-3 text-xs text-orange-200/40">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" /> Auspicious
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" /> Inauspicious
        </div>
      </div>
    </div>
  );
}
