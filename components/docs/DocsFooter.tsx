import Link from 'next/link';

export function DocsFooter() {
  return (
    <footer className="mt-auto border-t border-[var(--border)] bg-[var(--surface)] py-12 text-xs text-[var(--text-secondary)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-semibold text-sm text-[var(--text-primary)]">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-bold">
                S
              </div>
              <span>Support Engine</span>
            </div>
            <p className="text-[var(--text-muted)] leading-relaxed">
              Scalable documentation portal and knowledge hub built for Shopify themes, apps, and digital commerce products.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-xs text-[var(--text-primary)] uppercase tracking-wider mb-3">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/docs/themes/atelier" className="hover:text-[var(--text-primary)] transition-colors">
                  Atelier Shopify Theme
                </Link>
              </li>
              <li>
                <Link href="/docs/themes/atelier/changelog" className="hover:text-[var(--text-primary)] transition-colors">
                  Atelier Version Changelog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-xs text-[var(--text-primary)] uppercase tracking-wider mb-3">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/docs/general" className="hover:text-[var(--text-primary)] transition-colors">
                  Shopify Admin Guides
                </Link>
              </li>
              <li>
                <Link href="/docs/troubleshooting" className="hover:text-[var(--text-primary)] transition-colors">
                  Troubleshooting Directory
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-[var(--text-primary)] transition-colors">
                  Global Search Index
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-xs text-[var(--text-primary)] uppercase tracking-wider mb-3">Merchant Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/support" className="hover:text-[var(--text-primary)] transition-colors font-medium text-[var(--accent)]">
                  Submit Support Ticket
                </Link>
              </li>
              <li>
                <span className="text-[var(--text-muted)] block">Mon-Fri Support Assistance</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-[var(--border)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[var(--text-muted)]">
          <p>© {new Date().getFullYear()} Support Engine. Designed for Shopify themes and app platforms.</p>
          <div className="flex items-center gap-4">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
