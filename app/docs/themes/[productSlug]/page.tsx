import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProducts, getProductBySlug, getCategoriesByProduct, getArticlesByProduct, getChangelogsByProduct } from '@/lib/docs/repository';
import { DocsSidebar } from '@/components/docs/DocsSidebar';
import { Breadcrumbs } from '@/components/docs/Breadcrumbs';
import { ArrowRight, Clock, Sparkles } from 'lucide-react';

interface ProductPageProps {
  params: Promise<{
    productSlug: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.productSlug);
  if (!product) return { title: 'Product Not Found' };

  return {
    title: `${product.name} Shopify Theme Documentation`,
    description: product.description,
  };
}

export default async function ProductOverviewPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.productSlug);
  if (!product) notFound();

  const allProducts = await getProducts();
  const categories = await getCategoriesByProduct(product.id);
  const articles = await getArticlesByProduct(product.id);
  const changelogs = await getChangelogsByProduct(product.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: 'Documentation', href: '/docs' },
          { label: 'Themes', href: '/docs' },
          { label: product.name }
        ]}
      />

      <div className="flex flex-col lg:flex-row gap-8">
        <DocsSidebar
          products={allProducts}
          currentProduct={product}
          categories={categories}
          articles={articles}
        />

        <div className="flex-1 space-y-10">
          <div className="rounded-2xl border border-[var(--border)] bg-gradient-to-r from-[var(--surface)] to-[var(--surface-hover)] p-8 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 rounded-md bg-[var(--accent-light)] px-2.5 py-1 text-xs font-semibold text-[var(--accent)] mb-2">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Version {product.version}</span>
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
                  {product.name} Documentation
                </h1>
              </div>

              <Link
                href={`/docs/themes/${product.slug}/${categories[0]?.slug}/${articles[0]?.slug}`}
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2.5 text-xs font-semibold text-[var(--primary-foreground)] hover:opacity-90 transition-opacity"
              >
                <span>Getting Started</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-3xl">
              {product.description}
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
              Documentation Categories
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categories.map((category) => {
                const categoryArticles = articles.filter((a) => a.categoryId === category.id);
                const categoryUrl = `/docs/themes/${product.slug}/${category.slug}`;

                return (
                  <div
                    key={category.id}
                    className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm space-y-4 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-base font-bold text-[var(--text-primary)]">
                          {category.title}
                        </h3>
                        <span className="text-xs font-medium text-[var(--text-muted)]">
                          {categoryArticles.length} articles
                        </span>
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                        {category.description}
                      </p>

                      <ul className="space-y-2 border-t border-[var(--border)] pt-3">
                        {categoryArticles.slice(0, 4).map((art) => (
                          <li key={art.id}>
                            <Link
                              href={`/docs/themes/${product.slug}/${category.slug}/${art.slug}`}
                              className="text-xs text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors flex items-center justify-between"
                            >
                              <span className="truncate">{art.title}</span>
                              <ArrowRight className="h-3 w-3 shrink-0 text-[var(--text-muted)]" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-3 border-t border-[var(--border)]">
                      <Link
                        href={categoryUrl}
                        className="text-xs font-semibold text-[var(--accent)] hover:underline inline-flex items-center gap-1"
                      >
                        <span>View all {category.title} guides</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {changelogs.length > 0 && (
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
                <div className="flex items-center gap-2 font-bold text-base text-[var(--text-primary)]">
                  <Clock className="h-5 w-5 text-[var(--accent)]" />
                  <span>Latest Release Updates ({changelogs[0].version})</span>
                </div>
                <Link
                  href={`/docs/themes/${product.slug}/changelog`}
                  className="text-xs font-semibold text-[var(--accent)] hover:underline"
                >
                  View full changelog
                </Link>
              </div>

              <div className="space-y-2 text-xs">
                <h4 className="font-semibold text-[var(--text-primary)]">{changelogs[0].title}</h4>
                <p className="text-[var(--text-secondary)] leading-relaxed">{changelogs[0].highlights}</p>
                <ul className="space-y-1.5 pt-2">
                  {changelogs[0].changes.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-[var(--text-secondary)]">
                      <span className="rounded bg-[var(--accent-light)] px-1.5 py-0.5 text-[10px] font-bold text-[var(--accent)] uppercase shrink-0">
                        {item.type}
                      </span>
                      <span>{item.description}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
