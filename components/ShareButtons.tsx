'use client';

import React, { useState, useEffect } from 'react';
import { Share2 } from 'lucide-react';
import Image from 'next/image';

type Locale = 'fr' | 'en' | 'es' | 'ar' | 'zh';

const SHARE_TEXT: Record<Locale, { share: string }> = {
  fr: { share: 'Partager' },
  en: { share: 'Share'    },
  es: { share: 'Compartir'},
  ar: { share: 'مشاركة'   },
  zh: { share: '分享'      },
};

interface ShareButtonsProps {
  locale?: Locale;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ locale = 'fr' }) => {
  const [currentUrl, setCurrentUrl] = useState('');
  const [canNativeShare, setCanNativeShare] = useState(false);
  const t = SHARE_TEXT[locale] ?? SHARE_TEXT.fr;

  useEffect(() => {
    setCurrentUrl(window.location.href);
    setCanNativeShare(!!navigator.share);
  }, []);

  const handleNativeShare = async () => {
    try {
      await navigator.share({ url: currentUrl });
    } catch {}
  };

  const messengerUrl = `https://m.me/share?link=${encodeURIComponent(currentUrl)}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(currentUrl)}`;

  // Mobile : share natif
  if (canNativeShare) {
    return (
      <button
        onClick={handleNativeShare}
        className="flex items-center gap-1 rounded-lg px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 transition-colors"
        aria-label={t.share}
      >
        <Share2 size={15} />
      </button>
    );
  }

  // Desktop : label + Messenger + WhatsApp
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1.5 text-blue-400 select-none">
        <Share2 size={15} className="opacity-80" />
        <span className="text-[10px] font-bold uppercase tracking-widest">
          {t.share}
        </span>
      </div>
      <div className="flex gap-2">
        {/* Messenger */}
        <a
          href={messengerUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Messenger"
          className="relative w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl hover:scale-110 transition-all duration-300 shadow-md overflow-hidden"
        >
          ⚡
          <span className="absolute w-0.5 h-0.5 bg-white rounded-full top-3 right-2 opacity-80 animate-pulse"></span>
          <span className="absolute w-0.5 h-0.5 bg-white rounded-full bottom-2 left-3 opacity-50"></span>
        </a>

        {/* WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="WhatsApp"
          className="relative w-10 h-10 rounded-full bg-green-500 flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-md overflow-hidden"
        >
          <Image src="/icons/whatsapp.png" alt="WhatsApp" width={24} height={24} />
        </a>
      </div>
    </div>
  );
};

export default ShareButtons;
