import { useMemo, useState } from 'react';
import { useStockContext } from '../../context/StockContext';
import { aromaCompounds } from '../../data/aromaCompounds';
import { useCompoundUsage } from '../../hooks/useCompoundUsage';
import { SearchField } from '../shared/SearchField';
import { CompoundCard } from './CompoundCard';

export function CompoundLibraryPage() {
  const { ingredients } = useStockContext();
  const usageByCompoundId = useCompoundUsage(ingredients);
  const [query, setQuery] = useState('');

  const filteredCompounds = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('hr');
    return aromaCompounds.filter((compound) =>
      `${compound.name} ${compound.formula} ${compound.descriptors}`.toLocaleLowerCase('hr').includes(normalizedQuery),
    );
  }, [query]);

  return (
    <main className="page">
      <section className="panel">
        <div className="panel__heading">
          <h2 className="display-heading">Aromatski spojevi</h2>
          <SearchField value={query} placeholder="Traži po nazivu, formuli ili aromi…" onChange={setQuery} />
        </div>
        <div className="compound-grid">
          {filteredCompounds.map((compound) => (
            <CompoundCard key={compound.id} compound={compound} usages={usageByCompoundId.get(compound.id) ?? []} />
          ))}
        </div>
      </section>
    </main>
  );
}
