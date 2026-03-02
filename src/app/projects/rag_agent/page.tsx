import SectionHeading from "@/components/SectionHeading";
import TechStack from "@/components/TechStack";
import ArchitectureBlock from "@/components/ArchitectureBlock";

export default function RagAgentPage() {
  return (
    <div className="py-32 max-w-4xl">
      <SectionHeading
        title="RAG Agent System"
        subtitle="Backend-driven Retrieval-Augmented Generation system for intelligent query answering."
      />

      <TechStack
        stack={[
          "FastAPI",
          "Vector Database",
          "Embeddings",
          "LLMs",
          "Python",
          "REST APIs",
        ]}
      />

      <ArchitectureBlock
        description="Built a retrieval pipeline that transforms user queries into embeddings, performs semantic search over indexed documents and injects contextual knowledge into an LLM response layer. Designed for modularity and scalability."
      />
    </div>
  );
}