'use client';

import { Shell } from '@/components/Shell';
import { useEffect, useState } from 'react';

const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

export default function UserError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % frames.length);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <Shell theme="rose-pine" font="geist-mono">
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <div className="font-mono text-4xl text-[var(--accent)] mb-6">
          {frames[frame]} error {frames[frame]}
        </div>
        <p className="text-xl text-[var(--muted)] mb-2">
          Something went wrong
        </p>
        <p className="text-sm text-[var(--muted)] mb-8 font-mono">
          {error.message || 'Failed to load'}
        </p>
        <button
          onClick={reset}
          className="px-6 py-2 bg-[var(--accent)] text-[var(--bg)] rounded font-medium hover:opacity-90 transition-opacity"
        >
          Try again
        </button>
      </div>
    </Shell>
  );
}
