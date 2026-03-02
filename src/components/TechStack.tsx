interface TechStackProps {
  stack: string[];
}

export default function TechStack({ stack }: TechStackProps) {
  return (
    <div className="flex flex-wrap gap-3 mt-6">
      {stack.map((tech, index) => (
        <span
          key={index}
          className="px-4 py-1.5 text-xs rounded-md bg-secondary border border-subtle text-secondary"
        >
          {tech}
        </span>
      ))}
    </div>
  );
}