import { CalloutType } from '@/types/documentation';
import { AlertTriangle, Info, CheckCircle } from 'lucide-react';

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const styles = {
    note: {
      bg: 'bg-[var(--surface-hover)]',
      border: 'border-[var(--border-strong)]',
      text: 'text-[var(--text-primary)]',
      icon: Info,
      defaultTitle: 'Note'
    },
    info: {
      bg: 'bg-blue-50/50 dark:bg-blue-950/20',
      border: 'border-blue-200 dark:border-blue-800',
      text: 'text-blue-900 dark:text-blue-200',
      icon: Info,
      defaultTitle: 'Information'
    },
    tip: {
      bg: 'bg-[var(--success-bg)]',
      border: 'border-green-300 dark:border-green-800',
      text: 'text-green-900 dark:text-green-200',
      icon: CheckCircle,
      defaultTitle: 'Pro Tip'
    },
    warning: {
      bg: 'bg-[var(--warning-bg)]',
      border: 'border-amber-300 dark:border-amber-800',
      text: 'text-amber-900 dark:text-amber-200',
      icon: AlertTriangle,
      defaultTitle: 'Important Warning'
    }
  };

  const currentStyle = styles[type] || styles.info;
  const IconComponent = currentStyle.icon;

  return (
    <div className={`my-6 rounded-xl border ${currentStyle.border} ${currentStyle.bg} p-4 text-xs leading-relaxed ${currentStyle.text}`}>
      <div className="flex items-center gap-2 font-semibold mb-1">
        <IconComponent className="h-4 w-4 shrink-0" />
        <span>{title || currentStyle.defaultTitle}</span>
      </div>
      <div className="pl-6 font-normal">{children}</div>
    </div>
  );
}
