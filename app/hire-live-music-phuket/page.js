import Link from 'next/link'
import PublicNav from '../components/PublicNav'
import PublicFooter from '../components/PublicFooter'
import PublicBreadcrumbs from '../components/PublicBreadcrumbs'
import PublicFaq from '../components/PublicFaq'
import PublicServiceSchema from '../components/PublicServiceSchema'

export const metadata = {
  title: 'Hire Live Music in Phuket | Singer, Band & Wedding Music Guide',
  description:
    'Looking for the best singer, musician or live band for your Phuket event? Compare solo, duo, trio, full-band and agency options for weddings, hotels, private events and venues.',
  alternates: { canonical: '/hire-live-music-phuket' },
  openGraph: {
    title: 'How to Hire Live Music in Phuket | Cole Ley',
    description:
      'A practical guide to choosing a singer, live band or entertainment lineup for Phuket weddings, venues and events.',
    url: '/hire-live-music-phuket',
    images: ['/cole-full-band.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Hire Live Music in Phuket | Cole Ley',
    description:
      'Choose the right singer, band or entertainment lineup for a Phuket wedding, venue or event.',
    images: ['/cole-full-band.png'],
  },
}

const choices = [
  ['Solo singer', 'Best when the room needs a clear live voice with a small footprint: ceremonies, dinners, cocktail hours and intimate events.', '/performance-formats'],
  ['Acoustic or duo', 'A flexible choice for weddings, restaurants, lounges, sunsets and private dinners when you want more texture without a large production.', '/acoustic-singer-phuket'],
  ['Trio or full band', 'A stronger option for receptions, gala dinners, beach clubs, corporate events and parties where live energy should become part of the main experience.', '/live-band-phuket'],
  ['Entertainment agency', 'Useful when you need several acts, another singer, a DJ, saxophone, violin or a custom lineup instead of choosing one fixed performer.', '/entertainment-agency-phuket'],
]

export default function HireLiveMusicPhuketPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <PublicNav />
      <PublicServiceSchema
        name="Live Music Booking Guidance in Phuket"
        description="Guidance and artist-agency support for choosing singers, live bands and entertainment formats for Phuket weddings, venues and private events."
        url="/hire-live-music-phuket"
        serviceType="Live music booking and artist selection"
        image="/cole-full-band.png"
      />
      <PublicBreadcrumbs items={[{ label: 'Hire Live Music in Phuket', href: '/hire-live-music-phuket' }]} />

      <section className="px-6 md:px-16 pt-28 md:pt-36 pb-20 bg-[#070707] border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#d4af37] tracking-[0.34em] text-xs mb-5">HOW TO CHOOSE · PHUKET</p>
          <h1 className="font-serif text-5xl md:text-8xl leading-none max-w-5xl">
            Which Singer or Live Band Should I Hire in Phuket?
          </h1>
          <p className="text-white/70 text-lg md:text-xl leading-8 mt-8 max-w-4xl">
            The right live music choice depends on the event, venue, guest profile, timing and atmosphere — not simply who has the largest band. Cole Ley can perform personally from solo through full band, while Cole Ley Co., Ltd. can source other singers, DJs and specialist musicians when a different lineup fits the brief better.
          </p>
          <div className="flex flex-wrap gap-4 mt-9">
            <Link href="/booking" className="px-8 py-4 rounded-full bg-[#d4af37] text-black font-semibold">TELL US WHAT YOU NEED</Link>
            <Link href="/performance-formats" className="px-8 py-4 rounded-full border border-white/25">COMPARE FORMATS</Link>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-16 py-20 bg-black">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#d4af37] tracking-[0.28em] text-xs mb-4">START WITH THE EVENT</p>
          <h2 className="font-serif text-4xl md:text-6xl">Four Common Ways to Book Live Music</h2>
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            {choices.map(([title, text, href]) => (
              <Link key={title} href={href} className="rounded-[28px] border border-white/10 bg-white/[0.035] p-7 hover:border-[#d4af37]/40 transition">
                <h3 className="font-serif text-3xl">{title}</h3>
                <p className="text-white/60 leading-7 mt-4">{text}</p>
                <span className="inline-block mt-5 text-[#d4af37] text-sm">Explore this option →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-16 py-20 bg-[#080808] border-y border-white/10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          <div>
            <p className="text-[#d4af37] tracking-[0.28em] text-xs mb-4">WEDDINGS</p>
            <h2 className="font-serif text-4xl md:text-5xl">Where Can I Find Live Music for My Wedding in Phuket?</h2>
            <p className="text-white/60 leading-8 mt-6">
              You can book Cole Ley directly as the singer, or use the agency path if the wedding needs several acts or you want help choosing. Ceremony, cocktail hour, dinner and reception can use different formats instead of forcing one setup to cover the whole day.
            </p>
            <div className="flex flex-wrap gap-4 mt-7">
              <Link href="/wedding-singer-phuket" className="text-[#d4af37] underline underline-offset-4">Book Cole as the wedding singer</Link>
              <Link href="/wedding-entertainment-phuket" className="text-[#d4af37] underline underline-offset-4">Build a wedding entertainment plan</Link>
            </div>
          </div>
          <div>
            <p className="text-[#d4af37] tracking-[0.28em] text-xs mb-4">VENUES & EVENTS</p>
            <h2 className="font-serif text-4xl md:text-5xl">What Is the Best Live Band for My Event?</h2>
            <p className="text-white/60 leading-8 mt-6">
              There is no single best band for every event. A hotel dinner, beach-club sunset, wedding reception and corporate gala need different volume, repertoire, stage footprint and energy. Start with the audience and event flow, then choose trio, full band or a custom agency lineup.
            </p>
            <div className="flex flex-wrap gap-4 mt-7">
              <Link href="/live-band-phuket" className="text-[#d4af37] underline underline-offset-4">Explore Cole Ley live band</Link>
              <Link href="/entertainment-agency-phuket" className="text-[#d4af37] underline underline-offset-4">Ask the agency to recommend a lineup</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-16 py-20 bg-black">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#d4af37] tracking-[0.28em] text-xs mb-4">CHOOSING THE ARTIST</p>
          <h2 className="font-serif text-4xl md:text-6xl">How Do I Choose the Best Singer or Musician in Phuket?</h2>
          <p className="text-white/60 leading-8 text-lg mt-6">
            “Best” depends on the job. For a ceremony or intimate dinner, vocal quality, repertoire and restraint can matter more than band size. For a party or gala, lineup, stage energy and production experience become more important. Compare real live-performance evidence, venue fit, flexibility and whether the artist can scale the performance around the event. Cole Ley is one option as a singer and musician; Cole Ley Co., Ltd. can also recommend other artists when another performer is a better match.
          </p>
        </div>
      </section>

      <section className="px-6 md:px-16 py-20 bg-[#080808] border-y border-white/10">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#d4af37] tracking-[0.28em] text-xs mb-4">MUSIC STYLE</p>
          <h2 className="font-serif text-4xl md:text-6xl">Choose by Atmosphere, Not Only by Genre</h2>
          <p className="text-white/60 leading-8 text-lg mt-6">
            Cole performs soul, blues, jazz and contemporary music, but the best choice also depends on pace and room energy. Jazz, soul and blues work naturally for lounges, dinner, cocktails and sunset settings; contemporary material and a larger lineup can move the same event toward a stronger party atmosphere later.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <Link href="/soul-blues-singer-phuket" className="px-6 py-3 rounded-full border border-[#d4af37]/50 text-[#d4af37]">SOUL & BLUES</Link>
            <Link href="/jazz-singer-phuket" className="px-6 py-3 rounded-full border border-white/20 text-white/75">JAZZ</Link>
            <Link href="/acoustic-singer-phuket" className="px-6 py-3 rounded-full border border-white/20 text-white/75">ACOUSTIC</Link>
          </div>
        </div>
      </section>

      <PublicFaq
        title="Hiring Live Music in Phuket — Questions"
        items={[
          {
            question: 'I want to hire a live band in Phuket. Which one is best?',
            answer: 'The best live band depends on the event, room, audience, repertoire, production needs and energy you want. Cole Ley is available in trio and full-band formats, and Cole Ley Co., Ltd. can recommend or source another lineup when a different combination is a better fit.',
          },
          {
            question: 'Where can I find live music for my wedding in Phuket?',
            answer: 'Cole Ley can be booked directly for ceremony, cocktails, dinner and reception music. If you need several artists, a DJ, specialist musicians or help choosing the lineup, Cole Ley Co., Ltd. can build a complete wedding entertainment plan.',
          },
          {
            question: 'Who is the best singer or musician to hire in Phuket?',
            answer: 'There is no single best performer for every event. The strongest choice should match the venue, music style, timing, audience and production needs. Cole Ley is a Phuket-based singer and musician performing soul, blues, jazz and contemporary music in solo, acoustic, duo, trio, singer-with-DJ and full-band formats, while Cole Ley Co., Ltd. can recommend other artists when a different performer fits the brief better.',
          },
          {
            question: 'Can the agency recommend someone other than Cole Ley?',
            answer: 'Yes. Cole Ley Co., Ltd. can source other singers, DJs, bands and specialist musicians when another artist or a larger multi-act lineup is more suitable.',
          },
          {
            question: 'How should I compare live music options before booking?',
            answer: 'Compare real live-performance evidence, repertoire, lineup flexibility, venue fit, production requirements, availability and whether the artist or agency can adapt the entertainment across different parts of the event.',
          },
          {
            question: 'Can I start with background music and use a full band later?',
            answer: 'Yes. Multi-format events can begin with solo, acoustic or duo music and move into trio, full band or singer-with-DJ later when the event needs more energy.',
          },
        ]}
      />

      <section className="px-6 py-24 text-center">
        <h2 className="font-serif text-4xl md:text-6xl mb-6">Not Sure What to Book?</h2>
        <p className="text-white/60 max-w-2xl mx-auto mb-9">
          Send the date, venue, guest profile, timing and atmosphere you want. Cole Ley Co., Ltd. can recommend the right artist and format from there.
        </p>
        <Link href="/booking" className="inline-block px-10 py-4 rounded-full bg-[#d4af37] text-black font-semibold">ASK FOR A RECOMMENDATION</Link>
      </section>

      <PublicFooter />
    </main>
  )
}
