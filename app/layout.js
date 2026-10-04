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
    default: 'Cole Ley | Live Artist, Singer & Musician in Phuket',
    template: '%s | Cole Ley',
  },
  description:
    'Book Cole Ley as a live artist or use Cole Ley Co., Ltd. as a Phuket entertainment agency for singers, DJs, bands and specialist musicians for weddings and events.',
  keywords: [
    'Cole Ley',
    'live singer Phuket',
    'musician Phuket',
    'live music Phuket',
    'wedding singer Phuket',
    'event singer Phuket',
    'live artist Phuket',
    'solo acoustic singer Phuket',
    'serenade singer Phuket',
    'singer with DJ Phuket',
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
    title: 'Cole Ley | Live Artist, Singer & Musician in Phuket',
    description:
      'Versatile live performance from intimate serenades and acoustic sets to singer-with-DJ, duo, trio and full-band shows in Phuket and beyond.',
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
    title: 'Cole Ley | Live Artist, Singer & Musician in Phuket',
    description:
      'Solo vocal, acoustic, serenade, singer-with-DJ, duo, trio and full-band performances for events in Phuket and across Asia.',
    images: ['/cole-hero-2026.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

const officialProfiles = [
  'https://www.instagram.com/iamcoleley/',
  'https://www.facebook.com/113408238398926',
  'https://music.apple.com/fr/artist/cole-ley/1688271930',
  'https://open.spotify.com/artist/2VBy8qDokhFWatU5GofoT9',
]

const artistSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://www.coleley.com/#cole-ley',
  name: 'Cole Ley',
  url: 'https://www.coleley.com/',
  image: 'https://www.coleley.com/cole-hero-2026.jpg',
  jobTitle: 'Live artist, singer, musician and entertainer',
  description:
    'Versatile live artist performing as solo vocalist, solo acoustic, serenade, singer with DJ, duo, trio and full band across soul, blues, jazz and contemporary music for weddings, hotels, beach clubs, restaurants, corporate events and private celebrations. Cole Ley Co., Ltd. also operates an artist-agency path for sourcing and coordinating other performers.',
  email: 'mailto:cole@coleley.com',
  telephone: '+66944271265',
  homeLocation: {
    '@type': 'Place',
    name: 'Phuket, Thailand',
  },
  areaServed: ['Phuket', 'Thailand', 'Asia'],
  sameAs: officialProfiles,
  subjectOf: [
    { '@id': 'https://www.coleley.com/press#page' },
    {
      '@type': 'WebPage',
      name: 'Marina Bay Sands · Skyline Jazz Sessions',
      url: 'https://www.marinabaysands.com/world-of-paiza/paiza-sky-residence/skyline-jazz-sessions.html',
    },
    {
      '@type': 'WebPage',
      name: 'SISTIC · Live at Cool Cats',
      url: 'https://www.sistic.com.sg/events/lite_coolcats12',
    },
    {
      '@type': 'WebPage',
      name: 'Phuket101 · Churchill Bar and Restaurant',
      url: 'https://www.phuket101.net/churchill-bar-and-restaurant/',
    },
    {
      '@type': 'WebPage',
      name: 'Moonshine Phuket · What\'s On',
      url: 'https://www.moonshinephuket.net/whats-on',
    },
  ],
}

const businessSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://www.coleley.com/#organization',
  name: 'Cole Ley Co., Ltd.',
  alternateName: ['Cole Ley Artist Agency', 'Cole Ley Entertainment Agency'],
  url: 'https://www.coleley.com/',
  logo: 'https://www.coleley.com/logo-cole.png',
  email: 'mailto:cole@coleley.com',
  telephone: '+66944271265',
  description:
    'Phuket-based artist and entertainment agency representing Cole Ley and coordinating singers, DJs, bands and specialist musicians for weddings, hospitality venues, corporate events and private celebrations.',
  areaServed: ['Phuket', 'Thailand', 'Asia'],
  knowsAbout: [
    'live music booking',
    'wedding entertainment',
    'artist booking',
    'DJs',
    'bands',
    'singers',
    'specialist musicians',
    'event entertainment',
  ],
  sameAs: officialProfiles,
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://www.coleley.com/#website',
  url: 'https://www.coleley.com/',
  name: 'Cole Ley',
  alternateName: 'Cole Ley Official Website',
  publisher: { '@id': 'https://www.coleley.com/#organization' },
  about: { '@id': 'https://www.coleley.com/#cole-ley' },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(businessSchema).replace(/</g, '\\u003c'),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema).replace(/</g, '\\u003c'),
          }}
        />
        {children}
      </body>
    </html>
  )
}