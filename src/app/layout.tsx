import './globals.css';

import type { Metadata, Viewport } from 'next';

import Header from '@/components/header/header';

export const metadata: Metadata = {
  title: 'Joselogs',
  description: '기록하기',
  openGraph: {
    title: 'Joselogs',
    description: '기록하기',
    images: [
      {
        url: 'https://blog.joselogs.com/images/title-image.png',
        width: 1200,
        height: 1200,
        alt: 'Joselogs',
      },
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
