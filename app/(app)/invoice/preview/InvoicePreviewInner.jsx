"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getSupabase } from "../../../../lib/supabase";

export default function InvoicePreviewInner() {
  const params = useSearchParams();
  const id = params.get("id");
  const router = useRouter();

  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

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

    if (id) fetchInvoice();
    else setLoading(false);
  }, [id]);

  async function generatePDF() {
    if (typeof window === "undefined") return;

    const html2canvas = (await import("html2canvas")).default;
    const jsPDF = (await import("jspdf")).default;

    const element = document.getElementById("invoice");
    if (!element) return;

    const clone = element.cloneNode(true);
    clone.style.transform = "scale(1)";
    clone.style.position = "fixed";
    clone.style.top = "0";
    clone.style.left = "0";
    clone.style.width = "794px";
    clone.style.height = "1123px";
    clone.style.zIndex = "9999";
    clone.style.background = "#ffffff";

    document.body.appendChild(clone);

    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
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

    pdf.save(`invoice-${invoice.invoice_number}.pdf`);
  }

  async function sharePDF() {
    const pdf = await generatePDF();
    if (!pdf) return;

    const blob = pdf.output("blob");

    const file = new File([blob], `invoice-${invoice.invoice_number}.pdf`, {
      type: "application/pdf",
    });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: `Invoice ${invoice.invoice_number}`,
        text: `Invoice ${invoice.invoice_number}`,
      });
      return;
    }

    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  }

  
  async function markPaid() {
    try {
      const res = await fetch("/api/invoice/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          invoice_number: invoice.invoice_number,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed");
        return;
      }

      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to mark paid");
    }
  }

function sendEmail() {

    const subject = `Invoice ${invoice?.invoice_number}`;
    const body = `Please find your invoice attached.`;

    window.location.href = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }

  if (loading) return <div className="text-white p-10">Loading...</div>;
  if (!invoice) return <div className="text-red-500 p-10">No invoice</div>;

  const subtotal = Number(invoice.amount);
  const tax = invoice.tax_enabled ? (subtotal * invoice.tax_rate) / 100 : 0;
  const total = subtotal + tax;
  const status = invoice.status || "pending";

  return (
    <div className="min-h-screen bg-[#111111] flex justify-center py-8 sm:py-12 flex-col items-center">
      <div className="mb-6 flex gap-2 sm:gap-4 flex-wrap justify-center">
        <button
          onClick={downloadPDF}
          className="border px-4 py-2 text-sm border-white/30 text-white/80"
        >
          DOWNLOAD PDF
        </button>

        <button
          onClick={sharePDF}
          className="border px-4 py-2 text-sm border-green-500 text-green-500"
        >
          SHARE PDF
        </button>

        {status !== "paid" && (
          <button
            onClick={markPaid}
            className="border px-4 py-2 text-sm border-[#b89432] text-[#b89432]"
          >
            MARK PAID
          </button>
        )}

        <button
          onClick={sendEmail}
          className="border px-4 py-2 text-sm border-blue-400 text-blue-400"
        >
          EMAIL
        </button>
      </div>

      <div className="w-full overflow-x-auto flex justify-center px-4">
        <div
          id="invoice-scale-wrapper"
          className="scale-[0.6] sm:scale-100 origin-top"
        >
          <div
            id="invoice"
            className="w-[794px] h-[1123px] bg-white text-[#111111] relative font-sans overflow-hidden px-[70px] py-[40px]"
          >
            <div className="flex justify-between items-start border-b border-[#d8c28a] pb-2">
              <div className="pl-6 pt-2">
                <img
                  src="/logo-cole.png"
                  alt="Cole Ley"
                  className="w-[380px] h-auto object-contain"
                />
              </div>

              <div className="text-right">
                <p className="tracking-[5px] text-[#b89432] text-[16px] font-semibold mb-5">
                  {status === "paid" ? "RECEIPT" : "INVOICE"}
                </p>

                <p className="text-[13px] text-[#555555]">
                  <span className="text-[#b89432] font-semibold">NO.</span>{" "}
                  {invoice.invoice_number}
                </p>

                <p className="text-[13px] text-[#555555] mt-1">
                  <span className="text-[#b89432] font-semibold">DATE</span>{" "}
                  {invoice.date}
                </p>

                {status === "paid" && (
                  <>
                    <p className="text-[13px] text-[#555555] mt-3">
                      <span className="text-[#b89432] font-semibold">
                        RECEIPT NO.
                      </span>{" "}
                      {invoice.receipt_number}
                    </p>

                    <p className="text-[13px] text-[#555555] mt-1">
                      <span className="text-[#b89432] font-semibold">
                        PAID DATE
                      </span>{" "}
                      {invoice.paid_date}
                    </p>
                  </>
                )}

                <div className="mt-4 inline-block border border-[#d8c28a] px-2 py-[4px] text-[10px] tracking-[2px] text-[#b89432]">
                  {status.toUpperCase()}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-12 mt-2">
              <div>
                <p className="text-[11px] tracking-[3px] text-[#b89432] font-semibold mb-4">
                  FROM
                </p>

                <p className="text-[15px] font-semibold">Cole Ley Co., Ltd.</p>

                <p className="text-[12px] text-[#666666] mt-2 leading-5">
                  27/10 Soi Plukjae<br />
                  Phuket 83130, Thailand
                </p>

                <p className="text-[12px] text-[#666666] mt-3 leading-5">
                  +66 (0) 94427 1265<br />
                  cole@coleley.com<br />
                  Tax ID: 0835566030354
                </p>
              </div>

              <div>
                <p className="text-[11px] tracking-[3px] text-[#b89432] font-semibold mb-4">
                  BILL TO
                </p>

                <p className="text-[18px] font-semibold">
                  {invoice.client || "-"}
                </p>

                <p className="text-[12px] text-[#666666] mt-2 leading-5 whitespace-pre-line">
                  {invoice.client_address || "-"}
                </p>

                <p className="text-[12px] text-[#666666] mt-3">
                  Tax ID: {invoice.client_tax_id || "-"}
                </p>
              </div>
            </div>

            <div className="mt-2">
              <div className="grid grid-cols-[1fr_70px_110px_120px] border-b border-[#d8c28a] pb-3 text-[11px] tracking-[2px] text-[#b89432] font-semibold">
                <div>DESCRIPTION</div>
                <div className="text-center">QTY</div>
                <div className="text-right">UNIT</div>
                <div className="text-right">AMOUNT</div>
              </div>

              <div className="min-h-[320px]">
                {invoice.items?.map((item, i) => {
                  const qty = Number(item.qty) || 0;
                  const price = Number(item.price) || 0;
                  const lineTotal = qty * price;

                  return (
                    <div
                      key={i}
                      className="grid grid-cols-[1fr_70px_110px_120px] border-b border-[#eeeeee] py-4 text-[13px]"
                    >
                      <div className="pr-6 leading-5">{item.description}</div>
                      <div className="text-center text-[#666666]">{qty}</div>
                      <div className="text-right text-[#666666]">
                        {price.toFixed(2)}
                      </div>
                      <div className="text-right font-medium">
                        {lineTotal.toFixed(2)} THB
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-between items-start mt-6">
              <div className="w-[300px] border border-[#eadcae] p-4">
                <p className="text-[11px] tracking-[3px] text-[#b89432] font-semibold mb-4">
                  PAYMENT DETAILS
                </p>

                <p className="text-[13px] font-semibold">Kasikorn Bank</p>

                <p className="text-[12px] text-[#666666] mt-2 leading-5">
                  Account Name: Cole Ley Co., Ltd.<br />
                  Account No: 166 8505 097
                </p>

                <p className="text-[11px] text-[#777777] mt-4 leading-5">
                  Please use invoice number as payment reference.
                </p>
              </div>

              <div className="w-[285px]">
                <div className="flex justify-between text-[13px] text-[#666666] py-2">
                  <span>Subtotal</span>
                  <span>{subtotal.toFixed(2)} THB</span>
                </div>

                {invoice.tax_enabled && (
                  <div className="flex justify-between text-[13px] text-[#666666] py-2 border-t border-[#eeeeee]">
                    <span>VAT ({invoice.tax_rate}%)</span>
                    <span>{tax.toFixed(2)} THB</span>
                  </div>
                )}

                <div className="flex justify-between items-end mt-3 pt-4 border-t border-[#d8c28a]">
                  <span className="text-[12px] tracking-[3px] text-[#b89432] font-semibold">
                    TOTAL
                  </span>
                  <span className="text-[18px] text-[#111111] font-semibold">
                    {total.toFixed(2)} THB
                  </span>
                </div>
              </div>
            </div>

            <div className="absolute left-[70px] right-[70px] bottom-[25px] flex justify-between text-[10px] text-[#999999] border-t border-[#eeeeee] pt-4">
              <span>www.coleley.com</span>
              <span>cole@coleley.com</span>
              <span>+66 (0) 94427 1265</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
