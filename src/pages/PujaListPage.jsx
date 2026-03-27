import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { usePujaStore } from '../store/pujaStore';
import { Search, Filter, BookOpen, Play, ChevronRight } from 'lucide-react';
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
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'ALL' || p.difficulty === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-950 to-amber-950/20 pt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="mb-6 animate-fade-in">
          <h1 className="text-2xl font-bold text-orange-200 flex items-center gap-2">
            <BookOpen size={24} className="text-orange-400" /> Puja Library
          </h1>
          <p className="text-orange-400/60 text-sm mt-1">Complete step-by-step Vedic ritual guides</p>
        </div>

        {/* Search + filter */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400/50" />
            <input
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search pujas..."
              className="w-full bg-stone-800/80 border border-orange-500/20 text-orange-200
                         pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none
                         focus:border-orange-400/50 placeholder-orange-400/30 transition-all"
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
              <div key={i} className="bg-stone-800/60 rounded-2xl h-48 animate-pulse" />
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
                           active:scale-100 animate-fade-in">

                {/* Cover */}
                <div className="h-28 bg-gradient-to-br from-amber-900/60 to-orange-900/40
                                flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-amber-500/5" />
                  <div className="absolute inset-0 w-full h-full overflow-hidden">
                    {puja.thumbnailUrl ? (
                      <img src={puja.thumbnailUrl} className="w-full h-full object-cover" alt="" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-5xl animate-float">
                        {puja.thumbnailEmoji || '??'}
                      </div>
                    )}
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium
                      ${puja.difficulty === 'BEGINNER'
                        ? 'bg-green-500/20 text-green-400 backdrop-blur-sm'
                        : puja.difficulty === 'INTERMEDIATE'
                        ? 'bg-amber-500/20 text-amber-400 backdrop-blur-sm'
                        : 'bg-red-500/20 text-red-400 backdrop-blur-sm'
                      }`}>
                      {puja.difficulty}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-orange-200 font-semibold group-hover:text-orange-100 transition-colors">
                    {puja.name}
                  </h3>
                  {puja.nameDevanagari && (
                    <p className="font-devanagari text-orange-400/60 text-sm mt-0.5">
                      {puja.nameDevanagari}
                    </p>
                  )}
                  {puja.description && (
                    <p className="text-orange-200/50 text-xs mt-2 line-clamp-2 leading-relaxed">
                      {puja.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-3 text-xs text-orange-400/50">
                      <span className="flex items-center gap-1"><BookOpen size={11} /> Docs</span>
                      <span className="flex items-center gap-1"><Play size={11} /> Video</span>
                    </div>
                    <ChevronRight size={16} className="text-orange-400/30 group-hover:text-orange-400
                                                        group-hover:translate-x-1 transition-all" />
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




