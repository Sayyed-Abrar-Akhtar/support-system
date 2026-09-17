'use client';

import { useState } from 'react';
import { Product, SupportTicketInput } from '@/types/documentation';
import { Send, CheckCircle, AlertCircle, LifeBuoy } from 'lucide-react';

interface SupportFormProps {
  products: Product[];
  initialProductId?: string;
}

export function SupportForm({ products, initialProductId }: SupportFormProps) {
  const [formData, setFormData] = useState<SupportTicketInput>({
    productId: initialProductId || products[0]?.id || '',
    version: products[0]?.version || '',
    category: 'General Question',
    subject: '',
    description: '',
    storeUrl: '',
    email: '',
    name: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [ticketId, setTicketId] = useState<string | null>(null);

  const selectedProduct = products.find((p) => p.id === formData.productId) || products[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const res = await fetch('/api/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        const data = await res.json();
        setTicketId(data.ticketId || `TICK-${Math.floor(100000 + Math.random() * 900000)}`);
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center space-y-4 shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--success-bg)] text-[var(--success)]">
          <CheckCircle className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-bold text-[var(--text-primary)]">Support Ticket Submitted!</h3>
        <p className="text-xs text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed">
          Your request has been registered under Reference ID: <strong className="text-[var(--accent)]">{ticketId}</strong>.
          Our technical support team will review your inquiry and respond to <strong className="text-[var(--text-primary)]">{formData.email}</strong> within 24 business hours.
        </p>
        <button
          onClick={() => {
            setStatus('idle');
            setFormData({ ...formData, subject: '', description: '' });
          }}
          className="inline-flex items-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2 text-xs font-semibold text-[var(--primary-foreground)] hover:opacity-90 transition-opacity"
        >
          Submit Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex items-center gap-3 border-b border-[var(--border)] pb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent-light)] text-[var(--accent)]">
          <LifeBuoy className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-base font-bold text-[var(--text-primary)]">Merchant Technical Support</h2>
          <p className="text-xs text-[var(--text-muted)]">Get assistance directly from product engineers and theme specialists.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div>
          <label className="block font-medium text-[var(--text-primary)] mb-1.5">Product</label>
          <select
            value={formData.productId}
            onChange={(e) => {
              const p = products.find((prod) => prod.id === e.target.value);
              setFormData({ ...formData, productId: e.target.value, version: p?.version || '' });
            }}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface-hover)] px-3 py-2 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
            required
          >
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.type})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium text-[var(--text-primary)] mb-1.5">Product Version</label>
          <input
            type="text"
            value={formData.version}
            onChange={(e) => setFormData({ ...formData, version: e.target.value })}
            placeholder={selectedProduct?.version || 'e.g. 1.2.0'}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface-hover)] px-3 py-2 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-[var(--text-primary)] mb-1.5">Your Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Jane Merchant"
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface-hover)] px-3 py-2 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-[var(--text-primary)] mb-1.5">Store / Contact Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="merchant@yourstore.com"
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface-hover)] px-3 py-2 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div>
          <label className="block font-medium text-[var(--text-primary)] mb-1.5">Issue Topic</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface-hover)] px-3 py-2 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
          >
            <option value="General Question">General Question</option>
            <option value="Theme Setup & Customization">Theme Setup & Customization</option>
            <option value="Swatches & Product Variants">Swatches & Product Variants</option>
            <option value="Header & Mega Menu">Header & Mega Menu</option>
            <option value="Cart & Drawer">Cart & Drawer</option>
            <option value="Bug / Unexpected Behavior">Bug / Unexpected Behavior</option>
          </select>
        </div>

        <div>
          <label className="block font-medium text-[var(--text-primary)] mb-1.5">Shopify Store URL (myshopify.com)</label>
          <input
            type="url"
            value={formData.storeUrl}
            onChange={(e) => setFormData({ ...formData, storeUrl: e.target.value })}
            placeholder="https://yourstore.myshopify.com"
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface-hover)] px-3 py-2 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
            required
          />
        </div>
      </div>

      <div className="text-xs">
        <label className="block font-medium text-[var(--text-primary)] mb-1.5">Subject Summary</label>
        <input
          type="text"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          placeholder="e.g. Variant color swatches not rendering on mobile catalog"
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface-hover)] px-3 py-2 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
          required
        />
      </div>

      <div className="text-xs">
        <label className="block font-medium text-[var(--text-primary)] mb-1.5">Description & Steps to Reproduce</label>
        <textarea
          rows={5}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe your issue, steps taken, active browser, and theme settings used..."
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface-hover)] px-3 py-2 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
          required
        />
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 rounded-lg bg-[var(--danger-bg)] p-3 text-xs text-[var(--danger)]">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>Failed to submit ticket. Please verify all fields and try again.</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--primary)] py-2.5 text-xs font-semibold text-[var(--primary-foreground)] hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        <Send className="h-3.5 w-3.5" />
        <span>{status === 'submitting' ? 'Submitting Ticket...' : 'Send Support Request'}</span>
      </button>
    </form>
  );
}
