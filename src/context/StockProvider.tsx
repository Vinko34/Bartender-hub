import type { ReactNode } from 'react';
import { useStock } from '../hooks/useStock';
import { StockContext } from './StockContext';

export function StockProvider({ children }: { children: ReactNode }) {
  const stockApi = useStock();
  return <StockContext.Provider value={stockApi}>{children}</StockContext.Provider>;
}
