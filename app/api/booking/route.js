import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
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
    const { name, email, phone, eventDate, location, details, company } = body;

    if (!name || !email || !eventDate) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

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
        location,
        details,
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
    const safeDetails = escapeHtml(details || "-").replace(/\n/g, "<br>");
    const safeBookingCode = escapeHtml(intake.booking_code || "Recorded in Avantiqo");

    await resend.emails.send({
      from: "Cole Ley Booking <cole@coleley.com>",
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
        <p><b>Details:</b><br>${safeDetails}</p>
      `,
    });

    await resend.emails.send({
      from: "Cole Ley Booking <booking@coleley.com>",
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
      `,
    });

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
