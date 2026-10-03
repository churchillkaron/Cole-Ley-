"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const AVANTIQO_LOGIN_URL = "https://avantiqo.ai/login?brand=coleley";

const primaryLinks = [
  ["/", "HOME"],
  ["/music", "GALLERY"],
  ["/live-dates", "DATES"],
  ["/about-cole-ley", "ABOUT"],
  ["/press", "PRESS"],
  ["/booking", "CONTACT"],
];

const musicLinks = [
  ["/performance-formats", "Performance Formats"],
  ["/jazz-singer-phuket", "Jazz"],
  ["/acoustic-singer-phuket", "Acoustic"],
  ["/live-band-phuket", "Full Band"],
  ["/live-music-phuket", "Live Music Phuket"],
];

const eventLinks = [
  ["/wedding-singer-phuket", "Weddings"],
  ["/hotels-beach-clubs-phuket", "Hotels & Beach Clubs"],
  ["/corporate-event-live-music-phuket", "Corporate Events"],
  ["/private-party-live-music-phuket", "Private Parties"],
];

function DesktopMenu({ label, links, pathname }) {
  const active = links.some(([href]) => pathname === href);
  return (
    <div className="relative group">
      <button type="button" className={`${active ? "text-[#d4af37]" : "hover:text-white"} py-8 transition`} aria-haspopup="true">
        {label}
      </button>
      <div className="invisible absolute left-1/2 top-[66px] w-[220px] -translate-x-1/2 translate-y-1 rounded-xl border border-white/10 bg-black/95 p-2 opacity-0 shadow-2xl backdrop-blur-xl transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
        {links.map(([href, itemLabel]) => (
          <Link key={href} href={href} className={`block rounded-lg px-3 py-2.5 text-[10px] tracking-[0.06em] ${pathname === href ? "bg-white/[0.06] text-[#d4af37]" : "text-white/65 hover:bg-white/[0.04] hover:text-white"}`}>
            {itemLabel}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function PublicNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-black/88 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto h-[84px] md:h-[96px] px-4 md:px-8 flex items-center justify-between">
          <Link href="/" aria-label="Cole Ley home">
            <Image src="/logo-cole.png" alt="Cole Ley" width={210} height={144} sizes="(max-width: 768px) 120px, 210px" className="w-[120px] md:w-[190px] h-auto object-contain" priority />
          </Link>

          <div className="hidden md:flex items-center gap-5 text-[10px] tracking-[0.18em] text-white/70">
            {primaryLinks.slice(0, 3).map(([href, label]) => (
              <Link key={href} href={href} className={pathname === href ? "text-[#d4af37]" : "hover:text-white transition"}>{label}</Link>
            ))}

            <DesktopMenu label="MUSIC" links={musicLinks} pathname={pathname} />
            <DesktopMenu label="EVENTS" links={eventLinks} pathname={pathname} />

            {primaryLinks.slice(3).map(([href, label]) => (
              <Link key={href} href={href} className={pathname === href ? "text-[#d4af37]" : "hover:text-white transition"}>{label}</Link>
            ))}

            <a href={AVANTIQO_LOGIN_URL} className="border border-[#d4af37]/50 text-[#d4af37] px-4 py-2 rounded-full">LOGIN</a>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <Link href="/live-dates" className="text-[10px] tracking-[0.18em] text-white/75">DATES</Link>
            <button type="button" onClick={() => setMobileOpen((open) => !open)} className="text-[10px] tracking-[0.18em] text-[#d4af37]" aria-expanded={mobileOpen} aria-controls="cole-mobile-nav">
              MENU
            </button>
          </div>
        </div>

        {mobileOpen ? (
          <div id="cole-mobile-nav" className="md:hidden border-t border-white/10 bg-black/98 px-5 py-5 max-h-[calc(100vh-84px)] overflow-y-auto">
            <div className="grid grid-cols-2 gap-2">
              {[...primaryLinks, ...musicLinks, ...eventLinks].map(([href, label]) => (
                <Link key={href} href={href} onClick={() => setMobileOpen(false)} className={`rounded-lg border border-white/[0.06] px-3 py-3 text-[10px] tracking-[0.06em] ${pathname === href ? "bg-white/[0.06] text-[#d4af37]" : "text-white/70"}`}>
                  {label}
                </Link>
              ))}
            </div>
            <a href={AVANTIQO_LOGIN_URL} className="mt-4 block rounded-full border border-[#d4af37]/50 px-4 py-3 text-center text-[10px] tracking-[0.18em] text-[#d4af37]">LOGIN</a>
          </div>
        ) : null}
      </nav>
      <div className="h-[84px] md:h-[96px]" aria-hidden="true" />
    </>
  );
}
