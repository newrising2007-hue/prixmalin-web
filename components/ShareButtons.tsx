'use client';

import React, { useState, useEffect } from 'react';
import { Share2 } from 'lucide-react';

type Locale = 'fr' | 'en' | 'es' | 'ar' | 'zh';

const SHARE_TEXT: Record<Locale, { share: string }> = {
  fr: { share: 'Partager' },
  en: { share: 'Share'    },
  es: { share: 'Compartir'},
  ar: { share: 'مشاركة'   },
  zh: { share: '分享'      },
};

const FB_APP_ID = '1262329375999819';

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

  const messengerUrl = `https://www.facebook.com/dialog/send?link=${encodeURIComponent(currentUrl)}&app_id=${FB_APP_ID}&redirect_uri=${encodeURIComponent(currentUrl)}`;
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
          <svg viewBox="0 0 32 32" width="22" height="22" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2C8.268 2 2 8.268 2 16c0 2.478.675 4.797 1.85 6.78L2 30l7.42-1.82A13.94 13.94 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.44 11.44 0 0 1-5.8-1.578l-.416-.247-4.328 1.063 1.094-4.21-.27-.432A11.5 11.5 0 1 1 16 27.5zm6.29-8.61c-.344-.172-2.036-1.004-2.352-1.118-.316-.115-.546-.172-.776.172-.23.344-.89 1.118-1.09 1.348-.2.23-.4.258-.744.086-.344-.172-1.452-.535-2.766-1.707-1.022-.912-1.712-2.037-1.912-2.381-.2-.344-.021-.53.15-.701.155-.154.344-.4.516-.602.172-.2.23-.344.344-.574.115-.23.058-.43-.029-.602-.086-.172-.776-1.87-1.063-2.562-.28-.672-.564-.58-.776-.59l-.66-.012c-.23 0-.602.086-.917.43-.316.344-1.204 1.176-1.204 2.867s1.233 3.326 1.405 3.556c.172.23 2.427 3.706 5.88 5.197.822.355 1.463.567 1.963.726.824.263 1.574.226 2.167.137.661-.099 2.036-.832 2.323-1.635.287-.803.287-1.491.2-1.635-.085-.143-.315-.23-.659-.4z"/>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default ShareButtons;
