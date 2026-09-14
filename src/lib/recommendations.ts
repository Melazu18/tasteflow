import type { MenuItem } from '@/data/mock';
import { palateDimensions, type PalateProfile } from '@/lib/palate';

export type MenuRecommendation = MenuItem & { match: number };

export function getMenuRecommendations(profile: PalateProfile, items: MenuItem[]): MenuRecommendation[] {
  return items
    .map((item) => {
      const distance = palateDimensions.reduce((total, { key }) => total + Math.abs(profile[key] - item.flavor[key]), 0);
      const match = Math.round((1 - distance / (palateDimensions.length * 4)) * 100);
      return { ...item, match };
    })
    .sort((firstItem, secondItem) => secondItem.match - firstItem.match)
    .slice(0, 3);
}