import { Product, Category, Article, ChangelogEntry } from '@/types/documentation';

export const productsData: Product[] = [
  {
    id: 'prod_atelier',
    type: 'theme',
    name: 'Atelier',
    slug: 'atelier',
    shortDescription: 'Modern, high-performance Shopify theme built for editorial brands, visual storytelling, and high-volume catalogs.',
    description: 'Atelier is a premium Shopify Online Store 2.0 theme engineered for modern digital commerce. Featuring advanced promotional grids, seamless sticky cart drawers, predictive search, rich variant swatches, multi-currency display, and extensive internationalization support.',
    logo: '/images/products/atelier-logo.svg',
    coverImage: '/images/products/atelier-cover.jpg',
    status: 'active',
    version: '1.2.0',
    latestVersion: '1.2.0',
    documentationEnabled: true,
    supportUrl: '/support?product=atelier',
    badges: ['OS 2.0 Ready', 'Multi-preset', 'Predictive Search', 'Sub-second UX'],
    createdAt: '2025-01-10T00:00:00Z',
    updatedAt: '2026-03-01T00:00:00Z'
  },
  {
    id: 'prod_general',
    type: 'guide',
    name: 'General Shopify Guides',
    slug: 'general',
    shortDescription: 'Essential Shopify administrative guides, menu configuration, collection management, and platform concepts.',
    description: 'Platform-agnostic guides explaining core Shopify functionalities including navigation setup, collection creation, product publishing, Shopify Markets, and App Block integrations.',
    status: 'active',
    version: '2026.1',
    latestVersion: '2026.1',
    documentationEnabled: true,
    supportUrl: '/support?product=general',
    badges: ['Platform Basics', 'Shopify Admin'],
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2026-02-15T00:00:00Z'
  }
];

export const categoriesData: Category[] = [
  {
    id: 'cat_at_getting_started',
    productId: 'prod_atelier',
    title: 'Getting Started',
    slug: 'getting-started',
    description: 'Installation, theme activation, preset switching, and initial store setup.',
    icon: 'Rocket',
    sortOrder: 10
  },
  {
    id: 'cat_at_theme_settings',
    productId: 'prod_atelier',
    title: 'Global Theme Settings',
    slug: 'theme-settings',
    description: 'Logos, color schemes, typography scales, layout dimensions, and animations.',
    icon: 'Sliders',
    sortOrder: 20
  },
  {
    id: 'cat_at_header_nav',
    productId: 'prod_atelier',
    title: 'Header & Navigation',
    slug: 'header-navigation',
    description: 'Mega menus, dropdowns, sticky header, announcement bars, and off-canvas drawers.',
    icon: 'Menu',
    sortOrder: 30
  },
  {
    id: 'cat_at_products',
    productId: 'prod_atelier',
    title: 'Product Page & Features',
    slug: 'product-page',
    description: 'Variant swatches, quick view, selling plans, size charts, and pickup availability.',
    icon: 'ShoppingBag',
    sortOrder: 50
  },
  {
    id: 'cat_at_collections',
    productId: 'prod_atelier',
    title: 'Collections & Grid Layouts',
    slug: 'collections',
    description: 'Collection templates, filtering sidebar, desktop column controls, and pagination.',
    icon: 'Grid',
    sortOrder: 60
  },
  {
    id: 'cat_at_cart',
    productId: 'prod_atelier',
    title: 'Cart & Drawer Experience',
    slug: 'cart',
    description: 'AJAX cart drawer, note fields, free shipping progress bars, and cart page.',
    icon: 'ShoppingCart',
    sortOrder: 70
  },
  {
    id: 'cat_at_localization',
    productId: 'prod_atelier',
    title: 'Localization & Switchers',
    slug: 'localization',
    description: 'Multi-language locales, currency formatters, date/time labels, and RTL support status.',
    icon: 'Globe',
    sortOrder: 80
  },
  {
    id: 'cat_at_advanced',
    productId: 'prod_atelier',
    title: 'Advanced & SEO',
    slug: 'advanced',
    description: 'Structured data JSON-LD, meta tags, custom Liquid blocks, and App block integration.',
    icon: 'Code2',
    sortOrder: 90
  },
  {
    id: 'cat_at_troubleshooting',
    productId: 'prod_atelier',
    title: 'Troubleshooting & Support',
    slug: 'troubleshooting',
    description: 'Solutions for common merchant setup questions, swatch issues, and layout fixes.',
    icon: 'HelpCircle',
    sortOrder: 100
  },
  {
    id: 'cat_gen_basics',
    productId: 'prod_general',
    title: 'Shopify Admin Basics',
    slug: 'admin-basics',
    description: 'Managing products, creating navigation menus, and configuring collections.',
    icon: 'BookOpen',
    sortOrder: 10
  }
];

export const articlesData: Article[] = [
  // Getting Started
  {
    id: 'art_at_welcome',
    productId: 'prod_atelier',
    categoryId: 'cat_at_getting_started',
    title: 'Welcome to Atelier',
    slug: 'welcome-to-atelier',
    excerpt: 'An overview of Atelier Shopify Theme capabilities, architectural principles, and merchant edition capabilities.',
    status: 'published',
    version: '1.2.0',
    tags: ['overview', 'getting started', 'atelier', 'theme'],
    featured: true,
    sortOrder: 10,
    lastUpdated: '2026-03-01',
    createdAt: '2025-01-10',
    updatedAt: '2026-03-01',
    content: [
      '# Welcome to Atelier',
      '',
      'Atelier is a premium, high-performance Shopify theme designed for merchants who require editorial precision, flexible layouts, and lightning-fast customer experiences.',
      '',
      '## Core Architectural Highlights',
      '',
      '- **Online Store 2.0 Native**: Full section and app block support across all templates (Product, Collection, Page, Blog, Cart, and Customer pages).',
      '- **Zero Heavy External Dependencies**: Pure vanilla JavaScript for interactions, ensuring fast load times and exceptional Lighthouse scores.',
      '- **Dynamic Modular Components**: Built with design tokens for seamless color scheme and typography customization without writing custom CSS.',
      '- **Global Locales Built-in**: Pre-loaded translation files for 8 major languages (English, French, German, Italian, Spanish, Dutch, Greek, and Russian).'
    ].join('\n'),
    toc: [
      { id: 'welcome-to-atelier', title: 'Welcome to Atelier', level: 1 },
      { id: 'core-architectural-highlights', title: 'Core Architectural Highlights', level: 2 }
    ]
  },
  {
    id: 'art_at_install',
    productId: 'prod_atelier',
    categoryId: 'cat_at_getting_started',
    title: 'Installing & Activating Atelier',
    slug: 'installing-activating-atelier',
    excerpt: 'Step-by-step instructions for uploading the Atelier ZIP file to your Shopify admin store and publishing it live.',
    status: 'published',
    version: '1.2.0',
    tags: ['installation', 'theme zip', 'shopify admin'],
    sortOrder: 20,
    lastUpdated: '2026-02-28',
    createdAt: '2025-01-10',
    updatedAt: '2026-02-28',
    content: [
      '# Installing & Activating Atelier',
      '',
      'Follow these steps to upload and publish Atelier on your Shopify store.',
      '',
      '## How to Install Atelier',
      '',
      '1. Log into your **Shopify Admin**.',
      '2. Go to **Sales Channels > Online Store > Themes**.',
      '3. Click **Add theme** and select **Upload zip file**.',
      '4. Select the downloaded `atelier-theme-v1.2.0.zip` file and click **Upload file**.'
    ].join('\n'),
    toc: [
      { id: 'installing--activating-atelier', title: 'Installing & Activating Atelier', level: 1 },
      { id: 'how-to-install-atelier', title: 'How to Install Atelier', level: 2 }
    ]
  },
  {
    id: 'art_at_presets',
    productId: 'prod_atelier',
    categoryId: 'cat_at_getting_started',
    title: 'Using Theme Presets (Listings)',
    slug: 'using-theme-presets',
    excerpt: 'Detailed guide to Atelier 4 pre-configured style presets: Default, Coastal, Monochrome, and Atelier Market.',
    status: 'published',
    version: '1.2.0',
    tags: ['presets', 'coastal', 'monochrome', 'styles'],
    sortOrder: 30,
    lastUpdated: '2026-02-25',
    createdAt: '2025-01-10',
    updatedAt: '2026-02-25',
    content: [
      '# Using Theme Presets (Listings)',
      '',
      'Atelier ships with 4 professionally designed preset configurations: **Default**, **Coastal**, **Monochrome**, and **Atelier Market**.',
      '',
      '## Applying a Preset',
      '',
      '1. In your **Shopify Admin**, go to **Online Store > Themes**.',
      '2. Click **Customize** next to Atelier.',
      '3. At the bottom of Theme Settings, select your desired preset.'
    ].join('\n'),
    toc: [
      { id: 'using-theme-presets-listings', title: 'Using Theme Presets (Listings)', level: 1 },
      { id: 'applying-a-preset', title: 'Applying a Preset', level: 2 }
    ]
  },

  // Global Theme Settings
  {
    id: 'art_at_logos',
    productId: 'prod_atelier',
    categoryId: 'cat_at_theme_settings',
    title: 'Logo & Favicon Configuration',
    slug: 'logo-favicon-configuration',
    excerpt: 'How to upload desktop, mobile, and sticky header logos and configure optimal pixel dimensions.',
    status: 'published',
    version: '1.2.0',
    tags: ['logo', 'favicon', 'brand', 'theme settings'],
    sortOrder: 10,
    lastUpdated: '2026-02-20',
    createdAt: '2025-01-10',
    updatedAt: '2026-02-20',
    content: [
      '# Logo & Favicon Configuration',
      '',
      'Setting up crisp brand imagery ensures your storefront looks professional across high-density displays.',
      '',
      '## Logo Settings in Theme Editor',
      '',
      'Navigate to **Theme Settings > Logo** to configure main logo, mobile logo width, and favicon.'
    ].join('\n'),
    toc: [
      { id: 'logo--favicon-configuration', title: 'Logo & Favicon Configuration', level: 1 }
    ]
  },
  {
    id: 'art_at_colors_typography',
    productId: 'prod_atelier',
    categoryId: 'cat_at_theme_settings',
    title: 'Colors, Typography & Layout Tokens',
    slug: 'colors-typography-layout-tokens',
    excerpt: 'Detailed reference of theme design tokens including color palettes, font pairings, heading scales, and container widths.',
    status: 'published',
    version: '1.2.0',
    tags: ['colors', 'typography', 'design tokens'],
    sortOrder: 20,
    lastUpdated: '2026-02-20',
    createdAt: '2025-01-10',
    updatedAt: '2026-02-20',
    content: [
      '# Colors, Typography & Layout Tokens',
      '',
      'Atelier utilizes native CSS custom properties generated directly from your Theme Settings schema.',
      '',
      '## Color Scheme System',
      '',
      'Atelier supports independent color schemes: Background, Surface, Text, Border, Primary, Secondary, and Accent.'
    ].join('\n'),
    toc: [
      { id: 'colors-typography--layout-tokens', title: 'Colors, Typography & Layout Tokens', level: 1 }
    ]
  },
  {
    id: 'art_at_cookie_consent',
    productId: 'prod_atelier',
    categoryId: 'cat_at_theme_settings',
    title: 'Cookie Consent Banner Configuration',
    slug: 'cookie-consent-banner-configuration',
    excerpt: 'Configuring Atelier built-in privacy banner, policy link targets, decline options, and compliance scope.',
    status: 'published',
    version: '1.2.0',
    tags: ['cookie banner', 'gdpr', 'privacy', 'consent'],
    sortOrder: 30,
    lastUpdated: '2026-02-18',
    createdAt: '2025-01-10',
    updatedAt: '2026-02-18',
    shopifyConfigRequired: true,
    themeConfigRequired: true,
    content: [
      '# Cookie Consent Banner Configuration',
      '',
      'Atelier includes an optional lightweight cookie consent bar located at the bottom of the viewport.',
      '',
      '## Configuring the Cookie Bar',
      '',
      '1. Open **Theme Settings > Cookie Consent**.',
      '2. Check **Enable cookie banner** and assign your Privacy Policy link.'
    ].join('\n'),
    toc: [
      { id: 'cookie-consent-banner-configuration', title: 'Cookie Consent Banner Configuration', level: 1 }
    ]
  },

  // Header & Navigation
  {
    id: 'art_at_megamenu',
    productId: 'prod_atelier',
    categoryId: 'cat_at_header_nav',
    title: 'Mega Menu & Navigation Setup',
    slug: 'mega-menu-navigation-setup',
    excerpt: 'Complete guide to multi-column mega menus, matching top-level titles, promo image tiles, and mobile drawer setup.',
    status: 'published',
    version: '1.2.0',
    tags: ['mega menu', 'header', 'navigation'],
    featured: true,
    sortOrder: 10,
    lastUpdated: '2026-03-01',
    createdAt: '2025-01-10',
    updatedAt: '2026-03-01',
    shopifyConfigRequired: true,
    themeConfigRequired: true,
    content: [
      '# Mega Menu & Navigation Setup',
      '',
      'Atelier offers three primary header layout navigation styles: **Classic Dropdown**, **Multi-column Mega Menu**, and **Hamburger-only Navigation**.'
    ].join('\n'),
    toc: [
      { id: 'mega-menu--navigation-setup', title: 'Mega Menu & Navigation Setup', level: 1 }
    ]
  },
  {
    id: 'art_at_predictive_search',
    productId: 'prod_atelier',
    categoryId: 'cat_at_header_nav',
    title: 'Predictive Search & Header Search Drawer',
    slug: 'predictive-search-header',
    excerpt: 'How live predictive AJAX search works, displaying instant product, collection, article, and query suggestion results.',
    status: 'published',
    version: '1.2.0',
    tags: ['search', 'predictive search', 'header'],
    sortOrder: 20,
    lastUpdated: '2026-02-22',
    createdAt: '2025-01-10',
    updatedAt: '2026-02-22',
    themeConfigRequired: true,
    content: [
      '# Predictive Search & Header Search Drawer',
      '',
      'Atelier features native, instant predictive search powered by Shopify Predictive Search API.'
    ].join('\n'),
    toc: [
      { id: 'predictive-search--header-search-drawer', title: 'Predictive Search & Header Search Drawer', level: 1 }
    ]
  },

  // Products
  {
    id: 'art_at_swatches',
    productId: 'prod_atelier',
    categoryId: 'cat_at_products',
    title: 'Variant Swatches Configuration',
    slug: 'variant-swatches-configuration',
    excerpt: 'Detailed guide to configuring visual color swatches, image swatches, variant options, and fallback behaviors.',
    status: 'published',
    version: '1.2.0',
    tags: ['swatches', 'variants', 'color swatches', 'product page'],
    featured: true,
    sortOrder: 10,
    lastUpdated: '2026-03-01',
    createdAt: '2025-01-10',
    updatedAt: '2026-03-01',
    shopifyConfigRequired: true,
    themeConfigRequired: true,
    content: [
      '# Variant Swatches Configuration',
      '',
      'Atelier supports both automated HTML color swatches and Shopify Category Metafield image swatches on product pages and product grid cards.',
      '',
      '## Option Naming Convention',
      '',
      'By default, Atelier checks product variant option names for swatch triggers.',
      'Standard matching option names: `Color`, `Colour`, `Farbe`, `Couleur`, `Colore`, `Kleur`.'
    ].join('\n'),
    toc: [
      { id: 'variant-swatches-configuration', title: 'Variant Swatches Configuration', level: 1 },
      { id: 'option-naming-convention', title: 'Option Naming Convention', level: 2 }
    ]
  },
  {
    id: 'art_at_quickview',
    productId: 'prod_atelier',
    categoryId: 'cat_at_products',
    title: 'Quick View Modal Setup',
    slug: 'quick-view-modal-setup',
    excerpt: 'How Quick View allows shoppers to inspect product details and add variants to cart directly from collection grids.',
    status: 'published',
    version: '1.2.0',
    tags: ['quick view', 'modal', 'product cards'],
    sortOrder: 20,
    lastUpdated: '2026-02-24',
    createdAt: '2025-01-10',
    updatedAt: '2026-02-24',
    themeConfigRequired: true,
    content: [
      '# Quick View Modal Setup',
      '',
      'Quick View enables customers to view product galleries, select options, and add items to cart inside a lightweight modal.'
    ].join('\n'),
    toc: [
      { id: 'quick-view-modal-setup', title: 'Quick View Modal Setup', level: 1 }
    ]
  },

  // Collections
  {
    id: 'art_at_collection_filters',
    productId: 'prod_atelier',
    categoryId: 'cat_at_collections',
    title: 'Collection Filters & Desktop Grid Columns',
    slug: 'collection-filters-grid-columns',
    excerpt: 'Configuring Shopify Search & Discovery filters, desktop grid column triggers, and infinity scroll pagination.',
    status: 'published',
    version: '1.2.0',
    tags: ['collections', 'filtering', 'grid columns'],
    sortOrder: 10,
    lastUpdated: '2026-02-22',
    createdAt: '2025-01-10',
    updatedAt: '2026-02-22',
    shopifyConfigRequired: true,
    themeConfigRequired: true,
    content: [
      '# Collection Filters & Desktop Grid Columns',
      '',
      'Atelier integrates seamlessly with Shopify Search & Discovery app for storefront filtering.'
    ].join('\n'),
    toc: [
      { id: 'collection-filters--desktop-grid-columns', title: 'Collection Filters & Desktop Grid Columns', level: 1 }
    ]
  },

  // Cart
  {
    id: 'art_at_cart_drawer',
    productId: 'prod_atelier',
    categoryId: 'cat_at_cart',
    title: 'AJAX Cart Drawer & Free Shipping Progress Bar',
    slug: 'ajax-cart-drawer-free-shipping',
    excerpt: 'Configuring off-canvas cart drawer, order note inputs, free shipping calculator threshold, and cart page.',
    status: 'published',
    version: '1.2.0',
    tags: ['cart drawer', 'ajax cart', 'free shipping bar'],
    featured: true,
    sortOrder: 10,
    lastUpdated: '2026-02-28',
    createdAt: '2025-01-10',
    updatedAt: '2026-02-28',
    themeConfigRequired: true,
    content: [
      '# AJAX Cart Drawer & Free Shipping Progress Bar',
      '',
      'Atelier features an off-canvas slide-out AJAX Cart Drawer that opens automatically when items are added to cart.'
    ].join('\n'),
    toc: [
      { id: 'ajax-cart-drawer--free-shipping-progress-bar', title: 'AJAX Cart Drawer & Free Shipping Progress Bar', level: 1 }
    ]
  },

  // Localization
  {
    id: 'art_at_localization_guide',
    productId: 'prod_atelier',
    categoryId: 'cat_at_localization',
    title: 'Languages, Currencies & Shopify Markets',
    slug: 'languages-currencies-shopify-markets',
    excerpt: 'Complete documentation for Atelier shipped locale files, currency switchers, date/number formatting, and RTL status.',
    status: 'published',
    version: '1.2.0',
    tags: ['localization', 'languages', 'currency', 'shopify markets'],
    sortOrder: 10,
    lastUpdated: '2026-03-01',
    createdAt: '2025-01-10',
    updatedAt: '2026-03-01',
    shopifyConfigRequired: true,
    themeConfigRequired: true,
    content: [
      '# Languages, Currencies & Shopify Markets',
      '',
      'Atelier includes pre-translated locale JSON files for 8 major global languages.'
    ].join('\n'),
    toc: [
      { id: 'languages-currencies--shopify-markets', title: 'Languages, Currencies & Shopify Markets', level: 1 }
    ]
  },

  // Advanced & SEO
  {
    id: 'art_at_structured_data',
    productId: 'prod_atelier',
    categoryId: 'cat_at_advanced',
    title: 'Structured Data (JSON-LD) & SEO Meta Tags',
    slug: 'structured-data-seo-meta-tags',
    excerpt: 'Technical breakdown of automatically generated JSON-LD schema markup for Organization, Product, Article, and Breadcrumbs.',
    status: 'published',
    version: '1.2.0',
    tags: ['seo', 'structured data', 'json-ld', 'meta tags'],
    sortOrder: 10,
    lastUpdated: '2026-02-26',
    createdAt: '2025-01-10',
    updatedAt: '2026-02-26',
    content: [
      '# Structured Data (JSON-LD) & SEO Meta Tags',
      '',
      'Atelier includes built-in structured data snippets to provide rich snippets in Google search results.'
    ].join('\n'),
    toc: [
      { id: 'structured-data-json-ld--seo-meta-tags', title: 'Structured Data (JSON-LD) & SEO Meta Tags', level: 1 }
    ]
  },

  // Troubleshooting
  {
    id: 'art_at_troubleshoot_swatches',
    productId: 'prod_atelier',
    categoryId: 'cat_at_troubleshooting',
    title: 'Troubleshooting: Color Swatches Not Displaying',
    slug: 'troubleshooting-swatches-not-displaying',
    excerpt: 'Step-by-step diagnostic guide when color swatches render as blank or plain drop-down selects.',
    status: 'published',
    version: '1.2.0',
    tags: ['troubleshooting', 'swatches', 'fixes'],
    sortOrder: 10,
    lastUpdated: '2026-02-20',
    createdAt: '2025-01-10',
    updatedAt: '2026-02-20',
    content: [
      '# Troubleshooting: Color Swatches Not Displaying',
      '',
      'If product variants show plain text dropdowns or empty circles, review these causes and solutions.'
    ].join('\n'),
    toc: [
      { id: 'troubleshooting-color-swatches-not-displaying', title: 'Troubleshooting: Color Swatches Not Displaying', level: 1 }
    ]
  },

  // General Shopify Guides
  {
    id: 'art_gen_menus',
    productId: 'prod_general',
    categoryId: 'cat_gen_basics',
    title: 'How to Create & Manage Shopify Navigation Menus',
    slug: 'how-to-create-shopify-navigation-menus',
    excerpt: 'General guide on creating main menus, drop-down items, and multi-level hierarchies in Shopify Admin.',
    status: 'published',
    version: '2026.1',
    tags: ['shopify admin', 'navigation', 'menus'],
    sortOrder: 10,
    lastUpdated: '2026-02-10',
    createdAt: '2025-01-01',
    updatedAt: '2026-02-10',
    shopifyConfigRequired: true,
    content: [
      '# How to Create & Manage Shopify Navigation Menus',
      '',
      'Navigation menus allow customers to browse your store catalog.'
    ].join('\n'),
    toc: [
      { id: 'how-to-create--manage-shopify-navigation-menus', title: 'How to Create & Manage Shopify Navigation Menus', level: 1 }
    ]
  }
];

export const changelogsData: ChangelogEntry[] = [
  {
    id: 'ch_at_1_2_0',
    productId: 'prod_atelier',
    version: '1.2.0',
    date: '2026-03-01',
    title: 'Atelier v1.2.0 - Predictive Search Enhancements & Swatch Metafield Support',
    highlights: 'Added native support for Shopify Category Swatch Metafields.',
    changes: [
      { type: 'added', description: 'Added support for Shopify Category Attribute Swatch Metafields.' }
    ]
  }
];
