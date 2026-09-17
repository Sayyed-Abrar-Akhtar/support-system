import Link from 'next/link';
import { getProducts, getCategoriesByProduct, getArticlesByCategory } from '@/lib/docs/repository';
import { Breadcrumbs } from '@/components/docs/Breadcrumbs';
import { BookOpen, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'General Shopify Guides & Administration',
  description: 'Platform-wide guides for managing Shopify navigation menus, collections, products, markets, and app blocks.',
};

export default async function GeneralGuidesPage() {
  const products = await getProducts();
  const generalProduct = products.find((p) => p.slug === 'general');
  if (!generalProduct) return null;

  const categories = await getCategoriesByProduct(generalProduct.id);

  // Pre-fetch articles for all categories outside JSX
  const categoryArticlesMap = await Promise.all(
    categories.map(async (cat) => ({
      category: cat,
      articles: await getArticlesByCategory(generalProduct.id, cat.id)
    }))
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Documentation', href: '/docs' },
          { label: 'General Shopify Guides' }
        ]}
      />

      <div className="border-b border-[var(--border)] pb-6 space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)] flex items-center gap-3">
          <BookOpen className="h-8 w-8 text-[var(--accent)]" />
          <span>General Shopify Guides</span>
        </h1>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-3xl">
          Essential platform guides explaining Shopify Admin workflows, menu configuration, collection management, Shopify Markets, and App Block integrations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categoryArticlesMap.map(({ category, articles }) => (
          <div
            key={category.id}
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm space-y-4 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-1">{category.title}</h2>
              <p className="text-xs text-[var(--text-secondary)] mb-4">{category.description}</p>

              <ul className="space-y-2 border-t border-[var(--border)] pt-3">
                {articles.map((art) => (
                  <li key={art.id}>
                    <Link
                      href={`/docs/general/${category.slug}/${art.slug}`}
                      className="text-xs text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors flex items-center justify-between group"
                    >
                      <span>{art.title}</span>
                      <ArrowRight className="h-3 w-3 text-[var(--text-muted)] group-hover:text-[var(--accent)] shrink-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
