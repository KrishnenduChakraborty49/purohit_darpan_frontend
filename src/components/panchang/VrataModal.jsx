import React, { useState, useMemo } from 'react';
import { X, Search, Calendar, Clock, Sparkles, Filter, ChevronRight, BookOpen, AlertCircle } from 'lucide-react';

const VRATA_LIST = [
  {
    id: 'pradosh-som',
    nameBn: 'সোম প্রদোষ ব্রত',
    nameEn: 'Soma Pradosh Vrata',
    date: '2026-11-23',
    bengaliDate: '২৩ কার্তিক, ১৪৩৩',
    category: 'shiva',
    categoryBn: 'শিব ব্রত',
    deity: 'ভগবান শিব ও মাতা পার্বতী',
    fastTime: 'সন্ধ্যা ০৫:১০ - ০৭:৩৫ (প্রদোষ কাল)',
    significance: 'সোমবারে প্রদোষ ব্রত পালনে মানসিক শান্তি, আরোগ্য ও সর্ব মনোকামনা পূরণ হয়।',
    fastRule: 'সারাদিন উপবাস থেকে সন্ধ্যায় শিবলিঙ্গে দুধ, গঙ্গাজল ও বেলপাতা দিয়ে পূজা করে ফলাহার।'
  },
  {
    id: 'sankashti-chaturthi-nov',
    nameBn: 'সংকষ্টী চতুর্থী ব্রত',
    nameEn: 'Sankashti Chaturthi Vrata',
    date: '2026-11-28',
    bengaliDate: '২৮ কার্তিক, ১৪৩৩',
    category: 'ganesha',
    categoryBn: 'গণেশ ব্রত',
    deity: 'শ্রী গণেশ',
    fastTime: 'চন্দ্রোদয়: রাত্রি ০৮:৪২',
    significance: 'সকল বিপদ, বিঘ্ন ও কষ্ট দূর করতে বিঘ্নহর্তা গণেশের এই ব্রত সর্বশ্রেষ্ঠ।',
    fastRule: 'সারাদিন উপবাস, রাতে চন্দ্রমাকে অর্ঘ্য দিয়ে গণেশ পূজার পর পারণ।'
  },
  {
    id: 'shani-trayodashi-dec',
    nameBn: 'শনি প্রদোষ ব্রত',
    nameEn: 'Shani Pradosh Vrata',
    date: '2026-12-05',
    bengaliDate: '১৯ অগ্রহায়ণ, ১৪৩৩',
    category: 'shiva',
    categoryBn: 'শিব ব্রত',
    deity: 'ভগবান শিব ও শনিদেব',
    fastTime: 'সন্ধ্যা ০৫:০৫ - ০৭:২০',
    significance: 'শনির সাঢ়েসাতী, ঢাইয়া ও গ্রহদোষ থেকে মুক্তির মহাশুভ দিন।',
    fastRule: 'তিলের তেলের দীপ, কালো তিল দান ও শিব সহস্রনাম পাঠ।'
  },
  {
    id: 'shivaratri-2027',
    nameBn: 'মহা শিবরাত্রি ব্রত',
    nameEn: 'Maha Shivaratri Vrata',
    date: '2027-03-06',
    bengaliDate: '২১ ফাল্গুন, ১৪৩৩',
    category: 'shiva',
    categoryBn: 'শিব ব্রত',
    deity: 'দেবাদিদেব মহাদেব',
    fastTime: 'চার প্রহরের পূজা: সন্ধ্যা ০৬:০০ থেকে পরদিন সূর্যোদয়',
    significance: 'হিন্দু ধর্মের সর্বশ্রেষ্ঠ শিবব্রত। এই ব্রতে সর্বপাপ মুক্তি, জীবনে শান্তি ও মোক্ষ লাভ হয়।',
    fastRule: 'নির্জল উপবাস, রাত্রি জাগরণ ও চার প্রহরে দুধ, দই, ঘৃত, মধু সহযোগে শিবাভিষেক।'
  },
  {
    id: 'savitri-vrata-2027',
    nameBn: 'সাবিত্রী ব্রত',
    nameEn: 'Savitri Vrata',
    date: '2027-06-04',
    bengaliDate: '২০ জ্যৈষ্ঠ, ১৪৩৪',
    category: 'traditional',
    categoryBn: 'পারম্পরিক',
    deity: 'সতী সাবিত্রী ও যমরাজ',
    fastTime: 'সূর্যোদয় থেকে সন্ধ্যা পর্যন্ত',
    significance: 'স্বামীর দীর্ঘায়ু, আরোগ্য ও অখণ্ড সৌভাগ্য কামনায় সধবা নারীদের পবিত্র ব্রত।',
    fastRule: 'বটবৃক্ষে লাল সূতো বেষ্টন, ফলমূল দিয়ে পূজা ও সাবিত্রী-সত্যবানের কথা শ্রবণ।'
  },
  {
    id: 'bipattarini-2027',
    nameBn: 'বিপত্তারিণী ব্রত',
    nameEn: 'Bipattarini Vrata',
    date: '2027-07-06',
    bengaliDate: '২১ আষাঢ়, ১৪৩৪',
    category: 'devi',
    categoryBn: 'দেবী ব্রত',
    deity: 'মা বিপত্তারিণী (দুর্গা)',
    fastTime: 'সকাল থেকে সন্ধ্যা পূজা পর্যন্ত',
    significance: 'রথযাত্রা ও উল্টো রথের মাঝে মঙ্গলবার বা শনিবারে পালিত হয়। সংসারের সকল বিপদ দূর করে।',
    fastRule: '১৩টি ফল, ১৩টি মিষ্টি, ১৩গাঁট যুক্ত লাল সূতো (ডোর) ধারণ।'
  },
  {
    id: 'janmashtami-vrata-2027',
    nameBn: 'শ্রীকৃষ্ণ জন্মাষ্টমী ব্রত',
    nameEn: 'Janmashtami Vrata',
    date: '2027-08-25',
    bengaliDate: '২৬ ভাদ্র, ১৪৩৪',
    category: 'vishnu',
    categoryBn: 'বিষ্ণু ব্রত',
    deity: 'ভগবান শ্রীকৃষ্ণ',
    fastTime: 'নিশীথ পূজা: মধ্যরাত্র ১১:৫২ - ১২:৪০',
    significance: 'ভগবান শ্রীকৃষ্ণের পবিত্র জন্মতিথি। এই একটি ব্রত পালনে কোটী জন্মের পাপ ধূয়ে যায়।',
    fastRule: 'সারাদিন নির্জল বা ফলাহার, মধ্যরাতে কৃষ্ণের আবির্ভাব পূজা ও ধনিয়া পঞ্জীরী ভোগ দান।'
  }
];

export default function VrataModal({ isOpen, onClose, lang = 'bn', onSelectDate }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVrata, setSelectedVrata] = useState(null);

  const todayStr = useMemo(() => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  }, []);

  const nextVrata = useMemo(() => {
    return VRATA_LIST.find(v => v.date >= todayStr) || VRATA_LIST[0];
  }, [todayStr]);

  const filteredList = useMemo(() => {
    return VRATA_LIST.filter(item => {
      if (activeCategory !== 'all' && item.category !== activeCategory) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchBn = item.nameBn.toLowerCase().includes(q) || item.deity.toLowerCase().includes(q);
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
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-rose-100">
        
        {/* Header */}
        <div className="relative bg-gradient-to-r from-rose-700 via-pink-700 to-purple-800 text-white p-5 sm:p-6 shadow-md">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all backdrop-blur-sm"
            title="Close"
          >
            <X size={20} />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shadow-inner border border-white/30">
              ðï¸
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                  {lang === 'en' ? 'Sacred Vrata & Fasting Calendar' : 'ব্রত ও উপবাস তালিকা'}
                </h2>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-400 text-amber-950 shadow-sm">
                  1433 বঙ্গাব্দ
                </span>
              </div>
              <p className="text-rose-100 text-xs sm:text-sm mt-0.5">
                {lang === 'en' 
                  ? 'Pradosh, Sankashti, Shivaratri, Savitri and major traditional Hindu Vratas' 
                  : 'প্রদোষ, সংকষ্টী চতুর্থী, শিবরাত্রি, বিপত্তারিণী ও পারম্পরিক ব্রত নিয়ম'}
              </p>
            </div>
          </div>

          {/* Next Vrata Banner */}
          {nextVrata && (
            <div className="mt-4 bg-white/15 backdrop-blur-md rounded-2xl p-3 border border-white/20 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-1 rounded-xl bg-amber-400 text-amber-950 text-xs font-bold shadow-sm">
                  {lang === 'en' ? 'Upcoming Vrata' : 'আসন্ন ব্রত'}
                </span>
                <span className="font-semibold text-sm sm:text-base">
                  {lang === 'en' ? nextVrata.nameEn : nextVrata.nameBn}
                </span>
                <span className="text-xs text-rose-200 hidden sm:inline">
                  ({nextVrata.date} â¢ {nextVrata.bengaliDate})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2.5 py-1 rounded-lg bg-black/25 text-white font-medium">
                  {(() => {
                    const days = getDaysDiff(nextVrata.date);
                    if (days === 0) return lang === 'en' ? 'Today!' : 'আজকেà¦!';
                    if (days === 1) return lang === 'en' ? 'Tomorrow' : 'আগামীকাল';
                    return lang === 'en' ? `In ${days} days` : `আর ${days} দিন বাকি`;
                  })()}
                </span>
                <button
                  onClick={() => setSelectedVrata(nextVrata)}
                  className="text-xs px-3 py-1 rounded-lg bg-white text-rose-900 font-bold hover:bg-rose-50 transition-colors shadow-sm"
                >
                  {lang === 'en' ? 'Rules' : 'নিয়ম'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-slate-50 border-b border-slate-200 p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            {[
              { id: 'all', labelBn: 'সকল ব্রত', labelEn: 'All Vratas' },
              { id: 'shiva', labelBn: 'শিব ব্রত', labelEn: 'Shiva' },
              { id: 'vishnu', labelBn: 'বিষ্ণু ব্রত', labelEn: 'Vishnu' },
              { id: 'devi', labelBn: 'দেবী ব্রত', labelEn: 'Devi' },
              { id: 'ganesha', labelBn: 'গণেশ ব্রত', labelEn: 'Ganesha' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  activeCategory === tab.id
                    ? 'bg-rose-700 text-white shadow-sm'
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
              placeholder={lang === 'en' ? 'Search vrata / deity...' : 'ব্রত বা দেবতা খুঁজুন...'}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredList.map(item => {
              const isPast = item.date < todayStr;
              const daysDiff = getDaysDiff(item.date);
              const isSelected = selectedVrata?.id === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedVrata(isSelected ? null : item)}
                  className={`group bg-white rounded-2xl p-4 border transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md ${
                    isSelected
                      ? 'border-rose-600 ring-2 ring-rose-600/20 bg-rose-50/20'
                      : isPast 
                        ? 'border-slate-200 opacity-75' 
                        : 'border-slate-200 hover:border-rose-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                          {lang === 'en' ? item.category.toUpperCase() : item.categoryBn}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">
                          {item.deity}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-slate-800 mt-1 group-hover:text-rose-700 transition-colors">
                        {lang === 'en' ? item.nameEn : item.nameBn}
                      </h3>
                    </div>

                    <div>
                      {daysDiff === 0 ? (
                        <span className="text-[11px] font-bold px-2 py-1 rounded-lg bg-rose-600 text-white animate-pulse">
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

                  <div className="flex items-center gap-3 mt-2 text-xs text-slate-600">
                    <span className="flex items-center gap-1 font-semibold text-slate-700">
                      <Calendar size={13} className="text-rose-600" />
                      {item.date}
                    </span>
                    <span className="text-slate-300">â¢</span>
                    <span>{item.bengaliDate}</span>
                  </div>

                  <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <Clock size={13} className="text-rose-500" />
                      <span className="font-semibold">{lang === 'en' ? 'Time: ' : 'সময়: '}</span>
                      <span>{item.fastTime}</span>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="mt-3.5 pt-3 border-t border-slate-200 space-y-2 text-xs animate-fadeIn">
                      <div>
                        <span className="font-bold text-slate-700">
                          {lang === 'en' ? 'Significance: ' : 'মাহাত্ম্য: '}
                        </span>
                        <span className="text-slate-600 leading-relaxed">{item.significance}</span>
                      </div>
                      <div>
                        <span className="font-bold text-slate-700">
                          {lang === 'en' ? 'Rules & Fasting: ' : 'নিয়ম ও পারণ: '}
                        </span>
                        <span className="text-rose-800 font-medium">{item.fastRule}</span>
                      </div>

                      {onSelectDate && (
                        <div className="pt-1 flex justify-end">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectDate(new Date(item.date));
                              onClose();
                            }}
                            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-rose-700 text-white hover:bg-rose-800 flex items-center gap-1 shadow-sm transition-all"
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
              ? 'Traditional Vrata catalog aligned with Hindu Vratotsav & Smriti traditions'
              : 'হিন্দু ব্রতোৎসব ও স্মৃতি শাস্ত্র অনুযায়ী সংকলিত'}
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
