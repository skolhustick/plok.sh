import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface ShellProps {
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

export function Shell({ children, breadcrumbs }: ShellProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-[var(--border)] bg-[var(--bg)]">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link
            href="/"
            className="font-bold text-lg text-[var(--fg)] hover:text-[var(--accent)] transition-colors"
          >
            RepoBlog
          </Link>

          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="flex items-center gap-2 text-sm text-[var(--muted)]">
              {breadcrumbs.map((crumb, index) => (
                <span key={index} className="flex items-center gap-2">
                  <span>/</span>
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="hover:text-[var(--link)] transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-[var(--fg)]">{crumb.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-[var(--border)] bg-[var(--bg)]">
        <div className="max-w-4xl mx-auto px-4 py-4 text-sm text-[var(--muted)]">
          Powered by{' '}
          <a
            href="https://github.com"
            className="text-[var(--link)] hover:text-[var(--link-hover)]"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
