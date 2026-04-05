"use client";
import { useEffect } from "react";

interface ClickTrackerProps {
  slug: string;
}

export default function ClickTracker({ slug }: ClickTrackerProps) {
  useEffect(() => {
    fetch(`https://prixmalin-backend.onrender.com/api/clicks/${slug}`, { method: "POST" }).catch(() => {});
  }, [slug]);
  return null;
}
