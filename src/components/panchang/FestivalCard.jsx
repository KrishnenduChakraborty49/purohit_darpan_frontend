import { differenceInDays, format, parseISO } from 'date-fns';
import { Calendar, BookOpen, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

export default function FestivalCard({ festival, compact = false, onClick }) {
  const navigate = useNavigate();
  const eventDate = parseISO(festival.eventDate);
  const daysUntil = differenceInDays(eventDate, new Date());
  const isPast = daysUntil < 0;
  const isToday = daysUntil === 0;

  const countdown = isToday
    ? '🎉 Today!'
    : isPast
    ? 'Passed'
    : daysUntil === 1
    ? 'Tomorrow'
    : `${daysUntil} days`;

  if (compact) {
    return (
      <button
        onClick={onClick}
        className="w-full text-left flex items-center gap-3 p-3 rounded-xl
                   bg-orange-500/8 border border-orange-500/15
                   hover:bg-orange-500/15 transition-all duration-150">
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-saffron
                        flex flex-col items-center justify-center shadow-saffron">
          <span className="text-white text-xs font-bold">{format(eventDate, 'd')}</span>
          <span className="text-white/70 text-[9px]">{format(eventDate, 'MMM')}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-orange-200 text-sm font-medium truncate">{festival.name}</p>
          {festival.nameDevanagari && (
            <p className="font-devanagari text-orange-400/50 text-xs truncate">{festival.nameDevanagari}</p>
          )}
        </div>
        <span className={clsx('text-xs font-medium flex-shrink-0',
          isToday ? 'text-green-400' : isPast ? 'text-orange-400/30' : 'text-orange-400')}>
          {countdown}
        </span>
      </button>
    );
  }

  // Full card
  return (
    <div className="bg-stone-900/80 border border-orange-500/20 rounded-2xl overflow-hidden">
      <div className="bg-gradient-to-r from-orange-900/60 to-amber-900/60 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-orange-200 font-bold text-xl">{festival.name}</h2>
            {festival.nameDevanagari && (
              <p className="font-devanagari text-orange-400/70 text-base mt-0.5">
                {festival.nameDevanagari}
              </p>
            )}
          </div>
          <div className={clsx('px-3 py-1.5 rounded-full text-sm font-semibold flex-shrink-0',
            isToday ? 'bg-green-500/20 text-green-400 border border-green-500/30'
            : isPast ? 'bg-stone-700 text-orange-400/40 border border-orange-500/10'
            : 'bg-orange-500/20 text-orange-300 border border-orange-500/30')}>
            {countdown}
          </div>
        </div>
        <p className="text-orange-300/60 text-sm mt-2 flex items-center gap-2">
          <Calendar size={13} />
          {format(eventDate, 'EEEE, MMMM d, yyyy')}
          {festival.daysDuration > 1 && ` (${festival.daysDuration} days)`}
        </p>
      </div>

      <div className="p-5 space-y-4">
        {festival.description && (
          <p className="text-orange-100/70 text-sm leading-relaxed">{festival.description}</p>
        )}

        <div className="flex gap-3 flex-wrap">
          {festival.puja && (
            <button
              onClick={() => navigate(`/puja/${festival.puja.id}`)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl
                         bg-gradient-saffron text-white text-sm font-medium
                         shadow-saffron hover:shadow-lg transition-all duration-200">
              <BookOpen size={14} />
              Start Practicing
            </button>
          )}

          <button
            onClick={() => navigate('/settings/notifications')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl
                       bg-orange-500/15 text-orange-300 border border-orange-500/30
                       text-sm font-medium hover:bg-orange-500/25 transition-all">
            <Bell size={14} />
            Set Reminder
          </button>

          <button
            onClick={() => navigate('/panchang')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl
                       bg-stone-700/60 text-orange-200 border border-orange-500/20
                       text-sm font-medium hover:bg-stone-600/60 transition-all">
            <Calendar size={14} />
            View Muhurat
          </button>
        </div>
      </div>
    </div>
  );
}
