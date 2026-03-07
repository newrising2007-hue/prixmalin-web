import type { Metadata } from "next";
import "./globals.css";
import { defaultMetadata } from "./metadata";
import LayoutChrome from "@/components/LayoutChrome";
import {NextIntlClientProvider} from "next-intl";
import {getLocale, getMessages} from "next-intl/server";

export const metadata: Metadata = defaultMetadata;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <head>
        <meta name="fo-verify" content="36a551c1-2067-4e94-9215-fc4700154b06" />
      </head>
      <body className="min-h-screen text-gray-900">
        <NextIntlClientProvider messages={messages}>
          <main className="min-h-screen bg-white/70 backdrop-blur-sm">
            <LayoutChrome>{children}</LayoutChrome>
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
