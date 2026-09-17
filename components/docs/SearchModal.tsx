'use client';

import { useState, useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, BookOpen, Layers, ArrowRight, Loader2 } from 'lucide-react';
import { SearchResult } from '@/types/documentation';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    startTransition(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data.results || []);
        }
      } catch (err) {
        console.error('Search fetch error:', err);
      }
    });
  }, [query]);

  if (!isOpen) return null;

  const handleSelectResult = (url: string) => {
    onClose();
    router.push(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 bg-black/50 backdrop-blur-sm p-4">
      <div
        className="w-full max-w-2xl rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center border-b border-[var(--border)] px-4 py-3 gap-3">
          <Search className="h-5 w-5 text-[var(--text-muted)] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documentation, theme settings, features..."
            className="w-full bg-transparent text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="rounded bg-[var(--surface-hover)] px-2 py-1 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-[var(--border)]"
          >
            ESC
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {isPending ? (
            <div className="flex items-center justify-center py-12 text-xs text-[var(--text-muted)] gap-2">
              <Loader2 className="h-4 w-4 animate-spin text-[var(--accent)]" />
              <span>Searching documentation database...</span>
            </div>
          ) : query.trim() === '' ? (
            <div className="py-12 text-center text-xs text-[var(--text-muted)]">
              Type keywords such as <span className="text-[var(--accent)] font-medium">&quot;swatches&quot;</span>, <span className="text-[var(--accent)] font-medium">&quot;mega menu&quot;</span>, or <span className="text-[var(--accent)] font-medium">&quot;locales&quot;</span>.
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <p className="text-sm font-medium text-[var(--text-primary)]">No matching documentation found</p>
              <p className="text-xs text-[var(--text-muted)]">
                Try searching for broader terms or check our <a href="/support" className="text-[var(--accent)] underline">Support Portal</a>.
              </p>
            </div>
          ) : (
            results.map((result) => (
              <button
                key={result.id}
                onClick={() => handleSelectResult(result.url)}
                className="w-full text-left rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3.5 hover:border-[var(--accent)] hover:bg-[var(--surface-hover)] transition-all group"
              >
                <div className="flex items-center justify-between text-[11px] font-semibold text-[var(--text-muted)] mb-1">
                  <div className="flex items-center gap-1.5">
                    <Layers className="h-3 w-3 text-[var(--accent)]" />
                    <span>{result.productName}</span>
                    <span>•</span>
                    <span>{result.categoryTitle}</span>
                  </div>
                  <span className="rounded bg-[var(--accent-light)] px-1.5 py-0.5 text-[10px] text-[var(--accent)] uppercase">
                    {result.matchType}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors flex items-center justify-between">
                  <span>{result.articleTitle}</span>
                  <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--accent)]" />
                </h4>
                <p className="text-xs text-[var(--text-secondary)] line-clamp-2 mt-1 leading-relaxed">
                  {result.excerpt}
                </p>
              </button>
            ))
          )}
        </div>

        <div className="border-t border-[var(--border)] bg-[var(--surface-hover)]/50 px-4 py-2.5 text-[11px] text-[var(--text-muted)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Search spans all products, categories, tags & articles</span>
          </div>
          <span>Showing top results</span>
        </div>
      </div>
    </div>
  );
}
