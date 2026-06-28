export const runtime = "nodejs";

import { execFile } from "child_process";
import { promisify } from "util";
import { TextEncoder } from "util";
import { v2 as cloudinary } from "cloudinary";
import ffmpeg from "fluent-ffmpeg";
import fs from "fs";
import path from "path";
import os from "os";

const execFileAsync = promisify(execFile);
globalThis.TextEncoder = TextEncoder;

// Local Mac ffmpeg path
ffmpeg.setFfmpegPath("/opt/homebrew/bin/ffmpeg");

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  let inputPath = "";
  let outputPath = "";
  let framesDir = "";

  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return Response.json({ error: "No file uploaded" }, { status: 400 });
    }

    const stamp = Date.now();

    inputPath = path.join(os.tmpdir(), `input-${stamp}.mov`);
    outputPath = path.join(os.tmpdir(), `output-${stamp}.mp4`);
    framesDir = path.join(os.tmpdir(), `frames-${stamp}`);

    fs.mkdirSync(framesDir, { recursive: true });

    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(inputPath, buffer);

    console.log("Extracting frames...");

    await new Promise((resolve, reject) => {
      ffmpeg(inputPath)
        .output(path.join(framesDir, "frame-%03d.jpg"))
        .outputOptions(["-vf fps=1"])
        .on("end", resolve)
        .on("error", reject)
        .run();
    });

    console.log("Detecting faces...");

    const positions = [];

    const files = fs
      .readdirSync(framesDir)
      .filter((f) => f.toLowerCase().endsWith(".jpg"))
      .sort();

    for (const frameFile of files) {
      const fullPath = path.join(framesDir, frameFile);

      try {
        const { stdout } = await execFileAsync("node", [
          "worker/face.js",
          fullPath,
        ]);

        const clean = String(stdout || "").trim().split("\n").pop();

        let faces = [];

        try {
          faces = JSON.parse(clean || "[]");
        } catch {
          faces = [];
        }

        if (Array.isArray(faces)) {
          faces.forEach((face) => {
            if (face && typeof face.x === "number") {
              positions.push(face);
            }
          });
        }
      } catch (err) {
        console.error("Face worker error:", err);
      }
    }

    console.log("TOTAL FACES FOUND:", positions.length);

    const validPositions = positions.filter(
      (p) => p && typeof p.x === "number" && Number.isFinite(p.x)
    );

    if (validPositions.length === 0) {
      console.warn("No faces detected, using center fallback");
      validPositions.push({ x: 250, y: 0 });
    }

    const avgX =
      validPositions.reduce((sum, face) => sum + face.x, 0) /
      validPositions.length;

    const frameWidth = 500;
    const videoWidth = 1280;
    const cropWidth = 720;

    const scaledX = (avgX / frameWidth) * videoWidth;

    const cropX = Math.max(
      0,
      Math.min(videoWidth - cropWidth, Math.floor(scaledX - cropWidth / 2))
    );

    console.log("SCALED X:", scaledX);
    console.log("FINAL cropX:", cropX);

    await new Promise((resolve, reject) => {
      ffmpeg(inputPath)
        .outputOptions([
          `-vf scale=1280:-1,crop=720:1280:${cropX}:0`,
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
        .on("start", (cmd) => console.log("FFmpeg:", cmd))
        .on("end", resolve)
        .on("error", reject)
        .save(outputPath);
    });

    console.log("Uploading...");

    const result = await cloudinary.uploader.upload(outputPath, {
      resource_type: "video",
      folder: "coleley",
      format: "mp4",
    });

    return Response.json({
      video_url: result.secure_url,
      cinematic_url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (err) {
    console.error("UPLOAD ERROR:", err);

    return Response.json(
      {
        error: err.message || "Upload failed",
        details: err.toString(),
      },
      { status: 500 }
    );
  } finally {
    try {
      if (inputPath && fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
      if (outputPath && fs.existsSync(outputPath)) fs.unlinkSync(outputPath);

      if (framesDir && fs.existsSync(framesDir)) {
        fs.readdirSync(framesDir).forEach((f) => {
          fs.unlinkSync(path.join(framesDir, f));
        });
        fs.rmdirSync(framesDir);
      }
    } catch (cleanupErr) {
      console.warn("Cleanup warning:", cleanupErr);
    }
  }
}