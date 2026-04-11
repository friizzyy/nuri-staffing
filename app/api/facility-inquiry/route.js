import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { facilityNotification, facilityConfirmation } from '@/lib/email-template';

export async function POST(request) {
  const { facilityName, contactName, email, phone, facilityType, location, beds, clinicianTypes, coverage, urgency, details } = await request.json();

  if (!facilityName || !contactName || !email || !phone) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    // Send notification to Nuri team
    await resend.emails.send({
      from: 'Nuri Medical Staffing <notifications@nurimedicalstaffing.com>',
      to: 'hello@nurimedicalstaffing.com',
      subject: `New Facility Inquiry — ${facilityName}`,
      html: facilityNotification({ facilityName, contactName, email, phone, facilityType, location, beds, clinicianTypes, coverage, urgency, details }),
    });

    // Send confirmation auto-reply to submitter
    await resend.emails.send({
      from: 'Nuri Medical Staffing <hello@nurimedicalstaffing.com>',
      to: email,
      subject: 'We received your inquiry — Nuri Medical Staffing',
      html: facilityConfirmation({ contactName, facilityName }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Resend error:', error);
    return NextResponse.json({ error: 'Failed to send. Please call (408) 621-4061.' }, { status: 500 });
  }
}
