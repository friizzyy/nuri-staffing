import ForCNAsContent from './ForCNAsContent'

export const metadata = {
  title: 'Our CNA Network — Nuri Staffing',
  description:
    'Join the Nuri CNA network. Northern California shifts, weekly pay, real human support, and respect for the work you do.',
  alternates: {
    canonical: 'https://nuristaffing.com/for-cnas',
  },
  openGraph: {
    type: 'website',
    siteName: 'Nuri Staffing',
    title: 'Our CNA Network — Nuri Staffing',
    description:
      'Northern California CNA shifts, weekly pay, and real human support. Join a staffing network that respects the work.',
    url: 'https://nuristaffing.com/for-cnas',
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
    title: 'Our CNA Network — Nuri Staffing',
    description:
      'Northern California CNA shifts, weekly pay, and real human support.',
    images: ['https://nuristaffing.com/og-image.png'],
  },
  other: {
    'theme-color': '#4A4063',
  },
  robots: 'index, follow',
}

export default function Page() {
  return <ForCNAsContent />
}
