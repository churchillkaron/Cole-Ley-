import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    // ✅ Validate input
    if (!id) {
      return NextResponse.json(
        { error: "Missing invoice id" },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from("invoices")
      .select("*")
      .eq("invoice_number", id)
      .single()

    if (error) {
      console.error("SUPABASE ERROR:", error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ invoice: data })

  } catch (err) {
    console.error("SERVER ERROR:", err)
    return NextResponse.json(
      { error: "server error" },
      { status: 500 }
    )
  }
}