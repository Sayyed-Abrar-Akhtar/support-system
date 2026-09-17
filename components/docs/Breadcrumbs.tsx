import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-1.5 text-xs text-[var(--text-muted)] mb-6 overflow-x-auto py-1">
      <Link href="/" className="flex items-center hover:text-[var(--text-primary)] transition-colors">
        <Home className="h-3.5 w-3.5" />
        <span className="sr-only">Home</span>
      </Link>

      {items.map((item, idx) => (
        <div key={idx} className="flex items-center space-x-1.5 shrink-0">
          <ChevronRight className="h-3 w-3 text-[var(--text-muted)]" />
          {item.href ? (
            <Link href={item.href} className="hover:text-[var(--text-primary)] transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-[var(--text-primary)]">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
