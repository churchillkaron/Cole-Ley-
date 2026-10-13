import nodemailer from "nodemailer";

// First-party SMTP mailbox; no third-party email sending API.
async function sendOwnedBookingEmail(message) {
  const host = process.env.COLE_SMTP_HOST;
  const user = process.env.COLE_SMTP_USER;
  const password = process.env.COLE_SMTP_PASSWORD;
  if (!host || !user || !password) return false;
  const port = Number(process.env.COLE_SMTP_PORT || 465);
  const transport = nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass: password } });
  await transport.sendMail({ ...message, from: `Cole Ley Booking <${user}>` });
  return true;
}
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

    let mailNotificationsSent = false;
    try {
    const ownerSent = await sendOwnedBookingEmail({
      to: "cole@coleley.com",
      subject: `New Booking Request - ${name}`,
      html: `
        <h2>New Booking Request</h2>
        <p><b>Avantiqo:</b> ${safeBookingCode}</p>
        <p><b>Name:</b> ${safeName}</p>
        <p><b>Email:</b> ${safeEmail}</p>
        <p><b>Phone:</b> ${safePhone}</p>
        <p><b>Date:</b> ${safeDate}</p>
        <p><b>Location:</b> ${safeLocation}</p>
        <p><b>Preferred time:</b> ${safeStartTime} – ${safeEndTime}</p>
        <p><b>Booking path:</b> ${safeBookingPath}</p>
        <p><b>Preferred artist:</b> ${safeRequestedArtistName}</p>
        <p><b>Event type:</b> ${safeEventType}</p>
        <p><b>Performance format:</b> ${safePerformanceFormat}</p>
        <p><b>Details:</b><br>${safeDetails}</p>
      `,
    });

    const guestSent = await sendOwnedBookingEmail({
      to: email,
      subject: "Booking Request Received",
      html: `
        <h2>Thank you ${safeName}</h2>
        <p>Your booking request has been received.</p>
        <p>We will get back to you shortly.</p>
        <br/>
        <p><b>Submitted Details:</b></p>
        <p>Date: ${safeDate}</p>
        <p>Location: ${safeLocation}</p>
        <p>Preferred time: ${safeStartTime} – ${safeEndTime}</p>
      `,
    });
    mailNotificationsSent = ownerSent && guestSent;
    } catch (mailError) {
      console.error("Owned SMTP booking notification failed", { message: mailError?.message });
    }

    return Response.json({
      success: true,
      email_notification_sent: mailNotificationsSent,
      inquiry_id: intake.inquiry_id,
      booking_code: intake.booking_code,
    });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Booking request failed" }, { status: 500 });
  }
}
