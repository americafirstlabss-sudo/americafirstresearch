export function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-platinum md:text-5xl">{title}</h2>
      {description ? <p className="mt-5 text-base leading-8 text-platinum/70">{description}</p> : null}
    </div>
  );
}
