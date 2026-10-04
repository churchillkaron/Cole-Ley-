import Link from 'next/link'
import PublicNav from '../components/PublicNav'
import PublicFooter from '../components/PublicFooter'
import PublicBreadcrumbs from '../components/PublicBreadcrumbs'
import PublicFaq from '../components/PublicFaq'

export const metadata = {
  title: 'Entertainment Agency Phuket | Artists, DJs, Bands & Event Music',
  description:
    'Cole Ley Co., Ltd. is a Phuket entertainment and artist agency connecting weddings, hotels, beach clubs, corporate events and private parties with singers, DJs, bands and specialist musicians.',
  alternates: { canonical: '/entertainment-agency-phuket' },
  openGraph: {
    title: 'Entertainment Agency Phuket | Cole Ley Co., Ltd.',
    description:
      'One contact for singers, DJs, bands, musicians and complete entertainment lineups in Phuket and destination events.',
    url: '/entertainment-agency-phuket',
    images: ['/cole-full-band.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Entertainment Agency Phuket | Cole Ley Co., Ltd.',
    description: 'Artists, DJs, bands and complete event entertainment lineups in Phuket.',
    images: ['/cole-full-band.png'],
  },
}

const services = [
  ['Singers & Vocalists', 'Female and male vocalists for ceremonies, dinners, lounges, parties and destination events.'],
  ['DJs', 'DJs for weddings, beach clubs, private parties, corporate events and late-night sets.'],
  ['Bands & Ensembles', 'Duos, trios and full bands matched to the venue, guest profile and energy of the event.'],
  ['Specialist Musicians', 'Saxophone, violin, guitar, keys, percussion and other specialist performers where the brief requires them.'],
  ['Entertainment Planning', 'One coordinated brief for multiple artists, performance windows, transitions and event flow.'],
  ['Custom Lineups', 'Bespoke combinations built from Cole Ley’s artist network when one performer or one fixed package is not enough.'],
]

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://www.coleley.com/entertainment-agency-phuket#service',
  name: 'Entertainment Agency Phuket',
  serviceType: 'Entertainment and artist booking agency',
  provider: { '@id': 'https://www.coleley.com/#organization' },
  areaServed: ['Phuket', 'Thailand', 'Asia'],
  url: 'https://www.coleley.com/entertainment-agency-phuket',
  description:
    'Artist sourcing and entertainment planning for weddings, hotels, beach clubs, corporate events and private celebrations, including singers, DJs, bands and specialist musicians.',
}

export default function Page() {
  return <main className="min-h-screen bg-black text-white">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema).replace(/</g, '\\u003c') }} />
    <PublicNav />
    <PublicBreadcrumbs items={[{ label: 'Entertainment Agency Phuket', href: '/entertainment-agency-phuket' }]} />

    <section className="px-6 md:px-16 pt-28 md:pt-36 pb-20 bg-[#070707] border-b border-white/10">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.2fr_.8fr] gap-12 items-end">
        <div>
          <p className="text-[#d4af37] tracking-[0.34em] text-xs mb-5">COLE LEY CO., LTD. · ARTIST & ENTERTAINMENT AGENCY</p>
          <h1 className="font-serif text-5xl md:text-8xl leading-none">Entertainment Agency in Phuket</h1>
          <p className="text-white/70 text-lg md:text-xl leading-8 mt-8 max-w-4xl">
            Cole Ley is not only a performing artist. Through Cole Ley Co., Ltd., clients can also source and coordinate other singers, DJs, bands and specialist musicians for weddings, hotels, beach clubs, corporate events and private celebrations.
          </p>
          <div className="flex flex-wrap gap-4 mt-9">
            <Link href="/booking" className="px-8 py-4 rounded-full bg-[#d4af37] text-black font-semibold">BUILD MY ENTERTAINMENT LINEUP</Link>
            <Link href="/wedding-entertainment-phuket" className="px-8 py-4 rounded-full border border-white/25">WEDDING ENTERTAINMENT</Link>
          </div>
        </div>
        <div className="rounded-[30px] border border-white/10 bg-white/[0.035] p-7">
          <p className="text-[#d4af37] tracking-[0.22em] text-xs">THE TWO PATHS</p>
          <div className="mt-6 space-y-5">
            <Link href="/about-cole-ley" className="block rounded-2xl border border-white/10 p-5 hover:border-[#d4af37]/40 transition">
              <p className="text-white font-semibold">Book Cole Ley</p>
              <p className="text-white/55 mt-2 text-sm leading-6">When Cole herself is the right artist for the event.</p>
            </Link>
            <div className="rounded-2xl border border-[#d4af37]/35 bg-[#d4af37]/[0.04] p-5">
              <p className="text-[#d4af37] font-semibold">Book Through the Agency</p>
              <p className="text-white/55 mt-2 text-sm leading-6">When you need a different artist, multiple performers or a complete entertainment plan.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="px-6 md:px-16 py-20 bg-black">
      <div className="max-w-6xl mx-auto">
        <p className="text-[#d4af37] tracking-[0.3em] text-xs mb-4">WHAT THE AGENCY CAN ARRANGE</p>
        <h2 className="font-serif text-4xl md:text-6xl max-w-4xl">One Brief. The Right Artists for the Event.</h2>
        <p className="text-white/60 leading-8 text-lg mt-6 max-w-4xl">
          If Cole is not the right fit, or the event needs more than one act, the agency path stays open. The goal is not to force every enquiry into one performer. The goal is to build the right entertainment around the event.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {services.map(([title,text]) => <article key={title} className="rounded-3xl border border-white/10 bg-white/[0.035] p-7">
            <h3 className="font-serif text-2xl">{title}</h3>
            <p className="text-white/58 leading-7 mt-4">{text}</p>
          </article>)}
        </div>
      </div>
    </section>

    <section className="px-6 md:px-16 py-20 bg-[#080808] border-y border-white/10">
      <div className="max-w-5xl mx-auto">
        <p className="text-[#d4af37] tracking-[0.3em] text-xs mb-4">HOW IT WORKS</p>
        <h2 className="font-serif text-4xl md:text-6xl">Tell Us the Event, Not the Artist Name</h2>
        <div className="grid md:grid-cols-3 gap-5 mt-10">
          {[
            ['1 · Brief', 'Send the date, venue, guest count, timing, music style and the atmosphere you want.'],
            ['2 · Match', 'The agency can recommend Cole or source a more suitable singer, DJ, band or combination from its artist network.'],
            ['3 · Build', 'For larger events, the lineup can combine ceremony music, cocktails, dinner and party entertainment into one coordinated plan.'],
          ].map(([title,text]) => <article key={title} className="rounded-3xl border border-white/10 p-7"><h3 className="text-[#d4af37] tracking-[0.14em]">{title}</h3><p className="text-white/60 leading-7 mt-4">{text}</p></article>)}
        </div>
      </div>
    </section>

    <PublicFaq title="Entertainment Agency Phuket — Questions" items={[
      { question: 'Is Cole Ley only available as a singer?', answer: 'No. Cole Ley is a performing artist, while Cole Ley Co., Ltd. also operates an artist-agency path that can source and coordinate other performers when the event needs a different or larger entertainment lineup.' },
      { question: 'Can the agency arrange artists other than Cole Ley?', answer: 'Yes. Enquiries can be matched with other singers, DJs, bands and specialist musicians from Cole’s professional network when that is the better fit.' },
      { question: 'Can you arrange several performers for one event?', answer: 'Yes. The agency can plan multiple performance moments, for example ceremony music, cocktail entertainment, dinner music and a DJ or band for the party.' },
      { question: 'Can you help if I do not know which artist I need?', answer: 'Yes. Send the event brief rather than choosing an artist first. The agency can recommend the most suitable format and performers around the venue, audience, timing and budget.' },
    ]} />

    <section className="px-6 py-24 text-center">
      <h2 className="font-serif text-4xl md:text-6xl mb-6">Need More Than One Artist?</h2>
      <p className="text-white/60 max-w-2xl mx-auto mb-9">Send the event brief and let the agency build the right entertainment lineup.</p>
      <Link href="/booking" className="inline-block px-10 py-4 rounded-full bg-[#d4af37] text-black font-semibold">START AN AGENCY ENQUIRY</Link>
    </section>
    <PublicFooter />
  </main>
}
