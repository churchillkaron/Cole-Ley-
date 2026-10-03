"use client";
export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PublicNav from "./components/PublicNav";
import PublicFooter from "./components/PublicFooter";

export default function Home() {
  const router = useRouter();

  const performances = [
    {
      title: "SOLO VOCAL",
      text: "Elegant live vocals for ceremonies, serenades, cocktail hours, restaurants and intimate luxury events.",
      image: "/cole-solo-performance.png",
      position: "50% 35%",
    },
    {
      title: "ACOUSTIC & DUO",
      text: "From stripped-back solo acoustic to a refined duo with one musician for weddings, lounges and private dinners.",
      image: "/cole-duo-performance.png",
      position: "50% 32%",
    },
    {
      title: "DJ TO FULL BAND",
      text: "Singer-with-DJ, trio and full-band formats for beach clubs, galas, parties and high-energy nights.",
      image: "/cole-full-band.png",
      position: "50% 24%",
    },
  ];

  const events = [
    {
      title: "WEDDINGS",
      text: "Ceremony, cocktail hour, dinner and reception entertainment.",
      image: "/cole-event-wedding.png",
      position: "50% 42%",
    },
    {
      title: "BEACH CLUBS",
      text: "Sunset sessions, lounge music and party nights.",
      image: "/cole-event-beach-club.png",
      position: "50% 45%",
    },
    {
      title: "CORPORATE EVENTS",
      text: "Gala dinners, award nights, VIP events and product launches.",
      image: "/cole-event-corporate.png",
      position: "50% 40%",
    },
    {
      title: "PRIVATE PARTIES",
      text: "Luxury villa parties, birthdays, anniversaries and special moments.",
      image: "/cole-event-private-party.png",
      position: "50% 42%",
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
            Cole Ley is a Phuket-based live artist, singer and musician performing across soul, blues, jazz and contemporary music. Her formats range from solo vocal, solo acoustic and serenade performances to singer-with-DJ, duo, trio and full-band shows for weddings, luxury hotels, beach clubs, restaurants, corporate events and private celebrations.
          </p>
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
              <div
                key={item.title}
                className="group relative h-[460px] rounded-[28px] overflow-hidden border border-white/10 bg-white/5"
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
                </div>
              </div>
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
              <div
                key={item.title}
                className="relative h-[360px] rounded-[28px] overflow-hidden border border-white/10"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectPosition: item.position }}
                  className="object-cover opacity-90 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />

                <div className="absolute bottom-0 p-8">
                  <h3 className="text-[#d4af37] tracking-[0.28em] text-sm mb-3">
                    {item.title}
                  </h3>
                  <p className="text-white/75 max-w-md leading-7">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-16 py-24 bg-[#080808]">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[#d4af37] tracking-[0.4em] text-xs mb-6">
              FEATURED MOMENTS
            </p>

            <h2 className="font-serif text-4xl md:text-6xl mb-8">
              Elegant Music. Unforgettable Atmosphere.
            </h2>

            <p className="text-white/60 leading-8 mb-12">
              Real live performances from Cole Ley — from focused stage moments
              to high-energy beach club nights in Phuket.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-10 max-w-4xl mx-auto items-start">
            <div className="group">
              <div className="relative aspect-[9/16] overflow-hidden rounded-[28px] border border-white/10 bg-black shadow-2xl">
                <video
                  src="/cole-stage-vertical-20s.mp4"
                  poster="/cole-stage-vertical-poster.jpg"
                  playsInline
                  controls
                  preload="metadata"
                  className="h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute top-4 left-4 rounded-full border border-white/15 bg-black/45 px-3 py-1 text-[10px] tracking-[0.24em] text-white/80 backdrop-blur-md">
                  LIVE STAGE
                </div>
              </div>
              <div className="pt-5 text-left">
                <p className="text-white/75 text-sm">Cole Ley performing live on stage.</p>
              </div>
            </div>

            <div className="group">
              <div className="relative aspect-[9/16] overflow-hidden rounded-[28px] border border-white/10 bg-black shadow-2xl">
                <video
                  src="/cole-beach-club-vertical-20s.mp4"
                  poster="/cole-beach-club-vertical-poster.jpg"
                  playsInline
                  controls
                  preload="metadata"
                  className="h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute top-4 left-4 rounded-full border border-white/15 bg-black/45 px-3 py-1 text-[10px] tracking-[0.24em] text-white/80 backdrop-blur-md">
                  BEACH CLUB
                </div>
              </div>
              <div className="pt-5 text-left">
                <p className="text-white/75 text-sm">Sunset energy, guests and live music in Phuket.</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/music"
              className="inline-block px-8 py-4 rounded-full border border-[#d4af37]/50 text-[#d4af37] tracking-[0.2em]"
            >
              WATCH MORE PERFORMANCES
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-16 py-24 bg-black">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#d4af37] tracking-[0.4em] text-xs mb-4 text-center">EXPLORE</p>
          <h2 className="font-serif text-4xl md:text-6xl mb-12 text-center">Find the Right Live Music</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/live-music-phuket" className="rounded-[28px] border border-white/10 bg-white/[0.04] p-8 hover:bg-white/[0.07] transition">
              <h3 className="text-[#d4af37] tracking-[0.2em] text-sm mb-4">LIVE MUSIC PHUKET</h3>
              <p className="text-white/65 leading-7">Live performances for venues, private events, restaurants, hotels and celebrations across Phuket.</p>
            </Link>
            <Link href="/wedding-singer-phuket" className="rounded-[28px] border border-white/10 bg-white/[0.04] p-8 hover:bg-white/[0.07] transition">
              <h3 className="text-[#d4af37] tracking-[0.2em] text-sm mb-4">PHUKET WEDDINGS</h3>
              <p className="text-white/65 leading-7">Ceremony, cocktail hour, dinner and reception music with solo through full-band options.</p>
            </Link>
            <Link href="/hotels-beach-clubs-phuket" className="rounded-[28px] border border-white/10 bg-white/[0.04] p-8 hover:bg-white/[0.07] transition">
              <h3 className="text-[#d4af37] tracking-[0.2em] text-sm mb-4">HOTELS & BEACH CLUBS</h3>
              <p className="text-white/65 leading-7">Sunset sessions, recurring venue performances, special events and full-band nights.</p>
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

        <button
          onClick={() => router.push("/booking")}
          className="px-10 py-4 rounded-full bg-gradient-to-r from-[#d4af37] to-[#f5d98f] text-black font-semibold tracking-[0.25em]"
        >
          INQUIRE NOW
        </button>
      </section>

      <PublicFooter />
    </main>
  );
}
