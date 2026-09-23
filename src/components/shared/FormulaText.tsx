/** Renders a molecular formula such as C10H18O with subscript atom counts. */
export function FormulaText({ formula }: { formula: string }) {
  const formulaParts = formula.split(/(\d+)/).filter((part) => part.length > 0);
  return (
    <span className="formula">
      {formulaParts.map((part, partIndex) =>
        /^\d+$/.test(part) ? <sub key={partIndex}>{part}</sub> : <span key={partIndex}>{part}</span>,
      )}
    </span>
  );
}
