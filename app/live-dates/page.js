import Link from 'next/link'
import PublicNav from '../components/PublicNav'
import PublicFooter from '../components/PublicFooter'
import PublicBreadcrumbs from '../components/PublicBreadcrumbs'

export const revalidate = 300

export const metadata = {
  title: 'Cole Ley Live Dates | Phuket & International Shows',
  description: 'See upcoming public Cole Ley live dates in Phuket, Thailand and international venues, published from the official Avantiqo Artist Agency booking calendar.',
  alternates: { canonical: '/live-dates' },
  openGraph: {
    title: 'Cole Ley Live Dates | Phuket & International Shows',
    description: 'Upcoming public performances from Cole Ley’s official artist booking calendar.',
    url: '/live-dates',
    images: ['/cole-hero-2026.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cole Ley Live Dates | Phuket & International Shows',
    description: 'Upcoming public performances from Cole Ley’s official artist booking calendar.',
    images: ['/cole-hero-2026.jpg'],
  },
}

const AVANTIQO_LIVE_DATES = 'https://avantiqo.ai/api/public/cole-ley/live-dates'

const fallbackSchedule = [
  { id: 'fallback-yona', day: 'SATURDAYS', venue: 'YONA Beach Club', time: '11:30–13:30', note: 'Morning Vibe live set' },
  { id: 'fallback-catch', day: 'SUNDAYS', venue: 'Catch Beach Club', time: '16:00–19:00', note: 'Sunset set' },
  { id: 'fallback-moonshine-thu', day: 'THURSDAYS', venue: 'Moonshine', time: '20:00–23:00', note: 'Live set' },
  { id: 'fallback-moonshine-sun', day: 'SUNDAYS', venue: 'Moonshine', time: '20:00–23:00', note: 'Jazz & Blues' },
]

function dateLabel(value) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'Date to be announced'
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'Asia/Bangkok',
  }).format(date)
}

function timeLabel(value) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Bangkok',
  }).format(date)
}

async function loadLiveDates() {
  try {
    const response = await fetch(AVANTIQO_LIVE_DATES, {
      headers: { 'User-Agent': 'ColeLeyWebsite/1.0' },
      next: { revalidate: 300 },
    })
    if (!response.ok) return { connected: false, events: [] }
    const payload = await response.json()
    return {
      connected: true,
      events: Array.isArray(payload?.events) ? payload.events : [],
    }
  } catch {
    return { connected: false, events: [] }
  }
}

function musicEventSchema(event) {
  const location = event.venue
    ? {
        '@type': 'Place',
        name: event.venue,
        address: {
          '@type': 'PostalAddress',
          addressLocality: event.city || undefined,
          addressCountry: event.country || undefined,
        },
      }
    : undefined

  return {
    '@context': 'https://schema.org',
    '@type': 'MusicEvent',
    '@id': `https://www.coleley.com/live-dates#${event.id}`,
    name: event.title || (event.venue ? `Cole Ley live at ${event.venue}` : 'Cole Ley Live'),
    startDate: event.start_date,
    endDate: event.end_date || undefined,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location,
    performer: { '@id': 'https://www.coleley.com/#cole-ley' },
    image: ['https://www.coleley.com/cole-hero-2026.jpg'],
    url: event.ticket_url || 'https://www.coleley.com/live-dates',
  }
}

export default async function LiveDatesPage() {
  const { connected, events } = await loadLiveDates()

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': 'https://www.coleley.com/live-dates#page',
    url: 'https://www.coleley.com/live-dates',
    name: 'Cole Ley Live Dates',
    description: 'Official public performance schedule for Cole Ley.',
    about: { '@id': 'https://www.coleley.com/#cole-ley' },
    isPartOf: { '@id': 'https://www.coleley.com/#website' },
    mainEntity: events.map((event) => ({ '@id': `https://www.coleley.com/live-dates#${event.id}` })),
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema).replace(/</g, '\u003c') }} />
      {events.map((event) => (
        <script
          key={event.id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(musicEventSchema(event)).replace(/</g, '\u003c') }}
        />
      ))}

      <PublicNav />
      <PublicBreadcrumbs items={[{ label: 'Live Dates', href: '/live-dates' }]} />

      <section className="px-6 md:px-16 pt-32 md:pt-40 pb-20 bg-[#080808]">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#d4af37] tracking-[0.35em] text-xs mb-5">OFFICIAL LIVE CALENDAR</p>
          <h1 className="font-serif text-5xl md:text-8xl leading-none">Where to See Cole Ley</h1>
          <p className="text-white/65 text-lg leading-8 mt-8 max-w-3xl">
            Public performances are published from Cole Ley’s official Avantiqo Artist Agency calendar. Private bookings can block availability without exposing client or event details.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <Link href="/booking" className="px-7 py-3 rounded-full bg-[#d4af37] text-black font-semibold">CHECK A DATE</Link>
            <Link href="/music" className="px-7 py-3 rounded-full border border-white/20">WATCH LIVE</Link>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-16 py-20">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#d4af37] tracking-[0.3em] text-xs mb-5">UPCOMING PUBLIC SHOWS</p>

          {events.length ? (
            <div className="grid md:grid-cols-2 gap-5">
              {events.map((event) => (
                <article key={event.id} className="rounded-[28px] border border-white/10 bg-white/[0.035] p-7">
                  <p className="text-[#d4af37] text-xs tracking-[0.18em]">{dateLabel(event.start_date).toUpperCase()}</p>
                  <h2 className="font-serif text-3xl mt-3">{event.title || event.venue || 'Cole Ley Live'}</h2>
                  {event.venue ? <p className="text-white/80 mt-3 text-lg">{event.venue}</p> : null}
                  <p className="text-white/50 mt-2">
                    {[timeLabel(event.start_date), event.city, event.country].filter(Boolean).join(' · ')}
                  </p>
                  {event.performance_type ? <p className="text-white/40 mt-2 text-sm">{event.performance_type}</p> : null}
                  {event.ticket_url ? (
                    <a href={event.ticket_url} target="_blank" rel="noreferrer" className="inline-block mt-5 text-[#d4af37] text-sm">
                      VENUE / TICKETS →
                    </a>
                  ) : null}
                </article>
              ))}
            </div>
          ) : connected ? (
            <div className="rounded-[28px] border border-white/10 bg-white/[0.035] p-8">
              <h2 className="font-serif text-3xl">No public dates are published right now.</h2>
              <p className="text-white/55 leading-7 mt-4">New confirmed public shows will appear here automatically when they are published in Avantiqo.</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-5">
                {fallbackSchedule.map((event) => (
                  <article key={event.id} className="rounded-[28px] border border-white/10 bg-white/[0.035] p-7">
                    <p className="text-[#d4af37] text-xs tracking-[0.18em]">{event.day}</p>
                    <h2 className="font-serif text-3xl mt-3">{event.venue}</h2>
                    <p className="text-white/80 mt-3 text-lg">{event.time}</p>
                    <p className="text-white/50 mt-2">{event.note}</p>
                  </article>
                ))}
              </div>
              <p className="text-white/40 text-sm leading-6 mt-6">
                The Avantiqo live calendar is temporarily unavailable, so the most recently published residency schedule is shown as a fallback.
              </p>
            </>
          )}
        </div>
      </section>

      <section className="px-6 md:px-16 py-24 text-center bg-[#080808] border-y border-white/10">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#d4af37] tracking-[0.3em] text-xs mb-5">PLANNING AN EVENT?</p>
          <h2 className="font-serif text-4xl md:text-6xl">Check the Date in Avantiqo</h2>
          <p className="text-white/60 leading-8 mt-6">
            Send the date, venue and event format. The request is recorded directly in Cole Ley’s Artist Agency workspace, where holds, contracts, deposits and confirmed shows are managed.
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
