import { useStockContext } from '../../context/StockContext';
import { formatIngredientCount } from '../../domain/formatting';
import type { AppPage } from '../../types/navigation';

const PAGE_TABS: { page: AppPage; label: string }[] = [
  { page: 'builder', label: 'Radni stol' },
  { page: 'recipes', label: 'Recepti' },
  { page: 'stock', label: 'Zaliha' },
  { page: 'compounds', label: 'Spojevi' },
];

interface AppHeaderProps {
  activePage: AppPage;
  onNavigate: (page: AppPage) => void;
}

export function AppHeader({ activePage, onNavigate }: AppHeaderProps) {
  const { ingredients } = useStockContext();
  const inStockCount = ingredients.filter((ingredient) => ingredient.stockQuantity > 0).length;

  return (
    <header className="app-header">
      <span className="brand">Cocktail Maister</span>
      <nav className="tabs">
        {PAGE_TABS.map((tab) => (
          <button
            key={tab.page}
            type="button"
            className={tab.page === activePage ? 'tab tab--active' : 'tab'}
            aria-current={tab.page === activePage ? 'page' : undefined}
            onClick={() => onNavigate(tab.page)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      <span className="app-header__count">{formatIngredientCount(inStockCount)} na zalihi</span>
    </header>
  );
}
