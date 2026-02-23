"use client";

import React from "react";
import { isAmazonUrl, normalizeAmazonCaUrl } from "@/lib/amazon";

type AffiliateButtonProps = {
  url: string;
  label?: string;
  className?: string;
};

export default function AffiliateButton({
  url,
  label = "Voir sur Amazon",
  className = "",
}: AffiliateButtonProps) {
  const affiliateUrl = isAmazonUrl(url) ? normalizeAmazonCaUrl(url) : url;

  return (
    <a
      href={affiliateUrl}
      target="_blank"
      rel="nofollow sponsored noopener"
      className={[
        "inline-flex items-center justify-center",
        "w-full sm:w-auto",
        "px-5 py-3 rounded-xl",
        "bg-orange-500 hover:bg-orange-600",
        "text-white font-semibold",
        "transition-colors",
        className,
      ].join(" ")}
    >
      {label}
    </a>
  );
}
