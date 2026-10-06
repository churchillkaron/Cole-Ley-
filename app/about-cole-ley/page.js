import Image from 'next/image'
import Link from 'next/link'
import PublicNav from '../components/PublicNav'
import PublicFooter from '../components/PublicFooter'
import PublicBreadcrumbs from '../components/PublicBreadcrumbs'

export const metadata = {
  title: 'About | Live Artist, Singer & Musician',
  description:
    'Meet Cole Ley, a Phuket-based live artist, singer and musician performing solo, acoustic, with DJ, duo, trio and full band for venues and events.',
  alternates: { canonical: '/about-cole-ley' },
  openGraph: {
    title: 'About | Live Artist, Singer & Musician',
    description:
      'From intimate serenades and acoustic sets to singer-with-DJ shows, duos, trios and full-band performances.',
    url: '/about-cole-ley',
    images: ['/IMG_7181.JPG'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | Live Artist, Singer & Musician',
    description:
      'A versatile Phuket-based live artist for intimate, acoustic, DJ-led and full-band performances.',
    images: ['/IMG_7181.JPG'],
  },
}

const profilePageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': 'https://www.coleley.com/about-cole-ley#profile-page',
  url: 'https://www.coleley.com/about-cole-ley',
  name: 'About Cole Ley',
  mainEntity: {
    '@id': 'https://www.coleley.com/#cole-ley',
  },
}

const formats = [
  {
    eyebrow: 'INTIMATE',
    title: 'Solo Vocal',
    text: 'A focused vocal performance for elegant dinners, ceremonies, lounges, private celebrations and moments where the voice should lead.',
  },
  {
    eyebrow: 'ORGANIC',
    title: 'Solo Acoustic',
    text: 'Voice with acoustic accompaniment for relaxed sunset sets, restaurants, weddings, villas and intimate live-music settings.',
  },
  {
    eyebrow: 'PERSONAL',
    title: 'Serenade',
    text: 'A close, personal performance for proposals, anniversaries, weddings, birthdays and memorable one-to-one moments.',
  },
  {
    eyebrow: 'MODERN',
    title: 'Singer + DJ',
    text: 'Live vocals over a DJ-led set for beach clubs, parties, nightlife, brand events and rooms that need live energy without a full band.',
  },
  {
    eyebrow: 'FLEXIBLE',
    title: 'Duo',
    text: 'Cole with one musician for a fuller live sound while keeping the setup elegant, compact and adaptable to the room.',
  },
  {
    eyebrow: 'DYNAMIC',
    title: 'Trio',
    text: 'A richer live setup for hospitality venues, weddings and events that need more movement, rhythm and musical depth.',
  },
  {
    eyebrow: 'FULL SCALE',
    title: 'Full Band',
    text: 'A complete live show for beach clubs, galas, corporate events, weddings, private parties and high-energy nights.',
  },
  {
    eyebrow: 'BESPOKE',
    title: 'Custom Format',
    text: 'The lineup can be shaped around the venue, audience, timing and atmosphere instead of forcing every event into one fixed package.',
  },
]

export default function Page() {
  return <main className="min-h-screen bg-black text-white">
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(profilePageSchema).replace(/</g, '\\u003c'),
      }}
    />
    <PublicNav />
    <PublicBreadcrumbs items={[{ label: 'About Cole Ley', href: '/about-cole-ley' }]} />

    <section className="px-6 md:px-16 pt-32 md:pt-40 pb-20 bg-[#080808]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-[#d4af37] tracking-[0.35em] text-xs mb-5">
            LIVE ARTIST · SINGER · MUSICIAN · ENTERTAINER
          </p>
          <h1 className="font-serif text-5xl md:text-8xl leading-none">About Cole Ley</h1>
          <p className="text-white/70 text-lg leading-8 mt-8">
            Cole Ley is a Phuket-based live artist whose work goes far beyond one fixed idea of a
            “singer.” She can move from an intimate serenade or stripped-back acoustic performance
            to live vocals with a DJ, a duo or trio, and a complete full-band show.
          </p>
          <p className="text-white/55 text-base leading-8 mt-5">
            Her repertoire moves through soul, blues, jazz and contemporary music, with the
            performance shaped around the room, the audience and the moment. That flexibility makes
            Cole suitable for weddings, hotels, beach clubs, restaurants, corporate events,
            private celebrations and destination events across Thailand and beyond.
          </p>
        </div>
        <Image
          src="/IMG_7181.JPG"
          alt="Cole Ley, versatile live artist, singer and musician based in Phuket"
          width={3808}
          height={5712}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="w-full max-h-[680px] object-cover rounded-[32px] border border-white/10"
        />
      </div>
    </section>

    <section className="px-6 md:px-16 py-20 bg-black">
      <div className="max-w-6xl mx-auto">
        <p className="text-[#d4af37] tracking-[0.32em] text-xs mb-5">ONE ARTIST · MANY FORMATS</p>
        <h2 className="font-serif text-4xl md:text-6xl max-w-4xl">
          From a Serenade to a Full Band
        </h2>
        <p className="text-white/60 leading-8 text-lg mt-6 max-w-4xl">
          The format is part of the performance. Cole can be intimate, acoustic, elegant,
          electronic, soulful or high-energy depending on what the event actually needs.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {formats.map((format) => (
            <article
              key={format.title}
              className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 hover:border-[#d4af37]/35 transition"
            >
              <p className="text-[#d4af37] text-[10px] tracking-[0.2em]">{format.eyebrow}</p>
              <h3 className="font-serif text-2xl mt-3">{format.title}</h3>
              <p className="text-white/55 leading-7 mt-4 text-sm">{format.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="px-6 md:px-16 py-20 bg-[#080808] border-y border-white/10">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-serif text-4xl md:text-6xl mb-7">
          Live Performance Built Around the Moment
        </h2>
        <p className="text-white/65 leading-8 text-lg">
          A wedding ceremony, sunset beach club set, restaurant dinner, private serenade and
          late-night party all need different pacing, repertoire and energy. Cole’s performance
          formats are designed to scale around the event rather than force every audience into the
          same show.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          <Link href="/live-music-phuket" className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 hover:border-[#d4af37]/40 transition">
            <p className="text-[#d4af37] text-xs tracking-[0.18em]">PHUKET</p>
            <h3 className="font-serif text-2xl mt-3">Live Music Phuket</h3>
            <p className="text-white/55 leading-7 mt-3">
              Live soul, blues, jazz and contemporary music for venues and events.
            </p>
          </Link>
          <Link href="/wedding-singer-phuket" className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 hover:border-[#d4af37]/40 transition">
            <p className="text-[#d4af37] text-xs tracking-[0.18em]">WEDDINGS</p>
            <h3 className="font-serif text-2xl mt-3">Wedding Music Phuket</h3>
            <p className="text-white/55 leading-7 mt-3">
              Serenades, ceremony music, cocktails, dinner and reception entertainment.
            </p>
          </Link>
          <Link href="/hotels-beach-clubs-phuket" className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 hover:border-[#d4af37]/40 transition">
            <p className="text-[#d4af37] text-xs tracking-[0.18em]">VENUES</p>
            <h3 className="font-serif text-2xl mt-3">Hotels & Beach Clubs</h3>
            <p className="text-white/55 leading-7 mt-3">
              Acoustic sunsets, singer-with-DJ sets, recurring performances and full-band nights.
            </p>
          </Link>
          <Link href="/entertainment-agency-phuket" className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 hover:border-[#d4af37]/40 transition">
            <p className="text-[#d4af37] text-xs tracking-[0.18em]">AGENCY</p>
            <h3 className="font-serif text-2xl mt-3">Entertainment Agency Phuket</h3>
            <p className="text-white/55 leading-7 mt-3">
              Singers, DJs, musicians and custom entertainment lineups through Cole Ley Co., Ltd.
            </p>
          </Link>
          <Link href="/live-band-phuket" className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 hover:border-[#d4af37]/40 transition">
            <p className="text-[#d4af37] text-xs tracking-[0.18em]">BANDS</p>
            <h3 className="font-serif text-2xl mt-3">Live Band Phuket</h3>
            <p className="text-white/55 leading-7 mt-3">
              Singer-led duo, trio and full-band formats for venues, private events and corporate programmes.
            </p>
          </Link>
          <Link href="/corporate-entertainment-phuket" className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 hover:border-[#d4af37]/40 transition">
            <p className="text-[#d4af37] text-xs tracking-[0.18em]">CORPORATE</p>
            <h3 className="font-serif text-2xl mt-3">Corporate Entertainment Phuket</h3>
            <p className="text-white/55 leading-7 mt-3">
              Live music and custom artist lineups for gala dinners, launches, awards and VIP events.
            </p>
          </Link>
        </div>

        <div className="flex flex-wrap gap-4 mt-10">
          <Link href="/live-dates" className="px-8 py-4 rounded-full border border-[#d4af37]/50 text-[#d4af37]">
            VIEW LIVE DATES
          </Link>
          <Link href="/music" className="px-8 py-4 rounded-full border border-[#d4af37]/50 text-[#d4af37]">
            WATCH PERFORMANCES
          </Link>
          <Link href="/performance-formats" className="px-8 py-4 rounded-full border border-white/20 text-white/80">
            EXPLORE FORMATS
          </Link>
          <Link href="/booking" className="px-8 py-4 rounded-full bg-[#d4af37] text-black font-semibold">
            BUILD A PERFORMANCE
          </Link>
        </div>
      </div>
    </section>

    <PublicFooter />
  </main>
}
