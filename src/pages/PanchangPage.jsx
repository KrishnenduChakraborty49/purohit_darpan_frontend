import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { usePanchangStore } from '../store/panchangStore';
import toast from 'react-hot-toast';
import { ShoppingCart, Settings, MapPin, CalendarDays, ChevronRight, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PanchangPage() {
  const { today: panchangData, fetchDate, loading } = usePanchangStore();
  const [viewDate] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    fetchDate(viewDate);
  }, [fetchDate, viewDate]);

  const handleComingSoon = () => {
    toast('এই ফিচারটি খুব শীঘ্রই আসছে! (Coming Soon)', { icon: '🚧' });
  };

  const gridItems = [
    { label: 'ক্যালেন্ডার', icon: '📅', color: 'text-orange-500', bg: 'bg-orange-50', action: handleComingSoon },
    { label: 'পঞ্চাঙ্গ', icon: '🌌', color: 'text-indigo-500', bg: 'bg-indigo-50', action: handleComingSoon },
    { label: 'রাশিফল', icon: '♈', color: 'text-purple-500', bg: 'bg-purple-50', action: handleComingSoon },
    { label: 'পূজার দিন', icon: '🙏', color: 'text-teal-500', bg: 'bg-teal-50', action: () => navigate('/pujas') },
    { label: 'বিবাহের দিন', icon: '🎁', color: 'text-red-500', bg: 'bg-red-50', action: handleComingSoon },
    { label: 'একাদশী', icon: '📖', color: 'text-green-500', bg: 'bg-green-50', action: handleComingSoon },
    { label: 'গ্রহণ', icon: '🌑', color: 'text-slate-500', bg: 'bg-slate-50', action: handleComingSoon },
    { label: 'অন্যান্য', icon: '⊞', color: 'text-emerald-600', bg: 'bg-emerald-50', action: handleComingSoon },
    { label: 'অমাবস্যা', icon: '🌒', color: 'text-stone-700', bg: 'bg-stone-100', action: handleComingSoon },
    { label: 'পূর্ণিমা', icon: '🌕', color: 'text-yellow-500', bg: 'bg-yellow-50', action: handleComingSoon },
    { label: 'রাশি নির্ণয়', icon: '☸️', color: 'text-blue-500', bg: 'bg-blue-50', action: handleComingSoon },
    { label: 'ব্রত', icon: '📆', color: 'text-rose-500', bg: 'bg-rose-50', action: handleComingSoon },
  ];

  // Helper to get Bengali day name
  const getBengaliDay = (date) => {
    const days = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];
    return days[date.getDay()];
  };

  // Format date to Bengali string
  const formatBengaliDate = (date) => {
    const d = new Intl.DateTimeFormat('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
    return d; // e.g., ১৯ আগস্ট, ২০২৬
  };

  return (
    <div className="min-h-screen bg-stone-50 pt-24 pb-12 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          
          {/* Left Column: Date & Info */}
          <div className="lg:col-span-5 space-y-5">
            {/* Custom Header matching screenshot */}
            <div className="flex items-center justify-between px-4 py-4 bg-white rounded-2xl shadow-sm border border-stone-100">
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">বাংলা পঞ্জিকা ১৪৩৩</h1>
              <div className="flex gap-4 items-center">
                <button className="text-teal-600 hover:text-teal-700 transition-colors">
                  <ShoppingCart size={24} />
                </button>
                <button className="text-slate-500 hover:text-slate-700 transition-colors">
                  <Settings size={24} />
                </button>
              </div>
            </div>

            {/* Location & Year Selector Row */}
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-between bg-white shadow-sm rounded-xl px-4 py-3 border border-stone-100 active:bg-stone-50 hover:border-stone-200 transition-all">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🇮🇳</span>
                  <span className="text-lg font-medium text-stone-800">ভারত</span>
                </div>
                <MapPin size={20} className="text-stone-400" />
              </button>
              
              <button className="flex-[1.2] flex items-center justify-between bg-white shadow-sm rounded-xl px-4 py-3 border border-stone-100 active:bg-stone-50 hover:border-stone-200 transition-all">
                <div className="flex items-center gap-2">
                  <CalendarDays size={20} className="text-blue-600" />
                  <div className="text-left leading-tight">
                    <span className="text-sm font-medium text-stone-800 block">নতুন বছরের</span>
                    <span className="text-sm font-medium text-stone-800 block">পঞ্জিকা দেখুন</span>
                  </div>
                </div>
                <ChevronRight size={20} className="text-purple-900" />
              </button>
            </div>

            {/* The Blue Main Card */}
            <div className="bg-[#28559D] rounded-2xl overflow-hidden shadow-lg">
              {/* Top half: Dates */}
              <div className="p-5 lg:p-6 grid grid-cols-2 gap-4 items-center">
                <div>
                  <h2 className="text-white text-3xl font-bold mb-2">{getBengaliDay(viewDate)}</h2>
                  <p className="text-blue-100 text-sm font-medium">{formatBengaliDate(viewDate)}</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-end gap-2">
                    <span className="text-lg">🇧🇩</span>
                    <span className="text-white text-sm font-medium">৪ ভাদ্র, ১৪৩৩</span>
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <span className="text-lg">🇮🇳</span>
                    <span className="text-white text-sm font-medium">১ ভাদ্র, ১৪৩৩</span>
                  </div>
                </div>
              </div>

              {/* Bottom half: Sunrise/Sunset */}
              <div className="bg-[#1f4888] px-5 py-4 flex justify-between items-center relative">
                {/* Decorative line spanning across */}
                <div className="absolute top-1/2 left-4 right-4 h-[1px] bg-blue-400/20 -translate-y-1/2"></div>
                
                <div className="text-center relative z-10 bg-[#1f4888] px-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-xl">🌅</span>
                    <span className="text-white font-medium">সূর্যোদয়</span>
                  </div>
                  <p className="text-white text-sm font-medium tracking-wide">
                    {panchangData?.sunrise ? panchangData.sunrise.replace('AM', 'মি').replace(':', ' টা ') + ' ০ সে' : '৫ টা ১৭ মি ০ সে'}
                  </p>
                </div>
                
                <div className="text-center relative z-10 bg-[#1f4888] px-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-white font-medium">সূর্যাস্ত</span>
                    <span className="text-xl">🌇</span>
                  </div>
                  <p className="text-white text-sm font-medium tracking-wide">
                    {panchangData?.sunset ? panchangData.sunset.replace('PM', 'মি').replace(':', ' টা ') + ' ০ সে' : '৬ টা ৬ মি ০ সে'}
                  </p>
                </div>
              </div>
            </div>

            {/* Notice text */}
            <div className="px-5 py-4 flex gap-3 bg-white rounded-2xl shadow-sm border border-stone-100">
              <div className="mt-1.5 w-2.5 h-2.5 rounded-full bg-red-500 flex-shrink-0"></div>
              <p className="text-xs lg:text-sm text-stone-600 leading-relaxed font-medium">
                সূর্যোদয়ের পর থেকে সূর্যাস্ত পর্যন্ত সময়কে দিবা আর সূর্যাস্তের পরের সময়কে রাত্রি হিসেবে চিহ্নিত করা হয়েছে।<br/>
                <span className="text-stone-500 italic mt-2 block">*** অ্যাপ্লিকেশনের তারিখ পরিবর্তন হয় সূর্যোদয়ের পর।</span>
              </p>
            </div>
          </div>

          {/* Right Column: Icon Grid */}
          <div className="lg:col-span-7 bg-white rounded-2xl shadow-sm border border-stone-100 p-6 lg:p-10">
            <h3 className="text-lg font-bold text-stone-800 mb-8 hidden lg:block border-b border-stone-100 pb-4">দ্রুত নেভিগেশন (Quick Navigation)</h3>
            <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-y-10 gap-x-4 lg:gap-x-8">
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
    </div>
  );
}
