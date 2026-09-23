import { createContext, useContext } from 'react';
import type { StockApi } from '../hooks/useStock';

export const StockContext = createContext<StockApi | null>(null);

export function useStockContext(): StockApi {
  const stockApi = useContext(StockContext);
  if (!stockApi) {
    throw new Error('useStockContext must be used inside <StockProvider>');
  }
  return stockApi;
}
