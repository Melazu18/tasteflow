import { useMemo, useState } from 'react';
import { Beaker, Save, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardText, CardTitle } from '@/components/ui/Card';
import { menuItems } from '@/data/mock';
import { palateDimensions, type TastingScores } from '@/lib/palate';

function blendFlavors(firstFlavor: TastingScores, secondFlavor: TastingScores, firstPercent: number): TastingScores {
  const secondPercent = 100 - firstPercent;
  return palateDimensions.reduce((blend, { key }) => {
    blend[key] = Math.round(((firstFlavor[key] * firstPercent + secondFlavor[key] * secondPercent) / 100) * 10) / 10;
    return blend;
  }, {} as TastingScores);
}

export function BlendLabPage() {
  const [firstId, setFirstId] = useState(menuItems[0].id);
  const [secondId, setSecondId] = useState(menuItems[2].id);
  const [firstPercent, setFirstPercent] = useState(60);
  const [saved, setSaved] = useState(false);
  const firstItem = menuItems.find((item) => item.id === firstId) ?? menuItems[0];
  const secondItem = menuItems.find((item) => item.id === secondId) ?? menuItems[1];
  const blend = useMemo(() => blendFlavors(firstItem.flavor, secondItem.flavor, firstPercent), [firstItem, secondItem, firstPercent]);

  function saveBlend() {
    const existingBlends = JSON.parse(window.localStorage.getItem('tasteflow.saved-blends') ?? '[]') as object[];
    window.localStorage.setItem('tasteflow.saved-blends', JSON.stringify([...existingBlends, { firstId, secondId, firstPercent, createdAt: new Date().toISOString() }]));
    setSaved(true);
  }

  return (
    <section className="container-page py-12">
      <div className="premium-shell p-7 sm:p-10 lg:p-12"><div className="chip w-fit"><Sparkles size={14} /> Experimental tasting studio</div><h1 className="section-title mt-5 max-w-4xl">Blend the profile before you buy the bottle.</h1><p className="section-copy mt-5">Combine two catalog products and see how their sensory balance changes. This is a transparent flavor model, ready to be replaced by a richer blend prediction service.</p></div>
      <div className="mt-10 grid gap-8 lg:grid-cols-[.9fr_1.1fr]">
        <Card className="p-6 sm:p-8"><CardTitle>Choose your components</CardTitle><CardText className="mt-2">Move the ratio to explore how each component shapes the final profile.</CardText><div className="mt-7 grid gap-5"><label className="grid gap-2 text-sm font-semibold">First component<select className="h-12 rounded-2xl border border-[rgb(var(--border))] bg-white/70 px-4 dark:bg-white/5" value={firstId} onChange={(event) => setFirstId(event.target.value)}>{menuItems.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label><label className="grid gap-2 text-sm font-semibold">Second component<select className="h-12 rounded-2xl border border-[rgb(var(--border))] bg-white/70 px-4 dark:bg-white/5" value={secondId} onChange={(event) => setSecondId(event.target.value)}>{menuItems.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label><label className="grid gap-2 text-sm font-semibold"><span className="flex justify-between"><span>{firstItem.name} ratio</span><span>{firstPercent}% / {100 - firstPercent}%</span></span><input type="range" min="0" max="100" step="5" value={firstPercent} onChange={(event) => setFirstPercent(Number(event.target.value))} /><span className="flex justify-between text-xs font-normal text-[rgb(var(--muted-foreground))]"><span>{secondItem.name}</span><span>{firstItem.name}</span></span></label><Button type="button" className="w-fit" onClick={saveBlend}><Save size={18} /> {saved ? 'Blend saved' : 'Save blend'}</Button></div></Card>
        <Card className="p-6 sm:p-8"><div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-[rgb(var(--secondary))] text-[rgb(var(--primary))]"><Beaker /></span><div><p className="eyebrow">Predicted result</p><CardTitle className="mt-1">Your custom blend</CardTitle></div></div><p className="mt-5 text-lg font-semibold">{firstPercent}% {firstItem.name} + {100 - firstPercent}% {secondItem.name}</p><div className="mt-7 grid gap-5">{palateDimensions.map(({ key, label, low, high }) => <div key={key}><div className="mb-1 flex justify-between text-sm font-semibold"><span>{label}</span><span>{blend[key]}/5</span></div><div className="h-3 overflow-hidden rounded-full bg-[rgb(var(--muted))]"><div className="h-full rounded-full bg-[rgb(var(--accent))]" style={{ width: `${blend[key] * 20}%` }} /></div><div className="mt-1 flex justify-between text-xs text-[rgb(var(--muted-foreground))]"><span>{low}</span><span>{high}</span></div></div>)}</div></Card>
      </div>
    </section>
  );
}