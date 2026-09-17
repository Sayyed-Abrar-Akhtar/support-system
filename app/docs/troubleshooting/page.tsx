import Link from 'next/link';
import { getProducts, getArticlesByProduct } from '@/lib/docs/repository';
import { Breadcrumbs } from '@/components/docs/Breadcrumbs';
import { HelpCircle, ArrowRight, ShieldAlert } from 'lucide-react';

export const metadata = {
  title: 'Troubleshooting Portal & Diagnostic Directory',
  description: 'Solutions for swatch rendering issues, mega menu triggers, header options, and theme settings.',
};

export default async function TroubleshootingPortalPage() {
  const products = await getProducts();
  const atelierProduct = products.find((p) => p.slug === 'atelier');
  if (!atelierProduct) return null;

  const atelierArticles = await getArticlesByProduct(atelierProduct.id);
  const troubleshootingArticles = atelierArticles.filter((a) => a.categoryId === 'cat_at_troubleshooting');

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Documentation', href: '/docs' },
          { label: 'Troubleshooting Portal' }
        ]}
      />

      <div className="border-b border-[var(--border)] pb-6 space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)] flex items-center gap-3">
          <HelpCircle className="h-8 w-8 text-amber-500" />
          <span>Troubleshooting & Diagnostic Directory</span>
        </h1>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-3xl">
          Identify root causes and step-by-step remedies for common merchant setup questions, variant swatch issues, and theme configuration dependencies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {troubleshootingArticles.map((article) => (
          <Link
            key={article.id}
            href={`/docs/themes/${atelierProduct.slug}/troubleshooting/${article.slug}`}
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm hover:border-[var(--accent)] hover:bg-[var(--surface-hover)] transition-all group space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 rounded bg-amber-50 dark:bg-amber-950/30 px-2 py-0.5 text-[11px] font-bold text-amber-700 dark:text-amber-300">
                <ShieldAlert className="h-3.5 w-3.5" />
                <span>Diagnostic Guide</span>
              </div>
              <h2 className="text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                {article.title}
              </h2>
              <p className="text-xs text-[var(--text-secondary)] line-clamp-3 leading-relaxed">
                {article.excerpt}
              </p>
            </div>

            <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs font-semibold text-[var(--accent)]">
              <span>View troubleshooting guide</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-hover)] p-6 text-center space-y-3">
        <h3 className="text-sm font-bold text-[var(--text-primary)]">Still experiencing an issue?</h3>
        <p className="text-xs text-[var(--text-muted)] max-w-xl mx-auto">
          If your store behavior is not resolved by our diagnostic articles, contact our specialized engineering team directly with your store URL.
        </p>
        <Link
          href="/support"
          className="inline-flex items-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2 text-xs font-semibold text-[var(--primary-foreground)] hover:opacity-90 transition-opacity"
        >
          Submit Support Ticket
        </Link>
      </div>
    </div>
  );
}
