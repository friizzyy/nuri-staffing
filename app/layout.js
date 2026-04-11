import { DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://nuristaffing.com"),
  title: {
    template: "%s | Nuri Staffing",
    default: "Nuri Staffing \u2014 Northern California CNA Staffing You Can Trust",
  },
  description:
    "Northern California CNA staffing built on credential verification and human matching. Cover shifts in 48 hours with verified, ready-to-work caregivers.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    siteName: "Nuri Staffing",
    title: "Nuri Staffing \u2014 Northern California CNA Staffing You Can Trust",
    description:
      "Credential-verified CNAs delivered to Northern California facilities within 48 hours. Human-reviewed placements, no compliance surprises.",
    url: "https://nuristaffing.com",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nuri Staffing \u2014 Northern California CNA Staffing You Can Trust",
    description:
      "Credential-verified CNAs delivered to Northern California facilities within 48 hours.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "theme-color": "#4A4063",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Nuri Staffing",
  description:
    "Northern California CNA staffing built on credential verification and human matching.",
  url: "https://nuristaffing.com",
  telephone: "+1-408-621-4061",
  email: "hello@nuristaffing.com",
  image: "https://nuristaffing.com/og-image.png",
  priceRange: "$$",
  areaServed: {
    "@type": "Place",
    name: "Northern California",
  },
  address: {
    "@type": "PostalAddress",
    addressRegion: "CA",
    addressCountry: "US",
  },
  sameAs: [],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={dmSans.className}>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
