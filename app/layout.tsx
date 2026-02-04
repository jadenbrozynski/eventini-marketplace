import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Eventini',
  description: 'Find and book the best event providers for your next celebration',
  keywords: ['events', 'marketplace', 'providers', 'catering', 'entertainment', 'venues'],
  itunes: {
    appId: '6751104982',
    appArgument: 'eventini://',
  },
  appLinks: {
    ios: {
      url: 'eventini://',
      app_store_id: '6751104982',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
