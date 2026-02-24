// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { defaultMetadata } from "./metadata";
import LayoutChrome from "@/components/LayoutChrome";

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <meta
          name="fo-verify"
          content="36a551c1-2067-4e94-9215-fc4700154b06"
        />
      </head>
      <body className="min-h-screen bg-white text-gray-900">
        <LayoutChrome>{children}</LayoutChrome>
      </body>
    </html>
  );
}
