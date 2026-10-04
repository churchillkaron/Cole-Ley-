import Link from 'next/link'
import PublicNav from '../components/PublicNav'
import PublicFooter from '../components/PublicFooter'
import PublicBreadcrumbs from '../components/PublicBreadcrumbs'
import PublicFaq from '../components/PublicFaq'
import PublicServiceSchema from '../components/PublicServiceSchema'

export const metadata = {
  title: 'Live Music for Hotels & Beach Clubs',
  description: 'Book Cole Ley for Phuket hotels, resorts and beach clubs: sunset sets, dinner music, recurring residencies and full-band event nights.',
  alternates: { canonical: '/hotels-beach-clubs-phuket' },
  openGraph: {
    title: 'Live Music for Phuket Hotels & Beach Clubs | Cole Ley',
    description: 'Sunset sessions, dinner sets, recurring performances and special-event live music for Phuket hospitality venues.',
    url: '/hotels-beach-clubs-phuket',
    images: ['/cole-event-beach-club.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Live Music for Phuket Hotels & Beach Clubs | Cole Ley',
    description: 'Live music for Phuket hotels, resorts, restaurants, lounges and beach clubs.',
    images: ['/cole-event-beach-club.png'],
  },
}

export default function Page() {
  return <main className="min-h-screen bg-black text-white">
    <PublicNav />
    <PublicServiceSchema
      name="Live Music for Phuket Hotels & Beach Clubs"
      description="Live music by Cole Ley for Phuket hotels, resorts, restaurants, lounges and beach clubs."
      url="/hotels-beach-clubs-phuket"
      serviceType="Hospitality venue live music"
      image="/cole-event-beach-club.png"
    />
    <PublicBreadcrumbs items={[{ label: 'Hotels & Beach Clubs', href: '/hotels-beach-clubs-phuket' }]} />
    <section className="relative min-h-[76vh] flex items-end px-6 md:px-16 pb-20 pt-36" style={{backgroundImage:"linear-gradient(90deg,rgba(0,0,0,.88),rgba(0,0,0,.42),rgba(0,0,0,.12)),url('/3.JPG')",backgroundSize:'cover',backgroundPosition:'center'}}>
      <div className="max-w-3xl">
        <p className="text-[#d4af37] tracking-[0.35em] text-xs mb-5">HOTELS · RESORTS · BEACH CLUBS</p>
        <h1 className="font-serif text-5xl md:text-8xl leading-none">Live Music for Phuket Venues</h1>
        <p className="mt-7 text-white/70 text-lg md:text-xl leading-8">Sunset sessions, dinner sets, lounge performances, special events and full-band nights for hospitality venues that want a consistent, professional live music experience.</p>
        <div className="flex flex-wrap gap-4 mt-9"><Link href="/booking" className="px-8 py-4 rounded-full bg-[#d4af37] text-black font-semibold">BOOK FOR YOUR VENUE</Link><Link href="/music" className="px-8 py-4 rounded-full border border-white/30">VIEW GALLERY</Link></div>
      </div>
    </section>
    <section className="px-6 md:px-16 py-20 bg-[#080808]"><div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
      <div><h2 className="font-serif text-4xl mb-5">Recurring Performances</h2><p className="text-white/65 leading-8">For venues that need a dependable weekly or recurring artist schedule, the format can be designed around daypart, guest profile and venue identity.</p></div>
      <div><h2 className="font-serif text-4xl mb-5">Special Events</h2><p className="text-white/65 leading-8">Launches, festive periods, gala nights, themed events and VIP evenings can scale from a solo performance to a full live band.</p></div>
      <div><h2 className="font-serif text-4xl mb-5">Sunset & Lounge</h2><p className="text-white/65 leading-8">Soul, blues, jazz and contemporary music can be paced for relaxed sunset service, cocktail hours and dining.</p></div>
      <div><h2 className="font-serif text-4xl mb-5">High-Energy Nights</h2><p className="text-white/65 leading-8">When the room needs more energy, trio and full-band formats can move naturally into a stronger evening show.</p></div>
    </div></section>
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
      title="For Hotels, Resorts & Beach Clubs"
      items={[
        { question: 'Can Cole perform recurring weekly sets?', answer: 'Yes. Recurring performances can be planned around the venue schedule, daypart, guest profile and desired atmosphere.' },
        { question: 'Which formats work for hospitality venues?', answer: 'Solo, duo, trio and full-band formats can be selected based on the room, capacity and how much energy the venue wants.' },
        { question: 'Can the same artist cover sunset and late-night programming?', answer: 'Yes. The performance plan can change pace through the evening, from relaxed sunset or dinner music into a stronger later set.' },
        { question: 'What should a venue send with an enquiry?', answer: 'Venue name, preferred dates, performance times, event type, guest profile and preferred music format help create the right proposal.' },
      ]}
    />
    <section className="px-6 py-24 text-center"><h2 className="font-serif text-4xl md:text-6xl mb-6">Create the Right Live Music Format for Your Venue</h2><p className="text-white/60 max-w-2xl mx-auto mb-9">Tell us your venue, preferred dates, guest profile and the atmosphere you want.</p><Link href="/booking" className="inline-block px-10 py-4 rounded-full bg-[#d4af37] text-black font-semibold">REQUEST AVAILABILITY</Link></section>
  <PublicFooter />
  </main>
}
