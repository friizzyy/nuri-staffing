import Link from 'next/link';
import styles from './not-found.module.css';

export const metadata = {
  title: 'Page Not Found — Nuri Staffing',
  description: "The page you're looking for doesn't exist. Head back to Nuri Staffing.",
  robots: 'noindex, follow',
};

export default function NotFound() {
  return (
    <div className={styles.notFoundPage}>
      <div className={styles.wrap}>
        <div className={styles.eyebrow}>Page Not Found</div>
        <div className={styles.code}>4<span className={styles.codeAccent}>0</span>4</div>
        <h1 className={styles.title}>This page didn&apos;t make it to the floor.</h1>
        <p className={styles.description}>The link you followed is broken or the page has moved. Let&rsquo;s get you back to coverage.</p>
        <div className={styles.actions}>
          <Link href="/" className={`${styles.btn} ${styles.btnPrimary}`}>
            Back to Home
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </Link>
          <Link href="/contact" className={`${styles.btn} ${styles.btnSecondary}`}>Contact Us</Link>
        </div>
        <div className={styles.links}>
          <Link href="/for-facilities">For Facilities</Link>
          <Link href="/for-cnas">Our Network</Link>
          <Link href="/referral">Referral Pipeline</Link>
        </div>
      </div>
    </div>
  );
}
