import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale, getTranslations } from 'next-intl/server';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import GrainOverlay from '@/components/ui/GrainOverlay';
import CustomCursor from '@/components/ui/CustomCursor';
import ScrollProgress from '@/components/ui/ScrollProgress';
import SmoothScroll from '@/components/ui/SmoothScroll';
import StickyDownloadBar from '@/components/ui/StickyDownloadBar';
import JsonLd from '@/components/seo/JsonLd';
import '../globals.css';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin', 'latin-ext'],
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
  preload: true,
  adjustFontFallback: false,
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Meta');
  const locale = await getLocale();
  const baseUrl = 'https://medalhero.com';
  const url = locale === 'ja' ? baseUrl : `${baseUrl}/${locale}`;

  return {
    title: t('title'),
    description: t('description'),
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
      languages: {
        ja: baseUrl,
        en: `${baseUrl}/en`,
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url,
      siteName: 'Heroes',
      locale: locale === 'ja' ? 'ja_JP' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  };
}

export default async function LocaleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${notoSansJP.variable} antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <JsonLd />
        <NextIntlClientProvider messages={messages}>
          <SmoothScroll>
            <GrainOverlay />
            <CustomCursor />
            <ScrollProgress />
            <Navbar />
            {children}
            <Footer />
            <StickyDownloadBar />
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
