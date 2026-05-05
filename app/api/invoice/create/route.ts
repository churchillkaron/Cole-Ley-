import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"
import crypto from "crypto"

export async function POST(req: Request) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const body = await req.json()

    const {
      client,
      client_address,
      client_tax_id,
      date,
      amount,
      details,
      type,
      tax_enabled,
      tax_rate,
      items,

      // ✅ NEW FIELDS
      valid_until,
      notes,
      terms,
    } = body

    if (!client || !amount) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      )
    }

    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, "0")

    // ===============================
    // ✅ QUOTATION LOGIC (UPDATED)
    // ===============================
    if (type === "quotation") {

      const { count, error: countError } = await supabase
        .from("quotations")
        .select("*", { count: "exact", head: true })
        .ilike("quotation_number", `QUO-${year}-${month}-%`)

      if (countError) {
        return NextResponse.json(
          { error: countError.message },
          { status: 500 }
        )
      }

      const nextNumber = (count || 0) + 1
      const padded = String(nextNumber).padStart(4, "0")

      const quotation_number = `QT-${year}-${padded}`

      const { data, error } = await supabase
        .from("quotations")
        .insert([
          {
            quotation_number,
            client,
            client_address,
            client_tax_id,
            date,
            amount,
            details,
            type: "quotation",
            tax_enabled,
            tax_rate,
            items,

            // 🔥 NEW SYSTEM FIELDS
            approval_token: crypto.randomUUID(),
            status: "sent",

            // 🔥 NEW QUOTATION FIELDS
            valid_until: valid_until || null,
            notes: notes || "",
            terms: terms || "",
          },
        ])
        .select()
        .single()

      if (error) {
        console.error(error)
        return NextResponse.json(
          { error: error.message },
          { status: 500 }
        )
      }

      // ✅ NORMALIZED RESPONSE (IMPORTANT)
      return NextResponse.json({
        invoice: {
          ...data,
          invoice_number: quotation_number,
          type: "quotation",
        }
      })
    }

    // ===============================
    // ✅ INVOICE LOGIC (UNCHANGED)
    // ===============================

    const { count, error: countError } = await supabase
      .from("invoices")
      .select("*", { count: "exact", head: true })
      .ilike("invoice_number", `CL-${year}-${month}-%`)

    if (countError) {
      return NextResponse.json(
        { error: countError.message },
        { status: 500 }
      )
    }

    const nextNumber = (count || 0) + 1
    const padded = String(nextNumber).padStart(3, "0")

    const invoice_number = `CL-${year}-${month}-${padded}`

    const { data, error } = await supabase
      .from("invoices")
      .insert([
        {
          invoice_number,
          client,
          client_address,
          client_tax_id,
          date,
          amount,
          details,
          type: "invoice",
          tax_enabled,
          tax_rate,
          items,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error(error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      invoice: {
        ...data,
        type: "invoice"
      }
    })

  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: "server error" },
      { status: 500 }
    )
  }
}