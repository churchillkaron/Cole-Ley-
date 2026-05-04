"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";

function VideoSwitcher({ item }) {
  const [active, setActive] = useState(null);
  const [error, setError] = useState(false);

  const getVideo = () => {
    if (active === "original") return item.video_url;
    if (active === "cinematic") return item.cinematic_url;
    if (active === "reel") return item.reel_url;
    if (active === "preview") return item.preview_url;
    return null;
  };

  const videoSrc = getVideo();

  const buttonStyle = (type) =>
    `px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 backdrop-blur-md border ${
      active === type
        ? "bg-[#d4af37]/90 text-black border-[#d4af37] shadow-[0_0_12px_rgba(212,175,55,0.6)]"
        : "bg-white/5 text-white border-white/10 hover:bg-white/10 hover:border-[#d4af37]/50"
    }`;

  return (
    <div className="mb-4">
      {/* DISPLAY */}
      {!videoSrc || error ? (
        <img
          src={item.thumbnail_url}
          className="w-full rounded-xl mb-3"
        />
      ) : (
        <video
          key={active}
          src={videoSrc}
          controls
          playsInline
          muted
          preload="metadata"
          className="w-full rounded-xl mb-3"
          onError={() => setError(true)}
        />
      )}

      {/* BUTTONS */}
      <div className="flex gap-2 flex-wrap mt-2">
        {item.preview_url && (
          <button
            onClick={() => {
              setError(false);
              setActive("preview");
            }}
            className={buttonStyle("preview")}
          >
            Preview
          </button>
        )}

        {item.video_url && (
          <button
            onClick={() => {
              setError(false);
              setActive("original");
            }}
            className={buttonStyle("original")}
          >
            Original
          </button>
        )}

        {item.cinematic_url && (
          <button
            onClick={() => {
              setError(false);
              setActive("cinematic");
            }}
            className={buttonStyle("cinematic")}
          >
            Cinematic
          </button>
        )}

        {item.reel_url && (
          <button
            onClick={() => {
              setError(false);
              setActive("reel");
            }}
            className={buttonStyle("reel")}
          >
            Reel
          </button>
        )}
      </div>
    </div>
  );
}

export default function ContentDashboard() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadContent();
  }, []);

  async function loadContent() {
    const supabase = getSupabase();

    const { data } = await supabase
      .from("music")
      .select("*")
      .order("created_at", { ascending: false });

    setItems(data || []);
  }

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-[#d4af37] text-xl mb-6 tracking-[0.3em] text-center">
        CONTENT DASHBOARD
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white/5 p-5 rounded-2xl border border-white/10 backdrop-blur-xl shadow-lg"
          >
            <h2 className="text-lg font-semibold mb-1 text-white">
              {item.title}
            </h2>

            <p className="text-sm text-white/60 mb-3">
              {item.description}
            </p>

            <div className="flex gap-2 flex-wrap text-xs mb-4">
              {item.tags?.map((t) => (
                <span
                  key={t}
                  className="px-2 py-1 bg-white/10 rounded-md backdrop-blur-sm"
                >
                  {t}
                </span>
              ))}
            </div>

            <VideoSwitcher item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}