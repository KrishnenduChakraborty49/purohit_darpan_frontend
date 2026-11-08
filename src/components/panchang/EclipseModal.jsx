import React, { useState, useMemo } from 'react';
import { X, Search, Calendar, Clock, AlertTriangle, ShieldCheck, ChevronRight, Eye, EyeOff } from 'lucide-react';

const ECLIPSE_DATA = [
  {
    id: 'ecl-2026-02-17',
    type: 'solar',
    nameBn: 'বলয়গ্রাস সূর্যগ্রহণ',
    nameEn: 'Annular Solar Eclipse',
    date: '2026-02-17',
    bengaliDate: '৪ ফাল্গুন, ১৪৩২',
    visibilityIndia: false,
    visibilityText: 'ভারত ও বাংলাদেশে অদৃশ্য (অন্টার্কটিকা, দক্ষিণ ভারত মহাসাগরে দৃশ্য)',
    sutakApplicable: false,
    sutakText: 'অদৃশ্য হওয়ায় সূতক কাল প্রযোজ্য নয়।',
    timings: 'দুপুর ১২:২৬ - বিকেল ০৪:১১ (IST)',
    rules: 'গর্ভবতী মহিলাদের সাধারণ সতর্কতা, সূর্য গায়ত্রী মন্ত্র জপ।'
  },
  {
    id: 'ecl-2026-03-03',
    type: 'lunar',
    nameBn: 'পূর্ণগ্রাস চন্দ্রষেখর চন্দ্রগ্রহণ',
    nameEn: 'Total Lunar Eclipse (Blood Moon)',
    date: '2026-03-03',
    bengaliDate: '১৮ ফাল্গুন, ১৪৩২',
    visibilityIndia: true,
    visibilityText: 'ভারত, বাংলাদেশ, এশিয়া, অস্ট্রেলিয়ায় স্পষ্ট দৃশ্যমান',
    sutakApplicable: true,
    sutakText: 'সূতক কাল: ০৩ মার্চ সকাল ০৬:৩০ থেকে গ্রহণ মোক্ষ (সন্ধ্যা ০৬:৪৫) পর্যন্ত',
    timings: 'স্পর্শ: দুপুর ০৩:২০ | মধ্য: বিকেল ০৫:০৪ | মোক্ষ: সন্ধ্যা ০৬:৪৫ (IST)',
    rules: 'সূতক কালে মন্দিরের দ্বার বন্ধ থাকবে। খাদ্যদ্রব্যে তুলসী পাতা দিয়ে রাখুন। গ্রহণ শেষে স্নান ও দান পুণ্যময়।'
  },
  {
    id: 'ecl-2026-08-12',
    type: 'solar',
    nameBn: 'পূর্ণগ্রাস সূর্যগ্রহণ',
    nameEn: 'Total Solar Eclipse',
    date: '2026-08-12',
    bengaliDate: '২৬ শ্রাবণ, ১৪৩৩',
    visibilityIndia: false,
    visibilityText: 'ভারতে অদৃশ্য (উত্তর আমেরিকা, গ্রীনল্যান্ড, আইসল্যান্ড, স্পেনে দৃশ্য)',
    sutakApplicable: false,
    sutakText: 'ভারতে দৃশ্যমান না হওয়ায় ধর্মীয় সূতক পালনের প্রয়োজন নেই।',
    timings: 'সন্ধ্যা ০৫:৩৫ - রাত্রি ০৯:৩০ (IST)',
    rules: 'শ্রীহরি নাম স্মরণ ও সূর্যদেবের ধ্যান।'
  },
  {
    id: 'ecl-2026-08-28',
    type: 'lunar',
    nameBn: 'আংশিক চন্দ্রগ্রহণ',
    nameEn: 'Partial Lunar Eclipse',
    date: '2026-08-28',
    bengaliDate: '১১ ভাদ্র, ১৪৩৩',
    visibilityIndia: true,
    visibilityText: 'ভারতের কিছু অংশে ও পশ্চিম এশিয়া, ইউরোপে দৃশ্য',
    sutakApplicable: true,
    sutakText: 'সূতক কাল: ২৮ আগস্ট দুপুর ০১:১৫ থেকে রাত্রি ১১:৩০ পর্যন্ত',
    timings: 'স্পর্শ: সন্ধ্যা ০৭:৩০ | মধ্য: রাত্রি ০৯:২০ | মোক্ষ: রাত্রি ১১:৩০ (IST)',
    rules: 'গ্রহণকালে ভোজন, শয়ন ও কর্তন বর্জনীয়। মহামৃত্যুঞ্জয় মন্ত্র জপ করুন।'
  },
  {
    id: 'ecl-2027-02-06',
    type: 'solar',
    nameBn: 'বলয়গ্রাস সূর্যগ্রহণ',
    nameEn: 'Annular Solar Eclipse',
    date: '2027-02-06',
    bengaliDate: '২৩ মাঘ, ১৪৩৩',
    visibilityIndia: false,
    visibilityText: 'ভারতে অদৃশ্য (দক্ষিণ আমেরিকা, চিলি, আর্জেন্টিনায় দৃশ্য)',
    sutakApplicable: false,
    sutakText: 'সূতক প্রয়োজন নেই।',
    timings: 'দুপুর ০২:২০ - সন্ধ্যা ০৬:৩০ (IST)',
    rules: 'শ্রদ্ধাপূর্বক ঈশ্বর স্মরণ।'
  },
  {
    id: 'ecl-2027-08-02',
    type: 'solar',
    nameBn: 'শতাব্দীর মহা পূর্ণগ্রাস সূর্যগ্রহণ',
    nameEn: 'Great Total Solar Eclipse of the Century',
    date: '2027-08-02',
    bengaliDate: '১৬ শ্রাবণ, ১৪৩৪',
    visibilityIndia: true,
    visibilityText: 'ভারতের অনেক অঞ্চলে আংশিক ও মধ্যপ্রাচ্য, উত্তর আফ্রিকায় পূর্ণগ্রাস দৃশ্য',
    sutakApplicable: true,
    sutakText: 'সূতক কাল: ০২ আগস্ট রাত্রি ০৩:৩০ (IST) থেকে গ্রহণ মোক্ষ পর্যন্ত',
    timings: 'স্পর্শ: দুপুর ০৩:২৫ | মধ্য: বিকেল ০৫:০৭ | মোক্ষ: সন্ধ্যা ০৬:৪০ (IST)',
    rules: 'এটি একটি ঐতিহাসিক দীর্ঘ সূর্যগ্রহণ (৬ মিনিট ২২ সেকেন্ড)। গ্রহণকালে জপ, ধ্যান, ও পূর্ণ সংযম পালন করুন।'
  }
];

export default function EclipseModal({ isOpen, onClose, lang = 'bn', onSelectDate }) {
  const [filterType, setFilterType] = useState('all'); // all, solar, lunar, visible
  const [selectedItem, setSelectedItem] = useState(null);

  const todayStr = useMemo(() => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  }, []);

  const nextEclipse = useMemo(() => {
    return ECLIPSE_DATA.find(e => e.date >= todayStr) || ECLIPSE_DATA[0];
  }, [todayStr]);

  const filteredList = useMemo(() => {
    return ECLIPSE_DATA.filter(item => {
      if (filterType === 'solar' && item.type !== 'solar') return false;
      if (filterType === 'lunar' && item.type !== 'lunar') return false;
      if (filterType === 'visible' && !item.visibilityIndia) return false;
      return true;
    });
  }, [filterType]);

  if (!isOpen) return null;

  const getDaysDiff = (dateStr) => {
    const today = new Date(todayStr);
    const target = new Date(dateStr);
    const diffTime = target - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="relative bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-5 sm:p-6 shadow-md">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all backdrop-blur-sm"
            title="Close"
          >
            <X size={20} />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shadow-inner border border-white/30">
              ð
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                  {lang === 'en' ? 'Solar & Lunar Eclipse Calendar' : 'সূর্যগ্রহণ ও চন্দ্রগ্রহণ তালিকা'}
                </h2>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-400 text-amber-950 shadow-sm">
                  2026-2027
                </span>
              </div>
              <p className="text-purple-200 text-xs sm:text-sm mt-0.5">
                {lang === 'en' 
                  ? 'Precise dates, Sutak rules, visibility in India/Bangladesh & spiritual guidelines' 
                  : 'সঠিক তারিখ, ভারতে দৃশ্যমানতা, সূতক কাল ও ধর্মীয় নিয়মাবলী'}
              </p>
            </div>
          </div>

          {/* Next Eclipse Banner */}
          {nextEclipse && (
            <div className="mt-4 bg-white/15 backdrop-blur-md rounded-2xl p-3 border border-white/20 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-1 rounded-xl bg-amber-400 text-amber-950 text-xs font-bold shadow-sm">
                  {lang === 'en' ? 'Next Eclipse' : 'আগামী গ্রহণ'}
                </span>
                <span className="font-semibold text-sm sm:text-base">
                  {lang === 'en' ? nextEclipse.nameEn : nextEclipse.nameBn}
                </span>
                <span className="text-xs text-purple-200 hidden sm:inline">
                  ({nextEclipse.date} â¢ {nextEclipse.bengaliDate})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2.5 py-1 rounded-lg bg-black/30 text-white font-medium">
                  {(() => {
                    const days = getDaysDiff(nextEclipse.date);
                    if (days === 0) return lang === 'en' ? 'Today!' : 'আজকেই!';
                    if (days === 1) return lang === 'en' ? 'Tomorrow' : 'আগামীকাল';
                    return lang === 'en' ? `In ${days} days` : `আর ${days} দিন বাকি`;
                  })()}
                </span>
                <button
                  onClick={() => setSelectedItem(nextEclipse)}
                  className="text-xs px-3 py-1 rounded-lg bg-white text-purple-950 font-bold hover:bg-purple-50 transition-colors shadow-sm"
                >
                  {lang === 'en' ? 'Details' : 'বিস্তারিত'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="bg-slate-50 border-b border-slate-200 p-3 sm:p-4 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {[
            { id: 'all', labelBn: 'সকল গ্রহণ', labelEn: 'All Eclipses' },
            { id: 'visible', labelBn: 'ভারতে দৃশ্য', labelEn: 'Visible in India' },
            { id: 'solar', labelBn: 'সূর্যগ্রহণ', labelEn: 'Solar Eclipse' },
            { id: 'lunar', labelBn: 'চন্দ্রগ্রহণ', labelEn: 'Lunar Eclipse' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                filterType === tab.id
                  ? 'bg-purple-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
              }`}
            >
              {lang === 'en' ? tab.labelEn : tab.labelBn}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/50 space-y-4">
          <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-3.5 text-xs text-amber-900 flex items-start gap-2.5">
            <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold">
                {lang === 'en' ? 'Sutak Kaal & Eclipse Rules:' : 'সূতক কাল ও গ্রহণের শাস্ত্রীয় নিয়ম:'}
              </p>
              <p className="text-amber-800 leading-relaxed">
                {lang === 'en'
                  ? 'Sutak is ONLY applicable where the eclipse is physically visible. For Solar eclipses, Sutak starts 12 hours prior to touch; for Lunar eclipses, 9 hours prior. Pregnant women should refrain from cutting, sewing, or looking directly at the sky.'
                  : 'যে স্থানে গ্রহণ দৃশ্যমান নয়, সেখানে সূতক কাল প্রয়োজ্য নয়। সূর্যগ্রহণে ১২ ঘণ্টা আগে ও চন্দ্রগ্রহণে ৯ ঘণ্টা আগে সূতক শুরু হয়।'}
              </p>
            </div>
          </div>

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
                      ? 'border-purple-600 ring-2 ring-purple-600/20 bg-purple-50/20'
                      : isPast 
                        ? 'border-slate-200 opacity-75' 
                        : 'border-slate-200 hover:border-purple-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          item.type === 'solar' 
                            ? 'bg-amber-100 text-amber-900' 
                            : 'bg-indigo-100 text-indigo-900'
                        }`}>
                          {item.type === 'solar' ? (lang === 'en' ? 'âï¸ Solar Eclipse' : 'âï¸ সূর্যগ্রহণ') : (lang === 'en' ? 'ð Lunar Eclipse' : 'ð চন্দ্রগ্রহণ')}
                        </span>
                        
                        {item.visibilityIndia ? (
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                            <Eye size={11} />
                            {lang === 'en' ? 'Visible' : 'দৃশ্য'}
                          </span>
                        ) : (
                          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 flex items-center gap-1">
                            <EyeOff size={11} />
                            {lang === 'en' ? 'Not Visible' : 'অদৃশ্য'}
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-bold text-slate-800 mt-1.5 group-hover:text-purple-700 transition-colors">
                        {lang === 'en' ? item.nameEn : item.nameBn}
                      </h3>
                    </div>

                    <div>
                      {daysDiff === 0 ? (
                        <span className="text-[11px] font-bold px-2 py-1 rounded-lg bg-purple-600 text-white animate-pulse">
                          {lang === 'en' ? 'Today!' : 'আজ!'}
                        </span>
                      ) : daysDiff > 0 ? (
                        <span className="text-[11px] font-bold px-2 py-1 rounded-lg bg-purple-100 text-purple-900">
                          {lang === 'en' ? `In ${daysDiff}d` : `${daysDiff} দিন`}
                        </span>
                      ) : (
                        <span className="text-[11px] font-medium px-2 py-1 rounded-lg bg-slate-100 text-slate-500">
                          {lang === 'en' ? 'Passed' : 'অতীত'}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 mt-2.5 text-xs text-slate-600">
                    <span className="flex items-center gap-1 font-semibold text-slate-700">
                      <Calendar size={13} className="text-purple-600" />
                      {item.date}
                    </span>
                    <span className="text-slate-300">â¢</span>
                    <span>{item.bengaliDate}</span>
                  </div>

                  <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">{lang === 'en' ? 'Timings:' : 'সময়:'}</span>
                      <span className="font-semibold text-slate-800">{item.timings}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {item.visibilityText}
                    </div>
                  </div>

                  {isSelected && (
                    <div className="mt-3.5 pt-3 border-t border-slate-200 space-y-2 text-xs animate-fadeIn">
                      <div>
                        <span className="font-bold text-slate-700">
                          {lang === 'en' ? 'Sutak Status: ' : 'সূতক কাল: '}
                        </span>
                        <span className="text-slate-600">{item.sutakText}</span>
                      </div>
                      <div>
                        <span className="font-bold text-slate-700">
                          {lang === 'en' ? 'Rules & Precautions: ' : 'নিয়ম ও সতর্কতা: '}
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
                            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-purple-700 text-white hover:bg-purple-800 flex items-center gap-1 shadow-sm transition-all"
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
              ? 'Computed using NASA eclipse predictions & Indian standard astrological calculations'
              : 'নাসা গ্রহণ গণনা ও বৈদিক সূর্য সিদ্ধান্ত অনুযায়ী নির্ণীত'}
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
