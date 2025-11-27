import { Shell } from '@/components/Shell';

export default function RepoLoading() {
  return (
    <Shell>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className="h-8 w-64 bg-[var(--border)] rounded mb-2" />
          <div className="h-4 w-48 bg-[var(--border)] rounded mb-8" />
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 bg-[var(--border)] rounded" />
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}
