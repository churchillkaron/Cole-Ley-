const AVANTIQO_LIVE_DATES = "https://avantiqo.ai/api/public/cole-ley/live-dates";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const response = await fetch(AVANTIQO_LIVE_DATES, {
      headers: { "User-Agent": "ColeLeyWebsite/1.0" },
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      return Response.json({ events: [], availability: [], source: "unavailable" }, { status: 200 });
    }

    const payload = await response.json();
    return Response.json(
      {
        events: Array.isArray(payload?.events) ? payload.events : [],
        availability: Array.isArray(payload?.availability) ? payload.availability : [],
        source: "Avantiqo Artist Agency",
        generated_at: payload?.generated_at || null,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=900",
        },
      },
    );
  } catch {
    return Response.json({ events: [], availability: [], source: "unavailable" }, { status: 200 });
  }
}
