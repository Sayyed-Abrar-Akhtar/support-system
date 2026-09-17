'use client';

import { useState } from 'react';
import { DocsHeader } from '@/components/docs/DocsHeader';
import { DocsFooter } from '@/components/docs/DocsFooter';
import { SearchModal } from '@/components/docs/SearchModal';
import { Product } from '@/types/documentation';

interface AppLayoutWrapperProps {
  children: React.ReactNode;
  products: Product[];
}

export function AppLayoutWrapper({ children, products }: AppLayoutWrapperProps) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)] text-[var(--text-primary)] antialiased">
      <DocsHeader products={products} onOpenSearch={() => setSearchOpen(true)} />
      <main className="flex-1">{children}</main>
      <DocsFooter />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
