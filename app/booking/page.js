"use client";
export const dynamic = "force-dynamic";



import { useState } from "react";

export default function BookingPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !email) {
      alert("Missing required fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/bookings/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          date,
          details,
        }),
      });

      if (!res.ok) {
        alert("Failed to send request");
        return;
      }

      // reset
      setName("");
      setEmail("");
      setDate("");
      setDetails("");

      alert("Request sent");

    } catch (err) {
      console.error(err);
      alert("Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">

      <div className="w-full max-w-xl bg-white/[0.03] border border-[#caa85a]/20 p-10 backdrop-blur-xl">

        {/* TITLE */}
        <h1 className="text-3xl mb-2 font-serif tracking-wide text-[#e5c06b]">
          Book Cole Ley
        </h1>

        <div className="w-12 h-[2px] bg-[#caa85a] mb-8" />

        {/* FORM */}
        <div className="space-y-6">

          <input
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-transparent border-b border-white/20 py-3 outline-none placeholder-white/40 focus:border-[#caa85a] transition"
          />

          <input
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border-b border-white/20 py-3 outline-none placeholder-white/40 focus:border-[#caa85a] transition"
          />

          <input
            placeholder="Event Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-transparent border-b border-white/20 py-3 outline-none placeholder-white/40 focus:border-[#caa85a] transition"
          />

          <textarea
            placeholder="Event Details"
            rows={4}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="w-full bg-transparent border-b border-white/20 py-3 outline-none placeholder-white/40 focus:border-[#caa85a] transition resize-none"
          />

          {/* BUTTON */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full mt-6 py-4 text-sm tracking-[3px] uppercase
              bg-gradient-to-r from-[#e5c06b] to-[#a87b2c]
              text-black
              hover:opacity-90
              transition
            "
          >
            {loading ? "Sending..." : "Send Request"}
          </button>

        </div>

      </div>

    </div>
  );
}