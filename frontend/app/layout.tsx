import React from 'react';
import './globals.css';
import './loader.css';
import { Inter } from 'next/font/google';
import QueryProvider from '../providers/QueryProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Movie Ticket App',
  description: 'A movie ticket booking application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
