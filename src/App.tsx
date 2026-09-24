import { BuilderPage } from './components/builder/BuilderPage';
import { FlavorCompoundingPage } from './components/compounding/FlavorCompoundingPage';
import { CompoundLibraryPage } from './components/compounds/CompoundLibraryPage';
import { EnzymesPage } from './components/enzymes/EnzymesPage';
import { AppHeader } from './components/layout/AppHeader';
import { PreparationsPage } from './components/preparations/PreparationsPage';
import { RecipesPage } from './components/recipes/RecipesPage';
import { StockPage } from './components/stock/StockPage';
import { CocktailProvider } from './context/CocktailProvider';
import { StockProvider } from './context/StockProvider';
import { useHashRoute } from './hooks/useHashRoute';

export function App() {
  const { activePage, navigate } = useHashRoute();

  return (
    <StockProvider>
      <CocktailProvider>
        <AppHeader activePage={activePage} onNavigate={navigate} />
        {activePage === 'builder' && <BuilderPage />}
        {activePage === 'recipes' && <RecipesPage onOpenWorkbench={() => navigate('builder')} />}
        {activePage === 'preparations' && <PreparationsPage />}
        {activePage === 'compounding' && <FlavorCompoundingPage />}
        {activePage === 'enzymes' && <EnzymesPage />}
        {activePage === 'stock' && <StockPage />}
        {activePage === 'compounds' && <CompoundLibraryPage />}
      </CocktailProvider>
    </StockProvider>
  );
}
