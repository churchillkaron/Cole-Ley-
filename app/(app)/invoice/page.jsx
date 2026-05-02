"use client";
export const dynamic = "force-dynamic";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getSupabase } from "@/lib/supabase";

export default function InvoicePage() {
  const router = useRouter();

  const [client, setClient] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [clientTaxId, setClientTaxId] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [type, setType] = useState("invoice");

  const [taxEnabled, setTaxEnabled] = useState(false);
  const [taxRate, setTaxRate] = useState(7);

  const [items, setItems] = useState([
    { description: "", qty: 1, price: 0 }
  ]);

  const [loading, setLoading] = useState(false);

  /* 🔒 PROTECT PAGE (OWNER ONLY) */
  useEffect(() => {
  async function checkUser() {
  const supabase = getSupabase();
  if (!supabase) return;

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

  function updateItem(index, field, value) {
    const updated = [...items];
    updated[index][field] = field === "description" ? value : Number(value);
    setItems(updated);
  }

  function addItem() {
    setItems([...items, { description: "", qty: 1, price: 0 }]);
  }

  function removeItem(index) {
    if (items.length === 1) return;
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
  }

  const subtotal = items.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );

  async function handleGenerate() {
    if (!client || items.length === 0) {
      alert("Fill required fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/invoice/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client,
          client_address: clientAddress,
          client_tax_id: clientTaxId,
          date,
          type,
          items,
          amount: subtotal,
          tax_enabled: taxEnabled,
          tax_rate: taxEnabled ? taxRate : 0,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data?.invoice?.invoice_number) {
        alert(data?.error || "Create failed");
        return;
      }

      router.push(`/invoice/preview?id=${data.invoice.invoice_number}`);

    } catch (err) {
      console.error(err);
      alert("Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-2xl p-6 sm:p-10 space-y-4">

        <input
          className="w-full p-3 bg-gray-800 rounded"
          value={client}
          onChange={(e) => setClient(e.target.value)}
          placeholder="Client"
        />

        <textarea
          className="w-full p-3 bg-gray-800 rounded"
          value={clientAddress}
          onChange={(e) => setClientAddress(e.target.value)}
          placeholder="Client Address"
        />

        <input
          className="w-full p-3 bg-gray-800 rounded"
          value={clientTaxId}
          onChange={(e) => setClientTaxId(e.target.value)}
          placeholder="Client Tax ID"
        />

        <input
          type="date"
          className="w-full p-3 bg-gray-800 rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        {/* ITEMS */}
        <div className="space-y-3">
          {items.map((item, i) => (
            <div key={i} className="flex flex-col sm:flex-row gap-2">

              <input
                className="flex-1 p-2 bg-gray-800 rounded"
                placeholder="Description"
                value={item.description}
                onChange={(e) =>
                  updateItem(i, "description", e.target.value)
                }
              />

              <input
                type="number"
                className="w-full sm:w-20 p-2 bg-gray-800 rounded"
                value={item.qty}
                onChange={(e) =>
                  updateItem(i, "qty", e.target.value)
                }
              />

              <input
                type="number"
                className="w-full sm:w-28 p-2 bg-gray-800 rounded"
                value={item.price}
                onChange={(e) =>
                  updateItem(i, "price", e.target.value)
                }
              />

              <button onClick={() => removeItem(i)} className="sm:w-auto w-full">
                ✕
              </button>
            </div>
          ))}
        </div>

        <button onClick={addItem} className="text-sm text-[#d4af37]">
          + Add Item
        </button>

        {/* TAX */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={taxEnabled}
            onChange={() => setTaxEnabled(!taxEnabled)}
          />
          <span>Apply VAT</span>
        </div>

        {taxEnabled && (
          <input
            type="number"
            value={taxRate}
            onChange={(e) => setTaxRate(Number(e.target.value))}
            className="w-full p-3 bg-gray-800 rounded"
            placeholder="Tax %"
          />
        )}

        <div className="text-right text-lg">
          Subtotal: {subtotal.toFixed(2)} THB
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full p-3 bg-white text-black rounded"
        >
          {loading ? "Creating..." : "Generate Invoice"}
        </button>

      </div>
    </div>
  );
}