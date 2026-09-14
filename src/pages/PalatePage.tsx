import { FormEvent, useMemo, useState } from 'react';
import { Clock3, Save, Sparkles, Trash2, Wine } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardText, CardTitle } from '@/components/ui/Card';
import { menuItems } from '@/data/mock';
import {
  calculatePalateProfile,
  defaultTastingScores,
  getProfileDescription,
  palateDimensions,
  tastingSamples,
  type TastingEntry,
  type TastingScores,
} from '@/lib/palate';
import { getMenuRecommendations } from '@/lib/recommendations';

const storageKey = 'tasteflow.tasting-entries';

function readEntries(): TastingEntry[] {
  if (typeof window === 'undefined') return [];

  try {
    const storedEntries = window.localStorage.getItem(storageKey);
    return storedEntries ? (JSON.parse(storedEntries) as TastingEntry[]) : [];
  } catch {
    return [];
  }
}

export function PalatePage() {
  const [entries, setEntries] = useState<TastingEntry[]>(readEntries);
  const [sample, setSample] = useState(tastingSamples[0]);
  const [notes, setNotes] = useState('');
  const [scores, setScores] = useState<TastingScores>(defaultTastingScores);
  const profile = useMemo(() => calculatePalateProfile(entries), [entries]);
  const recommendations = useMemo(() => getMenuRecommendations(profile, menuItems), [profile]);

  function saveEntries(nextEntries: TastingEntry[]) {
    setEntries(nextEntries);
    window.localStorage.setItem(storageKey, JSON.stringify(nextEntries));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    saveEntries([
      {
        id: `${Date.now()}`,
        sample,
        notes: notes.trim(),
        scores,
        createdAt: new Date().toISOString(),
      },
      ...entries,
    ]);
    setNotes('');
    setScores(defaultTastingScores);
  }

  function updateScore(dimension: keyof TastingScores, value: number) {
    setScores((currentScores) => ({ ...currentScores, [dimension]: value }));
  }

  return (
    <section className="container-page py-12">
      <div className="premium-shell grid gap-10 p-7 sm:p-10 lg:grid-cols-[1.1fr_.9fr] lg:p-12">
        <div>
          <div className="chip w-fit"><Sparkles size={14} /> Personal taste intelligence</div>
          <h1 className="section-title mt-5">Build your Palate DNA, one tasting at a time.</h1>
          <p className="section-copy mt-5">
            Capture what you actually enjoy. TasteFlow turns your sensory feedback into a living profile that future
            recommendations can use.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold text-[rgb(var(--muted-foreground))]">
            <span className="rounded-full bg-[rgb(var(--secondary))] px-4 py-2">{profile.tastings} tastings logged</span>
            <span className="rounded-full bg-[rgb(var(--secondary))] px-4 py-2">Saved on this device</span>
          </div>
        </div>
        <div className="rounded-[1.75rem] border border-white/70 bg-white/65 p-6 shadow-soft dark:border-white/10 dark:bg-white/5">
          <p className="eyebrow">Current profile</p>
          <p className="mt-4 text-lg leading-7">{getProfileDescription(profile)}</p>
          <div className="mt-6 grid gap-4">
            {palateDimensions.map(({ key, label }) => (
              <div key={key}>
                <div className="mb-1 flex justify-between text-sm font-semibold"><span>{label}</span><span>{profile[key]}/5</span></div>
                <div className="h-2 overflow-hidden rounded-full bg-[rgb(var(--muted))]"><div className="h-full rounded-full bg-[rgb(var(--accent))]" style={{ width: `${profile[key] * 20}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_.8fr]">
        <Card className="p-6 sm:p-8">
          <CardTitle>Log a tasting</CardTitle>
          <CardText className="mt-2">Use a quick 1-5 score for each sensory dimension. There is no wrong answer.</CardText>
          <form className="mt-7 grid gap-6" onSubmit={handleSubmit}>
            <label className="grid gap-2 text-sm font-semibold">
              What did you taste?
              <select className="h-12 rounded-2xl border border-[rgb(var(--border))] bg-white/70 px-4 dark:bg-white/5" value={sample} onChange={(event) => setSample(event.target.value)}>
                {tastingSamples.map((sampleName) => <option key={sampleName}>{sampleName}</option>)}
              </select>
            </label>
            <div className="grid gap-5">
              {palateDimensions.map(({ key, label, low, high }) => (
                <label key={key} className="grid gap-2 text-sm font-semibold">
                  <span className="flex justify-between"><span>{label}</span><span className="text-[rgb(var(--primary))]">{scores[key]}/5</span></span>
                  <input type="range" min="1" max="5" value={scores[key]} onChange={(event) => updateScore(key, Number(event.target.value))} />
                  <span className="flex justify-between text-xs font-normal text-[rgb(var(--muted-foreground))]"><span>{low}</span><span>{high}</span></span>
                </label>
              ))}
            </div>
            <label className="grid gap-2 text-sm font-semibold">
              Tasting notes <span className="font-normal text-[rgb(var(--muted-foreground))]">(optional)</span>
              <textarea className="min-h-28 rounded-2xl border border-[rgb(var(--border))] bg-white/70 p-4 dark:bg-white/5" placeholder="What stood out?" value={notes} onChange={(event) => setNotes(event.target.value)} />
            </label>
            <Button type="submit" className="w-fit"><Save size={18} /> Save tasting</Button>
          </form>
        </Card>

        <div>
          <div className="mb-4 flex items-end justify-between gap-4">
            <div><p className="eyebrow">Your trail</p><h2 className="mt-2 text-2xl font-semibold">Recent tastings</h2></div>
            <Wine className="text-[rgb(var(--gold))]" />
          </div>
          <div className="grid gap-4">
            {entries.length ? entries.slice(0, 5).map((entry) => (
              <Card key={entry.id} className="p-5">
                <div className="flex items-start justify-between gap-4"><div><CardTitle className="text-lg">{entry.sample.split(' · ')[1] ?? entry.sample}</CardTitle><CardText className="mt-1 flex items-center gap-1"><Clock3 size={14} /> {new Date(entry.createdAt).toLocaleDateString()}</CardText></div><button type="button" className="rounded-full p-2 text-[rgb(var(--muted-foreground))] hover:bg-[rgb(var(--muted))]" aria-label={`Delete ${entry.sample}`} onClick={() => saveEntries(entries.filter((savedEntry) => savedEntry.id !== entry.id))}><Trash2 size={16} /></button></div>
                {entry.notes && <p className="mt-4 text-sm leading-6 text-[rgb(var(--muted-foreground))]">{entry.notes}</p>}
              </Card>
            )) : (
              <Card className="p-6"><CardTitle>No tastings yet</CardTitle><CardText className="mt-2">Your first saved tasting will become the first point in your Palate DNA.</CardText></Card>
            )}
          </div>
        </div>
      </div>

      <section className="mt-10">
        <div className="mb-5 max-w-2xl"><p className="eyebrow">TasteFlow intelligence</p><h2 className="mt-2 text-2xl font-semibold">Your current best matches</h2><p className="mt-2 text-[rgb(var(--muted-foreground))]">These menu items are ranked against your saved sensory preferences. More tastings will make the ranking more personal.</p></div>
        <div className="grid gap-4 md:grid-cols-3">
          {recommendations.map((recommendation) => (
            <Card key={recommendation.id} className="p-5">
              <div className="flex items-start justify-between gap-3"><CardTitle className="text-lg">{recommendation.name}</CardTitle><span className="rounded-full bg-[rgb(var(--secondary))] px-2.5 py-1 text-xs font-bold text-[rgb(var(--primary))]">{recommendation.match}%</span></div>
              <CardText className="mt-2">{recommendation.description}</CardText>
              <p className="mt-4 text-sm font-semibold">{recommendation.category} · {recommendation.currency} {recommendation.price}</p>
            </Card>
          ))}
        </div>
      </section>
    </section>
  );
}