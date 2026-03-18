'use client';

import React from 'react';
import { Share2 } from 'lucide-react';

interface ShareButtonsProps {
  url?: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ url }) => {
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    messenger: `https://facebook.com/dialog/send?link=${encodeURIComponent(shareUrl)}&app_id=YOUR_FB_APP_ID&redirect_uri=${encodeURIComponent(shareUrl)}`,
  };

  // TA TAILLE PARFAITE : w-10 h-10
  // TA COULEUR PARFAITE : Bleu vibrant (bg-blue-600 et bg-blue-500)
  const buttonBaseClass = "relative w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-md cursor-pointer group overflow-hidden";

  return (
    <div className="flex items-center gap-3">
      
      {/* TEXTE À GAUCHE : Bleu un peu plus doux (blue-400) pour l'équilibre expert */}
      <div className="flex items-center gap-1.5 text-blue-400 select-none">
        <Share2 size={15} className="opacity-80" />
        <span className="text-[10px] font-bold uppercase tracking-widest">
          Partager
        </span>
      </div>

      {/* BOUTONS ALIGNÉS */}
      <div className="flex gap-2">
        {/* FACEBOOK */}
        <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" 
           className={`${buttonBaseClass} bg-blue-600`}>
          <span className="text-xl font-bold font-sans">f</span>
          
          {/* Tes étoiles magiques */}
          <span className="absolute w-0.5 h-0.5 bg-white rounded-full top-2 left-3 opacity-70 animate-pulse"></span>
          <span className="absolute w-0.5 h-0.5 bg-white rounded-full bottom-3 right-2 opacity-40"></span>
        </a>

        {/* MESSENGER */}
        <a href={shareLinks.messenger} target="_blank" rel="noopener noreferrer" 
           className={`${buttonBaseClass} bg-blue-500`}>
          <span className="text-xl">⚡</span>
          
          {/* Tes étoiles magiques */}
          <span className="absolute w-0.5 h-0.5 bg-white rounded-full top-3 right-2 opacity-80 animate-pulse"></span>
          <span className="absolute w-0.5 h-0.5 bg-white rounded-full bottom-2 left-3 opacity-50"></span>
        </a>
      </div>

    </div>
  );
};

export default ShareButtons;