'use client';

import type { RepoSummary } from '@/types/blog';
import { RepoCard } from './RepoCard';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { refreshUserPage } from '@/app/actions';

interface RepoListProps {
  repos: RepoSummary[];
  user: string;
}

export function RepoList({ repos, user }: RepoListProps) {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshUserPage(user);
    router.refresh();
    setIsRefreshing(false);
  };

  if (repos.length === 0) {
    return (
      <div className="py-4 max-w-xl mx-auto">
        <div className="text-center mb-6">
          <div className="text-4xl mb-3">📝</div>
          <h2 className="text-xl font-semibold text-[var(--fg)] mb-2">No blogs found yet</h2>
          <p className="text-[var(--muted)]">
            No repos with a <code className="bg-[var(--code-bg)] px-1.5 py-0.5 rounded">/blog</code> folder found.
          </p>
        </div>
        
        <div className="bg-[var(--code-bg)] rounded-lg p-6 text-left">
          <h3 className="text-sm font-semibold text-[var(--fg)] mb-4 uppercase tracking-wide">
            Quick Start Guide
          </h3>
          
          <ol className="space-y-4 text-sm">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--accent)] text-[var(--bg)] flex items-center justify-center text-xs font-bold">1</span>
              <div>
                <p className="text-[var(--fg)] font-medium">Create a <code className="bg-[var(--bg)] px-1.5 py-0.5 rounded text-[var(--accent)]">/blog</code> folder</p>
                <p className="text-[var(--muted)] mt-1">In any public GitHub repository</p>
              </div>
            </li>
            
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--accent)] text-[var(--bg)] flex items-center justify-center text-xs font-bold">2</span>
              <div>
                <p className="text-[var(--fg)] font-medium">Add Markdown files</p>
                <p className="text-[var(--muted)] mt-1">Write posts as <code className="bg-[var(--bg)] px-1.5 py-0.5 rounded">.md</code> files with frontmatter</p>
              </div>
            </li>
            
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--accent)] text-[var(--bg)] flex items-center justify-center text-xs font-bold">3</span>
              <div>
                <p className="text-[var(--fg)] font-medium">Done! Your blog is live</p>
                <p className="text-[var(--muted)] mt-1">
                  Access it at <code className="bg-[var(--bg)] px-1.5 py-0.5 rounded">plok.sh/{user}/repo-name</code>
                </p>
              </div>
            </li>
          </ol>
          
          <div className="mt-6 pt-4 border-t border-[var(--border)]">
            <p className="text-xs text-[var(--muted)]">
              Optional: Add <code className="bg-[var(--bg)] px-1 rounded">blog.config.yaml</code> in your <code className="bg-[var(--bg)] px-1 rounded">/blog</code> folder to customize theme, font, and more.
            </p>
          </div>
        </div>
        
        <div className="text-center mt-6 space-y-3">
          <a 
            href="/themes" 
            className="text-sm text-[var(--accent)] hover:underline"
          >
            Browse themes →
          </a>
          <div>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="text-xs text-[var(--muted)] hover:text-[var(--fg)] transition-colors disabled:opacity-50"
            >
              {isRefreshing ? 'Refreshing...' : 'Just added a blog? Refresh ↻'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        {repos.map((repo) => (
          <RepoCard key={repo.name} repo={repo} user={user} />
        ))}
      </div>
      <div className="text-center">
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="text-xs text-[var(--muted)] hover:text-[var(--fg)] transition-colors disabled:opacity-50"
        >
          {isRefreshing ? 'Refreshing...' : 'Refresh ↻'}
        </button>
      </div>
    </div>
  );
}
