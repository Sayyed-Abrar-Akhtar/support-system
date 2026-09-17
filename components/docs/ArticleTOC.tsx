'use client';

import { TOCItem } from '@/types/documentation';
import { AlignLeft } from 'lucide-react';

interface ArticleTOCProps {
  toc: TOCItem[];
}

export function ArticleTOC({ toc }: ArticleTOCProps) {
  if (!toc || toc.length === 0) return null;

  return (
    <div className="hidden xl:block w-56 shrink-0 space-y-3 text-xs">
      <div className="flex items-center gap-2 font-semibold uppercase tracking-wider text-[var(--text-muted)]">
        <AlignLeft className="h-3.5 w-3.5" />
        <span>On this page</span>
      </div>

      <nav className="space-y-1 border-l border-[var(--border)] pl-3">
        {toc.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`block py-1 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors leading-tight ${
              item.level === 2 ? 'pl-0' : item.level === 3 ? 'pl-2 text-[11px]' : ''
            }`}
          >
            {item.title}
          </a>
        ))}
      </nav>
    </div>
  );
}
