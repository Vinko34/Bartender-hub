import type { EnzymeConditions } from '../../types/enzyme';

const CONDITION_LABELS: { key: keyof EnzymeConditions; label: string }[] = [
  { key: 'optimum', label: 'Optimum' },
  { key: 'dose', label: 'Doza' },
  { key: 'stop', label: 'Zaustavljanje' },
];

export function EnzymeConditionList({ conditions }: { conditions: EnzymeConditions }) {
  return (
    <dl className="condition-list">
      {CONDITION_LABELS.map(({ key, label }) => (
        <div key={key}>
          <dt>{label}</dt>
          <dd>{conditions[key]}</dd>
        </div>
      ))}
    </dl>
  );
}
