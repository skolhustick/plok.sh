import Link from 'next/link';
import type { PostSummary } from '@/types/blog';

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
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">📭</div>
        <p className="text-[var(--muted)]">No posts yet</p>
        <p className="text-sm text-[var(--muted)] mt-2">
          Add <code className="bg-[var(--code-bg)] px-1.5 py-0.5 rounded">.md</code> files to the <code className="bg-[var(--code-bg)] px-1.5 py-0.5 rounded">/blog</code> folder
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {posts.map((post, index) => (
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
  );
}
