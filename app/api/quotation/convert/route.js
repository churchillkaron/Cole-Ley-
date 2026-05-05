import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { quotation_id } = body;

    if (!quotation_id) {
      return NextResponse.json(
        { error: "Missing quotation_id" },
        { status: 400 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // ✅ 1. GET QUOTATION
    const { data: quotation, error: qError } = await supabase
      .from("quotations")
      .select("*")
      .eq("quotation_number", quotation_id)
      .single();

    if (qError || !quotation) {
      return NextResponse.json(
        { error: "Quotation not found" },
        { status: 404 }
      );
    }

    // 🔥 Prevent double conversion
    if (quotation.status === "converted") {
      return NextResponse.json(
        { error: "Already converted" },
        { status: 400 }
      );
    }

    // ✅ 2. CREATE INVOICE FROM QUOTATION
    const { data: invoice, error: iError } = await supabase
      .from("invoices")
      .insert({
        client: quotation.client,
        client_address: quotation.client_address,
        client_tax_id: quotation.client_tax_id,
        date: new Date().toISOString().split("T")[0],
        items: quotation.items,
        amount: quotation.amount,
        tax_enabled: quotation.tax_enabled,
        tax_rate: quotation.tax_rate,

        // keep reference
        source_quotation_number: quotation.quotation_number,
      })
      .select()
      .single();

    if (iError || !invoice) {
      console.error("INVOICE CREATE ERROR:", iError);
      return NextResponse.json(
        { error: "Failed to create invoice" },
        { status: 500 }
      );
    }

    // ✅ 3. UPDATE QUOTATION STATUS
    await supabase
      .from("quotations")
      .update({
        status: "converted",
        converted_to_invoice_id: invoice.invoice_number,
      })
      .eq("quotation_number", quotation_id);

    // ✅ 4. RETURN NORMALIZED RESPONSE
    return NextResponse.json({
      invoice: {
        ...invoice,
        type: "invoice",
      },
    });

  } catch (err) {
    console.error("CONVERT ERROR:", err);

    return NextResponse.json(
      { error: "server error" },
      { status: 500 }
    );
  }
}