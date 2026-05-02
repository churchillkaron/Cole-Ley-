import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();

    const { name, email, phone, eventDate, location, details } = body;

    if (!name || !email || !eventDate) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    // ✅ EMAIL TO YOU
    await resend.emails.send({
      from: "Cole Ley Booking <cole@coleley.com>",
      to: "cole@coleley.com",
      subject: `New Booking Request - ${name}`,
      html: `
        <h2>New Booking Request</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone || "-"}</p>
        <p><b>Date:</b> ${eventDate}</p>
        <p><b>Location:</b> ${location || "-"}</p>
        <p><b>Details:</b><br>${details || "-"}</p>
      `,
    });

    // ✅ CONFIRMATION EMAIL TO CLIENT
    await resend.emails.send({
      from: "Cole Ley Booking <booking@coleley.com>",
      to: email,
      subject: "Booking Request Received",
      html: `
        <h2>Thank you ${name}</h2>
        <p>Your booking request has been received.</p>
        <p>We will get back to you shortly.</p>
        <br/>
        <p><b>Submitted Details:</b></p>
        <p>Date: ${eventDate}</p>
        <p>Location: ${location || "-"}</p>
      `,
    });

    return Response.json({ success: true });

  } catch (err) {
    console.error(err);
    return Response.json({ error: "Booking email failed" }, { status: 500 });
  }
}