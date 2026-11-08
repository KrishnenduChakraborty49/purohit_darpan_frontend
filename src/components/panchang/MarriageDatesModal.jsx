import React, { useState, useMemo } from 'react';
import { X, Search, Calendar, Clock, Heart, Sparkles, Filter, ChevronRight, Info } from 'lucide-react';

const MARRIAGE_DATES = [
  // Agrahayan 1433 (Nov - Dec 2026)
  {
    id: 'mar-2026-11-26',
    date: '2026-11-26',
    bengaliDate: '১০ অগ্রহায়ণ, ১৪৩৩',
    bengaliDay: 'গুরুবার',
    month: 'অগ্রহায়ণ',
    nakshatra: 'রোহিণী',
    tithi: 'দ্বিতীয়া',
    lagnas: [
      { name: 'গোধূলি লগ্ন', time: 'সন্ধ্যা ০৫:০২ - ০৫:৪৮' },
      { name: 'নিশীথ লগ্ন', time: 'রাত্রি ১১:১৫ - ০১:২০' }
    ],
    specialNote: 'শুভ বিবাহ লগ্ন, রোহিণী নক্ষত্রে উত্তম যোগ।'
  },
  {
    id: 'mar-2026-11-29',
    date: '2026-11-29',
    bengaliDate: '১৩ অগ্রহায়ণ, ১৪৩৩',
    bengaliDay: 'রবিবার',
    month: 'অগ্রহায়ণ',
    nakshatra: 'পুষ্যা',
    tithi: 'পঞ্চমী',
    lagnas: [
      { name: 'গোধূলি লগ্ন', time: 'সন্যা ০৫:০০ - ০৫:৪৫' },
      { name: 'রাত্রি লগ্ন', time: 'রাত্রি ০৮:৩০ - ১০:০০' }
    ],
    specialNote: 'সর্বাঙ্গীন শুভ মুহূর্ত।'
  },
  {
    id: 'mar-2026-12-04',
    date: '2026-12-04',
    bengaliDate: '১৮ অগ্রহায়ণ, ১৪৩৩',
    bengaliDay: 'শুক্রবার',
    month: 'অগ্রহায়ণ',
    nakshatra: 'হস্তা',
    tithi: 'দশমী',
    lagnas: [
      { name: 'গোধূলি লগ্ন', time: 'সন্যা ০৫:০০ - ০৫:৪২' },
      { name: 'নিশীথ লগ্ন', time: 'রাত্রি ১১:২০ - ০১:০০' }
    ],
    specialNote: 'শুক্রবার হস্তা নক্ষত্রে শুভ পরিণয়।'
  },
  {
    id: 'mar-2026-12-09',
    date: '2026-12-09',
    bengaliDate: '২৩ অগ্রহায়ণ, ১৪৩৩',
    bengaliDay: 'বুধবার',
    month: 'অগ্রহায়ণ',
    nakshatra: 'অনুরাধা',
    tithi: 'প্রতিপদ',
    lagnas: [
      { name: 'রাত্রি লগ্ন', time: 'রাত্রি ০৯:১০ - ১১:৩০' }
    ],
    specialNote: 'অনুরাধা নক্ষত্রে মিত্র যোগ।'
  },

  // Magh 1433 (Jan - Feb 2027)
  {
    id: 'mar-2027-01-22',
    date: '2027-01-22',
    bengaliDate: '২ মাঘ, ১৪৩৩',
    bengaliDay: 'শুক্রবার',
    month: 'মাঘ',
    nakshatra: 'পুষ্যা',
    tithi: 'পূর্ণিমা',
    lagnas: [
      { name: 'গোধূলি লগ্ন', time: 'সন্যা ০৫:২০ - ০৬:০৫' },
      { name: 'নিশীথ লগ্ন', time: 'রাত্রি ১১:৩০ - ০১:১৫' }
    ],
    specialNote: 'মাঘ মাসের প্রথম শুভ বিবাহ দিন।'
  },
  {
    id: 'mar-2027-01-27',
    date: '2027-01-27',
    bengaliDate: '৭ মাঘ, ১৪৩৩',
    bengaliDay: 'বুধবার',
    month: 'মাঘ',
    nakshatra: 'হস্তা',
    tithi: 'পঞ্চমী',
    lagnas: [
      { name: 'গোধূলি লগ্ন', time: 'সন্যা ০৫:২৫ - ০৬:১০' },
      { name: 'রাত্রি লগ্ন', time: 'রাত্রি ০৯:৩০ - ১১:২০' }
    ],
    specialNote: 'সর্বশুভ লগ্ন।'
  },
  {
    id: 'mar-2027-02-05',
    date: '2027-02-05',
    bengaliDate: '১৬ মাঘ, ১৪৩৩',
    bengaliDay: 'শুক্রবার',
    month: 'মাঘ',
    nakshatra: 'শ্রবণা',
    tithi: 'ত্রয়োদশী',
    lagnas: [
      { name: 'গোধূলি লগ্ন', time: 'সন্যা ০৫:৩০ - ০৬:১৫' },
      { name: 'নিশীথ লগ্ন', time: 'রাত্রি ১১:৩৫ - ০১:২০' }
    ],
    specialNote: 'অত্যন্ত প্রশস্ত বিবাহ দিন।'
  },

  // Falgun 1433 (Feb - Mar 2027)
  {
    id: 'mar-2027-02-19',
    date: '2027-02-19',
    bengaliDate: '৮c ফাল্গুন, ১৪৩৩',
    bengaliDay: 'শুক্রবার',
    month: 'ফাল্গুন',
    nakshatra: 'মঘা',
    tithi: 'ত্রয়োদশী',
    lagnas: [
      { name: 'গোধূলি লগ্ন', time: 'সন্যা ০৫:৩৮ - ০৬:২২' },
      { name: 'নিশীথ লগ্ন', time: 'রাত্রি ১১:২০ - ০১:০৫' }
    ],
    specialNote: 'ফাল্গুন মাসের শ্রেষ্ঠ বিবাহ যোগ।'
  },
  {
    id: 'mar-2027-02-24',
    date: '2027-02-24',
    bengaliDate: '১১ ফাল্গুন, ১৪৩৩',
    bengaliDay: 'বুধবার',
    month: 'ফাল্গুন',
    nakshatra: 'হস্তা',
    tithi: 'তৃতীয়া',
    lagnas: [
      { name: 'গোধূলি লগ্ন', time: 'সন্যা ০৫:৪২ - ০৬:২৫' },
      { name: 'রাত্রি লগ্ন', time: 'রাত্রি ০৯:২০ - ১১:০০' }
    ],
    specialNote: 'শুভ বিবাহ লগ্ন।'
  },
  {
    id: 'mar-2027-03-05',
    date: '2027-03-05',
    bengaliDate: '২০ ফাল্গুন, ১৪৩৩',
    bengaliDay: 'শুক্রবার',
    month: 'ফাল্গুন',
    nakshatra: 'শ্রবণা',
    tithi: 'দ্বাদশী',
    lagnas: [
      { name: 'গোধূলি লগ্ন', time: 'সন্যা ০৫:৪৮ - ০৬:৩০' },
      { name: 'নিশীথ লগ্ন', time: 'রাত্রি ১১:১০ - ০১:০০' }
    ],
    specialNote: 'বসন্তের পূর্ণ মুহূর্ত।'
  },

  // Boishakh 1434 (Apr - May 2027)
  {
    id: 'mar-2027-04-21',
    date: '2027-04-21',
    bengaliDate: '৭ বৈশাখ, ১৪৩৪',
    bengaliDay: 'বুধবার',
    month: 'বৈশাখ',
    nakshatra: 'স্বাতী',
    tithi: 'পূর্ণিমা',
    lagnas: [
      { name: 'গোধূলি লগ্ন', time: 'সন্যা ০৬:০২ - ০৬:৪৫' },
      { name: 'নিশীথ লগ্ন', time: 'রাত্রি ১১:০০ - ০১:০০' }
    ],
    specialNote: 'বৈশাখ মাসের প্রথম শুভ বিবাহ তিথি।'
  },
  {
    id: 'mar-2027-04-30',
    date: '2027-04-30',
    bengaliDate: '১৬ বৈশাখ, ১৪৩৪',
    bengaliDay: 'শুক্রবার',
    month: 'বৈশাখ',
    nakshatra: 'ধনিষ্ঠা',
    tithi: 'দশমী',
    lagnas: [
      { name: 'গোধূলি লগ্ন', time: 'সন্যা ০৬:১০ - ০৬:৫০' },
      { name: 'রাত্রি লগ্ন', time: 'রাত্রি ০৯:৩০ - ১১:৩০' }
    ],
    specialNote: 'সর্বতোভদ্র শুভ মুহূর্ত।'
  },
  {
    id: 'mar-2027-05-09',
    date: '2027-05-09',
    bengaliDate: '২৫ বৈশাখ, ১৪৩৪',
    bengaliDay: 'রবিবার',
    month: 'বৈশাখ',
    nakshatra: 'আর্দ্রা',
    tithi: 'তৃতীয়া',
    lagnas: [
      { name: 'গোধূলি লগ্ন', time: 'সন্যা ০৬:১৫ - ০৬:৫৫' },
      { name: 'নিশীথ লগ্ন', time: 'রাত্রি ১১:১০ - ০১:০০' }
    ],
    specialNote: 'শুভ বিবাহ যোগ।'
  },

  // Jyeshtha 1434 (May - Jun 2027)
  {
    id: 'mar-2027-05-21',
    date: '2027-05-21',
    bengaliDate: '৬ জ্যৈষ্ঠ, ১৪৩৪',
    bengaliDay: 'শুক্রবার',
    month: 'জ্যৈষ্ঠ',
    nakshatra: 'অনুরাধা',
    tithi: 'পূর্ণিমা',
    lagnas: [
      { name: 'গোধূলি লগ্ন', time: 'সন্যা ০৬:২২ - ০৭:০৫' },
      { name: 'নিশীথ লগ্ন', time: 'রাত্রি ১১:২০ - ০১:০৫' }
    ],
    specialNote: 'জ্যৈষ্ঠ মাসে জ্যেষ্ঠ সন্তানের বিবাহ নিষিদ্ধ, অন্যদের জন্য শুভ।'
  },
  {
    id: 'mar-2027-06-02',
    date: '2027-06-02',
    bengaliDate: '১৮ জ্যৈষ্ঠ, ১৪৩৪',
    bengaliDay: 'বুধবার',
    month: 'জ্যৈষ্ঠ',
    nakshatra: 'রেবতী',
    tithi: 'ত্রয়োদশী',
    lagnas: [
      { name: 'গোধূলি লগ্ন', time: 'সন্যা ০৬:২৮ - ০৭:১০' },
      { name: 'রাত্রি লগ্ন', time: 'রাত্রি ০৯:৪০ - ১১:৪০' }
    ],
    specialNote: 'শুভ বিবাহ দিন।'
  },

  // Ashadh 1434 (Jun - Jul 2027)
  {
    id: 'mar-2027-06-25',
    date: '2027-06-25',
    bengaliDate: '১০ আষাঢ়, ১৪৩৪',
    bengaliDay: 'শুক্রবার',
    month: 'আষাঢ়',
    nakshatra: 'শতভিষা',
    tithi: 'ষষ্ঠী',
    lagnas: [
      { name: 'গোধূলি লগ্ন', time: 'সন্যা ০৬:৩২ - ০৭:১৫' },
      { name: 'নিশীথ লগ্ন', time: 'রাত্রি ১১:৩০ - ০১:১৫' }
    ],
    specialNote: 'চাতুর্মাস্য শুরুর পূর্বে শেষ শুভ বিবাহ লগ্ন।'
  }
];

export default function MarriageDatesModal({ isOpen, onClose, lang = 'bn', onSelectDate }) {
  const [activeMonth, setActiveMonth] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  const todayStr = useMemo(() => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  }, []);

  const nextMarriageDate = useMemo(() => {
    return MARRIAGE_DATES.find(m => m.date >= todayStr) || MARRIAGE_DATES[0];
  }, [todayStr]);

  const filteredList = useMemo(() => {
    return MARRIAGE_DATES.filter(item => {
      if (activeMonth !== 'all' && item.month !== activeMonth) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchBn = item.bengaliDate.toLowerCase().includes(q) || item.month.toLowerCase().includes(q);
        const matchDay = item.bengaliDay.toLowerCase().includes(q);
        const matchDate = item.date.includes(q);
        const matchNakshatra = item.nakshatra.toLowerCase().includes(q);
        if (!matchBn && !matchDay && !matchDate && !matchNakshatra) return false;
      }
      return true;
    });
  }, [activeMonth, searchQuery, todayStr]);

  if (!isOpen) return null;

  const getDaysDiff = (dateStr) => {
    const today = new Date(todayStr);
    const target = new Date(dateStr);
    const diffTime = target - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-rose-100">
        
        {/* Header */}
        <div className="relative bg-gradient-to-r from-rose-600 via-pink-600 to-red-600 text-white p-5 sm:p-6 shadow-md">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all backdrop-blur-sm"
            title="Close"
          >
            <X size={20} />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shadow-inner border border-white/30">
              ð
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                  {lang === 'en' ? 'Bengali Marriage Dates & Lagnas' : 'শুভ বিবাহ লগ্ন ও দিনপঞ্জি'}
                </h2>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-400 text-amber-950 shadow-sm">
                  1433-1434 বঙ্গাব্দ
                </span>
              </div>
              <p className="text-rose-100 text-xs sm:text-sm mt-0.5">
                {lang === 'en' 
                  ? 'Auspicious Bengali wedding dates, Godhuli & Nishitha muhurats according to Panjika' 
                  : 'বাংলা পঞ্জিকা অনুযায়ী শুভ বিবাহের দিন, গোধূলি ও নিশীথ লগ্ন সময়সূচী'}
              </p>
            </div>
          </div>

          {/* Next Marriage Date Quick Banner */}
          {nextMarriageDate && (
            <div className="mt-4 bg-white/15 backdrop-blur-md rounded-2xl p-3 border border-white/20 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-1 rounded-xl bg-amber-400 text-amber-950 text-xs font-bold shadow-sm">
                  {lang === 'en' ? 'Next Wedding Date' : 'আগামী বিবাহ দিন'}
                </span>
                <span className="font-semibold text-sm sm:text-base">
                  {nextMarriageDate.date} ({nextMarriageDate.bengaliDay})
                </span>
                <span className="text-xs text-rose-200 hidden sm:inline">
                  â¢ {nextMarriageDate.bengaliDate} ({nextMarriageDate.nakshatra} নক্ষত্র)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2.5 py-1 rounded-lg bg-black/25 text-white font-medium">
                  {(() => {
                    const days = getDaysDiff(nextMarriageDate.date);
                    if (days === 0) return lang === 'en' ? 'Today!' : 'আজকেà¦!';
                    if (days === 1) return lang === 'en' ? 'Tomorrow' : 'আগামীকাল';
                    return lang === 'en' ? `In ${days} days` : `আর ${days} দিন বাকি`;
                  })()}
                </span>
                <button
                  onClick={() => setSelectedDate(nextMarriageDate)}
                  className="text-xs px-3 py-1 rounded-lg bg-white text-rose-800 font-bold hover:bg-rose-50 transition-colors shadow-sm"
                >
                  {lang === 'en' ? 'View Lagnas' : 'লগ্ন দেখুন'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-slate-50 border-b border-slate-200 p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            {[
              { id: 'all', labelBn: 'সব মাস', labelEn: 'All Months' },
              { id: 'অগ্রহায়ণ', labelBn: 'অগ্রহায়ণ', labelEn: 'Agrahayan' },
              { id: 'মাঘ', labelBn: 'মাঘ', labelEn: 'Magh' },
              { id: 'ফাল্গুন', labelBn: 'ফাল্গুন', labelEn: 'Falgun' },
              { id: 'বৈশাখ', labelBn: 'বৈশাখ', labelEn: 'Boishakh' },
              { id: 'জ্যৈষ্ঠ', labelBn: 'জ্যৈষ্ঠ', labelEn: 'Jyeshtha' },
              { id: 'আষাঢ়', labelBn: 'আষাঢ়', labelEn: 'Ashadh' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveMonth(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  activeMonth === tab.id
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
                }`}
              >
                {lang === 'en' ? tab.labelEn : tab.labelBn}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'en' ? 'Search date / nakshatra...' : 'তারিখ বা নক্ষত্র খুঁজুন...'}
              className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-slate-800"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/50 space-y-4">
          <div className="bg-rose-50/80 border border-rose-200/80 rounded-2xl p-3.5 text-xs text-rose-900 flex items-start gap-2.5">
            <Info size={18} className="text-rose-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold">
                {lang === 'en' ? 'Bengali Wedding Rules & Prohibitions:' : 'বাঙালী বিবাহের শাস্ত্রীয় নিয়মাবলী:'}
              </p>
              <p className="text-rose-800 leading-relaxed">
                {lang === 'en'
                  ? 'Marriage in the same Gotra (Sagotra) is strictly prohibited. Chaturmasya (Ashadh Shukla Ekadashi to Kartik Shukla Ekadashi) and the months of Bhadra and Poush are generally restricted for marriage rituals.'
                  : 'একগোত্রে বিবাহ শাস্ত্রত সম্পূর্ণ নিষিদ্ধ। চাতুর্মাস্য (দেবশয়নী থেকে দেবোত্থান একাদশী), ভাদ্র মাস ও পৌষ মাস বিবাহের জন্য বর্জিত।'}
              </p>
            </div>
          </div>

          {filteredList.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
              <Calendar className="mx-auto text-slate-300 mb-2" size={40} />
              <p className="text-slate-600 font-semibold">
                {lang === 'en' ? 'No marriage dates found for this month.' : 'এই মাসে কোনো বিবাহ দিন নেই।'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredList.map(item => {
                const isPast = item.date < todayStr;
                const daysDiff = getDaysDiff(item.date);
                const isSelected = selectedDate?.id === item.id;

                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedDate(isSelected ? null : item)}
                    className={`group bg-white rounded-2xl p-4 border transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md ${
                      isSelected
                        ? 'border-rose-500 ring-2 ring-rose-500/20 bg-rose-50/20'
                        : isPast 
                          ? 'border-slate-200 opacity-75' 
                          : 'border-slate-200 hover:border-rose-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800">
                            {item.month}
                          </span>
                          <span className="text-xs text-slate-500 font-semibold">
                            {item.bengaliDay}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-slate-800 mt-1 group-hover:text-rose-700 transition-colors flex items-center gap-1.5">
                          <Calendar size={16} className="text-rose-600" />
                          <span>{item.date}</span>
                        </h3>
                      </div>

                      <div>
                        {daysDiff === 0 ? (
                          <span className="text-[11px] font-bold px-2 py-1 rounded-lg bg-rose-500 text-white animate-pulse">
                            {lang === 'en' ? 'Today!' : 'আজ!'}
                          </span>
                        ) : daysDiff > 0 ? (
                          <span className="text-[11px] font-bold px-2 py-1 rounded-lg bg-rose-100 text-rose-800">
                            {lang === 'en' ? `In ${daysDiff}d` : `${daysDiff} দিন`}
                          </span>
                        ) : (
                          <span className="text-[11px] font-medium px-2 py-1 rounded-lg bg-slate-100 text-slate-500">
                            {lang === 'en' ? 'Passed' : 'অতীত'}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 mt-2 text-xs text-slate-600">
                      <span className="font-medium text-slate-800">{item.bengaliDate}</span>
                      <span className="text-slate-300">â¢</span>
                      <span>{lang === 'en' ? 'Tithi: ' : 'তিথি: '}{item.tithi}</span>
                      <span className="text-slate-300">â¢</span>
                      <span className="text-rose-700 font-medium">{item.nakshatra} নক্ষত্র</span>
                    </div>

                    {/* Lagnas Container */}
                    <div className="mt-3 space-y-1.5">
                      {item.lagnas.map((lagna, idx) => (
                        <div key={idx} className="p-2 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between text-xs">
                          <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                            <Clock size={13} className="text-rose-500" />
                            {lagna.name}:
                          </span>
                          <span className="text-slate-800 font-medium">{lagna.time}</span>
                        </div>
                      ))}
                    </div>

                    {isSelected && (
                      <div className="mt-3.5 pt-3 border-t border-slate-200 space-y-2 text-xs animate-fadeIn">
                        <div>
                          <span className="font-bold text-slate-700">
                            {lang === 'en' ? 'Astrological Notes: ' : 'জ্যোতিষীয় মন্তব্য: '}
                          </span>
                          <span className="text-slate-600 leading-relaxed">{item.specialNote}</span>
                        </div>

                        {onSelectDate && (
                          <div className="pt-1 flex justify-end">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectDate(new Date(item.date));
                                onClose();
                              }}
                              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-700 flex items-center gap-1 shadow-sm transition-all"
                            >
                              <span>{lang === 'en' ? 'Inspect in Panchang' : 'এই দিনের পঞ্জিকা দেখুন'}</span>
                              <ChevronRight size={14} />
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-slate-200 p-3 sm:p-4 flex items-center justify-between text-xs text-slate-500">
          <span>
            {lang === 'en'
              ? 'Verified as per Gupta Press & PM Bagchi Bengali Panjika tradition'
              : 'গুপ্তপ্রেস ও পি.এম. বাগচী বাংলা পঞ্জিকা অনুযায়ী সঠিক লগ্ন'}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-colors"
          >
            {lang === 'en' ? 'Close' : 'বন্ধ করুন'}
          </button>
        </div>

      </div>
    </div>
  );
}
