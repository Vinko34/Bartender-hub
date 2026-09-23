import { useState } from 'react';
import { BuilderPage } from './components/builder/BuilderPage';
import { CompoundLibraryPage } from './components/compounds/CompoundLibraryPage';
import { AppHeader } from './components/layout/AppHeader';
import { RecipesPage } from './components/recipes/RecipesPage';
import { StockPage } from './components/stock/StockPage';
import { CocktailProvider } from './context/CocktailProvider';
import { StockProvider } from './context/StockProvider';
import type { AppPage } from './types/navigation';

export function App() {
  const [activePage, setActivePage] = useState<AppPage>('builder');

  return (
    <StockProvider>
      <CocktailProvider>
        <AppHeader activePage={activePage} onNavigate={setActivePage} />
        {activePage === 'builder' && <BuilderPage />}
        {activePage === 'recipes' && <RecipesPage onOpenWorkbench={() => setActivePage('builder')} />}
        {activePage === 'stock' && <StockPage />}
        {activePage === 'compounds' && <CompoundLibraryPage />}
      </CocktailProvider>
    </StockProvider>
  );
}
