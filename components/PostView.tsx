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
  hasFrontmatter: boolean;
  user: string;
  repo: string;
  slug: string;
  headerHtml?: string;
  footerHtml?: string;
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

export function PostView({ html, toc, config, title, date, description, hasFrontmatter, user, repo, slug, headerHtml, footerHtml }: PostViewProps) {
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
        <div className="flex items-center justify-between text-sm mb-6">
          <Link
            href={`/${user}/${repo}`}
            className="inline-flex items-center gap-1.5 text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
          >
            <span>←</span>
            <span>All posts</span>
          </Link>
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

        {/* Only show header with title/date/description when frontmatter exists */}
        {hasFrontmatter && (
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
        )}

        {/* User header partial */}
        {headerHtml && (
          <section
            className="prose prose-invert max-w-none mb-8
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
            dangerouslySetInnerHTML={{ __html: headerHtml }}
          />
        )}

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

        {/* User footer partial */}
        {footerHtml && (
          <section
            className="prose prose-invert max-w-none mt-8
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
            dangerouslySetInnerHTML={{ __html: footerHtml }}
          />
        )}

        {/* Footer navigation */}
        <footer className="mt-16 pt-8 border-t border-[var(--border)] space-y-6">
          {/* Action links */}
          <div className="flex items-center justify-between text-sm">
            <Link
              href={`/${user}/${repo}`}
              className="inline-flex items-center gap-1.5 text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
            >
              <span>←</span>
              <span>All posts</span>
            </Link>
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
                  <span>Share</span>
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
