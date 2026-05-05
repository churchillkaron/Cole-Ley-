"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ApprovePage() {
  const params = useSearchParams();
  const token = params.get("token");

  const [status, setStatus] = useState("idle");

  async function approve() {
    setStatus("loading");

    const res = await fetch("/api/quotation/approve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    if (res.ok) {
      setStatus("approved");
    } else {
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      {status === "idle" && (
        <button
          onClick={approve}
          className="px-6 py-3 bg-[#d4af37] text-black rounded-xl"
        >
          APPROVE QUOTATION
        </button>
      )}

      {status === "loading" && <p>Processing...</p>}
      {status === "approved" && <p>✅ Approved. Invoice created.</p>}
      {status === "error" && <p>❌ Error</p>}
    </div>
  );
}