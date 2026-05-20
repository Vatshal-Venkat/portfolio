import "./Footer.css";

export default function Footer() {
  return (
    <footer id="contact" className="footer section">
      <div className="container flex-col items-center gap-md text-center">
        <div className="footer-links flex gap-lg">
          <a href="mailto:venkatvatshal@gmail.com" className="footer-link">
            venkatvatshal@gmail.com
          </a>
          <a href="tel:7989157997" className="footer-link">
            +91 7989157997
          </a>
          <a href="#" className="footer-link">
            LinkedIn
          </a>
          <a href="#" className="footer-link">
            GitHub
          </a>
        </div>
        <p className="text-muted mt-md" style={{ fontSize: "0.85rem" }}>
          © {new Date().getFullYear()} Venkat Vatshal. All rights reserved.
        </p>
      </div>
    </footer>
  );
}