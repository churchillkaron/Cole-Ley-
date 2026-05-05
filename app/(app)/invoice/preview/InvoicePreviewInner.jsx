"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getSupabase } from "@/lib/supabase";

export default function InvoicePreviewInner() {
const params = useSearchParams();
const id = params.get("id");
const mode = params.get("mode");
const router = useRouter();

const [invoice, setInvoice] = useState(null);
const [loading, setLoading] = useState(true);

/* 🔒 PROTECT PAGE (OWNER ONLY) */
useEffect(() => {
async function checkUser() {
if (typeof window === "undefined") return;

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
}, [router]);

useEffect(() => {
async function fetchInvoice() {

  if (mode === "draft") {
    const data = JSON.parse(localStorage.getItem("preview_invoice"));
    setInvoice(data);
    setLoading(false);
    return;
  }

  try {
    const type = params.get("type");

    const endpoint =
      type === "quotation"
        ? `/api/quotation/get?id=${id}`
        : `/api/invoice/get?id=${id}`;

    const res = await fetch(endpoint);
    const data = await res.json();

    if (!res.ok || !data?.invoice) {
      setInvoice(null);
      return;
    }

    setInvoice(data.invoice);
  } catch (err) {
    console.error(err);
    setInvoice(null);
  } finally {
    setLoading(false);
  }
}

if (id || mode === "draft") fetchInvoice();
else setLoading(false);

}, [id, mode]);

/* 🔥 NEW: CONVERT FUNCTION */
async function convertToInvoice() {
  try {
    const res = await fetch("/api/quotation/convert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quotation_id: invoice.invoice_number,
      }),
    });

    const data = await res.json();

    if (data?.invoice?.invoice_number) {
      router.push(`/invoice/preview?id=${data.invoice.invoice_number}&type=invoice`);
    } else {
      alert("Conversion failed");
    }
  } catch (err) {
    console.error(err);
    alert("Error converting quotation");
  }
}

async function generatePDF() {
  if (typeof window === "undefined") return;

  const html2canvas = (await import("html2canvas")).default;
  const jsPDF = (await import("jspdf")).default;

  const page1 = document.getElementById("invoice");
  const page2 = document.getElementById("invoice-page-2");

  const pages = [page1, page2].filter(Boolean);

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: [794, 1123],
  });

  for (let i = 0; i < pages.length; i++) {
   const canvas = await html2canvas(pages[i], {
  scale: 1.5, // 🔥 reduce from 2 → 1
  useCORS: true,
  backgroundColor: "#0a0a0a",
});

    const imgData = canvas.toDataURL("image/jpeg", 0.9); // 🔥 compression

    if (i > 0) pdf.addPage();

    pdf.addImage(imgData, "PNG", 0, 0, 794, 1123);
  }

  return pdf;
}

async function downloadPDF() {
  try {
    const pdf = await generatePDF();
    if (!pdf) return;

    const blob = pdf.output("blob");

    const file = new File(
      [blob],
      "invoice.pdf",
      { type: "application/pdf" }
    );

    // 🔥 MUST be directly triggered
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: "Invoice",
      });
    } else {
      alert("Sharing not supported");
    }

  } catch (err) {
    console.error(err);
    alert("Error: " + err.message);
  }
}
function sendEmail() {
const subject = `${invoice?.type === "quotation" ? "Quotation" : "Invoice"} ${invoice?.invoice_number || ""}`;
const body = `Please find your ${invoice?.type || "invoice"} attached.`;
window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

async function sendWhatsApp() {
  const pdf = await generatePDF();
  if (!pdf) return;

  const blob = pdf.output("blob");
  const url = URL.createObjectURL(blob);

  // Open PDF preview first
  window.open(url, "_blank");

  // Then open WhatsApp
  const text = `${invoice.type === "quotation" ? "Quotation" : "Invoice"} ${invoice.invoice_number || ""}`;
  setTimeout(() => {
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  }, 1000);
}

if (loading) return <div className="text-white p-10">Loading...</div>;
if (!invoice) return <div className="text-red-500 p-10">No invoice</div>;

const subtotal = Number(invoice.amount);
const tax = invoice.tax_enabled ? (subtotal * invoice.tax_rate) / 100 : 0;
const total = subtotal + tax;

return (
  <div className="bg-black flex justify-center py-10 sm:py-20 flex-col items-center relative">

    {/* ACTION BUTTONS */}
    <div className="mb-6 flex gap-2 sm:gap-4 flex-wrap justify-center z-20">
     <button
  onClick={downloadPDF}
  style={{ zIndex: 9999, position: "relative" }}
>
    
  DOWNLOAD
</button>

      <button onClick={sendEmail} className="border px-4 py-2 text-sm border-blue-400 text-blue-400">
        EMAIL
      </button>

      <button onClick={sendWhatsApp} className="border px-4 py-2 text-sm border-green-500 text-green-500">
        WHATSAPP
      </button>

      {invoice.type === "quotation" && (
        <button
          onClick={convertToInvoice}
          className="border px-4 py-2 text-sm border-[#d4af37] text-[#d4af37]"
        >
          CONVERT TO INVOICE
        </button>
      )}

      {mode === "draft" && (
        <button
          onClick={() => router.push("/invoice")}
          className="border px-4 py-2 text-sm border-yellow-400 text-yellow-400"
        >
          EDIT
        </button>
      )}
    </div>

    <div className="w-full overflow-x-auto flex justify-center">

      <div id="invoice-scale-wrapper" className="scale-[0.6] sm:scale-100 origin-top flex flex-col items-center gap-10">

        {/* ================= PAGE 1 ================= */}
        <div
          id="invoice"
          className="w-[794px] h-[1123px] text-white relative font-serif overflow-hidden"
        >

          {/* BACKGROUND */}
          <img
  src="/quotation-bg.png"
  className="absolute inset-0 w-full h-full object-cover opacity-90"
/>

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-black/0" />

          {/* TOP FADE */}
          <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-black/90 to-transparent" />

          {/* CONTENT */}
          <div className="relative z-10">

            {/* LOGO */}
            <div className="absolute top-[-20px] left-[-30px]">
              <img src="/logo-cole.png" className="w-[580px]" />
            </div>
{/* QUOTATION TITLE UNDER LOGO */}
<div className="absolute top-[250px] left-[80px]">

  <p className="serif text-[40px] tracking-[6px] text-[white] leading-none">
    {invoice.type === "quotation" ? "QUOTATION" : "INVOICE"}
  </p>

  <p className="mt-3 text-[18px] tracking-[4px] text-[white]">
    {invoice.invoice_number}
  </p>

</div>
\{/* DATE BLOCK */}
<div className="absolute top-[220px] right-[80px] text-right">

  <p className="text-[12px] tracking-[3px] text-white/70">
    DATE {invoice.date}
  </p>

  {invoice.type === "quotation" && (
    <p className="mt-2 text-[12px] tracking-[3px] text-[#d4af37]">
      VALID UNTIL {invoice.valid_until}
    </p>
  )}

</div>
            <div className="absolute top-[350px] left-[80px] right-[80px] flex justify-between">

  {/* FROM */}
  <div className="w-[45%]">
    <p className="text-xs tracking-[4px] text-[#d4af37] mb-3">FROM</p>

    <p className="serif text-xl text-white mb-2">
      COLE LEY CO., LTD
    </p>

    <p className="text-white/70 text-sm leading-relaxed">
      Phuket 83130, Thailand
    </p>

    <p className="text-white/50 text-sm mt-2">
      +66 (0) 94427 1265  
      <br />
      cole@coleley.com
    </p>
  </div>

  {/* BILL TO */}
  <div className="w-[45%] text-right">
    <p className="text-xs tracking-[4px] text-[#d4af37] mb-3">BILL TO</p>

    <p className="serif text-xl text-white mb-2">
      {invoice.client}
    </p>

    <p className="text-white/70 text-sm leading-relaxed">
      {invoice.client_address}
    </p>

    {invoice.client_tax_id && (
      <p className="text-white/40 text-xs mt-2">
        TAX ID: {invoice.client_tax_id}
      </p>
    )}
  </div>

</div>

            {/* DESCRIPTION */}
            <div className="absolute top-[570px] left-[80px] right-[80px] flex justify-between text-[#d4af37]">
              <span>DESCRIPTION</span>
              <span>AMOUNT</span>
            </div>

            {/* LINE */}
            <div className="absolute top-[575px] left-[80px] right-[80px] h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />

            {/* ITEMS */}
            <div className="absolute top-[620px] left-[80px] right-[80px] space-y-3">
              {invoice.items?.map((item, i) => (
                <div key={i} className="flex justify-between">
                  <span>
                    {item.description} ({item.qty} × {item.price})
                  </span>
                  <span>{(item.qty * item.price).toFixed(2)} THB</span>
                </div>
              ))}
            </div>
{/* EVENT DETAILS */}
<div className="absolute top-[680px] left-[80px] right-[80px] text-sm text-white/70 space-y-2">

  {invoice.performance_type && (
    <p><span className="text-[#d4af37]">Performance:</span> {invoice.performance_type}</p>
  )}

  {invoice.venue && (
    <p><span className="text-[#d4af37]">Venue:</span> {invoice.venue}</p>
  )}

  {invoice.performance_time && (
    <p><span className="text-[#d4af37]">Performance Time:</span> {invoice.performance_time}</p>
  )}

  {invoice.soundcheck_time && (
    <p><span className="text-[#d4af37]">Soundcheck:</span> {invoice.soundcheck_time}</p>
  )}

  {invoice.food_drinks && (
    <p><span className="text-[#d4af37]">Food & Drinks:</span> Included</p>
  )}

</div>
{/* NOTES */}
{invoice.notes && (
  <div className="absolute top-[820px] left-[80px] right-[350px] text-sm text-white/60">
    <p className="text-[#d4af37] mb-1">NOTES</p>
    <p>{invoice.notes}</p>
  </div>
)}
            {/* TOTAL */}
            <div className="absolute top-[850px] right-[80px] w-[250px] space-y-2">
              <div className="flex justify-between text-white/60">
                <span>Subtotal</span>
                <span>{subtotal.toFixed(2)}</span>
              </div>

              {invoice.tax_enabled && (
                <div className="flex justify-between text-white/60">
                  <span>VAT ({invoice.tax_rate}%)</span>
                  <span>{tax.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between mt-4">
                <span className="text-[#d4af37]">TOTAL</span>
                <span className="text-2xl text-[#e7c87a]">
                  {total.toFixed(2)} THB
                </span>
              </div>
            </div>

            {/* BOTTOM LINE */}
            <div className="absolute top-[820px] left-[80px] right-[80px] h-[1px] bg-[#d4af37]" />

      {/* PAYMENT */}
<div className="absolute top-[980px] left-[80px] text-white/60 text-sm z-20">

  <p className="text-[#d4af37] mb-2 tracking-[3px]">
    PAYMENT DETAILS
  </p>

  <p>Kasikorn Bank</p>
  <p>Account Name: Cole Ley Co., Ltd.</p>
  <p>Account No: 166 8505 097</p>

</div>
          </div>
        </div>

        {/* ================= PAGE 2 ================= */}
       {invoice.type === "quotation" && (
  <div
    id="invoice-page-2"
    className="w-[794px] h-[1123px] text-white relative font-serif overflow-hidden"
  >

    {/* BACKGROUND */}
    <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />
    <div className="absolute bottom-0 w-full h-[300px] bg-gradient-to-t from-[#d4af37]/10 to-transparent" />

    {/* CONTENT */}
    <div className="relative z-10">

      <div className="absolute top-[120px] right-[80px] text-right">
        <p className="tracking-[5px] text-[#d4af37] text-sm mb-4">
          TERMS & RIDER
        </p>
      </div>

      <div className="absolute top-[250px] left-[80px] right-[80px] text-sm text-white/70 whitespace-pre-line">
        <p className="text-[#d4af37] mb-3">TERMS & CONDITIONS</p>
        <p>{invoice.terms}</p>
      </div>

      <div className="absolute top-[500px] left-[80px] right-[80px] text-sm text-white/70 whitespace-pre-line">
        <p className="text-[#d4af37] mb-3">TECHNICAL RIDER</p>
        <p>{invoice.rider}</p>
      </div>

    </div>
  </div>
)}
      

      </div>
    </div>
  </div>
);
}