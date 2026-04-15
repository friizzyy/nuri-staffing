import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { cnaNotification, cnaConfirmation } from '@/lib/email-template';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const rateMap = new Map();
const RATE_LIMIT = 5;
const RATE_WINDOW = 60_000;

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now - entry.start > RATE_WINDOW) {
    rateMap.set(ip, { start: now, count: 1 });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

export async function POST(request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  const { firstName, lastName, email, phone, experience, licenseState, city, shiftPreference, settingPreference, heardAbout } = await request.json();

  if (!firstName || !lastName || !email || !phone) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const [notification, confirmation] = await Promise.allSettled([
      resend.emails.send({
        from: 'Nuri Medical Staffing <hello@nurimedicalstaffing.com>',
        to: 'hello@nurimedicalstaffing.com',
        subject: `New CNA Application: ${firstName} ${lastName}`,
        html: cnaNotification({ firstName, lastName, email, phone, experience, licenseState, city, shiftPreference, settingPreference, heardAbout }),
      }),
      resend.emails.send({
        from: 'Nuri Medical Staffing <hello@nurimedicalstaffing.com>',
        to: email,
        subject: 'Thank you for applying to Nuri Medical Staffing',
        html: cnaConfirmation({ firstName }),
      }),
    ]);

    if (notification.status === 'rejected') {
      console.error('Notification email failed:', notification.reason);
    }
    if (confirmation.status === 'rejected') {
      console.error('Confirmation email failed:', confirmation.reason);
    }

    // Succeed if at least the notification reached Nuri
    if (notification.status === 'fulfilled') {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Failed to send. Please call (408) 621-4061.' }, { status: 500 });
  } catch (error) {
    console.error('Resend error:', error);
    return NextResponse.json({ error: 'Failed to send. Please call (408) 621-4061.' }, { status: 500 });
  }
}
