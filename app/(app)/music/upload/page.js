"use client";

import { useState } from "react";
import { getSupabase } from "@/lib/supabase";

export default function UploadPerformancePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [style, setStyle] = useState("gold");

  function getLuxuryStyle(style) {
    const styles = {
      gold: [
        "e_contrast:28",
        "e_brightness:-8",
        "e_saturation:12",
        "e_vignette:40",
        "e_sharpen:60",
        "e_grain:20",
        "e_colorize:8,co_rgb:3b2f16",
      ],
      beach: [
        "e_brightness:6",
        "e_contrast:18",
        "e_saturation:18",
        "e_vignette:18",
        "e_sharpen:45",
        "e_grain:10",
      ],
      wedding: [
        "e_brightness:8",
        "e_contrast:16",
        "e_saturation:8",
        "e_vignette:20",
        "e_sharpen:35",
        "e_grain:8",
        "e_fade:10",
      ],
      nightclub: [
        "e_brightness:-14",
        "e_contrast:34",
        "e_saturation:20",
        "e_vignette:50",
        "e_sharpen:65",
        "e_grain:22",
      ],
      blackwhite: [
        "e_grayscale",
        "e_contrast:30",
        "e_brightness:-4",
        "e_vignette:45",
        "e_sharpen:55",
        "e_grain:25",
      ],
    };

    return styles[style || "gold"].join(",");
  }

  async function getBestFrame(videoUrl) {
    try {
      const res = await fetch("/api/ai/highlight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ video_url: videoUrl }),
      });

      const data = await res.json();
      return data.offset || 6;
    } catch {
      return 6;
    }
  }

  async function handleUpload() {
    const supabase = getSupabase();

    if (!supabase) {
      alert("Supabase not connected");
      return;
    }

    if (!videoFile) {
      alert("Select a video first");
      return;
    }

    try {
      setLoading(true);
      setStatus("Uploading & processing video...");

      const formData = new FormData();
      formData.append("file", videoFile);

      const res = await fetch("/api/upload-video", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      const videoUrl = data.video_url;
      const publicId = data.public_id;
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

      setStatus("Analyzing best frame...");

      const offset = await getBestFrame(videoUrl);
      const base = `https://res.cloudinary.com/${cloudName}/video/upload`;
      const logo = "jm4sawywgxu4anz4anji";

      const thumbnailUrl = `${base}/so_${offset},c_fit,b_black,w_900,h_900,q_auto:good/${publicId}.jpg`;

      let aiTitle = "LIVE PERFORMANCE";

      try {
        setStatus("Generating AI title...");

        const textRes = await fetch("/api/ai/describe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image_url: thumbnailUrl }),
        });

        const textData = await textRes.json();
        aiTitle = textData.title || "LIVE PERFORMANCE";
      } catch {
        aiTitle = "LIVE PERFORMANCE";
      }

      const finalTitle = title || aiTitle;

      // ✅ FIXED TRANSFORM SYSTEM
      const luxuryStyle = getLuxuryStyle(style);
      const baseTransform = "q_auto:good";
      const styleTransform = luxuryStyle;
      const logoLayer = `l_${logo},h_220,c_fit`;
      const logoApply = `fl_layer_apply,g_south,y_30`;

      // ✅ VIDEO VARIANTS (FIXED)
      const previewUrl =
        `${base}/so_${offset},c_fit,b_black,w_720,h_720/${baseTransform}/${styleTransform}` +
        `/${logoLayer}/${logoApply}/${publicId}.mp4`;

      const cinematicUrl =
  `${base}/c_fill,g_auto,w_1280,h_720/${baseTransform}/${styleTransform}` +
  `/l_${logo},h_360,c_fit/fl_layer_apply,g_south_west,x_20,y_20/${publicId}.mp4`;
      const reelUrl =
        `${base}/c_fill,g_auto,w_720,h_1280/${baseTransform}/${styleTransform}` +
        `/l_${logo},h_360,c_fit/fl_layer_apply,g_south,y_35/${publicId}.mp4`;

      await new Promise((res) => setTimeout(res, 8000));

      await supabase.from("music").insert({
        title: finalTitle,
        description,
        video_url: cinematicUrl,
        thumbnail_url: thumbnailUrl,
        preview_url: previewUrl,
        cinematic_url: cinematicUrl,
        reel_url: reelUrl,
      });

      setStatus("Done ✅");
      alert("Uploaded successfully");

      setVideoFile(null);
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error(err);
      alert(err.message);
      setStatus("Failed ❌");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex justify-center px-4 py-10">
      <div className="w-full max-w-2xl">
        <h1 className="text-center text-[#d4af37] tracking-[0.35em] text-xl mb-8">
          UPLOAD PERFORMANCE
        </h1>

        <div className="rounded-3xl p-8 space-y-6 bg-white/5 backdrop-blur-2xl border border-white/10">
          <input
            className="w-full p-3 rounded-xl bg-black/40 border border-white/15"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="w-full p-3 rounded-xl bg-black/40 border border-white/15"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="w-full p-3 rounded-xl bg-black/40 border border-white/15 text-white"
          >
            <option value="gold">Gold Luxury</option>
            <option value="beach">Beach Club</option>
            <option value="wedding">Wedding Elegant</option>
            <option value="nightclub">Nightclub Energy</option>
            <option value="blackwhite">Black & White Cinematic</option>
          </select>

          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
            className="w-full text-white"
          />

          {videoFile && (
            <video
              src={URL.createObjectURL(videoFile)}
              className="w-full rounded-xl"
              controls
            />
          )}

          <div className="text-center text-sm text-white/50">{status}</div>

          <button
            onClick={handleUpload}
            disabled={loading}
            className="w-full py-4 rounded-xl bg-[#d4af37] text-black font-semibold disabled:opacity-50"
          >
            {loading ? "PROCESSING..." : "UPLOAD VIDEO"}
          </button>
        </div>
      </div>
    </div>
  );
}