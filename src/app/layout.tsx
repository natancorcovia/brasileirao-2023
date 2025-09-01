import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Footer from './_components/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Estatísticas Brasileirão Série A',
  description: 'Acompanhe elencos completos e estatísticas da Série A do Campeonato Brasileiro.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}
      >
        <main className="flex-grow">{children}</main>

        <footer className="w-full bg-gray-900 shadow-inner">
          <Footer />
        </footer>
      </body>
    </html>
  );
}
