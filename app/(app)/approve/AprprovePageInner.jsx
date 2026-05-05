"use client";

import { useSearchParams } from "next/navigation";

export default function ApprovePageInner() {
  const params = useSearchParams();

  const id = params.get("id");

  return (
    <div className="text-white p-10">
      Approve Page ID: {id}
    </div>
  );
}