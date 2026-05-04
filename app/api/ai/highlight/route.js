import OpenAI from "openai";

export async function POST(req) {
  try {
    const { video_url } = await req.json();

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    // ✅ Extract public_id safely
    const match = video_url.match(/\/upload\/(?:v\d+\/)?(.+)\.\w+$/);
    const publicId = match ? match[1] : null;

    if (!publicId) {
      return Response.json({ offset: 6 });
    }

    // 🔥 Slightly better spread
    const timestamps = [2, 4, 6, 8, 10];

    const frames = timestamps.map(
      (t) =>
        `https://res.cloudinary.com/${cloudName}/video/upload/so_${t},w_500/${publicId}.jpg`
    );

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4.1",
      temperature: 0.2, // 🔥 more consistent decisions
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `
You are selecting the BEST frame from a live luxury performance video.

Return STRICT JSON ONLY:
{ "index": number }

Selection rules:
- Performer must be clearly visible
- Prefer expressive / emotional moment
- Avoid empty stage
- Avoid blurry frames
- Avoid dark lighting
- Prefer audience interaction or performance peak
- Choose frame that looks most premium / expensive

Index must be between 0 and 4.
              `,
            },
            ...frames.map((url) => ({
              type: "image_url",
              image_url: { url },
            })),
          ],
        },
      ],
    });

    const text = response.choices[0].message.content;

    let index = 2;

    try {
      const parsed = JSON.parse(text);

      if (
        typeof parsed.index === "number" &&
        parsed.index >= 0 &&
        parsed.index <= 4
      ) {
        index = parsed.index;
      }
    } catch {
      console.warn("AI parsing failed, fallback used");
    }

    const offset = timestamps[index] || 6;

    return Response.json({ offset });

  } catch (err) {
    console.error("HIGHLIGHT AI ERROR:", err);
    return Response.json({ offset: 6 });
  }
}