export default function EducationSection() {
  return (
    <div className="grid grid-cols-2 gap-lg mt-md">
      {/* Education */}
      <div className="glass-card" style={{ gridColumn: '1 / -1' }}>
        <h3 className="h3 text-gradient mb-md">Education</h3>
        <div className="flex-col gap-md" style={{ display: 'flex' }}>
          
          <div className="flex justify-between items-center" style={{ flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <p className="text-primary" style={{ fontWeight: 600, fontSize: '1.1rem' }}>B-Tech, Artificial Intelligence</p>
              <p className="text-muted">VIDYA JYOTHI INSTITUTE OF TECHNOLOGY</p>
              <p className="text-secondary mt-sm" style={{ fontSize: '0.9rem' }}>Current CGPA - 8.80 (till 7th semester)</p>
            </div>
            <div className="badge">2022 – 2026</div>
          </div>
          
          <hr style={{ borderColor: 'var(--border-color)', opacity: 0.5 }} />

          <div className="flex justify-between items-center" style={{ flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <p className="text-primary" style={{ fontWeight: 600, fontSize: '1.1rem' }}>Intermediate</p>
              <p className="text-muted">SRI CHAITANYA JUNIOR COLLEGE</p>
              <p className="text-secondary mt-sm" style={{ fontSize: '0.9rem' }}>Percentage - 92.2%</p>
            </div>
            <div className="badge">2020 – 2022</div>
          </div>
          
          <hr style={{ borderColor: 'var(--border-color)', opacity: 0.5 }} />

          <div className="flex justify-between items-center" style={{ flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <p className="text-primary" style={{ fontWeight: 600, fontSize: '1.1rem' }}>Class X</p>
              <p className="text-muted">SRI CHAITANYA TECHNO SCHOOL</p>
              <p className="text-secondary mt-sm" style={{ fontSize: '0.9rem' }}>GPA - 10.0</p>
            </div>
            <div className="badge">2020</div>
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="glass-card">
        <h3 className="h3 text-gradient mb-md">Certifications</h3>
        <ul style={{ listStyleType: 'square', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', color: 'var(--text-secondary)' }}>
          <li><strong>DSA with JAVA</strong> (Apna College - 11/2024)</li>
          <li><strong>IBM Python</strong> (05/2023)</li>
          <li><strong>CISCO Networking Academy C language</strong> (Cisco - 04/2023)</li>
          <li><strong>PowerBI</strong> (07/2023)</li>
        </ul>
      </div>

      {/* Organizations & Hobbies */}
      <div className="glass-card">
        <h3 className="h3 text-gradient mb-md">Organizations & Hobbies</h3>
        
        <div className="mb-md">
          <p className="text-primary" style={{ fontWeight: 600 }}>TEDxVJIT</p>
          <p className="text-secondary" style={{ fontSize: '0.95rem' }}>Core Team Member - Hospitality & Management</p>
        </div>

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
