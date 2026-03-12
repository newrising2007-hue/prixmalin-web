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
          content="cf540377-ec26-49a0-9315-27c9c7566454"
        />
        <meta 
          name="impact-site-verification" 
          content="3e6279f3-920d-49ba-8e05-92b7707aa1c3" 
        />
      </head>
      <body className="min-h-screen text-gray-900">
        <main className="min-h-screen bg-white/70 backdrop-blur-sm">
          <LayoutChrome>{children}</LayoutChrome>
        </main>
      </body>
    </html>
  );
}
