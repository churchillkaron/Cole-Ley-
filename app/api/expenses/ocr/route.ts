import { NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const base64 = Buffer.from(bytes).toString("base64")

    console.log("OCR START")

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
Extract data from Thai bank payment slip.

Rules:
- person = RECEIVER (who got paid)
- amount = number only (no commas, no THB)
- date = YYYY-MM-DD
- reference = any reference number
- category = supplier | salary | utilities | other

Return ONLY JSON:
{
  "person": "",
  "amount": 0,
  "date": "",
  "reference": "",
  "category": ""
}
          `.trim(),
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Extract receiver name, amount, date, reference and category.",
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${file.type};base64,${base64}`,
              },
            },
          ],
        } as any, // 👈 FIX TS error
      ],
    })

    const raw = response.choices?.[0]?.message?.content || ""

    console.log("OCR RAW:", raw)

    // ✅ CLEAN JSON (remove ```json blocks)
    let cleaned = raw.trim()

    if (cleaned.startsWith("```")) {
      cleaned = cleaned
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim()
    }

    console.log("OCR CLEANED:", cleaned)

    let parsed

    try {
      parsed = JSON.parse(cleaned)
    } catch (err) {
      console.error("JSON parse failed:", cleaned)

      return NextResponse.json(
        { error: "Invalid OCR JSON", raw: cleaned },
        { status: 500 }
      )
    }

    return NextResponse.json({ data: parsed })

  } catch (err) {
    console.error("OCR ERROR:", err)

    return NextResponse.json(
      { error: "OCR failed" },
      { status: 500 }
    )
  }
}