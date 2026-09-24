interface PageIntroProps {
  eyebrow: string;
  title: string;
  lead: string;
}

export function PageIntro({ eyebrow, title, lead }: PageIntroProps) {
  return (
    <header className="page-intro">
      <span className="eyebrow">{eyebrow}</span>
      <h1 className="display-heading">{title}</h1>
      <p className="page-intro__lead">{lead}</p>
    </header>
  );
}
