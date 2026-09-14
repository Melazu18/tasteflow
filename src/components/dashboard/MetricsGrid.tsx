import { ArrowUpRight } from 'lucide-react';
import { Card, CardText } from '@/components/ui/Card';
import { metrics } from '@/data/mock';

export function MetricsGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map(m=>(
        <Card key={m.label} className="bg-white/70 dark:bg-white/5">
          <CardText>{m.label}</CardText>
          <div className="mt-3 flex items-end justify-between">
            <p className="text-3xl font-semibold tracking-[-0.045em]">{m.value}</p>
            <span className="flex items-center gap-1 rounded-full border border-turquoise/15 bg-mint px-2.5 py-1 text-xs font-semibold text-lagoon"><ArrowUpRight size={14}/>{m.delta}</span>
          </div>
        </Card>
      ))}
    </div>
  );
}
