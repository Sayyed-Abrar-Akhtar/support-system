'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Category, Article, Product } from '@/types/documentation';
import { ChevronRight, ChevronDown, BookOpen, Layers } from 'lucide-react';

interface DocsSidebarProps {
  products: Product[];
  currentProduct: Product;
  categories: Category[];
  articles: Article[];
}

export function DocsSidebar({ products, currentProduct, categories, articles }: DocsSidebarProps) {
  const pathname = usePathname();
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);

  return (
    <aside className="w-full lg:w-64 shrink-0 border-b lg:border-b-0 lg:border-r border-[var(--border)] bg-[var(--surface)] p-4 lg:p-6 text-sm">
      <div className="relative mb-6">
        <label className="block text-xs font-semibold uppercase text-[var(--text-muted)] tracking-wider mb-2">
          Active Product
        </label>
        <button
          onClick={() => setProductDropdownOpen(!productDropdownOpen)}
          className="flex w-full items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--surface-hover)] px-3 py-2 text-left text-sm font-medium text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-all"
        >
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-[var(--accent)]" />
            <span className="truncate">{currentProduct.name}</span>
          </div>
          <ChevronDown className="h-4 w-4 text-[var(--text-muted)] shrink-0" />
        </button>

        {productDropdownOpen && (
          <div className="absolute left-0 top-full z-30 mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] py-1 shadow-lg">
            {products.map((p) => {
              const productTypeSlug = p.type === 'theme' ? 'themes' : p.type === 'app' ? 'apps' : 'general';
              const targetUrl = p.type === 'guide' ? '/docs/general' : `/docs/${productTypeSlug}/${p.slug}`;
              const isSelected = p.id === currentProduct.id;

              return (
                <Link
                  key={p.id}
                  href={targetUrl}
                  onClick={() => setProductDropdownOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 text-xs transition-colors ${
                    isSelected
                      ? 'bg-[var(--accent-light)] font-semibold text-[var(--accent)]'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <span className="truncate">{p.name}</span>
                  <span className="rounded bg-[var(--surface-hover)] px-1.5 py-0.5 text-[10px] text-[var(--text-muted)] uppercase">
                    {p.type}
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      <nav className="space-y-6">
        {categories.map((category) => {
          const categoryArticles = articles.filter((a) => a.categoryId === category.id);
          const productTypeSlug = currentProduct.type === 'theme' ? 'themes' : currentProduct.type === 'app' ? 'apps' : 'general';
          const categoryUrl = `/docs/${productTypeSlug}/${currentProduct.slug}/${category.slug}`;

          return (
            <div key={category.id} className="space-y-2">
              <Link
                href={categoryUrl}
                className="group flex items-center justify-between font-semibold text-xs text-[var(--text-primary)] uppercase tracking-wider hover:text-[var(--accent)] transition-colors"
              >
                <span>{category.title}</span>
                <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--text-muted)]" />
              </Link>

              <ul className="space-y-1 pl-2 border-l border-[var(--border)]">
                {categoryArticles.map((article) => {
                  const articleUrl = `/docs/${productTypeSlug}/${currentProduct.slug}/${category.slug}/${article.slug}`;
                  const isActive = pathname === articleUrl;

                  return (
                    <li key={article.id}>
                      <Link
                        href={articleUrl}
                        className={`block rounded-md px-2.5 py-1.5 text-xs transition-colors leading-snug ${
                          isActive
                            ? 'bg-[var(--accent-light)] font-semibold text-[var(--accent)]'
                            : 'text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]'
                        }`}
                      >
                        {article.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}

        <div className="pt-4 border-t border-[var(--border)]">
          <Link
            href={`/docs/${currentProduct.type === 'theme' ? 'themes' : 'apps'}/${currentProduct.slug}/changelog`}
            className="flex items-center gap-2 rounded-md px-2.5 py-2 text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)] transition-colors"
          >
            <BookOpen className="h-4 w-4 text-[var(--text-muted)]" />
            Product Changelog ({currentProduct.version})
          </Link>
        </div>
      </nav>
    </aside>
  );
}
