"use client";

import { useState } from "react";

export default function BookingPage() {
const [form, setForm] = useState({
name: "",
email: "",
phone: "",
eventDate: "",
location: "",
details: "",
});

const [loading, setLoading] = useState(false);

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
    location: "",
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

 <div className="min-h-screen bg-black text-white relative px-10 py-20">

  {/* LOGO */}
  <div className="absolute top-6 left-6">
    <img src="/logo-cole.png" className="w-[480px]" />
  </div>

  {/* GRID LAYOUT */}
  <div className="max-w-6xl mx-auto grid grid-cols-2 gap-20 items-center">

    {/* LEFT SIDE (branding) */}
    <div>
      <p className="tracking-[6px] text-[#d4af37] text-xs mb-6">
        COLE LEY
      </p>

      <h1 className="text-4xl font-serif mb-4">
        Booking Request
      </h1>

      <p className="text-white/50 max-w-sm">
        Submit your event details and we will get back to you
      </p>
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

<input
className="w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-[#d4af37]"
placeholder="Event Location"
value={form.location || ""}
onChange={(e) => update("location", e.target.value)}
/>

  <textarea
    rows={4}
    className="w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-[#d4af37]"
    placeholder="Event Details"
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

  </div>

);
}
