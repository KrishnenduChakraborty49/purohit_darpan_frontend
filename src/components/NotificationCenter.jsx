import { useState, useEffect } from 'react';
import { Bell, BellOff, ExternalLink, Trash2 } from 'lucide-react';
import axiosInstance from '../api/axiosInstance';
import { useAuthStore } from '../store/authStore';
import { formatDistanceToNow } from 'date-fns';

export default function NotificationCenter({ isOpen, onClose }) {
  const { user } = useAuthStore();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && user) fetchNotifications();
  }, [isOpen, user]);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(`/notifications/history/ + user.userId + `);
      setNotifications(data.content || []);
    } catch (err) {
      console.error('Failed to fetch notifications', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-stone-900 border border-orange-500/20 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
      <div className="p-4 border-b border-orange-500/10 flex items-center justify-between bg-stone-800/40">
        <h3 className="text-orange-200 font-semibold flex items-center gap-2">
          <Bell size={18} className="text-orange-400" /> Notifications
        </h3>
        <button onClick={onClose} className="text-orange-400/50 hover:text-orange-400 text-xs">Close</button>
      </div>

      <div className="max-h-[400px] overflow-y-auto">
        {loading ? (
          <div className="p-8 text-center"><div className="w-6 h-6 border-2 border-orange-500/30 border-t-orange-400 rounded-full animate-spin mx-auto"/></div>
        ) : notifications.length === 0 ? (
          <div className="p-12 text-center text-orange-200/30">
            <BellOff size={32} className="mx-auto mb-2 opacity-20" />
            <p className="text-sm">No notifications yet</p>
          </div>
        ) : (
          <div className="divide-y divide-orange-500/5">
            {notifications.map((n) => (
              <div key={n.id} className="p-4 hover:bg-orange-500/5 transition-colors">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-xs font-bold text-orange-400 uppercase tracking-tight">{n.notificationType.replace('_', ' ')}</span>
                  <span className="text-[10px] text-orange-200/30">{formatDistanceToNow(new Date(n.sentAt))} ago</span>
                </div>
                <p className="text-sm text-orange-100 font-medium mb-1">{n.title}</p>
                <p className="text-xs text-orange-200/60 leading-relaxed mb-2">{n.body}</p>
                {n.actionUrl && (
                  <a href={n.actionUrl} className="text-[10px] text-orange-400 hover:text-orange-300 flex items-center gap-1">
                    View Details <ExternalLink size={10} />
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="p-3 border-t border-orange-500/10 bg-stone-800/20 text-center">
        <button onClick={fetchNotifications} className="text-xs text-orange-400/70 hover:text-orange-400 transition-colors">Refresh updates</button>
      </div>
    </div>
  );
}
