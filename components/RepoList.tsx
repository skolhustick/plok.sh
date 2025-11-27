import type { RepoSummary } from '@/types/blog';
import { RepoCard } from './RepoCard';

interface RepoListProps {
  repos: RepoSummary[];
  user: string;
}

export function RepoList({ repos, user }: RepoListProps) {
  if (repos.length === 0) {
    return (
      <div className="text-center py-12 text-[var(--muted)]">
        <p>No repos with a <code className="bg-[var(--code-bg)] px-1 rounded">/blog</code> folder found.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {repos.map((repo) => (
        <RepoCard key={repo.name} repo={repo} user={user} />
      ))}
    </div>
  );
}
