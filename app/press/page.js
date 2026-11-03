import Link from 'next/link'
import PublicNav from '../components/PublicNav'
import PublicFooter from '../components/PublicFooter'
import PublicBreadcrumbs from '../components/PublicBreadcrumbs'

export const revalidate = 300

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

const AVANTIQO_PRESS = 'https://avantiqo.ai/api/public/cole-ley/press'

const fallbackReferences = [
  { type: 'INTERNATIONAL VENUE', title: 'Marina Bay Sands · Paiza Sky Residence', text: 'Cole Ley appears in Marina Bay Sands’ Skyline Sessions artist programme as a jazz vocalist.', href: 'https://www.marinabaysands.com/world-of-paiza/paiza-sky-residence/skyline-jazz-sessions.html', source: 'Marina Bay Sands', verified_at: '2026-10-03T14:54:34.890647Z' },
  { type: 'EDITORIAL', title: 'Time Out Phuket', text: 'Time Out Phuket featured a Karon ABBA event led by Cole Ley in its Phuket things-to-do coverage.', href: 'https://www.timeout.com/phuket/things-to-do/sing-along-to-your-favourite-abba-tunes-in-karon', source: 'Time Out', verified_at: '2026-10-03T14:54:34.890647Z' },
  { type: 'PHUKET RESIDENCY', title: 'Moonshine Phuket', text: 'Moonshine lists Cole Ley in its recurring Thursday and Sunday live entertainment programme.', href: 'https://www.moonshinephuket.net/whats-on', source: 'Moonshine Phuket', verified_at: '2026-10-03T14:54:34.890647Z' },
  { type: 'PHUKET VENUE', title: 'The Factory Phuket', text: 'The Factory identifies The Collective featuring Cole Ley as part of its resident live-music offering.', href: 'https://thefactoryphuket.com/', source: 'The Factory Phuket', verified_at: '2026-10-03T14:54:34.890647Z' },
  { type: 'OFFICIAL MUSIC PROFILE', title: 'Cole Ley on Apple Music', text: 'Apple Music maintains an artist profile for Cole Ley and catalogues official release credits.', href: 'https://music.apple.com/fr/artist/cole-ley/1688271930', source: 'Apple Music', verified_at: '2026-10-03T14:54:34.890647Z' },
  { type: 'OFFICIAL MUSIC PROFILE', title: 'Cole Ley on Spotify', text: 'Spotify maintains Cole Ley’s official artist profile and links it directly from credited releases.', href: 'https://open.spotify.com/artist/2VBy8qDokhFWatU5GofoT9', source: 'Spotify', verified_at: '2026-10-03T14:54:34.890647Z' },
  { type: 'OFFICIAL RELEASE', title: 'Show Me Love', text: 'Spotify credits Cole Ley alongside Andrey Exx and TuraniQa on the official release.', href: 'https://open.spotify.com/track/4aVD6rjT9Zm5YLoiudI0m5', source: 'Spotify', verified_at: '2026-10-03T14:56:27.650167Z' },
  { type: 'INTERNATIONAL EVENT LISTING', title: 'Live at Cool Cats Singapore · Cole Ley', text: 'SISTIC lists Cole Ley for 23 and 24 October at Cool Cats Singapore and describes her as a soulful contemporary vocalist.', href: 'https://www.sistic.com.sg/events/lite_coolcats12', source: 'SISTIC Singapore', verified_at: '2026-10-04T01:39:31.157870Z' },
  { type: 'INTERNATIONAL HEADLINER LISTING', title: 'Cole Ley · Live at Cool Cats', text: 'Eventbrite lists Cole Ley as a headliner in the Cool Cats Singapore live-music lineup organised by Vamp Productions.', href: 'https://www.eventbrite.sg/e/live-at-cool-cats-tickets-1673674839499?aff=ebdsoporgprofile', source: 'Eventbrite / Vamp Productions', verified_at: '2026-10-04T01:39:31.157870Z' },
  { type: 'EDITORIAL VENUE COVERAGE', title: 'Moonshine Phuket · Cole Ley & The Band', text: 'Phuket101 independently names Cole Ley & The Band in Moonshine Phuket’s weekly live-entertainment programme.', href: 'https://www.phuket101.net/moonshine/', source: 'Phuket101', verified_at: '2026-10-04T01:39:31.157870Z' },
]

function referenceTimestamp(item) {
  const value = item?.published_at || item?.verified_at || item?.updated_at || item?.created_at
  if (!value) return 0
  const timestamp = Date.parse(value)
  return Number.isFinite(timestamp) ? timestamp : 0
}

function newestFirst(items) {
  return [...items].sort((a, b) => referenceTimestamp(b) - referenceTimestamp(a))
}

async function loadReferences() {
  try {
    const response = await fetch(AVANTIQO_PRESS, {
      headers: { 'User-Agent': 'ColeLeyWebsite/1.0' },
      next: { revalidate: 300 },
    })
    if (!response.ok) return { references: newestFirst(fallbackReferences), connected: false }
    const payload = await response.json()
    const items = Array.isArray(payload?.items) ? payload.items : []
    const combined = [...new Map([...items, ...fallbackReferences].filter((item) => /^https:\/\//.test(item.href || "")).map((item) => [item.href, item])).values()]
    return { references: newestFirst(combined), connected: true }
  } catch {
    return { references: newestFirst(fallbackReferences), connected: false }
  }
}

export default async function PressPage() {
  const { references, connected } = await loadReferences()

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
        item: {
          '@type': 'WebPage',
          url: item.href,
          name: item.title,
          description: item.text || undefined,
          publisher: item.source
            ? {
                '@type': 'Organization',
                name: item.source,
              }
            : undefined,
          datePublished: item.published_at || undefined,
          about: { '@id': 'https://www.coleley.com/#cole-ley' },
        },
      })),
    },
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\u003c') }} />
      <PublicNav />
      <PublicBreadcrumbs items={[{ label: 'Press & Appearances', href: '/press' }]} />

      <section className="border-b border-white/10 bg-[#090909] px-6 pb-14 pt-12 md:px-16 md:pb-20 md:pt-20">
        <div className="mx-auto grid max-w-6xl items-end gap-12 lg:grid-cols-[1.5fr_0.6fr]">
          <div>
            <p className="mb-5 text-[11px] font-semibold tracking-[0.28em] text-[#d4af37]">COLE LEY / MEDIA &amp; APPEARANCES</p>
            <h1 className="font-serif text-5xl leading-[1.07] tracking-tight md:text-7xl">The voice.<br/><span className="text-[#d4af37]">The story.</span></h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/60 md:text-lg">Independent editorial coverage, international performances, venue features and official music releases. Explore verified sources directly from their publishers.</p>
          </div>
          <div className="border-l border-[#d4af37]/55 pl-6">
            <p className="text-[10px] font-semibold tracking-[0.22em] text-[#d4af37]">PRESS CONTACT</p>
            <h2 className="mt-4 font-serif text-2xl">Booking &amp; media enquiries</h2>
            <p className="mt-3 text-sm leading-6 text-white/50">For interviews, performances and partnerships, contact Cole Ley Co., Ltd.</p>
            <Link href="/booking" className="mt-5 inline-block border-b border-[#d4af37]/50 pb-2 text-xs tracking-[0.15em] text-[#d4af37]">GET IN TOUCH ↗</Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-14 md:px-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col justify-between gap-5 border-b border-white/10 pb-7 md:flex-row md:items-end">
            <div><p className="mb-3 text-[10px] font-semibold tracking-[0.22em] text-[#d4af37]">01 / EXTERNAL SOURCES</p><h2 className="font-serif text-4xl md:text-5xl">In the press &amp; on stage</h2></div>
            <div className="max-w-sm text-sm leading-6 text-white/45">Original publisher links. Publication dates are shown only when available; verification dates are not presented as publication dates.</div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {references.map((item, index) => (
              <article key={item.href} className={`flex min-h-[260px] flex-col border p-7 md:p-9 ${index === 0 ? 'border-[#d4af37]/40 bg-[#1d1810]' : 'border-white/10 bg-white/[0.025]'}`}>
                <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] tracking-[0.18em]"><span className="text-[#d4af37]">{item.type || 'EXTERNAL REFERENCE'}</span><span className="text-white/40">{item.source || 'PUBLISHER'}</span></div>
                <h3 className="mt-6 font-serif text-2xl leading-[1.3] md:text-3xl">{item.title}</h3>
                {item.text ? <p className="mt-4 text-sm leading-7 text-white/55">{item.text}</p> : null}
                <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
                  <span className="text-xs text-white/40">{item.published_at ? `Published ${new Date(item.published_at).toLocaleDateString('en-GB', { timeZone: 'UTC' })}` : 'Original publisher'}</span>
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-xs tracking-[0.08em] text-[#d4af37] hover:text-white">READ ORIGINAL ↗</a>
                </div>
              </article>
            ))}
          </div>
          {!connected ? <p className="mt-6 text-xs leading-6 text-white/40">Showing established references. The live discovery feed is currently unavailable; publication is limited to existing sourced references.</p> : null}
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0d0d0d] px-6 py-16 md:px-16">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div><p className="mb-3 text-[10px] font-semibold tracking-[0.22em] text-[#d4af37]">NEXT PERFORMANCE</p><h2 className="font-serif text-3xl md:text-5xl">Experience Cole Ley live.</h2><p className="mt-3 text-sm text-white/50">See the official schedule and enquire about bookings.</p></div>
          <div className="flex flex-wrap gap-3"><Link href="/live-dates" className="border border-[#d4af37]/60 px-7 py-4 text-xs tracking-widest text-[#d4af37]">LIVE DATES</Link><Link href="/booking" className="bg-[#d4af37] px-7 py-4 text-xs font-semibold tracking-widest text-black">BOOK COLE LEY</Link></div>
        </div>
      </section>

      <PublicFooter />
    </main>
  )
}
