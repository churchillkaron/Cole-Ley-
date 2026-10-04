import Image from "next/image";
import Link from "next/link";
import PublicNav from "./components/PublicNav";
import PublicFooter from "./components/PublicFooter";

export default function Home() {

  const performances = [
    {
      title: "SOLO VOCAL",
      text: "Elegant live vocals for ceremonies, serenades, cocktail hours, restaurants and intimate luxury events.",
      image: "/cole-solo-performance.png",
      position: "50% 35%",
      href: "/performance-formats",
    },
    {
      title: "ACOUSTIC & DUO",
      text: "From stripped-back solo acoustic to a refined duo with one musician for weddings, lounges and private dinners.",
      image: "/cole-duo-performance.png",
      position: "50% 32%",
      href: "/acoustic-singer-phuket",
    },
    {
      title: "DJ TO FULL BAND",
      text: "Singer-with-DJ, trio and full-band formats for beach clubs, galas, parties and high-energy nights.",
      image: "/cole-full-band.png",
      position: "50% 24%",
      href: "/live-band-phuket",
    },
  ];


  const events = [
    {
      title: "WEDDINGS",
      text: "Ceremony, cocktail hour, dinner and reception entertainment.",
      image: "/cole-event-wedding.png",
      position: "50% 42%",
      href: "/wedding-singer-phuket",
    },
    {
      title: "BEACH CLUBS",
      text: "Sunset sessions, lounge music and party nights.",
      image: "/cole-event-beach-club.png",
      position: "50% 45%",
      href: "/hotels-beach-clubs-phuket",
    },
    {
      title: "CORPORATE EVENTS",
      text: "Gala dinners, award nights, VIP events and product launches.",
      image: "/cole-event-corporate.png",
      position: "50% 40%",
      href: "/corporate-event-live-music-phuket",
    },
    {
      title: "PRIVATE PARTIES",
      text: "Luxury villa parties, birthdays, anniversaries and special moments.",
      image: "/cole-event-private-party.png",
      position: "50% 42%",
      href: "/private-party-live-music-phuket",
    },
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <PublicNav />

      <section
        className="relative min-h-[calc(100vh-84px)] md:min-h-[calc(100vh-96px)] flex items-center px-6 md:px-16 py-14 md:py-16"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(0,0,0,0.82), rgba(0,0,0,0.45), rgba(0,0,0,0.05)), url('/cole-hero-2026.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "72% 30%",
        }}
      >
        <div className="max-w-2xl">
          <p className="text-[#d4af37] tracking-[0.32em] text-xs md:text-sm mb-5">
            LIVE ARTIST · SINGER · MUSICIAN · PHUKET
          </p>

          <h1 className="font-serif text-5xl md:text-8xl leading-[0.95] max-w-3xl">
            COLE LEY
          </h1>

          <p className="font-serif text-3xl md:text-5xl mt-5 text-white/90">
            Own Your Passion
          </p>

          <p className="text-white/70 text-base md:text-xl mt-8 max-w-2xl leading-8">
            From intimate serenades and solo acoustic sets to singer-with-DJ, duo, trio and full-band shows for weddings, beach clubs, hotels, restaurants, private parties and destination events.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <Link
              href="/booking"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#d4af37] to-[#f5d98f] text-black font-semibold tracking-[0.2em] text-center"
            >
              BOOK COLE LEY
            </Link>

            <Link
              href="/music"
              className="px-8 py-4 rounded-full border border-white/30 text-white/80 tracking-[0.2em] text-center"
            >
              VIEW GALLERY
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-16 py-20 bg-black border-y border-white/10">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[#d4af37] tracking-[0.4em] text-xs mb-5">
            LIVE MUSIC IN PHUKET & BEYOND
          </p>
          <h2 className="font-serif text-4xl md:text-6xl mb-7">
            Versatile Live Artist & Performer
          </h2>
          <p className="text-white/65 text-base md:text-lg leading-8 max-w-4xl mx-auto">
            Cole Ley is a Phuket-based live artist, singer and musician performing across soul, blues, jazz and contemporary music. Her formats range from solo vocal, solo acoustic and serenade performances to singer-with-DJ, duo, trio and full-band shows for weddings, luxury hotels, beach clubs, restaurants, corporate events and private celebrations. Through Cole Ley Co., Ltd., clients can also access an artist-agency network for other singers, DJs, bands and specialist musicians when the event needs more than Cole herself.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link href="/about-cole-ley" className="px-6 py-3 rounded-full border border-white/20 text-white/75">BOOK COLE LEY</Link>
            <Link href="/entertainment-agency-phuket" className="px-6 py-3 rounded-full border border-[#d4af37]/50 text-[#d4af37]">USE THE AGENCY</Link>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-16 py-24 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#d4af37] tracking-[0.4em] text-xs mb-4">
            OUR PERFORMANCES
          </p>

          <h2 className="font-serif text-4xl md:text-6xl mb-12">
            Choose the Right Performance Format
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {performances.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group relative h-[460px] rounded-[28px] overflow-hidden border border-white/10 bg-white/5 hover:border-[#d4af37]/35 transition"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectPosition: item.position }}
                  className="object-cover opacity-85 group-hover:scale-[1.025] transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />

                <div className="absolute bottom-0 p-7">
                  <h3 className="text-[#d4af37] tracking-[0.25em] text-sm mb-4">
                    {item.title}
                  </h3>
                  <p className="text-white/75 leading-7 text-sm">
                    {item.text}
                  </p>
                  <span className="inline-flex items-center gap-2 mt-5 text-[10px] font-semibold tracking-[0.22em] text-[#d4af37]">
                    EXPLORE FORMAT <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-16 py-24 bg-black">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#d4af37] tracking-[0.4em] text-xs mb-4">
            PERFECT FOR EVERY OCCASION
          </p>

          <h2 className="font-serif text-4xl md:text-6xl mb-12">
            Designed For Luxury Events
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {events.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group relative h-[360px] rounded-[28px] overflow-hidden border border-white/10 hover:border-[#d4af37]/35 transition"
              >
                <Image
                  src={item.image}
                  alt={`${item.title} live music with Cole Ley`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectPosition: item.position }}
                  className="object-cover opacity-90 group-hover:scale-[1.015] transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />

                <div className="absolute bottom-0 p-8">
                  <h3 className="text-[#d4af37] tracking-[0.28em] text-sm mb-3">
                    {item.title}
                  </h3>
                  <p className="text-white/75 max-w-md leading-7">
                    {item.text}
                  </p>
                  <span className="inline-flex items-center gap-3 mt-5 rounded-full border border-[#d4af37]/60 px-5 py-2 text-[10px] font-semibold tracking-[0.24em] text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-black transition">
                    LEARN MORE <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-16 py-24 bg-black">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#d4af37] tracking-[0.4em] text-xs mb-4 text-center">EXPLORE</p>
          <h2 className="font-serif text-4xl md:text-6xl mb-12 text-center">Find the Right Live Music</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            <Link href="/live-dates" className="rounded-[28px] border border-white/10 bg-white/[0.04] p-8 hover:bg-white/[0.07] transition">
              <h3 className="text-[#d4af37] tracking-[0.2em] text-sm mb-4">LIVE DATES</h3>
              <p className="text-white/65 leading-7">See confirmed public performances from Cole Ley’s official artist calendar in Phuket and beyond.</p>
            </Link>
            <Link href="/live-music-phuket" className="rounded-[28px] border border-white/10 bg-white/[0.04] p-8 hover:bg-white/[0.07] transition">
              <h3 className="text-[#d4af37] tracking-[0.2em] text-sm mb-4">LIVE MUSIC PHUKET</h3>
              <p className="text-white/65 leading-7">Live performances for venues, private events, restaurants, hotels and celebrations across Phuket.</p>
            </Link>
            <Link href="/wedding-singer-phuket" className="rounded-[28px] border border-white/10 bg-white/[0.04] p-8 hover:bg-white/[0.07] transition">
              <h3 className="text-[#d4af37] tracking-[0.2em] text-sm mb-4">WEDDING SINGER PHUKET</h3>
              <p className="text-white/65 leading-7">Female live singer Cole Ley for ceremonies, cocktail hours, dinner and receptions, from solo through full-band formats.</p>
            </Link>
            <Link href="/hotels-beach-clubs-phuket" className="rounded-[28px] border border-white/10 bg-white/[0.04] p-8 hover:bg-white/[0.07] transition">
              <h3 className="text-[#d4af37] tracking-[0.2em] text-sm mb-4">HOTELS & BEACH CLUBS</h3>
              <p className="text-white/65 leading-7">Sunset sessions, recurring venue performances, special events and full-band nights.</p>
            </Link>
            <Link href="/press" className="rounded-[28px] border border-white/10 bg-white/[0.04] p-8 hover:bg-white/[0.07] transition">
              <h3 className="text-[#d4af37] tracking-[0.2em] text-sm mb-4">PRESS & APPEARANCES</h3>
              <p className="text-white/65 leading-7">Independent venue, editorial and official music-platform references for Cole Ley.</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-16 py-28 bg-[#080808] text-center">
        <p className="text-[#d4af37] tracking-[0.4em] text-xs mb-6">
          REQUEST PROPOSAL
        </p>

        <h2 className="font-serif text-4xl md:text-6xl mb-8">
          Let&apos;s Create Something Unforgettable
        </h2>

        <p className="text-white/60 max-w-2xl mx-auto leading-8 mb-10">
          Tell us about your event and we will create the perfect live music
          experience for your venue, wedding or private celebration.
        </p>

        <Link
          href="/booking"
          className="inline-block px-10 py-4 rounded-full bg-gradient-to-r from-[#d4af37] to-[#f5d98f] text-black font-semibold tracking-[0.25em]"
        >
          INQUIRE NOW
        </Link>
      </section>

      <PublicFooter />
    </main>
  );
}
