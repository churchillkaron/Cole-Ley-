import Link from 'next/link'
import PublicNav from '../components/PublicNav'
import PublicFooter from '../components/PublicFooter'

export const metadata = {
  title: 'About Cole Ley',
  description: 'About Cole Ley, a Phuket-based singer, musician and live performer known for soul, blues, jazz and contemporary music at venues, weddings and destination events.',
  alternates: { canonical: '/about-cole-ley' },
}

export default function Page() {
  return <main className="min-h-screen bg-black text-white">\n    <PublicNav />
    <section className="px-6 md:px-16 pt-40 pb-20 bg-[#080808]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-[#d4af37] tracking-[0.35em] text-xs mb-5">ARTIST · SINGER · MUSICIAN</p>
          <h1 className="font-serif text-5xl md:text-8xl leading-none">About Cole Ley</h1>
          <p className="text-white/65 text-lg leading-8 mt-8">Cole Ley is a Phuket-based singer, musician and live performer working across soul, blues, jazz and contemporary music. Performances range from intimate acoustic sets to duo, trio and full-band shows for hospitality venues, weddings, corporate events and private celebrations.</p>
        </div>
        <img src="/IMG_7181.JPG" alt="Cole Ley live singer and musician in Phuket" className="w-full max-h-[680px] object-cover rounded-[32px] border border-white/10" />
      </div>
    </section>
    <section className="px-6 md:px-16 py-20"><div className="max-w-5xl mx-auto">
      <h2 className="font-serif text-4xl md:text-6xl mb-7">Live Performance Built Around the Moment</h2>
      <p className="text-white/65 leading-8 text-lg">The music changes with the room. A wedding ceremony, sunset beach club set, restaurant dinner and late-night event all need different pacing, repertoire and energy. Cole's performance formats are designed to scale around the event rather than force every audience into the same show.</p>
      <div className="flex flex-wrap gap-4 mt-10">
        <Link href="/music" className="px-8 py-4 rounded-full border border-[#d4af37]/50 text-[#d4af37]">WATCH PERFORMANCES</Link>
        <Link href="/booking" className="px-8 py-4 rounded-full bg-[#d4af37] text-black font-semibold">BOOK COLE LEY</Link>
      </div>
    </div></section>
  <PublicFooter />
  </main>
}
