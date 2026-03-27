import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { usePujaStore } from '../store/pujaStore';
import { usePanchangStore } from '../store/panchangStore';
import { BookOpen, Calendar, Sparkles, ChevronRight, Sun, Star } from 'lucide-react';
import { format } from 'date-fns';

export default function Dashboard() {
  const { user } = useAuthStore();
  const { pujas, fetchPujas } = usePujaStore();
  const { today: panchang, festivals, fetchToday, fetchUpcomingFestivals } = usePanchangStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPujas();
    fetchToday();
    fetchUpcomingFestivals(14);
  }, []);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return '🌄 Suprabhat';
    if (h < 17) return '☀️ Namaste';
    return '🌙 Shubh Sandhya';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-950 to-amber-950/20 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">

        {/* Welcome hero */}
        <div className="relative overflow-hidden bg-gradient-to-r from-amber-950/80 to-orange-950/60
                        border border-orange-500/20 rounded-2xl p-8 animate-fade-in">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl" />
          </div>
          <div className="relative z-10 flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-orange-400 text-sm font-medium mb-1">{greeting()}</p>
              <h1 className="text-3xl font-bold text-orange-200">
                {user?.fullName?.split(' ')[0]} ji 🙏
              </h1>
              <p className="text-orange-200/60 text-sm mt-1">
                {format(new Date(), 'EEEE, MMMM d yyyy')}
              </p>
            </div>
            {panchang && (
              <div className="text-right">
                <p className="font-devanagari text-2xl text-orange-300">{panchang.tithi}</p>
                <p className="text-orange-400/60 text-xs mt-0.5">{panchang.nakshatra} • {panchang.vara}</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Pujas Available', value: pujas.length || '—', icon: BookOpen, color: 'from-orange-600 to-amber-600' },
            { label: 'Festivals Soon', value: festivals.length || '—', icon: Calendar, color: 'from-purple-600 to-indigo-600' },
            { label: "Today's Tithi", value: panchang?.tithi?.slice(0, 10) || '—', icon: Moon, color: 'from-blue-600 to-cyan-600' },
            { label: 'Ask Guru', value: 'AI Ready', icon: Sparkles, color: 'from-rose-600 to-pink-600' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label}
              className="bg-stone-900/60 border border-orange-500/15 rounded-2xl p-4 animate-slide-up">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3 shadow-saffron`}>
                <Icon size={18} className="text-white" />
              </div>
              <p className="text-orange-200 font-bold text-lg">{value}</p>
              <p className="text-orange-400/50 text-xs">{label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Continue Learning */}
          <div className="bg-stone-900/60 border border-orange-500/15 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-orange-200 font-semibold flex items-center gap-2">
                <BookOpen size={18} className="text-orange-400" /> Puja Learning
              </h2>
              <button onClick={() => navigate('/pujas')}
                className="text-orange-400/60 text-xs hover:text-orange-300 flex items-center gap-1 transition-colors">
                View all <ChevronRight size={14} />
              </button>
            </div>
            <div className="space-y-3">
              {pujas.slice(0, 4).map((puja) => (
                <button
                  key={puja.id}
                  onClick={() => navigate(`/puja/${puja.id}`)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl
                             bg-orange-500/8 border border-orange-500/12
                             hover:bg-orange-500/15 transition-all duration-150 group text-left">
                    <div className="w-14 h-14 rounded-xl bg-gradient-saffron flex-shrink-0
                                    flex items-center justify-center shadow-saffron text-2xl overflow-hidden">
                      {puja.thumbnailUrl ? (
                        <img src={puja.thumbnailUrl} className="w-full h-full object-cover" alt="" />
                      ) : (
                        puja.thumbnailEmoji || '??'
                      )}
                    </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-orange-200 font-medium text-sm truncate group-hover:text-orange-100">
                      {puja.name}
                    </p>
                    {puja.nameDevanagari && (
                      <p className="font-devanagari text-orange-400/50 text-xs truncate">
                        {puja.nameDevanagari}
                      </p>
                    )}
                    <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium
                      ${puja.difficulty === 'BEGINNER'
                        ? 'bg-green-500/15 text-green-400'
                        : puja.difficulty === 'INTERMEDIATE'
                        ? 'bg-amber-500/15 text-amber-400'
                        : 'bg-red-500/15 text-red-400'
                      }`}>
                      {puja.difficulty}
                    </span>
                  </div>
                  <ChevronRight size={16} className="text-orange-400/30 group-hover:text-orange-400 flex-shrink-0" />
                </button>
              ))}
              {pujas.length === 0 && (
                <p className="text-orange-200/40 text-sm text-center py-4">Loading pujas...</p>
              )}
            </div>
          </div>

          {/* Panchang & Festivals */}
          <div className="space-y-4">
            {/* Daily Panchang card */}
            {panchang && (
              <div className="bg-stone-900/60 border border-orange-500/15 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-orange-200 font-semibold flex items-center gap-2">
                    <Star size={18} className="text-orange-400" /> Today's Panchang
                  </h2>
                  <button onClick={() => navigate('/panchang')}
                    className="text-orange-400/60 text-xs hover:text-orange-300 flex items-center gap-1">
                    Full <ChevronRight size={14} />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Tithi', value: panchang.tithi },
                    { label: 'Nakshatra', value: panchang.nakshatra },
                    { label: 'Yoga', value: panchang.yoga },
                    { label: 'Vara', value: panchang.vara },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-orange-500/8 rounded-xl p-3">
                      <p className="text-orange-400/50 text-xs">{label}</p>
                      <p className="text-orange-200 font-medium text-sm mt-0.5">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upcoming festivals */}
            {festivals.length > 0 && (
              <div className="bg-stone-900/60 border border-orange-500/15 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-orange-200 font-semibold flex items-center gap-2">
                    <Calendar size={18} className="text-orange-400" /> Upcoming Festivals
                  </h2>
                </div>
                <div className="space-y-2">
                  {festivals.slice(0, 3).map((f) => {
                    const days = Math.ceil((new Date(f.eventDate) - new Date()) / 86400000);
                    return (
                      <div key={f.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-orange-500/8 border border-orange-500/12">
                        <div>
                          <p className="text-orange-200 text-sm font-medium">{f.name}</p>
                          {f.nameDevanagari && (
                            <p className="font-devanagari text-orange-400/50 text-xs">{f.nameDevanagari}</p>
                          )}
                        </div>
                        <span className={`text-xs font-medium
                          ${days === 0 ? 'text-green-400' : days < 3 ? 'text-orange-300' : 'text-orange-400/60'}`}>
                          {days === 0 ? 'Today' : days === 1 ? 'Tomorrow' : `${days}d`}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Moon(props) {
  const { size, className } = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
      width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round"
      className={className}>
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );
}




