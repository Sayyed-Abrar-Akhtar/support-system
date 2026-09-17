import Link from 'next/link';
import { HelpCircle, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center space-y-6">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 dark:bg-amber-950/30 text-amber-600">
        <HelpCircle className="h-8 w-8" />
      </div>

      <h1 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
        404 - Page or Article Not Found
      </h1>

      <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-md mx-auto">
        The documentation page you are looking for may have been moved, renamed, or is currently under revision.
      </p>

      <div className="pt-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-2.5 text-xs font-semibold text-[var(--primary-foreground)] hover:opacity-90 transition-opacity"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Return to Documentation Homepage</span>
        </Link>
      </div>
    </div>
  );
}
