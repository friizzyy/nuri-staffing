'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import useScrollReveal from '../../hooks/useScrollReveal'
import './referral.css'

export default function ReferralContent() {
  const canvasRef = useRef(null)
  const calcNumberRef = useRef(null)
  const calcGhostRef = useRef(null)
  const calcBreakdownRef = useRef(null)
  const animFrameRef = useRef(null)
  const currentDisplayRef = useRef(0)

  const [referrals, setReferrals] = useState(3)
  const [hours, setHours] = useState(36)
  const [percent, setPercent] = useState(3)
  const [months, setMonths] = useState(2)
  const [glowing, setGlowing] = useState(false)

  const billRate = 28

  useScrollReveal()

  // Animate number display
  const animateNumber = useCallback((target) => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    const start = currentDisplayRef.current
    const diff = target - start
    const duration = 600
    const startTime = performance.now()

    function tick(now) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      const current = start + diff * ease
      currentDisplayRef.current = current
      if (calcNumberRef.current) {
        calcNumberRef.current.textContent = '$' + Math.round(current).toLocaleString('en-US')
      }
      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(tick)
      }
    }
    animFrameRef.current = requestAnimationFrame(tick)
  }, [])

  // Calculate earnings
  const calculate = useCallback(() => {
    const refs = parseFloat(referrals) || 0
    const hrs = parseFloat(hours) || 0
    const pct = parseFloat(percent) || 0

    const totalHours = hrs * 4 * months
    let earnings = refs * totalHours * billRate * (pct / 100)
    earnings = Math.round(earnings * 100) / 100

    // Update breakdown
    if (calcBreakdownRef.current) {
      calcBreakdownRef.current.textContent =
        refs + ' referral' + (refs !== 1 ? 's' : '') +
        ' \u00D7 ' + hrs + ' hrs/week \u00D7 ' + months + ' month' + (months !== 1 ? 's' : '') +
        ' \u00D7 ' + pct + '% = $' + earnings.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
    }

    // Update ghost
    if (calcGhostRef.current) {
      calcGhostRef.current.textContent = '$' + Math.round(earnings).toLocaleString()
    }

    // Animate number
    animateNumber(earnings)

    // Glow pulse
    setGlowing(true)
    setTimeout(() => setGlowing(false), 500)
  }, [referrals, hours, percent, months, animateNumber])

  // Recalculate on input change
  useEffect(() => {
    calculate()
  }, [calculate])

  // Network canvas — earnings flow inward from referrals to YOU
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    let W, H
    let particles = []
    let running = true

    const center = { x: 0.5, y: 0.5 }
    const nodes = [
      { x: 0.5, y: 0.07 },
      { x: 0.88, y: 0.27 },
      { x: 0.88, y: 0.73 },
      { x: 0.5, y: 0.93 },
      { x: 0.12, y: 0.73 },
      { x: 0.12, y: 0.27 },
    ]

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect()
      W = rect.width
      H = rect.height
      canvas.width = W * dpr
      canvas.height = H * dpr
      canvas.style.width = W + 'px'
      canvas.style.height = H + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function spawnParticle() {
      // Always spawn at an outer node, always travel inward toward YOU
      const ni = Math.floor(Math.random() * nodes.length)
      particles.push({
        ni,
        t: 0,                                    // start at outer node
        speed: 0.004 + Math.random() * 0.003,    // move toward center
        size: 2 + Math.random() * 1.5,
      })
    }

    function draw() {
      if (!running) return
      ctx.clearRect(0, 0, W, H)
      const cx = center.x * W
      const cy = center.y * H

      // Connection lines — subtle dashed paths
      nodes.forEach((n) => {
        const nx = n.x * W
        const ny = n.y * H
        ctx.beginPath()
        ctx.setLineDash([4, 6])
        ctx.moveTo(nx, ny)
        ctx.lineTo(cx, cy)
        ctx.strokeStyle = 'rgba(74, 64, 99, 0.08)'
        ctx.lineWidth = 1
        ctx.stroke()
        ctx.setLineDash([])
      })

      // Particles — earnings flowing inward
      particles.forEach((p) => {
        p.t += p.speed
        const n = nodes[p.ni]
        const nx = n.x * W
        const ny = n.y * H
        const t = Math.min(p.t, 1)

        // Position: lerp from outer node toward center
        const px = nx + (cx - nx) * t
        const py = ny + (cy - ny) * t

        // Fade in at start, fade out at end
        const fadeIn = t < 0.15 ? t / 0.15 : 1
        const fadeOut = t > 0.85 ? (1 - t) / 0.15 : 1
        const alpha = fadeIn * fadeOut * 0.7

        // Amber dot — earnings
        ctx.beginPath()
        ctx.arc(px, py, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(212, 114, 122, ${alpha.toFixed(3)})`
        ctx.fill()

        // Soft glow
        if (alpha > 0.3) {
          ctx.beginPath()
          ctx.arc(px, py, p.size + 4, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(212, 114, 122, ${(alpha * 0.15).toFixed(3)})`
          ctx.fill()
        }
      })

      particles = particles.filter((p) => p.t < 1)
      requestAnimationFrame(draw)
    }

    resize()
    draw()
    // Stagger spawns so particles appear from different nodes at different times
    const spawnInterval = setInterval(() => {
      if (particles.length < 10) spawnParticle()
    }, 500)
    window.addEventListener('resize', resize, { passive: true })

    return () => {
      running = false
      clearInterval(spawnInterval)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="page-referral">
      {/* HERO */}
      <section className="hero" id="main" tabIndex={-1}>
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-eyebrow reveal">Referral-Driven Sourcing</div>
            <h1 className="hero-headline reveal reveal-delay-1">
              Better talent through<br />trusted <em>referrals.</em>
            </h1>
            <p className="hero-sub reveal reveal-delay-2">
              The best CNAs know other great CNAs. Refer someone you trust and earn rewards for every successful placement.
            </p>
            <div className="hero-ctas reveal reveal-delay-3">
              <a href="#calculator" className="btn-primary">
                Calculate Your Earnings
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
              <a href="#how-it-works" className="btn-secondary">How It Works</a>
            </div>
          </div>
          <div className="hero-visual reveal reveal-delay-2">
            <div className="hero-network">
              <canvas className="hero-network-canvas" ref={canvasRef}></canvas>
              <div className="hero-node center">
                <div className="hero-node-ring"></div>
                <div className="hero-node-avatar you">YOU</div>
                <div className="hero-node-label">Referrer</div>
                <div className="hero-node-tag">$879/mo total</div>
              </div>
              <div className="hero-node n1">
                <div className="hero-node-avatar">MS</div>
                <div className="hero-node-label">Maria S.</div>
                <div className="hero-node-earning">+$156</div>
              </div>
              <div className="hero-node n2">
                <div className="hero-node-avatar">DM</div>
                <div className="hero-node-label">DeShawn M.</div>
                <div className="hero-node-earning">+$134</div>
              </div>
              <div className="hero-node n3">
                <div className="hero-node-avatar">PS</div>
                <div className="hero-node-label">Priya S.</div>
                <div className="hero-node-earning">+$168</div>
              </div>
              <div className="hero-node n4">
                <div className="hero-node-avatar">JO</div>
                <div className="hero-node-label">James O.</div>
                <div className="hero-node-earning">+$142</div>
              </div>
              <div className="hero-node n5">
                <div className="hero-node-avatar">LT</div>
                <div className="hero-node-label">Linda T.</div>
                <div className="hero-node-earning">+$151</div>
              </div>
              <div className="hero-node n6">
                <div className="hero-node-avatar">RK</div>
                <div className="hero-node-label">Rachel K.</div>
                <div className="hero-node-earning">+$128</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-works section" id="how-it-works">
        <div className="how-works-header reveal">
          <div className="how-works-label">How It Works</div>
          <h2 className="how-works-title">Three steps. <em>Ongoing rewards.</em></h2>
        </div>
        <div className="pipeline-flow reveal">
          <div className="pipeline-step">
            <div className="pipeline-step-left">
              <div className="pipeline-step-number">01</div>
            </div>
            <div className="pipeline-step-content">
              <div className="pipeline-step-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="8" r="4" />
                  <path d="M16 10a3 3 0 110 0" />
                  <path d="M3 21c0-3.5 2.7-6 6-6s6 2.5 6 6" />
                  <line x1="19" y1="8" x2="19" y2="14" />
                  <line x1="16" y1="11" x2="22" y2="11" />
                </svg>
              </div>
              <div className="pipeline-step-title">Refer a Trusted CNA</div>
              <div className="pipeline-step-desc">Know a great CNA? Submit their name and contact info. We only accept referrals from active network members.</div>
            </div>
          </div>
          <div className="pipeline-step">
            <div className="pipeline-step-left">
              <div className="pipeline-step-number">02</div>
            </div>
            <div className="pipeline-step-content">
              <div className="pipeline-step-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
              </div>
              <div className="pipeline-step-title">We Verify &amp; Onboard</div>
              <div className="pipeline-step-desc">Your referral goes through full credential verification, background check, and onboarding. Same standards as everyone.</div>
            </div>
          </div>
          <div className="pipeline-step">
            <div className="pipeline-step-left">
              <div className="pipeline-step-number">03</div>
            </div>
            <div className="pipeline-step-content">
              <div className="pipeline-step-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                </svg>
              </div>
              <div className="pipeline-step-title">You Earn, They Work</div>
              <div className="pipeline-step-desc">Once they start picking up shifts, you earn a percentage of every hour they work. Ongoing, not one-time.</div>
            </div>
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section className="calc-section section" id="calculator">
        <div className="calc-header">
          <div className="section-eyebrow reveal">Network Growth Calculator</div>
          <h2 className="section-title reveal reveal-delay-1">
            See how referrals expand<br />your coverage capacity.
          </h2>
          <p className="section-sub reveal reveal-delay-2" style={{ margin: '12px auto 0' }}>
            Every referred CNA who passes verification adds hours of available coverage to the network. Here&apos;s the math.
          </p>
        </div>

        <div className="calc-card reveal reveal-delay-2">
          <div className="calc-inputs">
            <div className="calc-field">
              <label className="calc-label" htmlFor="calcReferrals">New CNAs added via referral</label>
              <input
                type="number"
                className="calc-input"
                id="calcReferrals"
                placeholder="e.g. 3"
                min="0"
                max="100"
                value={referrals}
                onChange={(e) => setReferrals(e.target.value)}
              />
            </div>
            <div className="calc-field">
              <label className="calc-label" htmlFor="calcHours">Average hours available per week</label>
              <input
                type="number"
                className="calc-input"
                id="calcHours"
                placeholder="e.g. 36"
                min="0"
                max="80"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
              />
            </div>
            <div className="calc-field">
              <label className="calc-label" htmlFor="calcPercent">Referral incentive rate (%)</label>
              <input
                type="number"
                className="calc-input"
                id="calcPercent"
                placeholder="e.g. 3"
                min="0"
                max="20"
                step="0.5"
                value={percent}
                onChange={(e) => setPercent(e.target.value)}
              />
            </div>
            <div className="calc-field">
              <label className="calc-label">Time period</label>
              <div className="calc-toggle-wrap">
                {[
                  { label: '1 month', value: 1 },
                  { label: '2 months', value: 2 },
                  { label: '3 months', value: 3 },
                  { label: '6 months', value: 6 },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    className={`calc-toggle-btn${months === opt.value ? ' active' : ''}`}
                    onClick={() => setMonths(opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="calc-result">
            <div className="calc-result-ghost" ref={calcGhostRef}>EARNINGS</div>
            <div className="calc-result-label">Your Referral Earnings</div>
            <div
              className={`calc-result-number${glowing ? ' glow' : ''}`}
              ref={calcNumberRef}
            >
              $0
            </div>
            <div className="calc-result-breakdown" ref={calcBreakdownRef}>
              0 referrals &times; 0 hrs/week &times; 0 months &times; 0% = $0
            </div>
            <div className="calc-result-sub">Based on $28/hr average bill rate</div>
            <div className="calc-result-cta">
              <a href="mailto:hello@nuristaffing.com?subject=Referral Program Inquiry" className="btn-amber">
                Start Referring
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-section" id="cta">
        <div className="cta-inner reveal">
          <div className="cta-left">
            <div className="cta-eyebrow">Start Earning</div>
            <h2 className="cta-title">Know great CNAs?<br />Refer them today.</h2>
            <p className="cta-sub">
              Know talented CNAs? Refer them to Nuri and earn rewards for every successful placement.
            </p>
            <div className="cta-trust-row">
              <div className="cta-trust-item">
                <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                Easy referral process
              </div>
              <div className="cta-trust-item">
                <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                Ongoing earnings
              </div>
              <div className="cta-trust-item">
                <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                No cap on referrals
              </div>
            </div>
          </div>
          <div className="cta-right">
            <a href="mailto:hello@nuristaffing.com?subject=Referral Program Inquiry" className="btn-amber">Start Referring</a>
            <a href="tel:+14086214061" className="btn-ghost-white">Talk to us: (408) 621-4061</a>
          </div>
        </div>
      </section>
    </div>
  )
}
