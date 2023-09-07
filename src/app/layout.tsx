import './globals.css';
import '../../styles/font.css';
import '../../styles/typography.css';

import { Suspense } from 'react';

import { Analytics } from '@/components/Analytics';
import { OverlayProvider } from '@/components/Overlay/OverlayProvider';
import { BASE_SITE_URL, GA_ID } from '@/constants';
import QueryProvider from '@/provider/QueryProvider';
import RecoilContextProvider from '@/provider/RecoilContextProvider';

import type { Metadata } from 'next';

const DEFAULT_OG_TITLE = 'PosePicker';
const DEFAULT_OG_DESC = '포토부스에서 고민하는 당신을 위한 포즈 추천';
const DEFAULT_OG_IMAGE = '/images/main_star.png';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_SITE_URL),
  title: {
    template: DEFAULT_OG_TITLE,
    default: DEFAULT_OG_TITLE,
  },
  description: DEFAULT_OG_DESC,
  openGraph: {
    title: DEFAULT_OG_TITLE,
    description: DEFAULT_OG_DESC,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    title: DEFAULT_OG_TITLE,
    description: DEFAULT_OG_DESC,
    images: [DEFAULT_OG_IMAGE],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  icons: {
    icon: '/pwa-icons/icon-48x48.png',
  },
  manifest: '/manifest.json',
  themeColor: '#ffffff',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="flex min-h-[100dvh] w-screen touch-none justify-center bg-slate-100 py-px">
        <div className="w-full max-w-440 overflow-hidden bg-white text-primary">
          <Suspense>
            <Analytics />
          </Suspense>
          <RecoilContextProvider>
            <QueryProvider>
              <OverlayProvider>{children}</OverlayProvider>
            </QueryProvider>
            <div id="portal" />
          </RecoilContextProvider>
        </div>
      </body>
    </html>
  );
}
