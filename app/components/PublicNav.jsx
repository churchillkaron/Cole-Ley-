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
];

const formatLinks = [
  ["/jazz-singer-phuket", "Jazz"],
  ["/acoustic-singer-phuket", "Acoustic"],
  ["/live-band-phuket", "Live Band"],
  ["/live-music-phuket", "Live Music Phuket"],
];

const eventLinks = [
  ["/wedding-singer-phuket", "Book Cole for a Wedding"],
  ["/wedding-entertainment-phuket", "Wedding Entertainment Agency"],
  ["/entertainment-agency-phuket", "Entertainment Agency"],
  ["/hotels-beach-clubs-phuket", "Hotels & Beach Clubs"],
  ["/corporate-event-live-music-phuket", "Corporate Events"],
  ["/private-party-live-music-phuket", "Private Parties"],
];

const tailLinks = [
  ["/about-cole-ley", "ABOUT"],
  ["/press", "PRESS"],
  ["/booking", "CONTACT"],
];

function PlainLink({ href, label, pathname }) {
  return (
    <Link
      href={href}
      className={`whitespace-nowrap text-[10px] tracking-[0.18em] transition ${
        pathname === href ? "text-[#d4af37]" : "text-white/68 hover:text-white"
      }`}
    >
      {label}
    </Link>
  );
}

function Dropdown({ href, label, links, pathname }) {
  const active = pathname === href || links.some(([itemHref]) => itemHref === pathname);

  return (
    <div className="group relative flex h-full items-center">
      <Link
        href={href}
        className={`inline-flex items-center gap-1.5 whitespace-nowrap text-[10px] tracking-[0.18em] transition ${
          active ? "text-[#d4af37]" : "text-white/68 hover:text-white"
        }`}
      >
        {label}
        <span className="relative -top-px text-[9px] opacity-55">⌄</span>
      </Link>

      <div className="invisible absolute left-1/2 top-[64px] w-[210px] -translate-x-1/2 translate-y-1 rounded-xl border border-white/10 bg-[#090909]/98 p-2 opacity-0 shadow-[0_20px_70px_rgba(0,0,0,0.65)] backdrop-blur-xl transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
        {links.map(([itemHref, itemLabel]) => (
          <Link
            key={itemHref}
            href={itemHref}
            className={`block rounded-lg px-3 py-2.5 text-[10px] tracking-[0.07em] transition ${
              pathname === itemHref
                ? "bg-white/[0.06] text-[#d4af37]"
                : "text-white/62 hover:bg-white/[0.045] hover:text-white"
            }`}
          >
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
      <nav className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-black/92 backdrop-blur-xl">
        <div className="mx-auto flex h-[84px] max-w-7xl items-center justify-between px-4 md:h-[92px] md:px-8">
          <Link href="/" aria-label="Cole Ley home" className="shrink-0">
            <Image
              src="/logo-cole.png"
              alt="Cole Ley"
              width={210}
              height={144}
              sizes="(max-width: 768px) 120px, 180px"
              className="h-auto w-[120px] object-contain md:w-[180px]"
              priority
            />
          </Link>

          <div className="hidden h-full items-center gap-5 lg:flex">
            {mainLinks.map(([href, label]) => (
              <PlainLink key={href} href={href} label={label} pathname={pathname} />
            ))}

            <Dropdown href="/performance-formats" label="FORMATS" links={formatLinks} pathname={pathname} />
            <Dropdown href="/booking" label="EVENTS" links={eventLinks} pathname={pathname} />

            {tailLinks.map(([href, label]) => (
              <PlainLink key={href} href={href} label={label} pathname={pathname} />
            ))}

            <a
              href={AVANTIQO_LOGIN_URL}
              className="ml-1 rounded-full border border-[#d4af37]/50 px-4 py-2 text-[10px] tracking-[0.18em] text-[#d4af37] transition hover:border-[#d4af37] hover:bg-[#d4af37]/[0.05]"
            >
              LOGIN
            </a>
          </div>

          <div className="flex items-center gap-4 lg:hidden">
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

        {mobileOpen ? (
          <div id="cole-mobile-nav" className="max-h-[calc(100vh-84px)] overflow-y-auto border-t border-white/10 bg-black/98 px-5 py-5 lg:hidden">
            <div className="grid grid-cols-2 gap-2">
              {[
                ...mainLinks,
                ["/performance-formats", "FORMATS"],
                ...formatLinks,
                ...eventLinks,
                ...tailLinks,
              ].map(([href, label]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-lg border border-white/[0.06] px-3 py-3 text-[10px] tracking-[0.06em] ${
                    pathname === href ? "bg-white/[0.06] text-[#d4af37]" : "text-white/70"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
            <a href={AVANTIQO_LOGIN_URL} className="mt-4 block rounded-full border border-[#d4af37]/50 px-4 py-3 text-center text-[10px] tracking-[0.18em] text-[#d4af37]">LOGIN</a>
          </div>
        ) : null}
      </nav>

      <div className="h-[84px] md:h-[92px]" aria-hidden="true" />
    </>
  );
}
