'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { PostSummary } from '@/types/blog';
import { refreshRepoPage } from '@/app/actions';

interface PostListProps {
  posts: PostSummary[];
  user: string;
  repo: string;
}

function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

export function PostList({ posts, user, repo }: PostListProps) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshRepoPage(user, repo);
    router.refresh();
    setIsRefreshing(false);
  };

  const filteredPosts = posts.filter((post) => {
    const searchLower = search.toLowerCase();
    return (
      post.title.toLowerCase().includes(searchLower) ||
      post.slug.toLowerCase().includes(searchLower) ||
      (post.description?.toLowerCase().includes(searchLower) ?? false)
    );
  });

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">📭</div>
        <p className="text-[var(--muted)]">No posts yet</p>
        <p className="text-sm text-[var(--muted)] mt-2">
          Add <code className="bg-[var(--code-bg)] px-1.5 py-0.5 rounded">.md</code> files to the <code className="bg-[var(--code-bg)] px-1.5 py-0.5 rounded">/blog</code> folder
        </p>
        <div className="mt-4 space-y-1">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="text-xs text-[var(--muted)] hover:text-[var(--fg)] transition-colors disabled:opacity-50"
          >
            {isRefreshing ? 'Refreshing...' : 'Just added posts? Refresh ↻'}
          </button>
          <p className="text-[10px] text-[var(--muted)] opacity-60">GitHub may take a few mins to update</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search & Refresh */}
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <svg 
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search posts..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-[var(--code-bg)] border border-[var(--border)] rounded-lg text-[var(--fg)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
          />
        </div>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex-shrink-0 p-2 text-[var(--muted)] hover:text-[var(--fg)] transition-colors disabled:opacity-50"
          title="Refresh"
        >
          <svg 
            className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      {/* Results */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-[var(--muted)]">No posts matching &quot;{search}&quot;</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredPosts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/${user}/${repo}/${post.slug}`}
              className="group flex items-center gap-4 p-4 rounded-lg border border-[var(--border)] hover:border-[var(--accent)] bg-[var(--code-bg)] hover:bg-[var(--bg)] transition-all"
            >
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center text-sm text-[var(--muted)] group-hover:border-[var(--accent)] group-hover:text-[var(--accent)] transition-colors">
                {index + 1}
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors truncate">
                  {post.title}
                </h3>
                {(post.date || post.description) && (
                  <p className="mt-0.5 text-sm text-[var(--muted)] truncate">
                    {post.date && <span>{formatDate(post.date)}</span>}
                    {post.date && post.description && <span className="mx-2">·</span>}
                    {post.description && <span>{post.description}</span>}
                  </p>
                )}
              </div>
              <span className="flex-shrink-0 text-lg text-[var(--muted)] group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-all">
                →
              </span>
            </Link>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="text-center pt-2">
        <p className="text-[10px] text-[var(--muted)] opacity-60">
          {posts.length} post{posts.length !== 1 ? 's' : ''}
          {search && filteredPosts.length !== posts.length && ` · ${filteredPosts.length} shown`}
        </p>
      </div>
    </div>
  );
}
