import { cn } from '../utils/cn';

interface AvatarProps {
  name: string;
  src?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizes = { xs: 'h-6 w-6 text-[10px]', sm: 'h-8 w-8 text-xs', md: 'h-10 w-10 text-sm', lg: 'h-14 w-14 text-base', xl: 'h-20 w-20 text-xl' };

function initials(n: string) {
  return n.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase();
}

function hashColor(name: string) {
  const palette = ['#76ABAE', '#F7834A', '#8CC0C3', '#F9A078', '#5E9295', '#E0683A'];
  let h = 0;
  for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return palette[h % palette.length];
}

export function Avatar({ name, src, size = 'md', className }: AvatarProps) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={name} className={cn('rounded-full object-cover', sizes[size], className)} />
    );
  }
  return (
    <div
      className={cn('rounded-full flex items-center justify-center text-white font-semibold shrink-0', sizes[size], className)}
      style={{ background: hashColor(name) }}
      aria-label={name}
    >
      {initials(name)}
    </div>
  );
}

export function AvatarStack({ names, max = 4, size = 'sm' }: { names: string[]; max?: number; size?: AvatarProps['size'] }) {
  const shown = names.slice(0, max);
  const rest = names.length - shown.length;
  return (
    <div className="flex items-center">
      {shown.map((n, i) => (
        <div key={n + i} className={cn(i > 0 && '-ml-2', 'ring-2 ring-surface rounded-full')}>
          <Avatar name={n} size={size} />
        </div>
      ))}
      {rest > 0 && (
        <div className={cn('-ml-2 ring-2 ring-surface rounded-full h-8 w-8 flex items-center justify-center bg-subtle text-fg-muted text-xs font-medium')}>
          +{rest}
        </div>
      )}
    </div>
  );
}
