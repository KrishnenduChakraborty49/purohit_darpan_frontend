import { useEffect, useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth,
         eachDayOfInterval, isSameDay, isToday } from 'date-fns';
import { usePanchangStore } from '../store/panchangStore';
import { ChevronLeft, ChevronRight, Sun, Moon, Star, Clock } from 'lucide-react';
import MuhuratTimeline from '../components/panchang/MuhuratTimeline';
import FestivalCard from '../components/panchang/FestivalCard';

const VARAS = ['Ravivar','Somvar','Mangalvar','Budhvar','Guruvar','Shukravar','Shanivar'];

export default function PanchangPage() {
  const { today: panchangData, monthData, festivals, fetchDate, fetchMonth, fetchUpcomingFestivals, loading } = usePanchangStore();
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedFestival, setSelectedFestival] = useState(null);

  useEffect(() => {
    fetchDate(viewDate);
    fetchMonth(format(viewDate, 'yyyy-MM'));
    fetchUpcomingFestivals(60);
  }, []);

  const goToMonth = (dir) => {
    const next = dir === 'next' ? addMonths(viewDate, 1) : subMonths(viewDate, 1);
    setViewDate(next);
    fetchMonth(format(next, 'yyyy-MM'));
  };

  const handleDayClick = (day) => {
    setViewDate(day);
    fetchDate(day);
  };

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(viewDate),
    end: endOfMonth(viewDate),
  });

  const getPanchangForDay = (day) =>
    monthData.find((p) => isSameDay(new Date(p.date), day));

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-950 to-amber-950/20 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold text-orange-200">Panchika</h1>
            <p className="text-orange-400/60 text-sm font-devanagari">पञ्चिका — Hindu Calendar</p>
          </div>
          <div className="text-right">
            <p className="text-orange-300 font-devanagari text-lg">
              {panchangData?.tithi || '—'}
            </p>
            <p className="text-orange-400/60 text-xs">Today's Tithi</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Calendar */}
          <div className="lg:col-span-2">
            <div className="bg-stone-900/60 border border-orange-500/15 rounded-2xl overflow-hidden">
              {/* Month nav */}
              <div className="flex items-center justify-between px-5 py-4
                              border-b border-orange-500/15 bg-stone-800/40">
                <button onClick={() => goToMonth('prev')}
                  className="p-2 rounded-xl hover:bg-orange-500/10 text-orange-300 transition-all">
                  <ChevronLeft size={18} />
                </button>
                <div className="text-center">
                  <h2 className="text-orange-200 font-semibold">{format(viewDate, 'MMMM yyyy')}</h2>
                </div>
                <button onClick={() => goToMonth('next')}
                  className="p-2 rounded-xl hover:bg-orange-500/10 text-orange-300 transition-all">
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Weekday headers */}
              <div className="grid grid-cols-7 text-center py-2 border-b border-orange-500/10">
                {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((d) => (
                  <div key={d} className="text-orange-400/50 text-xs font-medium py-1">{d}</div>
                ))}
              </div>

              {/* Days grid */}
              <div className="grid grid-cols-7">
                {/* Empty cells for first week */}
                {Array.from({ length: startOfMonth(viewDate).getDay() }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}

                {daysInMonth.map((day) => {
                  const p = getPanchangForDay(day);
                  const isSelected = isSameDay(day, viewDate);
                  const festival = festivals.find((f) => isSameDay(new Date(f.eventDate), day));

                  return (
                    <button
                      key={day.toISOString()}
                      onClick={() => handleDayClick(day)}
                      className={`relative flex flex-col items-center py-2 px-1 min-h-[60px]
                                 border border-transparent transition-all duration-150
                                 hover:bg-orange-500/8
                                 ${isSelected ? 'bg-orange-500/15 border-orange-500/30' : ''}
                                 ${isToday(day) ? 'font-bold' : ''}`}>
                      <span className={`text-sm w-7 h-7 rounded-full flex items-center justify-center
                        ${isToday(day)
                          ? 'bg-gradient-saffron text-white shadow-saffron text-xs'
                          : isSelected ? 'text-orange-300' : 'text-orange-200/70'
                        }
                        ${p?.isPurnima ? 'ring-1 ring-blue-400/60' : ''}
                        ${p?.isAmavasya ? 'ring-1 ring-purple-400/60' : ''}`}>
                        {format(day, 'd')}
                      </span>

                      {p?.tithi && (
                        <span className="text-[9px] text-orange-400/50 mt-0.5 truncate w-full text-center">
                          {p.tithi}
                        </span>
                      )}

                      {festival && (
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-0.5 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex items-center gap-4 px-5 py-3 border-t border-orange-500/10 flex-wrap">
                <span className="flex items-center gap-1.5 text-xs text-orange-200/50">
                  <div className="w-3 h-3 rounded-full ring-1 ring-blue-400/60 bg-transparent" />
                  Purnima
                </span>
                <span className="flex items-center gap-1.5 text-xs text-orange-200/50">
                  <div className="w-3 h-3 rounded-full ring-1 ring-purple-400/60 bg-transparent" />
                  Amavasya
                </span>
                <span className="flex items-center gap-1.5 text-xs text-orange-200/50">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                  Festival
                </span>
              </div>
            </div>
          </div>

          {/* Daily Panchang panel */}
          <div className="space-y-4">
            {loading ? (
              <div className="bg-stone-900/60 border border-orange-500/15 rounded-2xl p-8 text-center">
                <div className="w-8 h-8 border-2 border-orange-500/30 border-t-orange-400 rounded-full animate-spin mx-auto" />
              </div>
            ) : panchangData ? (
              <>
                <div className="bg-stone-900/60 border border-orange-500/15 rounded-2xl p-5">
                  <h3 className="text-orange-200 font-semibold mb-4 flex items-center gap-2">
                    <Star size={16} className="text-orange-400" />
                    {format(viewDate, 'MMMM d, yyyy')}
                  </h3>

                  <div className="space-y-3">
                    {[
                      { label: 'Tithi', value: panchangData.tithi, icon: Moon },
                      { label: 'Nakshatra', value: panchangData.nakshatra, icon: Star },
                      { label: 'Yoga', value: panchangData.yoga, icon: Star },
                      { label: 'Karana', value: panchangData.karana, icon: Star },
                      { label: 'Vara', value: panchangData.vara, icon: Sun },
                    ].map(({ label, value, icon: Icon }) => (
                      <div key={label} className="flex justify-between items-center
                                                   py-2 border-b border-orange-500/8">
                        <span className="text-orange-400/60 text-xs flex items-center gap-1.5">
                          <Icon size={12} /> {label}
                        </span>
                        <span className="text-orange-200 text-sm font-medium">{value || '—'}</span>
                      </div>
                    ))}
                  </div>

                  {/* Sunrise / Sunset */}
                  <div className="flex gap-3 mt-4">
                    <div className="flex-1 bg-amber-500/10 rounded-xl p-3 text-center">
                      <Sun size={16} className="mx-auto text-amber-400 mb-1" />
                      <p className="text-amber-300 font-semibold text-sm">
                        {panchangData.sunrise || '6:15 AM'}
                      </p>
                      <p className="text-amber-400/50 text-xs">Sunrise</p>
                    </div>
                    <div className="flex-1 bg-indigo-500/10 rounded-xl p-3 text-center">
                      <Moon size={16} className="mx-auto text-indigo-400 mb-1" />
                      <p className="text-indigo-300 font-semibold text-sm">
                        {panchangData.sunset || '6:30 PM'}
                      </p>
                      <p className="text-indigo-400/50 text-xs">Sunset</p>
                    </div>
                  </div>

                  {/* Brahma Muhurta */}
                  {panchangData.brahmaMuhurtaStart && (
                    <div className="mt-3 bg-purple-500/10 border border-purple-500/20 rounded-xl p-3">
                      <p className="text-purple-400 text-xs font-medium flex items-center gap-1.5">
                        <Clock size={12} /> Brahma Muhurta
                      </p>
                      <p className="text-purple-200 text-sm mt-1">
                        {panchangData.brahmaMuhurtaStart} – {panchangData.brahmaMuhurtaEnd}
                      </p>
                    </div>
                  )}
                </div>

                {/* Muhurat timeline */}
                {(panchangData.rahuStart || panchangData.abhijitStart) && (
                  <MuhuratTimeline panchang={panchangData} />
                )}
              </>
            ) : (
              <div className="bg-stone-900/60 border border-orange-500/15 rounded-2xl p-8 text-center">
                <p className="text-orange-200/50 text-sm">Select a date to view Panchang</p>
              </div>
            )}

            {/* Upcoming festivals */}
            {festivals.length > 0 && (
              <div className="bg-stone-900/60 border border-orange-500/15 rounded-2xl p-4">
                <h3 className="text-orange-200 font-semibold text-sm mb-3">Upcoming Festivals</h3>
                <div className="space-y-2">
                  {festivals.slice(0, 4).map((f) => (
                    <FestivalCard
                      key={f.id}
                      festival={f}
                      compact
                      onClick={() => setSelectedFestival(f)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
