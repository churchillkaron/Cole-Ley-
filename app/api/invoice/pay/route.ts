import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { invoice_number } = body

    if (!invoice_number) {
      return NextResponse.json(
        { error: "Missing invoice_number" },
        { status: 400 }
      )
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const year = new Date().getFullYear()

    const { data: latestReceipt } = await supabase
      .from("invoices")
      .select("receipt_number")
      .not("receipt_number", "is", null)
      .ilike("receipt_number", `RC-${year}-%`)
      .order("receipt_number", { ascending: false })
      .limit(1)
      .maybeSingle()

    let nextNumber = 1

    if (latestReceipt?.receipt_number) {
      const parts = latestReceipt.receipt_number.split("-")
      nextNumber = parseInt(parts[2] || "0") + 1
    }

    const receipt_number =
      `RC-${year}-${String(nextNumber).padStart(4, "0")}`

    const { data, error } = await supabase
      .from("invoices")
      .update({
        status: "paid",
        paid_date: new Date().toISOString().split("T")[0],
        receipt_number,
      })
      .eq("invoice_number", invoice_number)
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      invoice: data,
    })

  } catch (err: any) {
    return NextResponse.json(
      {
        error: err?.message || "server error",
      },
      { status: 500 }
    )
  }
}
