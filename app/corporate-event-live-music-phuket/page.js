import Image from 'next/image'
import Link from 'next/link'
import PublicNav from '../components/PublicNav'
import PublicFooter from '../components/PublicFooter'
import PublicBreadcrumbs from '../components/PublicBreadcrumbs'
import PublicFaq from '../components/PublicFaq'
import PublicServiceSchema from '../components/PublicServiceSchema'

export const metadata = {
  title: 'Corporate Event Live Music Phuket',
  description:
    'Book Cole Ley for corporate event live music in Phuket: gala dinners, award nights, product launches, VIP events, client entertainment and brand celebrations.',
  alternates: { canonical: '/corporate-event-live-music-phuket' },
  openGraph: {
    title: 'Corporate Event Live Music Phuket | Cole Ley',
    description:
      'Professional live music for gala dinners, award nights, launches, VIP events and business celebrations in Phuket.',
    url: '/corporate-event-live-music-phuket',
    images: ['/cole-event-corporate.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Corporate Event Live Music Phuket | Cole Ley',
    description:
      'Live music for Phuket corporate events, galas, launches and VIP evenings.',
    images: ['/cole-event-corporate.png'],
  },
}

const formats = [
  ['Reception & Networking', 'Elegant live vocals or acoustic music while guests arrive, network and move into the event.'],
  ['Gala Dinner', 'A refined dinner performance that supports the room without competing with speeches or service.'],
  ['Awards & Brand Moments', 'Music can be timed around presentations, awards, reveals and key event transitions.'],
  ['After-Party', 'Singer with DJ, trio or full band can raise the energy once the formal program is complete.'],
]

export default function CorporateEventPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <PublicNav />
      <PublicServiceSchema
        name="Corporate Event Live Music in Phuket"
        description="Corporate event live music by Cole Ley for gala dinners, award nights, product launches, VIP events and business celebrations in Phuket."
        url="/corporate-event-live-music-phuket"
        serviceType="Corporate event live music"
        image="/cole-event-corporate.png"
      />
      <PublicBreadcrumbs items={[{ label: 'Corporate Event Live Music Phuket', href: '/corporate-event-live-music-phuket' }]} />

      <section className="relative min-h-[76vh] overflow-hidden flex items-end px-6 md:px-16 pb-20 pt-36">
        <Image
          src="/cole-event-corporate.png"
          alt="Luxury corporate event venue prepared for live music in Phuket"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/55 to-black/15" />
        <div className="relative max-w-4xl">
          <p className="text-[#d4af37] tracking-[0.35em] text-xs mb-5">CORPORATE · GALA · BRAND EVENTS</p>
          <h1 className="font-serif text-5xl md:text-8xl leading-none">Corporate Event Live Music in Phuket</h1>
          <p className="mt-7 max-w-3xl text-white/72 text-lg md:text-xl leading-8">
            Professional live entertainment for gala dinners, award nights, product launches,
            VIP evenings, client events and company celebrations — scaled from elegant background
            music to a complete live show.
          </p>
          <div className="flex flex-wrap gap-4 mt-9">
            <Link href="/booking" className="px-8 py-4 rounded-full bg-[#d4af37] text-black font-semibold">REQUEST A PROPOSAL</Link>
            <Link href="/performance-formats" className="px-8 py-4 rounded-full border border-white/30">VIEW PERFORMANCE FORMATS</Link>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-16 py-20 bg-[#080808]">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#d4af37] tracking-[0.3em] text-xs mb-5">BUILT AROUND THE RUN OF SHOW</p>
          <h2 className="font-serif text-4xl md:text-6xl max-w-4xl">Music That Fits the Event, Not the Other Way Around</h2>
          <p className="text-white/60 leading-8 text-lg mt-7 max-w-4xl">
            Corporate events often move between networking, presentations, dining and celebration.
            The performance can change with those moments so the music supports the program instead
            of forcing one format through the entire evening.
          </p>

          <div className="grid md:grid-cols-2 gap-5 mt-12">
            {formats.map(([title, text]) => (
              <article key={title} className="rounded-[28px] border border-white/10 bg-white/[0.035] p-7">
                <h3 className="font-serif text-3xl">{title}</h3>
                <p className="text-white/58 leading-7 mt-4">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>


      <section className="px-6 md:px-16 py-16 bg-black border-y border-white/10">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[1.15fr_.85fr] gap-8 items-center">
          <div>
            <p className="text-[#d4af37] tracking-[0.28em] text-xs mb-4">NEED MORE THAN COLE?</p>
            <h2 className="font-serif text-4xl md:text-5xl">Use Cole Ley Co., Ltd. as the Entertainment Agency</h2>
            <p className="text-white/60 leading-8 mt-5">
              If the event needs another singer, a DJ, a live band, saxophone, violin, several performers or a complete entertainment plan, the agency path can source and coordinate the right lineup instead of forcing every enquiry into one artist.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <Link href="/entertainment-agency-phuket" className="px-7 py-4 rounded-full bg-[#d4af37] text-black text-center font-semibold">EXPLORE THE AGENCY</Link>
            <Link href="/booking" className="px-7 py-4 rounded-full border border-white/20 text-center">ASK US TO RECOMMEND THE BEST</Link>
          </div>
        </div>
      </section>

      <PublicFaq
        title="Corporate Event Music — Questions"
        items={[
          { question: 'Can Cole perform during both dinner and the after-party?', answer: 'Yes. The performance format can stay refined during dinner and scale into singer-with-DJ, trio or full band later in the event.' },
          { question: 'Can the music work around speeches and presentations?', answer: 'Yes. Performance timing can be built around the event run of show so music supports arrivals, transitions, dinner, awards and celebration.' },
          { question: 'Is Cole available for launches and VIP events?', answer: 'Yes. Corporate bookings can include launches, gala dinners, award nights, VIP evenings, client entertainment and business celebrations.' },
          { question: 'What should we send for a proposal?', answer: 'Send the event date, venue, guest count, event schedule, preferred atmosphere and any production requirements you already know.' },
        ]}
      />

      <section className="px-6 py-24 text-center">
        <h2 className="font-serif text-4xl md:text-6xl mb-6">Planning a Corporate Event in Phuket?</h2>
        <p className="text-white/60 max-w-2xl mx-auto mb-9">
          Share the venue, date, run of show and atmosphere you want and we can shape the right live format.
        </p>
        <Link href="/booking" className="inline-block px-10 py-4 rounded-full bg-[#d4af37] text-black font-semibold">CHECK AVAILABILITY</Link>
      </section>

      <PublicFooter />
    </main>
  )
}
