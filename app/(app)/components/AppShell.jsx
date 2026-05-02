"use client";

import { usePathname } from "next/navigation";

export default function AppShell({ children }) {
  const pathname = usePathname();

  // ❌ Skip shell for invoice preview
  if (pathname.startsWith("/invoice/preview")) {
    return children;
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      {/* 🔝 DESKTOP TOP BAR */}
      <div className="hidden md:flex justify-between items-center px-10 py-4 border-b border-white/10">

        <div className="text-[#d4af37] font-serif text-lg">
          Cole Ley
        </div>

        <div className="flex gap-6 text-sm">
          <a href="/dashboard">Dashboard</a>
        
        </div>

      </div>

      {/* 📄 MAIN CONTENT */}
      <div className="flex-1 px-4 md:px-10 py-6 pb-20 md:pb-6">
        {children}
      </div>

      {/* 📱 MOBILE BOTTOM BAR */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-black border-t border-white/10 flex justify-around py-3 text-xs">

        <a href="/dashboard">Dashboard</a>
       

      </div>

    </div>
  );
}