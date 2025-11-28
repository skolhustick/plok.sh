'use client';

import Link from 'next/link';
import { Shell } from '@/components/Shell';
import { useEffect, useState } from 'react';

const frames = [
  '⠋',
  '⠙',
  '⠹',
  '⠸',
  '⠼',
  '⠴',
  '⠦',
  '⠧',
  '⠇',
  '⠏',
];

export default function NotFound() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % frames.length);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <Shell theme="rose-pine" font="geist-mono">
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="font-mono text-6xl text-[var(--accent)] mb-8">
          {frames[frame]} 404 {frames[frame]}
        </div>
        <p className="text-xl text-[var(--muted)] mb-2">
          Lost in the void
        </p>
        <p className="text-sm text-[var(--muted)] mb-8 font-mono">
          This page doesn&apos;t exist
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-2 bg-[var(--accent)] text-[var(--bg)] rounded font-medium hover:opacity-90 transition-opacity"
        >
          ← Back home
        </Link>
      </div>
    </Shell>
  );
}
