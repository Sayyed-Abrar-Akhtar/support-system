'use client';

import { useState } from 'react';
import { ThumbsUp, ThumbsDown, CheckCircle2 } from 'lucide-react';

export function ArticleFeedback() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="mt-12 rounded-xl border border-[var(--border)] bg-[var(--surface-hover)]/50 p-6 text-center">
      {submitted ? (
        <div className="flex items-center justify-center gap-2 text-sm font-medium text-[var(--success)]">
          <CheckCircle2 className="h-5 w-5" />
          <span>Thank you for your feedback! We continuously update our docs based on merchant input.</span>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
            Was this article helpful?
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setSubmitted(true)}
              className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-xs font-medium text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all shadow-sm"
            >
              <ThumbsUp className="h-4 w-4" />
              <span>Yes, helped me</span>
            </button>
            <button
              onClick={() => setSubmitted(true)}
              className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-xs font-medium text-[var(--text-primary)] hover:border-[var(--danger)] hover:text-[var(--danger)] transition-all shadow-sm"
            >
              <ThumbsDown className="h-4 w-4" />
              <span>No, need more details</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
