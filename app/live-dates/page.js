import Link from 'next/link'
import PublicNav from '../components/PublicNav'
import PublicFooter from '../components/PublicFooter'
import PublicBreadcrumbs from '../components/PublicBreadcrumbs'

export const revalidate = 300

export const metadata = {
  title: 'Live Dates | Phuket & International Shows',
  description: 'See upcoming public Cole Ley live dates in Phuket, Thailand and international venues, published from the official Avantiqo Artist Agency booking calendar.',
  alternates: { canonical: '/live-dates' },
  openGraph: {
    title: 'Live Dates | Phuket & International Shows',
    description: 'Upcoming public performances from Cole Ley’s official artist booking calendar.',
    url: '/live-dates',
    images: ['/cole-hero-2026.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Live Dates | Phuket & International Shows',
    description: 'Upcoming public performances from Cole Ley’s official artist booking calendar.',
    images: ['/cole-hero-2026.jpg'],
  },
}

const AVANTIQO_LIVE_DATES = 'https://avantiqo.ai/api/public/cole-ley/live-dates'

const fallbackSchedule = [
  { id: 'fallback-yona', day: 'TUE · THU · SUN', venue: 'YONA Beach Club', time: '11:30–13:30', note: 'Morning package' },
  { id: 'fallback-catch', day: 'FRI · SUN', venue: 'Catch Beach Club', time: '15:00–18:00', note: 'Sunset set' },
  { id: 'fallback-churchill', day: 'WEDNESDAYS', venue: 'Churchill Restaurant & Bar', time: '20:00–23:00', note: 'Cole Ley & The Band' },
  { id: 'fallback-moonshine-thursday', day: 'THURSDAYS', venue: 'Moonshine Phuket', time: '20:00–23:00', note: 'Ladies Night' },
  { id: 'fallback-moonshine-sunday', day: 'SUNDAYS', venue: 'Moonshine Phuket', time: '20:00–23:00', note: 'Sauce & Blues' },
  { id: 'fallback-anantara', day: 'SATURDAYS', venue: 'Anantara Layan', time: '12:00–15:00', note: 'Brunch performance' },
]

function dateLabel(value, timeZone = 'Asia/Bangkok') {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'Date to be announced'
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone,
  }).format(date)
}

function dateOnlyLabel(value) {
  const match = String(value || '').match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (!match) return 'Date to be announced'
  const [, year, month, day] = match
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), 12))
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}

function timeLabel(value, timeZone = 'Asia/Bangkok') {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone,
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
    const now = Date.now()
    const events = (Array.isArray(payload?.events) ? payload.events : []).filter((event) => {
      const end = new Date(event?.end_date || event?.start_date || '').getTime()
      return Number.isFinite(end) && end >= now
    })
    return {
      connected: true,
      events,
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
    startDate: event.date_only ? (event.public_date || event.start_date) : event.start_date,
    endDate: event.date_only ? undefined : (event.end_date || undefined),
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
  const showResidencySchedule = events.length === 0

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
                  <p className="text-[#d4af37] text-xs tracking-[0.18em]">
                    {(event.date_only ? dateOnlyLabel(event.public_date) : dateLabel(event.start_date, event.timezone)).toUpperCase()}
                  </p>
                  <h2 className="font-serif text-3xl mt-3">{event.title || event.venue || 'Cole Ley Live'}</h2>
                  {event.venue ? <p className="text-white/80 mt-3 text-lg">{event.venue}</p> : null}
                  {!event.date_only ? (
                    <p className="text-white/50 mt-2">
                      {[event.end_date ? `${timeLabel(event.start_date, event.timezone)}–${timeLabel(event.end_date, event.timezone)}` : timeLabel(event.start_date, event.timezone), event.city, event.country].filter(Boolean).join(' · ')}
                    </p>
                  ) : null}
                  {event.performance_type ? <p className="text-white/40 mt-2 text-sm">{event.performance_type}</p> : null}
                  {event.ticket_url ? <a href={event.ticket_url} target="_blank" rel="noreferrer" className="inline-block mt-5 text-[#d4af37] text-sm">VENUE / TICKETS →</a> : null}
                </article>
              ))}
            </div>
          ) : null}
          {showResidencySchedule ? (
            <>
              <p className="text-[#d4af37] tracking-[0.2em] text-xs mb-5">NOVEMBER 2026 · WEEKLY RESIDENCIES</p>
              <p className="text-white/55 leading-7 mb-8">
                November performance schedule supplied by Cole Ley’s team. The official Avantiqo booking feed currently has no published public dates, so these are advertised residency times rather than individually confirmed bookings. Singapore travel and one-off performances may supersede regular shows.
              </p>
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
              <div className="mt-10 rounded-[28px] border border-[#d4af37]/30 p-7">
                <p className="text-[#d4af37] text-xs tracking-[0.2em]">SPECIAL NOVEMBER APPEARANCES</p>
                <ul className="mt-5 grid gap-4 text-white/75">
                  <li>6 NOV · Marina Bay Sands, Singapore</li>
                  <li>7 NOV · Private event, Singapore</li>
                  <li>17 NOV · Barracuda Beach Club · Sunset</li>
                  <li>28 NOV · ABBA Tribute Night · Cole Ley & The Band · Churchill, Karon · Show 20:00–23:00</li>
                </ul>
                <p className="text-white/40 text-sm leading-6 mt-5">6–7 November travel conflicts with the regular Friday/Saturday Phuket residencies. Please confirm individual performances with each venue.</p>
              </div>
              <p className="text-white/40 text-sm leading-6 mt-6">
                {connected ? 'The Avantiqo calendar is connected but has no published dates.' : 'The Avantiqo booking feed is temporarily unavailable.'} New confirmed public bookings appear here automatically once published in Artist Agency.
              </p>
            </>
          ) : null}
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
