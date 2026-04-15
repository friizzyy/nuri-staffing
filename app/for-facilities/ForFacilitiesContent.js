'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import useScrollReveal from '../../hooks/useScrollReveal'
import useCountUp from '../../hooks/useCountUp'
import './for-facilities.css'

export default function ForFacilitiesContent() {
  useScrollReveal()
  useCountUp()

  useEffect(() => {
    // ACCORDION
    const items = document.querySelectorAll('.accordion-item')
    const firstOpen = document.querySelector('.accordion-item.open')
    if (firstOpen) {
      const firstBody = firstOpen.querySelector('.accordion-body')
      firstBody.style.maxHeight = firstBody.scrollHeight + 'px'
    }
    const cleanups = []
    items.forEach((item) => {
      const trigger = item.querySelector('.accordion-trigger')
      const body = item.querySelector('.accordion-body')
      const handler = () => {
        const isOpen = item.classList.contains('open')
        items.forEach((i) => {
          i.classList.remove('open')
          i.querySelector('.accordion-body').style.maxHeight = '0px'
          i.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false')
        })
        if (!isOpen) {
          item.classList.add('open')
          body.style.maxHeight = body.scrollHeight + 'px'
          trigger.setAttribute('aria-expanded', 'true')
        }
      }
      trigger.addEventListener('click', handler)
      cleanups.push(() => trigger.removeEventListener('click', handler))
    })

    return () => {
      cleanups.forEach((fn) => fn())
    }
  }, [])

  return (
    <div className="page-facilities">
      {/* HERO */}
      <section className="hero" id="main" tabIndex={-1}>
        <div className="hero-bg-photo">
          <img
            src="/hero-facility.jpg"
            alt="Modern healthcare facility hallway"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </div>
        <div className="hero-inner">
          <div className="hero-eyebrow reveal">For Care Facilities</div>
          <h1 className="hero-headline reveal reveal-delay-1">
            Stop chasing coverage.<br />
            Start <em>expecting</em> it.
          </h1>
          <p className="hero-sub reveal reveal-delay-2">
            Credential-verified CNAs delivered to your facility within 48 hours.
            Every placement is human-reviewed, every credential confirmed.
          </p>
          <div className="hero-ctas reveal reveal-delay-3">
            <Link href="/contact?role=facility" className="btn-primary">
              Request Coverage
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <a href="#how-it-works" className="btn-secondary">
              How It Works
            </a>
          </div>
          <div className="hero-proof reveal reveal-delay-4">
            <div className="hero-proof-item">
              <div className="hero-proof-num">
                <span data-target="118" data-suffix="+">0</span>
              </div>
              <div className="hero-proof-label">Verified CNAs</div>
            </div>
            <div className="hero-proof-divider"></div>
            <div className="hero-proof-item">
              <div className="hero-proof-num">
                <span data-target="48" data-suffix="hr">0</span>
              </div>
              <div className="hero-proof-label">Avg. Fill Time</div>
            </div>
            <div className="hero-proof-divider"></div>
            <div className="hero-proof-item">
              <div className="hero-proof-num">
                <span data-target="98.4" data-suffix="%">0</span>
              </div>
              <div className="hero-proof-label">Placement Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — Process Timeline */}
      <section className="how-works section" id="how-it-works">
        <div className="how-works-header">
          <div className="section-eyebrow reveal">How It Works</div>
          <h2 className="section-title reveal reveal-delay-1">
            Coverage in three steps.<br />
            No staffing board required.
          </h2>
          <p className="section-sub reveal reveal-delay-2">
            You tell us the need. We match, verify, and confirm. One contact, one
            reliable process.
          </p>
        </div>
        <div className="facilities-timeline reveal">
          <div className="facilities-timeline-line" aria-hidden="true"></div>
          <div className="facilities-timeline-step">
            <div className="facilities-timeline-marker">01</div>
            <div className="facilities-timeline-content">
              <div className="facilities-timeline-icon">
                <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="6" y="8" width="32" height="28" rx="2" />
                  <line x1="14" y1="4" x2="14" y2="12" />
                  <line x1="30" y1="4" x2="30" y2="12" />
                  <line x1="6" y1="18" x2="38" y2="18" />
                  <line x1="14" y1="26" x2="22" y2="26" />
                  <line x1="14" y1="30" x2="18" y2="30" />
                </svg>
              </div>
              <div className="facilities-timeline-title">Tell Us What You Need</div>
              <div className="facilities-timeline-desc">
                Shift dates, unit type, acuity level, any specific requirements.
                Takes under five minutes. Our team reviews it within the hour during business hours.
              </div>
              <div className="facilities-timeline-badge">Under 5 min</div>
            </div>
          </div>
          <div className="facilities-timeline-step">
            <div className="facilities-timeline-marker">02</div>
            <div className="facilities-timeline-content">
              <div className="facilities-timeline-icon">
                <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="16" r="8" />
                  <path d="M26 30c0-4.418-3.582-8-8-8" />
                  <circle cx="34" cy="12" r="5" />
                  <path d="M32 12h4M34 10v4" />
                  <line x1="30" y1="32" x2="38" y2="38" />
                </svg>
              </div>
              <div className="facilities-timeline-title">Human Match Review</div>
              <div className="facilities-timeline-desc">
                A Nuri coordinator reviews our verified roster for your area.
                Experience, shift history, facility fit. No algorithm. A real person makes the match.
              </div>
              <div className="facilities-timeline-badge">Same business day</div>
            </div>
          </div>
          <div className="facilities-timeline-step">
            <div className="facilities-timeline-marker">03</div>
            <div className="facilities-timeline-content">
              <div className="facilities-timeline-icon">
                <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="22" cy="22" r="16" />
                  <polyline points="15 22 20 27 29 16" />
                </svg>
              </div>
              <div className="facilities-timeline-title">Confirmed Coverage</div>
              <div className="facilities-timeline-desc">
                You receive a confirmation with the CNA&apos;s name, credential
                summary, and contact info. The CNA arrives briefed on your
                facility&apos;s protocols. Both sides prepared before day one.
              </div>
              <div className="facilities-timeline-badge">Within 48 hours</div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services section" id="services">
        <div className="services-split">
          <div className="services-split-left">
            <div className="section-eyebrow reveal">What We Offer</div>
            <h2 className="section-title reveal reveal-delay-1">
              Staffing that fits<br />
              how you operate.
            </h2>
            <p className="section-sub reveal reveal-delay-2">
              Flexible coverage models built for facilities that need reliable
              CNAs without long-term commitments.
            </p>
          </div>
          <div>
            <div className="accordion-list">
              {/* Per-Diem */}
              <div className="accordion-item open">
                <button className="accordion-trigger" aria-expanded="true">
                  <span className="accordion-trigger-title">
                    Per-Diem Shift Coverage
                  </span>
                  <svg
                    className="accordion-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
                <div className="accordion-body" style={{ maxHeight: '200px' }}>
                  <div className="accordion-body-inner">
                    <svg
                      className="accordion-body-icon"
                      viewBox="0 0 40 40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="4" y="6" width="32" height="28" rx="2" />
                      <line x1="4" y1="14" x2="36" y2="14" />
                      <line x1="12" y1="2" x2="12" y2="10" />
                      <line x1="28" y1="2" x2="28" y2="10" />
                      <rect x="10" y="20" width="6" height="6" rx="1" />
                      <rect x="22" y="20" width="6" height="6" rx="1" />
                    </svg>
                    <div>
                      <div className="accordion-body-text">
                        One shift or a hundred. Request same-day or two weeks out.
                        We pull from our verified network and match based on your
                        floor&apos;s acuity level and any prior facility
                        experience. No minimum commitment required.
                      </div>
                      <div className="accordion-body-tag">
                        No Minimum Commitment
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Short-Term Contract */}
              <div className="accordion-item">
                <button className="accordion-trigger" aria-expanded="false">
                  <span className="accordion-trigger-title">
                    Short-Term Contract Staffing
                  </span>
                  <svg
                    className="accordion-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
                <div className="accordion-body">
                  <div className="accordion-body-inner">
                    <svg
                      className="accordion-body-icon"
                      viewBox="0 0 40 40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M8 36V8a2 2 0 012-2h20a2 2 0 012 2v28" />
                      <line x1="4" y1="36" x2="36" y2="36" />
                      <line x1="14" y1="12" x2="26" y2="12" />
                      <line x1="14" y1="18" x2="26" y2="18" />
                      <rect x="16" y="26" width="8" height="10" />
                    </svg>
                    <div>
                      <div className="accordion-body-text">
                        Two weeks to six months. Ideal for LOA coverage, census
                        spikes, or while you recruit permanent staff. CNAs placed
                        on short-term contracts go through the same full credential
                        verification with an additional facility orientation check.
                      </div>
                      <div className="accordion-body-tag">
                        2 Weeks to 6 Months
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Float Pool */}
              <div className="accordion-item">
                <button className="accordion-trigger" aria-expanded="false">
                  <span className="accordion-trigger-title">
                    Float Pool Management
                  </span>
                  <svg
                    className="accordion-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
                <div className="accordion-body">
                  <div className="accordion-body-inner">
                    <svg
                      className="accordion-body-icon"
                      viewBox="0 0 40 40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="20" cy="12" r="6" />
                      <circle cx="7" cy="28" r="4" />
                      <circle cx="33" cy="28" r="4" />
                      <line x1="14" y1="17" x2="9" y2="24" />
                      <line x1="26" y1="17" x2="31" y2="24" />
                    </svg>
                    <div>
                      <div className="accordion-body-text">
                        For multi-site operators: we build and manage a dedicated
                        pool of CNAs familiar with your facilities. When you need
                        coverage across locations, we route from a pre-cleared
                        roster.
                      </div>
                      <div className="accordion-body-tag">Multi-Site Ready</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency */}
              <div className="accordion-item">
                <button className="accordion-trigger" aria-expanded="false">
                  <span className="accordion-trigger-title">
                    Emergency &amp; After-Hours Coverage
                  </span>
                  <svg
                    className="accordion-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
                <div className="accordion-body">
                  <div className="accordion-body-inner">
                    <svg
                      className="accordion-body-icon"
                      viewBox="0 0 40 40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="20" cy="20" r="16" />
                      <line x1="20" y1="10" x2="20" y2="20" />
                      <line x1="20" y1="20" x2="28" y2="26" />
                      <circle cx="20" cy="20" r="2" fill="currentColor" />
                    </svg>
                    <div>
                      <div className="accordion-body-text">
                        No-show at 6am. Call-out at 10pm. We keep an on-call
                        coordinator and an emergency-ready CNA roster for exactly
                        these moments. Every emergency placement is still a
                        verified CNA.
                      </div>
                      <div className="accordion-body-tag">On-Call Response</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST / CREDENTIAL LEDGER */}
      <section className="trust-panel section" id="trust">
        <div className="trust-strip">Verified Placement Data</div>
        <div className="trust-ledger reveal">
          <div className="trust-ledger-cards">
            <div className="trust-ledger-card">
              <div className="trust-ledger-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 21h18M9 8h1M9 12h1M9 16h1M14 8h1M14 12h1M14 16h1M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16" />
                </svg>
              </div>
              <div className="trust-ledger-number">
                <span data-target="47">0</span>
              </div>
              <div className="trust-ledger-name">Skilled Nursing Facilities</div>
              <div className="trust-ledger-badge">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4 8 7 11 12 5" />
                </svg>
                Verified
              </div>
            </div>
            <div className="trust-ledger-divider" aria-hidden="true"></div>
            <div className="trust-ledger-card">
              <div className="trust-ledger-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 21l9-9 9 9M5 21V10l7-7 7 7v11" />
                </svg>
              </div>
              <div className="trust-ledger-number">
                <span data-target="31">0</span>
              </div>
              <div className="trust-ledger-name">Assisted Living Communities</div>
              <div className="trust-ledger-badge">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4 8 7 11 12 5" />
                </svg>
                Verified
              </div>
            </div>
            <div className="trust-ledger-divider" aria-hidden="true"></div>
            <div className="trust-ledger-card">
              <div className="trust-ledger-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
              </div>
              <div className="trust-ledger-number">
                <span data-target="22">0</span>
              </div>
              <div className="trust-ledger-name">Outpatient Clinics</div>
              <div className="trust-ledger-badge">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4 8 7 11 12 5" />
                </svg>
                Verified
              </div>
            </div>
            <div className="trust-ledger-divider" aria-hidden="true"></div>
            <div className="trust-ledger-card">
              <div className="trust-ledger-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              </div>
              <div className="trust-ledger-number">
                <span data-target="18">0</span>
              </div>
              <div className="trust-ledger-name">Rehabilitation Centers</div>
              <div className="trust-ledger-badge">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4 8 7 11 12 5" />
                </svg>
                Verified
              </div>
            </div>
          </div>
          <div className="trust-meta">
            <div className="trust-meta-text">
              Data reflects Northern California placements
            </div>
            <div className="trust-meta-badges">
              <div className="trust-badge">CA DPH Compliant</div>
              <div className="trust-badge">CDPH Registry Verified</div>
              <div className="trust-badge">HIPAA Aware</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="facilities-cta section">
        <div className="facilities-cta-inner reveal">
          <div className="section-eyebrow" style={{ justifyContent: 'center' }}>Get Started</div>
          <h2 className="section-title" style={{ textAlign: 'center' }}>
            Ready to fill your open shifts?
          </h2>
          <p className="section-sub" style={{ textAlign: 'center', margin: '0 auto 32px' }}>
            Tell us what you need and a Nuri coordinator will follow up within 2 business hours.
          </p>
          <div style={{ textAlign: 'center' }}>
            <Link href="/contact?role=facility" className="btn-amber">
              Request Coverage
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
          <div className="facilities-cta-contact reveal reveal-delay-1">
            Prefer to talk? Call us at <a href="tel:+14086214061">(408) 621-4061</a>
          </div>
        </div>
      </section>
    </div>
  )
}
