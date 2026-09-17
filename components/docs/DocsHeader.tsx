'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, Menu, X, BookOpen, Layers, HelpCircle, LifeBuoy } from 'lucide-react';
import { Product } from '@/types/documentation';

interface DocsHeaderProps {
  products: Product[];
  currentProduct?: Product;
  onOpenSearch?: () => void;
}

export function DocsHeader({ products, onOpenSearch }: DocsHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const themeProducts = products.filter((p) => p.type === 'theme');

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight text-[var(--text-primary)]">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] font-bold text-sm">
              S
            </div>
            <span>Support Engine</span>
          </Link>

          <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-[var(--text-secondary)]">
            <Link href="/docs/themes/atelier" className="hover:text-[var(--text-primary)] transition-colors">
              Themes
            </Link>
            <Link href="/docs/general" className="hover:text-[var(--text-primary)] transition-colors">
              General Guides
            </Link>
            <Link href="/docs/troubleshooting" className="hover:text-[var(--text-primary)] transition-colors">
              Troubleshooting
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSearch}
            type="button"
            className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface-hover)] px-3 py-1.5 text-xs text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)] transition-all"
            aria-label="Open search documentation"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Search docs...</span>
            <kbd className="hidden sm:inline-block rounded bg-[var(--surface)] px-1.5 py-0.5 text-[10px] font-mono text-[var(--text-muted)] border border-[var(--border)]">
              ⌘K
            </kbd>
          </button>

          <Link
            href="/support"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-[var(--primary)] px-3.5 py-1.5 text-xs font-medium text-[var(--primary-foreground)] hover:opacity-90 transition-opacity"
          >
            <LifeBuoy className="h-3.5 w-3.5" />
            Contact Support
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden rounded-lg p-2 text-[var(--text-secondary)] hover:bg-[var(--surface-hover)]"
            aria-label="Toggle mobile navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[var(--border)] bg-[var(--surface)] px-4 pb-6 pt-2 space-y-4">
          <div className="space-y-1">
            <div className="text-xs font-semibold uppercase text-[var(--text-muted)] tracking-wider px-2 py-1">
              Themes
            </div>
            {themeProducts.map((theme) => (
              <Link
                key={theme.id}
                href={`/docs/themes/${theme.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
              >
                <Layers className="h-4 w-4 text-[var(--accent)]" />
                {theme.name}
              </Link>
            ))}
          </div>

          <div className="space-y-1">
            <div className="text-xs font-semibold uppercase text-[var(--text-muted)] tracking-wider px-2 py-1">
              General & Support
            </div>
            <Link
              href="/docs/general"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
            >
              <BookOpen className="h-4 w-4 text-[var(--accent)]" />
              Shopify Guides
            </Link>
            <Link
              href="/docs/troubleshooting"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
            >
              <HelpCircle className="h-4 w-4 text-[var(--accent)]" />
              Troubleshooting Portal
            </Link>
            <Link
              href="/support"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-[var(--accent)] hover:bg-[var(--surface-hover)]"
            >
              <LifeBuoy className="h-4 w-4" />
              Contact Support Team
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
