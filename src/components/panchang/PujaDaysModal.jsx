import React, { useState, useEffect } from 'react';
import { X, Search, BookOpen, Calendar, Clock, Sparkles } from 'lucide-react';
import { differenceInDays, format, parseISO } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';

const MASTER_FESTIVALS = [
  {
    id: 101,
    nameBn: 'শ্রী শ্রী সরস্বতী পূজা',
    nameEn: 'Saraswati Puja (Basant Panchami)',
    eventDate: '2026-01-23',
    tithiBn: 'মাঘ শুক্লা পঞ্চমী',
    description: 'বিদ্যা ও জ্ঞানের দেবী মা সরস্বতীর আরাধনা।',
    icon: '🤍',
    category: 'major',
    pujaId: 8
  },
  {
    id: 102,
    nameBn: 'মহা শিবরাত্রি ব্রত',
    nameEn: 'Maha Shivaratri',
    eventDate: '2026-02-15',
    tithiBn: 'ফাল্গুন কৃষ্ণা ধতুর্দশী',
    description: 'দেবাধিদেব মহাদেবের পরম পাবন রাত্রি।',
    icon: '🕉',
    category: 'major',
    pujaId: 9
  },
  {
    id: 103,
    nameBn: 'শ্রী শ্রী কৃষ্ণের দোলযাত্রা',
    nameEn: 'Dol Yatra / Holi',
    eventDate: '2026-03-03',
    tithiBn: 'ফাল্গুন পূর্ণিমা',
    description: 'রাধাকৃষ্ণের পবিত্র দোলোৎসব ও গৌর পূর্ণিমা।',
    icon: '🎨',
    category: 'major',
    pujaId: null
  },
  {
    id: 104,
    nameBn: 'পয়লা বৈশাখ (নববর্ষ ১৪৩৩)',
    nameEn: 'Poila Boishakh (Bengali New Year 1433)',
    eventDate: '2026-04-15',
    tithiBn: '১ই বৈশাখ, ১৪৩৩',
    description: 'বাংলা নববর্ষের শুভারম্ভ। হালখাতা ও গণেশ পূজা।',
    icon: '🪔',
    category: 'traditional',
    pujaId: 1
  },
  {
    id: 105,
    nameBn: 'অক্ষয় তৃতীয়া',
    nameEn: 'Akshaya Tritiya',
    eventDate: '2026-04-19',
    tithiBn: 'বৈশাখ শুক্লা তৃতীয়া',
    description: 'অক্ষয় পুণ্য অর্জনের দিন। স্বর্ণ ক্রয় ও লক্ষ্মী-নারায়ণ পূজা।',
    icon: '🌟',
    category: 'major',
    pujaId: 2
  },
  {
    id: 106,
    nameBn: 'শ্রী জগন্নাথ দেবের রথযাত্রা',
    nameEn: 'Rath Yatra (Puri & Bengal)',
    eventDate: '2026-06-16',
    tithiBn: 'আষাঢ় শুক্লা দ্বিতীয়া',
    description: 'ভগবান জগন্নাথ, বলভদ্র ও সুভদ্রার পবিত্র রথযাত্রা।',
    icon: '🛠',
    category: 'major',
    pujaId: null
  },
  {
    id: 107,
    nameBn: 'গুরু পূর্ণিমা (ব্যাস পূজা)',
    nameEn: 'Guru Purnima',
    eventDate: '2026-06-29',
    tithiBn: 'আষাঢ় পূর্ণিমা',
    description: 'মহর্ষি ব্যাসদেবের আবির্ভাব তিথি ও গুরুপূজা।',
    icon: '🌕',
    category: 'major',
    pujaId: null
  },
  {
    id: 108,
    nameBn: 'শ্রীকৃষ্ণ জন্মাষ্টমী ব্রত',
    nameEn: 'Sri Krishna Janmashtami',
    eventDate: '2026-09-03',
    tithiBn: 'ভাদ্র কৃষ্ণা অষ্টমী',
    description: 'ভগবান শ্রীকৃষ্ণের পবিত্র আবির্ভাব তিথি।',
    icon: '🪚',
    category: 'major',
    pujaId: null
  },
  {
    id: 109,
    nameBn: 'শ্রী গণেশ চতুর্থী',
    nameEn: 'Ganesh Chaturthi',
    eventDate: '2026-09-14',
    tithiBn: 'ভাদ্র শুক্লা ধতুর্থী',
    description: 'বিঘ্নহর্তা শ্রী গণেশের আবির্ভাব উৎসব।',
    icon: '🐘',
    category: 'major',
    pujaId: 1
  },
  {
    id: 110,
    nameBn: 'শ্রী বিশ্বকর্মা পূজা',
    nameEn: 'Vishwakarma Puja',
    eventDate: '2026-09-17',
    tithiBn: 'কন্যা সংক্রান্তি',
    description: 'দেবশিল্পী বিশ্বকর্মার পূজা।',
    icon: '🔧',
    category: 'traditional',
    pujaId: null
  },
  {
    id: 111,
    nameBn: 'মহালয়া (তর্পণ ও দেবীপক্ষ)',
    nameEn: 'Mahalaya (Tarpan)',
    eventDate: '2026-10-10',
    tithiBn: 'আশ্বিন অমাবস্যা',
    description: 'পিতৃপক্ষের সমাপ্তি ও দেবীপক্ষের শুভ আগমনী।',
    icon: '🌑',
    category: 'major',
    pujaId: null
  },
  {
    id: 112,
    nameBn: 'দুর্গাপূজা (মহাষষ্ঠী)',
    nameEn: 'Durga Puja - Maha Shashthi',
    eventDate: '2026-10-16',
    tithiBn: 'আশ্বিন শুক্লা ষষ্ঠী',
    description: 'দেবীর কল্পারম্ভ, বোধন ও অধিবাস।',
    icon: '🌸',
    category: 'major',
    pujaId: null
  },
  {
    id: 113,
    nameBn: 'দুর্গাপূজা (মহাসপ্তমী)',
    nameEn: 'Durga Puja - Maha Saptami',
    eventDate: '2026-10-17',
    tithiBn: 'আশ্বিন শুক্লা সপ্তমী',
    description: 'নবপত্রিকা (কলাবৌ) প্রবেশ ও সপ্তমী বিহিত পূজা।',
    icon: '🌼',
    category: 'major',
    pujaId: null
  },
  {
    id: 114,
    nameBn: 'দুর্গাপূজা (মহাঅষ্টমী ও সন্ধিপূজা)',
    nameEn: 'Durga Puja - Maha Ashtami & Sandhi Puja',
    eventDate: '2026-10-18',
    tithiBn: 'আশ্বিন শুক্লা অষ্টমী',
    description: 'কুমারী পূজা এবং ১০৮ পদ্মসহ পবিত্র সন্ধিপূজা।',
    icon: '🪔',
    category: 'major',
    pujaId: null
  },
  {
    id: 115,
    nameBn: 'দুর্গাপূজা (মহানবমী)',
    nameEn: 'Durga Puja - Maha Navami',
    eventDate: '2026-10-19',
    tithiBn: 'আশ্বিন শুক্লা নবমী',
    description: 'মহানবমী বিহিত পূজা, হোম-যজ্ঞ এবং আরতি।',
    icon: '🔥',
    category: 'major',
    pujaId: null
  },
  {
    id: 116,
    nameBn: 'বিজয়া দশমী (দর্পণ বিসর্জন ও সিঁদুর খেলা)',
    nameEn: 'Vijaya Dashami (Dussehra)',
    eventDate: '2026-10-20',
    tithiBn: 'আশ্বিন শুক্লা দশমী',
    description: 'দেবীর দর্পণ বিসর্জন, সিঁদুর খেলা ও শুভ বিজয়ার প্রণাম।',
    icon: '🩰',
    category: 'major',
    pujaId: null
  },
  {
    id: 117,
    nameBn: 'কোজাগরী লক্ষ্মীপূজা',
    nameEn: 'Kojagari Lakshmi Puja',
    eventDate: '2026-10-25',
    tithiBn: 'আশ্বিন পূর্ণিমা',
    description: 'ধন-ধান্যের দেবী মা লক্ষ্মীর পূজা ও পাঁচালী পাঠ।',
    icon: '🌾',
    category: 'major',
    pujaId: 2
  },
  {
    id: 118,
    nameBn: 'শ্রী শ্রী শ্যামাপূজা ও দীপাবলি (Kali Puja)',
    nameEn: 'Kali Puja & Diwali',
    eventDate: '2026-11-08',
    tithiBn: 'কার্তিক অমাবস্যা',
    description: 'মা কালীর নিশীথ আরাধনা ও দীপাবলি।',
    icon: '🪔',
    category: 'major',
    pujaId: null
  },
  {
    id: 119,
    nameBn: 'ভ্রাতৃদ্বিতীয়া (ভাইফোঁটা)',
    nameEn: 'Bhai Phonta (Bhatri Dwitiya)',
    eventDate: '2026-11-10',
    tithiBn: 'কার্তিক শুক্লা দ্বিতীয়া',
    description: 'ভাইয়ের দীর্ঘায়ু কামনায় বোনেদের ফোঁটা।',
    icon: '💝',
    category: 'traditional',
    pujaId: null
  },
  {
    id: 120,
    nameBn: 'শ্রী শ্রী জগদ্ধাত্রী পূজা',
    nameEn: 'Jagaddhatri Puja',
    eventDate: '2026-11-17',
    tithiBn: 'কার্তিক শুক্লা নবমী',
    description: 'জগদ্ধারিণী দেবী জগদ্ধাত্রীর মহাপূজা।',
    icon: '👑',
    category: 'major',
    pujaId: null
  },
  {
    id: 121,
    nameBn: 'শ্রী শ্রী রাসযাত্রা (রাস পূর্ণিমা)',
    nameEn: 'Rash Yatra',
    eventDate: '2026-11-23',
    tithiBn: 'কার্তিক পূর্ণিমা',
    description: 'শ্রী রাধাকৃষ্ণের মহারাসোৎসব।',
    icon: '🌕',
    category: 'major',
    pujaId: null
  }
];

export default function PujaDaysModal({ isOpen, onClose, lang = 'bn', onSelectDate }) {
  const [festivals, setFestivals] = useState(MASTER_FESTIVALS);
  const [activeCategory, setActiveCategory] = useState('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    const fetchApiFestivals = async () => {
      setLoading(true);
      try {
        const { data } = await axiosInstance.get('/festivals/upcoming?days=365');
        if (isMounted && Array.isArray(data) && data.length > 0) {
          const apiMerged = [...MASTER_FESTIVALS];
          data.forEach(apiF => {
            const exists = apiMerged.some(m => m.eventDate === apiF.eventDate || m.nameBn?.includes(apiF.name));
            if (!exists) {
              apiMerged.push({
                id: apiF.id || Math.floor(Math.random() * 9000),
                nameBn: apiF.name,
                nameEn: apiF.nameDevanagari || apiF.name,
                eventDate: apiF.eventDate,
                tithiBn: 'শুভ তিথি',
                description: apiF.description || 'শুভ পূজা ও অনুষ্ঠান।',
                icon: '🙏',
                category: 'traditional',
                pujaId: apiF.puja?.id || null
              });
            }
          });
          apiMerged.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
          setFestivals(apiMerged);
        }
      } catch (err) {
        console.warn('Using master festivals list:', err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchApiFestivals();
    return () => { isMounted = false; };
  }, [isOpen]);

  if (!isOpen) return null;

  const today = new Date();

  const filteredFestivals = festivals.filter(f => {
    const fDate = parseISO(f.eventDate);
    const daysUntil = differenceInDays(fDate, today);

    if (activeCategory === 'upcoming' && daysUntil < 0) return false;
    if (activeCategory === 'major' && f.category !== 'major') return false;
    if (activeCategory === 'traditional' && f.category !== 'traditional') return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchBn = f.nameBn?.toLowerCase().includes(q);
      const matchEn = f.nameEn?.toLowerCase().includes(q);
      const matchDesc = f.description?.toLowerCase().includes(q);
      if (!matchBn && !matchEn && !matchDesc) return false;
    }

    return true;
  });

  const getCountdownBadge = (eventDateStr) => {
    const eventDate = parseISO(eventDateStr);
    const daysUntil = differenceInDays(eventDate, today);

    if (daysUntil === 0) {
      return (
        <span className="bg-green-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full animate-pulse shadow-sm">
          {lang === 'bn' ? '🎉 আজ অনুষ্ঠিত হচ্ছে!' : 'Today!'}
        </span>
      );
    }
    if (daysUntil === 1) {
      return (
        <span className="bg-amber-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
          {lang === 'bn' ? 'আগামীকাল' : 'Tomorrow'}
        </span>
      );
    }
    if (daysUntil > 1) {
      return (
        <span className="bg-orange-100 text-orange-800 text-[11px] font-bold px-2.5 py-1 rounded-full border border-orange-200">
          {lang === 'bn' ? `আর ${daysUntil} দিন বাকি` : `In ${daysUntil} days`}
        </span>
      );
    }
    return (
      <span className="bg-stone-100 text-stone-500 text-[11px] font-medium px-2 py-0.5 rounded-full">
        {lang === 'bn' ? 'সম্পন্ন হয়েছে' : 'Passed'}
      </span>
    );
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
        <div className="bg-gradient-to-r from-teal-700 via-orange-600 to-amber-600 text-white p-4 sm:p-6 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner text-2xl">
              🙏
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold tracking-wide">
                  {lang === 'bn' ? 'পূজার দিন ও উৎসব তালিকা' : 'Puja Days & Hindu Festivals'}
                </h2>
                <span className="text-[11px] bg-white/20 px-2.5 py-0.5 rounded-full font-medium">
                  {filteredFestivals.length} {lang === 'bn' ? 'টি উৎসব' : 'Festivals'}
                </span>
              </div>
              <p className="text-white/80 text-xs sm:text-sm mt-0.5">
                {lang === 'bn' ? '১৪৩২-১৪৩৩ বঙ্গাব্দের সনাতন পূজা, তিথি ও নির্ঘণ্ট' : 'Complete Bengali & Vedic festive calendar for 2026-2027'}
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 text-white flex items-center justify-center transition-all focus:outline-none"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-4 sm:px-6 bg-stone-50 border-b border-stone-200 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          
          {/* Category Tabs */}
          <div className="flex gap-1.5 p-1 bg-stone-200/60 rounded-xl self-start overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveCategory('upcoming')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeCategory === 'upcoming' 
                  ? 'bg-white text-orange-600 shadow-sm' 
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {lang === 'bn' ? 'আসন্ন পূজাসমূহ' : 'Upcoming'}
            </button>
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeCategory === 'all' 
                  ? 'bg-white text-orange-600 shadow-sm' 
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {lang === 'bn' ? 'সমগ্র বছর' : 'All Year'}
            </button>
            <button
              onClick={() => setActiveCategory('major')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeCategory === 'major' 
                  ? 'bg-white text-orange-600 shadow-sm' 
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {lang === 'bn' ? 'প্রধান পূজাসমূহ' : 'Major Pujas'}
            </button>
            <button
              onClick={() => setActiveCategory('traditional')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeCategory === 'traditional' 
                  ? 'bg-white text-orange-600 shadow-sm' 
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {lang === 'bn' ? 'ঐতিহ্যবাহী উৎসব' : 'Traditional'}
            </button>
          </div>

          {/* Search Input */}
          <div className="relative min-w-[200px] sm:min-w-[240px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'bn' ? 'পূজা বা উৎসব খুঁজুন...' : 'Search puja or festival...'}
              className="w-full bg-white border border-stone-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-orange-500 shadow-sm"
            />
          </div>

        </div>

        {/* Festival Cards List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3.5 flex-1 bg-stone-50/50">
          
          {filteredFestivals.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-stone-200 p-6">
              <span className="text-4xl block mb-2">🔍</span>
              <p className="text-stone-600 font-semibold text-sm">
                {lang === 'bn' ? 'কোনো পূজা পাওয়া যায়নি' : 'No festivals found'}
              </p>
              <button
                onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                className="mt-3 text-xs text-orange-600 hover:underline font-bold"
              >
                {lang === 'bn' ? 'সমস্ত তালিকা দেখুন' : 'Reset filters'}
              </button>
            </div>
          ) : (
            filteredFestivals.map((fest) => {
              const festDate = parseISO(fest.eventDate);
              return (
                <div 
                  key={fest.id}
                  className="bg-white rounded-2xl border border-stone-200/90 p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-orange-200 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  {/* Left: Icon + Main Info */}
                  <div className="flex items-start gap-3.5 flex-1">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-100 border border-orange-200/70 flex items-center justify-center text-2xl flex-shrink-0 shadow-sm">
                      {fest.icon}
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-tight">
                          {fest.nameBn}
                        </h3>
                        {getCountdownBadge(fest.eventDate)}
                      </div>

                      <p className="text-xs text-stone-500 font-medium">
                        {fest.nameEn}
                      </p>

                      <div className="flex flex-wrap items-center gap-2 text-xs text-stone-600 mt-1">
                        <span className="flex items-center gap-1 font-semibold text-orange-700 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200/60">
                          <Calendar size={13} />
                          {format(festDate, 'dd MMMM, yyyy (EEEE)')}
                        </span>
                        <span className="text-stone-400">&bull;</span>
                        <span className="text-stone-700 font-medium bg-stone-100 px-2 py-0.5 rounded-md">
                          {fest.tithiBn}
                        </span>
                      </div>

                      <p className="text-xs text-stone-600 leading-relaxed pt-1 font-serif">
                        {fest.description}
                      </p>
                    </div>
                  </div>

                  {/* Right: Action Buttons */}
                  <div className="flex sm:flex-col gap-2 flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                    {fest.pujaId ? (
                      <button
                        onClick={() => {
                          navigate(`/puja/${fest.pujaId}`);
                          onClose();
                        }}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
                      >
                        <BookOpen size={14} />
                        {lang === 'bn' ? 'পদ্ধতি শিখুন' : 'Learn Vidhi'}
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          navigate('/pujas');
                          onClose();
                        }}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold transition-all"
                      >
                        <BookOpen size={14} />
                        {lang === 'bn' ? 'পূজা শিক্ষা' : 'Puja Learning'}
                      </button>
                    )}

                    {onSelectDate && (
                      <button
                        onClick={() => {
                          onSelectDate(festDate);
                          onClose();
                        }}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-1 px-3 py-2 bg-white border border-stone-200 hover:border-orange-300 hover:bg-orange-50/30 text-stone-700 text-xs font-semibold rounded-xl transition-all"
                      >
                        <Clock size={13} className="text-orange-600" />
                        {lang === 'bn' ? 'পঞ্চাঙ্গে দেখুন' : 'View Panchang'}
                      </button>
                    )}
                  </div>

                </div>
              );
            })
          )}

        </div>
      </div>
    </div>
  );
}
