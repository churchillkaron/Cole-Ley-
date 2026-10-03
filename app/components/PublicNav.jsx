"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const AVANTIQO_LOGIN_URL = "https://avantiqo.ai/login?brand=coleley";

const mainLinks = [
  ["/", "HOME"],
  ["/music", "GALLERY"],
  ["/live-dates", "DATES"],
  ["/performance-formats", "FORMATS"],
  ["/about-cole-ley", "ABOUT"],
  ["/press", "PRESS"],
  ["/booking", "CONTACT"],
];

const serviceLinks = [
  ["/live-music-phuket", "LIVE MUSIC PHUKET"],
  ["/wedding-singer-phuket", "WEDDINGS"],
  ["/jazz-singer-phuket", "JAZZ"],
  ["/acoustic-singer-phuket", "ACOUSTIC"],
  ["/live-band-phuket", "LIVE BAND"],
  ["/hotels-beach-clubs-phuket", "HOTELS & BEACH CLUBS"],
  ["/corporate-event-live-music-phuket", "CORPORATE"],
  ["/private-party-live-music-phuket", "PRIVATE PARTIES"],
];

function NavLink({ href, label, pathname, compact = false, onClick }) {
  const active = pathname === href;
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${compact ? "text-[9px] tracking-[0.14em]" : "text-[10px] tracking-[0.18em]"} whitespace-nowrap transition ${active ? "text-[#d4af37]" : "text-white/65 hover:text-white"}`}
    >
      {label}
    </Link>
  );
}

export default function PublicNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-black/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto">
          <div className="h-[84px] md:h-[82px] px-4 md:px-8 flex items-center justify-between">
            <Link href="/" aria-label="Cole Ley home">
              <Image
                src="/logo-cole.png"
                alt="Cole Ley"
                width={210}
                height={144}
                sizes="(max-width: 768px) 120px, 190px"
                className="w-[120px] md:w-[190px] h-auto object-contain"
                priority
              />
            </Link>

            <div className="hidden md:flex items-center gap-5">
              {mainLinks.map(([href, label]) => (
                <NavLink key={href} href={href} label={label} pathname={pathname} />
              ))}
              <a
                href={AVANTIQO_LOGIN_URL}
                className="rounded-full border border-[#d4af37]/50 px-4 py-2 text-[10px] tracking-[0.18em] text-[#d4af37]"
              >
                LOGIN
              </a>
            </div>

            <div className="md:hidden flex items-center gap-4">
              <Link href="/live-dates" className="text-[10px] tracking-[0.18em] text-white/75">DATES</Link>
              <button
                type="button"
                onClick={() => setMobileOpen((open) => !open)}
                className="text-[10px] tracking-[0.18em] text-[#d4af37]"
                aria-expanded={mobileOpen}
                aria-controls="cole-mobile-nav"
              >
                MENU
              </button>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-center gap-6 border-t border-white/[0.06] px-8 py-3">
            {serviceLinks.map(([href, label]) => (
              <NavLink key={href} href={href} label={label} pathname={pathname} compact />
            ))}
          </div>
        </div>

        {mobileOpen ? (
          <div id="cole-mobile-nav" className="md:hidden max-h-[calc(100vh-84px)] overflow-y-auto border-t border-white/10 bg-black/98 px-5 py-5">
            <div className="grid grid-cols-2 gap-2">
              {[...mainLinks, ...serviceLinks].map(([href, label]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-lg border border-white/[0.06] px-3 py-3 text-[10px] tracking-[0.06em] ${pathname === href ? "bg-white/[0.06] text-[#d4af37]" : "text-white/70"}`}
                >
                  {label}
                </Link>
              ))}
            </div>
            <a
              href={AVANTIQO_LOGIN_URL}
              className="mt-4 block rounded-full border border-[#d4af37]/50 px-4 py-3 text-center text-[10px] tracking-[0.18em] text-[#d4af37]"
            >
              LOGIN
            </a>
          </div>
        ) : null}
      </nav>

      <div className="h-[84px] md:h-[123px]" aria-hidden="true" />
    </>
  );
}
