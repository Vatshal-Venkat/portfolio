export default function EducationSection() {
  return (
    <div className="grid grid-cols-2 gap-lg mt-md">
      {/* Education Timeline */}
      <div className="project-card" style={{ gridColumn: '1 / -1' }}>
        <div className="project-meta">Academic Path // History</div>
        <h3 className="project-title text-gradient" style={{ marginBottom: '2.5rem' }}>Education</h3>

        <div className="timeline-container">
          <div className="timeline-line"></div>

          {/* B-Tech */}
          <div className="timeline-item timeline-left">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <span className="timeline-date">2022 – 2026</span>
              <h4 className="text-primary" style={{ fontWeight: 600, fontSize: '1.25rem' }}>B-Tech, Artificial Intelligence</h4>
              <p className="text-muted" style={{ fontSize: '0.95rem', marginTop: '0.2rem' }}>VIDYA JYOTHI INSTITUTE OF TECHNOLOGY</p>
              <p className="text-secondary mt-sm" style={{ fontSize: '0.9rem' }}>CGPA - 8.82</p>
            </div>
          </div>

          {/* Intermediate */}
          <div className="timeline-item timeline-right">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <span className="timeline-date">2020 – 2022</span>
              <h4 className="text-primary" style={{ fontWeight: 600, fontSize: '1.25rem' }}>Intermediate</h4>
              <p className="text-muted" style={{ fontSize: '0.95rem', marginTop: '0.2rem' }}>SRI CHAITANYA JUNIOR COLLEGE</p>
              <p className="text-secondary mt-sm" style={{ fontSize: '0.9rem' }}>Percentage - 92.2%</p>
            </div>
          </div>

          {/* Class X */}
          <div className="timeline-item timeline-left">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <span className="timeline-date">2020</span>
              <h4 className="text-primary" style={{ fontWeight: 600, fontSize: '1.25rem' }}>Class X</h4>
              <p className="text-muted" style={{ fontSize: '0.95rem', marginTop: '0.2rem' }}>SRI CHAITANYA TECHNO SCHOOL</p>
              <p className="text-secondary mt-sm" style={{ fontSize: '0.9rem' }}>GPA - 10.0</p>
            </div>
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="project-card">
        <div className="project-meta">Credentials // Verified</div>
        <h3 className="project-title text-gradient" style={{ marginBottom: '1.5rem' }}>Certifications</h3>
        <ul className="project-bullet-list">
          <li className="project-bullet-item"><strong>DSA with JAVA</strong> (Apna College - 11/2024)</li>
          <li className="project-bullet-item"><strong>IBM Python</strong> (05/2023)</li>
          <li className="project-bullet-item"><strong>CISCO Networking Academy C language</strong> (Cisco - 04/2023)</li>
          <li className="project-bullet-item"><strong>PowerBI</strong> (07/2023)</li>
        </ul>
      </div>

      {/* Organizations & Hobbies */}
      <div className="project-card">
        <div className="project-meta">Life // Beyond Code</div>
        <h3 className="project-title text-gradient" style={{ marginBottom: '1.5rem' }}>Organizations & Hobbies</h3>

        <div className="mb-md">
          <p className="text-primary" style={{ fontWeight: 600 }}>TEDxVJIT</p>
          <p className="text-secondary" style={{ fontSize: '0.95rem' }}>Core Team Member - Hospitality & Management</p>
        </div>

        <hr style={{ borderColor: 'var(--border-color)', opacity: 0.3, margin: '1rem 0' }} />

        <div>
          <p className="text-primary mb-sm" style={{ fontWeight: 600 }}>Hobbies</p>
          <div className="flex flex-wrap gap-sm">
            {["Dance", "Content Writing", "Poetry", "Cricket", "Nature Photography"].map((hobby, idx) => (
              <span key={idx} className="badge">{hobby}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
