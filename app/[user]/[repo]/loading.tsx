import { Shell } from '@/components/Shell';

export default function RepoLoading() {
  return (
    <Shell noWrapper>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="animate-pulse">
          <div className="h-10 w-64 bg-[var(--border)] rounded mb-2" />
          <div className="h-5 w-80 bg-[var(--border)] rounded mb-8" />
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 bg-[var(--border)] rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}
