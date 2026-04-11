'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const ACTIVE_MAP = {
  '/for-facilities': 'facilities',
  '/for-cnas': 'network',
  '/referral': 'referral',
  '/contact': 'contact',
};

export default function Nav() {
  const pathname = usePathname();
  const navRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const activeLink = ACTIVE_MAP[pathname] || null;

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMobileMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setMenuOpen(prev => !prev);
  }, []);

  return (
    <>
      <nav id="nav" ref={navRef}>
        <div className="nav-inner">
          <Link href="/" className="nav-logo">Nuri<span>.</span></Link>
          <ul className="nav-links">
            <li>
              <Link href="/for-facilities" className={activeLink === 'facilities' ? 'active' : ''}>
                For Facilities
              </Link>
            </li>
            <li>
              <Link href="/for-cnas" className={activeLink === 'network' ? 'active' : ''}>
                Our Network
              </Link>
            </li>
            <li>
              <Link href="/referral" className={activeLink === 'referral' ? 'active' : ''}>
                Referral Pipeline
              </Link>
            </li>
            <li className="nav-separator-li" aria-hidden="true">
              <span className="nav-separator"></span>
            </li>
            <li>
              <Link href="/contact" className="nav-cta">Get Started</Link>
            </li>
          </ul>
          <button
            className={`mobile-menu-btn${menuOpen ? ' open' : ''}`}
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={toggleMobileMenu}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      <div className={`mobile-nav-overlay${menuOpen ? ' open' : ''}`}>
        <Link href="/" onClick={closeMobileMenu}>Home</Link>
        <Link href="/for-facilities" onClick={closeMobileMenu}>For Facilities</Link>
        <Link href="/for-cnas" onClick={closeMobileMenu}>Our Network</Link>
        <Link href="/referral" onClick={closeMobileMenu}>Referral Pipeline</Link>
        <a href="tel:+14086214061" className="mobile-phone" onClick={closeMobileMenu}>(408) 621-4061</a>
        <Link href="/contact" className="nav-cta" onClick={closeMobileMenu}>Get Started</Link>
      </div>
    </>
  );
}
