import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { data, error } = await supabase
      .from("invoices")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error(error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ invoices: data })

  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: "server error" },
      { status: 500 }
    )
  }
}