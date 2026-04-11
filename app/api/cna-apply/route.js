import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { cnaNotification, cnaConfirmation } from '@/lib/email-template';

export async function POST(request) {
  const { firstName, lastName, email, phone, experience, licenseState, city, shiftPreference, settingPreference, heardAbout } = await request.json();

  if (!firstName || !lastName || !email || !phone) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    // Send notification to Nuri team
    await resend.emails.send({
      from: 'Nuri Medical Staffing <hello@nurimedicalstaffing.com>',
      to: 'hello@nurimedicalstaffing.com',
      subject: `New CNA Application: ${firstName} ${lastName}`,
      html: cnaNotification({ firstName, lastName, email, phone, experience, licenseState, city, shiftPreference, settingPreference, heardAbout }),
    });

    // Send confirmation auto-reply to applicant
    await resend.emails.send({
      from: 'Nuri Medical Staffing <hello@nurimedicalstaffing.com>',
      to: email,
      subject: 'Thank you for applying to Nuri Medical Staffing',
      html: cnaConfirmation({ firstName }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Resend error:', error);
    return NextResponse.json({ error: 'Failed to send. Please call (408) 621-4061.' }, { status: 500 });
  }
}
