import '@/components/ui/global.css';
import { inter } from '../components/ui/fonts';
import { NextUIProvider } from '@nextui-org/react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}

export const dynamic = 'force-dynamic';
