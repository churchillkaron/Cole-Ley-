import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const supabase = createClient(
      process.env.SUPABASE_URL as string,
      process.env.SUPABASE_SERVICE_ROLE_KEY as string
    )

    console.log("CREATE API HIT")

    const formData = await req.formData()

    const person = (formData.get("person") as string) || ""
    const amountRaw = formData.get("amount")
    const date = (formData.get("date") as string) || null
    const note = (formData.get("note") as string) || null
    const category = (formData.get("category") as string) || null
    const reference = (formData.get("reference") as string) || null

    const file = formData.get("file") as File | null

    const cleanedAmount = String(amountRaw || "")
      .replace(/,/g, "")
      .replace(/[^\d.]/g, "")

    const amount = Number(cleanedAmount)

    if (!person || isNaN(amount) || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid person or amount" },
        { status: 400 }
      )
    }

    let file_url: string | null = null

    // ✅ Upload file (same logic, just safer env)
    if (file && typeof file !== "string" && file.size > 0) {
      const fileName = `${Date.now()}-${file.name}`

      const { error: uploadError } = await supabase.storage
        .from("expenses")
        .upload(fileName, file)

      if (uploadError) {
        console.error("UPLOAD ERROR:", uploadError)
        return NextResponse.json(
          { error: uploadError.message },
          { status: 500 }
        )
      }

      file_url = `${process.env.SUPABASE_URL}/storage/v1/object/public/expenses/${fileName}`
    }

    const insertPayload = {
      person,
      amount,
      date,
      note,
      category,
      reference,
      file_url,
    }

    console.log("INSERT PAYLOAD:", insertPayload)

    const { data, error } = await supabase
      .from("expenses")
      .insert([insertPayload])
      .select()
      .single()

    if (error) {
      console.error("INSERT ERROR FULL:", error)

      return NextResponse.json(
        { error: error.message, details: error },
        { status: 500 }
      )
    }

    console.log("INSERT SUCCESS:", data)

    return NextResponse.json({ expense: data })

  } catch (err) {
    console.error("SERVER ERROR:", err)

    return NextResponse.json(
      { error: "server error" },
      { status: 500 }
    )
  }
}