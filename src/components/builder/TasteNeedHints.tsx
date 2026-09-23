import type { TasteNeeds } from '../../domain/tasteBalance';

export function TasteNeedHints({ needs }: { needs: TasteNeeds }) {
  const hints = [
    needs.needsBase && 'Nedostaje alkoholna baza (žestica).',
    needs.needsAcidity && 'Preslatko – dodaj kiselinu ili gorčinu.',
    needs.needsSweetness && 'Previše kiselo/gorko – dodaj zaslađivač ili liker.',
  ].filter((hint): hint is string => Boolean(hint));

  if (hints.length === 0) {
    return <p className="hint hint--ok">Okus je uravnotežen.</p>;
  }
  return (
    <ul className="hint-list">
      {hints.map((hint) => (
        <li key={hint} className="hint">
          {hint}
        </li>
      ))}
    </ul>
  );
}
