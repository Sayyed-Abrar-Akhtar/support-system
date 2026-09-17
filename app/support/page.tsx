import { getProducts } from '@/lib/docs/repository';
import { SupportForm } from '@/components/docs/SupportForm';
import { Breadcrumbs } from '@/components/docs/Breadcrumbs';

export const metadata = {
  title: 'Contact Merchant Support',
  description: 'Submit technical inquiries and store customization requests for Atelier Shopify theme and apps.',
};

export default async function SupportPage() {
  const products = await getProducts();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Documentation', href: '/docs' },
          { label: 'Contact Support' }
        ]}
      />

      <div className="border-b border-[var(--border)] pb-6 space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
          Merchant Technical Support
        </h1>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          Need assistance with Atelier theme configuration, custom liquid modifications, or app compatibility? Submit a ticket below.
        </p>
      </div>

      <SupportForm products={products} />
    </div>
  );
}
