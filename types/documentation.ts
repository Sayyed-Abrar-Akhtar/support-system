export type ProductType = 'theme' | 'app' | 'guide' | 'other';
export type ProductStatus = 'active' | 'beta' | 'deprecated';

export interface Product {
  id: string;
  type: ProductType;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  logo?: string;
  coverImage?: string;
  status: ProductStatus;
  version: string;
  latestVersion: string;
  documentationEnabled: boolean;
  supportUrl?: string;
  badges?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  productId: string;
  title: string;
  slug: string;
  description: string;
  icon?: string;
  sortOrder: number;
}

export type CalloutType = 'note' | 'warning' | 'tip' | 'info';

export interface TOCItem {
  id: string;
  title: string;
  level: number;
}

export interface Article {
  id: string;
  productId: string;
  categoryId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: 'published' | 'draft';
  version?: string;
  tags: string[];
  featured?: boolean;
  sortOrder: number;
  lastUpdated: string;
  createdAt: string;
  updatedAt: string;
  toc?: TOCItem[];
  relatedArticleIds?: string[];
  shopifyConfigRequired?: boolean;
  themeConfigRequired?: boolean;
  appDependency?: string;
}

export interface ChangelogItem {
  type: 'added' | 'changed' | 'fixed' | 'deprecated' | 'removed';
  description: string;
}

export interface ChangelogEntry {
  id: string;
  productId: string;
  version: string;
  date: string;
  title: string;
  highlights?: string;
  changes: ChangelogItem[];
}

export interface SearchResult {
  id: string;
  productId: string;
  productName: string;
  productType: ProductType;
  productSlug: string;
  categoryId: string;
  categoryTitle: string;
  categorySlug: string;
  articleId: string;
  articleTitle: string;
  articleSlug: string;
  excerpt: string;
  matchType: 'title' | 'tag' | 'content' | 'category' | 'product';
  url: string;
}

export interface SupportTicketInput {
  productId: string;
  version: string;
  category: string;
  subject: string;
  description: string;
  storeUrl: string;
  email: string;
  name: string;
}
