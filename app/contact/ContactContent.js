'use client'

import { useState } from 'react'
import useScrollReveal from '../../hooks/useScrollReveal'
import FormSelect from './FormSelect'
import './contact.css'

export default function ContactContent({ initialRole = 'facility' }) {
  const [role, setRole] = useState(initialRole)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const [facilityData, setFacilityData] = useState({
    facilityName: '',
    contactName: '',
    email: '',
    phone: '',
    facilityType: [],
    location: '',
    beds: '',
    clinicianTypes: [],
    coverage: [],
    urgency: '',
    details: '',
  })

  const [cnaData, setCnaData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    experienceAmount: '',
    experienceUnit: 'Years',
    licenseState: '',
    city: '',
    shiftPreference: [],
    settingPreference: [],
    heardAbout: [],
  })

  useScrollReveal()

  const handleFacilityChange = (e) => {
    setFacilityData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleCnaChange = (e) => {
    setCnaData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(false)

    const endpoint = role === 'cna' ? '/api/cna-apply' : '/api/facility-inquiry'
    let body = role === 'cna' ? { ...cnaData } : { ...facilityData }
    if (role === 'cna') {
      body.experience = body.experienceAmount ? `${body.experienceAmount} ${body.experienceUnit}` : ''
      delete body.experienceAmount
      delete body.experienceUnit
      body.shiftPreference = Array.isArray(body.shiftPreference) ? body.shiftPreference.join(', ') : body.shiftPreference
      body.settingPreference = Array.isArray(body.settingPreference) ? body.settingPreference.join(', ') : body.settingPreference
      body.heardAbout = Array.isArray(body.heardAbout) ? body.heardAbout.join(', ') : body.heardAbout
    } else {
      body.facilityType = Array.isArray(body.facilityType) ? body.facilityType.join(', ') : body.facilityType
      body.clinicianTypes = Array.isArray(body.clinicianTypes) ? body.clinicianTypes.join(', ') : body.clinicianTypes
      body.coverage = Array.isArray(body.coverage) ? body.coverage.join(', ') : body.coverage
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error('Failed')
      setSuccess(true)
    } catch {
      setLoading(false)
      setError(true)
    }
  }

  const switchRole = (newRole) => {
    if (newRole === role) return
    setRole(newRole)
    setSuccess(false)
    setError(false)
    setLoading(false)
  }

  return (
    <div className="page-contact">
      {/* HERO */}
      <section className="contact-hero" id="main" tabIndex={-1}>
        <div className="contact-hero-accent" aria-hidden="true"></div>
        <div className="contact-hero-inner">
          <div className="section-eyebrow reveal" style={{ justifyContent: 'center' }}>Contact Us</div>
          <h1 className="section-title reveal reveal-delay-1" style={{ textAlign: 'center', marginBottom: '12px' }}>
            Let&apos;s work together.
          </h1>
          <p className="section-sub reveal reveal-delay-2" style={{ textAlign: 'center', margin: '0 auto' }}>
            Whether you need CNA coverage or want to join our network, we&apos;re ready to help.
          </p>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="contact-form-section">
        <div className="contact-form-wrap reveal">
          {/* Role toggle */}
          <div className="contact-toggle">
            <button
              type="button"
              className={`contact-toggle-btn${role === 'facility' ? ' active' : ''}`}
              onClick={() => switchRole('facility')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="6" width="18" height="14" rx="2" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <rect x="7" y="15" width="4" height="3" rx="0.5" />
              </svg>
              I&apos;m a Healthcare Facility
            </button>
            <button
              type="button"
              className={`contact-toggle-btn${role === 'cna' ? ' active' : ''}`}
              onClick={() => switchRole('cna')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="5" />
                <path d="M3 21c0-4.418 4.03-8 9-8s9 3.582 9 8" />
              </svg>
              I&apos;m a CNA
            </button>
          </div>

          {/* Form card */}
          <div className="contact-form-card">
            {!success ? (
              <form onSubmit={handleSubmit}>
                {role === 'facility' ? (
                  <div className="form-grid">
                    <div className="form-field">
                      <label className="form-label" htmlFor="facilityName">Facility Name</label>
                      <input type="text" className="form-input" id="facilityName" name="facilityName" autoComplete="organization" placeholder="e.g. Sunrise Senior Living" required value={facilityData.facilityName} onChange={handleFacilityChange} />
                    </div>
                    <div className="form-field">
                      <label className="form-label" htmlFor="contactName">Your Name</label>
                      <input type="text" className="form-input" id="contactName" name="contactName" autoComplete="name" placeholder="Your full name" required value={facilityData.contactName} onChange={handleFacilityChange} />
                    </div>
                    <div className="form-field">
                      <label className="form-label" htmlFor="facilityEmail">Email</label>
                      <input type="email" className="form-input" id="facilityEmail" name="email" autoComplete="email" placeholder="you@facility.com" required value={facilityData.email} onChange={handleFacilityChange} />
                    </div>
                    <div className="form-field">
                      <label className="form-label" htmlFor="facilityPhone">Phone</label>
                      <input type="tel" className="form-input" id="facilityPhone" name="phone" autoComplete="tel" placeholder="(408) 555-0100" required value={facilityData.phone} onChange={handleFacilityChange} />
                    </div>
                    <FormSelect label="Facility Type" id="facilityType" name="facilityType" required value={facilityData.facilityType} onChange={handleFacilityChange} placeholder="Select types..." multi options={[
                      { value: 'snf', label: 'Skilled Nursing Facility' },
                      { value: 'alf', label: 'Assisted Living' },
                      { value: 'hospital', label: 'Hospital' },
                      { value: 'home-health', label: 'Home Health' },
                      { value: 'rehab', label: 'Rehabilitation Center' },
                      { value: 'memory-care', label: 'Memory Care' },
                      { value: 'other', label: 'Other' },
                    ]} />
                    <div className="form-field">
                      <label className="form-label" htmlFor="location">Facility Location</label>
                      <input type="text" className="form-input" id="location" name="location" placeholder="e.g. San Jose, CA" required value={facilityData.location} onChange={handleFacilityChange} />
                    </div>
                    <div className="form-field">
                      <label className="form-label" htmlFor="beds">Number of Beds</label>
                      <input type="text" className="form-input" id="beds" name="beds" placeholder="e.g. 120" value={facilityData.beds} onChange={handleFacilityChange} />
                    </div>
                    <FormSelect label="Clinician Types Needed" id="clinicianTypes" name="clinicianTypes" value={facilityData.clinicianTypes} onChange={handleFacilityChange} placeholder="Select types..." multi options={[
                      { value: 'cna', label: 'CNA' },
                      { value: 'lpn', label: 'LPN / LVN' },
                      { value: 'rn', label: 'RN' },
                    ]} />
                    <FormSelect label="Coverage Needed" id="coverage" name="coverage" value={facilityData.coverage} onChange={handleFacilityChange} placeholder="Select coverage..." multi exclusiveValue="Not Sure Yet" options={[
                      { value: 'per-diem', label: 'Per-Diem Shifts' },
                      { value: 'short-term', label: 'Short-Term Contract' },
                      { value: 'float-pool', label: 'Float Pool' },
                      { value: 'emergency', label: 'Emergency Coverage' },
                      { value: 'not-sure', label: 'Not Sure Yet' },
                    ]} />
                    <FormSelect label="How Soon Do You Need Coverage?" id="urgency" name="urgency" value={facilityData.urgency} onChange={handleFacilityChange} placeholder="Select timeline..." options={[
                      { value: 'immediately', label: 'Immediately' },
                      { value: 'this-week', label: 'Within a Week' },
                      { value: 'this-month', label: 'Within a Month' },
                      { value: 'exploring', label: 'Just Exploring' },
                    ]} />
                    <div className="form-field full">
                      <label className="form-label" htmlFor="details">Additional Details</label>
                      <textarea className="form-textarea" id="details" name="details" placeholder="Tell us about your staffing needs, shift schedules, or any specific requirements..." maxLength={2000} value={facilityData.details} onChange={handleFacilityChange}></textarea>
                    </div>
                  </div>
                ) : (
                  <div className="form-grid">
                    <div className="form-field">
                      <label className="form-label" htmlFor="firstName">First Name</label>
                      <input type="text" className="form-input" id="firstName" name="firstName" autoComplete="given-name" placeholder="Your first name" required value={cnaData.firstName} onChange={handleCnaChange} />
                    </div>
                    <div className="form-field">
                      <label className="form-label" htmlFor="lastName">Last Name</label>
                      <input type="text" className="form-input" id="lastName" name="lastName" autoComplete="family-name" placeholder="Your last name" required value={cnaData.lastName} onChange={handleCnaChange} />
                    </div>
                    <div className="form-field">
                      <label className="form-label" htmlFor="cnaEmail">Email</label>
                      <input type="email" className="form-input" id="cnaEmail" name="email" autoComplete="email" placeholder="you@email.com" required value={cnaData.email} onChange={handleCnaChange} />
                    </div>
                    <div className="form-field">
                      <label className="form-label" htmlFor="cnaPhone">Phone</label>
                      <input type="tel" className="form-input" id="cnaPhone" name="phone" autoComplete="tel" placeholder="(415) 555-0100" required value={cnaData.phone} onChange={handleCnaChange} />
                    </div>
                    <div className="form-field">
                      <label className="form-label" htmlFor="experienceAmount">CNA Experience</label>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <input type="number" className="form-input" id="experienceAmount" name="experienceAmount" placeholder="e.g. 3" min="0" style={{ flex: 1 }} value={cnaData.experienceAmount} onChange={handleCnaChange} />
                        <div style={{ flex: 1 }}>
                          <FormSelect id="experienceUnit" name="experienceUnit" value={cnaData.experienceUnit} onChange={handleCnaChange} options={[
                            { value: 'years', label: 'Years' },
                            { value: 'months', label: 'Months' },
                          ]} />
                        </div>
                      </div>
                    </div>
                    <div className="form-field">
                      <label className="form-label" htmlFor="licenseState">License State</label>
                      <input type="text" className="form-input" id="licenseState" name="licenseState" autoComplete="address-level1" placeholder="e.g. California" value={cnaData.licenseState} onChange={handleCnaChange} />
                    </div>
                    <div className="form-field">
                      <label className="form-label" htmlFor="city">City / Area</label>
                      <input type="text" className="form-input" id="city" name="city" autoComplete="address-level2" placeholder="e.g. Oakland, Fremont" value={cnaData.city} onChange={handleCnaChange} />
                    </div>
                    <FormSelect label="Shift Preference" id="shiftPreference" name="shiftPreference" value={cnaData.shiftPreference} onChange={handleCnaChange} placeholder="Select shifts..." multi exclusiveValue="Open to Any" options={[
                      { value: 'day', label: 'Day (AM)' },
                      { value: 'evening', label: 'Evening (PM)' },
                      { value: 'night', label: 'Night (NOC)' },
                      { value: 'any', label: 'Open to Any' },
                    ]} />
                    <FormSelect label="Preferred Setting" id="settingPreference" name="settingPreference" value={cnaData.settingPreference} onChange={handleCnaChange} placeholder="Select settings..." multi exclusiveValue="Open to Any" options={[
                      { value: 'snf', label: 'Skilled Nursing Facility' },
                      { value: 'alf', label: 'Assisted Living' },
                      { value: 'hospital', label: 'Hospital' },
                      { value: 'home-health', label: 'Home Health' },
                      { value: 'memory-care', label: 'Memory Care' },
                      { value: 'any', label: 'Open to Any' },
                    ]} />
                    <FormSelect label="How Did You Hear About Us?" id="heardAbout" name="heardAbout" value={cnaData.heardAbout} onChange={handleCnaChange} placeholder="Select all that apply..." multi options={[
                      { value: 'referral', label: 'Friend / Referral' },
                      { value: 'google', label: 'Google Search' },
                      { value: 'social', label: 'Social Media' },
                      { value: 'job-board', label: 'Job Board (Indeed, etc.)' },
                      { value: 'other', label: 'Other' },
                    ]} />
                  </div>
                )}
                <button type="submit" className="btn-amber" disabled={loading}>
                  {loading ? 'Submitting...' : (
                    <>
                      {role === 'facility' ? 'Request CNA Staffing' : 'Submit Application'}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </>
                  )}
                </button>
                {error && (
                  <div className="form-error">
                    Something went wrong. Please try calling us at{' '}
                    <a href="tel:+14086214061">(408) 621-4061</a>.
                  </div>
                )}
              </form>
            ) : (
              <div className="contact-success">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <div>
                  <div className="contact-success-title">
                    {role === 'facility' ? 'Inquiry received!' : 'Application received!'}
                  </div>
                  <div className="contact-success-desc">
                    We&apos;ll be in touch within one business day.
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Alt contact line */}
          <div className="contact-alt reveal reveal-delay-1">
            Prefer to talk? Call us at <a href="tel:+14086214061">(408) 621-4061</a> or email <a href="mailto:hello@nurimedicalstaffing.com">hello@nurimedicalstaffing.com</a>
          </div>
        </div>
      </section>
    </div>
  )
}
