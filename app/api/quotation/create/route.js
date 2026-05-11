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

    // ==========================================
    // GET LATEST QUOTATION NUMBER
    // ==========================================

    const { data: last, error: lastError } = await supabase
      .from("quotations")
      .select("quotation_number")
      .ilike("quotation_number", `QT-${year}-%`)
      .order("quotation_number", { ascending: false })
      .limit(1);

    if (lastError) {
      console.error("FETCH LAST QUOTATION ERROR:", lastError);

      return NextResponse.json(
        { error: lastError.message },
        { status: 400 }
      );
    }

    let nextNumber = 1;

    if (last && last.length > 0) {
      const lastNum = parseInt(
        last[0].quotation_number.split("-")[2]
      );

      nextNumber = lastNum + 1;
    }

    const padded = String(nextNumber).padStart(4, "0");

    // QT-2026-0001
    const quotation_number = `QT-${year}-${padded}`;

    // ==========================================
    // CLEAN DATA
    // ==========================================

    const cleanData = {
      quotation_number,

      client: body.client || "",
      client_address: body.client_address || "",
      client_tax_id: body.client_tax_id || "",

      date: body.date,

      type: "quotation",

      items: body.items || [],

      amount: Number(body.amount || 0),

      tax_enabled: Boolean(body.tax_enabled),
      tax_rate: Number(body.tax_rate || 0),

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

    // ==========================================
    // INSERT QUOTATION
    // ==========================================

    const { data, error } = await supabase
      .from("quotations")
      .insert(cleanData)
      .select()
      .single();

    if (error) {
      console.error("SUPABASE ERROR:", error);

      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      quotation: data,
    });

  } catch (err) {
    console.error("SERVER ERROR:", err);

    return NextResponse.json(
      {
        error: err.message || "Server Error",
      },
      { status: 500 }
    );
  }
}