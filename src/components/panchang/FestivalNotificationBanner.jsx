import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, BookOpen, X, Bell, ChevronRight, Clock } from 'lucide-react';
import { getActiveFestivalNotifications, sendBrowserFestivalAlert } from '../../utils/festivalNotifications';

export default function FestivalNotificationBanner({ 
  lang = 'bn', 
  onOpenPujaModal,
  onViewPanchang,
  currentDate = new Date() 
}) {
  const [alerts, setAlerts] = useState([]);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const active = getActiveFestivalNotifications(currentDate, lang);
    setAlerts(active);

    // If today is a festival, try triggering browser notification if granted
    const todayAlert = active.find(a => a.isToday);
    if (todayAlert) {
      sendBrowserFestivalAlert(todayAlert);
    }
  }, [currentDate, lang]);

  // If dismissed or no active alerts, don't render
  if (dismissed || alerts.length === 0) return null;

  const todayAlert = alerts.find(a => a.isToday);
  const upcomingAlerts = alerts.filter(a => !a.isToday);

  return (
    <div className="relative mb-6 rounded-3xl overflow-hidden shadow-xl border border-amber-500/40 bg-gradient-to-r from-amber-950 via-orange-950 to-stone-950 text-white animate-in fade-in slide-in-from-top-3 duration-500">
      {/* Decorative ambient glow */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Banner Body */}
      <div className="relative p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Left: Icon & Description */}
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-3xl shadow-lg shadow-orange-950/50 flex-shrink-0 border border-white/20 animate-pulse">
            {todayAlert ? todayAlert.icon : '🪔'}
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-400 text-stone-900 shadow-sm">
                <Sparkles size={11} className="text-stone-900" />
                {todayAlert 
                  ? (lang === 'bn' ? 'আজকের বিশেষ পূজা ও উৎসব' : "Today's Sacred Occasion")
                  : (lang === 'bn' ? 'আসন্ন সপ্তাহের পূজা ও উৎসব' : 'Upcoming This Week')}
              </span>

              {todayAlert && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-orange-500/30 text-orange-200 border border-orange-400/30">
                  <Clock size={10} />
                  {lang === 'bn' ? 'আজ অনুষ্ঠিত হচ্ছে' : 'Happening Today'}
                </span>
              )}
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              {todayAlert ? todayAlert.title.replace('🙏 ', '') : alerts[0].title.replace('⏰ ', '')}
            </h3>

            <p className="text-orange-200/90 text-xs sm:text-sm mt-1 leading-relaxed max-w-2xl font-light">
              {todayAlert ? todayAlert.body : alerts[0].body}
            </p>

            {/* Upcoming within week pill */}
            {todayAlert && upcomingAlerts.length > 0 && (
              <div className="mt-2.5 inline-flex items-center gap-2 px-3 py-1 bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-xl text-xs text-orange-200 border border-white/10 transition-colors">
                <span className="text-sm">🌸</span>
                <span>
                  <strong className="text-amber-300 font-semibold">{upcomingAlerts[0].title}</strong>: {upcomingAlerts[0].body}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Actions & Dismiss */}
        <div className="flex items-center gap-2 self-start md:self-center ml-auto md:ml-0 flex-shrink-0">
          {onOpenPujaModal && (
            <button
              onClick={onOpenPujaModal}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-stone-950 font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-95"
            >
              <BookOpen size={16} />
              {lang === 'bn' ? 'পূজা তালিকা ও সময়সূচি' : 'Puja Schedule & Vidhi'}
            </button>
          )}

          {onViewPanchang && (
            <button
              onClick={onViewPanchang}
              className="flex items-center gap-1 px-3.5 py-2.5 bg-white/10 hover:bg-white/20 text-orange-200 text-xs sm:text-sm font-semibold rounded-xl border border-white/10 transition-all"
            >
              <Calendar size={15} />
              {lang === 'bn' ? 'আজকের পঞ্চাঙ্গ' : "Today's Panchang"}
            </button>
          )}

          <button
            onClick={() => setDismissed(true)}
            title={lang === 'bn' ? 'বন্ধ করুন' : 'Dismiss'}
            className="p-2 text-orange-300/60 hover:text-white hover:bg-white/10 rounded-xl transition-colors ml-1"
          >
            <X size={18} />
          </button>
        </div>

      </div>
    </div>
  );
}
