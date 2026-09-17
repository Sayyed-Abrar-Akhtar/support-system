import Link from 'next/link';
import { getProducts, getPopularArticles } from '@/lib/docs/repository';
import { Search, Rocket, Layers, BookOpen, HelpCircle, LifeBuoy, ArrowRight, Sparkles } from 'lucide-react';

export default async function HomePage() {
  const products = await getProducts();
  const popularArticles = await getPopularArticles(6);

  const themeProducts = products.filter((p) => p.type === 'theme');
  const appProducts = products.filter((p) => p.type === 'app');

  return (
    <div className="space-y-16 pb-16">
      <section className="relative overflow-hidden border-b border-[var(--border)] bg-gradient-to-b from-[var(--surface-hover)] to-[var(--surface)] pt-16 pb-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs font-semibold text-[var(--text-secondary)] shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-[var(--accent)]" />
            <span>Atelier Theme Documentation v1.2.0 is Live</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)] leading-tight">
            How can we help you build your store today?
          </h1>

          <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
            Search comprehensive guides, section setup instructions, theme settings, and troubleshooting for Atelier and future products.
          </p>

          <div className="mx-auto max-w-xl">
            <Link
              href="/search"
              className="flex items-center justify-between rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] px-5 py-4 text-sm text-[var(--text-muted)] shadow-lg hover:border-[var(--accent)] transition-all group"
            >
              <div className="flex items-center gap-3">
                <Search className="h-5 w-5 text-[var(--accent)]" />
                <span>Search themes, swatches, mega menu, guides...</span>
              </div>
              <span className="rounded-lg bg-[var(--surface-hover)] px-2.5 py-1 text-xs font-mono font-medium text-[var(--text-primary)] group-hover:bg-[var(--accent-light)] group-hover:text-[var(--accent)] transition-colors">
                Search
              </span>
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        <section className="space-y-8">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-[var(--text-primary)]">Product Documentation</h2>
              <p className="text-xs text-[var(--text-muted)]">Select your Shopify product to view full documentation and guides.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-2">
                <Layers className="h-4 w-4 text-[var(--accent)]" />
                <span>Shopify Themes</span>
              </h3>

              <div className="space-y-3">
                {themeProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/docs/themes/${product.slug}`}
                    className="block rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm hover:border-[var(--accent)] hover:shadow-md transition-all group"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                            {product.name}
                          </h4>
                          <span className="rounded-md bg-[var(--accent-light)] px-2 py-0.5 text-[10px] font-semibold text-[var(--accent)]">
                            v{product.version}
                          </span>
                        </div>
                        <p className="mt-2 text-xs text-[var(--text-secondary)] leading-relaxed">
                          {product.shortDescription}
                        </p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-[var(--text-muted)] group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-all shrink-0 ml-4" />
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-[var(--border)]">
                      {product.badges?.map((badge, idx) => (
                        <span key={idx} className="rounded-full bg-[var(--surface-hover)] px-2.5 py-0.5 text-[10px] text-[var(--text-muted)]">
                          {badge}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-2">
                <Rocket className="h-4 w-4 text-[var(--accent)]" />
                <span>Shopify Applications</span>
              </h3>

              {appProducts.length > 0 ? (
                <div className="space-y-3">
                  {appProducts.map((app) => (
                    <Link
                      key={app.id}
                      href={`/docs/apps/${app.slug}`}
                      className="block rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm hover:border-[var(--accent)] transition-all group"
                    >
                      <h4 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)]">
                        {app.name}
                      </h4>
                      <p className="mt-2 text-xs text-[var(--text-secondary)]">{app.shortDescription}</p>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-[var(--border-strong)] bg-[var(--surface)]/50 p-6 text-center space-y-2">
                  <p className="text-xs font-semibold text-[var(--text-primary)]">Future App Ecosystem Architecture Ready</p>
                  <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                    This platform is architected for expansion. Adding future Shopify apps only requires seed data entries—no code changes needed.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-[var(--text-primary)]">Popular Documentation</h2>
              <p className="text-xs text-[var(--text-muted)]">Frequently referenced merchant setup guides and feature references.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularArticles.map((article) => {
              const productTypeSlug = article.product.type === 'theme' ? 'themes' : article.product.type === 'app' ? 'apps' : 'general';
              const articleUrl = `/docs/${productTypeSlug}/${article.product.slug}/${article.category.slug}/${article.slug}`;

              return (
                <Link
                  key={article.id}
                  href={articleUrl}
                  className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm hover:border-[var(--accent)] hover:bg-[var(--surface-hover)] transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[11px] font-semibold text-[var(--accent)]">
                      <span>{article.product.name}</span>
                      <span>•</span>
                      <span className="text-[var(--text-muted)]">{article.category.title}</span>
                    </div>
                    <h3 className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-[11px] font-medium text-[var(--text-muted)] pt-3 border-t border-[var(--border)]">
                    <span>Updated {article.lastUpdated}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/docs/general"
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm hover:border-[var(--accent)] transition-all group space-y-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-light)] text-[var(--accent)]">
              <BookOpen className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)]">
              General Shopify Guides
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Platform basics including navigation menu creation, collection management, Shopify Markets, and App blocks.
            </p>
          </Link>

          <Link
            href="/docs/troubleshooting"
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm hover:border-[var(--accent)] transition-all group space-y-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950/30 text-amber-600">
              <HelpCircle className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)]">
              Troubleshooting Portal
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Diagnostic steps for swatch rendering, mobile layout adjustments, predictive search, and theme settings.
            </p>
          </Link>

          <Link
            href="/support"
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm hover:border-[var(--accent)] transition-all group space-y-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--success-bg)] text-[var(--success)]">
              <LifeBuoy className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)]">
              Contact Merchant Support
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Submit a support request directly to our theme engineers for technical assistance and store customization guidance.
            </p>
          </Link>
        </section>
      </div>
    </div>
  );
}
