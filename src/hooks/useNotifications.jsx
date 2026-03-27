import { useEffect, useRef } from 'react';
import { onForegroundMessage } from '../firebase';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

/**
 * Custom hook that listens for foreground FCM messages while the app is open.
 * Shows a toast notification and navigates on click.
 */
export function useNotifications() {
  const navigate = useNavigate();
  const unsubscribeRef = useRef(null);

  useEffect(() => {
    try {
      unsubscribeRef.current = onForegroundMessage((payload) => {
        const { title, body } = payload.notification || {};
        const { url } = payload.data || {};

        toast.custom(
          (t) => (
            <div
              className={`max-w-sm w-full bg-gradient-to-r from-amber-900 to-orange-800
                         border border-orange-500/40 rounded-xl shadow-xl p-4
                         flex items-start gap-3 cursor-pointer transition-all duration-300
                         ${t.visible ? 'animate-slide-up' : 'opacity-0'}`}
              onClick={() => {
                toast.dismiss(t.id);
                if (url) navigate(url);
              }}
            >
              <span className="text-2xl">🪔</span>
              <div>
                <p className="text-orange-200 font-semibold text-sm">{title}</p>
                <p className="text-orange-100/80 text-xs mt-0.5">{body}</p>
              </div>
            </div>
          ),
          { duration: 6000, position: 'top-right' }
        );
      });
    } catch (err) {
      // Firebase not configured — silently ignore in dev
    }

    return () => {
      if (unsubscribeRef.current) unsubscribeRef.current();
    };
  }, [navigate]);
}
