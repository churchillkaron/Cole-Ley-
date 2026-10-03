export const metadata = {
  title: 'Book Cole Ley',
  description:
    'Book Cole Ley for weddings, hotels, beach clubs, restaurants, corporate events and private parties in Phuket, Thailand and destination events across Asia.',
  alternates: {
    canonical: '/booking',
  },
  openGraph: {
    title: 'Book Cole Ley for Live Music',
    description:
      'Request availability and a live music proposal for your wedding, venue or private event.',
    url: '/booking',
    images: ['/cole-hero-2026.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book Cole Ley for Live Music',
    description:
      'Request availability for weddings, hotels, beach clubs, private events and destination performances.',
    images: ['/cole-hero-2026.jpg'],
  },
}

const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': 'https://www.coleley.com/booking#contact-page',
  url: 'https://www.coleley.com/booking',
  name: 'Book Cole Ley',
  description:
    'Request availability for Cole Ley live performances for weddings, hotels, beach clubs, restaurants, corporate events and private events.',
  mainEntity: {
    '@id': 'https://www.coleley.com/#cole-ley',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'booking enquiries',
    telephone: '+66944271265',
    email: 'cole@coleley.com',
    areaServed: ['Phuket', 'Thailand', 'Asia'],
    availableLanguage: ['English'],
  },
}

export default function BookingLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactPageSchema).replace(/</g, '\\u003c'),
        }}
      />
      {children}
    </>
  )
}
