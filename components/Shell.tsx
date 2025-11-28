import Link from 'next/link';
import { GoogleAnalytics } from './GoogleAnalytics';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface ShellProps {
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  theme?: string;
  font?: string;
  customerGaId?: string;
  /** If true, skip the outer theme wrapper (used when layout already provides it) */
  noWrapper?: boolean;
}

export function Shell({ children, breadcrumbs, theme, font, customerGaId, noWrapper }: ShellProps) {
  const content = (
    <>
      <GoogleAnalytics customerGaId={customerGaId} />
      <header className="border-b border-[var(--border)] bg-[var(--bg)]">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link
            href="/"
            className="font-bold text-lg text-[var(--fg)] hover:text-[var(--accent)] transition-colors"
          >
            plok.sh
          </Link>

          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="flex items-center gap-2 text-sm text-[var(--muted)] min-w-0 overflow-hidden">
              {breadcrumbs.map((crumb, index) => (
                <span key={index} className="flex items-center gap-2 min-w-0">
                  <span className="flex-shrink-0">/</span>
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="hover:text-[var(--link)] transition-colors truncate max-w-[120px] sm:max-w-[180px]"
                      title={crumb.label}
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-[var(--fg)] truncate max-w-[120px] sm:max-w-[180px]" title={crumb.label}>
                      {crumb.label}
                    </span>
                  )}
                </span>
              ))}
            </nav>
          )}
        </div>
      </header>

      <main className="flex-1">{children}</main>
    </>
  );

  if (noWrapper) {
    return <div className="min-h-screen flex flex-col">{content}</div>;
  }

  return (
    <div 
      className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--fg)]"
      style={{ fontFamily: 'var(--font-body)' }}
      data-theme={theme}
      data-font={font}
    >
      {content}
    </div>
  );
}
