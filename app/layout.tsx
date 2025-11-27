import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Geist_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'plok.sh - GitHub to Blog',
  description: 'Turn any GitHub repo into a fast, beautiful blog',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="github-dark" data-font="system">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
