import Link from 'next/link'
import PublicNav from '../components/PublicNav'
import PublicFooter from '../components/PublicFooter'
import PublicBreadcrumbs from '../components/PublicBreadcrumbs'
import PublicFaq from '../components/PublicFaq'
import PublicServiceSchema from '../components/PublicServiceSchema'

export const metadata = {
  title: 'Live Music in Phuket for Events & Venues',
  description: 'Book Cole Ley for live music in Phuket: soul, blues, jazz and contemporary sets for hotels, beach clubs, weddings, venues and private events.',
  alternates: { canonical: '/live-music-phuket' },
  openGraph: {
    title: 'Live Music Phuket | Cole Ley',
    description: 'Live soul, blues, jazz and contemporary music for Phuket hotels, beach clubs, restaurants, weddings and private events.',
    url: '/live-music-phuket',
    images: ['/cole-hero-2026.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Live Music Phuket | Cole Ley',
    description: 'Live soul, blues, jazz and contemporary music for events and venues in Phuket.',
    images: ['/cole-hero-2026.jpg'],
  },
}

export default function Page() {
  const items = [
    ['Solo', 'Vocals and acoustic guitar for intimate venues, dinners and ceremonies.'],
    ['Duo & Trio', 'A fuller live sound for lounges, weddings, restaurants and sunset sessions.'],
    ['Full Band', 'High-energy live entertainment for beach clubs, galas and large celebrations.'],
  ]
  return <main className="min-h-screen bg-black text-white">
    <PublicNav />
    <PublicServiceSchema
      name="Live Music in Phuket"
      description="Live music performance service by Cole Ley in Phuket for venues, weddings, corporate events and private celebrations."
      url="/live-music-phuket"
      serviceType="Live music performance"
      image="/cole-hero-2026.jpg"
    />
    <PublicBreadcrumbs items={[{ label: 'Live Music Phuket', href: '/live-music-phuket' }]} />
    <section className="relative min-h-[78vh] flex items-end px-6 md:px-16 pb-20 pt-36" style={{backgroundImage:"linear-gradient(90deg,rgba(0,0,0,.88),rgba(0,0,0,.45),rgba(0,0,0,.1)),url('/cole-hero-2026.jpg')",backgroundSize:'cover',backgroundPosition:'center'}}>
      <div className="max-w-3xl">
        <p className="text-[#d4af37] tracking-[0.35em] text-xs mb-5">PHUKET · THAILAND</p>
        <h1 className="font-serif text-5xl md:text-8xl leading-none">Live Music in Phuket</h1>
        <p className="mt-7 text-white/70 text-lg md:text-xl leading-8">Cole Ley performs soul, blues, jazz and contemporary live music for Phuket beach clubs, hotels, restaurants, weddings, corporate events and private celebrations.</p>
        <div className="flex flex-wrap gap-4 mt-9"><Link href="/booking" className="px-8 py-4 rounded-full bg-[#d4af37] text-black font-semibold">CHECK AVAILABILITY</Link><Link href="/music" className="px-8 py-4 rounded-full border border-white/30">WATCH LIVE</Link></div>
      </div>
    </section>
    <section className="px-6 md:px-16 py-20 bg-[#080808]"><div className="max-w-5xl mx-auto">
      <h2 className="font-serif text-4xl md:text-6xl mb-7">A Live Sound Built Around the Venue</h2>
      <p className="text-white/65 leading-8 text-lg">A sunset set at a beach club needs a different pace from a wedding ceremony, hotel lounge or late-night private party. Cole Ley tailors the format, set list and energy to the room.</p>
      <div className="grid md:grid-cols-3 gap-6 mt-12">{items.map(([t,d]) => <div key={t} className="rounded-3xl border border-white/10 bg-white/[0.04] p-7"><h3 className="text-[#d4af37] tracking-[0.2em] mb-4">{t}</h3><p className="text-white/65 leading-7">{d}</p></div>)}</div>
    </div></section>
    <PublicFaq
      title="Live Music in Phuket — Questions"
      items={[
        { question: 'What performance formats are available?', answer: 'Cole Ley can perform in solo, duo, trio and full-band formats depending on the venue, audience and event.' },
        { question: 'What styles of music does Cole perform?', answer: 'The repertoire focuses on soul, blues, jazz and contemporary music, with pacing adjusted to the setting.' },
        { question: 'Can the performance suit both dinner and a later party?', answer: 'Yes. The format and energy can be planned around different parts of the same event, from relaxed background music to a stronger evening performance.' },
        { question: 'How do I check availability?', answer: 'Send the event date, venue, location and preferred format through the booking page so the right performance setup can be discussed.' },
      ]}
    />
    <section className="px-6 py-24 text-center"><h2 className="font-serif text-4xl md:text-6xl mb-6">Book Live Music in Phuket</h2><p className="text-white/60 max-w-2xl mx-auto mb-9">Tell us the date, venue, event type and preferred performance format.</p><Link href="/booking" className="inline-block px-10 py-4 rounded-full bg-[#d4af37] text-black font-semibold">REQUEST A PROPOSAL</Link></section>
  <PublicFooter />
  </main>
}
