interface EnzymeReactionProps {
  substrate: string;
  products: string;
}

export function EnzymeReaction({ substrate, products }: EnzymeReactionProps) {
  return (
    <div className="reaction">
      <div className="reaction__side">
        <span className="section-label">Supstrat</span>
        <p>{substrate}</p>
      </div>
      <span className="reaction__arrow" aria-label="pretvara se u">
        →
      </span>
      <div className="reaction__side">
        <span className="section-label">Produkti</span>
        <p>{products}</p>
      </div>
    </div>
  );
}
