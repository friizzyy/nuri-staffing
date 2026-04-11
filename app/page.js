import HomeContent from '@/components/HomeContent'

export const metadata = {
  title: 'Nuri Staffing \u2014 Northern California CNA Staffing You Can Trust',
  description:
    'Northern California CNA staffing built on credential verification and human matching. Cover shifts in 48 hours with verified, ready-to-work caregivers.',
  alternates: {
    canonical: 'https://nuristaffing.com/',
  },
  openGraph: {
    type: 'website',
    siteName: 'Nuri Staffing',
    title: 'Nuri Staffing \u2014 Northern California CNA Staffing You Can Trust',
    description:
      'Credential-verified CNAs delivered to Northern California facilities within 48 hours. Human-reviewed placements, no compliance surprises.',
    url: 'https://nuristaffing.com/',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nuri Staffing \u2014 Northern California CNA Staffing You Can Trust',
    description:
      'Credential-verified CNAs delivered to Northern California facilities within 48 hours.',
    images: ['/og-image.png'],
  },
}

export default function Page() {
  return <HomeContent />
}
