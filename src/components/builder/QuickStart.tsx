import { QUICK_STARTS } from '../../data/quickStarts';

export function QuickStart({ onStart }: { onStart: (ingredientIds: string[]) => void }) {
  return (
    <div className="workbench__empty">
      <p>
        Dodaj sastojak iz zalihe s lijeve strane – desno će se pojaviti sve što mu paše po zajedničkim aromatskim
        spojevima.
      </p>
      <div className="quick-start">
        <span className="section-label">Brzi početak</span>
        {QUICK_STARTS.map((quickStart) => (
          <button
            key={quickStart.label}
            type="button"
            className="category-pill"
            onClick={() => onStart(quickStart.ingredientIds)}
          >
            {quickStart.label}
          </button>
        ))}
      </div>
    </div>
  );
}
