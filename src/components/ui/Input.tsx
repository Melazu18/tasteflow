import { type InputHTMLAttributes, type LabelHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const base = 'w-full rounded-2xl border border-[rgb(var(--border))]/90 bg-white/70 px-4 py-3 text-sm shadow-innerGlow outline-none backdrop-blur transition placeholder:text-[rgb(var(--muted-foreground))]/65 focus:border-turquoise focus:ring-4 focus:ring-turquoise/15 dark:bg-white/5';

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) { return <input className={cn(base, className)} {...props} />; }
export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) { return <textarea className={cn(base, 'min-h-28 resize-none', className)} {...props} />; }
export function Select({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) { return <select className={cn(base, className)} {...props} />; }
export function Label({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) { return <label className={cn('mb-2 block text-sm font-semibold tracking-[-0.01em]', className)} {...props} />; }
