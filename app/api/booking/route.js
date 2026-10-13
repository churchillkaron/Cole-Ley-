const AVANTIQO_BOOKING_INTAKE = "https://avantiqo.ai/api/public/cole-ley/booking-inquiry";

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      eventDate,
      eventStartTime,
      eventEndTime,
      location,
      eventType,
      performanceFormat,
      bookingPath,
      requestedArtistName,
      details,
      company,
    } = body;

    if (!name || !email || !eventDate) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const enrichedDetails = [
      bookingPath ? `Booking path: ${bookingPath}` : null,
      requestedArtistName ? `Preferred artist: ${requestedArtistName}` : null,
      eventType ? `Event type: ${eventType}` : null,
      eventStartTime ? `Preferred start: ${eventStartTime}` : null,
      eventEndTime ? `Preferred end: ${eventEndTime}` : null,
      performanceFormat ? `Performance format: ${performanceFormat}` : null,
      details ? `Details: ${details}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const intakeResponse = await fetch(AVANTIQO_BOOKING_INTAKE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "ColeLeyWebsite/1.0",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        eventDate,
        eventStartTime,
        eventEndTime,
        timezone_offset: "+07:00",
        location,
        bookingPath,
        eventType,
        performanceFormat,
        requestedArtistName,
        details: enrichedDetails,
        company: company || "",
      }),
      cache: "no-store",
    });

    const intake = await intakeResponse.json().catch(() => ({}));
    if (!intakeResponse.ok || !intake?.success || !intake?.inquiry_id) {
      console.error("Avantiqo booking intake failed", {
        status: intakeResponse.status,
        error: intake?.error || "unknown",
      });
      return Response.json(
        { error: "Booking could not be recorded. Please try again." },
        { status: 502 },
      );
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || "-");
    const safeDate = escapeHtml(eventDate);
    const safeLocation = escapeHtml(location || "-");
    const safeStartTime = escapeHtml(eventStartTime || "-");
    const safeEndTime = escapeHtml(eventEndTime || "-");
    const safeBookingPath = escapeHtml(bookingPath || "recommend");
    const safeRequestedArtistName = escapeHtml(requestedArtistName || "-");
    const safeEventType = escapeHtml(eventType || "-");
    const safePerformanceFormat = escapeHtml(performanceFormat || "-");
    const safeDetails = escapeHtml(details || "-").replace(/\n/g, "<br>");
    const safeBookingCode = escapeHtml(intake.booking_code || "Recorded in Avantiqo");

    return Response.json({
      success: true,
      inquiry_id: intake.inquiry_id,
      booking_code: intake.booking_code,
    });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Booking request failed" }, { status: 500 });
  }
}
