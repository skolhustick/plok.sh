import type { TocItem, BlogConfig } from '@/types/blog';
import { Toc } from './Toc';

interface PostViewProps {
  html: string;
  toc: TocItem[];
  config: BlogConfig;
  title: string;
}

export function PostView({ html, toc, config, title }: PostViewProps) {
  return (
    <div className="flex gap-8">
      {/* Main content */}
      <article className="flex-1 min-w-0">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--fg)]">{title}</h1>
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
