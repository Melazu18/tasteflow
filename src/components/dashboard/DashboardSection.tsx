import { type ReactNode } from 'react';
import { Card } from '@/components/ui/Card';

export function DashboardSection({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <Card className="p-6">
      <div className="mb-5">
        <h3 className="text-xl font-semibold tracking-[-0.04em]">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-[rgb(var(--muted-foreground))]">{description}</p>
      </div>
      {children}
    </Card>
  );
}
