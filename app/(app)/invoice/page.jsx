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
  const [clients, setClients] = useState([]);
const [selectedClientId, setSelectedClientId] = useState(null);

  const [taxEnabled, setTaxEnabled] = useState(false);
  const [taxRate, setTaxRate] = useState(7);

  const [items, setItems] = useState([
  { description: "", qty: "", price: "" }
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
useEffect(() => {
  async function fetchClients() {
    const supabase = getSupabase();

    const { data } = await supabase
      .from("clients")
      .select("*")
      .order("name");

    setClients(data || []);
  }

  fetchClients();
}, []);

  function updateItem(index, field, value) {
    const updated = [...items];
    updated[index][field] = field === "description" ? value : Number(value);
    setItems(updated);
  }

  function addItem() {
   setItems([...items, { description: "", qty: "", price: "" }]);
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
    const supabase = getSupabase();

if (!selectedClientId && client) {
  await supabase.from("clients").insert({
    name: client,
    address: clientAddress,
    tax_id: clientTaxId,
  });
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
  <div className="min-h-screen bg-black text-white px-4 py-6 flex justify-center">
    <div className="w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-2xl p-5 sm:p-8 space-y-5">

      {/* TITLE */}
      <h1 className="text-xl sm:text-2xl text-[#d4af37] tracking-wide font-light">
        Create Invoice
      </h1>

      {/* CLIENT SELECT */}
      <select
        className="w-full p-3 bg-black border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#d4af37]"
        onChange={(e) => {
          const id = e.target.value;
          setSelectedClientId(id);

          const client = clients.find(c => c.id === id);
          if (!client) return;

          setClient(client.brand || client.name);
          setClientAddress(client.address || "");
          setClientTaxId(client.tax_id || "");
        }}
      >
        <option value="">Select Client</option>
        {clients.map(c => (
          <option key={c.id} value={c.id}>
            {c.brand || c.name}
          </option>
        ))}
      </select>

      {/* CLIENT NAME */}
      <input
        className="w-full p-3 bg-black border border-white/20 rounded-lg focus:outline-none focus:border-[#d4af37]"
        value={client}
        onChange={(e) => setClient(e.target.value)}
        placeholder="Client Name"
      />

      {/* ADDRESS */}
      <textarea
        className="w-full p-3 bg-black border border-white/20 rounded-lg focus:outline-none focus:border-[#d4af37]"
        value={clientAddress}
        onChange={(e) => setClientAddress(e.target.value)}
        placeholder="Client Address"
      />

      {/* TAX */}
      <input
        className="w-full p-3 bg-black border border-white/20 rounded-lg focus:outline-none focus:border-[#d4af37]"
        value={clientTaxId}
        onChange={(e) => setClientTaxId(e.target.value)}
        placeholder="Client Tax ID"
      />

      {/* DATE */}
      <input
        type="date"
        className="w-full p-3 bg-black border border-white/20 rounded-lg focus:outline-none focus:border-[#d4af37]"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      {/* ITEMS */}
      <div className="space-y-4 border-t border-white/10 pt-4">
        {items.map((item, i) => (
          <div key={i} className="flex flex-col gap-2 sm:flex-row sm:items-center">

            {/* DESCRIPTION */}
            <input
              className="flex-1 p-3 bg-black border border-white/20 rounded-lg focus:outline-none focus:border-[#d4af37]"
              placeholder="Description"
              value={item.description}
              onChange={(e) =>
                updateItem(i, "description", e.target.value)
              }
            />

            {/* QTY + PRICE */}
            <div className="flex gap-2 w-full sm:w-auto">
              <input
                type="number"
                placeholder="Qty"
                className="w-1/2 sm:w-20 p-3 bg-black border border-white/20 rounded-lg focus:outline-none focus:border-[#d4af37]"
                value={item.qty}
                onChange={(e) =>
                  updateItem(i, "qty", e.target.value)
                }
              />

              <input
                type="number"
                placeholder="Price"
                className="w-1/2 sm:w-28 p-3 bg-black border border-white/20 rounded-lg focus:outline-none focus:border-[#d4af37]"
                value={item.price}
                onChange={(e) =>
                  updateItem(i, "price", e.target.value)
                }
              />
            </div>

            {/* REMOVE */}
            <button
              onClick={() => removeItem(i)}
              className="text-red-400 hover:text-red-300 text-sm"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* ADD ITEM */}
      <button
        onClick={addItem}
        className="text-[#d4af37] text-sm hover:opacity-80"
      >
        + Add Item
      </button>

      {/* TAX */}
      <div className="flex items-center gap-3 pt-2">
        <input
          type="checkbox"
          checked={taxEnabled}
          onChange={() => setTaxEnabled(!taxEnabled)}
        />
        <span className="text-white/80">Apply VAT</span>
      </div>

      {taxEnabled && (
        <input
          type="number"
          placeholder="Tax %"
          value={taxRate}
          onChange={(e) => setTaxRate(Number(e.target.value))}
          className="w-full p-3 bg-black border border-white/20 rounded-lg focus:outline-none focus:border-[#d4af37]"
        />
      )}

      {/* TOTAL */}
      <div className="text-right text-lg border-t border-white/10 pt-4">
        <span className="text-white/60">Subtotal:</span>{" "}
        <span className="text-white">{subtotal.toFixed(2)} THB</span>
      </div>

      {/* BUTTON */}
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="w-full py-3 rounded-lg bg-[#d4af37] text-black font-medium hover:opacity-90 transition"
      >
        {loading ? "Creating..." : "Generate Invoice"}
      </button>

    </div>
  </div>
);
}