import ReferralContent from './ReferralContent'

export const metadata = {
  title: 'Referral Pipeline',
  description: 'Earn ongoing rewards for referring trusted CNAs to the Nuri network. Build a deeper bench, build your earnings.',
  openGraph: {
    title: 'Referral Pipeline — Nuri Staffing',
    description: 'Earn ongoing rewards for referring trusted CNAs. The best caregivers know other great caregivers.',
    url: 'https://nuristaffing.com/referral',
  },
}

export default function Page() {
  return <ReferralContent />
}
