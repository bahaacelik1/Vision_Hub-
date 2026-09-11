import { cn } from '../utils/cn';

type Status = 'draft' | 'submitted' | 'review' | 'accepted' | 'rejected';

const map: Record<Status, { dot: string; bg: string; text: string; label: string }> = {
  draft:     { dot: 'bg-neutral-400', bg: 'bg-neutral-100 dark:bg-neutral-800', text: 'text-neutral-600 dark:text-neutral-300', label: 'Draft' },
  submitted: { dot: 'bg-info',        bg: 'bg-blue-500/10',    text: 'text-info',    label: 'Submitted' },
  review:    { dot: 'bg-warning',     bg: 'bg-yellow-500/10',  text: 'text-warning', label: 'Under Review' },
  accepted:  { dot: 'bg-success',     bg: 'bg-green-500/10',   text: 'text-success', label: 'Accepted' },
  rejected:  { dot: 'bg-danger',      bg: 'bg-red-500/10',     text: 'text-danger',  label: 'Rejected' },
};

export function StatusPill({ status, label, className }: { status: Status; label?: string; className?: string }) {
  const c = map[status];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-medium',
        c.bg,
        c.text,
        className,
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', c.dot)} />
      {label ?? c.label}
    </span>
  );
}
