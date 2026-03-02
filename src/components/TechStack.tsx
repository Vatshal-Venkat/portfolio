interface TechStackProps {
  stack: string[];
}

export default function TechStack({ stack }: TechStackProps) {
  return (
    <div className="flex flex-wrap gap-3 mt-6">
      {stack.map((tech, index) => (
        <span
          key={index}
          className="px-3 py-1 text-xs border border-gray-700 rounded-md text-gray-300"
        >
          {tech}
        </span>
      ))}
    </div>
  );
}