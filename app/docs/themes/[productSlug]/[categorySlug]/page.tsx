import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getProducts,
  getProductBySlug,
  getCategoryBySlug,
  getCategoriesByProduct,
  getArticlesByProduct,
  getArticlesByCategory
} from '@/lib/docs/repository';
import { DocsSidebar } from '@/components/docs/DocsSidebar';
import { Breadcrumbs } from '@/components/docs/Breadcrumbs';
import { ArrowRight, BookOpen } from 'lucide-react';

interface CategoryPageProps {
  params: Promise<{
    productSlug: string;
    categorySlug: string;
  }>;
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.productSlug);
  if (!product) return { title: 'Category Not Found' };

  const category = await getCategoryBySlug(product.id, resolvedParams.categorySlug);
  if (!category) return { title: 'Category Not Found' };

  return {
    title: `${category.title} - ${product.name} Documentation`,
    description: category.description,
  };
}

export default async function CategoryOverviewPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.productSlug);
  if (!product) notFound();

  const category = await getCategoryBySlug(product.id, resolvedParams.categorySlug);
  if (!category) notFound();

  const allProducts = await getProducts();
  const categories = await getCategoriesByProduct(product.id);
  const allArticles = await getArticlesByProduct(product.id);
  const categoryArticles = await getArticlesByCategory(product.id, category.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: 'Documentation', href: '/docs' },
          { label: product.name, href: `/docs/themes/${product.slug}` },
          { label: category.title }
        ]}
      />

      <div className="flex flex-col lg:flex-row gap-8">
        <DocsSidebar
          products={allProducts}
          currentProduct={product}
          categories={categories}
          articles={allArticles}
        />

        <div className="flex-1 space-y-8">
          <div className="border-b border-[var(--border)] pb-6 space-y-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
              {category.title}
            </h1>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {category.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categoryArticles.map((article) => {
              const articleUrl = `/docs/themes/${product.slug}/${category.slug}/${article.slug}`;

              return (
                <Link
                  key={article.id}
                  href={articleUrl}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm hover:border-[var(--accent)] hover:bg-[var(--surface-hover)] transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[11px] font-semibold text-[var(--text-muted)]">
                      <BookOpen className="h-3.5 w-3.5 text-[var(--accent)]" />
                      <span>Article</span>
                    </div>
                    <h2 className="text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-xs text-[var(--text-secondary)] line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-xs font-semibold text-[var(--accent)] pt-3 border-t border-[var(--border)]">
                    <span>Read article</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
