import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getProducts,
  getCategoryBySlug,
  getCategoriesByProduct,
  getArticleBySlug,
  getArticlesByProduct
} from '@/lib/docs/repository';
import { DocsSidebar } from '@/components/docs/DocsSidebar';
import { Breadcrumbs } from '@/components/docs/Breadcrumbs';
import { ArticleTOC } from '@/components/docs/ArticleTOC';
import { ArticleFeedback } from '@/components/docs/ArticleFeedback';
import { Clock } from 'lucide-react';

interface GeneralArticlePageProps {
  params: Promise<{
    categorySlug: string;
    articleSlug: string;
  }>;
}

export async function generateMetadata({ params }: GeneralArticlePageProps) {
  const resolvedParams = await params;
  const products = await getProducts();
  const product = products.find((p) => p.slug === 'general');
  if (!product) return { title: 'Article Not Found' };

  const article = await getArticleBySlug(product.id, resolvedParams.articleSlug);
  if (!article) return { title: 'Article Not Found' };

  return {
    title: `${article.title} - General Shopify Guide`,
    description: article.excerpt,
  };
}

export default async function GeneralArticleDetailPage({ params }: GeneralArticlePageProps) {
  const resolvedParams = await params;
  const products = await getProducts();
  const product = products.find((p) => p.slug === 'general');
  if (!product) notFound();

  const category = await getCategoryBySlug(product.id, resolvedParams.categorySlug);
  if (!category) notFound();

  const article = await getArticleBySlug(product.id, resolvedParams.articleSlug);
  if (!article) notFound();

  const categories = await getCategoriesByProduct(product.id);
  const allArticles = await getArticlesByProduct(product.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: 'Documentation', href: '/docs' },
          { label: 'General Shopify Guides', href: '/docs/general' },
          { label: category.title },
          { label: article.title }
        ]}
      />

      <div className="flex flex-col lg:flex-row gap-8">
        <DocsSidebar
          products={products}
          currentProduct={product}
          categories={categories}
          articles={allArticles}
        />

        <div className="flex-1 min-w-0 space-y-8">
          <div className="border-b border-[var(--border)] pb-6 space-y-3">
            <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--text-muted)]">
              <span className="rounded-md bg-[var(--accent-light)] px-2.5 py-1 font-semibold text-[var(--accent)]">
                General Guide
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                Updated {article.lastUpdated}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)] leading-tight">
              {article.title}
            </h1>

            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              {article.excerpt}
            </p>
          </div>

          <article className="prose max-w-none text-sm leading-relaxed space-y-6">
            {article.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('# ')) {
                const text = paragraph.replace('# ', '');
                const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                return (
                  <h1 key={idx} id={id} className="text-2xl font-bold text-[var(--text-primary)] mt-8 mb-4 border-b border-[var(--border)] pb-2">
                    {text}
                  </h1>
                );
              }
              if (paragraph.startsWith('## ')) {
                const text = paragraph.replace('## ', '');
                const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                return (
                  <h2 key={idx} id={id} className="text-xl font-bold text-[var(--text-primary)] mt-6 mb-3">
                    {text}
                  </h2>
                );
              }
              return (
                <p key={idx} className="text-[var(--text-primary)] leading-relaxed whitespace-pre-line">
                  {paragraph}
                </p>
              );
            })}
          </article>

          <ArticleFeedback />
        </div>

        {article.toc && <ArticleTOC toc={article.toc} />}
      </div>
    </div>
  );
}
