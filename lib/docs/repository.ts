import { Product, Category, Article, ChangelogEntry, SearchResult } from '@/types/documentation';
import { productsData, categoriesData, articlesData, changelogsData } from '@/data/seedData';

export async function getProducts(): Promise<Product[]> {
  return productsData;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return productsData.find((p) => p.slug === slug);
}

export async function getCategoriesByProduct(productId: string): Promise<Category[]> {
  return categoriesData
    .filter((c) => c.productId === productId)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getCategoryBySlug(productId: string, categorySlug: string): Promise<Category | undefined> {
  return categoriesData.find((c) => c.productId === productId && c.slug === categorySlug);
}

export async function getArticlesByProduct(productId: string): Promise<Article[]> {
  return articlesData
    .filter((a) => a.productId === productId && a.status === 'published')
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getArticlesByCategory(productId: string, categoryId: string): Promise<Article[]> {
  return articlesData
    .filter((a) => a.productId === productId && a.categoryId === categoryId && a.status === 'published')
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getArticleBySlug(productId: string, articleSlug: string): Promise<Article | undefined> {
  return articlesData.find((a) => a.productId === productId && a.slug === articleSlug && a.status === 'published');
}

export async function getPopularArticles(limit: number = 6): Promise<(Article & { product: Product; category: Category })[]> {
  const popular = articlesData.filter((a) => a.featured || a.sortOrder === 10);
  const result = [];

  for (const article of popular.slice(0, limit)) {
    const product = productsData.find((p) => p.id === article.productId);
    const category = categoriesData.find((c) => c.id === article.categoryId);
    if (product && category) {
      result.push({
        ...article,
        product,
        category
      });
    }
  }

  return result;
}

export async function getRelatedArticles(article: Article, limit: number = 3): Promise<Article[]> {
  return articlesData
    .filter((a) => a.productId === article.productId && a.id !== article.id && a.categoryId === article.categoryId)
    .slice(0, limit);
}

export async function getChangelogsByProduct(productId: string): Promise<ChangelogEntry[]> {
  return changelogsData
    .filter((c) => c.productId === productId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function searchDocumentation(query: string, productIdFilter?: string): Promise<SearchResult[]> {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: SearchResult[] = [];

  for (const article of articlesData) {
    if (article.status !== 'published') continue;
    if (productIdFilter && article.productId !== productIdFilter) continue;

    const product = productsData.find((p) => p.id === article.productId);
    const category = categoriesData.find((c) => c.id === article.categoryId);
    if (!product || !category) continue;

    const titleMatch = article.title.toLowerCase().includes(q);
    const excerptMatch = article.excerpt.toLowerCase().includes(q);
    const tagMatch = article.tags.some((t) => t.toLowerCase().includes(q));
    const contentMatch = article.content.toLowerCase().includes(q);

    if (titleMatch || excerptMatch || tagMatch || contentMatch) {
      let matchType: SearchResult['matchType'] = 'content';
      if (titleMatch) matchType = 'title';
      else if (tagMatch) matchType = 'tag';

      const productTypeSlug = product.type === 'theme' ? 'themes' : product.type === 'app' ? 'apps' : 'general';
      const url = `/docs/${productTypeSlug}/${product.slug}/${category.slug}/${article.slug}`;

      results.push({
        id: `sr_${article.id}`,
        productId: product.id,
        productName: product.name,
        productType: product.type,
        productSlug: product.slug,
        categoryId: category.id,
        categoryTitle: category.title,
        categorySlug: category.slug,
        articleId: article.id,
        articleTitle: article.title,
        articleSlug: article.slug,
        excerpt: article.excerpt,
        matchType,
        url
      });
    }
  }

  return results;
}
