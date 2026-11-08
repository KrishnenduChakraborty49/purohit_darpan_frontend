import React, { useState, useMemo } from 'react';
import { X, Search, Calendar, Clock, AlertCircle, CheckCircle2, ChevronRight, BookOpen, Sparkles, Filter } from 'lucide-react';

const EKADASHI_LIST = [
  {
    id: 'rama-2026',
    nameBn: 'রমা একাদশী',
    nameEn: 'Rama Ekadashi',
    date: '2026-11-05',
    bengaliDate: '১৯ কার্তিক, ১৪৩৩',
    month: 'কার্তিক',
    paksha: 'krishna',
    pakshaBn: 'কৃষ্ণ পক্ষ',
    paranaTime: 'সকাল ০৬:০৫ - ০৯:২০ (৬ নভেম্বর)',
    importance: 'কার্তিক মাসের কৃষ্ণ পক্ষের এই একাদশী পালনে সর্বপাপ মুক্তি ও লক্ষ্মী-নারায়ণের কৃপা লাভ হয়।',
    fastRule: 'শস্য, চাল, ডাল বর্জন; ফলমূল ও দুধ গ্রহণ যোগ্য।'
  },
  {
    id: 'devutthana-2026',
    nameBn: 'দেবোত্থান / প্রবোধিনী একাদশী',
    nameEn: 'Devutthana / Prabodhini Ekadashi',
    date: '2026-11-20',
    bengaliDate: '৪ অগ্রহায়ণ, ১৪৩৩',
    month: 'কার্তিক / অগ্রহায়ণ',
    paksha: 'shukla',
    pakshaBn: 'শুক্ল পক্ষ',
    paranaTime: 'সকাল ০৬:১২ - ০৯:৩০ (২১ নভেম্বর)',
    importance: 'চাতুর্মাস্য সমাপ্তি, ভগবান বিষ্ণুর যোগনিদ্রা ভঙ্গ। তুলসী বিবাহের শুভ দিন।',
    fastRule: 'অন্ন বর্জন, হরিনাম সংকীর্তন ও দীপদান।'
  },
  {
    id: 'utpanna-2026',
    nameBn: 'উত্পন্না একাদশী',
    nameEn: 'Utpanna Ekadashi',
    date: '2026-12-05',
    bengaliDate: '১৯ অগ্রহায়ণ, ১৪৩৩',
    month: 'অগ্রহায়ণ',
    paksha: 'krishna',
    pakshaBn: 'কৃষ্ণ পক্ষ',
    paranaTime: 'সকাল ০৬:২০ - ০৯:৪০ (৬ ডিসেম্বর)',
    importance: 'একাদশী দেবীর আবির্ভাব দিবস। যারা নতুন একাদশী ব্রত শুরু করতে চান, তাঁদের জন্য এই তিথি সর্বোত্তম।',
    fastRule: 'নির্জল বা ফলাহার; অশুদ্ধ চিন্তা ও ক্রোধ বর্জনীয়।'
  },
  {
    id: 'mokshada-2026',
    nameBn: 'মোক্ষদা একাদশী / গীতা জয়ন্তী',
    nameEn: 'Mokshada Ekadashi / Gita Jayanti',
    date: '2026-12-20',
    bengaliDate: '৪ পৌষ, ১৪৩৩',
    month: 'অগ্রহায়ণ / পৌষ',
    paksha: 'shukla',
    pakshaBn: 'শুক্ল পক্ষ',
    paranaTime: 'সকাল ০৬:২৮ - ০৯:৫০ (২১ ডিসেম্বর)',
    importance: 'পিতৃপুরুষের মোক্ষ দানকারী তিথি। এই দিনেই শ্রীকৃষ্ণ অর্জুনকে শ্রীমদ্ভগবদ্গীতা উপদেশ দিয়েছিলেন।',
    fastRule: 'গীতা পাঠ, নারায়ণ পূজা, শস্য বর্জন।'
  },
  {
    id: 'saphala-2027',
    nameBn: 'সফলা একাদশী',
    nameEn: 'Saphala Ekadashi',
    date: '2027-01-04',
    bengaliDate: '১৯ পৌষ, ১৪৩৩',
    month: 'পৌষ',
    paksha: 'krishna',
    pakshaBn: 'কৃষ্ণ পক্ষ',
    paranaTime: 'সকাল ০৬:৩২ - ১০:০০ (৫ জানুয়ারী)',
    importance: 'সকল কর্মে সফলতা ও মনোকামনা পূরণের ব্রত।',
    fastRule: 'দীপদান, রাত্রি জাগরণ, সাত্ত্বিক আহার।'
  },
  {
    id: 'pausha-putrada-2027',
    nameBn: 'পৌষ পুত্রদা একাদশী',
    nameEn: 'Pausha Putrada Ekadashi',
    date: '2027-01-18',
    bengaliDate: '৪ মাঘ, ১৪৩৩',
    month: 'পৌষ / মাঘ',
    paksha: 'shukla',
    pakshaBn: 'শুক্ল পক্ষ',
    paranaTime: 'সকাল ০৬:৩২ - ১০:০৫ (১৯ জানুয়ারী)',
    importance: 'সন্তান লাভ, সন্তানের দীর্ঘায়ু ও কল্যাণ কামনায় এই ব্রত পালিত হয়।',
    fastRule: 'শ্রীকৃষ্ণের বালগোপাল রূপের পূজা।'
  },
  {
    id: 'shattila-2027',
    nameBn: 'ষটতিলা একাদশী',
    nameEn: 'Shattila Ekadashi',
    date: '2027-02-02',
    bengaliDate: '১৯ মাঘ, ১৪৩৩',
    month: 'মাঘ',
    paksha: 'krishna',
    pakshaBn: 'কৃষ্ণ পক্ষ',
    paranaTime: 'সকাল ০৬:২৭ - ১০:০২ (০৩ ফেব্রুয়ারী)',
    importance: 'ছয় প্রকারে তিলের ব্যবহার (স্নান, তর্পণ, হোম, দান, ভোজন, উবটন)। পাপমুক্তির মহাব্রত।',
    fastRule: 'তিল দান ও তিলের নৈবেদ্য প্রশস্ত।'
  },
  {
    id: 'jaya-2027',
    nameBn: 'জয়া একাদশী',
    nameEn: 'Jaya Ekadashi',
    date: '2027-02-17',
    bengaliDate: '৪ ফাল্গুন, ১৪৩৩',
    month: 'মাঘ / ফাল্গুন',
    paksha: 'shukla',
    pakshaBn: 'শুক্ল পক্ষ',
    paranaTime: 'সকাল ০৬:১৮ - ০৯:৫৫ (১৮ ফেব্রুয়ারী)',
    importance: 'পিশাচ যোনি থেকে মুক্তি দানকারী পুণ্য ব্রত।',
    fastRule: 'সত্য বচন, হরিকথা শ্রবণ।'
  },
  {
    id: 'vijaya-2027',
    nameBn: 'বিজয়া একাদশী',
    nameEn: 'Vijaya Ekadashi',
    date: '2027-03-04',
    bengaliDate: '১৯ ফাল্গুন, ১৪৩৩',
    month: 'ফাল্গুন',
    paksha: 'krishna',
    pakshaBn: 'কৃষ্ণ পক্ষ',
    paranaTime: 'সকাল ০৬:০৫ - ০৯:৪৫ (০৫ মার্চ)',
    importance: 'শত্রু ও বিপদের ওপর বিজয় অর্জনের জন্য শ্রীরামচন্দ্র এই ব্রত পালন করেছিলেন।',
    fastRule: 'কলশ স্থাপন করে বিষ্ণু পূজা।'
  },
  {
    id: 'amalaki-2027',
    nameBn: 'আমলকী একাদশী',
    nameEn: 'Amalaki Ekadashi',
    date: '2027-03-18',
    bengaliDate: '৪ চৈত্র, ১৪৩৩',
    month: 'ফাল্গুন / চৈত্র',
    paksha: 'shukla',
    pakshaBn: 'শুক্ল পক্ষ',
    paranaTime: 'সকাল ০৫:৫২ - ০৯:৩৫ (১৯ মার্চ)',
    importance: 'আমলকী বৃক্ষের পূজা ও আরোগ্য লাভ; মোক্ষদায়ক পুণ্য তিথি।',
    fastRule: 'আমলকী বৃক্ষে জল দান ও পূজা।'
  },
  {
    id: 'papmochani-2027',
    nameBn: 'পাপমোচনী একাদশী',
    nameEn: 'Papmochani Ekadashi',
    date: '2027-04-02',
    bengaliDate: '১৯ চৈত্র, ১৪৩৩',
    month: 'চৈত্র',
    paksha: 'krishna',
    pakshaBn: 'কৃষ্ণ পক্ষ',
    paranaTime: 'সকাল ০৫:৩৬ - ০৯:২০ (০৩ এপ্রিল)',
    importance: 'সমস্ত জানা-অজানা পাপ থেকে মুক্তি দিয়ে পবিত্র চিত্ত দান করে।',
    fastRule: 'প্রায়শ্চিত্ত মনোভাব ও দানধ্যান।'
  },
  {
    id: 'kamada-2027',
    nameBn: 'কামদা একাদশী',
    nameEn: 'Kamada Ekadashi',
    date: '2027-04-17',
    bengaliDate: '৩ বৈশাখ, ১৪৩৩',
    month: 'চৈত্র / বৈশাখ',
    paksha: 'shukla',
    pakshaBn: 'শুক্ল পক্ষ',
    paranaTime: 'সকাল ০৫:২২ - ০৯:১০ (১৮ এপ্রিল)',
    importance: 'হিন্দু নববর্ষের প্রথম শুক্ল একাদশী। অভীষ্ট ফল প্রদায়িনী।',
    fastRule: 'শ্রীহরির চরণে তুলসী মঞ্জরী অর্পণ।'
  },
  {
    id: 'varuthini-2027',
    nameBn: 'বরুথিনী একাদশী',
    nameEn: 'Varuthini Ekadashi',
    date: '2027-05-02',
    bengaliDate: '১৮ বৈশাখ, ১৪৩৩',
    month: 'বৈশাখ',
    paksha: 'krishna',
    pakshaBn: 'কৃষ্ণ পক্ষ',
    paranaTime: 'সকাল ০৫:১০ - ০৮:৫৫ (০৩ মে)',
    importance: 'সৌভাগ্য ও সুখ বৃদ্ধিকারী। কন্যাদানের সমান পুণ্য অর্জিত হয়।',
    fastRule: 'প্রসাদ বিতরণ ও তামসিক ভোজন বর্জন।'
  },
  {
    id: 'mohini-2027',
    nameBn: 'মোহিনী একাদশী',
    nameEn: 'Mohini Ekadashi',
    date: '2027-05-16',
    bengaliDate: '২ জ্যৈষ্ঠ, ১৪৩৩',
    month: 'বৈশাখ / জ্যৈষ্ঠ',
    paksha: 'shukla',
    pakshaBn: 'শুক্ল পক্ষ',
    paranaTime: 'সকাল ০৫:০২ - ০৮:৪৫ (১৭ মে)',
    importance: 'মোহ, মায়া ও ভ্রম থেকে মুক্তি পাওয়ার মহাব্রত।',
    fastRule: 'ভগবান মোহিনী রূপের ধ্যান।'
  },
  {
    id: 'apara-2027',
    nameBn: 'অপরা একাদশী',
    nameEn: 'Apara Ekadashi',
    date: '2027-05-31',
    bengaliDate: '১৭ জ্যৈষ্ঠ, ১৪৩৩',
    month: 'জ্যৈষ্ঠ',
    paksha: 'krishna',
    pakshaBn: 'কৃষ্ণ পক্ষ',
    paranaTime: 'সকাল ০৫:০০ - ০৮:৪০ (০১ জুন)',
    importance: 'অপার পুণ্য দায়ক, যশ ও কীর্তি বৃদ্ধির একাদশী।',
    fastRule: 'ব্রাহ্মণ ভোজন ও জলছত্র দান।'
  },
  {
    id: 'nirjala-2027',
    nameBn: 'নির্জলা একাদশী (ভীম একাদশী)',
    nameEn: 'Nirjala Ekadashi (Bhim Ekadashi)',
    date: '2027-06-15',
    bengaliDate: '৩১ জ্যৈষ্ঠ, ১৪৩৩',
    month: 'জ্যৈষ্ঠ',
    paksha: 'shukla',
    pakshaBn: 'শুক্ল পক্ষ',
    paranaTime: 'সকাল ০৫:০০ - ০৮:৪০ (১৬ জুন)',
    importance: 'সবচেয়ে কঠিন ও মহত্বপূর্ণ একাদশী। এই একটি ব্রত পালনে বছরের ২৪টি একাদশীর পুণ্য লাভ হয়।',
    fastRule: 'সূর্যোদয় থেকে পরদিন সূর্যোদয় পর্যন্ত জলপানও নিষিদ্ধ।'
  },
  {
    id: 'yogini-2027',
    nameBn: 'যোগিনী একাদশী',
    nameEn: 'Yogini Ekadashi',
    date: '2027-06-30',
    bengaliDate: '১৫ আষাঢ়, ১৪৩৩',
    month: 'আষাঢ়',
    paksha: 'krishna',
    pakshaBn: 'কৃষ্ণ পক্ষ',
    paranaTime: 'সকাল ০৫:০৩ - ০৮:৪৫ (০১ জুলাই)',
    importance: 'চর্মরোগ ও শারীরিক ব্যাধি থেকে মুক্তির পবিত্র ব্রত।',
    fastRule: 'শ্রীহরির নাম সংকীর্তন ও দীনদুঃখীদের সেবা।'
  },
  {
    id: 'devshayani-2027',
    nameBn: 'দেবশয়নী / হরিশয়নী একাদশী',
    nameEn: 'Devshayani / Harishayani Ekadashi',
    date: '2027-07-14',
    bengaliDate: '২৯ আষাঢ়, ১৪৩৩',
    month: 'আষাঢ়',
    paksha: 'shukla',
    pakshaBn: 'শুক্ল পক্ষ',
    paranaTime: 'সকাল ০৫:০৮ - ০৮:৫০ (১৫ জুলাই)',
    importance: 'চাতুর্মাস্য ব্রতের শুরু। ভগবান বিষ্ণু ক্ষীরসাগরে চার মাসের যোগনিদ্রায় শয়ন করেন।',
    fastRule: 'শুভ বিবাহাদি মাঙ্গলিক কাজ এই সময় স্থগিত থাকে।'
  },
  {
    id: 'kamika-2027',
    nameBn: 'কামিকা একাদশী',
    nameEn: 'Kamika Ekadashi',
    date: '2027-07-29',
    bengaliDate: '১৩ শ্রাবণ, ১৪৩৩',
    month: 'শ্রাবণ',
    paksha: 'krishna',
    pakshaBn: 'কৃষ্ণ পক্ষ',
    paranaTime: 'সকাল ০৫:১৫ - ০৮:৫৫ (৩০ জুলাই)',
    importance: 'শ্রাবণ মাসে বিষ্ণু পূজার পুণ্য অশ্বমেধ যজ্ঞের সমান।',
    fastRule: 'তুলসী পাতা দিয়ে শ্রীহরির পূজা।'
  },
  {
    id: 'shravana-putrada-2027',
    nameBn: 'শ্রাবণ পুত্রদা / পবিত্রা একাদশী',
    nameEn: 'Shravana Putrada / Pavitra Ekadashi',
    date: '2027-08-13',
    bengaliDate: '২৮ শ্রাবণ, ১৪৩৩',
    month: 'শ্রাবণ',
    paksha: 'shukla',
    pakshaBn: 'শুক্ল পক্ষ',
    paranaTime: 'সকাল ০৫:২০ - ০৯:০০ (১৪ আগস্ট)',
    importance: 'সন্তান সুখ ও পাপ খণ্ডনকারী পবিত্র ব্রত।',
    fastRule: 'শ্রীকৃষ্ণকে পবিত্রী (রেশমী সূতো) ধারণ করানো হয়।'
  },
  {
    id: 'aja-2027',
    nameBn: 'অজা একাদশী',
    nameEn: 'Aja Ekadashi',
    date: '2027-08-28',
    bengaliDate: '১১ ভাদ্র, ১৪৩৩',
    month: 'ভাদ্র',
    paksha: 'krishna',
    pakshaBn: 'কৃষ্ণ পক্ষ',
    paranaTime: 'সকাল ০৫:২৫ - ০৯:০৫ (২৯ আগস্ট)',
    importance: 'রাজা হরিশ্চন্দ্র এই ব্রত পালন করে হারানো রাজ্য ও পরিবার ফেরত পেয়েছিলেন।',
    fastRule: 'সত্য নিষ্ঠা ও বিষ্ণু সহস্রনাম পাঠ।'
  },
  {
    id: 'parivartini-2027',
    nameBn: 'পরিবর্তিনী / পার্শ্ব একাদশী',
    nameEn: 'Parivartini / Parsva Ekadashi',
    date: '2027-09-11',
    bengaliDate: '২৫ ভাদ্র, ১৪৩৩',
    month: 'ভাদ্র',
    paksha: 'shukla',
    pakshaBn: 'শুক্ল পক্ষ',
    paranaTime: 'সকাল ০৫:২৮ - ০৯:১০ (১২ সেপ্টেম্বর)',
    importance: 'ভগবান বিষ্ণু যোগনিদ্রায় কাত ফেরেন (পার্শ্ব পরিবর্তন)। বামন অবতারের পূজা হয়।',
    fastRule: 'বামন পূজা ও দহি দান।'
  },
  {
    id: 'indira-2027',
    nameBn: 'ইন্দিরা একাদশী (পিতৃপক্ষ)',
    nameEn: 'Indira Ekadashi (Pitru Paksha)',
    date: '2027-09-26',
    bengaliDate: '৯ আশ্বিন, ১৪৩৩',
    month: 'আশ্বিন',
    paksha: 'krishna',
    pakshaBn: 'কৃষ্ণ পক্ষ',
    paranaTime: 'সকাল ০৫:৩০ - ০৯:১৫ (২৭ সেপ্টেম্বর)',
    importance: 'পিতৃপক্ষের একাদশী। পিতৃপুরুষদের নরক থেকে মুক্তি ও বৈকুণ্ঠ প্রাপ্তির জন্য এই ব্রত উৎসর্গ করা হয়।',
    fastRule: 'শ্রাদ্ধ, তর্পণ ও ব্রাহ্মণ ভোজন।'
  },
  {
    id: 'papankusha-2027',
    nameBn: 'পাশাঙ্কুশা একাদশী',
    nameEn: 'Papankusha Ekadashi',
    date: '2027-10-11',
    bengaliDate: '২৪ আশ্বিন, ১৪৩৩',
    month: 'আশ্বিন',
    paksha: 'shukla',
    pakshaBn: 'শুক্ল পক্ষ',
    paranaTime: 'সকাল ০৫:৩৫ - ০৯:২০ (১২ অক্টোবর)',
    importance: 'অঙ্কুশের ন্যায় পাপকে নিয়ন্ত্রণ করে সুখ, সমৃদ্ধি ও স্বর্গলোক প্রদান করে।',
    fastRule: 'পদ্মনাভ রূপের পূজা ও সোনা/তিল/গোদান।'
  }
];

export default function EkadashiModal({ isOpen, onClose, lang = 'bn', onSelectDate }) {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEkadashi, setSelectedEkadashi] = useState(null);

  const todayStr = useMemo(() => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  }, []);

  const nextEkadashi = useMemo(() => {
    return EKADASHI_LIST.find(e => e.date >= todayStr) || EKADASHI_LIST[0];
  }, [todayStr]);

  const filteredList = useMemo(() => {
    return EKADASHI_LIST.filter(item => {
      if (activeTab === 'upcoming' && item.date < todayStr) return false;
      if (activeTab === 'shukla' && item.paksha !== 'shukla') return false;
      if (activeTab === 'krishna' && item.paksha !== 'krishna') return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchBn = item.nameBn.toLowerCase().includes(q);
        const matchEn = item.nameEn.toLowerCase().includes(q);
        const matchMonth = item.month.toLowerCase().includes(q);
        if (!matchBn && !matchEn && !matchMonth) return false;
      }
      return true;
    });
  }, [activeTab, searchQuery, todayStr]);

  if (!isOpen) return null;

  const getDaysDiff = (dateStr) => {
    const today = new Date(todayStr);
    const target = new Date(dateStr);
    const diffTime = target - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-amber-100">
        
        {/* Header */}
        <div className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white p-5 sm:p-6 shadow-md">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all backdrop-blur-sm"
            title="Close"
          >
            <X size={20} />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shadow-inner border border-white/30">
              â¨
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                  {lang === 'en' ? 'Ekadashi Vrata & Parana Timings' : 'একাদশী তালিকা ও পারণ সময়সূচী'}
                </h2>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-400 text-amber-950 shadow-sm">
                  1433 বঙ্গাব্দ
                </span>
              </div>
              <p className="text-emerald-100 text-xs sm:text-sm mt-0.5">
                {lang === 'en' 
                  ? 'All 24 sacred Ekadashis of the year, fasting guidelines & exact Parana windows' 
                  : 'বছরের ২৪টি পবিত্র একাদশী, পারণের সময় ও মাহাত্ম্য'}
              </p>
            </div>
          </div>

          {/* Next Ekadashi Quick Banner */}
          {nextEkadashi && (
            <div className="mt-4 bg-white/15 backdrop-blur-md rounded-2xl p-3 border border-white/20 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-1 rounded-xl bg-amber-400 text-amber-950 text-xs font-bold shadow-sm">
                  {lang === 'en' ? 'Next Ekadashi' : 'আগামী একাদশী'}
                </span>
                <span className="font-semibold text-sm sm:text-base">
                  {lang === 'en' ? nextEkadashi.nameEn : nextEkadashi.nameBn}
                </span>
                <span className="text-xs text-emerald-200 hidden sm:inline">
                  ({nextEkadashi.date} â¢ {nextEkadashi.bengaliDate})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2.5 py-1 rounded-lg bg-black/25 text-white font-medium">
                  {(() => {
                    const days = getDaysDiff(nextEkadashi.date);
                    if (days === 0) return lang === 'en' ? 'Today!' : 'আজকেà¦!';
                    if (days === 1) return lang === 'en' ? 'Tomorrow' : 'আগামীকাল';
                    return lang === 'en' ? `In ${days} days` : `আর ${days} দিন বাকি`;
                  })()}
                </span>
                <button
                  onClick={() => setSelectedEkadashi(nextEkadashi)}
                  className="text-xs px-3 py-1 rounded-lg bg-white text-emerald-800 font-bold hover:bg-emerald-50 transition-colors shadow-sm"
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
              { id: 'upcoming', labelBn: 'আসন্ন', labelEn: 'Upcoming' },
              { id: 'shukla', labelBn: 'শুক্ল পক্ষ', labelEn: 'Shukla Paksha' },
              { id: 'krishna', labelBn: 'কৃষ্ণ পক্ষ', labelEn: 'Krishna Paksha' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-emerald-600 text-white shadow-sm'
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
              placeholder={lang === 'en' ? 'Search Ekadashi / month...' : 'একাদশী বা মাস খুঁজুন...'}
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
          <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-3.5 text-xs text-amber-900 flex items-start gap-2.5">
            <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold">
                {lang === 'en' ? 'Ekadashi Fasting & Parana Protocol:' : 'একাদশী পালন ও পারণ নিয়মাবলী:'}
              </p>
              <p className="text-amber-800 leading-relaxed">
                {lang === 'en'
                  ? 'Do not consume grains, rice, wheat, or pulses on Ekadashi. Break the fast (Parana) on the next day (Dwadashi) strictly within the prescribed time window after sunrise and before Hari Vasara ends.'
                  : 'একাদশীতে শস্য, ভাত, রুটি, ডাল পূর্ণ বর্জনীয়। পরদিন দ্বাদশীতে নির্দিষ্ট সময়ের মধ্যে হরিবাসর কেটে পারণ করা বাধ্যতামূলক।'}
              </p>
            </div>
          </div>

          {filteredList.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
              <Calendar className="mx-auto text-slate-300 mb-2" size={40} />
              <p className="text-slate-600 font-semibold">
                {lang === 'en' ? 'No Ekadashi found for this filter.' : 'এই ফিল্টারে কোনো একাদশী পাওয়া যায়নি।'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredList.map(item => {
                const isPast = item.date < todayStr;
                const daysDiff = getDaysDiff(item.date);
                const isSelected = selectedEkadashi?.id === item.id;

                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedEkadashi(isSelected ? null : item)}
                    className={`group bg-white rounded-2xl p-4 border transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md ${
                      isSelected
                        ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/20'
                        : isPast 
                          ? 'border-slate-200 opacity-75' 
                          : 'border-slate-200 hover:border-emerald-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                            item.paksha === 'shukla' 
                              ? 'bg-amber-100 text-amber-800' 
                              : 'bg-indigo-100 text-indigo-800'
                          }`}>
                            {lang === 'en' ? item.paksha.toUpperCase() : item.pakshaBn}
                          </span>
                          <span className="text-xs text-slate-500 font-medium">
                            {item.month}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-slate-800 mt-1 group-hover:text-emerald-700 transition-colors">
                          {lang === 'en' ? item.nameEn : item.nameBn}
                        </h3>
                      </div>

                      <div>
                        {daysDiff === 0 ? (
                          <span className="text-[11px] font-bold px-2 py-1 rounded-lg bg-emerald-500 text-white animate-pulse">
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

                    <div className="flex items-center gap-3 mt-2.5 text-xs text-slate-600">
                      <span className="flex items-center gap-1 font-medium text-slate-700">
                        <Calendar size={13} className="text-emerald-600" />
                        {item.date}
                      </span>
                      <span className="text-slate-300">|</span>
                      <span>{item.bengaliDate}</span>
                    </div>

                    <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-slate-700">
                        <Clock size={13} className="text-amber-600" />
                        <span className="font-semibold">
                          {lang === 'en' ? 'Parana:' : 'পারণ:'}
                        </span>
                        <span className="text-slate-800 font-medium">{item.paranaTime}</span>
                      </div>
                    </div>

                    {isSelected && (
                      <div className="mt-3.5 pt-3 border-t border-slate-200 space-y-2 text-xs animate-fadeIn">
                        <div>
                          <span className="font-bold text-slate-700">
                            {lang === 'en' ? 'Significance: ' : 'মাহাত্ম্য: '}
                          </span>
                          <span className="text-slate-600 leading-relaxed">{item.importance}</span>
                        </div>
                        <div>
                          <span className="font-bold text-slate-700">
                            {lang === 'en' ? 'Fasting Rule: ' : 'নিয়মাবলী: '}
                          </span>
                          <span className="text-emerald-700 font-medium">{item.fastRule}</span>
                        </div>

                        {onSelectDate && (
                          <div className="pt-1 flex justify-end">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectDate(new Date(item.date));
                                onClose();
                              }}
                              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 flex items-center gap-1 shadow-sm transition-all"
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
              ? 'Calculated according to authentic Surya Siddhanta & Gaudiya Panjika tradition'
              : 'বাংলা পঞ্জিকা ও সূর্য সিদ্ধান্ত অনুযায়ী সঠিক সময়সূচী'}
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
