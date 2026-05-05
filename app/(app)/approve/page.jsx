"use client";

import { Suspense } from "react";
import ApprovePageInner from "./ApprovePageInner";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-white p-10">Loading...</div>}>
      <ApprovePageInner />
    </Suspense>
  );
}