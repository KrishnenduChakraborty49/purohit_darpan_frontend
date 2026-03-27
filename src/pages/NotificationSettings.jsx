import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { requestFCMToken } from '../firebase';
import axiosInstance from '../api/axiosInstance';
import { Bell, BellOff, Moon, Sun, Save } from 'lucide-react';
import toast from 'react-hot-toast';

export default function NotificationSettings() {
  const { user, updateFcmToken } = useAuthStore();
  const [prefs, setPrefs] = useState({
    enabled: true,
    festivalReminders: true,
    panchangAlerts: true,
    learningReminders: true,
    pujaPractice: true,
    reminderDaysBefore: 3,
  });
  const [fcmStatus, setFcmStatus] = useState('unknown');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user?.userId) loadPrefs();
  }, [user]);

  const loadPrefs = async () => {
    try {
      // Prefs are returned in the auth response as part of user object
      // or can be loaded from a dedicated endpoint
    } catch { /* silently fail */ }
  };

  const enableNotifications = async () => {
    const token = await requestFCMToken();
    if (token) {
      await updateFcmToken(token);
      setFcmStatus('granted');
      toast.success('Push notifications enabled! 🔔');
    } else {
      setFcmStatus('denied');
      toast.error('Notification permission denied. Please allow notifications in browser settings.');
    }
  };

  const testNotification = async () => {
    try {
      await axiosInstance.post('/notifications/test', { userId: user.userId });
      toast.success('Test notification sent! Check your device.');
    } catch {
      toast.error('Failed to send test notification');
    }
  };

  const savePrefs = async () => {
    setSaving(true);
    try {
      await axiosInstance.put('/notifications/preferences', {
        userId: user.userId,
        ...prefs,
      });
      toast.success('Preferences saved!');
    } catch {
      toast.error('Failed to save preferences');
    } finally {
      setSaving(false);
    }
  };

  const PREF_ITEMS = [
    { key: 'festivalReminders', label: 'Festival Reminders', desc: 'Get notified before major Hindu festivals', emoji: '🎉' },
    { key: 'panchangAlerts', label: 'Panchang Alerts', desc: 'Daily Panchang updates (Purnima, Ekadashi, etc.)', emoji: '🌙' },
    { key: 'learningReminders', label: 'Learning Reminders', desc: 'Weekly prompts to continue your puja studies', emoji: '📚' },
    { key: 'pujaPractice', label: 'Puja Practice', desc: 'Reminders to practice specific rituals', emoji: '🪔' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-950 to-amber-950/20 pt-16">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-6 animate-fade-in">
          
          <h1 className="text-2xl font-bold text-orange-200 flex items-center gap-2">
            <Bell size={24} className="text-orange-400" /> Notification Settings
          </h1>
          <p className="text-orange-400/60 text-sm mt-1">Manage your ritual reminders and alerts</p>
        </div>

        {/* Enable push notifications */}
        <div className="bg-stone-900/60 border border-orange-500/15 rounded-2xl p-6 mb-4 animate-slide-up">
          <h2 className="text-orange-200 font-semibold mb-4">Push Notifications</h2>

          {fcmStatus !== 'granted' ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-orange-500/15 border border-orange-500/30
                              flex items-center justify-center mb-4">
                <Bell size={28} className="text-orange-400" />
              </div>
              <p className="text-orange-200/70 text-sm mb-4">
                Allow push notifications to receive festival reminders and learning prompts
              </p>
              <button
                onClick={enableNotifications}
                className="px-6 py-3 bg-gradient-saffron text-white rounded-xl text-sm font-medium
                           shadow-saffron hover:shadow-lg transition-all duration-200">
                Enable Notifications
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/20 border border-green-500/30
                                flex items-center justify-center">
                  <Bell size={18} className="text-green-400" />
                </div>
                <div>
                  <p className="text-green-400 font-medium text-sm">Notifications Enabled</p>
                  <p className="text-orange-200/50 text-xs">Device is registered for push notifications</p>
                </div>
              </div>
              <button onClick={testNotification}
                className="text-xs text-orange-400/60 hover:text-orange-300 transition-colors underline">
                Send test
              </button>
            </div>
          )}
        </div>

        {/* Master toggle */}
        <div className="bg-stone-900/60 border border-orange-500/15 rounded-2xl p-5 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-200 font-medium">All Notifications</p>
              <p className="text-orange-400/50 text-xs">Master on/off switch</p>
            </div>
            <button
              onClick={() => setPrefs({ ...prefs, enabled: !prefs.enabled })}
              className={`w-12 h-6 rounded-full transition-all duration-200 relative
                ${prefs.enabled ? 'bg-orange-500' : 'bg-stone-600'}`}>
              <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white
                              shadow-sm transition-all duration-200
                              ${prefs.enabled ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>

        {/* Individual preferences */}
        <div className="bg-stone-900/60 border border-orange-500/15 rounded-2xl overflow-hidden mb-4">
          {PREF_ITEMS.map(({ key, label, desc, emoji }, idx) => (
            <div key={key}
              className={`flex items-center justify-between p-5
                ${idx < PREF_ITEMS.length - 1 ? 'border-b border-orange-500/10' : ''}`}>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{emoji}</span>
                <div>
                  <p className={`font-medium text-sm ${!prefs.enabled ? 'text-orange-200/40' : 'text-orange-200'}`}>
                    {label}
                  </p>
                  <p className="text-orange-400/50 text-xs mt-0.5">{desc}</p>
                </div>
              </div>
              <button
                disabled={!prefs.enabled}
                onClick={() => setPrefs({ ...prefs, [key]: !prefs[key] })}
                className={`w-12 h-6 rounded-full transition-all duration-200 relative
                  disabled:opacity-40 disabled:cursor-not-allowed
                  ${prefs[key] && prefs.enabled ? 'bg-orange-500' : 'bg-stone-600'}`}>
                <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white
                                shadow-sm transition-all duration-200
                                ${prefs[key] && prefs.enabled ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
          ))}
        </div>

        {/* Days before */}
        <div className="bg-stone-900/60 border border-orange-500/15 rounded-2xl p-5 mb-6">
          <label className="block text-orange-200 font-medium mb-3">Remind me before festivals</label>
          <div className="flex gap-2 flex-wrap">
            {[1, 3, 7, 14, 20].map((d) => (
              <button key={d}
                onClick={() => setPrefs({ ...prefs, reminderDaysBefore: d })}
                className={`px-4 py-2 rounded-xl text-sm border transition-all
                  ${prefs.reminderDaysBefore === d
                    ? 'bg-orange-500/20 text-orange-300 border-orange-500/40'
                    : 'bg-stone-800 text-orange-400/60 border-orange-500/10 hover:bg-stone-700'
                  }`}>
                {d} day{d > 1 ? 's' : ''}
              </button>
            ))}
          </div>
        </div>

        {/* Save button */}
        <button
          onClick={savePrefs}
          disabled={saving}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl
                     bg-gradient-saffron text-white font-medium shadow-saffron
                     hover:shadow-lg transition-all duration-200
                     disabled:opacity-70">
          {saving
            ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            : <><Save size={18} /> Save Preferences</>
          }
        </button>
      </div>
    </div>
  );
}


