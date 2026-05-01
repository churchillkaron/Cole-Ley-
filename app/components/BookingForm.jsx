"use client"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-3xl mb-10 font-light">
        Artist Control Panel
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <a href="/dashboard/media" className="glass p-8 hover:scale-[1.02] transition">
          <h2 className="text-xl mb-2">Media</h2>
          <p className="text-white/50 text-sm">Upload videos & images</p>
        </a>

        <a href="/dashboard/invoices" className="glass p-8 hover:scale-[1.02] transition">
          <h2 className="text-xl mb-2">Invoices</h2>
          <p className="text-white/50 text-sm">Create and manage invoices</p>
        </a>

        <a href="/booking" className="glass p-8 hover:scale-[1.02] transition">
          <h2 className="text-xl mb-2">Bookings</h2>
          <p className="text-white/50 text-sm">View client requests</p>
        </a>

      </div>

    </div>
  )
}