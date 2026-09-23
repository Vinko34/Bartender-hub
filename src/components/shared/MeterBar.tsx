interface MeterBarProps {
  label: string;
  /** 0–1 */
  fraction: number;
  valueText?: string;
  color?: string;
}

export function MeterBar({ label, fraction, valueText, color }: MeterBarProps) {
  const clampedPercent = Math.max(0, Math.min(1, fraction)) * 100;
  return (
    <div className="meter">
      <span className="meter__label">{label}</span>
      <span className="meter__track">
        <span className="meter__fill" style={{ width: `${clampedPercent}%`, background: color }} />
      </span>
      {valueText && <span className="meter__value">{valueText}</span>}
    </div>
  );
}
