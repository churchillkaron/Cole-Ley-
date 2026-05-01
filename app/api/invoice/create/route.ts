import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // ✅ FIRST: get body
    const body = await req.json()

    // ✅ THEN: destructure
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
    } = body

    if (!client || !amount) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      )
    }

    // ✅ DATE LOGIC
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, "0")

    // ✅ COUNT MONTHLY INVOICES
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

    // ✅ INSERT (now includes items)
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
          type,
          tax_enabled,
          tax_rate,
          items, // ✅ IMPORTANT
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

    return NextResponse.json({ invoice: data })

  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: "server error" },
      { status: 500 }
    )
  }
}