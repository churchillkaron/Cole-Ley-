"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getSupabase } from "@/lib/supabase";

export default function InvoicePreviewInner() {
const params = useSearchParams();
const id = params.get("id");
const mode = params.get("mode"); // ✅ NEW
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

  // ✅ NEW: DRAFT MODE (FROM FORM PREVIEW)
  if (mode === "draft") {
    const data = JSON.parse(localStorage.getItem("preview_invoice"));
    setInvoice(data);
    setLoading(false);
    return;
  }

  try {
    const res = await fetch(`/api/invoice/get?id=${id}`);
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

async function generatePDF() {
  if (typeof window === "undefined") return;

  const html2canvas = (await import("html2canvas")).default;
  const jsPDF = (await import("jspdf")).default;

  const element = document.getElementById("invoice");
  const wrapper = document.getElementById("invoice-scale-wrapper");

  if (!element || !wrapper) return;

  const clone = element.cloneNode(true);
  clone.style.transform = "scale(1)";
  clone.style.position = "fixed";
  clone.style.top = "0";
  clone.style.left = "0";
  clone.style.width = "794px";
  clone.style.height = "1123px";
  clone.style.zIndex = "9999";
  clone.style.background = "#0a0a0a";

  document.body.appendChild(clone);

  const canvas = await html2canvas(clone, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#0a0a0a",
  });

  document.body.removeChild(clone);

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: [794, 1123],
  });

  pdf.addImage(imgData, "PNG", 0, 0, 794, 1123);

  return pdf;
}

async function downloadPDF() {
  const pdf = await generatePDF();
  if (!pdf) return;

  const blob = pdf.output("blob");

  const file = new File([blob], `${invoice.type || "invoice"}-${invoice.invoice_number || "preview"}.pdf`, {
    type: "application/pdf",
  });

  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    await navigator.share({
      files: [file],
      title: `${invoice.type || "invoice"} ${invoice.invoice_number || ""}`,
    });
  } else {
    pdf.save(`${invoice.type || "invoice"}-${invoice.invoice_number || "preview"}.pdf`);
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

  pdf.save(`${invoice?.type || "invoice"}-${invoice?.invoice_number || "preview"}.pdf`);

  const text = `${invoice?.type === "quotation" ? "Quotation" : "Invoice"} ${invoice?.invoice_number || ""}`;
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
}

if (loading) return <div className="text-white p-10">Loading...</div>;
if (!invoice) return <div className="text-red-500 p-10">No invoice</div>;

const subtotal = Number(invoice.amount);
const tax = invoice.tax_enabled ? (subtotal * invoice.tax_rate) / 100 : 0;
const total = subtotal + tax;

return (
<div className="bg-black flex justify-center py-10 sm:py-20 flex-col items-center">

  <div className="mb-6 flex gap-2 sm:gap-4 flex-wrap justify-center">

    <button onClick={downloadPDF} className="border px-4 py-2 text-sm border-white/30 text-white/80">
      DOWNLOAD
    </button>

    <button onClick={sendEmail} className="border px-4 py-2 text-sm border-blue-400 text-blue-400">
      EMAIL
    </button>

    <button onClick={sendWhatsApp} className="border px-4 py-2 text-sm border-green-500 text-green-500">
      WHATSAPP
    </button>

    {/* ✅ NEW: EDIT BUTTON IN DRAFT MODE */}
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
    <div id="invoice-scale-wrapper" className="scale-[0.6] sm:scale-100 origin-top">
      <div
        id="invoice"
        className="w-[794px] h-[1123px] bg-[#0a0a0a] text-white relative font-serif overflow-hidden"
      >
        <div className="absolute top-[-20px] left-[10px]">
          <img src="/logo-cole.png" className="w-[580px]" />
        </div>

        <div className="absolute top-[300px] left-[80px] text-sm text-white/50">
          <p className="text-white">COLE LEY CO., LTD</p>
          <p>Phuket 83130, Thailand</p>
          <p className="mt-2">+66 (0) 94427 1265</p>
          <p>cole@coleley.com</p>
        </div>

        <div className="absolute top-[120px] right-[80px] text-right">
          <p className="tracking-[5px] text-[#d4af37] text-sm mb-4">
            {invoice.type === "quotation" ? "QUOTATION" : "INVOICE"}
          </p>

          <p>
            <span className="text-[#d4af37]">NO.</span> {invoice.invoice_number || "PREVIEW"}
          </p>

          <p>
            <span className="text-[#d4af37]">DATE</span> {invoice.date}
          </p>
        </div>

        <div className="absolute top-[860px] left-[80px] right-[80px]">
          <img src="/gold-line.png" className="w-full h-[3px]" />
        </div>

        <div className="absolute top-[300px] left-[500px]">
          <p className="text-xs tracking-[4px] text-[#d4af37] mb-3">BILL TO</p>
          <p className="text-lg">{invoice.client}</p>
          <p className="text-white/60 text-sm mt-2">{invoice.client_address}</p>
          <p className="text-white/40 text-sm mt-2">
            Tax ID: {invoice.client_tax_id}
          </p>
        </div>

        <div className="absolute top-[550px] left-[80px] right-[80px] flex justify-between text-[#d4af37]">
          <span>DESCRIPTION</span>
          <span>AMOUNT</span>
        </div>

        <div className="absolute top-[590px] left-[80px] right-[80px] space-y-3">
          {invoice.items?.map((item, i) => (
            <div key={i} className="flex justify-between">
              <span>
                {item.description} ({item.qty} × {item.price})
              </span>
              <span>{(item.qty * item.price).toFixed(2)} THB</span>
            </div>
          ))}
        </div>

        <div className="absolute top-[550px] left-[80px] right-[80px]">
          <img src="/gold-line.png" className="w-full h-[800px]" />
        </div>

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

        <div className="absolute bottom-[60px] left-[80px] text-white/50 text-sm">
          <p className="text-[#d4af37] mb-2">PAYMENT DETAILS</p>
          <p>Kasikorn Bank</p>
          <p>Account Name: Cole Ley Co., Ltd.</p>
          <p>Account No: 166 8505 097</p>
        </div>
      </div>

    </div>
  </div>
</div>
);
}