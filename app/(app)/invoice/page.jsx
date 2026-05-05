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

  const [validUntil, setValidUntil] = useState("");
  const [notes, setNotes] = useState("");

  const defaultTerms = `1. A 50% deposit is required to confirm the booking.
2. The remaining balance is due after the performance.
3. This quotation is valid for 10 days from the issue date.
4. Performance times and details must be confirmed in advance.
5. Food and beverages must be provided for all performers unless agreed otherwise.
6. Any changes must be communicated at least 48 hours before the event.
7. Cancellation policy: Deposit is non-refundable once booking is confirmed.
8. Overtime beyond agreed performance time will be charged additionally.
9. Client approval of this quotation confirms acceptance of all terms above.`;

  const [terms, setTerms] = useState(defaultTerms);

  const [performanceType, setPerformanceType] = useState("");
  const [venue, setVenue] = useState("");
  const [performanceTime, setPerformanceTime] = useState("");
  const [soundcheckTime, setSoundcheckTime] = useState("");
  const [foodDrinks, setFoodDrinks] = useState(false);
  const [rider, setRider] = useState("");

  const performancePresets = {
    "solo acoustic": "Solo Acoustic Performance - 2 sets of live music",
    "solo + dj": "Solo performance with DJ support",
    duo: "Duo live performance",
    trio: "Trio live performance",
    "4 piece band": "4-piece band live performance",
    "full band": "Full band performance",
  };

  const riderPresets = {
    "solo acoustic": `• 1 vocal microphone
• 1 instrument input
• 1 monitor speaker
• Small PA system
• 1 chair

Hospitality:
• Water provided
• Light snacks appreciated`,

    "solo + dj": `• 1 vocal microphone
• DJ controller space
• 2 monitor speakers
• PA system with subwoofer
• Table for DJ

Hospitality:
• Water provided
• 2 meals or food allowance`,

    duo: `• 2 vocal microphones
• 2 instrument inputs
• 2 monitor speakers
• PA system

Hospitality:
• Water provided
• 2 meals or food allowance`,

    trio: `• 3 vocal microphones
• Full instrument inputs
• 3 monitor speakers
• PA system with subwoofer

Hospitality:
• Water provided
• 3 meals or food allowance`,

    "4 piece band": `• Full band setup (drums, bass, guitar, keys)
• Minimum 4 monitor speakers
• Professional PA system
• Stage space required

Hospitality:
• Water provided
• Meals for 4 band members`,

    "full band": `• Full professional stage setup
• Drum kit or space provided
• 5+ monitor speakers
• Full PA system with technician
• Lighting preferred

Hospitality:
• Water provided
• Meals for all band members
• Private space for preparation`,
  };

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

  function selectPerformanceType(value) {
    setPerformanceType(value);

    setItems([
      {
        description: performancePresets[value] || "",
        qty: 1,
        price: "",
      },
    ]);

    setRider(riderPresets[value] || "");
  }

  const subtotal = items.reduce((sum, item) => {
    return sum + (Number(item.qty) || 0) * (Number(item.price) || 0);
  }, 0);

  function handlePreview() {
    localStorage.setItem("preview_invoice", JSON.stringify({
      client,
      client_address: clientAddress,
      client_tax_id: clientTaxId,
      date: new Date(date).toISOString().split("T")[0],
      type,
      items,
      amount: subtotal,
      tax_enabled: taxEnabled,
      tax_rate: taxEnabled ? taxRate : 7,

     valid_until: validUntil
  ? new Date(validUntil).toISOString().split("T")[0]
  : null,
      notes,
      terms,

      performance_type: performanceType,
      venue,
      performance_time: performanceTime,
      soundcheck_time: soundcheckTime,
      food_drinks: foodDrinks,
      rider,
    }));

    router.push("/invoice/preview?mode=draft");
  }

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

      const endpoint =
        type === "quotation"
          ? "/api/quotation/create"
          : "/api/invoice/create";

      const res = await fetch(endpoint, {
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

          valid_until: validUntil,
          notes,
          terms,

          performance_type: performanceType,
          venue,
          performance_time: performanceTime,
          soundcheck_time: soundcheckTime,
          food_drinks: foodDrinks,
          rider,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data?.invoice?.invoice_number) {
        throw new Error(data?.error || "Create failed");
      }

      router.push(`/invoice/preview?id=${data.invoice.invoice_number}&type=${type}`);

    } catch (err) {
      console.error(err);
      alert("Error creating document");
    } finally {
      setLoading(false);
    }
  }

  return (
  <div className="min-h-screen bg-black text-white flex justify-center px-4 py-10">
    <div className="w-full max-w-2xl">

      <h1 className="text-center text-[#d4af37] tracking-[0.4em] text-lg mb-8">
        CREATE DOCUMENT
      </h1>

      <div className="relative rounded-3xl p-8 space-y-6 
        bg-white/5 backdrop-blur-2xl 
        border border-white/10 
        shadow-[0_0_60px_rgba(212,175,55,0.15)]">

        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent opacity-20 pointer-events-none" />

        {/* TYPE SWITCH */}
        <div className="flex gap-2">
          <button
            onClick={() => setType("invoice")}
            className={`flex-1 p-3 rounded-xl ${type === "invoice" ? "bg-[#d4af37] text-black" : "bg-black/40 border border-white/15"}`}
          >
            INVOICE
          </button>
          <button
            onClick={() => {
              setType("quotation");
              setTerms(defaultTerms);
            }}
            className={`flex-1 p-3 rounded-xl ${type === "quotation" ? "bg-[#d4af37] text-black" : "bg-black/40 border border-white/15"}`}
          >
            QUOTATION
          </button>
        </div>

        {/* CLIENT SELECT */}
        <select
          className="w-full p-3 rounded-xl bg-black/40 border border-white/15"
          onChange={(e) => {
            const id = e.target.value;
            setSelectedClientId(id);

            const c = clients.find(c => String(c.id) === String(id));
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

        {/* BASIC INPUTS */}
        <input
          className="w-full p-3 rounded-xl bg-black/40 border border-white/15"
          value={client}
          onChange={(e)=>setClient(e.target.value)}
          placeholder="Client Name"
        />

        <textarea
          className="w-full p-3 rounded-xl bg-black/40 border border-white/15"
          value={clientAddress}
          onChange={(e)=>setClientAddress(e.target.value)}
          placeholder="Client Address"
        />

        <input
          className="w-full p-3 rounded-xl bg-black/40 border border-white/15"
          value={clientTaxId}
          onChange={(e)=>setClientTaxId(e.target.value)}
          placeholder="Tax ID"
        />

        <input
          type="date"
          className="w-full p-3 rounded-xl bg-black/40 border border-white/15"
          value={date}
          onChange={(e)=>setDate(e.target.value)}
        />

        {/* QUOTATION FIELDS */}
        {type === "quotation" && (
          <>
            <input
              type="date"
              className="w-full p-3 rounded-xl bg-black/40 border border-white/15"
              value={validUntil}
              onChange={(e)=>setValidUntil(e.target.value)}
              placeholder="Valid Until"
            />

            <textarea
              className="w-full p-3 rounded-xl bg-black/40 border border-white/15"
              value={notes}
              onChange={(e)=>setNotes(e.target.value)}
              placeholder="Notes"
            />

            <textarea
              className="w-full p-3 rounded-xl bg-black/40 border border-white/15"
              value={terms}
              onChange={(e)=>setTerms(e.target.value)}
              placeholder="Terms & Conditions"
            />

            {/* PERFORMANCE UI */}
            <select
              className="w-full p-3 rounded-xl bg-black/40 border border-white/15"
              value={performanceType}
              onChange={(e)=>selectPerformanceType(e.target.value)}
            >
              <option value="">Select Performance Type</option>
              <option value="solo acoustic">Solo Acoustic</option>
              <option value="solo + dj">Solo + DJ</option>
              <option value="duo">Duo</option>
              <option value="trio">Trio</option>
              <option value="4 piece band">4 Piece Band</option>
              <option value="full band">Full Band</option>
            </select>

            <input
              className="w-full p-3 rounded-xl bg-black/40 border border-white/15"
              placeholder="Venue"
              value={venue}
              onChange={(e)=>setVenue(e.target.value)}
            />

            <input
              className="w-full p-3 rounded-xl bg-black/40 border border-white/15"
              placeholder="Performance Time"
              value={performanceTime}
              onChange={(e)=>setPerformanceTime(e.target.value)}
            />

            <input
              className="w-full p-3 rounded-xl bg-black/40 border border-white/15"
              placeholder="Soundcheck Time"
              value={soundcheckTime}
              onChange={(e)=>setSoundcheckTime(e.target.value)}
            />

            <label className="flex items-center gap-2 text-white/80">
              <input
                type="checkbox"
                checked={foodDrinks}
                onChange={(e)=>setFoodDrinks(e.target.checked)}
              />
              Food & Drinks Included
            </label>

            <textarea
              className="w-full p-3 rounded-xl bg-black/40 border border-white/15 min-h-[220px]"
              value={rider}
              onChange={(e)=>setRider(e.target.value)}
              placeholder="Technical Rider"
            />
          </>
        )}

        {/* ITEMS */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          {items.map((item, i) => (
            <div key={i} className="space-y-2">
              <input
                className="w-full p-3 rounded-xl bg-black/40 border border-white/15"
                placeholder="Description"
                value={item.description}
                onChange={(e)=>updateItem(i,"description",e.target.value)}
              />

              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Qty"
                  className="w-1/3 p-3 rounded-xl bg-black/40 border border-white/15"
                  value={item.qty || ""}
                  onChange={(e)=>updateItem(i,"qty",e.target.value)}
                />

                <input
                  type="number"
                  placeholder="Price"
                  className="w-2/3 p-3 rounded-xl bg-black/40 border border-white/15"
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

        {/* TOTAL */}
        <div className="text-right pt-4 border-t border-white/10">
          <span className="text-white/50">Subtotal:</span>{" "}
          <span className="text-white text-lg">{subtotal.toFixed(2)} THB</span>
        </div>

        <button
          onClick={handlePreview}
          className="w-full py-3 rounded-xl border border-[#d4af37] text-[#d4af37]"
        >
          PREVIEW
        </button>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-4 rounded-xl font-semibold tracking-widest bg-gradient-to-r from-[#d4af37] to-[#f5d98f] text-black"
        >
          {loading ? "CREATING..." : type === "quotation" ? "GENERATE QUOTATION" : "GENERATE INVOICE"}
        </button>

      </div>
    </div>
  </div>
);
}