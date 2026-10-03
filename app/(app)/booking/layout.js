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

export default function BookingLayout({ children }) {
  return children
}
