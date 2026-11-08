import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { usePanchangStore } from '../store/panchangStore';
import toast from 'react-hot-toast';
import { Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import RashipholModal from '../components/panchang/RashipholModal';
import CalendarModal from '../components/panchang/CalendarModal';
import PujaDaysModal from '../components/panchang/PujaDaysModal';
import MarriageDatesModal from '../components/panchang/MarriageDatesModal';
import EkadashiModal from '../components/panchang/EkadashiModal';
import EclipseModal from '../components/panchang/EclipseModal';
import AuspiciousMuhuratModal from '../components/panchang/AuspiciousMuhuratModal';
import MoonPhaseModal from '../components/panchang/MoonPhaseModal';
import RashiNirnayModal from '../components/panchang/RashiNirnayModal';
import VrataModal from '../components/panchang/VrataModal';
import FestivalNotificationBanner from '../components/panchang/FestivalNotificationBanner';

const TRANSLATIONS = {
  bn: {
    title: 'বাংলা পঞ্জিকা ১৪৩৩',
    india: 'ভারত',
    newYearBtn: 'নতুন বছরের\nপঞ্জিকা দেখুন',
    sunrise: 'সূর্যোদয়',
    sunset: 'সূর্যাস্ত',
    notice1: 'সূর্যোদয়ের পর থেকে সূর্যাস্ত পর্যন্ত সময়কে দিবা আর সূর্যাস্তের পরের সময়কে রাত্রি হিসেবে চিহ্নিত করা হয়েছে।',
    notice2: '*** অ্যাপ্লিকেশনের তারিখ পরিবর্তন হয় সূর্যোদয়ের পর।',
    quickNav: 'দ্রুত নেভিগেশন (Quick Navigation)',
    comingSoon: 'এই ফিচারটি খুব শীঘ্রই আসছে! (Coming Soon)',
    bdLabel: 'ভাদ্র, ১৪৩৩',
    inLabel: 'ভাদ্র, ১৪৩৩',
    grid: ['ক্যালেন্ডার', 'পঞ্চাঙ্গ', 'রাশিফল', 'পূজার দিন', 'বিবাহের দিন', 'একাদশী', 'গ্রহণ', 'অন্যান্য', 'অমাবস্যা', 'পূর্ণিমা', 'রাশি নির্ণয়', 'ব্রত'],
    days: ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'],
    months: ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'],
    numbers: ['০','১','২','৩','৪','৫','৬','৭','৮','৯']
  },
  hi: {
    title: 'बंगाली पंचांग 1433',
    india: 'भारत',
    newYearBtn: 'नए साल का\nपंचांग देखें',
    sunrise: 'सूर्योदय',
    sunset: 'सूर्यास्त',
    notice1: 'सूर्योदय से सूर्यास्त तक का समय दिन और सूर्यास्त के बाद का समय रात माना जाता है।',
    notice2: '*** ऐप में तिथि सूर्योदय के बाद बदलती है।',
    quickNav: 'त्वरित नेविगेशन (Quick Navigation)',
    comingSoon: 'यह सुविधा जल्द आ रही है! (Coming Soon)',
    bdLabel: 'भाद्र, 1433',
    inLabel: 'भाद्र, 1433',
    grid: ['कैलेंडर', 'पंचांग', 'राशिफल', 'पूजा के दिन', 'विवाह के दिन', 'एकादशी', 'ग्रहण', 'अन्य', 'अमावस्या', 'पूर्णिमा', 'राशि निर्णय', 'व्रत'],
    days: ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'],
    months: ['जनवरी', 'फरवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'],
    numbers: ['0','1','2','3','4','5','6','7','8','9']
  },
  en: {
    title: 'Bengali Panchang 1433',
    india: 'India',
    newYearBtn: 'View New Year\nCalendar',
    sunrise: 'Sunrise',
    sunset: 'Sunset',
    notice1: 'The time from sunrise to sunset is considered day and after sunset is considered night.',
    notice2: '*** The date in the app changes after sunrise.',
    quickNav: 'Quick Navigation',
    comingSoon: 'This feature is coming soon!',
    bdLabel: 'Bhadra, 1433',
    inLabel: 'Bhadra, 1433',
    grid: ['Calendar', 'Panchang', 'Horoscope', 'Puja Days', 'Marriage Days', 'Ekadashi', 'Eclipse', 'Others', 'Amavasya', 'Purnima', 'Rashi Nirnay', 'Vrata'],
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    numbers: ['0','1','2','3','4','5','6','7','8','9']
  }
};

export default function PanchangPage() {
  const { today: panchangData, fetchDate, loading } = usePanchangStore();
  const [viewDate, setViewDate] = useState(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isPujaDaysOpen, setIsPujaDaysOpen] = useState(false);
  const [lang, setLang] = useState('bn');
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [isRashipholOpen, setIsRashipholOpen] = useState(false);
  const [selectedRashiCode, setSelectedRashiCode] = useState('aries');
  const [isMarriageOpen, setIsMarriageOpen] = useState(false);
  const [isEkadashiOpen, setIsEkadashiOpen] = useState(false);
  const [isEclipseOpen, setIsEclipseOpen] = useState(false);
  const [isMuhuratOpen, setIsMuhuratOpen] = useState(false);
  const [isMoonPhaseOpen, setIsMoonPhaseOpen] = useState(false);
  const [moonPhaseTab, setMoonPhaseTab] = useState('amavasya');
  const [isRashiNirnayOpen, setIsRashiNirnayOpen] = useState(false);
  const [isVrataOpen, setIsVrataOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToPanchang = () => {
    const el = document.getElementById('panchang-details');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('ring-2', 'ring-indigo-400');
      setTimeout(() => el.classList.remove('ring-2', 'ring-indigo-400'), 2000);
    } else {
      window.scrollTo({ top: 350, behavior: 'smooth' });
    }
  };

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    fetchDate(viewDate);
  }, [fetchDate, viewDate]);

  const handleComingSoon = () => {
    toast(t.comingSoon, { icon: '🚧' });
  };

  const gridItems = [
    { label: t.grid[0], icon: '📅', color: 'text-orange-500', bg: 'bg-orange-50', action: () => setIsCalendarOpen(true) },
    { label: t.grid[1], icon: '🌌', color: 'text-indigo-500', bg: 'bg-indigo-50', action: scrollToPanchang },
    { label: t.grid[2], icon: '♈', color: 'text-purple-500', bg: 'bg-purple-50', action: () => setIsRashipholOpen(true) },
    { label: t.grid[3], icon: '🙏', color: 'text-teal-500', bg: 'bg-teal-50', action: () => setIsPujaDaysOpen(true) },
    { label: t.grid[4], icon: '🎁', color: 'text-red-500', bg: 'bg-red-50', action: () => setIsMarriageOpen(true) },
    { label: t.grid[5], icon: '📖', color: 'text-green-500', bg: 'bg-green-50', action: () => setIsEkadashiOpen(true) },
    { label: t.grid[6], icon: '🌑', color: 'text-slate-500', bg: 'bg-slate-50', action: () => setIsEclipseOpen(true) },
    { label: t.grid[7], icon: '⊞', color: 'text-emerald-600', bg: 'bg-emerald-50', action: () => setIsMuhuratOpen(true) },
    { label: t.grid[8], icon: '🌒', color: 'text-stone-700', bg: 'bg-stone-100', action: () => { setMoonPhaseTab('amavasya'); setIsMoonPhaseOpen(true); } },
    { label: t.grid[9], icon: '🌕', color: 'text-yellow-500', bg: 'bg-yellow-50', action: () => { setMoonPhaseTab('purnima'); setIsMoonPhaseOpen(true); } },
    { label: t.grid[10], icon: '☸️', color: 'text-blue-500', bg: 'bg-blue-50', action: () => setIsRashiNirnayOpen(true) },
    { label: t.grid[11], icon: '📆', color: 'text-rose-500', bg: 'bg-rose-50', action: () => setIsVrataOpen(true) },
  ];

  // Helper to convert english digits to bengali if needed
  const toLocalNumbers = (numStr) => {
    if (lang !== 'bn') return numStr;
    return String(numStr).split('').map(c => (c >= '0' && c <= '9') ? t.numbers[parseInt(c)] : c).join('');
  };

  const getDayName = (date) => t.days[date.getDay()];

  const formatDate = (date) => {
    const day = toLocalNumbers(date.getDate());
    const month = t.months[date.getMonth()];
    const year = toLocalNumbers(date.getFullYear());
    return `${day} ${month}, ${year}`;
  };

  const formatTimeStr = (timeStr) => {
    if (!timeStr) return '';
    // timeStr is like "06:15:00" or "18:30:00"
    const [h, m, s] = timeStr.split(':');
    if (!h || !m) return timeStr;
    
    if (lang === 'bn') {
      const hBn = toLocalNumbers(parseInt(h));
      const mBn = toLocalNumbers(parseInt(m));
      const sBn = toLocalNumbers(parseInt(s || 0));
      return `${hBn} টা ${mBn} মি ${sBn} সে`;
    } else {
      const hInt = parseInt(h);
      const ampm = hInt >= 12 ? 'PM' : 'AM';
      const h12 = hInt % 12 || 12;
      return `${h12}:${m} ${ampm}`;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 pt-24 pb-12 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Festival & Sacred Occasion Notification Banner */}
        <FestivalNotificationBanner 
          lang={lang}
          onOpenPujaModal={() => setIsPujaDaysOpen(true)}
          onViewPanchang={() => {
            const el = document.getElementById('panchang-details');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />
        
        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          
          {/* Left Column: Date & Info */}
          <div className="lg:col-span-5 space-y-5">
            {/* Custom Header */}
            <div className="flex items-center justify-between px-4 py-4 bg-white rounded-2xl shadow-sm border border-stone-100">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">{t.title}</h1>
              <div className="flex gap-3 sm:gap-4 items-center">
                
                {/* Language Switcher */}
                <div className="relative">
                  <button 
                    onClick={() => setShowLangMenu(!showLangMenu)}
                    className="flex items-center gap-1 text-slate-600 hover:text-slate-800 transition-colors bg-slate-50 px-2 py-1 rounded-md"
                  >
                    <Globe size={20} />
                    <span className="text-sm font-semibold uppercase">{lang}</span>
                  </button>
                  
                  {showLangMenu && (
                    <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-lg border border-stone-100 py-2 z-50 animate-fade-in">
                      <button onClick={() => { setLang('bn'); setShowLangMenu(false); }} className={`w-full text-left px-4 py-2 text-sm hover:bg-stone-50 ${lang === 'bn' ? 'font-bold text-orange-600' : 'text-stone-700'}`}>বাংলা</button>
                      <button onClick={() => { setLang('hi'); setShowLangMenu(false); }} className={`w-full text-left px-4 py-2 text-sm hover:bg-stone-50 ${lang === 'hi' ? 'font-bold text-orange-600' : 'text-stone-700'}`}>हिन्दी</button>
                      <button onClick={() => { setLang('en'); setShowLangMenu(false); }} className={`w-full text-left px-4 py-2 text-sm hover:bg-stone-50 ${lang === 'en' ? 'font-bold text-orange-600' : 'text-stone-700'}`}>English</button>
                    </div>
                  )}
                </div>


              </div>
            </div>

            {/* The Blue Main Card */}
            <div className="bg-[#28559D] rounded-2xl overflow-hidden shadow-lg">
              {/* Top half: Day & Date */}
              <div className="p-5 lg:p-6 flex items-center justify-between">
                <div>
                  <h2 className="text-white text-3xl font-bold mb-1">{getDayName(viewDate)}</h2>
                  <p className="text-blue-100 text-sm font-medium">{formatDate(viewDate)}</p>
                </div>
                {panchangData?.tithi && (
                  <div className="bg-white/15 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 text-right">
                    <span className="text-[11px] text-blue-200 block font-medium uppercase tracking-wider">
                      {lang === 'bn' ? 'আজকের তিথি' : "Today's Tithi"}
                    </span>
                    <span className="text-white font-bold text-base">
                      {panchangData.tithi}
                    </span>
                  </div>
                )}
              </div>

              {/* Bottom half: Sunrise/Sunset */}
              <div className="bg-[#1f4888] px-5 py-4 flex justify-between items-center relative">
                {/* Decorative line spanning across */}
                <div className="absolute top-1/2 left-4 right-4 h-[1px] bg-blue-400/20 -translate-y-1/2"></div>
                
                <div className="text-center relative z-10 bg-[#1f4888] px-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-xl">🌅</span>
                    <span className="text-white font-medium">{t.sunrise}</span>
                  </div>
                  <p className="text-white text-sm font-medium tracking-wide">
                    {panchangData?.sunrise ? formatTimeStr(panchangData.sunrise) : (lang === 'bn' ? '৫ টা ১৭ মি ০ সে' : '5:17 AM')}
                  </p>
                </div>
                
                <div className="text-center relative z-10 bg-[#1f4888] px-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-white font-medium">{t.sunset}</span>
                    <span className="text-xl">🌇</span>
                  </div>
                  <p className="text-white text-sm font-medium tracking-wide">
                    {panchangData?.sunset ? formatTimeStr(panchangData.sunset) : (lang === 'bn' ? '৬ টা ৬ মি ০ সে' : '6:06 PM')}
                  </p>
                </div>
              </div>
            </div>

            {/* Notice text */}
            <div className="px-5 py-4 flex gap-3 bg-white rounded-2xl shadow-sm border border-stone-100">
              <div className="mt-1.5 w-2.5 h-2.5 rounded-full bg-red-500 flex-shrink-0"></div>
              <p className="text-xs lg:text-sm text-stone-600 leading-relaxed font-medium">
                {t.notice1}<br/>
                <span className="text-stone-500 italic mt-2 block">{t.notice2}</span>
              </p>
            </div>

            {/* Detailed Panchang Data from API */}
            {panchangData && (
              <div id="panchang-details" className="bg-white rounded-2xl shadow-sm border border-stone-100 p-5 mt-4 transition-all duration-300">
                <h3 className="text-lg font-bold text-stone-800 mb-4 border-b border-stone-100 pb-2">
                  {lang === 'bn' ? 'আজকের পঞ্চাঙ্গ' : lang === 'hi' ? 'आज का पंचांग' : 'Today\'s Panchang'}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-stone-50 p-3 rounded-xl border border-stone-100">
                    <p className="text-xs text-stone-500 font-semibold uppercase">{lang === 'bn' ? 'তিথি' : lang === 'hi' ? 'तिथि' : 'Tithi'}</p>
                    <p className="text-stone-800 font-bold">{panchangData.tithi || '-'}</p>
                  </div>
                  <div className="bg-stone-50 p-3 rounded-xl border border-stone-100">
                    <p className="text-xs text-stone-500 font-semibold uppercase">{lang === 'bn' ? 'নক্ষত্র' : lang === 'hi' ? 'नक्षत्र' : 'Nakshatra'}</p>
                    <p className="text-stone-800 font-bold">{panchangData.nakshatra || '-'}</p>
                  </div>
                  <div className="bg-stone-50 p-3 rounded-xl border border-stone-100">
                    <p className="text-xs text-stone-500 font-semibold uppercase">{lang === 'bn' ? 'যোগ' : lang === 'hi' ? 'योग' : 'Yoga'}</p>
                    <p className="text-stone-800 font-bold">{panchangData.yoga || '-'}</p>
                  </div>
                  <div className="bg-stone-50 p-3 rounded-xl border border-stone-100">
                    <p className="text-xs text-stone-500 font-semibold uppercase">{lang === 'bn' ? 'করণ' : lang === 'hi' ? 'करण' : 'Karana'}</p>
                    <p className="text-stone-800 font-bold">{panchangData.karana || '-'}</p>
                  </div>
                </div>
                
                {panchangData.brahmaMuhurtaStart && panchangData.brahmaMuhurtaEnd && (
                  <div className="mt-4 bg-purple-50 p-3 rounded-xl border border-purple-100 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-purple-600 font-semibold uppercase">{lang === 'bn' ? 'ব্রহ্ম মুহূর্ত' : lang === 'hi' ? 'ब्रह्म मुहूर्त' : 'Brahma Muhurta'}</p>
                      <p className="text-purple-900 font-bold text-sm mt-1">
                        {formatTimeStr(panchangData.brahmaMuhurtaStart)} - {formatTimeStr(panchangData.brahmaMuhurtaEnd)}
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-xl">
                      🕉️
                    </div>
                  </div>
                )}
                
                {panchangData.rahuStart && panchangData.rahuEnd && (
                  <div className="mt-3 bg-red-50 p-3 rounded-xl border border-red-100 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-red-600 font-semibold uppercase">{lang === 'bn' ? 'রাহু কাল' : lang === 'hi' ? 'राहु काल' : 'Rahu Kaal'}</p>
                      <p className="text-red-900 font-bold text-sm mt-1">
                        {formatTimeStr(panchangData.rahuStart)} - {formatTimeStr(panchangData.rahuEnd)}
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-xl">
                      ⚠️
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Icon Grid */}
          <div className="lg:col-span-7 bg-white rounded-2xl shadow-sm border border-stone-100 p-6 lg:p-10">
            <h3 className="text-lg font-bold text-stone-800 mb-8 hidden lg:block border-b border-stone-100 pb-4">{t.quickNav}</h3>
            <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-y-10 gap-x-2 lg:gap-x-8">
              {gridItems.map((item, index) => (
                <button 
                  key={index}
                  onClick={item.action}
                  className="flex flex-col items-center justify-start gap-3 group"
                >
                  <div className={`w-16 h-16 lg:w-20 lg:h-20 rounded-full border border-stone-200 flex items-center justify-center bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-1 active:scale-95 group-hover:border-stone-300`}>
                    <span className={`text-2xl lg:text-3xl ${item.color}`}>{item.icon}</span>
                  </div>
                  <span className="text-[11px] lg:text-sm font-semibold text-stone-700 group-hover:text-stone-900 text-center leading-tight">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Puja Days Modal */}
      <PujaDaysModal
        isOpen={isPujaDaysOpen}
        onClose={() => setIsPujaDaysOpen(false)}
        lang={lang}
        onSelectDate={(newDate) => {
          setViewDate(newDate);
          fetchDate(newDate);
        }}
      />

      {/* Calendar Modal */}
      <CalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        lang={lang}
        onSelectDate={(newDate) => {
          setViewDate(newDate);
          fetchDate(newDate);
        }}
      />

      {/* Rashiphol Modal */}
      <RashipholModal
        isOpen={isRashipholOpen}
        onClose={() => setIsRashipholOpen(false)}
        lang={lang}
        initialRashiCode={selectedRashiCode}
      />

      {/* Marriage Dates Modal */}
      <MarriageDatesModal
        isOpen={isMarriageOpen}
        onClose={() => setIsMarriageOpen(false)}
        lang={lang}
        onSelectDate={(newDate) => {
          setViewDate(newDate);
          fetchDate(newDate);
        }}
      />

      {/* Ekadashi Modal */}
      <EkadashiModal
        isOpen={isEkadashiOpen}
        onClose={() => setIsEkadashiOpen(false)}
        lang={lang}
        onSelectDate={(newDate) => {
          setViewDate(newDate);
          fetchDate(newDate);
        }}
      />

      {/* Eclipse Modal */}
      <EclipseModal
        isOpen={isEclipseOpen}
        onClose={() => setIsEclipseOpen(false)}
        lang={lang}
        onSelectDate={(newDate) => {
          setViewDate(newDate);
          fetchDate(newDate);
        }}
      />

      {/* Auspicious Muhurat Modal */}
      <AuspiciousMuhuratModal
        isOpen={isMuhuratOpen}
        onClose={() => setIsMuhuratOpen(false)}
        lang={lang}
        onSelectDate={(newDate) => {
          setViewDate(newDate);
          fetchDate(newDate);
        }}
      />

      {/* Moon Phase (Amavasya / Purnima) Modal */}
      <MoonPhaseModal
        isOpen={isMoonPhaseOpen}
        onClose={() => setIsMoonPhaseOpen(false)}
        initialTab={moonPhaseTab}
        lang={lang}
        onSelectDate={(newDate) => {
          setViewDate(newDate);
          fetchDate(newDate);
        }}
      />

      {/* Rashi Nirnay Modal */}
      <RashiNirnayModal
        isOpen={isRashiNirnayOpen}
        onClose={() => setIsRashiNirnayOpen(false)}
        lang={lang}
        onOpenRashiphol={(rashiCode) => {
          setSelectedRashiCode(rashiCode);
          setIsRashipholOpen(true);
        }}
      />

      {/* Vrata Modal */}
      <VrataModal
        isOpen={isVrataOpen}
        onClose={() => setIsVrataOpen(false)}
        lang={lang}
        onSelectDate={(newDate) => {
          setViewDate(newDate);
          fetchDate(newDate);
        }}
      />
    </div>
  );
}
