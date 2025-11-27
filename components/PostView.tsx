'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { TocItem, BlogConfig } from '@/types/blog';
import { Toc } from './Toc';

interface PostViewProps {
  html: string;
  toc: TocItem[];
  config: BlogConfig;
  title: string;
  date?: string;
  description?: string;
  user: string;
  repo: string;
  slug: string;
}

function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

export function PostView({ html, toc, config, title, date, description, user, repo, slug }: PostViewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex gap-16">
      {/* Main content */}
      <article className="flex-1 min-w-0">
        {/* Top navigation */}
        <div className="flex flex-wrap items-center gap-4 text-sm mb-6">
          <Link
            href={`/${user}/${repo}`}
            className="inline-flex items-center gap-1.5 text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
          >
            <span>←</span>
            <span>All posts</span>
          </Link>
          <span className="text-[var(--border)]">·</span>
          <a
            href={`https://github.com/${user}/${repo}/blob/main/blog/${slug}.md`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span>View source</span>
          </a>
          <span className="text-[var(--border)]">·</span>
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 text-[var(--muted)] hover:text-[var(--accent)] transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-green-500">Copied!</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>Share</span>
              </>
            )}
          </button>
        </div>

        <header className="mb-8 pb-8 border-b border-[var(--border)]">
          <h1 className="text-3xl font-bold text-[var(--fg)] mb-4">{title}</h1>
          {(date || description) && (
            <div className="space-y-2">
              {date && (
                <p className="text-sm text-[var(--muted)]">
                  {formatDate(date)}
                </p>
              )}
              {description && (
                <p className="text-lg text-[var(--muted)]">
                  {description}
                </p>
              )}
            </div>
          )}
        </header>

        <div
          className="prose prose-invert max-w-none
            prose-headings:text-[var(--fg)]
            prose-p:text-[var(--fg)]
            prose-a:text-[var(--link)] hover:prose-a:text-[var(--link-hover)]
            prose-strong:text-[var(--fg)]
            prose-code:text-[var(--code-fg)] prose-code:bg-[var(--code-bg)]
            prose-pre:bg-[var(--code-bg)]
            prose-blockquote:border-[var(--accent)] prose-blockquote:text-[var(--muted)]
            prose-li:text-[var(--fg)]
            prose-th:text-[var(--fg)]
            prose-td:text-[var(--fg)]"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {/* Footer navigation */}
        <footer className="mt-16 pt-8 border-t border-[var(--border)] space-y-6">
          {/* Action links */}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <Link
              href={`/${user}/${repo}`}
              className="inline-flex items-center gap-1.5 text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
            >
              <span>←</span>
              <span>All posts</span>
            </Link>
            <span className="text-[var(--border)]">·</span>
            <a
              href={`https://github.com/${user}/${repo}/blob/main/blog/${slug}.md`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>Edit on GitHub</span>
            </a>
            <span className="text-[var(--border)]">·</span>
            <button
              onClick={handleCopyLink}
              className="relative inline-flex items-center gap-1.5 text-[var(--muted)] hover:text-[var(--accent)] transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-green-500">Copied!</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>Copy link</span>
                </>
              )}
            </button>
          </div>
          
          {/* Branding */}
          <div className="flex items-center justify-between">
            <a 
              href="https://plok.sh" 
              className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
            >
              <span className="font-bold">plok.sh</span>
              <span className="hidden sm:inline">·</span>
              <span className="hidden sm:inline">GitHub to blog, instantly</span>
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
            >
              ↑ Back to top
            </a>
          </div>
        </footer>
      </article>

      {/* TOC sidebar */}
      {config.show_toc && toc.length > 0 && (
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-8">
            <Toc items={toc} />
          </div>
        </aside>
      )}
    </div>
  );
}
