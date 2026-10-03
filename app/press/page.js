import Link from 'next/link'
import PublicNav from '../components/PublicNav'
import PublicFooter from '../components/PublicFooter'
import PublicBreadcrumbs from '../components/PublicBreadcrumbs'

export const metadata = {
  title: 'Press & Appearances',
  description: 'Selected Cole Ley appearances, venue listings, editorial coverage and official music-platform references from Phuket, Singapore and international releases.',
  alternates: { canonical: '/press' },
  openGraph: {
    title: 'Cole Ley Press & Appearances',
    description: 'Selected independent venue, editorial and music-platform references for Cole Ley.',
    url: '/press',
    images: ['/cole-hero-2026.jpg'],
  },
}

const references = [
  {
    type: 'INTERNATIONAL VENUE',
    title: 'Marina Bay Sands · Paiza Sky Residence',
    text: 'Cole Ley appears in Marina Bay Sands’ Skyline Sessions artist programme as a jazz vocalist.',
    href: 'https://www.marinabaysands.com/world-of-paiza/paiza-sky-residence/skyline-jazz-sessions.html',
    source: 'Marina Bay Sands',
  },
  {
    type: 'EDITORIAL',
    title: 'Time Out Phuket',
    text: 'Time Out Phuket featured a Karon ABBA event led by Cole Ley in its Phuket things-to-do coverage.',
    href: 'https://www.timeout.com/phuket/things-to-do/sing-along-to-your-favourite-abba-tunes-in-karon',
    source: 'Time Out',
  },
  {
    type: 'PHUKET RESIDENCY',
    title: 'Moonshine Phuket',
    text: 'Moonshine lists Cole Ley in its recurring Thursday and Sunday live entertainment programme.',
    href: 'https://www.moonshinephuket.net/whats-on',
    source: 'Moonshine Phuket',
  },
  {
    type: 'PHUKET VENUE',
    title: 'The Factory Phuket',
    text: 'The Factory identifies The Collective featuring Cole Ley as part of its resident live-music offering.',
    href: 'https://thefactoryphuket.com/',
    source: 'The Factory Phuket',
  },
  {
    type: 'OFFICIAL MUSIC PROFILE',
    title: 'Cole Ley on Apple Music',
    text: 'Apple Music maintains an artist profile for Cole Ley and catalogues official release credits.',
    href: 'https://music.apple.com/fr/artist/cole-ley/1688271930',
    source: 'Apple Music',
  },
  {
    type: 'OFFICIAL RELEASE',
    title: 'Show Me Love',
    text: 'Spotify credits Cole Ley alongside Andrey Exx and TuraniQa on the official release.',
    href: 'https://open.spotify.com/track/4aVD6rjT9Zm5YLoiudI0m5',
    source: 'Spotify',
  },
]

const schema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': 'https://www.coleley.com/press#page',
  url: 'https://www.coleley.com/press',
  name: 'Cole Ley Press & Appearances',
  about: { '@id': 'https://www.coleley.com/#cole-ley' },
  isPartOf: { '@id': 'https://www.coleley.com/#website' },
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: references.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: item.href,
      name: item.title,
    })),
  },
}

export default function PressPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\u003c') }} />
      <PublicNav />
      <PublicBreadcrumbs items={[{ label: 'Press & Appearances', href: '/press' }]} />

      <section className="px-6 md:px-16 pt-32 md:pt-40 pb-20 bg-[#080808]">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#d4af37] tracking-[0.35em] text-xs mb-5">PRESS · VENUES · RELEASES</p>
          <h1 className="font-serif text-5xl md:text-8xl leading-none">Cole Ley in Public</h1>
          <p className="text-white/65 text-lg leading-8 mt-8 max-w-3xl">
            Selected independent references to Cole Ley across international venues, Phuket live-music programmes, editorial coverage and official music platforms.
          </p>
        </div>
      </section>

      <section className="px-6 md:px-16 py-20">
        <div className="max-w-5xl mx-auto grid gap-5">
          {references.map((item) => (
            <article key={item.href} className="rounded-[28px] border border-white/10 bg-white/[0.035] p-7 md:p-9">
              <p className="text-[#d4af37] text-xs tracking-[0.2em]">{item.type}</p>
              <div className="mt-3 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <div className="max-w-3xl">
                  <h2 className="font-serif text-3xl md:text-4xl">{item.title}</h2>
                  <p className="text-white/55 leading-7 mt-4">{item.text}</p>
                </div>
                <a href={item.href} target="_blank" rel="noopener noreferrer" className="shrink-0 text-[#d4af37] text-sm">
                  VIEW {item.source.toUpperCase()} →
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-16 py-24 bg-[#080808] text-center border-y border-white/10">
        <h2 className="font-serif text-4xl md:text-6xl">See Cole Ley Live</h2>
        <p className="text-white/60 leading-8 mt-6 max-w-2xl mx-auto">
          View current public dates or send an event request directly into Cole Ley’s Avantiqo Artist Agency booking workflow.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Link href="/live-dates" className="px-8 py-4 rounded-full border border-[#d4af37]/50 text-[#d4af37]">LIVE DATES</Link>
          <Link href="/booking" className="px-8 py-4 rounded-full bg-[#d4af37] text-black font-semibold">BOOKING</Link>
        </div>
      </section>

      <PublicFooter />
    </main>
  )
}
