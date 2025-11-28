'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { refreshUserPage } from '@/app/actions';

interface UserNotFoundProps {
  user: string;
}

export function UserNotFound({ user }: UserNotFoundProps) {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshUserPage(user);
    router.refresh();
    setIsRefreshing(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-center">
      <div className="text-6xl mb-6">👻</div>
      <h1 className="text-2xl font-bold text-[var(--fg)] mb-3">
        User not found
      </h1>
      <p className="text-[var(--muted)] mb-2">
        We couldn&apos;t find a GitHub user called <code className="bg-[var(--code-bg)] px-2 py-0.5 rounded text-[var(--accent)]">@{user}</code>
      </p>
      <p className="text-sm text-[var(--muted)] mb-8">
        Check the spelling and try again
      </p>
      <div className="flex flex-col items-center gap-4">
        <a
          href="/"
          className="inline-block px-6 py-2 bg-[var(--accent)] text-[var(--bg)] rounded font-medium hover:opacity-90 transition-opacity"
        >
          ← Back home
        </a>
        <div className="space-y-1">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="text-sm text-[var(--muted)] hover:text-[var(--fg)] transition-colors disabled:opacity-50"
          >
            {isRefreshing ? 'Checking...' : 'Just created this account? Refresh ↻'}
          </button>
          <p className="text-[10px] text-[var(--muted)] opacity-60">GitHub may take a few mins to update</p>
        </div>
      </div>
    </div>
  );
}
