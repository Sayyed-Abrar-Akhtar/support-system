import type { Metadata } from 'next';
import { getProducts } from '@/lib/docs/repository';
import { AppLayoutWrapper } from '@/components/layout/AppLayoutWrapper';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Documentation & Support Platform | Atelier & Future Themes',
    template: '%s | Documentation Hub'
  },
  description: 'Official merchant documentation, guides, setup instructions, and support portal for Atelier Shopify Theme and digital commerce products.',
  keywords: ['Shopify theme', 'Atelier documentation', 'theme guides', 'swatches', 'mega menu', 'support'],
  authors: [{ name: 'Theme Engineering Team' }],
  openGraph: {
    title: 'Documentation & Support Platform',
    description: 'Complete documentation for Atelier Shopify Theme and eCommerce apps.',
    type: 'website'
  }
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const products = await getProducts();

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppLayoutWrapper products={products}>
          {children}
        </AppLayoutWrapper>
      </body>
    </html>
  );
}
