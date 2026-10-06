import Link from 'next/link'
import PublicNav from '../components/PublicNav'
import PublicFooter from '../components/PublicFooter'
import PublicBreadcrumbs from '../components/PublicBreadcrumbs'
import PublicFaq from '../components/PublicFaq'

export const metadata = {
  title: 'Corporate Entertainment Phuket | Live Music, Bands & Artists',
  description:
    'Corporate entertainment in Phuket from Cole Ley Co., Ltd. Book Cole Ley, live singers, duos, trios, bands and custom artist lineups for gala dinners, launches, awards nights and company events.',
  alternates: { canonical: '/corporate-entertainment-phuket' },
  openGraph: {
    title: 'Corporate Entertainment Phuket | Cole Ley Co., Ltd.',
    description:
      'Premium live music and custom entertainment lineups for corporate events, gala dinners, launches and VIP functions in Phuket.',
    url: '/corporate-entertainment-phuket',
    images: ['/cole-full-band.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Corporate Entertainment Phuket | Cole Ley Co., Ltd.',
    description: 'Live singers, bands and custom corporate entertainment lineups in Phuket.',
    images: ['/cole-full-band.png'],
  },
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://www.coleley.com/corporate-entertainment-phuket#service',
  name: 'Corporate Entertainment Phuket',
  serviceType: 'Corporate event entertainment and live music',
  provider: { '@id': 'https://www.coleley.com/#organization' },
  areaServed: ['Phuket', 'Thailand', 'Asia'],
  url: 'https://www.coleley.com/corporate-entertainment-phuket',
  description:
    'Live singers, duos, trios, bands and custom entertainment lineups for corporate events, gala dinners, launches, awards nights and VIP functions in Phuket.',
}

const eventTypes = [
  ['Gala Dinners', 'Elegant live music that can sit under dinner, lift for key moments and grow into a stronger late-evening set.'],
  ['Product Launches', 'Polished entertainment matched to brand tone, timings, production cues and the guest journey.'],
  ['Awards & Staff Events', 'Solo, duo, trio or full-band formats for formal programmes, celebrations and after-parties.'],
  ['VIP & Client Events', 'Premium live music for executive dinners, receptions, networking events and private hospitality.'],
]

export default function Page() {
  return <main className="min-h-screen bg-black text-white">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema).replace(/</g, '\\u003c') }} />
    <PublicNav />
    <PublicBreadcrumbs items={[{ label: 'Corporate Entertainment Phuket', href: '/corporate-entertainment-phuket' }]} />

    <section className="px-6 md:px-16 pt-28 md:pt-36 pb-20 bg-[#070707] border-b border-white/10">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.2fr_.8fr] gap-12 items-end">
        <div>
          <p className="text-[#d4af37] tracking-[0.34em] text-xs mb-5">COLE LEY CO., LTD. · CORPORATE EVENTS</p>
          <h1 className="font-serif text-5xl md:text-8xl leading-none">Corporate Entertainment in Phuket</h1>
          <p className="mt-8 text-white/70 text-lg md:text-xl leading-8 max-w-4xl">
            Professional live music and artist lineups for company events, MICE programmes, gala dinners, product launches, awards nights, client evenings and VIP functions across Phuket.
          </p>
          <div className="flex flex-wrap gap-4 mt-9">
            <Link href="/booking" className="px-8 py-4 rounded-full bg-[#d4af37] text-black font-semibold">REQUEST A PROPOSAL</Link>
            <Link href="/music" className="px-8 py-4 rounded-full border border-white/30">WATCH PERFORMANCES</Link>
          </div>
        </div>
        <div className="rounded-[30px] border border-white/10 bg-white/[0.035] p-7">
          <p className="text-[#d4af37] tracking-[0.22em] text-xs">TWO WAYS TO BOOK</p>
          <div className="mt-6 space-y-5">
            <Link href="/about-cole-ley" className="block rounded-2xl border border-white/10 p-5 hover:border-[#d4af37]/40 transition">
              <p className="text-white font-semibold">Book Cole Ley</p>
              <p className="text-white/55 mt-2 text-sm leading-6">Premium live vocals and performance formats led by Cole herself.</p>
            </Link>
            <Link href="/entertainment-agency-phuket" className="block rounded-2xl border border-[#d4af37]/35 bg-[#d4af37]/[0.04] p-5 hover:border-[#d4af37]/60 transition">
              <p className="text-[#d4af37] font-semibold">Build a Custom Lineup</p>
              <p className="text-white/55 mt-2 text-sm leading-6">Use Cole Ley Co., Ltd. to source singers, musicians, DJs, bands and mixed entertainment formats.</p>
            </Link>
          </div>
        </div>
      </div>
    </section>

    <section className="px-6 md:px-16 py-20 bg-black">
      <div className="max-w-6xl mx-auto">
        <p className="text-[#d4af37] tracking-[0.3em] text-xs mb-4">BUILT AROUND THE PROGRAMME</p>
        <h2 className="font-serif text-4xl md:text-6xl max-w-5xl">From Background Atmosphere to Headline Performance</h2>
        <p className="text-white/60 leading-8 text-lg mt-6 max-w-4xl">
          Corporate entertainment works best when the music follows the event rather than interrupting it. The lineup, repertoire and energy can be shaped around arrivals, dinner, presentations, awards, networking and the final celebration.
        </p>
        <div className="grid md:grid-cols-2 gap-5 mt-12">
          {eventTypes.map(([title, text]) => <article key={title} className="rounded-3xl border border-white/10 bg-white/[0.035] p-7">
            <h3 className="font-serif text-2xl">{title}</h3>
            <p className="text-white/58 leading-7 mt-4">{text}</p>
          </article>)}
        </div>
      </div>
    </section>

    <section className="px-6 md:px-16 py-20 bg-[#080808] border-y border-white/10">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
        <div className="rounded-[30px] border border-white/10 bg-white/[0.035] p-8">
          <p className="text-[#d4af37] tracking-[0.22em] text-xs">LIVE BAND OPTIONS</p>
          <h2 className="font-serif text-3xl md:text-4xl mt-4">Need a Duo, Trio or Full Band?</h2>
          <p className="text-white/60 leading-7 mt-5">
            Corporate programmes can scale from a compact singer-led setup to a full live band depending on stage, audience and production requirements.
          </p>
          <Link href="/live-band-phuket" className="inline-block mt-7 text-[#d4af37] border-b border-[#d4af37]/40 pb-1">EXPLORE LIVE BAND PHUKET</Link>
        </div>
        <div className="rounded-[30px] border border-white/10 bg-white/[0.035] p-8">
          <p className="text-[#d4af37] tracking-[0.22em] text-xs">AGENCY SUPPORT</p>
          <h2 className="font-serif text-3xl md:text-4xl mt-4">More Than One Artist?</h2>
          <p className="text-white/60 leading-7 mt-5">
            Cole Ley Co., Ltd. can coordinate multiple performers and specialist musicians when the brief needs more than one fixed act.
          </p>
          <Link href="/entertainment-agency-phuket" className="inline-block mt-7 text-[#d4af37] border-b border-[#d4af37]/40 pb-1">EXPLORE THE ENTERTAINMENT AGENCY</Link>
        </div>
      </div>
    </section>

    <PublicFaq title="Corporate Entertainment Questions" items={[
      { question: 'Can the lineup be customised?', answer: 'Yes. The lineup can be built around the venue, audience, schedule, music style, stage and production requirements.' },
      { question: 'Can Cole Ley perform personally?', answer: 'Yes, subject to availability. Cole can perform solo or lead selected duo, trio and full-band formats.' },
      { question: 'Can you supply other musicians, singers or DJs?', answer: 'Yes. Cole Ley Co., Ltd. can assemble additional performers through its artist network to match the event brief.' },
      { question: 'What should I send for a proposal?', answer: 'Send the date, venue, performance windows, event type, guest profile, production details and preferred lineup or atmosphere.' },
    ]} />

    <section className="px-6 py-24 text-center">
      <h2 className="font-serif text-4xl md:text-6xl mb-6">Tell Us What the Event Needs</h2>
      <p className="text-white/60 max-w-2xl mx-auto mb-9">We will recommend the right artist format and lineup for the venue, programme and audience.</p>
      <Link href="/booking" className="inline-block px-10 py-4 rounded-full bg-[#d4af37] text-black font-semibold">CHECK AVAILABILITY</Link>
    </section>

    <PublicFooter />
  </main>
}
