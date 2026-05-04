import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const body = await req.json();

    // ✅ SIGN EXACTLY WHAT CLOUDINARY SENDS
    const signature = cloudinary.utils.api_sign_request(
      body,
      process.env.CLOUDINARY_API_SECRET
    );

    return Response.json({
      signature,
      timestamp: body.timestamp,
      apiKey: process.env.CLOUDINARY_API_KEY,
    });

  } catch (err) {
    console.error(err);
    return Response.json({ error: "Signature failed" }, { status: 500 });
  }
}