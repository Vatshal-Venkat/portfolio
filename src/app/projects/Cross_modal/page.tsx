import SectionHeading from "@/components/SectionHeading";
import TechStack from "@/components/TechStack";
import ArchitectureBlock from "@/components/ArchitectureBlock";

export default function CrossModalPage() {
  return (
    <div className="py-32 max-w-4xl">
      <SectionHeading
        title="Cross - Modal Similarity Evaluation System"
        subtitle="Multimodal similarity evaluation framework across text, image, audio, and video."
      />

      <TechStack
        stack={[
          "Deep Learning",
          "MiniLM",
          "CLIP",
          "Wav2Vec2",
          "Python",
          "Cosine Similarity",
        ]}
      />

      <ArchitectureBlock
        description="Built a comprehensive evaluation framework using state-of-the-art embedding models to compute semantic similarity across different modalities. Implemented normalization strategies and interactive visualization dashboards to benchmark performance and compare model effectiveness."
      />
    </div>
  );
}