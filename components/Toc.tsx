import type { TocItem } from '@/types/blog';

interface TocProps {
  items: TocItem[];
}

export function Toc({ items }: TocProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav className="text-sm">
      <h4 className="font-semibold text-[var(--fg)] mb-3">On this page</h4>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item.id}
            style={{ paddingLeft: item.level === 2 ? '0.5rem' : item.level === 3 ? '1rem' : '0' }}
          >
            <a
              href={`#${item.id}`}
              className={`text-[var(--muted)] hover:text-[var(--link)] transition-colors block ${item.level === 1 ? 'font-medium' : ''}`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
