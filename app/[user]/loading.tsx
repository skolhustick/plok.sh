import { Shell } from '@/components/Shell';

export default function UserLoading() {
  return (
    <Shell>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-[var(--border)] rounded mb-8" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-[var(--border)] rounded" />
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}
