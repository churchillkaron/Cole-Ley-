import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // 1. Find quotation
    const { data: quotation } = await supabase
      .from("quotations")
      .select("*")
      .eq("approval_token", token)
      .single();

    if (!quotation) {
      return NextResponse.json({ error: "Invalid token" }, { status: 404 });
    }

    // 2. Mark approved
    await supabase
      .from("quotations")
      .update({ status: "approved" })
      .eq("id", quotation.id);

    // 3. Convert → invoice (reuse logic)
    const { data: invoice } = await supabase
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
        source_quotation_number: quotation.quotation_number,
      })
      .select()
      .single();

    return NextResponse.json({ invoice });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}