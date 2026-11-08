import React, { useState } from 'react';
import { X, Sparkles, User, Calendar, Clock, Compass, Award, ArrowRight } from 'lucide-react';

const RASHI_DATA = [
  {
    id: 'aries',
    nameBn: 'মেষ',
    nameEn: 'Aries',
    symbol: 'â',
    lord: 'মঙ্গল (Mars)',
    element: 'অগ্নি (Fire)',
    luckyColor: 'লাল (Red)',
    luckyNumber: '৯, ১',
    gemstone: 'রক্তপ্রবাল (Red Coral)',
    letters: 'চু, চে, চো, লা, লি, লু, লে, লো, অ (Chu, Che, Cho, La, Li, Lu, Le, Lo, A)'
  },
  {
    id: 'taurus',
    nameBn: 'বৃষ',
    nameEn: 'Taurus',
    symbol: 'â',
    lord: 'শুক্র (Venus)',
    element: 'পৃথিবী (Earth)',
    luckyColor: 'সাদা, রুপোলি (White)',
    luckyNumber: '৬, ২',
    gemstone: 'হীরা / ওপাল (Diamond / Opal)',
    letters: 'ই, ঈ, উ, এ, ও, বা, বি, বু, বে, বো (I, Ee, U, E, O, Ba, Bi, Bu, Be, Bo)'
  },
  {
    id: 'gemini',
    nameBn: 'মিথুন',
    nameEn: 'Gemini',
    symbol: 'â',
    lord: 'বুধ (Mercury)',
    element: 'বায়ু (Air)',
    luckyColor: 'সবুজ (Green)',
    luckyNumber: '৫, ৩',
    gemstone: 'পান্না (Emerald)',
    letters: 'কা, কি, কু, ঘ, ঙ, ছ, কে, কো, হ (Ka, Ki, Ku, Gha, Chha, Ke, Ko, Ha)'
  },
  {
    id: 'cancer',
    nameBn: 'কর্কট',
    nameEn: 'Cancer',
    symbol: 'â',
    lord: 'চন্দ্র (Moon)',
    element: 'জল (Water)',
    luckyColor: 'দুধে সাদা, মুক্তা (Cream)',
    luckyNumber: '২, ৭',
    gemstone: 'মুক্তা / মুনস্টোন (Pearl)',
    letters: 'হি, হু, হে, হো, ডা, ডি, ডু, ডে, ডো (Hi, Hu, He, Ho, Da, Di, Du, De, Do)'
  },
  {
    id: 'leo',
    nameBn: 'সিংহ',
    nameEn: 'Leo',
    symbol: 'â',
    lord: 'সূর্য (Sun)',
    element: 'অগ্নি (Fire)',
    luckyColor: 'সোনালী, কমলা (Gold / Orange)',
    luckyNumber: '১, ৪',
    gemstone: 'মাণিক্য (Ruby)',
    letters: 'মা, মি, মু, মে, মো, টা, টি, টু, টে (Ma, Mi, Mu, Me, Mo, Ta, Ti, Tu, Te)'
  },
  {
    id: 'virgo',
    nameBn: 'কন্যা',
    nameEn: 'Virgo',
    symbol: 'â',
    lord: 'বুধ (Mercury)',
    element: 'পৃথিবী (Earth)',
    luckyColor: 'গাঢ় সবুজ (Deep Green)',
    luckyNumber: '৫, ৬',
    gemstone: 'পান্না (Emerald)',
    letters: 'টো, পা, পি, পু, ষ, ণ, ঠ, পে, পো (To, Pa, Pi, Pu, Sha, Tha, Pe, Po)'
  },
  {
    id: 'libra',
    nameBn: 'তুলা',
    nameEn: 'Libra',
    symbol: 'â',
    lord: 'শুক্র (Venus)',
    element: 'বায়ু (Air)',
    luckyColor: 'নীল, সাদা (Light Blue)',
    luckyNumber: '৬, ৮',
    gemstone: 'হীরা / ওপাল (Opal / Diamond)',
    letters: 'রা, রি, রু, রে, রো, তা, তি, তু, তে (Ra, Ri, Ru, Re, Ro, Ta, Ti, Tu, Te)'
  },
  {
    id: 'scorpio',
    nameBn: 'বৃশ্চিক',
    nameEn: 'Scorpio',
    symbol: 'â',
    lord: 'মঙ্গল (Mars)',
    element: 'জল (Water)',
    luckyColor: 'গাঢ় লাল, খয়রি (Maroon)',
    luckyNumber: '৯, ৩',
    gemstone: 'রক্তপ্রবাল (Red Coral)',
    letters: 'তো, না, নি, নু, নে, নো, য়া, য়ি, য়ু (To, Na, Ni, Nu, Ne, No, Ya, Yi, Yu)'
  },
  {
    id: 'sagittarius',
    nameBn: 'ধনু',
    nameEn: 'Sagittarius',
    symbol: 'â',
    lord: 'বৃহস্পতি (Jupiter)',
    element: 'অগ্নি (Fire)',
    luckyColor: 'হলুদ, বাসন্তী (Yellow)',
    luckyNumber: '৩, ৯',
    gemstone: 'পীত পোখরাজ (Yellow Sapphire)',
    letters: 'য়ে, য়ো, ভা, ভি, ভু, ধা, ফা, ঢা, ভে (Ye, Yo, Bha, Bhi, Bhu, Dha, Pha, Dha, Bhe)'
  },
  {
    id: 'capricorn',
    nameBn: 'মকর',
    nameEn: 'Capricorn',
    symbol: 'â',
    lord: 'শনি (Saturn)',
    element: 'পৃথিবী (Earth)',
    luckyColor: 'নীল, কালো (Navy Blue / Black)',
    luckyNumber: '৮, ৪',
    gemstone: 'নীলা (Blue Sapphire)',
    letters: 'ভো, জা, জি, খি, খু, খে, খো, গা, গি (Bho, Ja, Ji, Khi, Khu, Khe, Kho, Ga, Gi)'
  },
  {
    id: 'aquarius',
    nameBn: 'কুম্ভ',
    nameEn: 'Aquarius',
    symbol: 'â',
    lord: 'শনি (Saturn)',
    element: 'বায়ু (Air)',
    luckyColor: 'আসমানী, বেগুনি (Cyan / Purple)',
    luckyNumber: '৮, ৭',
    gemstone: 'নীলা / জামুনিয়া (Amethyst)',
    letters: 'গু, গে, গো, সা, সি, সু, সে, সো, দা (Gu, Ge, Go, Sa, Si, Su, Se, So, Da)'
  },
  {
    id: 'pisces',
    nameBn: 'মীন',
    nameEn: 'Pisces',
    symbol: 'â',
    lord: 'বৃহস্পতি (Jupiter)',
    element: 'জল (Water)',
    luckyColor: 'হলুদ, কমলা (Yellow)',
    luckyNumber: '৩, ৭',
    gemstone: 'পোখরাজ / মুক্তা (Yellow Sapphire)',
    letters: 'দি, দু, থ, ঝ, ঞ, দে, দো, চ, চি (Di, Du, Tha, Jha, De, Do, Cha, Chi)'
  }
];

export default function RashiNirnayModal({ isOpen, onClose, lang = 'bn', onOpenRashiphol }) {
  const [method, setMethod] = useState('letter'); // 'letter' or 'dob'
  const [searchLetter, setSearchLetter] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [calculatedRashi, setCalculatedRashi] = useState(null);

  if (!isOpen) return null;

  // Determine Rashi from birth date (Vedic / Solar approximation)
  const handleCalculateByDOB = () => {
    if (!birthDate) return;
    const parts = birthDate.split('-');
    if (parts.length !== 3) return;
    const month = parseInt(parts[1], 10);
    const day = parseInt(parts[2], 10);

    let foundId = 'aries';
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) foundId = 'aries';
    else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) foundId = 'taurus';
    else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) foundId = 'gemini';
    else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) foundId = 'cancer';
    else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) foundId = 'leo';
    else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) foundId = 'virgo';
    else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) foundId = 'libra';
    else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) foundId = 'scorpio';
    else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) foundId = 'sagittarius';
    else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) foundId = 'capricorn';
    else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) foundId = 'aquarius';
    else foundId = 'pisces';

    const r = RASHI_DATA.find(item => item.id === foundId);
    setCalculatedRashi(r);
  };

  const handleSelectFromLetter = (rashi) => {
    setCalculatedRashi(rashi);
  };

  const filteredByLetter = searchLetter.trim()
    ? RASHI_DATA.filter(r => 
        r.nameBn.includes(searchLetter) || 
        r.nameEn.toLowerCase().includes(searchLetter.toLowerCase()) ||
        r.letters.includes(searchLetter)
      )
    : RASHI_DATA;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-700 via-indigo-700 to-violet-800 text-white p-5 sm:p-6 shadow-md">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all backdrop-blur-sm"
            title="Close"
          >
            <X size={20} />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shadow-inner border border-white/30">
              â¸ï¸
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                  {lang === 'en' ? 'Find Your Rashi (Moon Sign)' : 'রাশি নির্ণয় (Rashi Calculator)'}
                </h2>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-400 text-amber-950 shadow-sm">
                  {lang === 'en' ? 'Vedic Astrology' : 'বৈদিক জ্যোতিষ'}
                </span>
              </div>
              <p className="text-blue-100 text-xs sm:text-sm mt-0.5">
                {lang === 'en' 
                  ? 'Determine your Rashi by your name first letter or date of birth' 
                  : 'নামের প্রথম আদ্যক্ষর বা জন্মতারিখ দিয়ে সঠিক রাশি খুঁজে নিন'}
              </p>
            </div>
          </div>
        </div>

        {/* Method Switcher */}
        <div className="bg-slate-50 border-b border-slate-200 p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center p-1 bg-slate-200/80 rounded-2xl w-full sm:w-auto">
            <button
              onClick={() => { setMethod('letter'); setCalculatedRashi(null); }}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                method === 'letter'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lang === 'en' ? 'By Name Letters' : 'নামের আদ্যক্ষর দিয়ে'}
            </button>
            <button
              onClick={() => { setMethod('dob'); setCalculatedRashi(null); }}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                method === 'dob'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lang === 'en' ? 'By Date of Birth' : 'জন্মতারিখ দিয়ে'}
            </button>
          </div>

          {method === 'letter' && (
            <div className="w-full sm:w-64">
              <input
                type="text"
                value={searchLetter}
                onChange={(e) => setSearchLetter(e.target.value)}
                placeholder={lang === 'en' ? 'Search letter e.g. ক, র, অ (or K, R, A)...' : 'অক্ষর খুঁজুন যেমন ক, র, অ...'}
                className="w-full px-3 py-1.5 text-xs sm:text-sm rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
              />
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/50 space-y-4">
          
          {/* DOB Mode Form */}
          {method === 'dob' && (
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm max-w-md mx-auto text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto text-xl">
                ð
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-base">
                  {lang === 'en' ? 'Select Your Birth Date' : 'আপনার জন্মতারিখ নির্বাচন করুন'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {lang === 'en' ? 'We will calculate your corresponding Vedic zodiac sign' : 'বৈদিক জ্যোতিষ অনুসারে সঠিক রাশি গণনা করা হবে'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="flex-1 px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
                />
                <button
                  onClick={handleCalculateByDOB}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-sm transition-colors"
                >
                  {lang === 'en' ? 'Calculate' : 'নির্ণয় করুন'}
                </button>
              </div>
            </div>
          )}

          {/* Result Card (if calculated/selected) */}
          {calculatedRashi && (
            <div className="bg-gradient-to-br from-blue-500 to-indigo-700 text-white rounded-3xl p-5 sm:p-6 shadow-xl animate-fadeIn">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-center sm:text-left">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-4xl shadow-inner border border-white/30">
                    {calculatedRashi.symbol}
                  </div>
                  <div>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-400 text-amber-950 uppercase tracking-wider">
                      {lang === 'en' ? 'Your Rashi' : 'আপনার রাশি'}
                    </span>
                    <h3 className="text-2xl font-bold mt-1">
                      {lang === 'en' ? `${calculatedRashi.nameEn} (${calculatedRashi.nameBn})` : `${calculatedRashi.nameBn} রাশি`}
                    </h3>
                  </div>
                </div>

                {onOpenRashiphol && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenRashiphol(calculatedRashi.id);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-white text-blue-900 font-bold text-xs sm:text-sm hover:bg-blue-50 transition-all flex items-center gap-2 shadow-lg"
                  >
                    <span>{lang === 'en' ? "View Today's Prediction" : 'আজকের রাশিফল দেখুন'}</span>
                    <ArrowRight size={16} />
                  </button>
                )}
              </div>

              {/* Badges Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-5">
                <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                  <span className="text-[11px] text-blue-200 block">{lang === 'en' ? 'Ruling Planet:' : 'অধিপতি গ্রহ:'}</span>
                  <span className="font-bold text-xs sm:text-sm mt-0.5 block">{calculatedRashi.lord}</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                  <span className="text-[11px] text-blue-200 block">{lang === 'en' ? 'Element:' : 'তত্ত্ব:'}</span>
                  <span className="font-bold text-xs sm:text-sm mt-0.5 block">{calculatedRashi.element}</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                  <span className="text-[11px] text-blue-200 block">{lang === 'en' ? 'Lucky Color:' : 'শুভ রঙ:'}</span>
                  <span className="font-bold text-xs sm:text-sm mt-0.5 block">{calculatedRashi.luckyColor}</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                  <span className="text-[11px] text-blue-200 block">{lang === 'en' ? 'Lucky Gemstone:' : 'শুভ রত্ন:'}</span>
                  <span className="font-bold text-xs sm:text-sm mt-0.5 block">{calculatedRashi.gemstone}</span>
                </div>
              </div>
            </div>
          )}

          {/* Letter Mode - 12 Rashi Grid */}
          {method === 'letter' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredByLetter.map(rashi => (
                <div
                  key={rashi.id}
                  onClick={() => handleSelectFromLetter(rashi)}
                  className={`bg-white rounded-2xl p-4 border transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md ${
                    calculatedRashi?.id === rashi.id
                      ? 'border-blue-500 ring-2 ring-blue-500/20 bg-blue-50/20'
                      : 'border-slate-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center text-xl font-bold">
                      {rashi.symbol}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">
                        {lang === 'en' ? `${rashi.nameEn} (${rashi.nameBn})` : `${rashi.nameBn} রাশি`}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {lang === 'en' ? 'Lord: ' : 'অধিপতি: '}{rashi.lord}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
                    <span className="font-bold text-slate-700 block mb-0.5">
                      {lang === 'en' ? 'Starting Letters:' : 'নামের আদ্যক্ষর:'}
                    </span>
                    <span className="text-blue-800 font-medium">{rashi.letters}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-slate-200 p-3 sm:p-4 flex items-center justify-between text-xs text-slate-500">
          <span>
            {lang === 'en'
              ? 'Based on classical Parashara Hora Sastra syllables & zodiacal divisions'
              : 'পরাশর হোরা শাস্ত্র ও বৈদিক নক্ষত্র চরণ অনুযায়ী সঠিক নির্ণয়'}
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
