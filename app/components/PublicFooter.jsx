import Image from "next/image";
import Link from "next/link";

export default function PublicFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#070707] px-6 md:px-16 py-14 text-white">
      <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-[1.35fr_1fr_1fr]">
        <div>
          <Image
            src="/logo-cole.png"
            alt="Cole Ley Co., Ltd."
            width={190}
            height={130}
            sizes="190px"
            className="w-[190px] h-auto object-contain mb-6"
          />
          <p className="max-w-md text-sm leading-7 text-white/55">
            Cole Ley is a Phuket-based singer, musician and live performer for weddings,
            hotels, beach clubs, restaurants, corporate events and private celebrations.
          </p>
          <p className="mt-5 text-xs tracking-[0.22em] text-[#d4af37]">
            PHUKET · THAILAND · DESTINATION EVENTS
          </p>
        </div>

        <div>
          <p className="text-xs tracking-[0.25em] text-[#d4af37] mb-5">EXPLORE</p>
          <div className="flex flex-col gap-3 text-sm text-white/65">
            <Link href="/music" className="hover:text-white transition">Gallery</Link>
            <Link href="/live-music-phuket" className="hover:text-white transition">Live Music Phuket</Link>
            <Link href="/wedding-singer-phuket" className="hover:text-white transition">Weddings</Link>
            <Link href="/hotels-beach-clubs-phuket" className="hover:text-white transition">Hotels & Beach Clubs</Link>
            <Link href="/about-cole-ley" className="hover:text-white transition">About Cole Ley</Link>
          </div>
        </div>

        <div>
          <p className="text-xs tracking-[0.25em] text-[#d4af37] mb-5">BOOKING & CONTACT</p>
          <div className="flex flex-col gap-3 text-sm text-white/65">
            <Link href="/booking" className="hover:text-white transition">Request Availability</Link>
            <a href="mailto:cole@coleley.com" className="hover:text-white transition">cole@coleley.com</a>
            <a href="tel:+66944271265" className="hover:text-white transition">+66 94 427 1265</a>
            <a
              href="https://www.instagram.com/iamcoleley/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition"
            >
              Instagram · @iamcoleley
            </a>

          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row gap-3 md:items-center md:justify-between text-xs text-white/35">
        <p>© 2026 Cole Ley Co., Ltd. All rights reserved.</p>
        <p>Official website · www.coleley.com</p>
      </div>
    </footer>
  );
}
