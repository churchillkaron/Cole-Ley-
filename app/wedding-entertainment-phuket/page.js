import Link from 'next/link'
import PublicNav from '../components/PublicNav'
import PublicFooter from '../components/PublicFooter'
import PublicBreadcrumbs from '../components/PublicBreadcrumbs'
import PublicFaq from '../components/PublicFaq'

export const metadata = {
  title: 'Wedding Entertainment Phuket | Singers, DJs, Bands & Musicians',
  description:
    'Plan wedding entertainment in Phuket through Cole Ley Co., Ltd.: singers, DJs, bands, saxophone, violin and custom artist lineups for ceremony, cocktails, dinner and reception.',
  alternates: { canonical: '/wedding-entertainment-phuket' },
  openGraph: {
    title: 'Wedding Entertainment Phuket | Cole Ley Co., Ltd.',
    description: 'Singers, DJs, bands and custom wedding entertainment lineups in Phuket.',
    url: '/wedding-entertainment-phuket',
    images: ['/cole-event-wedding.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wedding Entertainment Phuket | Cole Ley Co., Ltd.',
    description: 'Build the right singer, DJ, band and musician lineup for a Phuket wedding.',
    images: ['/cole-event-wedding.png'],
  },
}

const weddingServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://www.coleley.com/wedding-entertainment-phuket#service',
  name: 'Wedding Entertainment Phuket',
  serviceType: 'Wedding entertainment agency',
  provider: { '@id': 'https://www.coleley.com/#organization' },
  areaServed: ['Phuket', 'Thailand'],
  url: 'https://www.coleley.com/wedding-entertainment-phuket',
  description: 'Wedding singers, DJs, bands and specialist musicians coordinated for ceremonies, cocktails, dinner and receptions in Phuket.',
}

export default function Page() {
  return <main className="min-h-screen bg-black text-white">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(weddingServiceSchema).replace(/</g, '\\u003c') }} />
    <PublicNav />
    <PublicBreadcrumbs items={[{ label: 'Wedding Entertainment Phuket', href: '/wedding-entertainment-phuket' }]} />

    <section className="px-6 md:px-16 pt-28 md:pt-36 pb-20 bg-[#070707] border-b border-white/10">
      <div className="max-w-6xl mx-auto">
        <p className="text-[#d4af37] tracking-[0.34em] text-xs mb-5">WEDDING ENTERTAINMENT AGENCY · PHUKET</p>
        <h1 className="font-serif text-5xl md:text-8xl leading-none max-w-5xl">Wedding Entertainment in Phuket</h1>
        <p className="text-white/70 text-lg md:text-xl leading-8 mt-8 max-w-4xl">
          If you already know you want Cole Ley, use the artist path. If you need the best singer, DJ, band or combination for the wedding, Cole Ley Co., Ltd. can build the lineup through its wider artist network.
        </p>
        <div className="flex flex-wrap gap-4 mt-9">
          <Link href="/booking" className="px-8 py-4 rounded-full bg-[#d4af37] text-black font-semibold">PLAN MY WEDDING ENTERTAINMENT</Link>
          <Link href="/wedding-singer-phuket" className="px-8 py-4 rounded-full border border-white/25">BOOK COLE LEY AS THE SINGER</Link>
        </div>
      </div>
    </section>

    <section className="px-6 md:px-16 py-20 bg-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-4xl md:text-6xl">Build the Day Around the Moments</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {[
            ['Ceremony', 'Female or male vocalist, acoustic artist, violin, guitar or another intimate format for arrivals and ceremony moments.'],
            ['Cocktails', 'Acoustic duo, saxophone, singer, lounge set or DJ-led background entertainment.'],
            ['Dinner', 'Elegant singer, jazz setup, acoustic act or low-volume live ensemble.'],
            ['Reception', 'DJ, live band, singer with DJ, saxophone or a combined party setup built for dancing.'],
          ].map(([title,text]) => <article key={title} className="rounded-3xl border border-white/10 bg-white/[0.035] p-7"><h3 className="font-serif text-2xl">{title}</h3><p className="text-white/58 leading-7 mt-4">{text}</p></article>)}
        </div>
      </div>
    </section>

    <section className="px-6 md:px-16 py-20 bg-[#080808] border-y border-white/10">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        <Link href="/wedding-singer-phuket" className="rounded-[30px] border border-[#d4af37]/35 bg-[#d4af37]/[0.035] p-8 hover:border-[#d4af37]/60 transition">
          <p className="text-[#d4af37] tracking-[0.2em] text-xs">PATH 1 · ARTIST</p>
          <h2 className="font-serif text-4xl mt-4">Book Cole Ley</h2>
          <p className="text-white/60 leading-7 mt-4">Choose this path when you want Cole herself as the female lead singer for your ceremony, dinner or reception.</p>
        </Link>
        <Link href="/entertainment-agency-phuket" className="rounded-[30px] border border-white/10 bg-white/[0.035] p-8 hover:border-[#d4af37]/40 transition">
          <p className="text-[#d4af37] tracking-[0.2em] text-xs">PATH 2 · AGENCY</p>
          <h2 className="font-serif text-4xl mt-4">Build a Full Lineup</h2>
          <p className="text-white/60 leading-7 mt-4">Choose this path when you need several acts, another artist, or help deciding which singer, DJ, band or musician fits the wedding best.</p>
        </Link>
      </div>
    </section>

    <PublicFaq title="Wedding Entertainment Phuket — Questions" items={[
      { question: 'Can Cole Ley Co., Ltd. arrange wedding artists other than Cole Ley?', answer: 'Yes. The agency path can source singers, DJs, bands and specialist musicians from Cole’s professional network when another artist or a larger lineup is a better fit.' },
      { question: 'Can you arrange both ceremony music and the evening party?', answer: 'Yes. The entertainment plan can use different performers or formats across guest arrival, ceremony, cocktails, dinner and reception.' },
      { question: 'Can you recommend the best singer or band for our wedding?', answer: 'Yes. Send the venue, date, guest count, music preferences, timing and budget range. The agency can then recommend the right artist or combination rather than forcing you to choose blindly.' },
      { question: 'Can we still book Cole Ley directly?', answer: 'Yes. If you specifically want Cole, use the Wedding Singer Phuket page and booking path for her own performance formats.' },
    ]} />

    <section className="px-6 py-24 text-center">
      <h2 className="font-serif text-4xl md:text-6xl mb-6">One Wedding. One Entertainment Plan.</h2>
      <p className="text-white/60 max-w-2xl mx-auto mb-9">Tell us what the day needs and we can build the artist lineup around it.</p>
      <Link href="/booking" className="inline-block px-10 py-4 rounded-full bg-[#d4af37] text-black font-semibold">REQUEST A WEDDING ENTERTAINMENT PLAN</Link>
    </section>
    <PublicFooter />
  </main>
}
