import OpenAI from "openai";

export async function POST(req) {
  try {
    const { image_url } = await req.json();

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4.1",
      temperature: 0.7,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `
You are creating premium content for a luxury live performer.

Return STRICT JSON ONLY:

{
  "title": "...",
  "description": "...",
  "tags": ["...", "..."]
}

RULES:

TITLE:
- Must feel high-end, exclusive, and event-driven
- Avoid generic titles like "Live Performance"
- Examples tone: 
  "Sunset Lounge Vocal Set"
  "High-Energy Beach Club Performance"
  "Elegant Wedding Evening Performance"

DESCRIPTION:
- Must SELL to venues (hotels, beach clubs, weddings)
- Focus on atmosphere, crowd engagement, and experience
- Keep it short but powerful (1–2 sentences)

TAGS:
- Max 5 tags
- Must be event/venue relevant
- Examples:
  ["wedding", "beach club", "lounge", "party", "luxury", "dj", "sunset"]

IMPORTANT:
- Do NOT include explanations
- Do NOT include markdown
- JSON only
              `,
            },
            {
              type: "image_url",
              image_url: { url: image_url },
            },
          ],
        },
      ],
    });

    const text = response.choices[0].message.content;

    let parsed;

    try {
      parsed = JSON.parse(text);
    } catch {
      return Response.json({
        title: "Luxury Live Performance",
        description: "Premium live music experience designed for high-end venues.",
        tags: ["luxury"],
      });
    }

    return Response.json({
      title: parsed.title || "Luxury Live Performance",
      description:
        parsed.description ||
        "Premium live music experience designed for high-end venues.",
      tags: Array.isArray(parsed.tags) ? parsed.tags.slice(0, 5) : [],
    });

  } catch (err) {
    console.error(err);
    return Response.json(
      {
        title: "Luxury Live Performance",
        description: "Premium live music experience designed for high-end venues.",
        tags: ["luxury"],
      },
      { status: 500 }
    );
  }
}