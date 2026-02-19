export default function Footer() {
  const links = [
    "Audio Description", "Help Centre", "Gift Cards", "Media Centre",
    "Investor Relations", "Jobs", "Terms of Use", "Privacy",
    "Legal Notices", "Cookie Preferences", "Corporate Information",
    "Contact Us",
  ];

  return (
    <footer className="footer">
      <div className="footer__social">
        {/* Facebook */}
        <a href="#" className="footer__social-icon" aria-label="Facebook">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
        </a>
        {/* Instagram */}
        <a href="#" className="footer__social-icon" aria-label="Instagram">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="5" />
            <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
          </svg>
        </a>
        {/* Twitter */}
        <a href="#" className="footer__social-icon" aria-label="Twitter">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
          </svg>
        </a>
        {/* YouTube */}
        <a href="#" className="footer__social-icon" aria-label="YouTube">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
            <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#141414" />
          </svg>
        </a>
      </div>

      <div className="footer__links">
        {links.map((l) => (
          <a key={l} href="#" className="footer__link">{l}</a>
        ))}
      </div>

      <div className="footer__service-code">
        <button className="footer__service-btn">Service Code</button>
      </div>

      {/* Developer Credit — Netflix Style */}
      <div className="footer__dev">
        <div className="footer__dev-card">
          <div className="footer__dev-avatar">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="10" cy="7" r="4" />
              <path d="m17 11 2 2 4-4" />
            </svg>
          </div>
          <div className="footer__dev-info">
            <p className="footer__dev-name">Developed by <strong>Shreenivas Nayakawadi</strong></p>
            <p className="footer__dev-id">KodNest ID: <code>KODK9E0EJ</code></p>
          </div>
        </div>
      </div>

      <p className="footer__copy">© 2026 Netflix Clone — Powered by TMDB API</p>
    </footer>
  );
}
