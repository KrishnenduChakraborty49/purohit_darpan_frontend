import React, { useState, useEffect } from 'react';
import { X, Calendar as CalendarIcon, ChevronLeft, ChevronRight, Sun, Moon, Clock, Sparkles } from 'lucide-react';
import axiosInstance from '../../api/axiosInstance';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, getDay, isSameDay, parseISO } from 'date-fns';

const TITHI_MAP_BN = {
  Pratipada: 'প্রতিপদ',
  Dwitiya: 'দ্বিতীয়া',
  Tritiya: 'তৃতীয়া',
  Chaturthi: 'চতুর্থী',
  Panchami: 'পঞ্চমী',
  Shashti: 'ষষ্ঠী',
  Shashthi: 'ষষ্ঠী',
  Saptami: 'সপ্তমী',
  Ashtami: 'অষ্টমী',
  Navami: 'নবমী',
  Dashami: 'দশমী',
  Ekadashi: 'একাদশী',
  Dwadashi: 'দ্বাদশী',
  Trayodashi: 'ত্রয়োদশী',
  Chaturdashi: 'চতুর্দশী',
  Purnima: 'পূর্ণিমা',
  Amavasya: 'অমাবস্যা'
};

const NAKSHATRA_MAP_BN = {
  Ashwini: 'অশ্বিনী',
  Bharani: 'ভরণী',
  Krittika: 'কৃত্তিকা',
  Rohini: 'রোহিণী',
  Mrigashira: 'মৃগশিরা',
  Ardra: 'আর্দ্রা',
  Punarvasu: 'পুনর্বসু',
  Pushya: 'পুষ্যা',
  Ashlesha: 'অশ্मেষা',
  Magha: 'মঘা',
  'Purva Phalguni': 'পূর্ব ফাল্গুনী',
  'Uttara Phalguni': 'উত্তর ফাল্গুনী',
  Hasta: 'হস্তা',
  Chitra: 'চিত্রা',
  Swati: 'স্বাতী',
  Vishakha: 'বিশাখা',
  Anuradha: 'অনুরাধা',
  Jyeshtha: 'জ্যেষ্ঠা',
  Mula: 'মূলা',
  'Purva Ashadha': 'পূর্বাষাঢ়',
  'Uttara Ashadha': 'উত্তরাষাঢ়',
  Shravana: 'শ্রবণা',
  Dhanishta: 'ধনিষ্ঠা',
  Shatabhisha: 'শতভিষা',
  'Purva Bhadrapada': 'পূর্ব ভাদ্রপদ',
  'Uttara Bhadrapada': 'উত্তর ভাদ্রপদ',
  Revati: 'রেবতী'
};

const BN_NUMBERS = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
const toBnNum = (n) => String(n).split('').map(c => (c >= '0' && c <= '9') ? BN_NUMBERS[parseInt(c)] : c).join('');

const BN_MONTHS = [
  'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ',
  'এপ্রিল', 'মে', 'জুন', 'জুলাএ',
  'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর',
  'নভেম্বর', 'ডিসেম্বর'
];

const WEEKDAYS = {
  bn: ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহঃ', 'শুক্র', 'শনি'],
  hi: ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'],
  en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
};

export default function CalendarModal({ isOpen, onClose, lang = 'bn', onSelectDate }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthData, setMonthData] = useState([]);
  const [selectedDayData, setSelectedDayData] = useState(null);
  const [loading, setLoading] = useState(false);

  const yearMonthStr = format(currentMonth, 'yyyy-MM');

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    const fetchMonthPanchang = async () => {
      setLoading(true);
      try {
        const { data } = await axiosInstance.get(`/panchang/month/${yearMonthStr}`);
        if (isMounted && Array.isArray(data)) {
          setMonthData(data);
          const todayStr = format(new Date(), 'yyyy-MM-dd');
          const foundToday = data.find(d => d.date === todayStr);
          setSelectedDayData(foundToday || data[0] || null);
        }
      } catch (err) {
        console.warn('Month data fetch error:', err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchMonthPanchang();
    return () => { isMounted = false; };
  }, [isOpen, yearMonthStr]);

  if (!isOpen) return null;

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDayIndex = getDay(monthStart);
  const daysInMonth = monthEnd.getDate();

  const handlePrevMonth = () => setCurrentMonth(prev => subMonths(prev, 1));
  const handleNextMonth = () => setCurrentMonth(prev => addMonths(prev, 1));
  const handleToday = () => {
    const now = new Date();
    setCurrentMonth(now);
  };

  const weekdays = WEEKDAYS[lang] || WEEKDAYS.bn;

  const getTithiDisplay = (tithiEn) => {
    if (!tithiEn) return '';
    return TITHI_MAP_BN[tithiEn] || tithiEn;
  };

  const getNakshatraDisplay = (nakshatraEn) => {
    if (!nakshatraEn) return '';
    return NAKSHATRA_MAP_BN[nakshatraEn] || nakshatraEn;
  };

  const formatMonthTitle = () => {
    const monthIdx = currentMonth.getMonth();
    const year = currentMonth.getFullYear();
    if (lang === 'bn') {
      return `${BN_MONTHS[monthIdx]} ${toBnNum(year)}`;
    }
    return format(currentMonth, 'MMMM yyyy');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-stone-950/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[94vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-indigo-700 text-white p-4 sm:p-5 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner">
              <CalendarIcon size={24} className="text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold tracking-wide">
                  {lang === 'bn' ? 'বাংলা ক্যালেন্ডার' : lang === 'hi' ? 'पंचांग कैलेंडर' : 'Vedic Calendar'}
                </h2>
                <span className="text-[11px] bg-white/20 px-2.5 py-0.5 rounded-full font-medium">
                  {formatMonthTitle()}
                </span>
              </div>
              <p className="text-white/80 text-xs sm:text-sm mt-0.5">
                {lang === 'bn' ? 'দৈনিক তিথি, একাদশী, পূর্ণিমা ও অমাবস্যার মাসিক তালিকা' : 'Monthly view with Tithi, Ekadashi, Purnima and Amavasya'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={handleToday}
              className="text-xs font-semibold bg-white/15 hover:bg-white/25 px-3 py-1.5 rounded-xl transition-all"
            >
              {lang === 'bn' ? 'আজ' : 'Today'}
            </button>
            <button 
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 text-white flex items-center justify-center transition-all focus:outline-none"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Month Navigation Row */}
        <div className="px-5 py-3 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
          <button 
            onClick={handlePrevMonth}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-stone-700 hover:bg-stone-100 hover:text-stone-900 transition-all text-xs sm:text-sm font-medium shadow-sm"
          >
            <ChevronLeft size={16} /> {lang === 'bn' ? 'পূর্ববর্তী' : 'Prev'}
          </button>

          <div className="text-center">
            <h3 className="text-base sm:text-lg font-bold text-stone-800">
              {formatMonthTitle()}
            </h3>
            {loading && (
              <span className="text-[11px] text-orange-600 font-medium">
                {lang === 'bn' ? 'ডেটা লোড হচ্ছে...' : 'Loading month...'}
              </span>
            )}
          </div>

          <button 
            onClick={handleNextMonth}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-stone-700 hover:bg-stone-100 hover:text-stone-900 transition-all text-xs sm:text-sm font-medium shadow-sm"
          >
            {lang === 'bn' ? 'পরবর্তী' : 'Next'} <ChevronRight size={16} />
          </button>
        </div>

        {/* Main Content Area */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1 bg-white">
          
          {/* Weekday Header */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center">
            {weekdays.map((day, idx) => (
              <div 
                key={idx} 
                className={`py-2 text-xs sm:text-sm font-bold rounded-lg ${
                  idx === 0 ? 'text-red-600 bg-red-50/50' : 'text-stone-600 bg-stone-50'
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {Array.from({ length: startDayIndex }).map((_, i) => (
              <div key={`empty-${i}`} className="min-h-[58px] sm:min-h-[72px] bg-stone-50/30 rounded-xl border border-dashed border-stone-100" />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const dateStr = `${yearMonthStr}-${String(dayNum).padStart(2, '0')}`;
              const dayPanchang = monthData.find(d => d.date === dateStr);
              const isToday = isSameDay(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), dayNum), new Date());
              const isSelected = selectedDayData?.date === dateStr;

              const isEkadashi = dayPanchang?.isEkadashi || dayPanchang?.tithi?.toLowerCase().includes('ekadashi');
              const isPurnima = dayPanchang?.isPurnima || dayPanchang?.tithi?.toLowerCase().includes('purnima');
              const isAmavasya = dayPanchang?.isAmavasya || dayPanchang?.tithi?.toLowerCase().includes('amavasya');

              return (
                <button
                  key={dateStr}
                  onClick={() => dayPanchang && setSelectedDayData(dayPanchang)}
                  className={`min-h-[58px] sm:min-h-[72px] p-1 sm:p-2 rounded-xl text-left border flex flex-col justify-between transition-all duration-150 relative group ${
                    isSelected 
                      ? 'bg-orange-50 border-orange-500 shadow-md ring-2 ring-orange-400/40 -translate-y-0.5' 
                      : isToday
                      ? 'bg-amber-50/60 border-amber-300 shadow-sm'
                      : 'bg-white border-stone-200 hover:border-orange-300 hover:bg-orange-50/20'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className={`text-xs sm:text-sm font-bold ${isToday ? 'text-orange-700' : 'text-stone-800'}`}>
                      {lang === 'bn' ? toBnNum(dayNum) : dayNum}
                    </span>
                    {isToday && (
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-pulse" />
                    )}
                  </div>

                  <div className="flex items-center gap-1 mt-0.5 flex-wrap">
                    {isPurnima && (
                      <span className="text-[9px] sm:text-[10px] font-bold text-amber-700 bg-amber-100 px-1 py-0.5 rounded leading-tight flex items-center gap-0.5">
                        🌕 {lang === 'bn' ? 'পূর্ণিমা' : 'Purnima'}
                      </span>
                    )}
                    {isAmavasya && (
                      <span className="text-[9px] sm:text-[10px] font-bold text-stone-700 bg-stone-200 px-1 py-0.5 rounded leading-tight flex items-center gap-0.5">
                        🌑 {lang === 'bn' ? 'অমাবস্যা' : 'Amavasya'}
                      </span>
                    )}
                    {isEkadashi && (
                      <span className="text-[9px] sm:text-[10px] font-bold text-purple-700 bg-purple-100 px-1 py-0.5 rounded leading-tight flex items-center gap-0.5">
                        ✨ {lang === 'bn' ? 'একাদশী' : 'Ekadashi'}
                      </span>
                    )}
                  </div>

                  {dayPanchang?.tithi && !isPurnima && !isAmavasya && !isEkadashi && (
                    <span className="text-[9px] sm:text-[10px] text-stone-500 font-medium truncate block leading-none">
                      {getTithiDisplay(dayPanchang.tithi)}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Selected Date Inspector Panel */}
          {selectedDayData && (
            <div className="mt-4 p-4 sm:p-5 bg-gradient-to-r from-orange-50/60 via-amber-50/40 to-stone-50 rounded-2xl border border-orange-200 shadow-sm animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-orange-200/60 gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">📅</span>
                    <h4 className="text-base sm:text-lg font-bold text-stone-900">
                      {lang === 'bn' 
                        ? `${toBnNum(selectedDayData.date)} এর পঞ্চাঙ্গ`
                        : `Panchang for ${selectedDayData.date}`}
                    </h4>
                    {selectedDayData.isEkadashi && (
                      <span className="bg-purple-100 text-purple-800 text-[11px] font-bold px-2 py-0.5 rounded-full">
                        {lang === 'bn' ? 'একাদশী' : 'Ekadashi'}
                      </span>
                    )}
                    {selectedDayData.isPurnima && (
                      <span className="bg-amber-100 text-amber-800 text-[11px] font-bold px-2 py-0.5 rounded-full">
                        {lang === 'bn' ? 'পূর্ণিমা' : 'Purnima'}
                      </span>
                    )}
                    {selectedDayData.isAmavasya && (
                      <span className="bg-stone-200 text-stone-800 text-[11px] font-bold px-2 py-0.5 rounded-full">
                        {lang === 'bn' ? 'অমাবস্যা' : 'Amavasya'}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5">
                    {selectedDayData.vara || ''} &bull; {selectedDayData.date}
                  </p>
                </div>

                {onSelectDate && (
                  <button
                    onClick={() => {
                      onSelectDate(parseISO(selectedDayData.date));
                      onClose();
                    }}
                    className="self-start sm:self-center px-3.5 py-1.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
                  >
                    <Sparkles size={13} />
                    {lang === 'bn' ? 'মূল পেজে দেখুন' : 'View on Main Page'}
                  </button>
                )}
              </div>

              {/* Day stats grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                <div className="bg-white/90 p-2.5 rounded-xl border border-stone-200/80">
                  <span className="text-[10px] font-bold uppercase text-stone-400 block">
                    {lang === 'bn' ? 'তিথি' : 'Tithi'}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-stone-800 mt-0.5 block truncate">
                    {getTithiDisplay(selectedDayData.tithi)}
                  </span>
                </div>

                <div className="bg-white/90 p-2.5 rounded-xl border border-stone-200/80">
                  <span className="text-[10px] font-bold uppercase text-stone-400 block">
                    {lang === 'bn' ? 'নক্ষত্র' : 'Nakshatra'}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-stone-800 mt-0.5 block truncate">
                    {getNakshatraDisplay(selectedDayData.nakshatra)}
                  </span>
                </div>

                <div className="bg-white/90 p-2.5 rounded-xl border border-stone-200/80">
                  <span className="text-[10px] font-bold uppercase text-stone-400 block">
                    {lang === 'bn' ? 'যোগ / করণ' : 'Yoga / Karana'}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-stone-800 mt-0.5 block truncate">
                    {selectedDayData.yoga || '-'} &bull; {selectedDayData.karana || '-'}
                  </span>
                </div>

                <div className="bg-white/90 p-2.5 rounded-xl border border-stone-200/80">
                  <span className="text-[10px] font-bold uppercase text-stone-400 block">
                    {lang === 'bn' ? 'সূর্যোদয় / সূর্যাস্ত' : 'Sunrise / Sunset'}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-stone-800 mt-0.5 block truncate">
                    {selectedDayData.sunrise?.slice(0, 5) || '06:15'} &bull; {selectedDayData.sunset?.slice(0, 5) || '18:30'}
                  </span>
                </div>
              </div>

              {/* Rahu Kaal & Brahma Muhurta */}
              {(selectedDayData.brahmaMuhurtaStart || selectedDayData.rahuStart) && (
                <div className="flex flex-wrap gap-2 mt-3 pt-2.5 border-t border-orange-200/50 text-xs">
                  {selectedDayData.brahmaMuhurtaStart && (
                    <div className="bg-purple-100/70 text-purple-900 px-2.5 py-1 rounded-lg font-medium flex items-center gap-1.5">
                      <span>🕉</span>
                      <span>
                        {lang === 'bn' ? 'ব্রহ্ম মুহূর্ত:' : 'Brahma Muhurta:'} {selectedDayData.brahmaMuhurtaStart?.slice(0, 5)} - {selectedDayData.brahmaMuhurtaEnd?.slice(0, 5)}
                      </span>
                    </div>
                  )}
                  {selectedDayData.rahuStart && (
                    <div className="bg-red-100/70 text-red-900 px-2.5 py-1 rounded-lg font-medium flex items-center gap-1.5">
                      <span>⚠️</span>
                      <span>
                        {lang === 'bn' ? 'রাহু কাল:' : 'Rahu Kaal:'} {selectedDayData.rahuStart?.slice(0, 5)} - {selectedDayData.rahuEnd?.slice(0, 5)}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
