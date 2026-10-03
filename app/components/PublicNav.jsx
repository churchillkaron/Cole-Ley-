"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const AVANTIQO_LOGIN_URL = "https://avantiqo.ai/login?brand=coleley";

const links = [
  ["/", "HOME"],
  ["/music", "GALLERY"],
  ["/live-music-phuket", "LIVE MUSIC"],
  ["/wedding-singer-phuket", "WEDDINGS"],
  ["/about-cole-ley", "ABOUT"],
  ["/booking", "CONTACT"],
];

export default function PublicNav() {
  const pathname = usePathname();

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-[#2b211b]/78 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto h-[84px] md:h-[96px] px-4 md:px-8 flex items-center justify-between">
          <Link href="/" aria-label="Cole Ley home">
            <img src="/logo-cole.png" alt="Cole Ley" className="w-[120px] md:w-[210px] object-contain" />
          </Link>

          <div className="hidden md:flex items-center gap-8 text-[12px] tracking-[0.25em] text-white/70">
            {links.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className={pathname === href ? "text-[#d4af37]" : "hover:text-white transition"}
              >
                {label}
              </Link>
            ))}
            <a href={AVANTIQO_LOGIN_URL} className="border border-[#d4af37]/50 text-[#d4af37] px-4 py-2 rounded-full">
              LOGIN
            </a>
          </div>

          <div className="md:hidden flex items-center gap-3">
            <Link href="/music" className="text-[10px] tracking-[0.18em] text-white/75">GALLERY</Link>
            <Link href="/booking" className="text-[10px] tracking-[0.18em] text-[#d4af37]">CONTACT</Link>
          </div>
        </div>
      </nav>
      <div className="h-[84px] md:h-[96px]" aria-hidden="true" />
    </>
  );
}