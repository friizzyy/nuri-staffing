'use client';

import { useEffect, useRef, useCallback } from 'react';
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
  const btnRef = useRef(null);
  const overlayRef = useRef(null);

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

  const closeMobileMenu = useCallback(() => {
    const btn = btnRef.current;
    const overlay = overlayRef.current;
    if (!btn || !overlay) return;
    btn.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }, []);

  const toggleMobileMenu = useCallback(() => {
    const btn = btnRef.current;
    const overlay = overlayRef.current;
    if (!btn || !overlay) return;
    btn.classList.toggle('open');
    overlay.classList.toggle('open');
    document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';
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
            className="mobile-menu-btn"
            aria-label="Menu"
            ref={btnRef}
            onClick={toggleMobileMenu}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      <div className="mobile-nav-overlay" ref={overlayRef}>
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
