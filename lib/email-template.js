/**
 * Nuri Medical Staffing — Premium Email Templates
 * Design system: Navy (#4A4063), Rose (#D4727A), Light BG (#F7F5F8)
 * Fonts: DM Sans (primary), JetBrains Mono (labels/accents)
 */

const BRAND = {
  navy: '#4A4063',
  rose: '#D4727A',
  bg: '#F7F5F8',
  white: '#ffffff',
  textMuted: '#6E6580',
  border: 'rgba(74,64,99,0.08)',
  borderLight: 'rgba(74,64,99,0.06)',
  roseLight: 'rgba(212,114,122,0.12)',
  roseBtnShadow: 'rgba(212,114,122,0.25)',
  shadow: 'rgba(74,64,99,0.08)',
  font: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  mono: "'JetBrains Mono', monospace",
  phone: '(408) 621-4061',
  email: 'hello@nurimedicalstaffing.com',
  site: 'https://nurimedicalstaffing.com',
};

/* ── Shared layout pieces ── */

function premiumHeader({ badge = '' } = {}) {
  const rightSide = badge
    ? `<span style="display:inline-block;background:${BRAND.roseLight};color:${BRAND.rose};font-family:${BRAND.mono};font-size:9px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;padding:5px 12px;border-radius:100px;">${badge}</span>`
    : `<span style="font-family:${BRAND.mono};font-size:9px;font-weight:600;color:${BRAND.textMuted};text-transform:uppercase;letter-spacing:0.12em;opacity:0.6;">Medical Staffing</span>`;

  return `
    <tr>
      <td style="padding:28px 40px 24px;border-bottom:1px solid ${BRAND.border};">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td>
              <span style="font-family:${BRAND.font};font-size:24px;font-weight:800;color:${BRAND.navy};letter-spacing:-0.04em;">Nuri</span><span style="color:${BRAND.rose};font-size:24px;font-weight:800;">.</span>
            </td>
            <td align="right" style="vertical-align:middle;">
              ${rightSide}
            </td>
          </tr>
        </table>
      </td>
    </tr>`;
}

function premiumFooter({ compact = false } = {}) {
  if (compact) {
    return `
      <tr>
        <td style="padding:16px 40px 20px;border-top:1px solid ${BRAND.borderLight};background-color:${BRAND.bg};">
          <p style="font-family:${BRAND.font};font-size:11px;color:${BRAND.textMuted};margin:0;line-height:1.6;">
            <strong style="color:${BRAND.navy};">Nuri Medical Staffing</strong> &nbsp;·&nbsp;
            <a href="tel:+14086214061" style="color:${BRAND.rose};text-decoration:none;">${BRAND.phone}</a> &nbsp;·&nbsp;
            <a href="mailto:${BRAND.email}" style="color:${BRAND.rose};text-decoration:none;">${BRAND.email}</a>
          </p>
        </td>
      </tr>`;
  }

  return `
    <tr>
      <td style="padding:20px 40px 28px;border-top:1px solid ${BRAND.borderLight};background-color:${BRAND.bg};">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="font-family:${BRAND.font};font-size:12px;color:${BRAND.textMuted};line-height:1.7;">
              <strong style="color:${BRAND.navy};">Nuri Medical Staffing</strong> &nbsp;·&nbsp; Northern California
            </td>
          </tr>
          <tr>
            <td style="padding-top:6px;font-family:${BRAND.font};font-size:12px;color:${BRAND.textMuted};line-height:1.7;">
              <a href="tel:+14086214061" style="color:${BRAND.rose};text-decoration:none;">${BRAND.phone}</a>
              &nbsp;·&nbsp;
              <a href="mailto:${BRAND.email}" style="color:${BRAND.rose};text-decoration:none;">${BRAND.email}</a>
              &nbsp;·&nbsp;
              <a href="${BRAND.site}" style="color:${BRAND.textMuted};text-decoration:none;font-family:${BRAND.mono};font-size:10px;letter-spacing:0.06em;">nurimedicalstaffing.com</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;
}

function emailWrapper({ content, preheader = '', compact = false }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Nuri Medical Staffing</title>
  <!--[if mso]>
  <style>body,table,td{font-family:Arial,sans-serif!important;}</style>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background-color:${BRAND.bg};-webkit-font-smoothing:antialiased;">
  ${preheader ? `<div style="display:none;max-height:0;overflow:hidden;">${preheader}</div>` : ''}
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${BRAND.bg};">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:${BRAND.white};border-radius:16px;overflow:hidden;box-shadow:0 4px 32px ${BRAND.shadow};">
          ${content}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/* ── Data table for admin notifications ── */

function dataRow(label, value, isLast = false) {
  if (!value) return '';
  const borderStyle = isLast ? '' : `border-bottom:1px solid ${BRAND.borderLight};`;
  return `
    <tr>
      <td style="padding:12px 16px;font-family:${BRAND.mono};font-size:10px;font-weight:600;color:${BRAND.textMuted};text-transform:uppercase;letter-spacing:0.1em;width:140px;vertical-align:top;background:${BRAND.bg};${borderStyle}">${label}</td>
      <td style="padding:12px 16px;font-family:${BRAND.font};font-size:14px;color:${BRAND.navy};font-weight:500;${borderStyle}">${value}</td>
    </tr>`;
}

/* ── Steps card for confirmations ── */

function stepsCard(steps) {
  const stepRows = steps.map((step, i) => `
    <tr>
      <td style="padding:0 24px ${i === steps.length - 1 ? '20px' : '16px'};">
        <table role="presentation" cellpadding="0" cellspacing="0">
          <tr>
            <td style="vertical-align:top;padding-right:14px;">
              <div style="width:28px;height:28px;border-radius:50%;background:${BRAND.roseLight};text-align:center;line-height:28px;font-family:${BRAND.font};font-size:13px;font-weight:700;color:${BRAND.rose};">${i + 1}</div>
            </td>
            <td style="vertical-align:top;">
              <p style="font-family:${BRAND.font};font-size:14px;color:${BRAND.navy};font-weight:600;margin:0 0 2px;line-height:28px;">${step.title}</p>
              <p style="font-family:${BRAND.font};font-size:13px;color:${BRAND.textMuted};margin:0;line-height:1.5;">${step.desc}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>`).join('');

  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.bg};border-radius:12px;border:1px solid ${BRAND.borderLight};margin:0 0 28px;">
      <tr>
        <td style="padding:24px 24px 8px;">
          <p style="font-family:${BRAND.mono};font-size:9px;font-weight:600;color:${BRAND.textMuted};text-transform:uppercase;letter-spacing:0.12em;margin:0 0 16px;">What happens next</p>
        </td>
      </tr>
      ${stepRows}
    </table>`;
}

/* ── CTA button ── */

function ctaButton(text, href) {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 28px;" width="100%">
      <tr>
        <td align="center">
          <a href="${href}" style="display:inline-block;background:${BRAND.rose};color:${BRAND.white};font-family:${BRAND.font};font-size:14px;font-weight:600;text-decoration:none;padding:14px 32px;border-radius:8px;box-shadow:0 4px 16px ${BRAND.roseBtnShadow};letter-spacing:-0.01em;">${text}</a>
        </td>
      </tr>
    </table>`;
}

/* ═══════════════════════════════════════════════════════════════
   CNA Application — notification to Nuri team
   ═══════════════════════════════════════════════════════════════ */

export function cnaNotification({ firstName, lastName, email, phone, experience, licenseState, city, shiftPreference, settingPreference, heardAbout }) {
  const content = `
    ${premiumHeader({ badge: 'New Application' })}
    <tr>
      <td style="padding:36px 40px 32px;">
        <h1 style="font-family:${BRAND.font};font-size:26px;font-weight:700;color:${BRAND.navy};margin:0 0 4px;letter-spacing:-0.03em;">${firstName} ${lastName}</h1>
        <p style="font-family:${BRAND.font};font-size:13px;color:${BRAND.textMuted};margin:0 0 28px;">
          <a href="mailto:${email}" style="color:${BRAND.rose};text-decoration:none;">${email}</a>
          &nbsp;·&nbsp;
          <a href="tel:${phone}" style="color:${BRAND.rose};text-decoration:none;">${phone}</a>
        </p>

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:12px;overflow:hidden;border:1px solid ${BRAND.border};">
          ${dataRow('Experience', experience || 'Not specified')}
          ${dataRow('License', licenseState || 'Not specified')}
          ${dataRow('City', city || 'Not specified')}
          ${dataRow('Shift', shiftPreference || 'Not specified')}
          ${dataRow('Setting', settingPreference || 'Not specified')}
          ${dataRow('Source', heardAbout || 'Not specified', true)}
        </table>
      </td>
    </tr>
    ${premiumFooter({ compact: true })}`;

  return emailWrapper({ content, preheader: `New CNA application from ${firstName} ${lastName}`, compact: true });
}

/* ═══════════════════════════════════════════════════════════════
   CNA Application — confirmation to applicant
   ═══════════════════════════════════════════════════════════════ */

export function cnaConfirmation({ firstName }) {
  const content = `
    ${premiumHeader()}
    <tr>
      <td style="padding:36px 40px 32px;">
        <h1 style="font-family:${BRAND.font};font-size:26px;font-weight:700;color:${BRAND.navy};margin:0 0 6px;letter-spacing:-0.03em;">Welcome, ${firstName}!</h1>
        <p style="font-family:${BRAND.font};font-size:15px;color:${BRAND.textMuted};line-height:1.75;margin:0 0 28px;">We've received your application to join the Nuri CNA network. Our team is reviewing your information now.</p>

        ${stepsCard([
          { title: 'Application Review', desc: 'Our team reviews your credentials and experience.' },
          { title: 'Quick Phone Call', desc: "We'll reach out within one business day to connect." },
          { title: 'Start Working', desc: 'Get matched with shifts at top facilities in your area.' },
        ])}

        ${ctaButton(`Call Us \u2014 ${BRAND.phone}`, 'tel:+14086214061')}

        <p style="font-family:${BRAND.font};font-size:13px;color:${BRAND.textMuted};line-height:1.6;margin:0;text-align:center;">We look forward to working with you.</p>
      </td>
    </tr>
    ${premiumFooter()}`;

  return emailWrapper({ content, preheader: `Application received \u2014 we'll be in touch within 1 business day.` });
}

/* ═══════════════════════════════════════════════════════════════
   Facility Inquiry — notification to Nuri team
   ═══════════════════════════════════════════════════════════════ */

export function facilityNotification({ facilityName, contactName, email, phone, facilityType, location, beds, clinicianTypes, coverage, urgency, details }) {
  const urgencyBadge = urgency
    ? `<p style="margin:0 0 24px;">
        <span style="display:inline-block;background:${BRAND.roseLight};color:${BRAND.rose};font-family:${BRAND.mono};font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;padding:4px 12px;border-radius:100px;">Urgency: ${urgency}</span>
      </p>`
    : '';

  const detailsBlock = details
    ? `<div style="margin-top:20px;padding:16px 20px;background:${BRAND.bg};border-radius:10px;border-left:3px solid ${BRAND.rose};">
        <p style="font-family:${BRAND.mono};font-size:9px;font-weight:600;color:${BRAND.textMuted};text-transform:uppercase;letter-spacing:0.1em;margin:0 0 8px;">Additional Details</p>
        <p style="font-family:${BRAND.font};font-size:14px;color:${BRAND.navy};line-height:1.65;margin:0;">${details}</p>
      </div>`
    : '';

  const content = `
    ${premiumHeader({ badge: 'Facility Inquiry' })}
    <tr>
      <td style="padding:36px 40px 32px;">
        <h1 style="font-family:${BRAND.font};font-size:26px;font-weight:700;color:${BRAND.navy};margin:0 0 4px;letter-spacing:-0.03em;">${facilityName}</h1>
        <p style="font-family:${BRAND.font};font-size:13px;color:${BRAND.textMuted};margin:0 0 6px;">
          Contact: <strong style="color:${BRAND.navy};">${contactName}</strong>
          &nbsp;·&nbsp;
          <a href="mailto:${email}" style="color:${BRAND.rose};text-decoration:none;">${email}</a>
          &nbsp;·&nbsp;
          <a href="tel:${phone}" style="color:${BRAND.rose};text-decoration:none;">${phone}</a>
        </p>

        ${urgencyBadge}

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-radius:12px;overflow:hidden;border:1px solid ${BRAND.border};">
          ${dataRow('Type', facilityType || 'Not specified')}
          ${dataRow('Location', location || 'Not specified')}
          ${dataRow('Beds', beds || 'Not specified')}
          ${dataRow('Clinicians', clinicianTypes || 'Not specified')}
          ${dataRow('Coverage', coverage || 'Not specified', true)}
        </table>

        ${detailsBlock}
      </td>
    </tr>
    ${premiumFooter({ compact: true })}`;

  return emailWrapper({ content, preheader: `New facility inquiry from ${facilityName}`, compact: true });
}

/* ═══════════════════════════════════════════════════════════════
   Facility Inquiry — confirmation to submitter
   ═══════════════════════════════════════════════════════════════ */

export function facilityConfirmation({ contactName, facilityName }) {
  const content = `
    ${premiumHeader()}
    <tr>
      <td style="padding:36px 40px 32px;">
        <h1 style="font-family:${BRAND.font};font-size:26px;font-weight:700;color:${BRAND.navy};margin:0 0 6px;letter-spacing:-0.03em;">Thank you, ${contactName}!</h1>
        <p style="font-family:${BRAND.font};font-size:15px;color:${BRAND.textMuted};line-height:1.75;margin:0 0 28px;">We've received your staffing inquiry for <strong style="color:${BRAND.navy};">${facilityName}</strong>. A Nuri coordinator will follow up within <strong style="color:${BRAND.navy};">2 business hours</strong>.</p>

        ${stepsCard([
          { title: 'Coordinator Outreach', desc: 'A dedicated coordinator will call you within 2 hours.' },
          { title: 'Custom Staffing Plan', desc: "We'll match your needs with qualified CNAs in your area." },
          { title: 'Coverage Begins', desc: 'Staff arrives on schedule, fully credentialed and ready.' },
        ])}

        ${ctaButton('Need Immediate Coverage? Call Now', 'tel:+14086214061')}

        <p style="font-family:${BRAND.font};font-size:13px;color:${BRAND.textMuted};line-height:1.6;margin:0;text-align:center;">We're ready to help staff your facility with qualified CNAs.</p>
      </td>
    </tr>
    ${premiumFooter()}`;

  return emailWrapper({ content, preheader: `Inquiry received \u2014 a coordinator will follow up within 2 hours.` });
}
