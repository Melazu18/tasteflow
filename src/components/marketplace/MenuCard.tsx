import { Badge } from '@/components/ui/Badge';
import { Card, CardText, CardTitle } from '@/components/ui/Card';
import { type MenuItem } from '@/data/mock';
import { formatCurrency } from '@/lib/utils';

export function MenuCard({ item }: { item: MenuItem }) {
  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div>
          <Badge>{item.category}</Badge>
          <CardTitle className="mt-4">{item.name}</CardTitle>
          <CardText className="mt-2">{item.description}</CardText>
          <div className="mt-4 flex flex-wrap gap-2">{item.dietary.map(d=><span className="chip normal-case tracking-normal" key={d}>{d}</span>)}</div>
        </div>
        <p className="rounded-2xl bg-white/55 px-3 py-2 font-semibold shadow-innerGlow dark:bg-white/5">{formatCurrency(item.price)}</p>
      </div>
    </Card>
  );
}
