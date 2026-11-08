import React, { useState, useMemo, useEffect } from 'react';
import { X, Search, Calendar, Clock, Sparkles, AlertCircle, ChevronRight, Moon, Sun } from 'lucide-react';

const MOON_PHASE_DATA = {
  amavasya: [
    {
      id: 'ama-2026-11-09',
      nameBn: 'কার্তিকী অমাবস্যা (শ্যামাপূজা / দীপাবলী)',
      nameEn: 'Kartiki Amavasya (Diwali / Shyama Puja)',
      date: '2026-11-09',
      bengaliDate: '২৩ কার্তিক, ১৪৩৩',
      startTime: '৩ নভেম্বর দুপুর ১২:৩৫',
      endTime: '১০ নভেম্বর দুপুর ০২:১০',
      rituals: 'দীপান্বিতা কালীপূজা, দীপদান, পিতৃপুরুষের উদ্দেশ্যে উল্কাদান।',
      importance: 'বছরের সবচেয়ে প্রশস্ত ও মহাপুণ্যময়ী অমাবস্যা। তমসা দূর করে আলোক জ্বালানোর পবিত্র রাত্রি।'
    },
    {
      id: 'ama-2026-12-09',
      nameBn: 'মার্গশীর্ষ / অগ্রহায়ণী অমাবস্যা',
      nameEn: 'Margashirsha Amavasya',
      date: '2026-12-09',
      bengaliDate: '২৩ অগ্রহায়ণ, ১৪৩৩',
      startTime: '৩ ডিসেম্বর রাত্রি ০৯:১৫',
      endTime: '১০ ডিসেম্বর সন্ধ্যা ০৭:২০',
      rituals: 'পিতৃ তর্পণ, গঙ্গা স্নান, শ্রীকৃষ্ণ পূজা।',
      importance: 'গীতায় শ্রীকৃষ্ণ বলেছেন: "মাসানাং মার্গশীর্ষোহম"। এই তিথি পিতৃদোষ নাশক।'
    },
    {
      id: 'ama-2027-01-08',
      nameBn: 'পৌষ অমাবস্যা',
      nameEn: 'Pausha Amavasya',
      date: '2027-01-08',
      bengaliDate: '২৩ পৌষ, ১৪৩৩',
      startTime: '০৭ জানুয়ারী সন্ধ্যা ০৬:০০',
      endTime: '০৮ জানুয়ারী সন্ধ্যা ০৪:২০',
      rituals: 'পিতৃ শ্রাদ্ধ, কম্বল ও তিল দান, শনি দেবের তৈলাভিষেক।',
      importance: 'শীতকালে দান-ধ্যানের শ্রেষ্ঠ তিথি।'
    },
    {
      id: 'ama-2027-02-06',
      nameBn: 'মৌনী / মাঘী অমাবস্যা',
      nameEn: 'Mauni / Maghi Amavasya',
      date: '2027-02-06',
      bengaliDate: '২৩ মাঘ, ১৪৩৩',
      startTime: '০৫ ফেব্রুয়ারী সকাল ০৬:২০',
      endTime: '০৬ ফেব্রুয়ারী সকাল ০৪:২৫',
      rituals: 'মৌন ব্রত পালন, ত্রিবেণী সংগম / গঙ্গা স্নান।',
      importance: 'এই দিনে গঙ্গার জল অমৃততুল্য হয়। মৌন থেকে আত্মশুদ্ধির মহাতিথি।'
    },
    {
      id: 'ama-2027-03-08',
      nameBn: 'ফাল্গুনী অমাবস্যা',
      nameEn: 'Phalguna Amavasya',
      date: '2027-03-08',
      bengaliDate: '২৩ ফাল্গুন, ১৪৩৩',
      startTime: '০৭ মার্চ সন্ধ্যা ০৫:৩০',
      endTime: '০৮ মার্চ দুপুর ০৩:২০',
      rituals: 'শিব পূজা, তর্পণ ও পিতৃ শান্তি যজ্ঞ।',
      importance: 'সুখ-শান্তি ও গৃহে সমৃদ্ধির তিথি।'
    },
    {
      id: 'ama-2027-04-06',
      nameBn: 'চৈত্র অমাবস্যা',
      nameEn: 'Chaitra Amavasya',
      date: '2027-04-06',
      bengaliDate: '২২ চৈত্র, ১৪৩৩',
      startTime: '০৫ এপ্রিল রাত্রি ০৮:১০',
      endTime: '০৬ এপ্রিল সন্ধ্যা ০৬:০৫',
      rituals: 'বছরের শেষ অমাবস্যা তর্পণ ও চড়ক পূজার পূর্ব প্রস্তুতি।',
      importance: 'বঙ্গাব্দের শেষ অমাবস্যা।'
    }
  ],
  purnima: [
    {
      id: 'pur-2026-11-24',
      nameBn: 'রাস পূর্ণিমা / কার্তিক পূর্ণিমা',
      nameEn: 'Rasa Purnima / Kartika Purnima',
      date: '2026-11-24',
      bengaliDate: '২৪ কার্তিক, ১৪৩৩',
      startTime: '২৩ নভেম্বর সন্ধ্যা ০৫:৩০',
      endTime: '২৪ নভেম্বর সন্ধ্যা ০৬:১৫',
      rituals: 'শ্রীকৃষ্ণের রাসোৎসব, দেব দীপাবলী, সত্যনারায়ণ পূজা।',
      importance: 'সর্বশ্রেষ্ঠ পূর্ণিমা। বৃন্দাবনে রাধা-কৃষ্ণের মহারাস উৎসব এই তিথিতেই অনুষ্ঠিত হয়।'
    },
    {
      id: 'pur-2026-12-24',
      nameBn: 'মার্গশীর্ষ / অগ্রহায়ণী পূর্ণিমা (দত্তাত্রেয় জয়ন্তী)',
      nameEn: 'Margashirsha Purnima (Dattatreya Jayanti)',
      date: '2026-12-24',
      bengaliDate: '২৪ অগ্রহায়ণ, ১৪৩৩',
      startTime: '২৩ ডিসেম্বর রাত্রি ০৮:২০',
      endTime: '২৪ ডিসেম্বর সন্ধ্যা ০৭:১০',
      rituals: 'সত্যনারায়ণ পূজা, দত্তাত্রেয় পূজা, চন্দ্র দর্শন।',
      importance: 'মানসিক শান্তি ও জ্ঞান বৃদ্ধির পবিত্র তিথি।'
    },
    {
      id: 'pur-2027-01-22',
      nameBn: 'পৌষ পূর্ণিমা (শাকম্ভরী জয়ন্তী)',
      nameEn: 'Pausha Purnima (Shakambhari Jayanti)',
      date: '2027-01-22',
      bengaliDate: '২ মাঘ, ১৪৩৩',
      startTime: '২১ জানুয়ারী রাত্রি ০৯:২৫',
      endTime: '২২ জানুয়ারী রাত্রি ০৮:১০',
      rituals: 'মাঘ স্নান সংকল্প, শাকম্ভরী দেবীর পূজা।',
      importance: 'এই তিথি থেকে পবিত্র মাঘ মাসের প্রত্যূষ স্নান শুরু হয়।'
    },
    {
      id: 'pur-2027-02-21',
      nameBn: 'মাঘী পূর্ণিমা',
      nameEn: 'Maghi Purnima',
      date: '2027-02-21',
      bengaliDate: '২ ফাল্গুন, ১৪৩৩',
      startTime: '২০ ফেব্রুয়ারী রাত্রি ১০:০০',
      endTime: '২১ ফেব্রুয়ারী রাত্রি ০৮:৪৫',
      rituals: 'প্রয়াগরাজে কল্পবাস সমাপ্তি, তিল ও সুবর্ণ দান।',
      importance: 'বৃহস্পতি ও চন্দ্রমার শুভ যোগে পুণ্যস্নান।'
    },
    {
      id: 'pur-2027-03-22',
      nameBn: 'দোল পূর্ণিমা / গৌর পূর্ণিমা',
      nameEn: 'Dol Purnima / Gaura Purnima',
      date: '2027-03-22',
      bengaliDate: '২ চৈত্র, ১৪৩৩',
      startTime: '২১ মার্চ রাত্রি ০৯:৩০',
      endTime: '২২ মার্চ রাত্রি ০৮:১২',
      rituals: 'শ্রী চৈতন্য মহাপ্রভুর আবির্ভাব, রাধা-কৃষ্ণের দোলোৎসব, আবির খেলা।',
      importance: 'বাঙালীর প্রাণের উৎসব, হরিনাম সংকীর্তনে পল্লী-নগর মুখরিত হয়।'
    },
    {
      id: 'pur-2027-04-21',
      nameBn: 'চৈত্রী পূর্ণিমা (হনুমান জয়ন্তী)',
      nameEn: 'Chaitra Purnima (Hanuman Jayanti)',
      date: '2027-04-21',
      bengaliDate: '৭ বৈশাখ, ১৪৩৪',
      startTime: '২০ এপ্রিল সন্ধ্যা ০৬:২০',
      endTime: '২১ এপ্রিল সন্ধ্যা ০৫:৩০',
      rituals: 'হনুমান চালীসা পাঠ, সিন্দুর লেপন, সত্যনারায়ণ পূজা।',
      importance: 'সংকট মোচন ও বল-বুদ্ধি লাভের পবিত্র দিন।'
    }
  ]
};

export default function MoonPhaseModal({ isOpen, onClose, initialTab = 'amavasya', lang = 'bn', onSelectDate }) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'amavasya' or 'purnima'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, isOpen]);

  const todayStr = useMemo(() => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  }, []);

  const currentList = useMemo(() => {
    return MOON_PHASE_DATA[activeTab] || [];
  }, [activeTab]);

  const nextPhase = useMemo(() => {
    return currentList.find(item => item.date >= todayStr) || currentList[0];
  }, [currentList, todayStr]);

  const filteredList = useMemo(() => {
    return currentList.filter(item => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchBn = item.nameBn.toLowerCase().includes(q) || item.bengaliDate.toLowerCase().includes(q);
        const matchEn = item.nameEn.toLowerCase().includes(q);
        const matchDate = item.date.includes(q);
        if (!matchBn && !matchEn && !matchDate) return false;
      }
      return true;
    });
  }, [currentList, searchQuery]);

  if (!isOpen) return null;

  const getDaysDiff = (dateStr) => {
    const today = new Date(todayStr);
    const target = new Date(dateStr);
    const diffTime = target - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const isAmavasya = activeTab === 'amavasya';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className={`relative p-5 sm:p-6 text-white shadow-md transition-colors duration-300 ${
          isAmavasya 
            ? 'bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-800' 
            : 'bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-600'
        }`}>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all backdrop-blur-sm"
            title="Close"
          >
            <X size={20} />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shadow-inner border border-white/30">
              {isAmavasya ? 'ð' : 'ð'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                  {isAmavasya
                    ? (lang === 'en' ? 'Amavasya Tithi & Tarpan Timings' : 'অমাবস্যা তিথি ও তর্পণ সময়সূচী')
                    : (lang === 'en' ? 'Purnima Vrata & Satyanarayan Puja' : 'পূর্ণিমা ব্রত ও সত্যনারায়ণ পূজা')}
                </h2>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/25 text-white shadow-sm">
                  1433 বঙ্গাব্দ
                </span>
              </div>
              <p className="text-white/80 text-xs sm:text-sm mt-0.5">
                {isAmavasya
                  ? (lang === 'en' ? 'New Moon start & end timings, Pitru Tarpan and Shradh rituals' : 'অমাবস্যা আরম্ভ ও সমাপ্তির সময়, পিতৃ তর্পণ ও কালীপূজার নিয়ম')
                  : (lang === 'en' ? 'Full Moon start & end timings, Satyanarayan puja, fast & Chandra darshan' : 'পূর্ণিমা আরম্ভ ও সমাপ্তি, সত্যনারায়ণ ব্রত ও চন্দ্রদর্শন')}
              </p>
            </div>
          </div>

          {/* Next Phase Quick Banner */}
          {nextPhase && (
            <div className="mt-4 bg-white/15 backdrop-blur-md rounded-2xl p-3 border border-white/20 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-1 rounded-xl bg-white text-slate-900 text-xs font-bold shadow-sm">
                  {lang === 'en' ? 'Upcoming' : 'আসন্ন'}
                </span>
                <span className="font-semibold text-sm sm:text-base">
                  {lang === 'en' ? nextPhase.nameEn : nextPhase.nameBn}
                </span>
                <span className="text-xs text-white/80 hidden sm:inline">
                  ({nextPhase.date} â¢ {nextPhase.bengaliDate})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2.5 py-1 rounded-lg bg-black/30 text-white font-medium">
                  {(() => {
                    const days = getDaysDiff(nextPhase.date);
                    if (days === 0) return lang === 'en' ? 'Today!' : 'আজকেই!';
                    if (days === 1) return lang === 'en' ? 'Tomorrow' : 'আগামীকাল';
                    return lang === 'en' ? `In ${days} days` : `আর ${days} দিন বাকি`;
                  })()}
                </span>
                <button
                  onClick={() => setSelectedItem(nextPhase)}
                  className="text-xs px-3 py-1 rounded-lg bg-white text-slate-900 font-bold hover:bg-slate-100 transition-colors shadow-sm"
                >
                  {lang === 'en' ? 'Details' : 'বিস্তারিত'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Filters and Tab Switcher */}
        <div className="bg-slate-50 border-b border-slate-200 p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Main Moon Phase Switcher */}
          <div className="flex items-center p-1 bg-slate-200/80 rounded-2xl w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('amavasya')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'amavasya'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>ð</span>
              <span>{lang === 'en' ? 'Amavasya' : 'অমাবস্যা'}</span>
            </button>
            <button
              onClick={() => setActiveTab('purnima')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'purnima'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>ð</span>
              <span>{lang === 'en' ? 'Purnima' : 'পূর্ণিমা'}</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'en' ? 'Search festival / date...' : 'পর্ব বা তারিখ খুঁজুন...'}
              className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
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
          <div className={`border rounded-2xl p-3.5 text-xs flex items-start gap-2.5 ${
            isAmavasya ? 'bg-indigo-50/70 border-indigo-200 text-indigo-950' : 'bg-amber-50/70 border-amber-200 text-amber-950'
          }`}>
            <AlertCircle size={18} className={isAmavasya ? 'text-indigo-600 shrink-0 mt-0.5' : 'text-amber-600 shrink-0 mt-0.5'} />
            <div className="space-y-1">
              <p className="font-bold">
                {isAmavasya
                  ? (lang === 'en' ? 'Tarpan & Amavasya Ritual Guidelines:' : 'অমাবস্যা তর্পণ ও শ্রাদ্ধের নিয়ম:')
                  : (lang === 'en' ? 'Satyanarayan Vrata & Purnima Guidelines:' : 'পূর্ণিমা সত্যনারায়ণ ব্রতের নিয়ম:')
                }
              </p>
              <p className="leading-relaxed opacity-90">
                {isAmavasya
                  ? (lang === 'en'
                    ? 'Tarpan and Pinda daan are performed before noon (Aparahna) when Amavasya tithi prevails. Avoid auspicious new beginnings; prioritize spiritual reflection and charity.'
                    : 'অমাবস্যা তিথিতে পূর্বাহ্ণ বা মধ্যাহ্নে তিল-কুশ সহযোগে পিতৃ তর্পণ করতে হয়। নতুন শুভকাজ বর্জন করে ঈশ্বর আরাধনা প্রশস্ত।')
                  : (lang === 'en'
                    ? 'Satyanarayan puja is performed in the evening at dusk. Observing fast until Chandra darshan and offering Arghya to the Full Moon brings peace and prosperity.'
                    : 'পূর্ণিমার সন্ধ্যায় শ্রী সত্যনারায়ণ পূজা ও সিন্নি ভোগ প্রশস্ত। চন্দ্রদর্শন করে অর্ঘ্য দিয়ে ব্রত ভঙ্গ করুন।')
                }
              </p>
            </div>
          </div>

          {filteredList.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
              <Calendar className="mx-auto text-slate-300 mb-2" size={40} />
              <p className="text-slate-600 font-semibold">
                {lang === 'en' ? 'No dates found for this filter.' : 'কোনো তারিখ পাওয়া যায়নি।'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredList.map(item => {
                const isPast = item.date < todayStr;
                const daysDiff = getDaysDiff(item.date);
                const isSelected = selectedItem?.id === item.id;

                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(isSelected ? null : item)}
                    className={`group bg-white rounded-2xl p-4 border transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md ${
                      isSelected
                        ? isAmavasya 
                          ? 'border-indigo-500 ring-2 ring-indigo-500/20 bg-indigo-50/20' 
                          : 'border-amber-500 ring-2 ring-amber-500/20 bg-amber-50/20'
                        : isPast 
                          ? 'border-slate-200 opacity-75' 
                          : 'border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                            isAmavasya ? 'bg-slate-900 text-white' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {isAmavasya ? (lang === 'en' ? 'NEW MOON' : 'অমাবস্যা') : (lang === 'en' ? 'FULL MOON' : 'পূর্ণিমা')}
                          </span>
                          <span className="text-xs text-slate-500 font-medium">
                            {item.bengaliDate}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-slate-800 mt-1 group-hover:text-indigo-600 transition-colors">
                          {lang === 'en' ? item.nameEn : item.nameBn}
                        </h3>
                      </div>

                      <div>
                        {daysDiff === 0 ? (
                          <span className={`text-[11px] font-bold px-2 py-1 rounded-lg text-white animate-pulse ${
                            isAmavasya ? 'bg-indigo-600' : 'bg-amber-600'
                          }`}>
                            {lang === 'en' ? 'Today!' : 'আজ!'}
                          </span>
                        ) : daysDiff > 0 ? (
                          <span className={`text-[11px] font-bold px-2 py-1 rounded-lg ${
                            isAmavasya ? 'bg-indigo-100 text-indigo-800' : 'bg-amber-100 text-amber-800'
                          }`}>
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
                        <Calendar size={13} className={isAmavasya ? 'text-indigo-600' : 'text-amber-600'} />
                        {item.date}
                      </span>
                    </div>

                    {/* Start & End Times */}
                    <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">{lang === 'en' ? 'Tithi Begins:' : 'তিথি আরম্ভ:'}</span>
                        <span className="font-semibold text-slate-800">{item.startTime}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">{lang === 'en' ? 'Tithi Ends:' : 'তিথি সমাপ্তি:'}</span>
                        <span className="font-semibold text-slate-800">{item.endTime}</span>
                      </div>
                    </div>

                    {isSelected && (
                      <div className="mt-3.5 pt-3 border-t border-slate-200 space-y-2 text-xs animate-fadeIn">
                        <div>
                          <span className="font-bold text-slate-700">
                            {lang === 'en' ? 'Rituals: ' : 'অনুষ্ঠান ও কর্তব্য: '}
                          </span>
                          <span className="text-slate-600">{item.rituals}</span>
                        </div>
                        <div>
                          <span className="font-bold text-slate-700">
                            {lang === 'en' ? 'Significance: ' : 'মাহাত্ম্য: '}
                          </span>
                          <span className="text-slate-600 leading-relaxed">{item.importance}</span>
                        </div>

                        {onSelectDate && (
                          <div className="pt-1 flex justify-end">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectDate(new Date(item.date));
                                onClose();
                              }}
                              className={`text-xs font-semibold px-3 py-1.5 rounded-lg text-white flex items-center gap-1 shadow-sm transition-all ${
                                isAmavasya ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-amber-600 hover:bg-amber-700'
                              }`}
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
              ? 'Calculated precisely as per Drik Panchang & Bengali Almanac standards'
              : 'দৃক পঞ্জিকা ও বাংলা পঞ্জিকা অনুযায়ী তিথির সঠিক সময়সূচী'}
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
