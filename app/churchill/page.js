"use client";

import { motion } from "framer-motion";

export default function Page() {
  return (
    <main className="bg-black text-white min-h-screen">

      <section className="relative h-screen flex items-center justify-center overflow-hidden">

        {/* BACKGROUND */}
        <img
          src="/images/shuffleboard.jpg"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/80" />

        {/* CONTENT */}
        <div className="relative z-10 flex flex-col items-center text-center px-6">

          {/* LOGO ANIMATION */}
          <motion.img
            src="/images/logo.png"
            alt="Churchill"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-[450px] max-w-[80%] drop-shadow-[0_0_40px_rgba(255,140,0,0.35)]"
          />

          {/* TEXT ANIMATION */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-8 text-4xl md:text-6xl font-serif tracking-wide"
          >
            EAT. DRINK. STAY.
          </motion.h1>

          {/* SUBTEXT (LIVE BAND INCLUDED) */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-4 text-gray-300 text-lg max-w-xl"
          >
            Fine dining. Crafted cocktails. Live music.  
            Where nights become something more.
          </motion.p>

          {/* CTA */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 1 }}
            className="mt-8 border border-amber-400 px-8 py-3 hover:bg-amber-400 hover:text-black transition"
          >
            RESERVE A TABLE
          </motion.button>

        </div>

      </section>

    </main>
  );
}npm run devicePixelRatio