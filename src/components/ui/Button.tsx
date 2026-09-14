import { type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'dark';

export function Button({ className, variant = 'primary', ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold tracking-[-0.01em] transition duration-300 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--ring))] focus:ring-offset-2 focus:ring-offset-[rgb(var(--background))] disabled:opacity-50',
        variant === 'primary' && 'bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] shadow-[0_16px_40px_rgba(13,102,96,.24)] hover:-translate-y-0.5 hover:shadow-[0_22px_50px_rgba(13,102,96,.28)]',
        variant === 'secondary' && 'border border-[rgb(var(--primary))]/15 bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))] hover:-translate-y-0.5 hover:bg-turquoise/15',
        variant === 'ghost' && 'text-[rgb(var(--foreground))] hover:bg-[rgb(var(--muted))]/80',
        variant === 'outline' && 'border border-[rgb(var(--border))] bg-white/55 text-[rgb(var(--foreground))] shadow-innerGlow backdrop-blur hover:-translate-y-0.5 hover:bg-white/80 dark:bg-white/5 dark:hover:bg-white/10',
        variant === 'dark' && 'bg-slatebrand text-white shadow-[0_16px_42px_rgba(19,31,31,.24)] hover:-translate-y-0.5 dark:bg-white dark:text-slatebrand',
        className,
      )}
      {...props}
    />
  );
}
