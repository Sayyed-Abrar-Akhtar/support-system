import Link from 'next/link';
import { searchDocumentation } from '@/lib/docs/repository';
import { Breadcrumbs } from '@/components/docs/Breadcrumbs';
import { Search, ArrowRight, Layers } from 'lucide-react';

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export const metadata = {
  title: 'Global Search Index',
  description: 'Search documentation across themes, apps, settings, and guides.',
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || '';
  const results = query ? await searchDocumentation(query) : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Documentation', href: '/docs' },
          { label: 'Global Search' }
        ]}
      />

      <div className="border-b border-[var(--border)] pb-6 space-y-4">
        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
          Search Documentation Index
        </h1>

        <form action="/search" method="GET" className="flex items-center gap-2 max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Search by keyword, theme setting, swatch, mega menu..."
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-hover)] pl-10 pr-4 py-2.5 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
              autoFocus
            />
          </div>
          <button
            type="submit"
            className="rounded-xl bg-[var(--primary)] px-5 py-2.5 text-xs font-semibold text-[var(--primary-foreground)] hover:opacity-90 transition-opacity"
          >
            Search
          </button>
        </form>
      </div>

      {query && (
        <div className="space-y-4">
          <p className="text-xs text-[var(--text-muted)]">
            Found <strong className="text-[var(--text-primary)]">{results.length}</strong> results for &quot;<span className="text-[var(--accent)]">{query}</span>&quot;
          </p>

          <div className="space-y-3">
            {results.map((result) => (
              <Link
                key={result.id}
                href={result.url}
                className="block rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 hover:border-[var(--accent)] hover:bg-[var(--surface-hover)] transition-all group"
              >
                <div className="flex items-center gap-2 text-[11px] font-semibold text-[var(--text-muted)] mb-1">
                  <Layers className="h-3.5 w-3.5 text-[var(--accent)]" />
                  <span>{result.productName}</span>
                  <span>•</span>
                  <span>{result.categoryTitle}</span>
                </div>
                <h2 className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors flex items-center justify-between">
                  <span>{result.articleTitle}</span>
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--accent)]" />
                </h2>
                <p className="text-xs text-[var(--text-secondary)] line-clamp-2 mt-1 leading-relaxed">
                  {result.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
