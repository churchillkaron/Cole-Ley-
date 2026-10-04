"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import PublicNav from "../../components/PublicNav";
import PublicFooter from "../../components/PublicFooter";
import PublicBreadcrumbs from "../../components/PublicBreadcrumbs";

export default function BookingPage() {
const [form, setForm] = useState({
name: "",
email: "",
phone: "",
eventDate: "",
eventStartTime: "",
eventEndTime: "",
location: "",
bookingPath: "recommend",
eventType: "",
performanceFormat: "",
requestedArtistName: "",
details: "",
});

const [loading, setLoading] = useState(false);
const [availability, setAvailability] = useState(null);

useEffect(() => {
  if (!form.eventDate) {
    setAvailability(null);
    return;
  }

  let cancelled = false;
  fetch("/api/live-dates")
    .then((response) => response.json())
    .then((payload) => {
      if (cancelled) return;
      const row = Array.isArray(payload?.availability)
        ? payload.availability.find((item) => item?.date === form.eventDate)
        : null;
      setAvailability(row?.state || "open");
    })
    .catch(() => { if (!cancelled) setAvailability(null); });

  return () => { cancelled = true; };
}, [form.eventDate]);

function update(field, value) {
setForm({ ...form, [field]: value });
}

async function submitForm() {
if (!form.name || !form.email || !form.eventDate) {
alert("Please complete required fields");
return;
}

try {
  setLoading(true);

  const res = await fetch("/api/booking", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.error || "Failed");
    return;
  }

  alert("Request sent successfully");

  setForm({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    eventStartTime: "",
    eventEndTime: "",
    location: "",
    bookingPath: "recommend",
    eventType: "",
    performanceFormat: "",
    requestedArtistName: "",
    details: "",
  });

} catch (err) {
  console.error(err);
  alert("Error sending request");
} finally {
  setLoading(false);
}

}

return (
 <>
  <PublicNav />
  <PublicBreadcrumbs items={[{ label: 'Contact & Booking', href: '/booking' }]} />
  <div className="min-h-screen bg-black text-white relative px-6 md:px-10 py-24 md:py-32">

  {/* GRID LAYOUT */}
  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">

    {/* LEFT SIDE (branding) */}
    <div>
      <p className="tracking-[6px] text-[#d4af37] text-xs mb-6">
        COLE LEY
      </p>

      <h1 className="text-4xl font-serif mb-4">
        Booking Request
      </h1>

      <p className="text-white/50 max-w-sm leading-7">
        Request availability for live music in Phuket, Thailand or a destination event. Share
        your date, location and event details and we will get back to you.
      </p>

      <div className="mt-8 flex flex-col gap-3 text-sm text-white/60">
        <Link href="/live-dates" className="hover:text-[#d4af37] transition">
          See upcoming public Cole Ley live dates →
        </Link>
        <Link href="/wedding-singer-phuket" className="hover:text-[#d4af37] transition">
          Planning a Phuket wedding? Explore wedding music →
        </Link>
        <Link href="/hotels-beach-clubs-phuket" className="hover:text-[#d4af37] transition">
          Booking for a hotel or beach club? View venue options →
        </Link>
        <Link href="/music" className="hover:text-[#d4af37] transition">
          Watch Cole Ley live performances →
        </Link>
      </div>
    </div>

   {/* RIGHT SIDE (form) */}

<div className="space-y-6">

<input
className="w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-[#d4af37]"
placeholder="Name *"
value={form.name || ""}
onChange={(e) => update("name", e.target.value)}
/>

<input
className="w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-[#d4af37]"
placeholder="Email *"
value={form.email || ""}
onChange={(e) => update("email", e.target.value)}
/>

<input
className="w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-[#d4af37]"
placeholder="Phone"
value={form.phone || ""}
onChange={(e) => update("phone", e.target.value)}
/>

<input
type="date"
className="w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-[#d4af37]"
value={form.eventDate || ""}
onChange={(e) => update("eventDate", e.target.value)}
/>

<div className="grid grid-cols-2 gap-5">
  <label className="block">
    <span className="text-[10px] tracking-[0.16em] text-white/40">PREFERRED START</span>
    <input
      type="time"
      className="w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-[#d4af37]"
      value={form.eventStartTime || ""}
      onChange={(e) => update("eventStartTime", e.target.value)}
    />
  </label>
  <label className="block">
    <span className="text-[10px] tracking-[0.16em] text-white/40">PREFERRED END</span>
    <input
      type="time"
      className="w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-[#d4af37]"
      value={form.eventEndTime || ""}
      onChange={(e) => update("eventEndTime", e.target.value)}
    />
  </label>
</div>
{availability ? (
  <p className={`text-xs ${availability === "unavailable" ? "text-amber-300" : availability === "limited" ? "text-[#d4af37]" : "text-emerald-300"}`}>
    {availability === "unavailable"
      ? "That date already has a confirmed booking. You can still send the request for timing or routing review."
      : availability === "limited"
        ? "That date currently has a hold or active booking discussion. Send the request and we will check the exact timing."
        : "No current Avantiqo booking conflict is blocking this date."}
  </p>
) : null}

<input
className="w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-[#d4af37]"
placeholder="Event Location"
value={form.location || ""}
onChange={(e) => update("location", e.target.value)}
/>

<div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
  <p className="text-[10px] tracking-[0.18em] text-[#d4af37] mb-3">WHO SHOULD WE BOOK?</p>
  <div className="grid md:grid-cols-3 gap-3">
    {[
      ["cole_ley", "Book Cole Ley", "You specifically want Cole."],
      ["agency", "Use the Agency", "You want us to source the right artist or lineup."],
      ["recommend", "Recommend the Best", "You want us to decide which path fits best."],
    ].map(([value, title, description]) => (
      <button
        key={value}
        type="button"
        onClick={() => update("bookingPath", value)}
        className={form.bookingPath === value
          ? "rounded-xl border border-[#d4af37]/70 bg-[#d4af37]/[0.06] p-4 text-left transition"
          : "rounded-xl border border-white/10 p-4 text-left transition hover:border-white/25"}
      >
        <span className="block text-sm text-white">{title}</span>
        <span className="mt-1 block text-xs leading-5 text-white/45">{description}</span>
      </button>
    ))}
  </div>
</div>

{form.bookingPath !== "cole_ley" ? (
  <input
    className="w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-[#d4af37]"
    placeholder="Preferred artist name, if any"
    value={form.requestedArtistName || ""}
    onChange={(e) => update("requestedArtistName", e.target.value)}
  />
) : null}

<select
className="w-full bg-black border-b border-white/20 py-3 outline-none focus:border-[#d4af37] text-white/75"
value={form.eventType || ""}
onChange={(e) => update("eventType", e.target.value)}
>
  <option value="">Event Type</option>
  <option>Wedding</option>
  <option>Hotel / Resort</option>
  <option>Beach Club</option>
  <option>Restaurant / Lounge</option>
  <option>Corporate Event</option>
  <option>Private Party</option>
  <option>Proposal / Anniversary / Serenade</option>
  <option>Destination Event</option>
  <option>Other</option>
</select>

<select
className="w-full bg-black border-b border-white/20 py-3 outline-none focus:border-[#d4af37] text-white/75"
value={form.performanceFormat || ""}
onChange={(e) => update("performanceFormat", e.target.value)}
>
  <option value="">Preferred Performance Format</option>
  <option>Solo Vocal</option>
  <option>Solo Acoustic</option>
  <option>Serenade</option>
  <option>Singer + DJ</option>
  <option>Duo</option>
  <option>Trio</option>
  <option>Full Band</option>
  <option>Not Sure — Recommend the Best Format</option>
</select>

  <textarea
    rows={4}
    className="w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-[#d4af37]"
    placeholder="Event Details, atmosphere, timing, guest size or special song requests"
    value={form.details || ""}
    onChange={(e) => update("details", e.target.value)}
  />

  <div className="pt-6">
    <button
      type="button"
      onClick={submitForm}
      disabled={loading}
      className="px-10 py-3 border border-[#d4af37] text-[#d4af37] tracking-[3px] text-sm hover:bg-[#d4af37] hover:text-black transition"
    >
      {loading ? "SENDING..." : "SUBMIT REQUEST"}
    </button>
  </div>

</div>

    </div>

    <section className="md:col-span-2 mt-6 border-t border-white/10 pt-10">
      <p className="text-[#d4af37] tracking-[0.24em] text-xs mb-4">WHAT CAN YOU BOOK?</p>
      <p className="text-white/55 leading-7 max-w-4xl">
        There are two booking paths. Cole Ley can perform as a solo vocalist, solo acoustic singer, singer with DJ, duo, trio or full live band. Through Cole Ley Co., Ltd., the Artist Agency can also source other singers, DJs, bands and specialist musicians when Cole herself is not the right fit or when the event needs a larger multi-artist lineup. If you are unsure, send the event brief and the agency workflow can recommend the best artist or combination.
      </p>
      <div className="grid md:grid-cols-2 gap-4 mt-7">
        <Link href="/wedding-singer-phuket" className="rounded-2xl border border-white/10 p-5 hover:border-[#d4af37]/40 transition"><p className="text-[#d4af37] text-xs tracking-[0.15em]">ARTIST PATH</p><p className="text-white mt-2">Book Cole Ley directly</p></Link>
        <Link href="/entertainment-agency-phuket" className="rounded-2xl border border-white/10 p-5 hover:border-[#d4af37]/40 transition"><p className="text-[#d4af37] text-xs tracking-[0.15em]">AGENCY PATH</p><p className="text-white mt-2">Build an entertainment lineup</p></Link>
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-3 mt-6 text-sm">
        <Link href="/performance-formats" className="text-white/65 hover:text-[#d4af37] transition">Compare performance formats →</Link>
        <Link href="/jazz-singer-phuket" className="text-white/65 hover:text-[#d4af37] transition">Jazz, soul & blues →</Link>
        <Link href="/acoustic-singer-phuket" className="text-white/65 hover:text-[#d4af37] transition">Solo acoustic →</Link>
        <Link href="/live-band-phuket" className="text-white/65 hover:text-[#d4af37] transition">Trio & full band →</Link>
      </div>
    </section>

  </div>
  <PublicFooter />
 </>
);
}
