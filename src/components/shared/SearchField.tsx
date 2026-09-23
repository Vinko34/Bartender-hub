interface SearchFieldProps {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

export function SearchField({ value, placeholder, onChange }: SearchFieldProps) {
  return (
    <label className="search-field">
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
        <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M20 20l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <input type="search" value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}
