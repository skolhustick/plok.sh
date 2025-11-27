import Link from 'next/link';
import type { RepoSummary } from '@/types/blog';

interface RepoCardProps {
  repo: RepoSummary;
  user: string;
}

export function RepoCard({ repo, user }: RepoCardProps) {
  const title = repo.blogTitle || repo.name;
  const description = repo.blogDescription || repo.description;

  return (
    <Link
      href={`/${user}/${repo.name}`}
      className="block p-4 rounded-lg border border-[var(--border)] hover:border-[var(--accent)] bg-[var(--bg)] transition-colors"
    >
      <h3 className="font-semibold text-[var(--fg)]">{title}</h3>
      {description && (
        <p className="mt-1 text-sm text-[var(--muted)] line-clamp-2">
          {description}
        </p>
      )}
      {repo.blogTitle && (
        <p className="mt-2 text-xs text-[var(--muted)]">{repo.name}</p>
      )}
    </Link>
  );
}
