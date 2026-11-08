// Festival & Sacred Occasion Notification System for Purohit Darpan
import { format } from 'date-fns';

export const MASTER_FESTIVALS = [
  {
    id: 101,
    nameBn: 'শ্রী শ্রী সরস্বতী পূজা',
    nameEn: 'Saraswati Puja (Vasant Panchami)',
    eventDate: '2026-02-13',
    tithiBn: 'মাঘ শুক্লা পঞ্চমী',
    description: 'বিদ্যা ও জ্ঞানের দেবী মা সরস্বতীর আরাধনা।',
    icon: '🪕',
    category: 'major',
    pujaId: 3
  },
  {
    id: 102,
    nameBn: 'মহা শিবরাত্রি ব্রত',
    nameEn: 'Maha Shivaratri',
    eventDate: '2026-03-06',
    tithiBn: 'ফাল্গুন কৃষ্ণা চতুর্দশী',
    description: 'দেবাধিদেব মহাদেবের পরম পাবন রাত্রি ও ব্রতোপবাস।',
    icon: '🔱',
    category: 'major',
    pujaId: 4
  },
  {
    id: 103,
    nameBn: 'শ্রী শ্রী কৃষ্ণের দোলযাত্রা',
    nameEn: 'Dol Yatra (Holi)',
    eventDate: '2026-03-25',
    tithiBn: 'ফাল্গুন পূর্ণিমা',
    description: 'রাধাকৃষ্ণের পবিত্র দোলোৎসব ও গৌর পূর্ণিমা।',
    icon: '🎨',
    category: 'major',
    pujaId: null
  },
  {
    id: 104,
    nameBn: 'পয়লা বৈশাখ (নববর্ষ ১৪৩৩)',
    nameEn: 'Poila Boishakh (Bengali New Year)',
    eventDate: '2026-04-15',
    tithiBn: '১ই বৈশাখ, ১৪৩৩',
    description: 'বাংলা নববর্ষের শুভারম্ভ। হালখাতা ও গণেশ পূজা।',
    icon: '🪔',
    category: 'major',
    pujaId: 1
  },
  {
    id: 105,
    nameBn: 'অক্ষয় তৃতীয়া',
    nameEn: 'Akshaya Tritiya',
    eventDate: '2026-05-09',
    tithiBn: 'বৈশাখ শুক্লা তৃতীয়া',
    description: 'অক্ষয় পুণ্য অর্জনের দিন। স্বর্ণ ক্রয় ও লক্ষ্মী-নারায়ণ পূজা।',
    icon: '🪙',
    category: 'traditional',
    pujaId: null
  },
  {
    id: 106,
    nameBn: 'শ্রী শ্রী জগন্নাথদেবের স্নানযাত্রা',
    nameEn: 'Snan Yatra',
    eventDate: '2026-06-25',
    tithiBn: 'জ্যৈষ্ঠ পূর্ণিমা',
    description: 'মহাপ্রভু জগন্নাথদেবের মহাপবিত্র স্নানোৎসব।',
    icon: '🌊',
    category: 'traditional',
    pujaId: null
  },
  {
    id: 107,
    nameBn: 'শ্রী শ্রী জগন্নাথদেবের রথযাত্রা',
    nameEn: 'Rath Yatra',
    eventDate: '2026-07-07',
    tithiBn: 'আষাঢ় শুক্লা দ্বিতীয়া',
    description: 'জগন্নাথ, বলভদ্র ও সুভদ্রার গুণ্ডিচা মন্দিরে রথযাত্রা।',
    icon: '🛕',
    category: 'major',
    pujaId: null
  },
  {
    id: 108,
    nameBn: 'ঝুলনযাত্রা সমাপন',
    nameEn: 'Jhulan Yatra',
    eventDate: '2026-08-16',
    tithiBn: 'শ্রাবণ পূর্ণিমা',
    description: 'শ্রী শ্রী রাধাকৃষ্ণের পবিত্র ঝুলনোৎসব। রাখীবন্ধন।',
    icon: '🌺',
    category: 'traditional',
    pujaId: null
  },
  {
    id: 109,
    nameBn: 'শ্রীকৃষ্ণের শুভ জন্মাষ্টমী',
    nameEn: 'Janmashtami (Krishna Jayanti)',
    eventDate: '2026-09-04',
    tithiBn: 'ভাদ্র কৃষ্ণা অষ্টমী',
    description: 'ভগবান শ্রীকৃষ্ণের পরম শুভ আবির্ভাব তিথি ও নিশীথ ব্রত।',
    icon: '🦚',
    category: 'major',
    pujaId: null
  },
  {
    id: 110,
    nameBn: 'বিশ্বকর্মা পূজা',
    nameEn: 'Vishwakarma Puja',
    eventDate: '2026-09-17',
    tithiBn: 'কন্যা সংক্রান্তি',
    description: 'দেবশিল্পী বিশ্বকর্মার পূজা ও কল-কারখানার আরাধনা।',
    icon: '🔧',
    category: 'traditional',
    pujaId: null
  },
  {
    id: 111,
    nameBn: 'মহালয়া (তর্পণ ও দেবীপক্ষ)',
    nameEn: 'Mahalaya (Tarpan)',
    eventDate: '2026-10-10',
    tithiBn: 'আশ্বিন অমাবস্যা',
    description: 'পিতৃপক্ষের সমাপ্তি ও দেবীপক্ষের শুভ আগমনী।',
    icon: '🌑',
    category: 'major',
    pujaId: null
  },
  {
    id: 112,
    nameBn: 'দুর্গাপূজা (মহাষষ্ঠী)',
    nameEn: 'Durga Puja - Maha Shashthi',
    eventDate: '2026-10-16',
    tithiBn: 'আশ্বিন শুক্লা ষষ্ঠী',
    description: 'দেবীর কল্পারম্ভ, বোধন ও অধিবাস।',
    icon: '🌸',
    category: 'major',
    pujaId: null
  },
  {
    id: 113,
    nameBn: 'দুর্গাপূজা (মহাসপ্তমী)',
    nameEn: 'Durga Puja - Maha Saptami',
    eventDate: '2026-10-17',
    tithiBn: 'আশ্বিন শুক্লা সপ্তমী',
    description: 'নবপত্রিকা (কলাবৌ) প্রবেশ ও সপ্তমী বিহিত পূজা।',
    icon: '🌼',
    category: 'major',
    pujaId: null
  },
  {
    id: 114,
    nameBn: 'দুর্গাপূজা (মহাঅষ্টমী ও সন্ধিপূজা)',
    nameEn: 'Durga Puja - Maha Ashtami & Sandhi Puja',
    eventDate: '2026-10-18',
    tithiBn: 'আশ্বিন শুক্লা অষ্টমী',
    description: 'কুমারী পূজা এবং ১০৮ পদ্মসহ পবিত্র সন্ধিপূজা।',
    icon: '🪔',
    category: 'major',
    pujaId: null
  },
  {
    id: 115,
    nameBn: 'দুর্গাপূজা (মহানবমী)',
    nameEn: 'Durga Puja - Maha Navami',
    eventDate: '2026-10-19',
    tithiBn: 'আশ্বিন শুক্লা নবমী',
    description: 'মহানবমী বিহিত পূজা, হোম-যজ্ঞ এবং আরতি।',
    icon: '🔥',
    category: 'major',
    pujaId: null
  },
  {
    id: 116,
    nameBn: 'বিজয়া দশমী (দর্পণ বিসর্জন ও সিঁদুর খেলা)',
    nameEn: 'Vijaya Dashami (Dussehra)',
    eventDate: '2026-10-20',
    tithiBn: 'আশ্বিন শুক্লা দশমী',
    description: 'দেবীর দর্পণ বিসর্জন, সিঁদুর খেলা ও শুভ বিজয়ার প্রণাম।',
    icon: '🩰',
    category: 'major',
    pujaId: null
  },
  {
    id: 117,
    nameBn: 'কোজাগরী লক্ষ্মীপূজা',
    nameEn: 'Kojagari Lakshmi Puja',
    eventDate: '2026-10-25',
    tithiBn: 'আশ্বিন পূর্ণিমা',
    description: 'ধন-ধান্যের দেবী মা লক্ষ্মীর পূজা ও পাঁচালী পাঠ।',
    icon: '🌾',
    category: 'major',
    pujaId: 2
  },
  {
    id: 118,
    nameBn: 'শ্রী শ্রী শ্যামাপূজা ও দীপাবলি (Kali Puja)',
    nameEn: 'Kali Puja & Diwali',
    eventDate: '2026-11-08',
    tithiBn: 'কার্তিক অমাবস্যা',
    description: 'মা কালীর নিশীথ আরাধনা, মঙ্গল প্রদীপ ও শুভ দীপাবলি উৎসব।',
    icon: '🪔',
    category: 'major',
    pujaId: null
  },
  {
    id: 119,
    nameBn: 'ভ্রাতৃদ্বিতীয়া (ভাইফোঁটা)',
    nameEn: 'Bhai Phonta (Bhatri Dwitiya)',
    eventDate: '2026-11-10',
    tithiBn: 'কার্তিক শুক্লা দ্বিতীয়া',
    description: 'ভাইয়ের দীর্ঘায়ু কামনায় বোনেদের পবিত্র ফোঁটা ও প্রার্থনা।',
    icon: '💝',
    category: 'traditional',
    pujaId: null
  },
  {
    id: 120,
    nameBn: 'শ্রী শ্রী জগদ্ধাত্রী পূজা',
    nameEn: 'Jagaddhatri Puja',
    eventDate: '2026-11-17',
    tithiBn: 'কার্তিক শুক্লা নবমী',
    description: 'জগদ্ধারিণী দেবী জগদ্ধাত্রীর মহাপূজা।',
    icon: '👑',
    category: 'major',
    pujaId: null
  },
  {
    id: 121,
    nameBn: 'শ্রী শ্রী রাসযাত্রা (রাস পূর্ণিমা)',
    nameEn: 'Rash Yatra',
    eventDate: '2026-11-23',
    tithiBn: 'কার্তিক পূর্ণিমা',
    description: 'শ্রী রাধাকৃষ্ণের মহারাসোৎসব ও পুণ্য রাস পূর্ণিমা স্নান।',
    icon: '🌕',
    category: 'major',
    pujaId: null
  }
];

/**
 * Calculates all active festival alerts for today and the upcoming 7-day window.
 * @param {Date|string} [currentDate] - Reference date (defaults to today)
 * @param {string} [lang] - 'bn' or 'en'
 * @returns {Array} List of active notification alert objects
 */
export function getActiveFestivalNotifications(currentDate = new Date(), lang = 'bn') {
  const dateObj = typeof currentDate === 'string' ? new Date(currentDate) : currentDate;
  const todayStr = format(dateObj, 'yyyy-MM-dd');

  const alerts = [];

  for (const fest of MASTER_FESTIVALS) {
    const festDate = new Date(fest.eventDate + 'T00:00:00');
    const todayDate = new Date(todayStr + 'T00:00:00');
    
    // Difference in days
    const diffTime = festDate.getTime() - todayDate.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      // TODAY
      alerts.push({
        id: `fest-${fest.id}-${fest.eventDate}-today`,
        festivalId: fest.id,
        isToday: true,
        daysLeft: 0,
        eventDate: fest.eventDate,
        icon: fest.icon || '🪔',
        title: lang === 'bn' ? `🙏 আজ ${fest.nameBn}!` : `🙏 Today is ${fest.nameEn}!`,
        body: lang === 'bn' 
          ? `${fest.tithiBn} — ${fest.description}` 
          : `${fest.tithiBn} — ${fest.description}`,
        badge: lang === 'bn' ? 'আজ অনুষ্ঠিত হচ্ছে' : 'Happening Today',
        badgeColor: 'bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold animate-pulse',
        type: 'FESTIVAL_TODAY',
        category: fest.category,
        pujaId: fest.pujaId,
        actionUrl: fest.pujaId ? `/puja/${fest.pujaId}` : '/panchang',
        actionLabel: lang === 'bn' ? 'পূজা পদ্ধতি ও নির্ঘণ্ট' : 'Puja Vidhi & Timings'
      });
    } else if (diffDays === 1) {
      // TOMORROW
      alerts.push({
        id: `fest-${fest.id}-${fest.eventDate}-tomorrow`,
        festivalId: fest.id,
        isToday: false,
        daysLeft: 1,
        eventDate: fest.eventDate,
        icon: fest.icon || '🌸',
        title: lang === 'bn' ? `🌸 আগামীকাল ${fest.nameBn}!` : `🌸 Tomorrow is ${fest.nameEn}!`,
        body: lang === 'bn' 
          ? `তিথি: ${fest.tithiBn}। পূজার প্রস্তুতি ও সামগ্রী প্রস্তুত রাখুন।` 
          : `Tithi: ${fest.tithiBn}. Check tomorrow's timings and preparations.`,
        badge: lang === 'bn' ? 'আগামীকাল' : 'Tomorrow',
        badgeColor: 'bg-orange-100 text-orange-800 font-semibold',
        type: 'FESTIVAL_TOMORROW',
        category: fest.category,
        pujaId: fest.pujaId,
        actionUrl: fest.pujaId ? `/puja/${fest.pujaId}` : '/panchang',
        actionLabel: lang === 'bn' ? 'সময়সূচি দেখুন' : 'View Timings'
      });
    } else if (diffDays >= 2 && diffDays <= 7) {
      // IN THIS WEEK (2 to 7 days before)
      alerts.push({
        id: `fest-${fest.id}-${fest.eventDate}-in-${diffDays}d`,
        festivalId: fest.id,
        isToday: false,
        daysLeft: diffDays,
        eventDate: fest.eventDate,
        icon: fest.icon || '⏰',
        title: lang === 'bn' 
          ? `⏰ আসন্ন ${fest.nameBn} — আর ${diffDays} দিন বাকি` 
          : `⏰ Upcoming: ${fest.nameEn} — In ${diffDays} days`,
        body: lang === 'bn' 
          ? `তিথি: ${fest.tithiBn} (${fest.eventDate})। বিস্তারিত পঞ্চাঙ্গে জেনে নিন।` 
          : `Tithi: ${fest.tithiBn} (${fest.eventDate}). Check auspicious muhurat in Panchang.`,
        badge: lang === 'bn' ? `আর ${diffDays} দিন` : `In ${diffDays} days`,
        badgeColor: 'bg-amber-100 text-amber-800 font-medium',
        type: 'FESTIVAL_UPCOMING',
        category: fest.category,
        pujaId: fest.pujaId,
        actionUrl: fest.pujaId ? `/puja/${fest.pujaId}` : '/panchang',
        actionLabel: lang === 'bn' ? 'বিবরণ দেখুন' : 'View Details'
      });
    }
  }

  // Sort: Today first, then ascending by days left
  alerts.sort((a, b) => a.daysLeft - b.daysLeft);
  return alerts;
}

/**
 * Native Browser Push Notification handler.
 * Triggers a desktop/mobile OS alert if permission is granted and hasn't been sent today.
 */
export function sendBrowserFestivalAlert(alert) {
  if (typeof window === 'undefined' || !('Notification' in window)) return;
  if (Notification.permission !== 'granted') return;

  const todayStr = format(new Date(), 'yyyy-MM-dd');
  const storageKey = `purohit_notif_sent_${alert.id}_${todayStr}`;

  if (localStorage.getItem(storageKey)) {
    return; // Already notified today
  }

  try {
    const n = new Notification(alert.title, {
      body: alert.body,
      icon: '/favicon.svg',
      tag: alert.id,
      requireInteraction: alert.isToday
    });

    n.onclick = () => {
      window.focus();
      if (alert.actionUrl) {
        window.location.href = alert.actionUrl;
      }
    };

    localStorage.setItem(storageKey, 'true');
  } catch (err) {
    console.warn('Native notification error:', err);
  }
}

/**
 * Request Browser Notification permission.
 */
export async function requestBrowserNotificationPermission() {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'unsupported';
  }
  try {
    const res = await Notification.requestPermission();
    return res;
  } catch (e) {
    return 'denied';
  }
}
