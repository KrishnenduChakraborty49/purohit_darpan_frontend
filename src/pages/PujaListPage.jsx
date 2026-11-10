import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { usePujaStore } from '../store/pujaStore';
import { Search, Filter, BookOpen, Play, ChevronRight, Sparkles } from 'lucide-react';
import axiosInstance from '../api/axiosInstance';

const DIFFICULTIES = ['ALL', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED'];

export default function PujaListPage() {
  const { pujas, fetchPujas, loading } = usePujaStore();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('ALL');
  const navigate = useNavigate();

  useEffect(() => { fetchPujas(); }, []);

  const handleSearch = async (q) => {
    setSearch(q);
    if (q.length > 2) {
      try {
        const { data } = await axiosInstance.get(`/pujas/search?q=${encodeURIComponent(q)}`);
        // handled by the local filter below
      } catch { /* use local filter fallback */ }
    }
  };

  const filtered = pujas.filter((p) => {
    const matchSearch = !search || 
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.nameDevanagari && p.nameDevanagari.includes(search)) ||
      (p.category && p.category.toLowerCase().includes(search.toLowerCase()));
    const matchFilter = filter === 'ALL' || p.difficulty === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-950 to-amber-950/20 pt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="mb-6 animate-fade-in">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-orange-500/20 text-orange-300 border border-orange-500/30 flex items-center gap-1">
              <Sparkles size={11} className="text-orange-400" /> বৈদিক পূজা পদ্ধতি ও নির্দেশিকা
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-orange-200 flex items-center gap-2">
            <BookOpen size={26} className="text-orange-400" /> Puja Library (পূজা সম্ভার)
          </h1>
          <p className="text-orange-400/70 text-sm mt-1">Complete step-by-step Vedic ritual guides with mantra, vidhi and sacred video</p>
        </div>

        {/* Search + filter */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400/50" />
            <input
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search pujas (e.g. Kali, Durga, Shiv, Lakshmi)..."
              className="w-full bg-stone-800/80 border border-orange-500/20 text-orange-200
                         pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none
                         focus:border-orange-400/50 placeholder-orange-400/40 transition-all"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {DIFFICULTIES.map((d) => (
              <button key={d}
                onClick={() => setFilter(d)}
                className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all
                  ${filter === d
                    ? 'bg-orange-500/20 text-orange-300 border-orange-500/40'
                    : 'bg-stone-800/60 text-orange-400/60 border-orange-500/10 hover:bg-stone-700/60'
                  }`}>
                {d === 'ALL' ? 'All' : d.charAt(0) + d.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="bg-stone-800/60 rounded-2xl h-56 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((puja) => (
              <button
                key={puja.id}
                onClick={() => navigate(`/puja/${puja.id}`)}
                className="group text-left bg-stone-900/80 border border-orange-500/15
                           rounded-2xl overflow-hidden hover:border-orange-500/40
                           transition-all duration-200 hover:shadow-saffron hover:scale-[1.02]
                           active:scale-100 animate-fade-in flex flex-col justify-between">

                <div>
                  {/* Cover */}
                  <div className="h-44 bg-gradient-to-br from-amber-950 to-orange-950/80
                                  flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent z-10 opacity-70" />
                    <div className="absolute inset-0 w-full h-full overflow-hidden">
                      {puja.thumbnailUrl ? (
                        <img
                          src={puja.thumbnailUrl}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          alt={puja.name}
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            if (puja.name.toLowerCase().includes('kali')) {
                              e.currentTarget.src = '/images/kali_closeup.jpg';
                            } else if (puja.name.toLowerCase().includes('durga')) {
                              e.currentTarget.src = '/images/durga_closeup.jpg';
                            } else if (puja.name.toLowerCase().includes('lakshmi') || puja.name.toLowerCase().includes('laxmi')) {
                              e.currentTarget.src = '/images/lakshmi_closeup.jpg';
                            } else if (puja.name.toLowerCase().includes('ganesh')) {
                              e.currentTarget.src = '/images/ganesh_closeup.jpg';
                            } else if (puja.name.toLowerCase().includes('saraswati')) {
                              e.currentTarget.src = '/images/saraswati_closeup.jpg';
                            } else if (puja.name.toLowerCase().includes('shiv')) {
                              e.currentTarget.src = '/images/shiv_closeup.jpg';
                            }
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-5xl">
                          🪔
                        </div>
                      )}
                    </div>
                    <div className="absolute top-3 right-3 z-20">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold backdrop-blur-md border shadow-sm
                        ${puja.difficulty === 'BEGINNER'
                          ? 'bg-green-950/80 text-green-300 border-green-500/40'
                          : puja.difficulty === 'INTERMEDIATE'
                          ? 'bg-amber-950/80 text-amber-300 border-amber-500/40'
                          : 'bg-red-950/80 text-red-300 border-red-500/40'
                        }`}>
                        {puja.difficulty}
                      </span>
                    </div>
                    {puja.category && (
                      <div className="absolute top-3 left-3 z-20">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-black/60 text-orange-200 backdrop-blur-md border border-orange-500/20">
                          {puja.category}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="text-orange-100 font-bold text-lg group-hover:text-orange-300 transition-colors">
                      {puja.name}
                    </h3>
                    {puja.nameDevanagari && (
                      <p className="font-devanagari text-orange-400/80 text-sm mt-0.5">
                        {puja.nameDevanagari}
                      </p>
                    )}
                    {puja.description && (
                      <p className="text-orange-200/60 text-xs mt-2 line-clamp-2 leading-relaxed">
                        {puja.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="px-4 pb-4">
                  <div className="flex items-center justify-between pt-3 border-t border-orange-500/10">
                    <div className="flex items-center gap-3 text-xs text-orange-400/60">
                      <span className="flex items-center gap-1 font-medium"><BookOpen size={12} /> Docs</span>
                      <span className="flex items-center gap-1 font-medium"><Play size={12} /> Video</span>
                    </div>
                    <span className="text-xs text-orange-300 group-hover:text-orange-200 flex items-center gap-1 font-medium group-hover:translate-x-1 transition-all">
                      পদ্ধতি শিখুন <ChevronRight size={14} className="text-orange-400" />
                    </span>
                  </div>
                </div>
              </button>
            ))}
            {filtered.length === 0 && !loading && (
              <div className="col-span-full text-center py-16">
                <p className="text-5xl mb-4">🪔</p>
                <p className="text-orange-200/50">No pujas found for "{search}"</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
