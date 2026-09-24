import type { ExtractionProfile } from '../../domain/extractionProfile';
import { MeterBar } from '../shared/MeterBar';

const SOLUBILITY_SEGMENTS = [
  { key: 'waterShare', label: 'Voda / šećer', className: 'solubility-bar__segment--water' },
  { key: 'bothShare', label: 'Voda i alkohol', className: 'solubility-bar__segment--both' },
  { key: 'fatShare', label: 'Alkohol / mast', className: 'solubility-bar__segment--fat' },
] as const;

function formatPercent(share: number): string {
  return `${Math.round(share * 100)} %`;
}

export function ExtractionProfileBars({ profile }: { profile: ExtractionProfile }) {
  return (
    <div className="extraction-profile">
      <h3 className="section-label">U čemu se aroma otapa</h3>
      <div className="solubility-bar" role="img" aria-label="Udio arome po topljivosti">
        {SOLUBILITY_SEGMENTS.map((segment) => (
          <span
            key={segment.key}
            className={`solubility-bar__segment ${segment.className}`}
            style={{ flexGrow: profile[segment.key] }}
          />
        ))}
      </div>
      <ul className="solubility-legend">
        {SOLUBILITY_SEGMENTS.map((segment) => (
          <li key={segment.key}>
            <span className={`solubility-legend__swatch ${segment.className}`} />
            {segment.label} <strong>{formatPercent(profile[segment.key])}</strong>
          </li>
        ))}
      </ul>
      <MeterBar
        label="Osjetljivo na toplinu"
        fraction={profile.heatSensitiveShare}
        valueText={formatPercent(profile.heatSensitiveShare)}
        color="var(--accent)"
      />
    </div>
  );
}
