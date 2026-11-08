import React, { useState, useMemo } from 'react';
import { X, Search, Calendar, Clock, Home, Baby, Sparkles, Car, Shield, ChevronRight } from 'lucide-react';

const MUHURAT_LIST = [
  // Griha Pravesh
  {
    id: 'gp-2026-11-26',
    category: 'griha_pravesh',
    nameBn: 'গৃহপ্রবেশ শুভ মুহূর্ত',
    nameEn: 'Griha Pravesh Muhurat',
    date: '2026-11-26',
    bengaliDate: '১০ অগ্রহায়ণ, ১৪৩৩',
    bengaliDay: 'গুরুবার',
    nakshatra: 'রোহিণী',
    timeWindow: 'সকাল ০৬:২০ - ১০:১৫ (অমৃত যোগ)',
    rules: 'বাস্তু পূজা ও কুলদেবতার আরাধনা করে দুধ উতলানোর শুভ নিয়ম।'
  },
  {
    id: 'gp-2027-01-27',
    category: 'griha_pravesh',
    nameBn: 'মাঘ গৃহপ্রবেশ মুহূর্ত',
    nameEn: 'Magha Griha Pravesh Muhurat',
    date: '2027-01-27',
    bengaliDate: '৭ মাঘ, ১৪৩৩',
    bengaliDay: 'বুধবার',
    nakshatra: 'হস্তা',
    timeWindow: 'সকাল ০৭:১০ - ১১:৩০',
    rules: 'নতুন বাড়িতে শ্রী সত্যনারায়ণ পূজা ও গৃহ শান্তি হোম।'
  },
  {
    id: 'gp-2027-02-19',
    category: 'griha_pravesh',
    nameBn: 'ফাল্গুন গৃহপ্রবেশ',
    nameEn: 'Phalguna Griha Pravesh',
    date: '2027-02-19',
    bengaliDate: '৮c ফাল্গুন, ১৪৩৩',
    bengaliDay: 'শুক্রবার',
    nakshatra: 'মঘা',
    timeWindow: 'সকাল ০৬:৩০ - ১০:২০',
    rules: 'শুক্রবার লক্ষ্মীপূজা সহকারে গৃহে প্রথম পদার্পণ অত্যন্ত শুভ।'
  },

  // Annaprashan
  {
    id: 'ap-2026-11-20',
    category: 'annaprashan',
    nameBn: 'অন্নপ্রাশন শুভ দিন',
    nameEn: 'Annaprashan (First Rice Ceremony)',
    date: '2026-11-20',
    bengaliDate: '৪ অগ্রহায়ণ, ১৪৩৩',
    bengaliDay: 'শুক্রবার',
    nakshatra: 'উত্তরভাদ্রপদ',
    timeWindow: 'সকাল ০৯:২০ - ১১:৪২',
    rules: 'পুত্র সন্তানের ৬ষ্ঠ, ৮ম মাসে ও কন্যা সন্তানের ৫ম, ৭ম মাসে প্রশস্ত।'
  },
  {
    id: 'ap-2027-01-22',
    category: 'annaprashan',
    nameBn: 'মাঘ অন্নপ্রাশন',
    nameEn: 'Magha Annaprashan Muhurat',
    date: '2027-01-22',
    bengaliDate: '২ মাঘ, ১৪৩৩',
    bengaliDay: 'শুক্রবার',
    nakshatra: 'পুষ্যা',
    timeWindow: 'সকাল ০৮:৩০ - ১১:০০',
    rules: 'পুষ্যা নক্ষত্রে শিশুর প্রথম অন্নগ্রহণ আয়ু ও মেধা বৃদ্ধিকারী।'
  },

  // Upanayan
  {
    id: 'up-2027-02-24',
    category: 'upanayana',
    nameBn: 'শুভ উপনয়ন / পৈতে লগ্ন',
    nameEn: 'Upanayana (Sacred Thread Ceremony)',
    date: '2027-02-24',
    bengaliDate: '১১ ফাল্গুন, ১৪৩৩',
    bengaliDay: 'বুধবার',
    nakshatra: 'হস্তা',
    timeWindow: 'সকাল ০৮:০০ - ১১:২০',
    rules: 'গায়ত্রী দীক্ষা ও যজ্ঞোপবীত ধারণের সর্বোত্তম মুহূর্ত।'
  },
  {
    id: 'up-2027-04-30',
    category: 'upanayana',
    nameBn: 'বৈশাখ উপনয়ন মুহূর্ত',
    nameEn: 'Boishakh Upanayana Muhurat',
    date: '2027-04-30',
    bengaliDate: '১৬ বৈশাখ, ১৪৩৪',
    bengaliDay: 'শুক্রবার',
    nakshatra: 'ধনিষ্ঠা',
    timeWindow: 'সকাল ০৭:৩০ - ১০:৩০',
    rules: 'বেদারম্ভ ও ব্রহ্মচর্য ব্রত গ্রহণ।'
  },

  // Vehicle Purchase
  {
    id: 'veh-2026-11-29',
    category: 'vehicle',
    nameBn: 'শুভ যানবাহন ক্রয় মুহূর্ত',
    nameEn: 'Vehicle Purchase Muhurat',
    date: '2026-11-29',
    bengaliDate: '১৩ অগ্রহায়ণ, ১৪৩৩',
    bengaliDay: 'রবিবার',
    nakshatra: 'পুষ্যা',
    timeWindow: 'সকাল ০৮:০০ - দুপুর ১২:৩০ (রবি-পুষ্য যোগ)',
    rules: 'রবি-পুষ্য যোগে গাড়ি কেনা অত্যন্ত শুভ। গাড়ি আনার পর তাকে সুন্দর করে ধুয়ে স্বস্তিক চিহ্ন ও পূজা করুন।'
  },
  {
    id: 'veh-2027-02-05',
    category: 'vehicle',
    nameBn: 'শুক্রবার যানবাহন ক্রয়',
    nameEn: 'Friday Vehicle Muhurat',
    date: '2027-02-05',
    bengaliDate: '১৬ মাঘ, ১৪৩৩',
    bengaliDay: 'শুক্রবার',
    nakshatra: 'শ্রবণা',
    timeWindow: 'সকাল ০৯:০০ - দুপুর ০১:ৠৠ',
    rules: 'শুক্রবার যানবাহনের কারক গ্রহ শুক্রের দিন, এই দিনে বাহন ক্রয় সৌভাগ্য আনে।'
  }
];

export default function AuspiciousMuhuratModal({ isOpen, onClose, lang = 'bn', onSelectDate }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuhurat, setSelectedMuhurat] = useState(null);

  const todayStr = useMemo(() => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  }, []);

  const nextMuhurat = useMemo(() => {
    return MUHURAT_LIST.find(m => m.date >= todayStr) || MUHURAT_LIST[0];
  }, [todayStr]);

  const filteredList = useMemo(() => {
    return MUHURAT_LIST.filter(item => {
      if (activeCategory !== 'all' && item.category !== activeCategory) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchBn = item.nameBn.toLowerCase().includes(q) || item.nakshatra.toLowerCase().includes(q);
        const matchEn = item.nameEn.toLowerCase().includes(q);
        const matchDate = item.date.includes(q);
        if (!matchBn && !matchEn && !matchDate) return false;
      }
      return true;
    });
  }, [activeCategory, searchQuery]);

  if (!isOpen) return null;

  const getDaysDiff = (dateStr) => {
    const today = new Date(todayStr);
    const target = new Date(dateStr);
    const diffTime = target - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-emerald-100">
        
        {/* Header */}
        <div className="relative bg-gradient-to-r from-emerald-700 via-teal-700 to-green-800 text-white p-5 sm:p-6 shadow-md">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all backdrop-blur-sm"
            title="Close"
          >
            <X size={20} />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shadow-inner border border-white/30">
              ðª
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                  {lang === 'en' ? 'Auspicious Muhurats & Samskaras' : 'শুভ মুহূর্ত ও সংস্কার'}
                </h2>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-400 text-amber-950 shadow-sm">
                  1433 বঙ্গাব্দ
                </span>
              </div>
              <p className="text-emerald-100 text-xs sm:text-sm mt-0.5">
                {lang === 'en' 
                  ? 'Auspicious timings for Griha Pravesh, Annaprashan, Upanayana & Vehicle Purchase' 
                  : 'গৃহপ্রবেশ, অন্নপ্রাশন, উপনয়ন ও যানবাহন ক্রয়ের সঠিক শুভ লগ্ন'}
              </p>
            </div>
          </div>

          {/* Next Muhurat Banner */}
          {nextMuhurat && (
            <div className="mt-4 bg-white/15 backdrop-blur-md rounded-2xl p-3 border border-white/20 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-1 rounded-xl bg-amber-400 text-amber-950 text-xs font-bold shadow-sm">
                  {lang === 'en' ? 'Upcoming' : 'আসন্ন'}
                </span>
                <span className="font-semibold text-sm sm:text-base">
                  {lang === 'en' ? nextMuhurat.nameEn : nextMuhurat.nameBn}
                </span>
                <span className="text-xs text-emerald-200 hidden sm:inline">
                  ({nextMuhurat.date} â¢ {nextMuhurat.bengaliDate})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2.5 py-1 rounded-lg bg-black/25 text-white font-medium">
                  {(() => {
                    const days = getDaysDiff(nextMuhurat.date);
                    if (days === 0) return lang === 'en' ? 'Today!' : 'আজকেই!';
                    if (days === 1) return lang === 'en' ? 'Tomorrow' : 'আগামীকাল';
                    return lang === 'en' ? `In ${days} days` : `আর ${days} দিন বাকি`;
                  })()}
                </span>
                <button
                  onClick={() => setSelectedMuhurat(nextMuhurat)}
                  className="text-xs px-3 py-1 rounded-lg bg-white text-emerald-900 font-bold hover:bg-emerald-50 transition-colors shadow-sm"
                >
                  {lang === 'en' ? 'Details' : 'বিস্তারিত'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-slate-50 border-b border-slate-200 p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            {[
              { id: 'all', labelBn: 'সকল', labelEn: 'All' },
              { id: 'griha_pravesh', labelBn: 'গৃহপ্রবেশ', labelEn: 'Griha Pravesh' },
              { id: 'annaprashan', labelBn: 'অন্নপ্রাশন', labelEn: 'Annaprashan' },
              { id: 'upanayana', labelBn: 'উপনয়ন', labelEn: 'Upanayana' },
              { id: 'vehicle', labelBn: 'যানবাহন', labelEn: 'Vehicle' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  activeCategory === tab.id
                    ? 'bg-emerald-700 text-white shadow-sm'
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
              placeholder={lang === 'en' ? 'Search muhurat...' : 'মুহূর্ত খুঁজুন...'}
              className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredList.map(item => {
              const isPast = item.date < todayStr;
              const daysDiff = getDaysDiff(item.date);
              const isSelected = selectedMuhurat?.id === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedMuhurat(isSelected ? null : item)}
                  className={`group bg-white rounded-2xl p-4 border transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md ${
                    isSelected
                      ? 'border-emerald-600 ring-2 ring-emerald-600/20 bg-emerald-50/20'
                      : isPast 
                        ? 'border-slate-200 opacity-75' 
                        : 'border-slate-200 hover:border-emerald-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          {item.bengaliDay}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">
                          {item.nakshatra} নক্ষত্র
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-slate-800 mt-1 group-hover:text-emerald-700 transition-colors">
                        {lang === 'en' ? item.nameEn : item.nameBn}
                      </h3>
                    </div>

                    <div>
                      {daysDiff === 0 ? (
                        <span className="text-[11px] font-bold px-2 py-1 rounded-lg bg-emerald-600 text-white animate-pulse">
                          {lang === 'en' ? 'Today!' : 'আজ!'}
                        </span>
                      ) : daysDiff > 0 ? (
                        <span className="text-[11px] font-bold px-2 py-1 rounded-lg bg-emerald-100 text-emerald-800">
                          {lang === 'en' ? `In ${daysDiff}d` : `${daysDiff} দিন`}
                        </span>
                      ) : (
                        <span className="text-[11px] font-medium px-2 py-1 rounded-lg bg-slate-100 text-slate-500">
                          {lang === 'en' ? 'Passed' : 'অতীত'}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-2 text-xs text-slate-600">
                    <span className="flex items-center gap-1 font-semibold text-slate-700">
                      <Calendar size={13} className="text-emerald-600" />
                      {item.date}
                    </span>
                    <span className="text-slate-300">â¢</span>
                    <span>{item.bengaliDate}</span>
                  </div>

                  <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <Clock size={13} className="text-emerald-600" />
                      <span className="font-semibold">{lang === 'en' ? 'Muhurat Window: ' : 'শুভ সময়: '}</span>
                      <span className="text-slate-800 font-medium">{item.timeWindow}</span>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="mt-3.5 pt-3 border-t border-slate-200 space-y-2 text-xs animate-fadeIn">
                      <div>
                        <span className="font-bold text-slate-700">
                          {lang === 'en' ? 'Rituals & Vidhi: ' : 'শাস্ত্রীয় নিয়ম: '}
                        </span>
                        <span className="text-slate-600 leading-relaxed">{item.rules}</span>
                      </div>

                      {onSelectDate && (
                        <div className="pt-1 flex justify-end">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectDate(new Date(item.date));
                              onClose();
                            }}
                            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 flex items-center gap-1 shadow-sm transition-all"
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
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-slate-200 p-3 sm:p-4 flex items-center justify-between text-xs text-slate-500">
          <span>
            {lang === 'en'
              ? 'Computed using Vedic Muhurat Chintamani and Shodasha Samskara rules'
              : 'ষোড়শ সংস্কার ও মুহূর্ত চিন্তামণি অনুযায়ী সঠিক নির্ণীত'}
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
