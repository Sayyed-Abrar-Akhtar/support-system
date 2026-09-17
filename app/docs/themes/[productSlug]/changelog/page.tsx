import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getProducts,
  getProductBySlug,
  getCategoriesByProduct,
  getArticlesByProduct,
  getChangelogsByProduct
} from '@/lib/docs/repository';
import { DocsSidebar } from '@/components/docs/DocsSidebar';
import { Breadcrumbs } from '@/components/docs/Breadcrumbs';
import { Clock } from 'lucide-react';

interface ChangelogPageProps {
  params: Promise<{
    productSlug: string;
  }>;
}

export async function generateMetadata({ params }: ChangelogPageProps) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.productSlug);
  if (!product) return { title: 'Product Not Found' };

  return {
    title: `${product.name} Version Changelog & Release Notes`,
    description: `Official version history, feature releases, bug fixes, and upgrades for ${product.name}.`,
  };
}

export default async function ProductChangelogPage({ params }: ChangelogPageProps) {
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
          { label: product.name, href: `/docs/themes/${product.slug}` },
          { label: 'Changelog' }
        ]}
      />

      <div className="flex flex-col lg:flex-row gap-8">
        <DocsSidebar
          products={allProducts}
          currentProduct={product}
          categories={categories}
          articles={articles}
        />

        <div className="flex-1 space-y-8">
          <div className="border-b border-[var(--border)] pb-6 space-y-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
              {product.name} Version Release History
            </h1>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Track new features, visual improvements, bug fixes, and structural code updates shipped across releases.
            </p>
          </div>

          <div className="space-y-6">
            {changelogs.map((entry) => (
              <div
                key={entry.id}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border)] pb-3">
                  <div className="flex items-center gap-3">
                    <span className="rounded-md bg-[var(--accent)] px-3 py-1 text-xs font-bold text-white">
                      v{entry.version}
                    </span>
                    <h2 className="text-base font-bold text-[var(--text-primary)]">{entry.title}</h2>
                  </div>
                  <span className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    Released {entry.date}
                  </span>
                </div>

                {entry.highlights && (
                  <p className="text-xs font-medium text-[var(--text-secondary)] leading-relaxed bg-[var(--surface-hover)] p-3 rounded-lg border border-[var(--border)]">
                    {entry.highlights}
                  </p>
                )}

                <ul className="space-y-2 text-xs">
                  {entry.changes.map((change, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="rounded px-2 py-0.5 text-[10px] font-bold uppercase shrink-0 bg-blue-100 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300">
                        {change.type}
                      </span>
                      <span className="text-[var(--text-primary)] leading-relaxed">{change.description}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
