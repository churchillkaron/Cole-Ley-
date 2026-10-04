import Image from 'next/image'
import Link from 'next/link'
import PublicNav from '../components/PublicNav'
import PublicFooter from '../components/PublicFooter'
import PublicBreadcrumbs from '../components/PublicBreadcrumbs'
import PublicFaq from '../components/PublicFaq'
import PublicServiceSchema from '../components/PublicServiceSchema'

export const metadata = {
  title: 'Wedding Singer Phuket | Female Live Singer Cole Ley',
  description:
    'Looking for a female wedding singer in Phuket? Cole Ley performs ceremony, cocktail, dinner and reception music in solo, duo, trio and full-band formats.',
  alternates: { canonical: '/wedding-singer-phuket' },
  openGraph: {
    title: 'Wedding Singer Phuket | Female Live Singer Cole Ley',
    description:
      'Female live singer in Phuket for wedding ceremonies, cocktail hours, dinners and receptions — from intimate solo sets to full-band celebrations.',
    url: '/wedding-singer-phuket',
    images: ['/cole-event-wedding.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wedding Singer Phuket | Cole Ley',
    description:
      'Female live singer for Phuket weddings, ceremonies, cocktails, dinner and reception entertainment.',
    images: ['/cole-event-wedding.png'],
  },
}

const moments = [
  ['Ceremony', 'Live vocals for guest arrival, processional, signing and recessional, with a compact setup suited to intimate moments.'],
  ['Cocktail Hour', 'Relaxed soul, jazz, blues and contemporary songs while guests gather and move into the evening.'],
  ['Dinner', 'Elegant live music that supports the room without overpowering conversation.'],
  ['Reception', 'A bigger duo, trio or full-band setup when the celebration moves into party mode.'],
]

const formats = [
  ['Solo', 'Best for ceremonies, intimate dinners and smaller villas.', 'Female lead vocal with a compact performance setup.'],
  ['Duo', 'Best for cocktails, sunset receptions and boutique weddings.', 'A fuller live sound while staying elegant and flexible.'],
  ['Trio', 'Best for dinner-to-dance transitions and medium-size celebrations.', 'More rhythm and movement without the footprint of a full band.'],
  ['Full Band', 'Best for receptions, beach clubs and high-energy evening parties.', 'A complete live show built for a bigger room and dance floor.'],
]

const fitPoints = [
  'You want a female lead vocalist rather than a generic agency shortlist.',
  'You want one artist who can scale from an intimate ceremony to a bigger evening setup.',
  'Your music brief leans toward soul, jazz, blues and contemporary songs.',
  'You want a Phuket-based artist who can coordinate around local wedding timing and venues.',
]

export default function Page() {
  return <main className="min-h-screen bg-black text-white">
    <PublicNav />
    <PublicServiceSchema
      name="Wedding Singer in Phuket"
      description="Female wedding singer and live music by Cole Ley in Phuket for ceremonies, cocktail hours, dinners and receptions."
      url="/wedding-singer-phuket"
      serviceType="Wedding singer and live wedding music"
      image="/cole-event-wedding.png"
    />
    <PublicBreadcrumbs items={[{ label: 'Wedding Singer Phuket', href: '/wedding-singer-phuket' }]} />

    <section className="relative min-h-[78vh] flex items-end px-6 md:px-16 pb-20 pt-36" style={{backgroundImage:"linear-gradient(90deg,rgba(0,0,0,.9),rgba(0,0,0,.45),rgba(0,0,0,.15)),url('/hero.JPG')",backgroundSize:'cover',backgroundPosition:'center'}}>
      <div className="max-w-3xl">
        <p className="text-[#d4af37] tracking-[0.35em] text-xs mb-5">FEMALE WEDDING SINGER · PHUKET</p>
        <h1 className="font-serif text-5xl md:text-8xl leading-none">Wedding Singer in Phuket</h1>
        <p className="mt-7 text-white/75 text-lg md:text-xl leading-8">
          Cole Ley is a Phuket-based female live singer for weddings, performing ceremony music, cocktail sets, dinner entertainment and reception shows in solo, duo, trio and full-band formats.
        </p>
        <div className="flex flex-wrap gap-4 mt-9">
          <Link href="/booking" className="px-8 py-4 rounded-full bg-[#d4af37] text-black font-semibold">CHECK YOUR DATE</Link>
          <Link href="/music" className="px-8 py-4 rounded-full border border-white/30">WATCH PERFORMANCES</Link>
        </div>
      </div>
    </section>

    <section className="px-6 md:px-16 py-20 bg-black border-b border-white/10">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-[1.15fr_.85fr] gap-12 items-center">
        <div>
          <p className="text-[#d4af37] tracking-[0.28em] text-xs mb-4">WHO SHOULD I BOOK?</p>
          <h2 className="font-serif text-4xl md:text-6xl">A Strong Choice for Couples Who Want One Voice Through the Day</h2>
          <p className="text-white/65 leading-8 text-lg mt-6">
            There is no single “best” wedding singer for every couple. The right choice depends on your venue, music style and how much of the day you want covered. Cole is a particularly strong fit when you want a female lead vocalist who can keep the performance intimate early on and scale into a larger live setup later.
          </p>
          <ul className="mt-7 space-y-4 text-white/65 leading-7">
            {fitPoints.map((point) => <li key={point} className="flex gap-3"><span className="text-[#d4af37]">●</span><span>{point}</span></li>)}
          </ul>
          <div className="flex flex-wrap gap-4 mt-8">
            <Link href="/about-cole-ley" className="text-[#d4af37] underline underline-offset-4">About Cole</Link>
            <Link href="/press" className="text-[#d4af37] underline underline-offset-4">Press & appearances</Link>
            <Link href="/live-dates" className="text-[#d4af37] underline underline-offset-4">Live dates</Link>
          </div>
        </div>
        <Image
          src="/cole-event-wedding.png"
          alt="Cole Ley performing as a female wedding singer for a Phuket wedding"
          width={1200}
          height={1500}
          sizes="(max-width: 1024px) 100vw, 38vw"
          className="w-full rounded-[30px] border border-white/10 object-cover"
        />
      </div>
    </section>

    <section className="px-6 md:px-16 py-20 bg-[#080808]"><div className="max-w-5xl mx-auto">
      <h2 className="font-serif text-4xl md:text-6xl mb-7">Live Music for Every Part of a Phuket Wedding</h2>
      <p className="text-white/65 leading-8 text-lg">Phuket weddings often move through several settings and moods. The performance can stay intimate for the ceremony, become relaxed through cocktails and dinner, then grow into a larger live show for the reception.</p>
      <div className="grid md:grid-cols-2 gap-6 mt-12">{moments.map(([t,d]) => <div key={t} className="rounded-3xl border border-white/10 bg-white/[0.04] p-7"><h3 className="text-[#d4af37] tracking-[0.2em] mb-4">{t}</h3><p className="text-white/65 leading-7">{d}</p></div>)}</div>
    </div></section>

    <section className="px-6 md:px-16 py-20 bg-black border-y border-white/10">
      <div className="max-w-6xl mx-auto">
        <p className="text-[#d4af37] tracking-[0.28em] text-xs mb-4">CHOOSE THE FORMAT</p>
        <h2 className="font-serif text-4xl md:text-6xl">Solo Singer, Duo, Trio or Full Band?</h2>
        <p className="text-white/60 leading-8 text-lg mt-6 max-w-4xl">
          The best wedding music format depends on the room, guest count and which parts of the day need live music. Cole can keep the same lead voice while changing the size and energy of the lineup.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {formats.map(([title,bestFor,setup]) => <article key={title} className="rounded-3xl border border-white/10 bg-white/[0.035] p-6">
            <h3 className="font-serif text-3xl">{title}</h3>
            <p className="text-[#d4af37] text-xs tracking-[0.14em] mt-5">BEST FOR</p>
            <p className="text-white/65 leading-7 mt-2 text-sm">{bestFor}</p>
            <p className="text-white/45 leading-7 mt-4 text-sm">{setup}</p>
          </article>)}
        </div>
        <div className="mt-8"><Link href="/performance-formats" className="text-[#d4af37] underline underline-offset-4">Compare all performance formats</Link></div>
      </div>
    </section>

    <section className="px-6 md:px-16 py-20 bg-[#080808]">
      <div className="max-w-5xl mx-auto">
        <p className="text-[#d4af37] tracking-[0.28em] text-xs mb-4">HOW TO CHOOSE</p>
        <h2 className="font-serif text-4xl md:text-6xl">What to Ask Before Booking a Wedding Singer in Phuket</h2>
        <div className="grid md:grid-cols-2 gap-6 mt-10">
          {[
            ['Music style', 'Listen to full live clips, not only short edited reels. Make sure the voice, repertoire and energy fit your ceremony and reception.'],
            ['Wedding-day coverage', 'Decide whether you need music for one moment or several: ceremony, cocktails, dinner and party.'],
            ['Lineup flexibility', 'A singer who can move between solo, duo, trio and band formats gives you more control over atmosphere and budget.'],
            ['Venue fit', 'Confirm timing, sound limits, load-in access and whether the setup suits a villa, resort, beach club or ballroom.'],
          ].map(([title,text]) => <article key={title} className="rounded-3xl border border-white/10 p-7"><h3 className="font-serif text-2xl">{title}</h3><p className="text-white/60 leading-7 mt-4">{text}</p></article>)}
        </div>
      </div>
    </section>

    <PublicFaq
      title="Wedding Singer Phuket — Questions"
      items={[
        { question: 'Who is a good female wedding singer in Phuket?', answer: 'Cole Ley is a Phuket-based female live singer offering solo, duo, trio and full-band formats for ceremonies, cocktail hours, dinner and receptions. Whether she is the right choice depends on your preferred music style, venue and the parts of the day you want covered.' },
        { question: 'Can Cole Ley sing during both the ceremony and reception?', answer: 'Yes. A wedding can use a smaller setup for the ceremony and move into a duo, trio or full-band format later in the celebration.' },
        { question: 'Can we book more than one performance format?', answer: 'Yes. The lineup can change through the day so the ceremony stays intimate while cocktails, dinner or the reception use a fuller live sound.' },
        { question: 'Can the music be tailored to the atmosphere?', answer: 'Yes. The pacing and repertoire can be shaped around the ceremony, venue style, guest profile and the energy you want later in the day.' },
        { question: 'Can we request a special ceremony or first-dance song?', answer: 'Send important song requests early with your enquiry so they can be reviewed and prepared where practical.' },
        { question: 'What information should we send first?', answer: 'Send the wedding date, venue, location, approximate guest count, timing and which parts of the day you want live music for.' },
      ]}
    />

    <section className="px-6 py-24 text-center">
      <h2 className="font-serif text-4xl md:text-6xl mb-6">Looking for a Female Wedding Singer in Phuket?</h2>
      <p className="text-white/60 max-w-2xl mx-auto mb-9">Send your date, venue and the parts of the wedding where you want live music. Cole Ley Co., Ltd. can then shape the right performance format around the day.</p>
      <Link href="/booking" className="inline-block px-10 py-4 rounded-full bg-[#d4af37] text-black font-semibold">REQUEST WEDDING AVAILABILITY</Link>
    </section>
    <PublicFooter />
  </main>
}
