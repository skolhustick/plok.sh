import Link from 'next/link';
import type { PostSummary } from '@/types/blog';

interface PostListProps {
  posts: PostSummary[];
  user: string;
  repo: string;
}

export function PostList({ posts, user, repo }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12 text-[var(--muted)]">
        <p>No posts found in this blog.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`/${user}/${repo}/${post.slug}`}
          className="block p-4 rounded-lg border border-[var(--border)] hover:border-[var(--accent)] bg-[var(--bg)] transition-colors"
        >
          <h3 className="font-medium text-[var(--fg)]">{post.title}</h3>
        </Link>
      ))}
    </div>
  );
}
