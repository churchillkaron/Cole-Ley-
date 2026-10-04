export const metadata = {
  title: 'Live Performances & Music',
  description:
    'Watch Cole Ley live and explore acoustic, DJ, duo, trio and full-band performances for Phuket weddings, hotels, beach clubs and private events.',
  alternates: {
    canonical: '/music',
  },
  openGraph: {
    title: 'Cole Ley Live Performances & Music',
    description:
      'Watch live performances and explore booking options from solo acoustic sets to full-band shows.',
    url: '/music',
    images: ['/cole-hero-2026.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cole Ley Live Performances & Music',
    description:
      'Watch Cole Ley live and explore acoustic, duo, trio and full-band performance options.',
    images: ['/cole-hero-2026.jpg'],
  },
}

export default function MusicLayout({ children }) {
  return children
}
