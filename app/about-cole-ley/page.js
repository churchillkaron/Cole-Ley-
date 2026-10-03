import Image from 'next/image'
import Link from 'next/link'
import PublicNav from '../components/PublicNav'
import PublicFooter from '../components/PublicFooter'
import PublicBreadcrumbs from '../components/PublicBreadcrumbs'

export const metadata = {
  title: 'About Cole Ley',
  description: 'About Cole Ley, a Phuket-based singer, musician and live performer known for soul, blues, jazz and contemporary music at venues, weddings and destination events.',
  alternates: { canonical: '/about-cole-ley' },
  openGraph: {
    title: 'About Cole Ley | Singer & Musician in Phuket',
    description: 'Meet Cole Ley, a Phuket-based live singer and musician performing soul, blues, jazz and contemporary music.',
    url: '/about-cole-ley',
    images: ['/IMG_7181.JPG'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Cole Ley | Singer & Musician in Phuket',
    description: 'Meet Cole Ley, a Phuket-based live singer and musician.',
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
    <section className="px-6 md:px-16 pt-40 pb-20 bg-[#080808]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-[#d4af37] tracking-[0.35em] text-xs mb-5">ARTIST · SINGER · MUSICIAN</p>
          <h1 className="font-serif text-5xl md:text-8xl leading-none">About Cole Ley</h1>
          <p className="text-white/65 text-lg leading-8 mt-8">Cole Ley is a Phuket-based singer, musician and live performer working across soul, blues, jazz and contemporary music. Performances range from intimate acoustic sets to duo, trio and full-band shows for hospitality venues, weddings, corporate events and private celebrations.</p>
        </div>
        <Image
          src="/IMG_7181.JPG"
          alt="Cole Ley, live singer and musician based in Phuket"
          width={3808}
          height={5712}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="w-full max-h-[680px] object-cover rounded-[32px] border border-white/10"
        />
      </div>
    </section>
    <section className="px-6 md:px-16 py-20"><div className="max-w-5xl mx-auto">
      <h2 className="font-serif text-4xl md:text-6xl mb-7">Live Performance Built Around the Moment</h2>
      <p className="text-white/65 leading-8 text-lg">The music changes with the room. A wedding ceremony, sunset beach club set, restaurant dinner and late-night event all need different pacing, repertoire and energy. Cole’s performance formats are designed to scale around the event rather than force every audience into the same show.</p>
      <div className="grid md:grid-cols-3 gap-5 mt-12">
        <Link href="/live-music-phuket" className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 hover:border-[#d4af37]/40 transition">
          <p className="text-[#d4af37] text-xs tracking-[0.18em]">PHUKET</p>
          <h3 className="font-serif text-2xl mt-3">Live Music Phuket</h3>
          <p className="text-white/55 leading-7 mt-3">Live soul, blues, jazz and contemporary music for venues and events.</p>
        </Link>
        <Link href="/wedding-singer-phuket" className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 hover:border-[#d4af37]/40 transition">
          <p className="text-[#d4af37] text-xs tracking-[0.18em]">WEDDINGS</p>
          <h3 className="font-serif text-2xl mt-3">Wedding Singer Phuket</h3>
          <p className="text-white/55 leading-7 mt-3">Music for ceremonies, cocktails, dinner and receptions.</p>
        </Link>
        <Link href="/hotels-beach-clubs-phuket" className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 hover:border-[#d4af37]/40 transition">
          <p className="text-[#d4af37] text-xs tracking-[0.18em]">VENUES</p>
          <h3 className="font-serif text-2xl mt-3">Hotels & Beach Clubs</h3>
          <p className="text-white/55 leading-7 mt-3">Recurring performances, sunset sessions and special events.</p>
        </Link>
      </div>
      <div className="flex flex-wrap gap-4 mt-10">
        <Link href="/music" className="px-8 py-4 rounded-full border border-[#d4af37]/50 text-[#d4af37]">WATCH PERFORMANCES</Link>
        <Link href="/booking" className="px-8 py-4 rounded-full bg-[#d4af37] text-black font-semibold">BOOK COLE LEY</Link>
      </div>
    </div></section>
  <PublicFooter />
  </main>
}
