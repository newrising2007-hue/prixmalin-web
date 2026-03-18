'use client';

import React, { useState, useEffect } from 'react';
import { Share2 } from 'lucide-react';

type Locale = 'fr' | 'en' | 'es' | 'ar' | 'zh';

const SHARE_TEXT: Record<Locale, { share: string; copy: string; copied: string }> = {
  fr: { share: 'Partager', copy: 'Copier le lien', copied: 'Lien copié !' },
  en: { share: 'Share',    copy: 'Copy link',      copied: 'Copied!'       },
  es: { share: 'Compartir',copy: 'Copiar enlace',  copied: '¡Copiado!'     },
  ar: { share: 'مشاركة',   copy: 'نسخ الرابط',    copied: 'تم النسخ'      },
  zh: { share: '分享',      copy: '复制链接',        copied: '已复制'         },
};

interface ShareButtonsProps {
  locale?: Locale;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ locale = 'fr' }) => {
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const [canNativeShare, setCanNativeShare] = useState(false);
  const t = SHARE_TEXT[locale] ?? SHARE_TEXT.fr;

  // Résoudre côté client seulement — évite l'erreur d'hydration
  useEffect(() => {
    setCurrentUrl(window.location.href);
    setCanNativeShare(!!navigator.share);
  }, []);

  const handleNativeShare = async () => {
    try {
      await navigator.share({ url: currentUrl });
    } catch {}
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;

  // Mobile : icône share native
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

  // Desktop : label + Facebook + Copier lien
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1.5 text-blue-400 select-none">
        <Share2 size={15} className="opacity-80" />
        <span className="text-[10px] font-bold uppercase tracking-widest">
          {t.share}
        </span>
      </div>
      <div className="flex gap-2">
        <a
          href={facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Facebook"
          className="relative w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-bold font-sans hover:scale-110 transition-all duration-300 shadow-md overflow-hidden"
        >
          f
          <span className="absolute w-0.5 h-0.5 bg-white rounded-full top-2 left-3 opacity-70 animate-pulse"></span>
          <span className="absolute w-0.5 h-0.5 bg-white rounded-full bottom-3 right-2 opacity-40"></span>
        </a>
        <button
          onClick={handleCopy}
          title={copied ? t.copied : t.copy}
          className="relative w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl hover:scale-110 transition-all duration-300 shadow-md overflow-hidden"
        >
          {copied ? '✓' : '⚡'}
          <span className="absolute w-0.5 h-0.5 bg-white rounded-full top-3 right-2 opacity-80 animate-pulse"></span>
          <span className="absolute w-0.5 h-0.5 bg-white rounded-full bottom-2 left-3 opacity-50"></span>
        </button>
      </div>
    </div>
  );
};

export default ShareButtons;
