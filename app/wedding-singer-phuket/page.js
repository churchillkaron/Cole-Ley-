import Link from 'next/link'
import PublicNav from '../components/PublicNav'
import PublicFooter from '../components/PublicFooter'
import PublicBreadcrumbs from '../components/PublicBreadcrumbs'
import PublicFaq from '../components/PublicFaq'

export const metadata = {
  title: 'Wedding Singer Phuket',
  description: 'Book Cole Ley as your wedding singer in Phuket for ceremony music, cocktail hour, dinner and reception entertainment. Solo, duo, trio and full-band options.',
  alternates: { canonical: '/wedding-singer-phuket' },
  openGraph: {
    title: 'Wedding Singer Phuket | Cole Ley',
    description: 'Live music for Phuket wedding ceremonies, cocktail hours, dinners and receptions.',
    url: '/wedding-singer-phuket',
    images: ['/cole-event-wedding.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wedding Singer Phuket | Cole Ley',
    description: 'Live music for Phuket wedding ceremonies, cocktail hours, dinners and receptions.',
    images: ['/cole-event-wedding.png'],
  },
}

export default function Page() {
  const moments = [
    ['Ceremony', 'Live music for guest arrival, processional, signing and recessional.'],
    ['Cocktail Hour', 'Relaxed soul, blues, jazz and contemporary songs while guests gather.'],
    ['Dinner', 'Elegant live music that supports the atmosphere without overpowering the room.'],
    ['Reception', 'A bigger duo, trio or full-band setup when the celebration moves into party mode.'],
  ]
  return <main className="min-h-screen bg-black text-white">\n    <PublicNav />
    <PublicBreadcrumbs items={[{ label: 'Wedding Singer Phuket', href: '/wedding-singer-phuket' }]} />
    <section className="relative min-h-[78vh] flex items-end px-6 md:px-16 pb-20 pt-36" style={{backgroundImage:"linear-gradient(90deg,rgba(0,0,0,.9),rgba(0,0,0,.45),rgba(0,0,0,.15)),url('/hero.JPG')",backgroundSize:'cover',backgroundPosition:'center'}}>
      <div className="max-w-3xl">
        <p className="text-[#d4af37] tracking-[0.35em] text-xs mb-5">WEDDINGS · PHUKET</p>
        <h1 className="font-serif text-5xl md:text-8xl leading-none">Wedding Singer in Phuket</h1>
        <p className="mt-7 text-white/70 text-lg md:text-xl leading-8">Live music with Cole Ley for the ceremony, cocktail hour, dinner and reception — shaped around the timing and atmosphere of your wedding.</p>
        <div className="flex flex-wrap gap-4 mt-9"><Link href="/booking" className="px-8 py-4 rounded-full bg-[#d4af37] text-black font-semibold">CHECK YOUR DATE</Link><Link href="/music" className="px-8 py-4 rounded-full border border-white/30">WATCH PERFORMANCES</Link></div>
      </div>
    </section>
    <section className="px-6 md:px-16 py-20 bg-[#080808]"><div className="max-w-5xl mx-auto">
      <h2 className="font-serif text-4xl md:text-6xl mb-7">Music for Every Part of the Day</h2>
      <p className="text-white/65 leading-8 text-lg">Phuket weddings often move through several settings and moods. The performance can stay intimate for the ceremony, become relaxed through cocktails and dinner, then grow into a larger live show for the reception.</p>
      <div className="grid md:grid-cols-2 gap-6 mt-12">{moments.map(([t,d]) => <div key={t} className="rounded-3xl border border-white/10 bg-white/[0.04] p-7"><h3 className="text-[#d4af37] tracking-[0.2em] mb-4">{t}</h3><p className="text-white/65 leading-7">{d}</p></div>)}</div>
    </div></section>
    <PublicFaq
      title="Wedding Music — Questions"
      items={[
        { question: 'Which parts of a wedding can have live music?', answer: 'Live music can be planned for guest arrival, the ceremony, cocktail hour, dinner and reception.' },
        { question: 'Can we book more than one performance format?', answer: 'Yes. A wedding can stay intimate for the ceremony and move into a larger duo, trio or full-band format later in the celebration.' },
        { question: 'Can the music be tailored to the atmosphere?', answer: 'Yes. The pacing and repertoire can be shaped around the ceremony, venue style, guest profile and the energy you want later in the day.' },
        { question: 'What information should we send first?', answer: 'The wedding date, venue, location, approximate timing and which parts of the day you want live music for are the most useful starting points.' },
      ]}
    />
    <section className="px-6 py-24 text-center"><h2 className="font-serif text-4xl md:text-6xl mb-6">Planning a Wedding in Phuket?</h2><p className="text-white/60 max-w-2xl mx-auto mb-9">Send the date, venue and the parts of the wedding where you want live music.</p><Link href="/booking" className="inline-block px-10 py-4 rounded-full bg-[#d4af37] text-black font-semibold">REQUEST WEDDING AVAILABILITY</Link></section>
  <PublicFooter />
  </main>
}
