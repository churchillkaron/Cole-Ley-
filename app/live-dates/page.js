import Link from 'next/link'
import PublicNav from '../components/PublicNav'
import PublicFooter from '../components/PublicFooter'
import PublicBreadcrumbs from '../components/PublicBreadcrumbs'

export const metadata = {
  title: 'Cole Ley Live Dates | October 2026',
  description: 'See where to catch Cole Ley live in October 2026 in Phuket and Singapore, with recurring venue sets and special dates.',
  alternates: { canonical: '/live-dates' },
  openGraph: {
    title: 'Cole Ley Live Dates | October 2026',
    description: 'October live dates and recurring performances for Cole Ley in Phuket and Singapore.',
    url: '/live-dates',
    images: ['/cole-hero-2026.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cole Ley Live Dates | October 2026',
    description: 'October live dates and recurring performances for Cole Ley.',
    images: ['/cole-hero-2026.jpg'],
  },
}

const schedule = [
  ['SATURDAYS', 'YONA Beach Club', '11:30–13:30', 'Morning Vibe live set'],
  ['SUNDAYS', 'Catch Beach Club', '16:00–19:00', 'Sunset set'],
  ['THURSDAYS', 'Moonshine', '20:00–23:00', 'Ladies Night'],
  ['SUNDAYS', 'Moonshine', '20:00–23:00', 'Jazz & Blues'],
]

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': 'https://www.coleley.com/live-dates#page',
  url: 'https://www.coleley.com/live-dates',
  name: 'Cole Ley Live Dates — October 2026',
  description: 'Current public performance schedule for Cole Ley in Phuket and Singapore.',
  about: { '@id': 'https://www.coleley.com/#cole-ley' },
  isPartOf: { '@id': 'https://www.coleley.com/#website' },
}

export default function LiveDatesPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema).replace(/</g, '\\u003c') }} />
      <PublicNav />
      <PublicBreadcrumbs items={[{ label: 'Live Dates', href: '/live-dates' }]} />

      <section className="px-6 md:px-16 pt-32 md:pt-40 pb-20 bg-[#080808]">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#d4af37] tracking-[0.35em] text-xs mb-5">OCTOBER 2026 · LIVE SCHEDULE</p>
          <h1 className="font-serif text-5xl md:text-8xl leading-none">Where to See Cole Ley</h1>
          <p className="text-white/65 text-lg leading-8 mt-8 max-w-3xl">
            The recurring schedule below is the current October plan. Special travel and private-event dates can override a recurring set, so date-specific changes are posted first on Instagram.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <a href="https://www.instagram.com/p/DeBVwtWTkh-/" target="_blank" rel="noreferrer" className="px-7 py-3 rounded-full border border-[#d4af37]/50 text-[#d4af37]">
              VIEW OCTOBER SCHEDULE ON INSTAGRAM
            </a>
            <Link href="/booking" className="px-7 py-3 rounded-full bg-[#d4af37] text-black font-semibold">BOOK COLE LEY</Link>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-16 py-20">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#d4af37] tracking-[0.3em] text-xs mb-5">RECURRING OCTOBER SETS</p>
          <div className="grid md:grid-cols-2 gap-5">
            {schedule.map(([day, venue, time, note]) => (
              <article key={`${day}-${venue}`} className="rounded-[28px] border border-white/10 bg-white/[0.035] p-7">
                <p className="text-[#d4af37] text-xs tracking-[0.18em]">{day}</p>
                <h2 className="font-serif text-3xl mt-3">{venue}</h2>
                <p className="text-white/80 mt-3 text-lg">{time}</p>
                <p className="text-white/50 mt-2">{note}</p>
              </article>
            ))}
          </div>
          <p className="text-white/40 text-sm leading-6 mt-6">
            Check the latest Instagram schedule before travelling specifically for a performance.
          </p>
        </div>
      </section>

      <section className="px-6 md:px-16 py-20 bg-[#080808] border-y border-white/10">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#d4af37] tracking-[0.3em] text-xs mb-5">SPECIAL OCTOBER DATES</p>
          <div className="grid md:grid-cols-2 gap-5">
            <article className="rounded-[28px] border border-white/10 bg-white/[0.035] p-7">
              <p className="text-[#d4af37] text-xs tracking-[0.18em]">OCTOBER 23–24</p>
              <h2 className="font-serif text-3xl mt-3">Cool Cats · Singapore</h2>
              <p className="text-white/55 leading-7 mt-4">International live dates in Singapore.</p>
            </article>
            <article className="rounded-[28px] border border-white/10 bg-white/[0.035] p-7">
              <p className="text-[#d4af37] text-xs tracking-[0.18em]">OCTOBER 28</p>
              <h2 className="font-serif text-3xl mt-3">Private Event</h2>
              <p className="text-white/55 leading-7 mt-4">Closed private booking — not a public performance.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-16 py-24 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#d4af37] tracking-[0.3em] text-xs mb-5">NEED A DIFFERENT DATE?</p>
          <h2 className="font-serif text-4xl md:text-6xl">Build the Right Performance</h2>
          <p className="text-white/60 leading-8 mt-6">
            Cole can perform solo vocal, solo acoustic, serenade, singer with DJ, duo, trio or full band depending on the event and atmosphere.
          </p>
          <Link href="/booking" className="inline-block mt-8 px-9 py-4 rounded-full bg-[#d4af37] text-black font-semibold">
            REQUEST AVAILABILITY
          </Link>
        </div>
      </section>

      <PublicFooter />
    </main>
  )
}
