import ContactContent from './ContactContent'

export const metadata = {
  title: 'Contact Us — Nuri Staffing',
  description:
    'Get in touch with Nuri Staffing. Request CNA coverage for your facility or apply to join our Northern California CNA network.',
  alternates: {
    canonical: 'https://nuristaffing.com/contact',
  },
  openGraph: {
    type: 'website',
    siteName: 'Nuri Staffing',
    title: 'Contact Us — Nuri Staffing',
    description:
      'Request CNA staffing coverage or apply to join our network. Northern California facilities and CNAs welcome.',
    url: 'https://nuristaffing.com/contact',
    images: [
      {
        url: 'https://nuristaffing.com/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us — Nuri Staffing',
    description:
      'Request CNA staffing coverage or apply to join our network.',
    images: ['https://nuristaffing.com/og-image.png'],
  },
  other: {
    'theme-color': '#4A4063',
  },
  robots: 'index, follow',
}

export default async function Page({ searchParams }) {
  const params = await searchParams
  const role = params?.role === 'cna' ? 'cna' : 'facility'
  return <ContactContent initialRole={role} />
}
