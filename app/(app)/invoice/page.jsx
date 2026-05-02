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

      if (profile?.role?.trim().toLowerCase() !== "owner") {
        router.push("/media");
      }
    }

    checkUser();
  }, [router]);

  useEffect(() => {
    async function fetchClients() {
      const supabase = getSupabase();
      if (!supabase) return;

      const { data } = await supabase
        .from("clients")
        .select("*")
        .order("brand", { ascending: true });

      setClients(data || []);
    }

    fetchClients();
  }, []);

  function updateItem(index, field, value) {
    const updated = [...items];
    updated[index][field] =
      field === "description" ? value : value === "" ? "" : Number(value);
    setItems(updated);
  }

  function addItem() {
    setItems([...items, { description: "", qty: "", price: "" }]);
  }

  function removeItem(index) {
    if (items.length === 1) return;
    setItems(items.filter((_, i) => i !== index));
  }

  const subtotal = items.reduce((sum, item) => {
    return sum + (Number(item.qty) || 0) * (Number(item.price) || 0);
  }, 0);

  async function handleGenerate() {
    const supabase = getSupabase();
    if (!supabase) return;

    const validItems = items.filter(i => i.description && i.qty && i.price);

    if (!client || validItems.length === 0) {
      alert("Fill required fields");
      return;
    }

    try {
      setLoading(true);

      if (!selectedClientId) {
        await supabase.from("clients").insert({
          name: client,
          brand: client,
          address: clientAddress,
          tax_id: clientTaxId,
        });
      }

      const res = await fetch("/api/invoice/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client,
          client_address: clientAddress,
          client_tax_id: clientTaxId,
          date,
          type,
          items: validItems,
          amount: subtotal,
          tax_enabled: taxEnabled,
          tax_rate: taxEnabled ? taxRate : 0,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data?.invoice?.invoice_number) {
        throw new Error(data?.error || "Create failed");
      }

      router.push(`/invoice/preview?id=${data.invoice.invoice_number}`);

    } catch (err) {
      console.error(err);
      alert("Error creating invoice");
    } finally {
      setLoading(false);
    }
  }

  return (
  <div className="min-h-screen bg-black text-white flex justify-center px-4 py-10">
    <div className="w-full max-w-2xl">

      {/* TITLE */}
      <h1 className="text-center text-[#d4af37] tracking-[0.4em] text-lg mb-8">
        CREATE INVOICE
      </h1>

      {/* GLASS CARD */}
      <div className="relative rounded-3xl p-8 space-y-6 
        bg-white/5 backdrop-blur-2xl 
        border border-white/10 
        shadow-[0_0_60px_rgba(212,175,55,0.15)]">

        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent opacity-20 pointer-events-none" />

        {/* CLIENT SELECT */}
        {/* CLIENT SELECT */}
<select
  className="w-full p-3 rounded-xl bg-black/40 border border-white/15 backdrop-blur-md outline-none focus:border-[#d4af37] focus:shadow-[0_0_10px_rgba(212,175,55,0.2)]"
  onChange={(e) => {
    const id = e.target.value;

    setSelectedClientId(id);

    const c = clients.find(c => String(c.id) === String(id)); // ✅ FIX
    if (!c) return;

    setClient(c.brand || c.name);
    setClientAddress(c.address || "");
    setClientTaxId(c.tax_id || "");
  }}
>
  <option value="">Select Client</option>
  {clients.map(c => (
    <option key={c.id} value={c.id}>
      {c.brand || c.name}
    </option>
  ))}
</select>

        {/* INPUTS */}
        <input
          className="w-full p-3 rounded-xl bg-black/40 border border-white/15 backdrop-blur-md outline-none focus:border-[#d4af37] focus:shadow-[0_0_10px_rgba(212,175,55,0.2)]"
          value={client}
          onChange={(e)=>setClient(e.target.value)}
          placeholder="Client Name"
        />

        <textarea
          className="w-full p-3 rounded-xl bg-black/40 border border-white/15 backdrop-blur-md outline-none focus:border-[#d4af37] focus:shadow-[0_0_10px_rgba(212,175,55,0.2)]"
          value={clientAddress}
          onChange={(e)=>setClientAddress(e.target.value)}
          placeholder="Client Address"
        />

        <input
          className="w-full p-3 rounded-xl bg-black/40 border border-white/15 backdrop-blur-md outline-none focus:border-[#d4af37] focus:shadow-[0_0_10px_rgba(212,175,55,0.2)]"
          value={clientTaxId}
          onChange={(e)=>setClientTaxId(e.target.value)}
          placeholder="Tax ID"
        />

        <input
          type="date"
          className="w-full p-3 rounded-xl bg-black/40 border border-white/15 backdrop-blur-md outline-none focus:border-[#d4af37] focus:shadow-[0_0_10px_rgba(212,175,55,0.2)]"
          value={date}
          onChange={(e)=>setDate(e.target.value)}
        />

        {/* ITEMS */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          {items.map((item, i) => (
            <div key={i} className="space-y-2">

              <input
                className="w-full p-3 rounded-xl bg-black/40 border border-white/15 backdrop-blur-md outline-none focus:border-[#d4af37] focus:shadow-[0_0_10px_rgba(212,175,55,0.2)]"
                placeholder="Description"
                value={item.description}
                onChange={(e)=>updateItem(i,"description",e.target.value)}
              />

              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Qty"
                  className="w-1/3 p-3 rounded-xl bg-black/40 border border-white/15 backdrop-blur-md outline-none"
                  value={item.qty || ""}
                  onChange={(e)=>updateItem(i,"qty",e.target.value)}
                />

                <input
                  type="number"
                  placeholder="Price"
                  className="w-2/3 p-3 rounded-xl bg-black/40 border border-white/15 backdrop-blur-md outline-none"
                  value={item.price || ""}
                  onChange={(e)=>updateItem(i,"price",e.target.value)}
                />

                <button onClick={()=>removeItem(i)} className="text-red-400 px-2">
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

        <button onClick={addItem} className="text-[#d4af37] text-sm">
          + ADD ITEM
        </button>

        {/* TAX */}
        <div
          onClick={()=>setTaxEnabled(!taxEnabled)}
          className="flex justify-between items-center p-3 border border-white/10 rounded-xl cursor-pointer"
        >
          <span>Apply VAT</span>
          <div className={`w-10 h-5 rounded-full ${taxEnabled ? "bg-[#d4af37]" : "bg-white/20"} relative`}>
            <div className={`absolute top-1 left-1 w-3 h-3 bg-black rounded-full transition ${taxEnabled ? "translate-x-5" : ""}`} />
          </div>
        </div>

        {taxEnabled && (
          <input
            type="number"
            value={taxRate}
            onChange={(e)=>setTaxRate(Number(e.target.value))}
            className="w-full p-3 rounded-xl bg-black/40 border border-white/15 backdrop-blur-md outline-none"
            placeholder="Tax %"
          />
        )}

        {/* TOTAL */}
        <div className="text-right pt-4 border-t border-white/10">
          <span className="text-white/50">Subtotal:</span>{" "}
          <span className="text-white text-lg">{subtotal.toFixed(2)} THB</span>
        </div>

        {/* GENERATE */}
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-4 rounded-xl font-semibold tracking-widest 
          bg-gradient-to-r from-[#d4af37] to-[#f5d98f] 
          text-black 
          hover:scale-[1.02] transition"
        >
          {loading ? "CREATING..." : "GENERATE INVOICE"}
        </button>

      </div>
    </div>
  </div>
);
}