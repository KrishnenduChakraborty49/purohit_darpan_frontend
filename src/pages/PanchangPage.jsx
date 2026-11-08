import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { usePanchangStore } from '../store/panchangStore';
import toast from 'react-hot-toast';
import { 
  Globe, ChevronLeft, ChevronRight, Calendar as CalendarIcon, 
  Share2, Copy, Sparkles, Search, Info, Sun, Moon, 
  Clock, Check, Compass, ShieldAlert, Award, ExternalLink
} from 'lucide-react';
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
    sunrise: 'সূর্যোদয়',
    sunset: 'সূর্যাস্ত',
    notice1: 'সূর্যোদয়ের পর থেকে সূর্যাস্ত পর্যন্ত সময়কে দিবা আর সূর্যাস্তের পরের সময়কে রাত্রি হিসেবে চিহ্নিত করা হয়েছে।',
    notice2: '*** অ্যাপ্লিকেশনের তারিখ পরিবর্তন হয় সূর্যোদয়ের পর।',
    quickNav: 'দ্রুত নেভিগেশন (Quick Navigation)',
    comingSoon: 'এই ফিচারটি খুব শীঘ্রই আসছে!',
    days: ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'],
    months: ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'],
    numbers: ['০','১','২','৩','৪','৫','৬','৭','৮','৯'],
    grid: [
      'ক্যালেন্ডার', 'পঞ্জিকা', 'রাশিফল', 'পূজার দিন',
      'বিবাহের দিন', 'একাদশী', 'গ্রহণ', 'অন্যান্য',
      'অমাবস্যা', 'পূর্ণিমা', 'রাশি নির্ণয়', 'ব্রত'
    ],
    categories: {
      all: 'সব ফিচার',
      pujas: 'পূজা ও ব্রত',
      astrology: 'রাশি ও জ্যোতিষ',
      tithis: 'তিথি ও পর্ব'
    }
  },
  hi: {
    title: 'बंगाली पंचांग 1433',
    sunrise: 'सूर्योदय',
    sunset: 'सूर्यास्त',
    notice1: 'सूर्योदय से सूर्यास्त तक का समय दिन और सूर्यास्त के बाद का समय रात माना गया है।',
    notice2: '*** एप्लिकेशन की तिथि सूर्योदय के बाद बदलती है।',
    quickNav: 'त्वरित नेविगेशन (Quick Navigation)',
    comingSoon: 'यह सुविधा जल्द ही आ रही है!',
    days: ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'],
    months: ['जनवरी', 'फरवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'],
    numbers: ['०','१','२','३','४','५','६','७','८','९'],
    grid: [
      'कैलेंडर', 'पंचांग', 'राशिफल', 'पूजा के दिन',
      'विवाह मुहूर्त', 'एकादशी', 'ग्रहण', 'अन्य',
      'अमावस्या', 'पूर्णिमा', 'राशि निर्णय', 'व्रत'
    ],
    categories: {
      all: 'सभी फीचर',
      pujas: 'पूजा व व्रत',
      astrology: 'राशि व ज्योतिष',
      tithis: 'तिथि व पर्व'
    }
  },
  en: {
    title: 'Bengali Panchang 1433',
    sunrise: 'Sunrise',
    sunset: 'Sunset',
    notice1: 'The time from sunrise to sunset is considered day and after sunset is considered night.',
    notice2: '*** The date in the app changes after sunrise.',
    quickNav: 'Quick Navigation',
    comingSoon: 'This feature is coming soon!',
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    numbers: ['0','1','2','3','4','5','6','7','8','9'],
    grid: [
      'Calendar', 'Panchang', 'Horoscope', 'Puja Days',
      'Marriage Days', 'Ekadashi', 'Eclipse', 'Others',
      'Amavasya', 'Purnima', 'Rashi Nirnay', 'Vrata'
    ],
    categories: {
      all: 'All Features',
      pujas: 'Pujas & Vrats',
      astrology: 'Zodiac & Astro',
      tithis: 'Tithis & Eclipses'
    }
  }
};

export default function PanchangPage() {
  const { today: panchangData, fetchDate, loading } = usePanchangStore();
  const [viewDate, setViewDate] = useState(new Date());
  const [lang, setLang] = useState('bn');
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchNav, setSearchNav] = useState('');
  const [selectedInfoCard, setSelectedInfoCard] = useState(null);

  // Modals state
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isPujaDaysOpen, setIsPujaDaysOpen] = useState(false);
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

  const t = TRANSLATIONS[lang] || TRANSLATIONS.bn;

  useEffect(() => {
    fetchDate(viewDate);
  }, [fetchDate, viewDate]);

  // Date Navigation Helpers
  const isToday = (d) => {
    const today = new Date();
    return d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear();
  };

  const handlePrevDay = () => {
    const prev = new Date(viewDate);
    prev.setDate(prev.getDate() - 1);
    setViewDate(prev);
  };

  const handleNextDay = () => {
    const next = new Date(viewDate);
    next.setDate(next.getDate() + 1);
    setViewDate(next);
  };

  const handleSetToday = () => {
    setViewDate(new Date());
  };

  const handleDateChange = (e) => {
    if (e.target.value) {
      setViewDate(new Date(e.target.value + 'T00:00:00'));
    }
  };

  // Convert digits to localized numbers
  const toLocalNumbers = (numStr) => {
    if (lang === 'en') return String(numStr);
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

  // Smooth scroll helper
  const scrollToPanchang = () => {
    const el = document.getElementById('panchang-details');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('ring-4', 'ring-orange-400', 'transition-all');
      setTimeout(() => el.classList.remove('ring-4', 'ring-orange-400'), 2500);
    }
  };

  // Share to WhatsApp
  const handleShareWhatsApp = () => {
    const dateStr = formatDate(viewDate);
    const dayStr = getDayName(viewDate);
    const tithiStr = panchangData?.tithi || 'শুভ তিথি';
    const text = `🙏 আজকের বাংলা পঞ্জিকা (${dayStr}, ${dateStr})\n• তিথি: ${tithiStr}\n• সূর্যোদয়: ${panchangData?.sunrise || '-'}\n• সূর্যাস্ত: ${panchangData?.sunset || '-'}\n\nবিশদ পঞ্জিকা ও পূজা নির্ঘণ্ট দেখুন Purohit Darpan এ:\nhttps://purohit-darpan-frontend.vercel.app/panchang`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Copy Panchang info
  const handleCopyPanchang = () => {
    const dateStr = formatDate(viewDate);
    const dayStr = getDayName(viewDate);
    const tithiStr = panchangData?.tithi || 'শুভ তিথি';
    const text = `বাংলা পঞ্জিকা: ${dayStr}, ${dateStr} | তিথি: ${tithiStr} | সূর্যোদয়: ${panchangData?.sunrise || '-'} | সূর্যাস্ত: ${panchangData?.sunset || '-'}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success(lang === 'bn' ? 'পঞ্জিকা বিবরণ কপি হয়েছে!' : 'Panchang details copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  // 12 Quick Navigation Items
  const gridItems = [
    { 
      id: 'calendar',
      category: 'astrology',
      label: t.grid[0], 
      icon: '📅', 
      badge: lang === 'bn' ? 'মাসিক' : 'Monthly',
      color: 'text-orange-500', 
      bg: 'bg-orange-50 border-orange-200', 
      action: () => setIsCalendarOpen(true) 
    },
    { 
      id: 'panchang',
      category: 'astrology',
      label: t.grid[1], 
      icon: '🌌', 
      badge: lang === 'bn' ? 'বিশদ' : 'Detailed',
      color: 'text-indigo-500', 
      bg: 'bg-indigo-50 border-indigo-200', 
      action: scrollToPanchang 
    },
    { 
      id: 'horoscope',
      category: 'astrology',
      label: t.grid[2], 
      icon: '♈', 
      badge: lang === 'bn' ? 'লাইভ' : 'Live',
      badgePulse: true,
      color: 'text-purple-500', 
      bg: 'bg-purple-50 border-purple-200', 
      action: () => { setSelectedRashiCode('aries'); setIsRashipholOpen(true); } 
    },
    { 
      id: 'puja_days',
      category: 'pujas',
      label: t.grid[3], 
      icon: '🪔', 
      badge: lang === 'bn' ? 'আজ উৎসব' : 'Today',
      badgePulse: true,
      color: 'text-amber-500', 
      bg: 'bg-amber-50 border-amber-200', 
      action: () => setIsPujaDaysOpen(true) 
    },
    { 
      id: 'marriage',
      category: 'tithis',
      label: t.grid[4], 
      icon: '🎁', 
      badge: lang === 'bn' ? 'লগ্ন' : 'Muhurat',
      color: 'text-rose-500', 
      bg: 'bg-rose-50 border-rose-200', 
      action: () => setIsMarriageOpen(true) 
    },
    { 
      id: 'ekadashi',
      category: 'pujas',
      label: t.grid[5], 
      icon: '📖', 
      badge: lang === 'bn' ? 'ব্রত' : 'Vrata',
      color: 'text-emerald-500', 
      bg: 'bg-emerald-50 border-emerald-200', 
      action: () => setIsEkadashiOpen(true) 
    },
    { 
      id: 'eclipse',
      category: 'tithis',
      label: t.grid[6], 
      icon: '🌑', 
      badge: lang === 'bn' ? 'সূতক' : 'Sutak',
      color: 'text-slate-600', 
      bg: 'bg-slate-100 border-slate-200', 
      action: () => setIsEclipseOpen(true) 
    },
    { 
      id: 'muhurat',
      category: 'pujas',
      label: t.grid[7], 
      icon: '田', 
      badge: lang === 'bn' ? 'শুভ কাল' : 'Shubh',
      color: 'text-teal-600', 
      bg: 'bg-teal-50 border-teal-200', 
      action: () => setIsMuhuratOpen(true) 
    },
    { 
      id: 'amavasya',
      category: 'tithis',
      label: t.grid[8], 
      icon: '🌘', 
      badge: lang === 'bn' ? 'আজ' : 'Today',
      badgePulse: true,
      color: 'text-purple-600', 
      bg: 'bg-purple-50 border-purple-200', 
      action: () => { setMoonPhaseTab('amavasya'); setIsMoonPhaseOpen(true); } 
    },
    { 
      id: 'purnima',
      category: 'tithis',
      label: t.grid[9], 
      icon: '🌕', 
      badge: lang === 'bn' ? 'পূর্ণিমা' : 'Purnima',
      color: 'text-amber-500', 
      bg: 'bg-amber-50 border-amber-200', 
      action: () => { setMoonPhaseTab('purnima'); setIsMoonPhaseOpen(true); } 
    },
    { 
      id: 'rashi_calc',
      category: 'astrology',
      label: t.grid[10], 
      icon: '☸️', 
      badge: lang === 'bn' ? 'গণনা' : 'Find',
      color: 'text-blue-500', 
      bg: 'bg-blue-50 border-blue-200', 
      action: () => setIsRashiNirnayOpen(true) 
    },
    { 
      id: 'vrata',
      category: 'pujas',
      label: t.grid[11], 
      icon: '🗓️', 
      badge: lang === 'bn' ? 'উপবাস' : 'Fasts',
      color: 'text-rose-600', 
      bg: 'bg-rose-50 border-rose-200', 
      action: () => setIsVrataOpen(true) 
    }
  ];

  // Filter grid items by category and search term
  const filteredGridItems = gridItems.filter(item => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const matchesQuery = !searchNav || item.label.toLowerCase().includes(searchNav.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-orange-50/20 to-stone-100 pt-24 pb-16 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">

        {/* 1. Festival & Sacred Occasion Notification Banner */}
        <FestivalNotificationBanner 
          lang={lang}
          onOpenPujaModal={() => setIsPujaDaysOpen(true)}
          onViewPanchang={scrollToPanchang}
          currentDate={viewDate}
        />

        {/* 2. Top Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-white/90 backdrop-blur-md rounded-2xl shadow-sm border border-orange-500/15">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-xl shadow-sm">
              🪔
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                {t.title}
              </h1>
              <p className="text-xs text-stone-500 hidden sm:block">
                {lang === 'bn' ? 'বেদান্ত ও বিশুদ্ধ সিদ্ধান্ত ভিত্তিক পঞ্জিকা গণনা' : 'Vedic & Drik Siddhanta Panchang'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Share & Copy Buttons */}
            <button
              onClick={handleShareWhatsApp}
              title={lang === 'bn' ? 'হোয়াটসঅ্যাপে শেয়ার করুন' : 'Share on WhatsApp'}
              className="p-2 rounded-xl text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors flex items-center gap-1.5 text-xs font-semibold"
            >
              <Share2 size={16} />
              <span className="hidden md:inline">{lang === 'bn' ? 'শেয়ার' : 'Share'}</span>
            </button>

            <button
              onClick={handleCopyPanchang}
              title={lang === 'bn' ? 'পঞ্জিকা বিবরণ কপি করুন' : 'Copy Panchang info'}
              className="p-2 rounded-xl text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors flex items-center gap-1.5 text-xs font-semibold"
            >
              {copied ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
              <span className="hidden md:inline">{copied ? (lang === 'bn' ? 'কপি হয়েছে' : 'Copied') : (lang === 'bn' ? 'কপি' : 'Copy')}</span>
            </button>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-1 text-stone-700 hover:text-stone-900 transition-colors bg-stone-100 hover:bg-stone-200 px-3 py-2 rounded-xl text-xs font-bold uppercase"
              >
                <Globe size={15} />
                <span>{lang}</span>
              </button>

              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-2xl shadow-xl border border-stone-200 py-2 z-50 animate-in fade-in slide-in-from-top-1">
                  <button onClick={() => { setLang('bn'); setShowLangMenu(false); }} className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-orange-50 ${lang === 'bn' ? 'font-bold text-orange-600 bg-orange-50/50' : 'text-stone-700'}`}>বাংলা (BN)</button>
                  <button onClick={() => { setLang('hi'); setShowLangMenu(false); }} className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-orange-50 ${lang === 'hi' ? 'font-bold text-orange-600 bg-orange-50/50' : 'text-stone-700'}`}>हिन्दी (HI)</button>
                  <button onClick={() => { setLang('en'); setShowLangMenu(false); }} className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-orange-50 ${lang === 'en' ? 'font-bold text-orange-600 bg-orange-50/50' : 'text-stone-700'}`}>English (EN)</button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 3. Main Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

          {/* Left Column: Interactive Date Card & Panchang Details */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Interactive Blue Celestial Card */}
            <div className="bg-gradient-to-br from-[#1E3A8A] via-[#2563EB] to-[#1D4ED8] rounded-3xl overflow-hidden shadow-xl border border-blue-400/30 text-white relative">
              {/* Background celestial shimmer */}
              <div className="absolute -top-12 -right-12 w-44 h-44 bg-blue-300/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-44 h-44 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

              {/* Card Header with Interactive Date Stepper */}
              <div className="p-5 lg:p-6 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrevDay}
                      title={lang === 'bn' ? 'পূর্ববর্তী দিন' : 'Previous Day'}
                      className="w-9 h-9 rounded-xl bg-white/15 hover:bg-white/25 active:scale-90 text-white flex items-center justify-center transition-all shadow-sm"
                    >
                      <ChevronLeft size={20} />
                    </button>

                    <button
                      onClick={handleNextDay}
                      title={lang === 'bn' ? 'পরবর্তী দিন' : 'Next Day'}
                      className="w-9 h-9 rounded-xl bg-white/15 hover:bg-white/25 active:scale-90 text-white flex items-center justify-center transition-all shadow-sm"
                    >
                      <ChevronRight size={20} />
                    </button>
                    
                    {/* Interactive Date Picker Button */}
                    <label className="relative cursor-pointer">
                      <input 
                        type="date" 
                        onChange={handleDateChange}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        title={lang === 'bn' ? 'তারিখ নির্বাচন করুন' : 'Pick a Date'}
                      />
                      <div className="px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-xs font-semibold flex items-center gap-1.5 transition-all">
                        <CalendarIcon size={14} />
                        <span>{lang === 'bn' ? 'তারিখ বাছুন' : 'Pick Date'}</span>
                      </div>
                    </label>
                  </div>

                  {/* If not today, show Back to Today reset */}
                  {!isToday(viewDate) && (
                    <button
                      onClick={handleSetToday}
                      className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold shadow-md transition-all animate-pulse flex items-center gap-1"
                    >
                      <Clock size={13} />
                      {lang === 'bn' ? 'আজকের দিন' : 'Go to Today'}
                    </button>
                  )}
                </div>

                {/* Day & Date Highlight */}
                <div className="flex items-end justify-between gap-2">
                  <div>
                    <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight">
                      {getDayName(viewDate)}
                    </h2>
                    <p className="text-blue-100 text-sm sm:text-base font-medium mt-0.5">
                      {formatDate(viewDate)}
                    </p>
                  </div>

                  {panchangData?.tithi && (
                    <div className="bg-white/20 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/25 text-right shadow-sm">
                      <span className="text-[10px] text-blue-200 block font-semibold uppercase tracking-wider">
                        {lang === 'bn' ? 'তিথি' : 'Tithi'}
                      </span>
                      <span className="text-white font-bold text-sm sm:text-base">
                        {panchangData.tithi}
                      </span>
                    </div>
                  )}
                </div>

                {/* Quick Date Chips */}
                <div className="mt-4 pt-3 border-t border-white/15 flex items-center gap-2">
                  <button
                    onClick={() => {
                      const d = new Date();
                      d.setDate(d.getDate() - 1);
                      setViewDate(d);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] font-medium transition-colors"
                  >
                    {lang === 'bn' ? 'গতকাল' : 'Yesterday'}
                  </button>

                  <button
                    onClick={handleSetToday}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                      isToday(viewDate) 
                        ? 'bg-white text-blue-900 font-bold shadow-sm' 
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    {lang === 'bn' ? 'আজ' : 'Today'}
                  </button>

                  <button
                    onClick={() => {
                      const d = new Date();
                      d.setDate(d.getDate() + 1);
                      setViewDate(d);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] font-medium transition-colors"
                  >
                    {lang === 'bn' ? 'আগামীকাল' : 'Tomorrow'}
                  </button>
                </div>
              </div>

              {/* Bottom half: Sunrise / Sunset with Celestial Visual Line */}
              <div className="bg-[#173A75] px-5 py-4 border-t border-white/10 relative">
                <div className="grid grid-cols-2 gap-4 relative z-10">
                  
                  {/* Sunrise */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center justify-center text-xl flex-shrink-0">
                      <Sun size={20} className="animate-spin-slow" />
                    </div>
                    <div>
                      <span className="text-[11px] text-blue-200 block font-medium uppercase tracking-wider">
                        {t.sunrise}
                      </span>
                      <p className="text-white font-bold text-xs sm:text-sm">
                        {panchangData?.sunrise ? formatTimeStr(panchangData.sunrise) : '০৬টা ১৫মি'}
                      </p>
                    </div>
                  </div>

                  {/* Sunset */}
                  <div className="flex items-center gap-3 justify-end text-right">
                    <div>
                      <span className="text-[11px] text-blue-200 block font-medium uppercase tracking-wider">
                        {t.sunset}
                      </span>
                      <p className="text-white font-bold text-xs sm:text-sm">
                        {panchangData?.sunset ? formatTimeStr(panchangData.sunset) : '১৮টা ৩০মি'}
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-300 border border-orange-400/30 flex items-center justify-center text-xl flex-shrink-0">
                      <Moon size={20} />
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Notice card */}
            <div className="px-5 py-3.5 flex gap-3 bg-white/80 rounded-2xl shadow-sm border border-stone-200 text-stone-600 text-xs">
              <div className="mt-1 w-2.5 h-2.5 rounded-full bg-orange-500 flex-shrink-0 animate-ping" />
              <p className="leading-relaxed">
                {t.notice1} <span className="text-stone-500 block mt-1">{t.notice2}</span>
              </p>
            </div>

            {/* 4. Detailed Panchang Data */}
            {panchangData && (
              <div id="panchang-details" className="bg-white rounded-3xl shadow-sm border border-orange-500/15 p-5 sm:p-6 transition-all duration-300">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <Compass size={18} className="text-orange-600" />
                    <h3 className="text-base sm:text-lg font-bold text-stone-900">
                      {lang === 'bn' ? 'আজকের পঞ্চাঙ্গ বিবরণ' : "Today's Panchang Details"}
                    </h3>
                  </div>
                  <span className="text-[11px] text-orange-700 bg-orange-50 font-semibold px-2.5 py-1 rounded-full border border-orange-200">
                    {lang === 'bn' ? 'বিশুদ্ধ সিদ্ধান্ত' : 'Drik'}
                  </span>
                </div>

                {/* 4 Interactive Attribute Cards with explanations */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {/* Tithi */}
                  <div 
                    onClick={() => setSelectedInfoCard(selectedInfoCard === 'tithi' ? null : 'tithi')}
                    className="p-3.5 bg-gradient-to-br from-amber-50 to-orange-50/40 rounded-2xl border border-orange-200/60 hover:border-orange-300 transition-all cursor-pointer group shadow-sm hover:shadow"
                  >
                    <div className="flex items-center justify-between text-xs text-orange-700 font-semibold uppercase mb-1">
                      <span>{lang === 'bn' ? 'তিথি' : 'Tithi'}</span>
                      <Info size={13} className="text-orange-400 group-hover:text-orange-600 transition-colors" />
                    </div>
                    <p className="text-stone-900 font-bold text-sm sm:text-base">
                      {panchangData.tithi || '-'}
                    </p>
                    {selectedInfoCard === 'tithi' && (
                      <p className="text-[11px] text-orange-800 mt-2 pt-2 border-t border-orange-200/50 leading-relaxed animate-in fade-in">
                        {lang === 'bn' ? 'চন্দ্র ও সূর্যের পারস্পরিক কোণ দূরত্ব অনুসারে তিথি নির্ধারিত হয়।' : 'Lunar day calculated based on angular distance between Sun and Moon.'}
                      </p>
                    )}
                  </div>

                  {/* Nakshatra */}
                  <div 
                    onClick={() => setSelectedInfoCard(selectedInfoCard === 'nakshatra' ? null : 'nakshatra')}
                    className="p-3.5 bg-gradient-to-br from-indigo-50 to-blue-50/40 rounded-2xl border border-indigo-200/60 hover:border-indigo-300 transition-all cursor-pointer group shadow-sm hover:shadow"
                  >
                    <div className="flex items-center justify-between text-xs text-indigo-700 font-semibold uppercase mb-1">
                      <span>{lang === 'bn' ? 'নক্ষত্র' : 'Nakshatra'}</span>
                      <Info size={13} className="text-indigo-400 group-hover:text-indigo-600 transition-colors" />
                    </div>
                    <p className="text-stone-900 font-bold text-sm sm:text-base">
                      {panchangData.nakshatra || '-'}
                    </p>
                    {selectedInfoCard === 'nakshatra' && (
                      <p className="text-[11px] text-indigo-800 mt-2 pt-2 border-t border-indigo-200/50 leading-relaxed animate-in fade-in">
                        {lang === 'bn' ? 'চন্দ্রের গতিপথের ২৭টি তারামণ্ডলের মধ্যে বর্তমান অবস্থান।' : 'Current lunar mansion among the 27 stellar constellations.'}
                      </p>
                    )}
                  </div>

                  {/* Yoga */}
                  <div 
                    onClick={() => setSelectedInfoCard(selectedInfoCard === 'yoga' ? null : 'yoga')}
                    className="p-3.5 bg-gradient-to-br from-purple-50 to-pink-50/40 rounded-2xl border border-purple-200/60 hover:border-purple-300 transition-all cursor-pointer group shadow-sm hover:shadow"
                  >
                    <div className="flex items-center justify-between text-xs text-purple-700 font-semibold uppercase mb-1">
                      <span>{lang === 'bn' ? 'যোগ' : 'Yoga'}</span>
                      <Info size={13} className="text-purple-400 group-hover:text-purple-600 transition-colors" />
                    </div>
                    <p className="text-stone-900 font-bold text-sm sm:text-base">
                      {panchangData.yoga || '-'}
                    </p>
                    {selectedInfoCard === 'yoga' && (
                      <p className="text-[11px] text-purple-800 mt-2 pt-2 border-t border-purple-200/50 leading-relaxed animate-in fade-in">
                        {lang === 'bn' ? 'সূর্য ও চন্দ্রের দ্রাঘিমাংশের যোগফল দ্বারা নির্ধারিত ২৭টি যোগের একটি।' : 'Auspicious celestial period based on combined solar and lunar longitude.'}
                      </p>
                    )}
                  </div>

                  {/* Karana */}
                  <div 
                    onClick={() => setSelectedInfoCard(selectedInfoCard === 'karana' ? null : 'karana')}
                    className="p-3.5 bg-gradient-to-br from-teal-50 to-emerald-50/40 rounded-2xl border border-teal-200/60 hover:border-teal-300 transition-all cursor-pointer group shadow-sm hover:shadow"
                  >
                    <div className="flex items-center justify-between text-xs text-teal-700 font-semibold uppercase mb-1">
                      <span>{lang === 'bn' ? 'করণ' : 'Karana'}</span>
                      <Info size={13} className="text-teal-400 group-hover:text-teal-600 transition-colors" />
                    </div>
                    <p className="text-stone-900 font-bold text-sm sm:text-base">
                      {panchangData.karana || '-'}
                    </p>
                    {selectedInfoCard === 'karana' && (
                      <p className="text-[11px] text-teal-800 mt-2 pt-2 border-t border-teal-200/50 leading-relaxed animate-in fade-in">
                        {lang === 'bn' ? 'একটি পূর্ণ তিথির প্রথমার্ধ বা দ্বিতীয়ার্ধকে করণ বলা হয়।' : 'Half of a lunar day (Tithi) determining immediate actions.'}
                      </p>
                    )}
                  </div>
                </div>

                {/* Auspicious Muhurats (Brahma Muhurta) */}
                {panchangData.brahmaMuhurtaStart && panchangData.brahmaMuhurtaEnd && (
                  <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200/80 flex items-center justify-between gap-3 shadow-sm">
                    <div>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <Sparkles size={14} className="text-emerald-600" />
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                          {lang === 'bn' ? 'ব্রহ্ম মুহূর্ত (পরম শুভ কাল)' : 'Brahma Muhurta (Most Auspicious)'}
                        </span>
                      </div>
                      <p className="text-emerald-950 font-extrabold text-sm sm:text-base">
                        {formatTimeStr(panchangData.brahmaMuhurtaStart)} — {formatTimeStr(panchangData.brahmaMuhurtaEnd)}
                      </p>
                      <p className="text-[11px] text-emerald-700/80 mt-0.5">
                        {lang === 'bn' ? 'ধ্যান, জপ ও পূজা আরম্ভের সর্বোত্তম পুণ্যলগ্ন।' : 'Ideal for spiritual study, meditation, and ritual prayers.'}
                      </p>
                    </div>
                    <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-xl flex-shrink-0 shadow-md">
                      🕉️
                    </div>
                  </div>
                )}

                {/* Inauspicious Timings (Rahu Kaal) */}
                {panchangData.rahuStart && panchangData.rahuEnd && (
                  <div className="mt-3 p-4 rounded-2xl bg-gradient-to-r from-rose-50 via-red-50 to-rose-50 border border-rose-200/80 flex items-center justify-between gap-3 shadow-sm">
                    <div>
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <ShieldAlert size={14} className="text-rose-600" />
                        <span className="text-xs font-bold uppercase tracking-wider text-rose-800">
                          {lang === 'bn' ? 'রাহুকাল (বর্জনীয় সময়)' : 'Rahu Kaal (Inauspicious Period)'}
                        </span>
                      </div>
                      <p className="text-rose-950 font-extrabold text-sm sm:text-base">
                        {formatTimeStr(panchangData.rahuStart)} — {formatTimeStr(panchangData.rahuEnd)}
                      </p>
                      <p className="text-[11px] text-rose-700/80 mt-0.5">
                        {lang === 'bn' ? 'এই সময়ে শুভ কাজ বা নতুন যাত্রা আরম্ভ পরিহার্য।' : 'Avoid starting new endeavors, travel, or agreements during this time.'}
                      </p>
                    </div>
                    <div className="w-11 h-11 rounded-2xl bg-rose-600 text-white flex items-center justify-center text-xl flex-shrink-0 shadow-md">
                      ⚠️
                    </div>
                  </div>
                )}

              </div>
            )}

          </div>

          {/* Right Column: Interactive Quick Navigation Control Center */}
          <div className="lg:col-span-7 bg-white rounded-3xl shadow-sm border border-orange-500/15 p-5 sm:p-7">
            
            {/* Header with Title and Search */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-stone-100">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
                  <Award size={20} className="text-orange-500" />
                  {t.quickNav}
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  {lang === 'bn' ? 'সনাতন ধর্মাচার ও নির্ঘণ্টের ১২টি প্রধান সেবা' : '12 Core Vedic calendar & ritual utilities'}
                </p>
              </div>

              {/* Instant Search Bar */}
              <div className="relative w-full sm:w-56">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  value={searchNav}
                  onChange={(e) => setSearchNav(e.target.value)}
                  placeholder={lang === 'bn' ? 'অনুসন্ধান করুন...' : 'Filter features...'}
                  className="w-full pl-8 pr-3 py-1.5 bg-stone-50 hover:bg-stone-100 focus:bg-white border border-stone-200 rounded-xl text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-400/50 transition-all"
                />
              </div>
            </div>

            {/* Interactive Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 mb-6">
              {[
                { id: 'all', label: t.categories.all },
                { id: 'pujas', label: t.categories.pujas },
                { id: 'astrology', label: t.categories.astrology },
                { id: 'tithis', label: t.categories.tithis }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    activeCategory === cat.id
                      ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-sm scale-105'
                      : 'bg-stone-100 hover:bg-stone-200/80 text-stone-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* 12-Card Grid with Rich Tactile Micro-Interactions */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4">
              {filteredGridItems.map((item) => (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="group relative p-3 sm:p-4 rounded-2xl bg-white hover:bg-gradient-to-b hover:from-orange-50/60 hover:to-amber-50/40 border border-stone-100 hover:border-orange-300 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1 active:scale-95 flex flex-col items-center justify-between text-center cursor-pointer min-h-[110px] sm:min-h-[125px]"
                >
                  {/* Badge tag */}
                  {item.badge && (
                    <span className={`absolute top-2 right-2 text-[9px] font-bold px-1.5 py-0.5 rounded-md ${
                      item.badgePulse
                        ? 'bg-amber-400 text-stone-950 shadow-sm animate-pulse'
                        : 'bg-stone-100 text-stone-600 group-hover:bg-orange-100 group-hover:text-orange-800'
                    } transition-colors`}>
                      {item.badge}
                    </span>
                  )}

                  {/* Icon Circle */}
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${item.bg} flex items-center justify-center text-2xl sm:text-3xl shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 mt-1`}>
                    <span className={item.color}>{item.icon}</span>
                  </div>

                  {/* Label */}
                  <span className="text-xs sm:text-sm font-bold text-stone-800 group-hover:text-orange-600 transition-colors mt-2 leading-tight">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>

            {filteredGridItems.length === 0 && (
              <div className="text-center py-12 text-stone-400">
                <p className="text-sm">{lang === 'bn' ? 'কোনো ফিচার পাওয়া যায়নি' : 'No features matched your search'}</p>
                <button 
                  onClick={() => { setSearchNav(''); setActiveCategory('all'); }}
                  className="mt-2 text-xs text-orange-600 font-semibold underline"
                >
                  {lang === 'bn' ? 'সকল ফিচার প্রদর্শন করুন' : 'Show all features'}
                </button>
              </div>
            )}

            {/* Quick Helper Banner */}
            <div className="mt-8 p-4 rounded-2xl bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 border border-orange-200/60 flex items-center justify-between text-xs text-stone-700">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-orange-600 flex-shrink-0" />
                <span>
                  {lang === 'bn' 
                    ? 'যেকোনো আইকনে ক্লিক করে সরাসরি পূর্ণাঙ্গ নির্ঘণ্ট ও তিথি জানুন।' 
                    : 'Click any card to explore comprehensive auspicious timings & rituals.'}
                </span>
              </div>
              <button 
                onClick={() => setIsPujaDaysOpen(true)}
                className="text-orange-700 font-bold hover:underline flex items-center gap-1 flex-shrink-0 ml-2"
              >
                {lang === 'bn' ? 'পূজা তালিকা' : 'View All'} <ExternalLink size={12} />
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Modals Suite */}
      <PujaDaysModal
        isOpen={isPujaDaysOpen}
        onClose={() => setIsPujaDaysOpen(false)}
        lang={lang}
        onSelectDate={(newDate) => {
          setViewDate(newDate);
          scrollToPanchang();
        }}
      />

      <CalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        lang={lang}
        onSelectDate={(newDate) => {
          setViewDate(newDate);
          scrollToPanchang();
        }}
      />

      <RashipholModal
        isOpen={isRashipholOpen}
        onClose={() => setIsRashipholOpen(false)}
        lang={lang}
        initialRashiCode={selectedRashiCode}
      />

      <MarriageDatesModal
        isOpen={isMarriageOpen}
        onClose={() => setIsMarriageOpen(false)}
        lang={lang}
        onSelectDate={(newDate) => {
          setViewDate(newDate);
          scrollToPanchang();
        }}
      />

      <EkadashiModal
        isOpen={isEkadashiOpen}
        onClose={() => setIsEkadashiOpen(false)}
        lang={lang}
        onSelectDate={(newDate) => {
          setViewDate(newDate);
          scrollToPanchang();
        }}
      />

      <EclipseModal
        isOpen={isEclipseOpen}
        onClose={() => setIsEclipseOpen(false)}
        lang={lang}
        onSelectDate={(newDate) => {
          setViewDate(newDate);
          scrollToPanchang();
        }}
      />

      <AuspiciousMuhuratModal
        isOpen={isMuhuratOpen}
        onClose={() => setIsMuhuratOpen(false)}
        lang={lang}
        onSelectDate={(newDate) => {
          setViewDate(newDate);
          scrollToPanchang();
        }}
      />

      <MoonPhaseModal
        isOpen={isMoonPhaseOpen}
        onClose={() => setIsMoonPhaseOpen(false)}
        lang={lang}
        defaultTab={moonPhaseTab}
        onSelectDate={(newDate) => {
          setViewDate(newDate);
          scrollToPanchang();
        }}
      />

      <RashiNirnayModal
        isOpen={isRashiNirnayOpen}
        onClose={() => setIsRashiNirnayOpen(false)}
        lang={lang}
        onOpenRashiphol={(rashiCode) => {
          setSelectedRashiCode(rashiCode);
          setIsRashipholOpen(true);
        }}
      />

      <VrataModal
        isOpen={isVrataOpen}
        onClose={() => setIsVrataOpen(false)}
        lang={lang}
        onSelectDate={(newDate) => {
          setViewDate(newDate);
          scrollToPanchang();
        }}
      />

    </div>
  );
}
