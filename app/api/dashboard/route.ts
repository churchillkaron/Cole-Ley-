import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // INCOME
    const { data: invoices, error: invError } = await supabase
      .from("invoices")
      .select("amount")

    if (invError) {
      return NextResponse.json({ error: invError.message }, { status: 500 })
    }

    const totalIncome = invoices.reduce(
      (sum, i) => sum + Number(i.amount || 0),
      0
    )

    // EXPENSES
    const { data: expenses, error: expError } = await supabase
      .from("expenses")
      .select("amount")

    if (expError) {
      return NextResponse.json({ error: expError.message }, { status: 500 })
    }

    const totalExpenses = expenses.reduce(
      (sum, e) => sum + Number(e.amount || 0),
      0
    )

    const profit = totalIncome - totalExpenses

    return NextResponse.json({
      totalIncome,
      totalExpenses,
      profit,
    })

  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: "server error" },
      { status: 500 }
    )
  }
}