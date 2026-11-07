import React, { useState, useEffect } from 'react';
import { X, Sparkles, RefreshCw, Compass, ShieldCheck } from 'lucide-react';
import axiosInstance from '../../api/axiosInstance';

const DEFAULT_RASHIS = [
  {
    id: 1,
    rashiCode: 'aries',
    rashiNameEn: 'Aries',
    rashiNameBn: 'মেষ',
    rashiNameHi: 'मेष',
    symbol: '♈',
    predictionBn: 'আজ আপনার কর্মক্ষেত্রে নতুন দায়িত্বের সুযোগ আসতে পারে। পেশাগত সাফল্যে অতিরিক্ত সহায়তা পাবেন।',
    luckyColorBn: 'লাল',
    luckyNumber: '৯',
    remedyBn: 'শ্রী হনুমান চালিসা পাঠ করুন।'
  },
  {
    id: 2,
    rashiCode: 'taurus',
    rashiNameEn: 'Taurus',
    rashiNameBn: 'বৃষ',
    rashiNameHi: 'वृषभ',
    symbol: '♉',
    predictionBn: 'পারিবারিক সন্তুষ্টির পাশাপাশি আর্থিক দিক থেকেও আজ আপনি মজবুত থাকবেন।',
    luckyColorBn: 'সাদা',
    luckyNumber: '৬',
    remedyBn: 'মা লক্ষ্মীকে সাদা ফুল অর্পণ করুন।'
  },
  {
    id: 3,
    rashiCode: 'gemini',
    rashiNameEn: 'Gemini',
    rashiNameBn: 'মিথুন',
    rashiNameHi: 'मिथुन',
    symbol: '♊',
    predictionBn: 'বুদ্ধিবৃত্তিক কাজে বা আলোচনায় আপনার মতামত গ্রহণযোগ্য হবে।',
    luckyColorBn: 'সবুজ',
    luckyNumber: '৫',
    remedyBn: 'তুলসী গাছে জল দান করুন।'
  },
  {
    id: 4,
    rashiCode: 'cancer',
    rashiNameEn: 'Cancer',
    rashiNameBn: 'কর্কট',
    rashiNameHi: 'कर्क',
    symbol: '♋',
    predictionBn: 'স্বাস্থ্যের প্রতি সতর্ক থাকুন এবং মানসিক চাপ কমানোর চেষ্টা করুন।',
    luckyColorBn: 'সাদা',
    luckyNumber: '২',
    remedyBn: 'ভগবান শিবের জলাভিষেক করুন।'
  },
  {
    id: 5,
    rashiCode: 'leo',
    rashiNameEn: 'Leo',
    rashiNameBn: 'সিংহ',
    rashiNameHi: 'सिंह',
    symbol: '♌',
    predictionBn: 'কর্মক্ষেত্রে নেতৃত্ব দানের সুযোগ আসবে এবং সম্মান বৃদ্ধি পাবে।',
    luckyColorBn: 'কমলা',
    luckyNumber: '১',
    remedyBn: 'সূর্যদেবকে অর্ঘ্য দান করুন।'
  },
  {
    id: 6,
    rashiCode: 'virgo',
    rashiNameEn: 'Virgo',
    rashiNameBn: 'কন্যা',
    rashiNameHi: 'कन्या',
    symbol: '♍',
    predictionBn: 'ধর্মীয় ও সমাজসেবামূলক কাজে মানসিক শান্তি লাভ করবেন।',
    luckyColorBn: 'সবুজ',
    luckyNumber: '৫',
    remedyBn: 'গণেশ স্তোত্র পাঠ করুন।'
  },
  {
    id: 7,
    rashiCode: 'libra',
    rashiNameEn: 'Libra',
    rashiNameBn: 'তুলা',
    rashiNameHi: 'तुला',
    symbol: '♎',
    predictionBn: 'ভাগ্যের তারকা অনুকূল থাকায় গুরুত্বপূর্ণ কাজ সফল হবে।',
    luckyColorBn: 'গোলাপি',
    luckyNumber: '৬',
    remedyBn: 'দরিদ্রকে মিষ্টান্ন দান করুন।'
  },
  {
    id: 8,
    rashiCode: 'scorpio',
    rashiNameEn: 'Scorpio',
    rashiNameBn: 'বৃশ্চিক',
    rashiNameHi: 'वृश्चिक',
    symbol: '♏',
    predictionBn: 'কথা বার্তায় সংযম বজায় রাখুন এবং গোপন শত্রু থেকে সাবধান থাকুন।',
    luckyColorBn: 'লাল',
    luckyNumber: '৯',
    remedyBn: 'ওঁ নমঃ শিবায় জপ করুন।'
  },
  {
    id: 9,
    rashiCode: 'sagittarius',
    rashiNameEn: 'Sagittarius',
    rashiNameBn: 'ধনু',
    rashiNameHi: 'धनु',
    symbol: '♐',
    predictionBn: 'উচ্চশিক্ষা বা ভ্রমণের ক্ষেত্রে আজ সুভ সংবাদ পাবেন।',
    luckyColorBn: 'হলুদ',
    luckyNumber: '৩',
    remedyBn: 'বিষ্ণু সহস্রনাম পাঠ করুন।'
  },
  {
    id: 10,
    rashiCode: 'capricorn',
    rashiNameEn: 'Capricorn',
    rashiNameBn: 'মকর',
    rashiNameHi: 'मकर',
    symbol: '♑',
    predictionBn: 'ধৈর্য ধরে কাজ করুন, কঠোর পরিশ্রমের ফল নিশ্চিতভাবে পাবেন।',
    luckyColorBn: 'নীল',
    luckyNumber: '৮',
    remedyBn: 'সন্ধ্যায় তিলের তেলের প্রদীপ প্রজ্বলন করুন।'
  },
  {
    id: 11,
    rashiCode: 'aquarius',
    rashiNameEn: 'Aquarius',
    rashiNameBn: 'কুম্ভ',
    rashiNameHi: 'कुंभ',
    symbol: '♒',
    predictionBn: 'বন্ধুবান্ধবদের সাথে যৌথ উদ্যোগে সাফল্য আসবে।',
    luckyColorBn: 'আসমানি',
    luckyNumber: '৮',
    remedyBn: 'অসহায় কাউকে সাহায্য করুন।'
  },
  {
    id: 12,
    rashiCode: 'pisces',
    rashiNameEn: 'Pisces',
    rashiNameBn: 'মীন',
    rashiNameHi: 'मीन',
    symbol: '♓',
    predictionBn: 'পারিবারিক সুখ ও আধ্যাত্মিক শান্তি অর্জনে আজকের দিনটি অত্যন্ত শুভ।',
    luckyColorBn: 'হলুদ',
    luckyNumber: '৩',
    remedyBn: 'গায়ত্রী মন্ত্র ১০৮ বার জপ করুন।'
  }
];

const TEXTS = {
  bn: {
    modalTitle: 'দৈনিক রাশিফল',
    modalSubtitle: '১২ রাশির আজকের ভাগ্যফল ও প্রতিকার',
    selectRashi: 'আপনার রাশি বেছে নিন',
    todayForecast: 'আজকের পূর্বাভাস',
    luckyColor: 'শুভ রং',
    luckyNumber: 'শুভ সংখ্যা',
    remedy: 'আজকের প্রতিকার',
    disclaimer: 'জ্যোতিষশাস্ত্রের ফলাফল একটি আধ্যাত্মিক দিকনির্দেশনা। আপনার সৎ প্রচেষ্টা ও কর্মই ভাগ্যের মূল চালিকাশক্তি।',
    loading: 'রাশিফল লোড হচ্ছে...',
    refresh: 'তাজা করুন',
    rashiWord: 'রাশি'
  },
  hi: {
    modalTitle: 'दैनिक राशिफल',
    modalSubtitle: '12 राशिযों का आज का भाग्যफल और उपाय',
    selectRashi: 'अपनी राशि चुनें',
    todayForecast: 'आज का राशिफल',
    luckyColor: 'शुभ रंग',
    luckyNumber: 'शुभ अंक',
    remedy: 'आज का उपाय',
    disclaimer: 'ज्যोतिषीय गणना आध्यात्मिक मार्गदर्शन है। आपका कर्म और सदप्रयास ही भाग्য का सच्चा निर्माता है।',
    loading: 'राशिफल लोड हो रहा है...',
    refresh: 'ताज़ा करें',
    rashiWord: 'राशि'
  },
  en: {
    modalTitle: 'Daily Horoscope',
    modalSubtitle: 'Daily astrological forecast & remedies for all 12 signs',
    selectRashi: 'Select Your Zodiac Sign',
    todayForecast: "Today's Prediction",
    luckyColor: 'Lucky Color',
    luckyNumber: 'Lucky Number',
    remedy: 'Daily Remedy',
    disclaimer: 'Astrological guidance serves as spiritual direction. Your sincere efforts and karma shape your true destiny.',
    loading: 'Loading horoscope...',
    refresh: 'Refresh',
    rashiWord: ''
  }
};

export default function RashipholModal({ isOpen, onClose, lang = 'bn' }) {
  const [rashis, setRashis] = useState(DEFAULT_RASHIS);
  const [selectedRashiCode, setSelectedRashiCode] = useState('aries');
  const [loading, setLoading] = useState(false);

  const t = TEXTS[lang] || TEXTS.bn;

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    const fetchHoroscope = async () => {
      setLoading(true);
      try {
        const { data } = await axiosInstance.get('/horoscope/today');
        if (isMounted && Array.isArray(data) && data.length > 0) {
          const merged = DEFAULT_RASHIS.map((def) => {
            const apiItem = data.find((d) => d.rashiCode?.toLowerCase() === def.rashiCode.toLowerCase());
            if (!apiItem) return def;
            return {
              ...def,
              ...apiItem,
              predictionBn: apiItem.predictionBn || def.predictionBn,
              luckyColorBn: apiItem.luckyColorBn || def.luckyColorBn,
              luckyNumber: apiItem.luckyNumber || def.luckyNumber,
              remedyBn: apiItem.remedyBn || def.remedyBn,
            };
          });
          setRashis(merged);
        }
      } catch (err) {
        console.warn('Using default horoscope data:', err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchHoroscope();

    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentRashi = rashis.find((r) => r.rashiCode === selectedRashiCode) || rashis[0];

  const getRashiDisplayName = (r) => {
    if (lang === 'hi') return r.rashiNameHi || r.rashiNameBn;
    if (lang === 'en') return r.rashiNameEn;
    return r.rashiNameBn;
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with saffron-purple gradient */}
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-purple-700 text-white p-5 sm:p-6 flex items-center justify-between relative shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner text-amber-200">
              <Sparkles size={24} className="text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold tracking-wide">{t.modalTitle}</h2>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] bg-white/20 backdrop-blur-sm px-2.5 py-0.5 rounded-full font-medium">
                  <Sparkles size={12} /> Live
                </span>
              </div>
              <p className="text-white/80 text-xs sm:text-sm mt-0.5">{t.modalSubtitle}</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 text-white flex items-center justify-center transition-all focus:outline-none"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 bg-stone-50/50">
          
          {/* 12 Rashi Selection Grid */}
          <div>
            <div className="flex items-center justify-between mb-3 px-1">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                <Compass size={16} className="text-orange-500" /> {t.selectRashi}
              </h3>
              {loading && (
                <span className="text-xs text-orange-600 flex items-center gap-1">
                  <RefreshCw size={12} className="animate-spin" /> {t.loading}
                </span>
              )}
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-2.5">
              {rashis.map((r) => {
                const isSelected = r.rashiCode === selectedRashiCode;
                const displayName = getRashiDisplayName(r);
                return (
                  <button
                    key={r.rashiCode}
                    onClick={() => setSelectedRashiCode(r.rashiCode)}
                    className={`group relative flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-2xl border transition-all duration-200 text-center ${
                      isSelected
                        ? 'bg-gradient-to-b from-orange-50 to-amber-50 border-orange-500 shadow-md ring-2 ring-orange-400/30 -translate-y-0.5'
                        : 'bg-white border-stone-200 hover:border-orange-300 hover:bg-orange-50/30 hover:-translate-y-0.5 shadow-sm'
                    }`}
                  >
                    <span className={`text-2xl sm:text-3xl transition-transform duration-200 ${
                      isSelected ? 'scale-110 text-orange-600' : 'text-stone-700 group-hover:scale-110 group-hover:text-orange-600'
                    }`}>
                      {r.symbol}
                    </span>
                    <span className={`text-xs sm:text-sm font-bold mt-1 leading-tight ${
                      isSelected ? 'text-orange-900' : 'text-stone-800'
                    }`}>
                      {displayName}
                    </span>
                    <span className="text-[10px] text-stone-400 font-medium leading-none mt-0.5">
                      {r.rashiNameEn}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Rashi Detailed View */}
          {currentRashi && (
            <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-sm space-y-5 animate-fade-in">
              
              {/* Sign Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-3">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center text-3xl shadow-md shadow-orange-500/20 flex-shrink-0">
                    {currentRashi.symbol}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-2xl font-bold text-stone-900">
                        {getRashiDisplayName(currentRashi)}{t.rashiWord ? ` ${t.rashiWord}` : ''}
                      </h4>
                      <span className="text-xs font-semibold text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">
                        {currentRashi.rashiNameEn}
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 mt-0.5">
                      {currentRashi.date ? `${currentRashi.date}` : new Date().toLocaleDateString()} &bull; {t.todayForecast}
                    </p>
                  </div>
                </div>

                {/* Lucky Highlights Chips */}
                <div className="flex items-center gap-2 sm:self-center">
                  <div className="bg-orange-50 border border-orange-200 rounded-xl px-3 py-1.5 flex items-center gap-1.5">
                    <span className="text-xs text-orange-700 font-medium">{t.luckyColor}:</span>
                    <span className="text-xs font-bold text-orange-900">{currentRashi.luckyColorBn || currentRashi.luckyColor || '-'}</span>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-xl px-3 py-1.5 flex items-center gap-1.5">
                    <span className="text-xs text-purple-700 font-medium">{t.luckyNumber}:</span>
                    <span className="text-xs font-bold text-purple-900">{currentRashi.luckyNumber || '-'}</span>
                  </div>
                </div>
              </div>

              {/* Prediction Paragraph */}
              <div className="space-y-2">
                <h5 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                  <Sparkles size={15} className="text-amber-500" /> {t.todayForecast}
                </h5>
                <p className="text-stone-800 text-base sm:text-lg leading-relaxed bg-amber-50/30 p-4 rounded-xl border border-amber-100/60 font-serif">
                  {currentRashi.predictionBn}
                </p>
              </div>

              {/* Auspicious Remedy */}
              {currentRashi.remedyBn && (
                <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border border-orange-200/80 rounded-2xl p-4 sm:p-4.5 flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    <ShieldCheck size={22} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-orange-900 flex items-center gap-1">
                      <ShieldCheck size={14} className="text-orange-600" /> {t.remedy}
                    </p>
                    <p className="text-stone-800 text-sm sm:text-base font-medium mt-1 leading-normal">
                      {currentRashi.remedyBn}
                    </p>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* Spiritual Disclaimer */}
          <div className="text-center px-4 py-2">
            <p className="text-xs text-stone-400 italic leading-relaxed">
              {t.disclaimer}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
