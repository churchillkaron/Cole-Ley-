"use client";
export const dynamic = "force-dynamic";

import { Suspense } from "react";
import InvoiceListInner from "./InvoiceListInner";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <InvoiceListInner />
    </Suspense>
  );
}
