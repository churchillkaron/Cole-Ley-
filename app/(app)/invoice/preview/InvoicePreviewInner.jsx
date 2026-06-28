"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getSupabase } from "../../../../lib/supabase";

export default function InvoicePreviewInner() {
  const params = useSearchParams();
  const router = useRouter();

  const id = params.get("id");
  const type = params.get("type") === "quotation" ? "quotation" : "invoice";

  const [documentData, setDocumentData] = useState(null);
  const [loading, setLoading] = useState(true);

  const isQuotation = type === "quotation";
  const label = isQuotation ? "QUOTATION" : "INVOICE";

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
  }, [router]);

  useEffect(() => {
    async function fetchDocument() {
      try {
        const endpoint = isQuotation
          ? "/api/quotation/get"
          : "/api/invoice/get";

        const res = await fetch(`${endpoint}?id=${id}`);
        const data = await res.json();

        const doc = isQuotation ? data.quotation : data.invoice;

        if (!res.ok || !doc) {
          setDocumentData(null);
          return;
        }

        setDocumentData(doc);
      } catch (err) {
        console.error(err);
        setDocumentData(null);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchDocument();
    else setLoading(false);
  }, [id, isQuotation]);

  const documentNumber = useMemo(() => {
    if (!documentData) return "";
    return isQuotation
      ? documentData.quotation_number
      : documentData.invoice_number;
  }, [documentData, isQuotation]);

  const status = documentData?.status || "pending";
  const subtotal = Number(documentData?.amount || 0);
  const taxEnabled = Boolean(documentData?.tax_enabled);
  const taxRate = Number(documentData?.tax_rate || 0);
  const tax = taxEnabled ? (subtotal * taxRate) / 100 : 0;
  const total = subtotal + tax;

  async function generatePDF() {
    if (typeof window === "undefined") return null;

    const html2canvas = (await import("html2canvas")).default;
    const jsPDF = (await import("jspdf")).default;

    const element = document.getElementById("invoice");
    if (!element) return null;

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

    const imgData = canvas.toDataURL("image/jpeg", 0.86);

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [794, 1123],
    });

    pdf.addImage(imgData, "JPEG", 0, 0, 794, 1123);

    return pdf;
  }

  async function downloadPDF() {
    const pdf = await generatePDF();
    if (!pdf) return;

    pdf.save(`${label.toLowerCase()}-${documentNumber}.pdf`);
  }

  async function sharePDF() {
    const pdf = await generatePDF();
    if (!pdf) return;

    const blob = pdf.output("blob");
    const file = new File([blob], `${label.toLowerCase()}-${documentNumber}.pdf`, {
      type: "application/pdf",
    });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: `${label} ${documentNumber}`,
        text: `${label} ${documentNumber}`,
      });
      return;
    }

    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  }

  async function markPaid() {
    if (isQuotation) return;

    try {
      const res = await fetch("/api/invoice/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          invoice_number: documentNumber,
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
    const subject = `${label} ${documentNumber}`;
    const body = isQuotation
      ? "Please find your quotation attached."
      : "Please find your invoice attached.";

    window.location.href = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }

  function editDocument() {
    router.push(
      `/invoice?edit=${documentNumber}&type=${type}`
    );
  }

  async function approveQuotation() {
    const res = await fetch("/api/quotation/convert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quotation_id: documentNumber,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Conversion failed");
      return;
    }

    router.push(
      `/invoice/preview?id=${data.invoice.invoice_number}&type=invoice`
    );
  }

  if (loading) return <div className="text-white p-10">Loading...</div>;

  if (!documentData) {
    return (
      <div className="min-h-screen bg-[#111111] text-red-400 p-10">
        No {isQuotation ? "quotation" : "invoice"} found
      </div>
    );
  }

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
          onClick={editDocument}
          className="border px-4 py-2 text-sm border-yellow-500 text-yellow-500"
        >
          EDIT
        </button>

        {isQuotation && (
          <button
            onClick={approveQuotation}
            className="border px-4 py-2 text-sm border-[#b89432] text-[#b89432]"
          >
            APPROVE
          </button>
        )}

        <button
          onClick={sharePDF}
          className="border px-4 py-2 text-sm border-green-500 text-green-500"
        >
          SHARE PDF
        </button>

        {!isQuotation && status !== "paid" && (
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
            className="relative w-[794px] h-[1123px] bg-white text-[#111111] font-sans flex flex-col overflow-hidden px-[70px] pt-[40px] pb-[95px]"
          >
            <div className="flex-1">
            <div className="flex justify-between items-start border-b border-[#d8c28a] pb-2">
              <div className="pl-6 pt-2">
                <img
                  src="/cole-logo1.png"
                  alt="Cole Ley"
                  className="w-[380px] h-auto object-contain"
                />
              </div>

              <div className="relative z-20 text-right">
                <p className="tracking-[5px] text-[#b89432] text-[16px] font-semibold mb-5">
                  {!isQuotation && status === "paid" ? "RECEIPT" : label}
                </p>

                <p className="text-[13px] text-[#555555]">
                  <span className="text-[#b89432] font-semibold">NO.</span>{" "}
                  {documentNumber}
                </p>

                <p className="text-[13px] text-[#555555] mt-1">
                  <span className="text-[#b89432] font-semibold">DATE</span>{" "}
                  {documentData.date}
                </p>

                {isQuotation && documentData.valid_until && (
                  <p className="text-[13px] text-[#555555] mt-1">
                    <span className="text-[#b89432] font-semibold">
                      VALID UNTIL
                    </span>{" "}
                    {documentData.valid_until}
                  </p>
                )}

                {!isQuotation && status === "paid" && (
                  <>
                    <p className="text-[13px] text-[#555555] mt-1">
                      <span className="text-[#b89432] font-semibold">
                        RECEIPT NO.
                      </span>{" "}
                      {documentData.receipt_number || "-"}
                    </p>

                    <p className="text-[13px] text-[#555555] mt-1">
                      <span className="text-[#b89432] font-semibold">
                        PAID DATE
                      </span>{" "}
                      {documentData.paid_date || "-"}
                    </p>
                  </>
                )}

                {(!isQuotation || (status !== "draft" && status !== "pending")) && (
                  <div className="mt-4 inline-block border border-[#d8c28a] px-2 py-[4px] text-[10px] tracking-[2px] text-[#b89432]">
                    {status.toUpperCase()}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-2">
              <div>
                <p className="text-[11px] tracking-[3px] text-[#b89432] font-semibold mb-4">
                  FROM
                </p>

                <p className="text-[15px] font-semibold">Cole Ley Co., Ltd.</p>

                <p className="text-[12px] text-[#666666] mt-2 leading-5">
                  27/10 Soi Plukjae<br />
                  Phuket 83130, Thailand
                </p>

                <p className="text-[12px] text-[#666666] mt-1 leading-5">
                  +66 (0) 94427 1265<br />
                  cole@coleley.com<br />
                  Tax ID: 0835566030354
                </p>
              </div>

              <div>
                <p className="text-[11px] tracking-[3px] text-[#b89432] font-semibold mb-4">
                  {isQuotation ? "PREPARED FOR" : "BILL TO"}
                </p>

                <p className="text-[18px] font-semibold">
                  {documentData.client || "-"}
                </p>

                <p className="text-[12px] text-[#666666] mt-2 leading-5 whitespace-pre-line">
                  {documentData.client_address || "-"}
                </p>

                <p className="text-[12px] text-[#666666] mt-1">
                  Tax ID: {documentData.client_tax_id || "-"}
                </p>
              </div>
            </div>

            {(documentData.performance_type ||
              documentData.venue ||
              documentData.performance_time ||
              documentData.soundcheck_time) && (
              <div className="mt-5 border border-[#eadcae] p-4">
                <p className="text-[11px] tracking-[3px] text-[#b89432] font-semibold mb-1">
                  EVENT DETAILS
                </p>

                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-[12px] text-[#666666]">
                  {documentData.performance_type && (
                    <p>
                      <span className="font-semibold text-[#111111]">
                        Performance:
                      </span>{" "}
                      {documentData.performance_type}
                    </p>
                  )}

                  {documentData.venue && (
                    <p>
                      <span className="font-semibold text-[#111111]">
                        Venue:
                      </span>{" "}
                      {documentData.venue}
                    </p>
                  )}

                  {documentData.performance_time && (
                    <p>
                      <span className="font-semibold text-[#111111]">
                        Performance Time:
                      </span>{" "}
                      {documentData.performance_time}
                    </p>
                  )}

                  {documentData.soundcheck_time && (
                    <p>
                      <span className="font-semibold text-[#111111]">
                        Soundcheck:
                      </span>{" "}
                      {documentData.soundcheck_time}
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="mt-5">
              <div className="grid grid-cols-[1fr_70px_110px_120px] border-b border-[#d8c28a] pb-3 text-[11px] tracking-[2px] text-[#b89432] font-semibold">
                <div>DESCRIPTION</div>
                <div className="text-center">QTY</div>
                <div className="relative z-20 text-right">UNIT</div>
                <div className="relative z-20 text-right">AMOUNT</div>
              </div>

              <div className="min-h-[58px]">
                {documentData.items?.map((item, i) => {
                  const qty = Number(item.qty) || 0;
                  const price = Number(item.price) || 0;
                  const lineTotal = qty * price;

                  return (
                    <div
                      key={i}
                      className="grid grid-cols-[1fr_70px_110px_120px] border-b border-[#eeeeee] py-1 text-[13px]"
                    >
                      <div className="pr-6 leading-5">
                        {item.description || item.name || "-"}
                      </div>
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

            <div className="mt-auto flex justify-end print:break-before-page break-before-page"><div className="w-[225px] text-right">
                <div className="flex justify-between text-[13px] text-[#666666] py-2">
                  <span>Subtotal</span>
                  <span>{subtotal.toFixed(2)} THB</span>
                </div>

                {taxEnabled && (
                  <div className="flex justify-between text-[13px] text-[#666666] py-2 border-t border-[#eeeeee]">
                    <span>VAT ({taxRate}%)</span>
                    <span>{tax.toFixed(2)} THB</span>
                  </div>
                )}

                <div className="flex justify-between items-end mt-1 pt-4 border-t border-[#d8c28a]">
                  <span className="text-[12px] tracking-[3px] text-[#b89432] font-semibold">
                    TOTAL
                  </span>
                  <span className="text-[18px] text-[#111111] font-semibold">
                    {total.toFixed(2)} THB
                  </span>
                </div>

                {isQuotation && documentData.food_drinks && (
                  <p className="mt-4 text-[10px] text-[#666666] leading-4">
                    Food and beverages are required for performers unless agreed otherwise.
                  </p>
                )}
              </div>
            </div>

            </div>

            <div className="mt-auto">

            {isQuotation && (
              <div className="mt-8 border-t border-[#d8c28a] pt-5">
                <p className="text-[10px] tracking-[3px] text-[#b89432] font-semibold mb-3">
                  TERMS
                </p>

                <div className="text-[8px] leading-[13px] text-[#666666] whitespace-pre-line columns-2 gap-8">
                  {documentData.terms || "Terms to be confirmed."}
                </div>
              </div>
            )}


            {isQuotation && documentData.rider && (
              <div className="mt-4 border-t border-[#d8c28a] pt-5">
                <p className="text-[10px] tracking-[3px] text-[#b89432] font-semibold mb-2">
                  TECHNICAL RIDER
                </p>
                <div className="text-[7px] leading-[10px] text-[#666666] whitespace-pre-line columns-2 gap-10 break-words">
                  {documentData.rider}
                </div>
              </div>
            )}

          </div>

          <div className="absolute left-[70px] right-[70px] bottom-[20px] flex justify-between items-center border-t border-[#eeeeee] pt-3 text-[9px] text-[#999999] bg-white z-50">
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
