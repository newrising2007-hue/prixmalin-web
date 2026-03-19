'use client';

import React from 'react';

interface AdblockBannerProps {
  message: string;
}

// Mots clés à mettre en dégradé bleu→vert selon la langue
const GRADIENT_KEYWORDS = [
  // FR
  "partenaires affiliés", "ne coûte rien", "nous aide énormément",
  // EN
  "affiliate partners", "costs nothing", "helps us enormously",
  // ES
  "socios afiliados", "no cuesta nada", "nos ayuda enormemente",
  // AR
  "شركائنا التابعين", "لا يكلف شيئاً", "يساعدنا كثيراً",
  // ZH
  "联盟合作伙伴", "不花任何费用", "对我们帮助极大",
];

function highlightMessage(message: string) {
  let parts: (string | React.ReactElement)[] = [message];

  GRADIENT_KEYWORDS.forEach((keyword, idx) => {
    parts = parts.flatMap((part) => {
      if (typeof part !== 'string') return [part];
      const segments = part.split(keyword);
      return segments.flatMap((seg, i) =>
        i < segments.length - 1
          ? [
              seg,
              <span
                key={`${idx}-${i}`}
                className="font-semibold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent"
              >
                {keyword}
              </span>,
            ]
          : [seg]
      );
    });
  });

  return parts;
}

const AdblockBanner: React.FC<AdblockBannerProps> = ({ message }) => {
  return (
    <p className="mt-2 text-sm text-gray-500 italic">
      {highlightMessage(message)}
    </p>
  );
};

export default AdblockBanner;
