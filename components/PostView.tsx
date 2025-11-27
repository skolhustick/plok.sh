import type { TocItem, BlogConfig } from '@/types/blog';
import { Toc } from './Toc';

interface PostViewProps {
  html: string;
  toc: TocItem[];
  config: BlogConfig;
  title: string;
  date?: string;
  description?: string;
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

export function PostView({ html, toc, config, title, date, description }: PostViewProps) {
  return (
    <div className="flex gap-16">
      {/* Main content */}
      <article className="flex-1 min-w-0">
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
