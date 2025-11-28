import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Geist_Mono, Manrope, Space_Grotesk, Outfit, Fira_Code } from 'next/font/google';
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

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
});

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
});

const firaCode = Fira_Code({
  variable: '--font-fira-code',
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
    <html lang="en" data-theme="rose-pine" data-font="geist-mono">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${geistMono.variable} ${manrope.variable} ${spaceGrotesk.variable} ${outfit.variable} ${firaCode.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
