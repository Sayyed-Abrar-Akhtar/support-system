import Link from 'next/link';
import { getProducts } from '@/lib/docs/repository';
import { Layers, Rocket, ArrowRight } from 'lucide-react';

export default async function DocsIndexPage() {
  const products = await getProducts();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
          Documentation Hub
        </h1>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Explore documentation by product type across themes, apps, and general Shopify guides.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 space-y-4">
          <div className="flex items-center gap-2 font-bold text-base text-[var(--text-primary)] border-b border-[var(--border)] pb-3">
            <Layers className="h-5 w-5 text-[var(--accent)]" />
            <span>Shopify Themes</span>
          </div>

          <div className="space-y-3">
            {products
              .filter((p) => p.type === 'theme')
              .map((product) => (
                <Link
                  key={product.id}
                  href={`/docs/themes/${product.slug}`}
                  className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--surface-hover)] p-4 hover:border-[var(--accent)] transition-all group"
                >
                  <div>
                    <h2 className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)]">
                      {product.name}
                    </h2>
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5">{product.shortDescription}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-[var(--text-muted)] group-hover:text-[var(--accent)] shrink-0 ml-3" />
                </Link>
              ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 space-y-4">
          <div className="flex items-center gap-2 font-bold text-base text-[var(--text-primary)] border-b border-[var(--border)] pb-3">
            <Rocket className="h-5 w-5 text-[var(--accent)]" />
            <span>General Guides & Apps</span>
          </div>

          <div className="space-y-3">
            <Link
              href="/docs/general"
              className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--surface-hover)] p-4 hover:border-[var(--accent)] transition-all group"
            >
              <div>
                <h2 className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)]">
                  General Shopify Guides
                </h2>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">Navigation, collections, products, and markets setup.</p>
              </div>
              <ArrowRight className="h-4 w-4 text-[var(--text-muted)] group-hover:text-[var(--accent)] shrink-0 ml-3" />
            </Link>

            <Link
              href="/docs/troubleshooting"
              className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--surface-hover)] p-4 hover:border-[var(--accent)] transition-all group"
            >
              <div>
                <h2 className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)]">
                  Troubleshooting Portal
                </h2>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">Common fixes and diagnostic instructions.</p>
              </div>
              <ArrowRight className="h-4 w-4 text-[var(--text-muted)] group-hover:text-[var(--accent)] shrink-0 ml-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
