'use client';

import { useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import useScrollReveal from '../hooks/useScrollReveal';
import useCountUp from '../hooks/useCountUp';
import '../app/home.css';

export default function HomeContent() {
  const canvasRef = useRef(null);
  const credentialEngineRef = useRef(null);
  const animationFrameRef = useRef(null);
  const spawnIntervalRef = useRef(null);

  useScrollReveal();
  useCountUp();

  // ============================================================
  // DATA FLOW CANVAS
  // ============================================================
  const initDataFlowCanvas = useCallback(() => {
    if (window.matchMedia('(max-width: 768px)').matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    let W, H;
    let cnaNodes = [], facilityNodes = [], flowParticles = [];

    const cnaLabels = ['M. Torres','R. Chen','A. Williams','J. Patel','S. Kim','L. Davis'];
    const facilityLabels = ['SF General','Kaiser Oakland','Stanford Med','Eden Medical','Good Sam SJ','El Camino'];

    function buildNodes() {
      cnaNodes = []; facilityNodes = [];
      const leftX = W * 0.12;
      const rightX = W * 0.88;
      const topPad = H * 0.18;
      const usable = H * 0.64;
      for (let i = 0; i < cnaLabels.length; i++) {
        const y = topPad + (usable / (cnaLabels.length - 1)) * i;
        cnaNodes.push({ x: leftX, y: y, label: cnaLabels[i] });
      }
      for (let j = 0; j < facilityLabels.length; j++) {
        const fy = topPad + (usable / (facilityLabels.length - 1)) * j;
        facilityNodes.push({ x: rightX, y: fy, label: facilityLabels[j] });
      }
    }

    function resize() {
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildNodes();
    }

    function spawnParticle() {
      const fi = Math.floor(Math.random() * cnaNodes.length);
      const ti = Math.floor(Math.random() * facilityNodes.length);
      flowParticles.push({
        fi: fi, ti: ti, t: 0,
        speed: 0.004 + Math.random() * 0.003,
        size: 2 + Math.random() * 1
      });
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      // Lines between same-side nodes (subtle structure)
      ctx.lineWidth = 0.5;
      for (let i = 0; i < cnaNodes.length - 1; i++) {
        ctx.beginPath();
        ctx.moveTo(cnaNodes[i].x, cnaNodes[i].y);
        ctx.lineTo(cnaNodes[i+1].x, cnaNodes[i+1].y);
        ctx.strokeStyle = 'rgba(26,43,74,0.06)';
        ctx.stroke();
      }
      for (let j = 0; j < facilityNodes.length - 1; j++) {
        ctx.beginPath();
        ctx.moveTo(facilityNodes[j].x, facilityNodes[j].y);
        ctx.lineTo(facilityNodes[j+1].x, facilityNodes[j+1].y);
        ctx.strokeStyle = 'rgba(26,43,74,0.06)';
        ctx.stroke();
      }

      // CNA nodes
      cnaNodes.forEach(function(n) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(26,43,74,0.8)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.8)';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.font = '500 9px JetBrains Mono, monospace';
        ctx.fillStyle = 'rgba(26,43,74,0.5)';
        ctx.textAlign = 'right';
        ctx.fillText(n.label, n.x - 14, n.y + 3);
      });

      // Facility nodes
      facilityNodes.forEach(function(n) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(26,43,74,0.8)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.8)';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.font = '500 9px JetBrains Mono, monospace';
        ctx.fillStyle = 'rgba(26,43,74,0.5)';
        ctx.textAlign = 'left';
        ctx.fillText(n.label, n.x + 14, n.y + 3);
      });

      // Flow particles (left -> right)
      flowParticles.forEach(function(p) {
        p.t = Math.min(p.t + p.speed, 1);
        const from = cnaNodes[p.fi], to = facilityNodes[p.ti];
        const cx = W * 0.5, cy = (from.y + to.y) / 2 + (Math.random() - 0.5) * 0.5;
        const t = p.t;
        const px = (1-t)*(1-t)*from.x + 2*(1-t)*t*cx + t*t*to.x;
        const py = (1-t)*(1-t)*from.y + 2*(1-t)*t*cy + t*t*to.y;
        const fadeAlpha = t < 0.1 ? t / 0.1 : t > 0.9 ? (1 - t) / 0.1 : 1;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(212,114,122,' + (0.7 * fadeAlpha).toFixed(3) + ')';
        ctx.fill();
      });
      flowParticles = flowParticles.filter(function(p) { return p.t < 1; });

      animationFrameRef.current = requestAnimationFrame(draw);
    }

    function start() {
      resize();
      draw();
      for (let i = 0; i < 3; i++) setTimeout(spawnParticle, i * 500);
      spawnIntervalRef.current = setInterval(function() {
        if (flowParticles.length < 6) spawnParticle();
      }, 900);
      setTimeout(function() { canvas.style.opacity = '0.6'; }, 400);
    }

    const handleResize = function() { resize(); };
    window.addEventListener('resize', handleResize, { passive: true });

    const io = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          start();
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    io.observe(canvas);

    return () => {
      window.removeEventListener('resize', handleResize);
      io.disconnect();
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (spawnIntervalRef.current) clearInterval(spawnIntervalRef.current);
    };
  }, []);

  // ============================================================
  // CREDENTIAL VERIFICATION ENGINE
  // ============================================================
  const initCredentialEngine = useCallback(() => {
    const cnas = [
      { name: 'Maria Santos', initials: 'MS', meta: 'CNA \u00b7 6 yrs \u00b7 San Jose', license: 'VERIFIED', bg: 'CLEAR', cpr: 'CURRENT', refs: '3/3 CONFIRMED' },
      { name: 'DeShawn Mitchell', initials: 'DM', meta: 'CNA \u00b7 3 yrs \u00b7 Oakland', license: 'VERIFIED', bg: 'CLEAR', cpr: 'CURRENT', refs: '3/3 CONFIRMED' },
      { name: 'Priya Sharma', initials: 'PS', meta: 'CNA \u00b7 8 yrs \u00b7 Fremont', license: 'VERIFIED', bg: 'CLEAR', cpr: 'CURRENT', refs: '3/3 CONFIRMED' },
      { name: 'James Okafor', initials: 'JO', meta: 'CNA \u00b7 4 yrs \u00b7 Hayward', license: 'VERIFIED', bg: 'CLEAR', cpr: 'CURRENT', refs: '2/2 CONFIRMED' },
      { name: 'Linda Tran', initials: 'LT', meta: 'CNA \u00b7 5 yrs \u00b7 Sunnyvale', license: 'VERIFIED', bg: 'CLEAR', cpr: 'CURRENT', refs: '3/3 CONFIRMED' },
    ];
    const checks = ['license', 'background', 'cpr', 'refs'];
    const checkSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="var(--amber)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
    const spinSvg = '<svg viewBox="0 0 24 24" fill="none" stroke-width="3"><circle cx="12" cy="12" r="8" stroke="rgba(255,255,255,0.06)"/><path d="M12 4a8 8 0 0 1 8 8" stroke="rgba(255,255,255,0.35)"/></svg>';

    let currentCna = 0;
    let cycleTimeout = null;
    let checkTimeouts = [];
    let disposed = false;

    function resetAll() {
      checks.forEach(function(c) {
        const icon = document.getElementById('icon-' + c);
        const status = document.getElementById('status-' + c);
        const bar = document.getElementById('bar-' + c);
        if (icon) { icon.className = 'cred-check-icon pending'; icon.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="3"><circle cx="12" cy="12" r="8"/></svg>'; }
        if (status) { status.className = 'cred-status pending'; status.textContent = 'WAITING'; }
        if (bar) { bar.className = 'progress-fill'; bar.style.width = '0%'; }
      });
      const badge = document.getElementById('credBadge');
      if (badge) { badge.className = 'cred-footer-badge'; }
      const footerText = document.getElementById('credFooterText');
      if (footerText) footerText.textContent = 'VERIFYING CREDENTIALS...';
    }

    function loadProfile(cna) {
      const avatar = document.getElementById('credAvatar');
      const name = document.getElementById('credName');
      const meta = document.getElementById('credMeta');
      const profileStatus = document.getElementById('credProfileStatus');
      if (avatar) { avatar.textContent = cna.initials; avatar.classList.remove('skeleton'); avatar.classList.add('verifying'); }
      if (name) name.textContent = cna.name;
      if (meta) meta.textContent = cna.meta;
      if (profileStatus) { profileStatus.className = 'cred-profile-status verifying'; profileStatus.textContent = 'VERIFYING'; }
    }

    function runCheck(index, cna, cb) {
      if (disposed) return;
      if (index >= checks.length) { cb(); return; }
      const c = checks[index];
      const icon = document.getElementById('icon-' + c);
      const status = document.getElementById('status-' + c);
      const bar = document.getElementById('bar-' + c);

      // Start checking
      if (icon) { icon.className = 'cred-check-icon checking'; icon.innerHTML = spinSvg; }
      if (status) { status.className = 'cred-status checking'; status.textContent = 'CHECKING...'; }
      if (bar) { bar.className = 'progress-fill checking'; bar.style.width = '60%'; }

      const duration = 600 + Math.random() * 500;
      const t1 = setTimeout(function() {
        if (disposed) return;
        // Complete
        if (bar) { bar.style.width = '100%'; }
        const t2 = setTimeout(function() {
          if (disposed) return;
          if (icon) { icon.className = 'cred-check-icon done'; icon.innerHTML = checkSvg; }
          const result = c === 'license' ? cna.license : c === 'background' ? cna.bg : c === 'cpr' ? cna.cpr : cna.refs;
          if (status) { status.className = 'cred-status done'; status.textContent = result; }
          if (bar) { bar.className = 'progress-fill done'; }
          const t3 = setTimeout(function() { runCheck(index + 1, cna, cb); }, 200);
          checkTimeouts.push(t3);
        }, 200);
        checkTimeouts.push(t2);
      }, duration);
      checkTimeouts.push(t1);
    }

    function completeProfile() {
      const avatar = document.getElementById('credAvatar');
      const profileStatus = document.getElementById('credProfileStatus');
      const badge = document.getElementById('credBadge');
      const footerText = document.getElementById('credFooterText');
      if (avatar) avatar.classList.remove('verifying');
      if (profileStatus) { profileStatus.className = 'cred-profile-status verified'; profileStatus.textContent = 'VERIFIED'; }
      if (badge) badge.className = 'cred-footer-badge show';
      if (footerText) footerText.textContent = 'ALL CHECKS PASSED';
    }

    function runCycle() {
      if (disposed) return;
      const cna = cnas[currentCna % cnas.length];
      resetAll();
      loadProfile(cna);
      const t = setTimeout(function() {
        if (disposed) return;
        runCheck(0, cna, function() {
          completeProfile();
          currentCna++;
          cycleTimeout = setTimeout(runCycle, 3500);
        });
      }, 800);
      checkTimeouts.push(t);
    }

    // Start when panel is visible
    const panel = document.getElementById('credentialEngine');
    if (panel) {
      const obs = new IntersectionObserver(function(entries) {
        if (entries[0].isIntersecting) {
          obs.disconnect();
          setTimeout(runCycle, 600);
        }
      }, { threshold: 0.3 });
      obs.observe(panel);

      return () => {
        disposed = true;
        obs.disconnect();
        if (cycleTimeout) clearTimeout(cycleTimeout);
        checkTimeouts.forEach(t => clearTimeout(t));
      };
    }
  }, []);


  // ============================================================
  // ACCORDION
  // ============================================================
  const initAccordion = useCallback(() => {
    const items = document.querySelectorAll('.accordion-item');

    // Set initial open state height
    const firstOpen = document.querySelector('.accordion-item.open');
    if (firstOpen) {
      const firstBody = firstOpen.querySelector('.accordion-body');
      firstBody.style.maxHeight = firstBody.scrollHeight + 'px';
    }

    function handleClick(item, trigger, body) {
      return function() {
        const isOpen = item.classList.contains('open');
        // close all
        items.forEach(function(i) {
          i.classList.remove('open');
          i.querySelector('.accordion-body').style.maxHeight = '0px';
          i.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
        });
        // open clicked if it was closed
        if (!isOpen) {
          item.classList.add('open');
          body.style.maxHeight = body.scrollHeight + 'px';
          trigger.setAttribute('aria-expanded', 'true');
        }
      };
    }

    const cleanups = [];
    items.forEach(function(item) {
      const trigger = item.querySelector('.accordion-trigger');
      const body = item.querySelector('.accordion-body');
      const handler = handleClick(item, trigger, body);
      trigger.addEventListener('click', handler);
      cleanups.push(() => trigger.removeEventListener('click', handler));
    });

    return () => { cleanups.forEach(fn => fn()); };
  }, []);

  // ============================================================
  // STEP CARD IN-VIEW OBSERVER
  // ============================================================
  const initStepObserver = useCallback(() => {
    const steps = document.querySelectorAll('.step-card');
    if (steps.length === 0) return;

    const io = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -100px 0px' });

    steps.forEach(function(step) {
      io.observe(step);
    });

    return () => { io.disconnect(); };
  }, []);

  // ============================================================
  // MASTER useEffect
  // ============================================================
  useEffect(() => {
    const cleanups = [];

    const c1 = initDataFlowCanvas();
    if (c1) cleanups.push(c1);

    const c2 = initCredentialEngine();
    if (c2) cleanups.push(c2);

    const c5 = initAccordion();
    if (c5) cleanups.push(c5);

    const c6 = initStepObserver();
    if (c6) cleanups.push(c6);

    return () => {
      cleanups.forEach(fn => fn());
    };
  }, [initDataFlowCanvas, initCredentialEngine, initAccordion, initStepObserver]);

  return (
    <div className="page-home">
      {/* HERO */}
      <section className="hero" id="main" tabIndex={-1}>
        <canvas id="data-flow-canvas" ref={canvasRef}></canvas>

        {/* LEFT PANEL */}
        <div className="hero-left">
          <div className="hero-eyebrow">Northern California CNA Staffing</div>
          <h1 className="hero-headline">Your staffing gaps,<br />closed in <em>48 hours.</em></h1>
          <p className="hero-sub">Credential-verified CNAs delivered to your Northern California facility within 48 hours. Every placement is human-reviewed.</p>
          <div className="hero-ctas">
            <Link href="#contact" className="btn-primary">
              Request Coverage
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
            <Link href="#how-it-works" className="btn-secondary">See How It Works</Link>
          </div>
          <div className="hero-proof">
            <div className="hero-proof-item">
              <div className="hero-proof-num"><span data-target="118" data-suffix="+">0</span></div>
              <div className="hero-proof-label">Verified CNAs</div>
            </div>
            <div className="hero-proof-divider"></div>
            <div className="hero-proof-item">
              <div className="hero-proof-num"><span data-target="48" data-suffix="hr">0</span></div>
              <div className="hero-proof-label">Avg. Fill Time</div>
            </div>
            <div className="hero-proof-divider"></div>
            <div className="hero-proof-item">
              <div className="hero-proof-num"><span data-target="98.4" data-suffix="%">0</span></div>
              <div className="hero-proof-label">Placement Rate</div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="hero-right" id="credPanel">
          <div className="hero-right-bg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80" alt="CNA caregiver walking through Northern California care facility corridor" loading="eager" fetchPriority="high" decoding="async" />
          </div>
          <div className="credential-panel" id="credentialEngine" ref={credentialEngineRef}>
            <div className="credential-header">
              LIVE VERIFICATION
              <span className="cred-live-dot"></span>
            </div>
            <div className="cred-profile">
              <div className="cred-avatar skeleton" id="credAvatar"></div>
              <div className="cred-profile-info">
                <div className="cred-profile-name" id="credName">Initializing...</div>
                <div className="cred-profile-meta" id="credMeta"></div>
              </div>
              <span className="cred-profile-status verifying" id="credProfileStatus">QUEUED</span>
            </div>
            <div className="credential-stack" id="credStack">
              <div className="cred-item" data-check="license">
                <div className="cred-row">
                  <span className="cred-label">
                    <span className="cred-check-icon pending" id="icon-license">
                      <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="3"><circle cx="12" cy="12" r="8"/></svg>
                    </span>
                    CA State License
                  </span>
                  <span className="cred-status pending" id="status-license">WAITING</span>
                </div>
                <div className="progress-track"><div className="progress-fill" id="bar-license"></div></div>
              </div>
              <div className="cred-item" data-check="background">
                <div className="cred-row">
                  <span className="cred-label">
                    <span className="cred-check-icon pending" id="icon-background">
                      <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="3"><circle cx="12" cy="12" r="8"/></svg>
                    </span>
                    Background Check
                  </span>
                  <span className="cred-status pending" id="status-background">WAITING</span>
                </div>
                <div className="progress-track"><div className="progress-fill" id="bar-background"></div></div>
              </div>
              <div className="cred-item" data-check="cpr">
                <div className="cred-row">
                  <span className="cred-label">
                    <span className="cred-check-icon pending" id="icon-cpr">
                      <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="3"><circle cx="12" cy="12" r="8"/></svg>
                    </span>
                    CPR Certification
                  </span>
                  <span className="cred-status pending" id="status-cpr">WAITING</span>
                </div>
                <div className="progress-track"><div className="progress-fill" id="bar-cpr"></div></div>
              </div>
              <div className="cred-item" data-check="refs">
                <div className="cred-row">
                  <span className="cred-label">
                    <span className="cred-check-icon pending" id="icon-refs">
                      <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="3"><circle cx="12" cy="12" r="8"/></svg>
                    </span>
                    References
                  </span>
                  <span className="cred-status pending" id="status-refs">WAITING</span>
                </div>
                <div className="progress-track"><div className="progress-fill" id="bar-refs"></div></div>
              </div>
            </div>
            <div className="credential-footer">
              <span className="cred-footer-text" id="credFooterText">VERIFYING CREDENTIALS...</span>
              <span className="cred-footer-badge" id="credBadge">Ready to Place</span>
            </div>
          </div>
          <div className="hero-right-sub">
            <Link href="#services" className="hero-right-link">
              Our verification process
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-works section" id="how-it-works">
        <div className="how-works-intro reveal">
          <h2 className="how-works-intro-heading">Coverage in three steps.<br />No staffing board required.</h2>
          <p className="how-works-intro-sub">You tell us the need. We match, verify, and confirm. One call, one contact, one reliable process.</p>
        </div>
        <div className="steps-grid">
          <div className="step-card reveal">
            <div className="step-num">Step 01</div>
            <div className="step-icon">
              <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="6" y="8" width="32" height="28" rx="2"/>
                <line x1="14" y1="4" x2="14" y2="12"/>
                <line x1="30" y1="4" x2="30" y2="12"/>
                <line x1="6" y1="18" x2="38" y2="18"/>
                <line x1="14" y1="26" x2="22" y2="26"/>
                <line x1="14" y1="30" x2="18" y2="30"/>
              </svg>
            </div>
            <div className="step-title">Tell Us What You Need</div>
            <div className="step-desc">Shift dates, unit type, acuity level, any specific requirements. Takes under five minutes. Our team reviews it within the hour during business hours.</div>
            <div className="step-time">Under 5 min</div>
          </div>
          <div className="step-card reveal reveal-delay-1">
            <div className="step-num">Step 02</div>
            <div className="step-icon">
              <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="16" r="8"/>
                <path d="M26 30c0-4.418-3.582-8-8-8"/>
                <circle cx="34" cy="12" r="5"/>
                <path d="M32 12h4M34 10v4"/>
                <line x1="30" y1="32" x2="38" y2="38"/>
              </svg>
            </div>
            <div className="step-title">Human Match Review</div>
            <div className="step-desc">A Nuri coordinator reviews our verified roster for your area. Experience, shift history, facility fit. No algorithm. A real person makes the match.</div>
            <div className="step-time">Same business day</div>
          </div>
          <div className="step-card reveal reveal-delay-2">
            <div className="step-num">Step 03</div>
            <div className="step-icon">
              <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="22" cy="22" r="16"/>
                <polyline points="15 22 20 27 29 16"/>
              </svg>
            </div>
            <div className="step-title">Confirmed Coverage</div>
            <div className="step-desc">You receive a confirmation with the CNA&#39;s name, credential summary, and contact info. The CNA arrives briefed on your facility&#39;s protocols. Both sides prepared before day one.</div>
            <div className="step-time">Within 48 hours</div>
          </div>
        </div>
      </section>

      {/* SERVICES ACCORDION */}
      <section className="services section" id="services">
        <div className="services-split">
          <div className="services-split-left">
            <div className="section-eyebrow">What We Offer</div>
            <h2 className="section-title reveal">Staffing that fits<br />how you operate.</h2>
            <p className="section-sub reveal reveal-delay-1" style={{ marginBottom: 0 }}>Flexible coverage models for facilities that need reliable CNAs without long-term commitments or agency overhead.</p>
          </div>
          <div>
            <div className="accordion-list">

              <div className="accordion-item open">
                <button className="accordion-trigger" aria-expanded="true">
                  <span className="accordion-trigger-title">Per-Diem Shift Coverage</span>
                  <svg className="accordion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </button>
                <div className="accordion-body" style={{ maxHeight: '200px' }}>
                  <div className="accordion-body-inner">
                    <svg className="accordion-body-icon" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="4" y="6" width="32" height="28" rx="2"/>
                      <line x1="4" y1="14" x2="36" y2="14"/>
                      <line x1="12" y1="2" x2="12" y2="10"/>
                      <line x1="28" y1="2" x2="28" y2="10"/>
                      <rect x="10" y="20" width="6" height="6" rx="1"/>
                      <rect x="22" y="20" width="6" height="6" rx="1"/>
                    </svg>
                    <div>
                      <div className="accordion-body-text">One shift or a hundred. Same-day or two weeks out. We match from our verified network based on your floor&#39;s acuity level and prior facility experience. No minimum commitment required.</div>
                      <div className="accordion-body-tag">No Minimum Commitment</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <button className="accordion-trigger" aria-expanded="false">
                  <span className="accordion-trigger-title">Short-Term Contract Staffing</span>
                  <svg className="accordion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </button>
                <div className="accordion-body">
                  <div className="accordion-body-inner">
                    <svg className="accordion-body-icon" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8 36V8a2 2 0 012-2h20a2 2 0 012 2v28"/>
                      <line x1="4" y1="36" x2="36" y2="36"/>
                      <line x1="14" y1="12" x2="26" y2="12"/>
                      <line x1="14" y1="18" x2="26" y2="18"/>
                      <rect x="16" y="26" width="8" height="10"/>
                    </svg>
                    <div>
                      <div className="accordion-body-text">Two weeks to six months. Ideal for LOA coverage, census spikes, or while you recruit permanent staff. CNAs placed on short-term contracts go through the same full credential verification with an additional facility orientation check.</div>
                      <div className="accordion-body-tag">2 Weeks to 6 Months</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <button className="accordion-trigger" aria-expanded="false">
                  <span className="accordion-trigger-title">Float Pool Management</span>
                  <svg className="accordion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </button>
                <div className="accordion-body">
                  <div className="accordion-body-inner">
                    <svg className="accordion-body-icon" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="20" cy="12" r="6"/>
                      <circle cx="7" cy="28" r="4"/>
                      <circle cx="33" cy="28" r="4"/>
                      <line x1="14" y1="17" x2="9" y2="24"/>
                      <line x1="26" y1="17" x2="31" y2="24"/>
                    </svg>
                    <div>
                      <div className="accordion-body-text">For multi-site operators: we build and manage a dedicated pool of CNAs familiar with your facilities. When you need coverage across locations, we route from a pre-cleared roster that already knows your protocols and documentation systems.</div>
                      <div className="accordion-body-tag">Multi-Site Ready</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <button className="accordion-trigger" aria-expanded="false">
                  <span className="accordion-trigger-title">Credential Verification on Request</span>
                  <svg className="accordion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </button>
                <div className="accordion-body">
                  <div className="accordion-body-inner">
                    <svg className="accordion-body-icon" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 4l14 6v10c0 8-6 14-14 16C6 34 0 28 0 20V10z" transform="translate(3,2)"/>
                      <polyline points="13 19 17 23 25 14" transform="translate(3,2)"/>
                    </svg>
                    <div>
                      <div className="accordion-body-text">Already have CNAs you want to verify? We run our full credential review on your existing contingent staff: license status, background check currency, CPR expiration, and reference confirmation. Delivered as a clean summary report.</div>
                      <div className="accordion-body-tag">Available Standalone</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <button className="accordion-trigger" aria-expanded="false">
                  <span className="accordion-trigger-title">Emergency &amp; After-Hours Coverage</span>
                  <svg className="accordion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </button>
                <div className="accordion-body">
                  <div className="accordion-body-inner">
                    <svg className="accordion-body-icon" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="20" cy="20" r="16"/>
                      <line x1="20" y1="10" x2="20" y2="20"/>
                      <line x1="20" y1="20" x2="28" y2="26"/>
                      <circle cx="20" cy="20" r="2" fill="currentColor"/>
                    </svg>
                    <div>
                      <div className="accordion-body-text">No-show at 6am. Call-out at 10pm. We maintain an on-call coordinator and emergency-ready roster for exactly these moments. Rapid response does not mean corners cut. Every emergency placement is still fully verified.</div>
                      <div className="accordion-body-tag">On-Call Response</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-section" id="contact">
        <div className="cta-dual-header reveal">
          <div className="section-eyebrow">Get Started</div>
          <h2 className="section-title">Ready to get started?</h2>
          <p className="section-sub">Whether you need CNA staffing or want to join our network, we&#39;re here to help.</p>
        </div>
        <div className="cta-dual-grid">
          <Link href="/contact?role=facility" className="cta-card reveal">
            <div className="cta-card-icon">
              <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="6" y="10" width="36" height="28" rx="3"/>
                <line x1="6" y1="18" x2="42" y2="18"/>
                <rect x="12" y="24" width="10" height="8" rx="1"/>
                <line x1="28" y1="26" x2="36" y2="26"/>
                <line x1="28" y1="30" x2="33" y2="30"/>
              </svg>
            </div>
            <h3 className="cta-card-title">Hire CNA Staffing</h3>
            <p className="cta-card-desc">Need credential-verified CNAs? Tell us about your facility and we&#39;ll match you within 48 hours.</p>
            <span className="cta-card-btn">Request CNA Staffing <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></span>
          </Link>
          <Link href="/contact?role=cna" className="cta-card reveal reveal-delay-1">
            <div className="cta-card-icon">
              <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="24" cy="16" r="8"/>
                <path d="M10 40c0-7.732 6.268-14 14-14s14 6.268 14 14"/>
                <rect x="30" y="8" width="10" height="10" rx="5" fill="none"/>
                <line x1="35" y1="11" x2="35" y2="15"/>
                <line x1="33" y1="13" x2="37" y2="13"/>
              </svg>
            </div>
            <h3 className="cta-card-title">Apply as a CNA</h3>
            <p className="cta-card-desc">Join our Northern California CNA network. Flexible shifts, weekly pay, and real human support.</p>
            <span className="cta-card-btn">Apply to Join <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></span>
          </Link>
        </div>
        <div className="cta-contact-line reveal reveal-delay-2">
          Prefer to talk? Call us at <a href="tel:+14086214061">(408) 621-4061</a> or email <a href="mailto:hello@nuristaffing.com">hello@nuristaffing.com</a>
        </div>
      </section>
    </div>
  );
}
