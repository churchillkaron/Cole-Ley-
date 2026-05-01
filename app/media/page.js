"use client"

export default function MediaPage() {
  return (
    <div
      className="min-h-screen text-white px-6 py-16 relative"
      style={{
        backgroundImage: "url('/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

      {/* overlay */}
      <div className="absolute inset-0 bg-black/85" />

      <div className="relative max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-serif tracking-wide text-[#e5c06b]">
            Media
          </h1>

          <div className="w-16 h-[2px] bg-[#caa85a] mx-auto mt-6 mb-6" />

          <p className="text-white/60 max-w-xl mx-auto">
            A curated selection of performances, moments and atmosphere.
          </p>
        </div>

        {/* FEATURE VIDEO */}
        <div className="mb-20">
          <div className="aspect-video w-full bg-black/40 border border-[#caa85a]/20 backdrop-blur-xl flex items-center justify-center">
            <span className="text-white/40 tracking-[3px] text-sm">
              FEATURE VIDEO
            </span>
          </div>
        </div>

        {/* IMAGE GRID */}
        <div className="grid grid-cols-3 gap-6">

          {/* ITEM */}
          <div className="group relative overflow-hidden border border-[#caa85a]/10">
            <img
              src="/bg.png"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-end p-4">
              <p className="text-sm text-[#caa85a] tracking-[2px]">
                LIVE PERFORMANCE
              </p>
            </div>
          </div>

          <div className="group relative overflow-hidden border border-[#caa85a]/10">
            <img
              src="/bg.png"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-end p-4">
              <p className="text-sm text-[#caa85a] tracking-[2px]">
                BEACH CLUB
              </p>
            </div>
          </div>

          <div className="group relative overflow-hidden border border-[#caa85a]/10">
            <img
              src="/bg.png"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-end p-4">
              <p className="text-sm text-[#caa85a] tracking-[2px]">
                PRIVATE EVENT
              </p>
            </div>
          </div>

          <div className="group relative overflow-hidden border border-[#caa85a]/10">
            <img
              src="/bg.png"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-end p-4">
              <p className="text-sm text-[#caa85a] tracking-[2px]">
                NIGHT SHOW
              </p>
            </div>
          </div>

          <div className="group relative overflow-hidden border border-[#caa85a]/10">
            <img
              src="/bg.png"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-end p-4">
              <p className="text-sm text-[#caa85a] tracking-[2px]">
                LOUNGE
              </p>
            </div>
          </div>

          <div className="group relative overflow-hidden border border-[#caa85a]/10">
            <img
              src="/bg.png"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-end p-4">
              <p className="text-sm text-[#caa85a] tracking-[2px]">
                STAGE
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}