interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({
  title,
  subtitle,
}: SectionHeadingProps) {
  return (
    <div className="mb-16 space-y-6">
      <h2 className="text-4xl font-semibold tracking-tight">
        {title}
      </h2>

      {subtitle && (
        <p className="text-secondary max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}