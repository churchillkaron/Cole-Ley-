

export const runtime = "nodejs";

import { TextEncoder } from "util";
globalThis.TextEncoder = TextEncoder;
import { v2 as cloudinary } from "cloudinary";
import ffmpeg from "fluent-ffmpeg";
import fs from "fs";
import path from "path";
import os from "os";
//import { detectFace } from "../../lib/face";


// ✅ FFmpeg path
ffmpeg.setFfmpegPath("/opt/homebrew/bin/ffmpeg");

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return Response.json({ error: "No file uploaded" }, { status: 400 });
    }

    const inputPath = path.join(os.tmpdir(), `input-${Date.now()}.mov`);
    const outputPath = path.join(os.tmpdir(), `output-${Date.now()}.mp4`);
    const framesDir = path.join(os.tmpdir(), `frames-${Date.now()}`);

    fs.mkdirSync(framesDir);

    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(inputPath, buffer);

    console.log("🎬 Extracting frames...");

    // 1️⃣ Extract frames (1 fps)
    await new Promise((resolve, reject) => {
      ffmpeg(inputPath)
        .output(`${framesDir}/frame-%03d.jpg`)
        .outputOptions(["-vf fps=1"])
        .on("end", resolve)
        .on("error", reject)
        .run();
    });

    console.log("🧠 Detecting faces...");

    // 2️⃣ Detect faces
    const positions = [];
    const files = fs.readdirSync(framesDir);

    for (const file of files) {
      const fullPath = path.join(framesDir, file);

      try {
        const face = await detectFace(fullPath);

        console.log("Frame:", file, "Face:", face); // ✅ DEBUG

        if (face) {
          positions.push(face);
        }
      } catch (err) {
        console.warn("Face detection failed:", file);
      }
    }

    // 3️⃣ Fallback if no faces
    if (!positions.length) {
      console.warn("⚠️ No faces detected, using fallback");
      positions.push({ x: 300, y: 0 });
    }

    // 4️⃣ Calculate average X
    const avgX =
      positions.reduce((sum, f) => sum + f.x, 0) / positions.length;

    const cropX = Math.max(0, Math.floor(avgX - 360));

    console.log("🎯 Crop position:", cropX);

    console.log("🔄 Rendering cinematic video...");

    // 5️⃣ Apply crop + quality
    await new Promise((resolve, reject) => {
      ffmpeg(inputPath)
        .outputOptions([
          `-vf crop=720:1280:${cropX}:0`,
          "-c:v libx264",
          "-preset medium",
          "-crf 20",
          "-profile:v high",
          "-level 4.1",
          "-pix_fmt yuv420p",
          "-movflags +faststart",
          "-c:a aac",
          "-b:a 192k",
          "-af loudnorm=I=-16:TP=-1.5:LRA=11,acompressor=threshold=-14dB:ratio=2:attack=200:release=1000",
          "-max_muxing_queue_size 1024",
        ])
        .on("start", (cmd) => {
          console.log("FFmpeg command:", cmd);
        })
        .on("end", () => {
          console.log("✅ Cinematic render complete");
          resolve();
        })
        .on("error", (err) => {
          console.error("❌ FFmpeg ERROR:", err);
          reject(err);
        })
        .save(outputPath);
    });

    console.log("☁️ Uploading to Cloudinary...");

    const result = await cloudinary.uploader.upload(outputPath, {
      resource_type: "video",
      folder: "coleley",
      format: "mp4",
    });

    // 🧹 cleanup
    try {
      if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
      if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);

      fs.readdirSync(framesDir).forEach((f) =>
        fs.unlinkSync(path.join(framesDir, f))
      );
      fs.rmdirSync(framesDir);
    } catch (cleanupErr) {
      console.warn("Cleanup warning:", cleanupErr);
    }

    return Response.json({
      video_url: result.secure_url,
      public_id: result.public_id,
    });

  } catch (err) {
    console.error("UPLOAD API ERROR:", err);

    return Response.json(
      {
        error: err.message || "Upload failed",
        details: err.toString(),
      },
      { status: 500 }
    );
  }
}