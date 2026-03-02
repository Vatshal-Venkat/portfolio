import SectionHeading from "@/components/SectionHeading";
import TechStack from "@/components/TechStack";
import ArchitectureBlock from "@/components/ArchitectureBlock";

export default function OnlineExamPage() {
  return (
    <div className="py-32 max-w-4xl">
      <SectionHeading
        title="Online Examination System"
        subtitle="Scalable full-stack platform for dynamic exams, automated evaluation and leaderboard analytics."
      />

      <TechStack
        stack={[
          "Next.js",
          "Wix Studio CMS",
          "Node.js",
          "JavaScript",
          "Result Analytics",
        ]}
      />

      <ArchitectureBlock
        description="The system dynamically loads questions from a CMS, tracks user state, calculates performance metrics and persists structured result data. Includes anti-cheating detection and leaderboard ranking logic."
      />
    </div>
  );
}