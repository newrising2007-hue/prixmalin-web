"use client";

import { useState } from "react";

type Props = {
  code: string;
};

export default function CopyCodeButton({ code }: Props) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setStatus("copied");
      window.setTimeout(() => setStatus("idle"), 1200);
    } catch {
      setStatus("error");
      window.setTimeout(() => setStatus("idle"), 1600);
    }
  }

  const label =
    status === "copied" ? "Copié ✅" : status === "error" ? "Erreur" : "Copier";

  return (
    <button
      type="button"
      onClick={onCopy}
      className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100"
      aria-label="Copier le code"
    >
      {label}
    </button>
  );
}
