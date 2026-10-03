import Link from 'next/link'
import PublicNav from '../components/PublicNav'
import PublicFooter from '../components/PublicFooter'
import PublicBreadcrumbs from '../components/PublicBreadcrumbs'
import PublicFaq from '../components/PublicFaq'

export const metadata = {
  title: 'Performance Formats | Solo, Acoustic, DJ, Duo, Trio & Band',
  description:
    'Explore Cole Ley performance formats in Phuket and beyond: solo vocal, solo acoustic, serenade, singer with DJ, duo, trio, full band and bespoke live entertainment.',
  alternates: { canonical: '/performance-formats' },
  openGraph: {
    title: 'Cole Ley Performance Formats',
    description:
      'From an intimate serenade or acoustic set to singer-with-DJ, duo, trio and full-band shows.',
    url: '/performance-formats',
    images: ['/cole-hero-2026.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cole Ley Performance Formats',
    description:
      'Solo vocal, acoustic, serenade, singer with DJ, duo, trio and full-band performance options.',
    images: ['/cole-hero-2026.jpg'],
  },
}

const formats = [
  {
    name: 'Solo Vocal',
    eyebrow: 'VOICE FIRST',
    description:
      'A focused live vocal performance for elegant dinners, ceremonies, cocktail hours, lounges, villas and intimate events.',
    suited: 'Elegant dinners · ceremonies · intimate events',
  },
  {
    name: 'Solo Acoustic',
    eyebrow: 'STRIPPED BACK',
    description:
      'Cole performing in a relaxed acoustic format for sunsets, restaurants, weddings, hotels and private celebrations.',
    suited: 'Sunsets · restaurants · weddings · hotels',
  },
  {
    name: 'Serenade',
    eyebrow: 'PERSONAL',
    description:
      'A close, personal performance built for proposals, anniversaries, wedding moments, birthdays and meaningful one-to-one occasions.',
    suited: 'Proposals · anniversaries · wedding moments',
  },
  {
    name: 'Singer + DJ',
    eyebrow: 'MODERN ENERGY',
    description:
      'Live vocals integrated with a DJ-led set for beach clubs, parties, nightlife, brand events and modern celebrations.',
    suited: 'Beach clubs · parties · nightlife · brand events',
  },
  {
    name: 'Duo',
    eyebrow: 'COMPACT LIVE',
    description:
      'Cole with one musician for a fuller live sound while keeping the performance elegant, flexible and easy to fit into the room.',
    suited: 'Weddings · lounges · dinners · private events',
  },
  {
    name: 'Trio',
    eyebrow: 'MORE MOVEMENT',
    description:
      'A richer live arrangement with more rhythm and musical depth for hospitality venues, celebrations and event stages.',
    suited: 'Hotels · weddings · events · hospitality',
  },
  {
    name: 'Full Band',
    eyebrow: 'FULL SCALE',
    description:
      'A complete live show for beach clubs, galas, corporate events, weddings, private parties and high-energy nights.',
    suited: 'Galas · beach clubs · weddings · large events',
  },
  {
    name: 'Bespoke Format',
    eyebrow: 'BUILT FOR THE EVENT',
    description:
      'A tailored setup built around the venue, timing, audience and atmosphere when one standard format is not the right answer.',
    suited: 'Destination events · brands · custom productions',
  },
]

const schema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': 'https://www.coleley.com/performance-formats#formats',
  name: 'Cole Ley Performance Formats',
  url: 'https://www.coleley.com/performance-formats',
  numberOfItems: formats.length,
  itemListElement: formats.map((format, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Service',
      name: format.name,
      description: format.description,
      provider: { '@id': 'https://www.coleley.com/#cole-ley' },
      areaServed: [
        { '@type': 'Place', name: 'Phuket' },
        { '@type': 'Country', name: 'Thailand' },
      ],
      url: 'https://www.coleley.com/booking',
    },
  })),
}

const faqItems = [
  {
    question: 'Is Cole Ley only available as a singer with a band?',
    answer:
      'No. Cole can perform as solo vocal, solo acoustic, serenade, singer with DJ, duo, trio or full band depending on the event.',
  },
  {
    question: 'Can Cole Ley perform with a DJ?',
    answer:
      'Yes. A singer-with-DJ format is available for beach clubs, parties, nightlife, brand events and other settings where live vocals and DJ energy work well together.',
  },
  {
    question: 'Can I book Cole Ley for a serenade?',
    answer:
      'Yes. Serenade-style performances are available for proposals, anniversaries, weddings, birthdays and other personal moments.',
  },
  {
    question: 'Which performance format should I choose?',
    answer:
      'The best format depends on the venue, audience, timing and atmosphere. If you are not sure, send the event details and Cole Ley can recommend an appropriate setup.',
  },
  {
    question: 'Can the performance be customized for the event?',
    answer:
      'Yes. The performance can be shaped around the event rather than forcing every booking into one fixed package.',
  },
]

export default function PerformanceFormatsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
        }}
      />
      <PublicNav />
      <PublicBreadcrumbs items={[{ label: 'Performance Formats', href: '/performance-formats' }]} />

      <section className="px-6 md:px-16 pt-32 md:pt-40 pb-20 bg-[#080808]">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#d4af37] tracking-[0.35em] text-xs mb-5">
            ONE ARTIST · MANY WAYS TO PERFORM
          </p>
          <h1 className="font-serif text-5xl md:text-8xl leading-none max-w-5xl">
            Choose the Performance, Not Just the Singer
          </h1>
          <p className="text-white/65 text-lg leading-8 mt-8 max-w-4xl">
            Cole Ley can move from a personal serenade or stripped-back acoustic set to singer
            with DJ, duo, trio or a complete full-band show. The format is chosen around the
            atmosphere, venue, audience and moment.
          </p>
          <div className="flex flex-wrap gap-4 mt-9">
            <Link
              href="/booking"
              className="px-8 py-4 rounded-full bg-[#d4af37] text-black font-semibold"
            >
              BUILD YOUR PERFORMANCE
            </Link>
            <Link
              href="/music"
              className="px-8 py-4 rounded-full border border-white/20 text-white/80"
            >
              WATCH LIVE PERFORMANCES
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-16 py-20 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {formats.map((format) => (
              <article
                key={format.name}
                className="rounded-[28px] border border-white/10 bg-white/[0.035] p-7 hover:border-[#d4af37]/35 transition"
              >
                <p className="text-[#d4af37] text-[10px] tracking-[0.2em]">{format.eyebrow}</p>
                <h2 className="font-serif text-3xl mt-3">{format.name}</h2>
                <p className="text-white/55 leading-7 mt-4">{format.description}</p>
                <p className="text-white/35 text-xs leading-6 mt-6 border-t border-white/10 pt-4">
                  {format.suited}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-16 py-20 bg-[#080808] border-y border-white/10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          <div>
            <p className="text-[#d4af37] tracking-[0.3em] text-xs mb-5">START INTIMATE</p>
            <h2 className="font-serif text-4xl md:text-6xl">
              Acoustic, Vocal & Personal
            </h2>
            <p className="text-white/60 leading-8 mt-6">
              Some events need presence without volume. Solo vocal, solo acoustic and serenade
              formats keep the focus close to the guests and work naturally for ceremonies,
              dinners, proposals, villas, sunsets and elegant hospitality settings.
            </p>
          </div>
          <div>
            <p className="text-[#d4af37] tracking-[0.3em] text-xs mb-5">BUILD THE ENERGY</p>
            <h2 className="font-serif text-4xl md:text-6xl">
              DJ, Ensemble & Full Band
            </h2>
            <p className="text-white/60 leading-8 mt-6">
              When the room needs more movement, Cole can step into a singer-with-DJ format or
              scale through duo, trio and full band. That makes the same artist suitable for a
              sunset session, a brand event, a wedding reception or a late-night party.
            </p>
          </div>
        </div>
      </section>

      <PublicFaq title="Choosing a Cole Ley Performance Format" items={faqItems} />

      <section className="px-6 md:px-16 py-24 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#d4af37] tracking-[0.3em] text-xs mb-5">
            NOT SURE WHICH FORMAT?
          </p>
          <h2 className="font-serif text-4xl md:text-6xl">
            Tell Us About the Event
          </h2>
          <p className="text-white/60 leading-8 mt-6">
            Share the date, venue, guest profile and atmosphere you want. The booking form lets
            you choose a format or ask for a recommendation.
          </p>
          <Link
            href="/booking"
            className="inline-block mt-8 px-9 py-4 rounded-full bg-[#d4af37] text-black font-semibold"
          >
            REQUEST AVAILABILITY
          </Link>
        </div>
      </section>

      <PublicFooter />
    </main>
  )
}
