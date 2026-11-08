import React, { useState, useEffect } from 'react';
import { Bell, BellOff, ExternalLink, Sparkles, Clock, CheckCircle2, Volume2, ShieldCheck, Calendar, BookOpen, X } from 'lucide-react';
import axiosInstance from '../api/axiosInstance';
import { useAuthStore } from '../store/authStore';
import { formatDistanceToNow } from 'date-fns';
import { getActiveFestivalNotifications, requestBrowserNotificationPermission } from '../utils/festivalNotifications';
import { useNavigate } from 'react-router-dom';

export default function NotificationCenter({ isOpen, onClose, lang = 'bn' }) {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [backendNotifications, setBackendNotifications] = useState([]);
  const [festivalAlerts, setFestivalAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [browserPerm, setBrowserPerm] = useState(
    typeof window !== 'undefined' && 'Notification' in window ? Notification.permission : 'unsupported'
  );
  const [readIds, setReadIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('purohit_read_notifications') || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    // 1. Always load active festival alerts (today + this week)
    const active = getActiveFestivalNotifications(new Date(), lang);
    setFestivalAlerts(active);

    // 2. Load backend notifications if user is logged in
    if (isOpen && user?.userId) {
      fetchNotifications();
    }
  }, [isOpen, user, lang]);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(`/notifications/history/${user.userId}`);
      setBackendNotifications(Array.isArray(data) ? data : (data?.content || []));
    } catch (err) {
      console.warn('Failed to fetch backend notifications', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEnableBrowserAlerts = async () => {
    const res = await requestBrowserNotificationPermission();
    setBrowserPerm(res);
  };

  const markAllAsRead = () => {
    const allIds = [
      ...festivalAlerts.map(a => a.id),
      ...backendNotifications.map(n => n.id)
    ];
    setReadIds(allIds);
    localStorage.setItem('purohit_read_notifications', JSON.stringify(allIds));
  };

  if (!isOpen) return null;

  return (
    <div 
      className="absolute right-0 mt-2 w-84 sm:w-96 bg-stone-900/95 backdrop-blur-xl border border-orange-500/30 rounded-3xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 text-stone-100"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="p-4 border-b border-orange-500/15 flex items-center justify-between bg-gradient-to-r from-amber-950/70 via-stone-900 to-orange-950/70">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
            <Bell size={16} />
          </div>
          <div>
            <h3 className="text-orange-200 font-bold text-sm">
              {lang === 'bn' ? 'বিজ্ঞপ্তি ও উৎসব নির্ঘণ্ট' : 'Notifications & Puja Alerts'}
            </h3>
            <p className="text-[11px] text-orange-300/60">
              {lang === 'bn' ? 'আজকের ও আসন্ন পূজার বিশেষ বার্তা' : "Today's and upcoming sacred updates"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={markAllAsRead}
            className="text-[11px] text-orange-400/70 hover:text-orange-300 transition-colors"
          >
            {lang === 'bn' ? 'সব পঠিত' : 'Mark all read'}
          </button>
          <button 
            onClick={onClose} 
            className="text-stone-400 hover:text-stone-200 text-xs p-1 hover:bg-white/5 rounded-lg transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Browser Notification Permission Banner */}
      {browserPerm === 'default' && (
        <div className="p-3 bg-gradient-to-r from-orange-950/60 to-amber-950/60 border-b border-orange-500/20 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs text-orange-200">
            <Sparkles size={14} className="text-amber-400 flex-shrink-0" />
            <span>{lang === 'bn' ? 'পূজার সময়োপযোগী পুশ নোটিফিকেশন পান' : 'Get timely puja push alerts'}</span>
          </div>
          <button
            onClick={handleEnableBrowserAlerts}
            className="px-2.5 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 rounded-lg text-xs font-bold hover:brightness-110 transition-all flex-shrink-0"
          >
            {lang === 'bn' ? 'চালু করুন' : 'Enable'}
          </button>
        </div>
      )}

      {/* Notifications Scroll Container */}
      <div className="max-h-[440px] overflow-y-auto divide-y divide-orange-500/10">

        {/* 1. FESTIVAL ALERTS (Today & This Week) */}
        {festivalAlerts.length > 0 && (
          <div className="p-2 space-y-2">
            <div className="px-2 pt-1 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400/80 flex items-center gap-1">
                <Sparkles size={11} />
                {lang === 'bn' ? 'উৎসব ও পূজার বিজ্ঞপ্তি' : 'Sacred Festivals & Occasions'}
              </span>
              <span className="text-[10px] text-stone-400">
                {festivalAlerts.length} {lang === 'bn' ? 'টি উপলক্ষ' : 'occasions'}
              </span>
            </div>

            {festivalAlerts.map((alert) => {
              const isRead = readIds.includes(alert.id);
              return (
                <div 
                  key={alert.id}
                  className={`p-3 rounded-2xl transition-all border ${
                    alert.isToday 
                      ? 'bg-gradient-to-r from-amber-950/80 via-orange-950/60 to-stone-900 border-amber-500/50 shadow-md shadow-orange-950/40' 
                      : 'bg-stone-800/40 hover:bg-stone-800/60 border-orange-500/10'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 shadow-sm ${
                      alert.isToday 
                        ? 'bg-gradient-to-br from-amber-500 to-orange-600 border border-amber-300/40 animate-pulse text-white' 
                        : 'bg-orange-500/20 text-orange-300'
                    }`}>
                      {alert.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${alert.badgeColor}`}>
                          {alert.badge}
                        </span>
                        <span className="text-[10px] text-stone-400">
                          {alert.isToday ? (lang === 'bn' ? 'আজ' : 'Today') : alert.eventDate}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-orange-100 leading-snug">
                        {alert.title}
                      </h4>

                      <p className="text-xs text-orange-200/70 mt-1 leading-relaxed">
                        {alert.body}
                      </p>

                      <div className="mt-2.5 flex items-center gap-2">
                        <button
                          onClick={() => {
                            onClose();
                            navigate(alert.actionUrl);
                          }}
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                            alert.isToday
                              ? 'bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-sm'
                              : 'bg-orange-500/20 hover:bg-orange-500/30 text-orange-200 border border-orange-500/30'
                          }`}
                        >
                          <BookOpen size={12} />
                          {alert.actionLabel}
                        </button>

                        <button
                          onClick={() => {
                            onClose();
                            navigate('/panchang');
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs text-stone-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
                        >
                          <Calendar size={12} />
                          {lang === 'bn' ? 'পঞ্জিকা' : 'Panchang'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 2. BACKEND NOTIFICATIONS */}
        {loading ? (
          <div className="p-8 text-center">
            <div className="w-6 h-6 border-2 border-orange-500/30 border-t-orange-400 rounded-full animate-spin mx-auto" />
          </div>
        ) : backendNotifications.length > 0 ? (
          <div className="p-2 space-y-2">
            <div className="px-2 pt-1 text-[10px] font-bold uppercase tracking-wider text-orange-400/80">
              {lang === 'bn' ? 'ব্যক্তিগত আপডেট' : 'Personal Updates'}
            </div>
            {backendNotifications.map((n) => (
              <div key={n.id} className="p-3 bg-stone-800/30 rounded-xl hover:bg-stone-800/50 transition-colors">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] font-bold text-orange-400 uppercase tracking-tight">
                    {n.notificationType ? n.notificationType.replace('_', ' ') : 'ALERT'}
                  </span>
                  <span className="text-[10px] text-stone-400">
                    {n.sentAt ? formatDistanceToNow(new Date(n.sentAt)) + ' ago' : ''}
                  </span>
                </div>
                <p className="text-xs text-orange-100 font-medium mb-1">{n.title}</p>
                <p className="text-[11px] text-orange-200/60 leading-relaxed mb-2">{n.body}</p>
                {n.actionUrl && (
                  <button 
                    onClick={() => { onClose(); navigate(n.actionUrl); }} 
                    className="text-[10px] text-orange-400 hover:text-orange-300 flex items-center gap-1 font-semibold"
                  >
                    {lang === 'bn' ? 'বিস্তারিত দেখুন' : 'View Details'} <ExternalLink size={10} />
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : null}

        {festivalAlerts.length === 0 && backendNotifications.length === 0 && !loading && (
          <div className="p-12 text-center text-orange-200/30">
            <BellOff size={32} className="mx-auto mb-2 opacity-20" />
            <p className="text-sm">{lang === 'bn' ? 'কোনো নতুন বিজ্ঞপ্তি নেই' : 'No notifications yet'}</p>
          </div>
        )}

      </div>
      
      {/* Footer */}
      <div className="p-3 border-t border-orange-500/10 bg-stone-900/60 text-center flex items-center justify-between text-xs text-orange-400/70 px-4">
        <span>{lang === 'bn' ? 'নিয়মিত নির্ঘণ্ট আপডেট' : 'Live Muhurat Updates'}</span>
        <button 
          onClick={() => {
            onClose();
            navigate('/panchang');
          }}
          className="text-orange-300 hover:text-orange-200 font-medium flex items-center gap-1"
        >
          {lang === 'bn' ? 'সম্পূর্ণ পঞ্জিকা দেখুন' : 'Full Panchang'} <ExternalLink size={12} />
        </button>
      </div>
    </div>
  );
}
