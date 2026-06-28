import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const invoice_number =
      body.invoice_number || body.edit;

    if (!invoice_number) {
      return NextResponse.json(
        { error: "invoice_number required" },
        { status: 400 }
      );
    }

    const update = {
      client: body.client || "",
      client_address: body.client_address || "",
      client_tax_id: body.client_tax_id || "",

      date: body.date,

      amount: Number(body.amount || 0),

      details: body.details || null,

      tax_enabled: Boolean(body.tax_enabled),
      tax_rate: Number(body.tax_rate || 0),

      items: body.items || [],
    };

    const { data, error } = await supabase
      .from("invoices")
      .update(update)
      .eq("invoice_number", invoice_number)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      invoice: data,
    });

  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
