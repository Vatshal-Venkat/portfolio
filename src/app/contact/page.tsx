import ContactSection from "@/components/ContactSection";

export default function ContactPage() {
  return (
    <div style={{ minHeight: "calc(100vh - 120px)", display: "flex", alignItems: "center", paddingTop: "100px", paddingBottom: "100px" }}>
      <div className="container">
        <h2 className="section-title" style={{ marginBottom: "3rem" }}>Part VII. — Secure Contact Console</h2>
        <ContactSection />
      </div>
    </div>
  );
}