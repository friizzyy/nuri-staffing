import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <Link href="/" className="footer-logo">Nuri<span>.</span></Link>
          <p className="footer-desc">Northern California CNA staffing built on credential verification and human matching. We don&apos;t send lists. We place the right caregiver.</p>
          <div className="footer-contact-row">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            <a href="mailto:hello@nuristaffing.com">hello@nuristaffing.com</a>
          </div>
          <div className="footer-contact-row">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.24h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.84A16 16 0 0 0 14 15l.84-.84a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <a href="tel:+14086214061">(408) 621-4061</a>
          </div>
        </div>
        <div>
          <p className="footer-heading">Quick Links</p>
          <ul className="footer-list">
            <li><Link href="/for-facilities">For Facilities</Link></li>
            <li><Link href="/for-cnas">Our Network</Link></li>
            <li><Link href="/referral">Referral Pipeline</Link></li>
            <li><Link href="/contact?role=cna">Apply as a CNA</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-copyright mono">&copy; 2026 Nuri Staffing. All rights reserved.</div>
        <div className="footer-built mono">Built by <a href="https://buildwithju.com" target="_blank" rel="noopener">JU. Studio</a></div>
      </div>
    </footer>
  );
}
