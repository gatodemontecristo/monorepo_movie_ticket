import React from 'react';
import '../styles/globals.css';
import '../styles/loader.css';
import '../styles/ticket.css';
// import '../styles/ticket2.css';
import { Inter } from 'next/font/google';
import QueryProvider from '../providers/QueryProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Movie Ticket App',
  description: 'A movie ticket booking application',
  icons: {
    icon: '/ticket_icon.png',
  },
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
