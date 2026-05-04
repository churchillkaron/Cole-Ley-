import OpenAI from "openai";

export async function POST(req) {
  try {
    const { image_url } = await req.json();

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
  model: "gpt-4.1",
  messages: [
    {
      role: "user",
      content: [
        {
          type: "text",
          text: `
You are analyzing a live performance image of a luxury singer.

Return STRICT JSON ONLY:

{
  "title": "...",
  "description": "...",
  "tags": ["...", "..."]
}

Rules:
- Title must sound premium and event-specific
- Description must sell to venues
- Tags must describe event type (wedding, beach club, party, lounge, luxury, DJ, etc.)
- Max 5 tags
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
    title: "Live Performance",
    description: "Luxury live performance",
    tags: [],
  });
}

return Response.json({
  title: parsed.title,
  description: parsed.description,
  tags: parsed.tags || [],
});

  } catch (err) {
    console.error(err);
    return Response.json({ error: "AI failed" }, { status: 500 });
  }
}