"use client";
export const dynamic = "force-dynamic";

import { useRouter } from "next/navigation";

const AVANTIQO_LOGIN_URL = "https://avantiqo.ai/login?brand=coleley";

export default function Home() {
  const router = useRouter();

  const performances = [
    {
      title: "SOLO PERFORMANCE",
      text: "Elegant vocals for ceremonies, cocktail hours, restaurants and intimate luxury events.",
      image: "/IMG_7181.JPG",
    },
    {
      title: "DUO PERFORMANCE",
      text: "A refined live sound with Cole Ley and one musician for weddings, lounges and private dinners.",
      image: "/1.JPG",
    },
    {
      title: "FULL BAND",
      text: "High-energy live entertainment for beach clubs, galas, parties and unforgettable nights.",
      image: "/2.JPG",
    },
  ];

  const events = [
    {
      title: "WEDDINGS",
      text: "Ceremony, cocktail hour, dinner and reception entertainment.",
      image: "/hero.JPG",
    },
    {
      title: "BEACH CLUBS",
      text: "Sunset sessions, lounge music and party nights.",
      image: "/3.JPG",
    },
    {
      title: "CORPORATE EVENTS",
      text: "Gala dinners, award nights, VIP events and product launches.",
      image: "/bg.png",
    },
    {
      title: "PRIVATE PARTIES",
      text: "Luxury villa parties, birthdays, anniversaries and special moments.",
      image: "/IMG_7180.JPG",
    },
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <nav className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 py-2 bg-transparent">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <img
            src="/logo-cole.png"
            alt="Cole Ley"
            className="w-[120px] md:w-[260px] object-contain"
          />

          <div className="hidden md:flex items-start gap-8 text-[12px] tracking-[0.25em] text-white/70 -mt-14">
            <button onClick={() => router.push("/")} className="text-[#d4af37]">
              HOME
            </button>
            <button onClick={() => router.push("/music")}>GALLERY</button>
            <button onClick={() => router.push("/booking")}>CONTACT</button>
            <a
              href={AVANTIQO_LOGIN_URL}
              className="border border-[#d4af37]/50 text-[#d4af37] px-4 py-2 rounded-full"
            >
              LOGIN
            </a>
          </div>

          <a
            href={AVANTIQO_LOGIN_URL}
            className="md:hidden border border-[#d4af37]/50 text-[#d4af37] px-4 py-2 rounded-full text-[11px] tracking-widest"
          >
            LOGIN
          </a>
        </div>
      </nav>

      <section
        className="relative min-h-screen flex items-center px-6 md:px-16 pt-28"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(0,0,0,0.82), rgba(0,0,0,0.45), rgba(0,0,0,0.05)), url('/cole-hero.png')",
          backgroundSize: "cover",
          backgroundPosition: "85% 95%",
        }}
      >
        <div className="max-w-2xl">
          <p className="text-[#d4af37] tracking-[0.45em] text-xs md:text-sm mb-6">
            
          </p>

          <h1 className="font-serif text-5xl md:text-8xl leading-[0.95] max-w-3xl">
            OWN YOUR PASSION
          </h1>

          <p className="text-white/70 text-base md:text-xl mt-8 max-w-2xl leading-8">
            Every moment has a feeling.
            Music gives it a voice.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <button
              onClick={() => router.push("/booking")}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#d4af37] to-[#f5d98f] text-black font-semibold tracking-[0.2em]"
            >
              BOOK COLE LEY
            </button>

            <button
              onClick={() => router.push("/music")}
              className="px-8 py-4 rounded-full border border-white/30 text-white/80 tracking-[0.2em]"
            >
              VIEW GALLERY
            </button>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-16 py-24 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#d4af37] tracking-[0.4em] text-xs mb-4">
            OUR PERFORMANCES
          </p>

          <h2 className="font-serif text-4xl md:text-6xl mb-12">
            Choose The Perfect Sound
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {performances.map((item) => (
              <div
                key={item.title}
                className="group relative h-[460px] rounded-[28px] overflow-hidden border border-white/10 bg-white/5"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition duration-700"
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
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-65"
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

      <section className="px-6 md:px-16 py-24 bg-[#080808] text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#d4af37] tracking-[0.4em] text-xs mb-6">
            FEATURED MOMENTS
          </p>

          <h2 className="font-serif text-4xl md:text-6xl mb-8">
            Elegant Music. Unforgettable Atmosphere.
          </h2>

          <p className="text-white/60 leading-8 mb-10">
            From intimate wedding ceremonies to high-energy beach club nights,
            Cole Ley creates a refined live music experience tailored to each event.
          </p>

          <button
            onClick={() => router.push("/music")}
            className="px-8 py-4 rounded-full border border-[#d4af37]/50 text-[#d4af37] tracking-[0.2em]"
          >
            WATCH PERFORMANCES
          </button>
        </div>
      </section>

      <section className="px-6 md:px-16 py-24 bg-black">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            "The highlight of our wedding.",
            "Professional, elegant and unforgettable.",
            "A luxury performance our guests still talk about.",
          ].map((quote) => (
            <div
              key={quote}
              className="rounded-[28px] border border-white/10 bg-white/[0.04] p-8"
            >
              <p className="text-[#d4af37] mb-4">★★★★★</p>
              <p className="text-white/70 leading-7">"{quote}"</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-16 py-28 bg-[#080808] text-center">
        <p className="text-[#d4af37] tracking-[0.4em] text-xs mb-6">
          REQUEST PROPOSAL
        </p>

        <h2 className="font-serif text-4xl md:text-6xl mb-8">
          Let's Create Something Unforgettable
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

      <footer className="px-6 md:px-16 py-10 border-t border-white/10 bg-black text-white/40 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-4">
          <p>Cole Ley Entertainment · Phuket, Thailand</p>
          <p>cole@coleley.com · +66 (0) 94427 1265</p>
        </div>
      </footer>
    </main>
  );
}
