export default function AppShell({ children }) {
  return (
    <div className="min-h-screen bg-black text-white flex">
      
      {/* SIDEBAR */}
      <div className="w-64 border-r border-white/10 p-6 space-y-6">
        <h1 className="text-xl font-semibold tracking-wide">
          COLE LEY
        </h1>

        <nav className="space-y-4 text-sm">
          <a href="/dashboard" className="block hover:text-white/70">Dashboard</a>
          <a href="/dashboard/media" className="block hover:text-white/70">Media</a>
          <a href="/invoice" className="block hover:text-white/70">Invoice</a>
          <a href="/dashboard/booking" className="block hover:text-white/70">Bookings</a>
        </nav>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-10">
        {children}
      </div>

    </div>
  )
}