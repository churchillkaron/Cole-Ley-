import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req) {
  try {
    const body = await req.json();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const quotation_number =
      body.quotation_number || body.edit;

    if (!quotation_number) {
      return NextResponse.json(
        { error: "quotation_number required" },
        { status: 400 }
      );
    }

    const update = {
      client: body.client || "",
      client_address: body.client_address || "",
      client_tax_id: body.client_tax_id || "",
      date: body.date,

      items: body.items || [],
      amount: Number(body.amount || 0),

      tax_enabled: Boolean(body.tax_enabled),
      tax_rate: Number(body.tax_rate || 0),

      valid_until: body.valid_until || null,
      notes: body.notes || "",
      terms: body.terms || "",

      rider: body.rider || "",
      performance_type: body.performance_type || "",
      venue: body.venue || "",
      performance_time: body.performance_time || "",
      soundcheck_time: body.soundcheck_time || "",

      food_drinks: Boolean(body.food_drinks),
    };

    const { data, error } = await supabase
      .from("quotations")
      .update(update)
      .eq("quotation_number", quotation_number)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      quotation: data,
    });

  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
