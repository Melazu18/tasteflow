import { type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn('inline-flex rounded-full border border-[rgb(var(--primary))]/15 bg-[rgb(var(--secondary))]/90 px-3 py-1 text-xs font-semibold text-[rgb(var(--secondary-foreground))]', className)} {...props} />;
}
