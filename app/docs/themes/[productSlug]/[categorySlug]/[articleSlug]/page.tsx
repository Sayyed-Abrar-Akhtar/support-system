import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getProducts,
  getProductBySlug,
  getCategoryBySlug,
  getCategoriesByProduct,
  getArticleBySlug,
  getArticlesByProduct,
  getRelatedArticles
} from '@/lib/docs/repository';
import { DocsSidebar } from '@/components/docs/DocsSidebar';
import { Breadcrumbs } from '@/components/docs/Breadcrumbs';
import { ArticleTOC } from '@/components/docs/ArticleTOC';
import { ArticleFeedback } from '@/components/docs/ArticleFeedback';
import { Callout } from '@/components/docs/Callout';
import { Clock, Tag, ArrowLeft, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface ArticlePageProps {
  params: Promise<{
    productSlug: string;
    categorySlug: string;
    articleSlug: string;
  }>;
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.productSlug);
  if (!product) return { title: 'Article Not Found' };

  const article = await getArticleBySlug(product.id, resolvedParams.articleSlug);
  if (!article) return { title: 'Article Not Found' };

  return {
    title: `${article.title} - ${product.name} Documentation`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article'
    }
  };
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.productSlug);
  if (!product) notFound();

  const category = await getCategoryBySlug(product.id, resolvedParams.categorySlug);
  if (!category) notFound();

  const article = await getArticleBySlug(product.id, resolvedParams.articleSlug);
  if (!article) notFound();

  const allProducts = await getProducts();
  const categories = await getCategoriesByProduct(product.id);
  const allArticles = await getArticlesByProduct(product.id);

  const currentIndex = allArticles.findIndex((a) => a.id === article.id);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: 'Documentation', href: '/docs' },
          { label: product.name, href: `/docs/themes/${product.slug}` },
          { label: category.title, href: `/docs/themes/${product.slug}/${category.slug}` },
          { label: article.title }
        ]}
      />

      <div className="flex flex-col lg:flex-row gap-8">
        <DocsSidebar
          products={allProducts}
          currentProduct={product}
          categories={categories}
          articles={allArticles}
        />

        <div className="flex-1 min-w-0 space-y-8">
          <div className="border-b border-[var(--border)] pb-6 space-y-3">
            <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--text-muted)]">
              <span className="rounded-md bg-[var(--accent-light)] px-2.5 py-1 font-semibold text-[var(--accent)]">
                {product.name} {article.version || product.version}
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

            {(article.shopifyConfigRequired || article.themeConfigRequired || article.appDependency) && (
              <div className="flex flex-wrap gap-2 pt-2">
                {article.shopifyConfigRequired && (
                  <span className="inline-flex items-center gap-1 rounded bg-amber-50 dark:bg-amber-950/30 px-2 py-0.5 text-[11px] font-semibold text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                    <ShieldCheck className="h-3 w-3" />
                    Shopify Admin Config Required
                  </span>
                )}
                {article.themeConfigRequired && (
                  <span className="inline-flex items-center gap-1 rounded bg-blue-50 dark:bg-blue-950/30 px-2 py-0.5 text-[11px] font-semibold text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    <CheckCircle2 className="h-3 w-3" />
                    Theme Editor Settings Required
                  </span>
                )}
              </div>
            )}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[var(--border)]">
            {prevArticle ? (
              <Link
                href={`/docs/themes/${product.slug}/${category.slug}/${prevArticle.slug}`}
                className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 hover:border-[var(--accent)] transition-all group space-y-1"
              >
                <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1">
                  <ArrowLeft className="h-3 w-3" />
                  <span>Previous Article</span>
                </div>
                <div className="text-xs font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] line-clamp-1">
                  {prevArticle.title}
                </div>
              </Link>
            ) : <div />}

            {nextArticle ? (
              <Link
                href={`/docs/themes/${product.slug}/${category.slug}/${nextArticle.slug}`}
                className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 hover:border-[var(--accent)] transition-all group space-y-1 text-right"
              >
                <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)] flex items-center justify-end gap-1">
                  <span>Next Article</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
                <div className="text-xs font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] line-clamp-1">
                  {nextArticle.title}
                </div>
              </Link>
            ) : <div />}
          </div>
        </div>

        {article.toc && <ArticleTOC toc={article.toc} />}
      </div>
    </div>
  );
}
