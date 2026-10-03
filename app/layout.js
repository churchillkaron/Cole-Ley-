import './globals.css'
import { Playfair_Display, Inter } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-playfair',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata = {
  metadataBase: new URL('https://www.coleley.com'),
  title: {
    default: 'Cole Ley | Live Singer & Musician in Phuket',
    template: '%s | Cole Ley',
  },
  description:
    'Book Cole Ley for live soul, blues, jazz and contemporary music in Phuket and destination events across Thailand and Asia. Solo, duo, trio and full-band performances for weddings, beach clubs, hotels, restaurants, corporate events and private parties.',
  keywords: [
    'Cole Ley',
    'live singer Phuket',
    'musician Phuket',
    'live music Phuket',
    'wedding singer Phuket',
    'event singer Phuket',
    'jazz singer Phuket',
    'blues singer Phuket',
    'soul singer Phuket',
    'live band Phuket',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Cole Ley',
    title: 'Cole Ley | Live Singer & Musician in Phuket',
    description:
      'Live soul, blues, jazz and contemporary music for luxury events, weddings, beach clubs, hotels and private celebrations in Phuket and beyond.',
    images: [
      {
        url: '/cole-hero-2026.jpg',
        width: 1672,
        height: 941,
        alt: 'Cole Ley, Phuket-based singer and live performer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cole Ley | Live Singer & Musician in Phuket',
    description:
      'Live soul, blues, jazz and contemporary music for events in Phuket and destination performances across Asia.',
    images: ['/cole-hero-2026.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

const artistSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Cole Ley',
  url: 'https://www.coleley.com/',
  image: 'https://www.coleley.com/cole-hero-2026.jpg',
  jobTitle: 'Singer, musician and live performer',
  description:
    'Live soul, blues, jazz and contemporary performer available for weddings, beach clubs, hotels, restaurants, corporate events and private celebrations.',
  email: 'mailto:cole@coleley.com',
  telephone: '+66944271265',
  homeLocation: {
    '@type': 'Place',
    name: 'Phuket, Thailand',
  },
  areaServed: ['Phuket', 'Thailand', 'Asia'],
  sameAs: ['https://www.instagram.com/iamcoleley/'],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(artistSchema).replace(/</g, '\\u003c'),
          }}
        />
        {children}
      </body>
    </html>
  )
}