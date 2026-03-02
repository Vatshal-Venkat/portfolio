import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description: string;
  href: string;
}

export default function ProjectCard({
  title,
  description,
  href,
}: ProjectCardProps) {
  return (
    <Link
      href={href}
      className="bg-secondary border border-subtle rounded-xl p-8 card-glow block"
    >
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">{title}</h3>

        <p className="text-secondary text-sm leading-relaxed">
          {description}
        </p>

        <span className="text-sm text-blue-500 font-medium">
          View Details →
        </span>
      </div>
    </Link>
  );
}