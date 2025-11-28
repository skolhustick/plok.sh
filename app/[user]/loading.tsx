import { Shell } from '@/components/Shell';

export default function UserLoading() {
  return (
    <Shell noWrapper>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex justify-center mb-10">
          <div className="h-10 w-40 bg-[var(--border)] rounded-full animate-pulse" />
        </div>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-[var(--border)] rounded-lg" />
          ))}
        </div>
      </div>
    </Shell>
  );
}
