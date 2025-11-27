import Link from 'next/link';
import { Shell } from '@/components/Shell';

export default function NotFound() {
  return (
    <Shell>
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h1 className="text-6xl font-bold text-[var(--fg)] mb-4">404</h1>
        <p className="text-xl text-[var(--muted)] mb-8">
          Page not found
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-2 bg-[var(--accent)] text-[var(--bg)] rounded font-medium hover:opacity-90 transition-opacity"
        >
          Go home
        </Link>
      </div>
    </Shell>
  );
}
