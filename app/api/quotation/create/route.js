import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req) {
  try {
    const body = await req.json();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const year = new Date().getFullYear();

// 🔥 get latest quotation
const { data: last } = await supabase
  .from("invoices")
  .select("invoice_number")
  .ilike("invoice_number", `QT-${year}-%`)
  .order("invoice_number", { ascending: false })
  .limit(1);

// 🔥 extract last number
let nextNumber = 1;

if (last && last.length > 0) {
  const lastNum = parseInt(last[0].invoice_number.split("-")[2]);
  nextNumber = lastNum + 1;
}

// 🔥 format: QT-2026-0001
const invoiceNumber = `QT-${year}-${String(nextNumber).padStart(4, "0")}`;
    const cleanData = {
      client: body.client,
      client_address: body.client_address,
      client_tax_id: body.client_tax_id,
      date: body.date,
      type: "quotation",
      items: body.items,
      amount: body.amount,
      tax_enabled: body.tax_enabled,
      tax_rate: body.tax_rate,
      invoice_number: invoiceNumber,

      // optional fields
      valid_until: body.valid_until || null,
      notes: body.notes || null,
      terms: body.terms || null,
      rider: body.rider || null,
      performance_type: body.performance_type || null,
      venue: body.venue || null,
      performance_time: body.performance_time || null,
      soundcheck_time: body.soundcheck_time || null,
      food_drinks: Boolean(body.food_drinks),
    };

    const { data, error } = await supabase
      .from("invoices")
      .insert(cleanData)
      .select()
      .single();

    if (error) {
      console.error("SUPABASE ERROR:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ invoice: data });

  } catch (err) {
    console.error("SERVER ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}