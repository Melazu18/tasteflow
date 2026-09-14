export type PalateDimension = 'acidity' | 'body' | 'tannin' | 'sweetness' | 'aroma';

export type TastingScores = Record<PalateDimension, number>;

export type TastingEntry = {
  id: string;
  sample: string;
  notes: string;
  scores: TastingScores;
  createdAt: string;
};

export type PalateProfile = TastingScores & {
  tastings: number;
};

export const palateDimensions: Array<{ key: PalateDimension; label: string; low: string; high: string }> = [
  { key: 'acidity', label: 'Acidity', low: 'Soft', high: 'Bright' },
  { key: 'body', label: 'Body', low: 'Light', high: 'Full' },
  { key: 'tannin', label: 'Tannin', low: 'Silky', high: 'Structured' },
  { key: 'sweetness', label: 'Sweetness', low: 'Dry', high: 'Lush' },
  { key: 'aroma', label: 'Aroma', low: 'Subtle', high: 'Expressive' },
];

export const tastingSamples = [
  'Nordic Harbor Kitchen · Sea buckthorn scallop',
  'Verde Cellar · Catalan natural wine',
  'The Teal Room · Local spirits flight',
  'Terra Beans Café · Roast discovery tray',
];

export const defaultTastingScores: TastingScores = {
  acidity: 3,
  body: 3,
  tannin: 3,
  sweetness: 2,
  aroma: 4,
};

export function calculatePalateProfile(entries: TastingEntry[]): PalateProfile {
  if (!entries.length) {
    return { ...defaultTastingScores, tastings: 0 };
  }

  const totals = entries.reduce(
    (profile, entry) => {
      palateDimensions.forEach(({ key }) => {
        profile[key] += entry.scores[key];
      });
      return profile;
    },
    { acidity: 0, body: 0, tannin: 0, sweetness: 0, aroma: 0 },
  );

  return {
    acidity: Math.round((totals.acidity / entries.length) * 10) / 10,
    body: Math.round((totals.body / entries.length) * 10) / 10,
    tannin: Math.round((totals.tannin / entries.length) * 10) / 10,
    sweetness: Math.round((totals.sweetness / entries.length) * 10) / 10,
    aroma: Math.round((totals.aroma / entries.length) * 10) / 10,
    tastings: entries.length,
  };
}

export function getProfileDescription(profile: PalateProfile): string {
  if (!profile.tastings) {
    return 'Log a tasting to begin building a profile from your own sensory feedback.';
  }

  const preferences: string[] = [];
  if (profile.acidity >= 3.5) preferences.push('bright acidity');
  if (profile.body >= 3.5) preferences.push('full-bodied textures');
  if (profile.tannin >= 3.5) preferences.push('structured finishes');
  if (profile.sweetness >= 3.5) preferences.push('a touch of sweetness');
  if (profile.aroma >= 3.5) preferences.push('expressive aromas');

  return preferences.length
    ? `Your palate currently leans toward ${preferences.join(', ')}.`
    : 'Your palate is balanced across the core sensory dimensions.';
}