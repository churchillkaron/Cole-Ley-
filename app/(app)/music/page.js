"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { getSupabase } from "@/lib/supabase";
import PublicNav from "../../components/PublicNav";
import PublicFooter from "../../components/PublicFooter";
import PublicBreadcrumbs from "../../components/PublicBreadcrumbs";

export default function MusicPage() {
  const [tracks, setTracks] = useState([]);
  const [current, setCurrent] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);

  useEffect(() => {
    async function fetchMusic() {
      const supabase = getSupabase();

      const { data } = await supabase
        .from("music")
        .select("*")
        .order("created_at", { ascending: false });

      setTracks(data || []);
    }
    fetchMusic();
  }, []);

  function VideoPreview({ src }) {
    const videoRef = useRef(null);

    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            video.load();
          }
        },
        { threshold: 0.3 }
      );

      observer.observe(video);

      return () => observer.disconnect();
    }, []);

    function handleMouseEnter() {
      videoRef.current?.play();
    }

    function handleMouseLeave() {
      videoRef.current?.pause();
      videoRef.current.currentTime = 0;
    }

    return (
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="none"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition duration-300"
      />
    );
  }

  function nextVideo() {
    if (currentIndex === null) return;

    const next = (currentIndex + 1) % tracks.length;
    setCurrent(tracks[next]);
    setCurrentIndex(next);
  }

  function prevVideo() {
    if (currentIndex === null) return;

    const prev = (currentIndex - 1 + tracks.length) % tracks.length;
    setCurrent(tracks[prev]);
    setCurrentIndex(prev);
  }

    return (
    <div className="min-h-screen bg-black text-white">
      <PublicNav />
      <PublicBreadcrumbs items={[{ label: 'Gallery', href: '/music' }]} />

      <section className="max-w-6xl mx-auto px-6 pt-12 pb-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-[#d4af37] tracking-[0.4em] text-xs mb-5">FEATURED LIVE MOMENTS</p>
          <h1 className="font-serif text-4xl md:text-6xl mb-6">Cole Ley Live</h1>
          <p className="text-white/60 leading-8">
            Two recent live moments — stage performance and beach club energy in Phuket.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-10 max-w-4xl mx-auto items-start">
          <div>
            <div className="relative aspect-[9/16] overflow-hidden rounded-[28px] border border-white/10 bg-[#080808] shadow-2xl">
              <video
                src="/cole-stage-vertical-20s.mp4"
                poster="/cole-stage-vertical-poster.jpg"
                controls
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
              />
              <div className="pointer-events-none absolute top-4 left-4 rounded-full border border-white/15 bg-black/45 px-3 py-1 text-[10px] tracking-[0.24em] text-white/80 backdrop-blur-md">
                LIVE STAGE
              </div>
            </div>
            <p className="text-white/65 text-sm mt-5">A focused 20-second live performance moment.</p>
          </div>

          <div>
            <div className="relative aspect-[9/16] overflow-hidden rounded-[28px] border border-white/10 bg-[#080808] shadow-2xl">
              <video
                src="/cole-beach-club-vertical-20s.mp4"
                poster="/cole-beach-club-vertical-poster.jpg"
                controls
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
              />
              <div className="pointer-events-none absolute top-4 left-4 rounded-full border border-white/15 bg-black/45 px-3 py-1 text-[10px] tracking-[0.24em] text-white/80 backdrop-blur-md">
                BEACH CLUB
              </div>
            </div>
            <p className="text-white/65 text-sm mt-5">Sunset atmosphere, guests and live music in Phuket.</p>
          </div>
        </div>
      </section>

      {/* PERFORMANCE SHOWCASE */}
      <div className="max-w-6xl mx-auto px-6 py-16">

        <h2 className="text-[#d4af37] tracking-widest text-center mb-10">
          LIVE PERFORMANCES
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {tracks.length === 0 ? (
            <div className="text-center text-white/40 py-20 col-span-full">
              No performances uploaded yet
            </div>
          ) : (
            tracks.map((perf, index) => (
              <div
                key={perf.id}
                onClick={() => {
                  setCurrent(perf);
                  setCurrentIndex(index);
                }}
                className="group relative cursor-pointer rounded-2xl overflow-hidden border border-white/10 bg-black h-[200px]"
              >

                {/* THUMBNAIL */}
                {perf.thumbnail_url ? (
                  <img
                    src={perf.thumbnail_url}
                    alt={perf.title ? `${perf.title} — Cole Ley live performance` : "Cole Ley live performance"}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover group-hover:opacity-0 transition duration-300"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-white/30">
                    NO IMAGE
                  </div>
                )}
                

                {/* VIDEO PREVIEW */}
                {perf.video_url && (
                  <VideoPreview src={perf.preview_url || perf.video_url} />
                )}

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition" />

                {/* PLAY ICON */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#d4af37] flex items-center justify-center text-black text-xl">
                    ▶
                  </div>
                </div>

                {/* TEXT */}
                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-20">
                  <div className="text-sm font-semibold text-white">
                    {perf.title || "Untitled"}
                  </div>

                  <div className="text-xs text-white/70 line-clamp-2">
                    {perf.description || "Live performance"}
                  </div>

                  <div className="flex flex-wrap gap-1 pt-2">
                    {perf.tags?.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-1 bg-white/10 rounded-full text-white/80"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            ))
          )}

        </div>
      </div>

      {/* CINEMA PLAYER */}
      {current && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

          <button
            onClick={prevVideo}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-3xl z-50"
          >
            ‹
          </button>

          <button
            onClick={nextVideo}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-3xl z-50"
          >
            ›
          </button>

          <div className="absolute inset-0 bg-black/0 animate-fadeIn backdrop-blur-2xl" />

          <button
            onClick={() => setCurrent(null)}
            className="absolute top-6 right-6 z-50 text-white/70 hover:text-white text-2xl"
          >
            ✕
          </button>

          <div className="relative z-10 w-full max-w-6xl px-6 animate-scaleIn">

            <div className="rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.9)]">
              <video
                src={current.video_url}
                controls
                autoPlay
                playsInline
                className="w-full max-h-[80vh] object-cover bg-black"
              />
            </div>

            <div className="text-center mt-6">
              <h2 className="text-2xl md:text-3xl text-[#d4af37] tracking-widest">
                {current.title}
              </h2>

              <p className="text-white/50 mt-2">
                {current.description}
              </p>
            </div>

          </div>

        </div>
      )}

      <section className="border-y border-white/10 bg-[#080808] px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#d4af37] tracking-[0.32em] text-xs mb-5 text-center">
            LIVE MUSIC IN PHUKET
          </p>
          <h2 className="font-serif text-4xl md:text-6xl text-center">
            Choose the Right Performance for Your Event
          </h2>
          <p className="mt-6 max-w-3xl mx-auto text-center text-white/60 leading-8">
            Watch Cole Ley live, then explore music for Phuket weddings, hotels, beach clubs,
            restaurants and private events. Performance formats range from acoustic and duo sets
            to trio and full-band shows.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
            <Link href="/live-dates" className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 hover:border-[#d4af37]/40 transition">
              <p className="text-[#d4af37] tracking-[0.18em] text-xs">DATES</p>
              <h3 className="font-serif text-2xl mt-3">See Cole Ley Live</h3>
              <p className="text-white/55 leading-7 mt-3">Upcoming confirmed public performances from the official artist calendar.</p>
            </Link>
            <Link href="/wedding-singer-phuket" className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 hover:border-[#d4af37]/40 transition">
              <p className="text-[#d4af37] tracking-[0.18em] text-xs">WEDDINGS</p>
              <h3 className="font-serif text-2xl mt-3">Wedding Singer Phuket</h3>
              <p className="text-white/55 leading-7 mt-3">Ceremony, cocktail hour, dinner and reception live music.</p>
            </Link>
            <Link href="/hotels-beach-clubs-phuket" className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 hover:border-[#d4af37]/40 transition">
              <p className="text-[#d4af37] tracking-[0.18em] text-xs">VENUES</p>
              <h3 className="font-serif text-2xl mt-3">Hotels & Beach Clubs</h3>
              <p className="text-white/55 leading-7 mt-3">Sunset sets, dinner music, recurring performances and special events.</p>
            </Link>
            <Link href="/live-music-phuket" className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 hover:border-[#d4af37]/40 transition">
              <p className="text-[#d4af37] tracking-[0.18em] text-xs">PHUKET</p>
              <h3 className="font-serif text-2xl mt-3">Live Music Phuket</h3>
              <p className="text-white/55 leading-7 mt-3">Soul, blues, jazz and contemporary live performance for events and venues.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <div className="max-w-5xl mx-auto px-6 py-20 space-y-10">

        <h2 className="text-center text-[#d4af37] tracking-widest">
          PERFORMANCE OPTIONS
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {[
            { title: "ACOUSTIC LIVE", desc: "Live vocals with acoustic guitar by Cole Ley, ideal for weddings and intimate venues" },
            { title: "LIVE WITH DJ", desc: "Vocal performance over DJ sets, perfect for beach clubs and high-energy events" },
            { title: "DUO", desc: "Cole Ley with one musician for a richer performance" },
            { title: "TRIO", desc: "Cole Ley with two musicians for a fuller sound" },
            { title: "4-PIECE BAND", desc: "Compact band delivering strong energy" },
            { title: "FULL BAND", desc: "Complete band with vocals, guitar, bass, drums, and keys" }
          ].map((pkg, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center hover:bg-white/10 transition"
            >
              <div className="text-[#d4af37] mb-3 tracking-widest text-sm">
                {pkg.title}
              </div>

              <p className="text-white/60 text-sm">
                {pkg.desc}
              </p>
            </div>
          ))}

        </div>
      </div>

      {/* CTA */}
      <div className="text-center py-20 px-6">

        <h2 className="text-[#d4af37] tracking-widest mb-4">
          BOOK COLE LEY
        </h2>

        <p className="text-white/60 mb-6">
          Weddings • Beach Clubs • Private Events
        </p>

        <Link
          href="/booking"
          className="inline-block px-10 py-4 rounded-xl 
          bg-gradient-to-r from-[#d4af37] to-[#f5d98f] 
          text-black font-semibold tracking-widest
          hover:scale-[1.05] transition"
        >
          CONTACT NOW
        </Link>

      </div>

      <PublicFooter />
    </div>
  );
}