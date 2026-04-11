'use client'

import Link from 'next/link'
import useScrollReveal from '../../hooks/useScrollReveal'
import './for-cnas.css'

export default function ForCNAsContent() {
  useScrollReveal()

  return (
    <div className="page-cnas">
      {/* HERO */}
      <section className="hero" id="main" tabIndex={-1}>
        <div className="hero-bg-photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=1400&q=80"
            alt="CNA walking into healthcare facility for shift"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </div>
        <div className="hero-inner">
          <div className="hero-eyebrow reveal">Join Our Network</div>
          <h1 className="hero-headline reveal reveal-delay-1">
            Pick up shifts on <em>your terms.</em>
          </h1>
          <p className="hero-sub reveal reveal-delay-2">
            Flexible scheduling, weekly pay, and facilities that respect your work. Join a CNA network built around what matters to you.
          </p>
          <div className="hero-ctas reveal reveal-delay-3">
            <Link href="/contact?role=cna" className="btn-primary">
              Apply Now
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <a href="#benefits" className="btn-secondary">Why Nuri</a>
          </div>
        </div>
      </section>

      {/* BENEFITS — Editorial Rows */}
      <section className="benefits section" id="benefits">
        <div className="benefits-header">
          <div className="section-eyebrow reveal">Why Nuri</div>
          <h2 className="section-title reveal reveal-delay-1">
            Built around what<br />matters to you.
          </h2>
          <p className="section-sub reveal reveal-delay-2" style={{ margin: '12px auto 0' }}>
            Good shifts, reliable pay, and a team that has your back. Here&apos;s what working with Nuri looks like.
          </p>
        </div>
        <div className="benefits-grid reveal">
          <div className="benefit-card">
            <div className="benefit-card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="3" y1="10" x2="21" y2="10" />
                <line x1="9" y1="2" x2="9" y2="6" />
                <line x1="15" y1="2" x2="15" y2="6" />
              </svg>
            </div>
            <div className="benefit-card-content">
              <div className="benefit-card-title">Choose Your Shifts</div>
              <div className="benefit-card-desc">You pick the shifts that fit your life. No forced assignments, no pressure. Work when you want, where you want.</div>
            </div>
          </div>
          <div className="benefit-card">
            <div className="benefit-card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="5" />
                <path d="M3 21c0-4.418 4.03-8 9-8s9 3.582 9 8" />
              </svg>
            </div>
            <div className="benefit-card-content">
              <div className="benefit-card-title">Know Before You Go</div>
              <div className="benefit-card-desc">Get facility details, parking info, and your point of contact before every shift. Show up ready, not guessing.</div>
            </div>
          </div>
          <div className="benefit-card">
            <div className="benefit-card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
              </svg>
            </div>
            <div className="benefit-card-content">
              <div className="benefit-card-title">Weekly Direct Deposit</div>
              <div className="benefit-card-desc">Get paid every week, straight to your bank. No delays, no runaround. You work, you get paid.</div>
            </div>
          </div>
          <div className="benefit-card">
            <div className="benefit-card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
            </div>
            <div className="benefit-card-content">
              <div className="benefit-card-title">We Handle Your Credentials</div>
              <div className="benefit-card-desc">We track your license, CPR, and background check renewals. You&apos;ll get reminders well before anything lapses.</div>
            </div>
          </div>
        </div>
      </section>

      {/* REFERRAL BANNER */}
      <section className="referral-banner section">
        <div className="referral-banner-inner reveal">
          <div className="referral-banner-content">
            <div className="section-eyebrow">Referral Program</div>
            <h2 className="section-title">
              Know a great CNA?<br />Earn when you refer.
            </h2>
            <p>Our referral program rewards you for bringing in CNAs you trust. Good people know good people.</p>
          </div>
          <div className="referral-banner-cta">
            <Link href="/referral" className="btn-primary">
              Learn More
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cnas-cta section">
        <div className="cnas-cta-inner reveal">
          <div className="section-eyebrow" style={{ justifyContent: 'center' }}>Get Started</div>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Ready to join?</h2>
          <p className="section-sub" style={{ textAlign: 'center', margin: '0 auto 32px' }}>
            Tell us about yourself and we&apos;ll get you picking up shifts in no time.
          </p>
          <div style={{ textAlign: 'center' }}>
            <Link href="/contact?role=cna" className="btn-amber">
              Apply Now
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
          <div className="cnas-cta-contact reveal reveal-delay-1">
            Prefer to talk? Call us at <a href="tel:+14086214061">(408) 621-4061</a>
          </div>
        </div>
      </section>
    </div>
  )
}
