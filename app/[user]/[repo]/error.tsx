'use client';

import { Shell } from '@/components/Shell';

export default function RepoError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Shell>
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h1 className="text-2xl font-bold text-[var(--fg)] mb-4">
          Something went wrong
        </h1>
        <p className="text-[var(--muted)] mb-8">
          {error.message || 'Failed to load blog posts'}
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
