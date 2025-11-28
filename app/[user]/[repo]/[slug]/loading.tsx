import { Shell } from '@/components/Shell';

export default function PostLoading() {
  return (
    <Shell>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="animate-pulse">
          <div className="h-10 w-3/4 bg-[var(--border)] rounded mb-8" />
          <div className="space-y-4">
            <div className="h-4 w-full bg-[var(--border)] rounded" />
            <div className="h-4 w-full bg-[var(--border)] rounded" />
            <div className="h-4 w-2/3 bg-[var(--border)] rounded" />
            <div className="h-32 w-full bg-[var(--border)] rounded mt-6" />
            <div className="h-4 w-full bg-[var(--border)] rounded" />
            <div className="h-4 w-5/6 bg-[var(--border)] rounded" />
          </div>
        </div>
      </div>
    </Shell>
  );
}
