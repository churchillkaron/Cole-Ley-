"use client";export const dynamic = "force-dynamic";


import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function InvoiceListPage() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  /* 🔒 PROTECT PAGE (OWNER ONLY) */
  useEffect(() => {
  async function checkUser() {
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      router.push("/");
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    const role = profile?.role?.trim().toLowerCase();

    if (role !== "owner") {
      router.push("/media");
    }
  }

  checkUser();
}, []);

  useEffect(() => {
    async function fetchInvoices() {
      try {
        const res = await fetch("/api/invoice/list");
        const data = await res.json();

        if (!res.ok) {
          console.error(data);
          return;
        }

        setInvoices(data.invoices || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchInvoices();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading invoices...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-2xl mb-8">Invoices</h1>

      {invoices.length === 0 ? (
        <p>No invoices found</p>
      ) : (
        <div className="space-y-4">
          {invoices.map((inv) => (
            <div
              key={inv.invoice_number}
              onClick={() =>
                router.push(
                  `/invoice/preview?id=${inv.invoice_number}&autoPdf=true`
                )
              }
              className="p-5 bg-[#111] rounded cursor-pointer hover:bg-[#1a1a1a] transition"
            >
              <div className="flex justify-between items-center">
                {/* LEFT */}
                <div>
                  <div className="text-[#d4af37] text-sm">
                    {inv.invoice_number}
                  </div>

                  <div className="text-white text-lg font-medium">
                    {inv.client}
                  </div>

                  <div className="text-white/40 text-xs">
                    {inv.date}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(
                        `/invoice/edit?id=${inv.invoice_number}`
                      );
                    }}
                    className="text-blue-400 text-xs mt-2 hover:underline"
                  >
                    Edit
                  </button>
                </div>

                {/* RIGHT */}
                <div className="text-right">
                  <div className="text-white text-lg font-semibold">
                    {Number(inv.amount).toFixed(2)} THB
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}