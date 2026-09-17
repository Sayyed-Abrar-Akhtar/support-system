import { getProducts, getCategoriesByProduct, getArticlesByProduct } from '@/lib/docs/repository';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://support.atelier-theme.com';

  const routes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: new Date() },
    { url: `${baseUrl}/docs`, lastModified: new Date() },
    { url: `${baseUrl}/docs/general`, lastModified: new Date() },
    { url: `${baseUrl}/docs/troubleshooting`, lastModified: new Date() },
    { url: `${baseUrl}/search`, lastModified: new Date() },
    { url: `${baseUrl}/support`, lastModified: new Date() }
  ];

  const products = await getProducts();

  for (const product of products) {
    const productTypeSlug = product.type === 'theme' ? 'themes' : product.type === 'app' ? 'apps' : 'general';
    if (product.type === 'guide') continue;

    routes.push({
      url: `${baseUrl}/docs/${productTypeSlug}/${product.slug}`,
      lastModified: new Date(product.updatedAt)
    });

    routes.push({
      url: `${baseUrl}/docs/${productTypeSlug}/${product.slug}/changelog`,
      lastModified: new Date(product.updatedAt)
    });

    const categories = await getCategoriesByProduct(product.id);
    const articles = await getArticlesByProduct(product.id);

    for (const cat of categories) {
      routes.push({
        url: `${baseUrl}/docs/${productTypeSlug}/${product.slug}/${cat.slug}`,
        lastModified: new Date()
      });
    }

    for (const art of articles) {
      const cat = categories.find((c) => c.id === art.categoryId);
      if (cat) {
        routes.push({
          url: `${baseUrl}/docs/${productTypeSlug}/${product.slug}/${cat.slug}/${art.slug}`,
          lastModified: new Date(art.updatedAt)
        });
      }
    }
  }

  return routes;
}
