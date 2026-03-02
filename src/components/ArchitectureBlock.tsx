interface ArchitectureBlockProps {
  description: string;
}

export default function ArchitectureBlock({
  description,
}: ArchitectureBlockProps) {
  return (
    <div className="mt-12 p-6 border border-gray-800 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">
        System Architecture
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}