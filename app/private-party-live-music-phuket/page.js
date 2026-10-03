import Image from 'next/image'
import Link from 'next/link'
import PublicNav from '../components/PublicNav'
import PublicFooter from '../components/PublicFooter'
import PublicBreadcrumbs from '../components/PublicBreadcrumbs'
import PublicFaq from '../components/PublicFaq'
import PublicServiceSchema from '../components/PublicServiceSchema'

export const metadata = {
  title: 'Private Party Live Music Phuket',
  description:
    'Book Cole Ley for private party live music in Phuket: luxury villa parties, birthdays, anniversaries, proposals, dinners and private celebrations.',
  alternates: { canonical: '/private-party-live-music-phuket' },
  openGraph: {
    title: 'Private Party Live Music Phuket | Cole Ley',
    description:
      'Live music for Phuket villa parties, birthdays, anniversaries and private celebrations.',
    url: '/private-party-live-music-phuket',
    images: ['/cole-event-private-party.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Private Party Live Music Phuket | Cole Ley',
    description:
      'Live music for luxury villas, birthdays, anniversaries and private events in Phuket.',
    images: ['/cole-event-private-party.png'],
  },
}

const occasions = [
  ['Villa Parties', 'Live music designed around an intimate private setting, from relaxed sunset atmosphere to a stronger party later in the night.'],
  ['Birthdays', 'A performance format that can move from dinner and conversation into a more energetic celebration.'],
  ['Anniversaries & Proposals', 'Personal vocal, acoustic or serenade-style performances for meaningful moments.'],
  ['Private Dinners', 'Elegant live music that adds atmosphere without taking over the room.'],
]

export default function PrivatePartyPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <PublicNav />
      <PublicServiceSchema
        name="Private Party Live Music in Phuket"
        description="Private party live music by Cole Ley for luxury villas, birthdays, anniversaries, proposals, dinners and private celebrations in Phuket."
        url="/private-party-live-music-phuket"
        serviceType="Private event live music"
        image="/cole-event-private-party.png"
      />
      <PublicBreadcrumbs items={[{ label: 'Private Party Live Music Phuket', href: '/private-party-live-music-phuket' }]} />

      <section className="relative min-h-[76vh] overflow-hidden flex items-end px-6 md:px-16 pb-20 pt-36">
        <Image
          src="/cole-event-private-party.png"
          alt="Luxury Phuket villa setting for a private party with live music"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/55 to-black/10" />
        <div className="relative max-w-4xl">
          <p className="text-[#d4af37] tracking-[0.35em] text-xs mb-5">VILLAS · BIRTHDAYS · PRIVATE CELEBRATIONS</p>
          <h1 className="font-serif text-5xl md:text-8xl leading-none">Private Party Live Music in Phuket</h1>
          <p className="mt-7 max-w-3xl text-white/72 text-lg md:text-xl leading-8">
            From a personal serenade or elegant dinner set to singer-with-DJ, trio or full band,
            Cole Ley can shape the performance around the people, setting and energy of your private event.
          </p>
          <div className="flex flex-wrap gap-4 mt-9">
            <Link href="/booking" className="px-8 py-4 rounded-full bg-[#d4af37] text-black font-semibold">CHECK YOUR DATE</Link>
            <Link href="/music" className="px-8 py-4 rounded-full border border-white/30">WATCH LIVE</Link>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-16 py-20 bg-[#080808]">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#d4af37] tracking-[0.3em] text-xs mb-5">PRIVATE DOES NOT MEAN GENERIC</p>
          <h2 className="font-serif text-4xl md:text-6xl max-w-4xl">Built Around Your Celebration</h2>
          <p className="text-white/60 leading-8 text-lg mt-7 max-w-4xl">
            A villa dinner, milestone birthday, proposal or anniversary needs a different scale
            and pace. The music can remain close and personal or build into a larger live performance
            as the evening develops.
          </p>

          <div className="grid md:grid-cols-2 gap-5 mt-12">
            {occasions.map(([title, text]) => (
              <article key={title} className="rounded-[28px] border border-white/10 bg-white/[0.035] p-7">
                <h3 className="font-serif text-3xl">{title}</h3>
                <p className="text-white/58 leading-7 mt-4">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <PublicFaq
        title="Private Event Music — Questions"
        items={[
          { question: 'Can Cole perform at a private villa?', answer: 'Yes. Private villa events can be planned around the available space, guest count, timing and the atmosphere you want.' },
          { question: 'Can I book a serenade for a proposal or anniversary?', answer: 'Yes. Solo vocal, acoustic and serenade-style performances are available for personal moments including proposals and anniversaries.' },
          { question: 'Can the music become more energetic later?', answer: 'Yes. A private event can begin with relaxed live music and move into singer-with-DJ, trio or full-band energy later in the evening.' },
          { question: 'What details should I send first?', answer: 'Send the date, location, guest count, occasion, approximate timings and the atmosphere or performance format you have in mind.' },
        ]}
      />

      <section className="px-6 py-24 text-center">
        <h2 className="font-serif text-4xl md:text-6xl mb-6">Planning a Private Event in Phuket?</h2>
        <p className="text-white/60 max-w-2xl mx-auto mb-9">
          Tell us where, when and what you are celebrating and we can shape the right live performance.
        </p>
        <Link href="/booking" className="inline-block px-10 py-4 rounded-full bg-[#d4af37] text-black font-semibold">REQUEST AVAILABILITY</Link>
      </section>

      <PublicFooter />
    </main>
  )
}
