export const runtime = "nodejs";
const AVANTIQO_BOOKING_INTAKE = "https://avantiqo.ai/api/public/cole-ley/booking-inquiry";

// Avantiqo owns the durable booking and its one-time organization-branded
// notifications. The website only validates and forwards the request.
export async function POST(req) {
  try {
    const raw = await req.text();
    if (!raw || raw.length > 12000) return Response.json({ error: "INVALID_REQUEST_SIZE" }, { status: 400 });
    let body;
    try { body = JSON.parse(raw); } catch { return Response.json({ error: "INVALID_JSON" }, { status: 400 }); }
    if (!body?.name || !body?.email || !body?.eventDate) return Response.json({ error: "Missing required fields" }, { status: 400 });
    const response = await fetch(AVANTIQO_BOOKING_INTAKE, {
      method: "POST",
      headers: { "Content-Type": "application/json", "User-Agent": "ColeLeyWebsite/1.0" },
      body: raw,
      cache: "no-store",
    });
    const result = await response.json().catch(() => ({}));
    return Response.json(result, { status: response.status });
  } catch (error) {
    console.error("COLE_LEY_AVANTIQO_BOOKING_FAILED", error?.message || "UNAVAILABLE");
    return Response.json({ error: "Booking service is temporarily unavailable. Please try again." }, { status: 503 });
  }
}
