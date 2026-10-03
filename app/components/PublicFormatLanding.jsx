import Link from 'next/link'
import PublicNav from './PublicNav'
import PublicFooter from './PublicFooter'
import PublicBreadcrumbs from './PublicBreadcrumbs'
import PublicServiceSchema from './PublicServiceSchema'
import PublicFaq from './PublicFaq'

export default function PublicFormatLanding({
  slug,
  eyebrow,
  title,
  intro,
  image,
  serviceName,
  serviceDescription,
  serviceType,
  sections,
  faq,
}) {
  return (
    <main className="min-h-screen bg-black text-white">
      <PublicServiceSchema
        name={serviceName}
        description={serviceDescription}
        url={`/${slug}`}
        serviceType={serviceType}
        image={image}
      />
      <PublicNav />
      <PublicBreadcrumbs items={[{ label: title, href: `/${slug}` }]} />

      <section className="px-6 md:px-16 pt-32 md:pt-40 pb-20 bg-[#080808]">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#d4af37] tracking-[0.35em] text-xs mb-5">{eyebrow}</p>
          <h1 className="font-serif text-5xl md:text-8xl leading-none max-w-5xl">{title}</h1>
          <p className="text-white/65 text-lg leading-8 mt-8 max-w-3xl">{intro}</p>
          <div className="flex flex-wrap gap-4 mt-9">
            <Link href="/booking" className="px-8 py-4 rounded-full bg-[#d4af37] text-black font-semibold">CHECK AVAILABILITY</Link>
            <Link href="/music" className="px-8 py-4 rounded-full border border-white/25">WATCH COLE LIVE</Link>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-16 py-20">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
          {sections.map((section) => (
            <article key={section.title} className="border-t border-white/10 pt-7">
              <p className="text-[#d4af37] text-xs tracking-[0.2em]">{section.label}</p>
              <h2 className="font-serif text-3xl md:text-4xl mt-3">{section.title}</h2>
              <p className="text-white/60 leading-8 mt-5">{section.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-16 py-20 bg-[#080808] border-y border-white/10">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#d4af37] tracking-[0.32em] text-xs mb-5">RELATED</p>
          <h2 className="font-serif text-4xl md:text-6xl">Build the Right Lineup</h2>
          <div className="grid md:grid-cols-3 gap-5 mt-10">
            <Link href="/performance-formats" className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 hover:border-[#d4af37]/40 transition">
              <h3 className="font-serif text-2xl">Performance Formats</h3>
              <p className="text-white/55 leading-7 mt-3">Compare solo, acoustic, DJ, duo, trio and full-band options.</p>
            </Link>
            <Link href="/live-dates" className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 hover:border-[#d4af37]/40 transition">
              <h3 className="font-serif text-2xl">Live Dates</h3>
              <p className="text-white/55 leading-7 mt-3">See confirmed public shows from the official artist calendar.</p>
            </Link>
            <Link href="/press" className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 hover:border-[#d4af37]/40 transition">
              <h3 className="font-serif text-2xl">Press & Appearances</h3>
              <p className="text-white/55 leading-7 mt-3">Independent venue, editorial and music-platform references.</p>
            </Link>
          </div>
        </div>
      </section>

      <PublicFaq title={`${title} — Questions`} items={faq} />

      <section className="px-6 md:px-16 py-24 text-center">
        <h2 className="font-serif text-4xl md:text-6xl">Tell Us About the Event</h2>
        <p className="text-white/60 leading-8 mt-6 max-w-2xl mx-auto">
          Send the date, venue, guest profile and atmosphere you want. The request goes directly into Cole Ley’s Avantiqo Artist Agency booking workflow.
        </p>
        <Link href="/booking" className="inline-block mt-8 px-10 py-4 rounded-full bg-[#d4af37] text-black font-semibold">REQUEST AVAILABILITY</Link>
      </section>

      <PublicFooter />
    </main>
  )
}
