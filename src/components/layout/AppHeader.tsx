import { useStockContext } from '../../context/StockContext';
import { PAGE_TABS } from '../../data/navigation';
import { formatIngredientCount } from '../../domain/formatting';
import type { AppPage } from '../../types/navigation';

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
      <nav className="tabs" aria-label="Glavna navigacija">
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
