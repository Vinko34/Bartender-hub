import type { AppPage } from '../types/navigation';

export const PAGE_TABS: { page: AppPage; label: string; slug: string }[] = [
  { page: 'builder', label: 'Radni stol', slug: 'radni-stol' },
  { page: 'recipes', label: 'Recepti', slug: 'recepti' },
  { page: 'preparations', label: 'Pripreme', slug: 'pripreme' },
  { page: 'compounding', label: 'Flavor compounding', slug: 'flavor-compounding' },
  { page: 'enzymes', label: 'Enzimi', slug: 'enzimi' },
  { page: 'stock', label: 'Zaliha', slug: 'zaliha' },
  { page: 'compounds', label: 'Spojevi', slug: 'spojevi' },
];
