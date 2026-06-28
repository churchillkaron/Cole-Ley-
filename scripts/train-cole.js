import fs from "fs";
import { createClient } from "@supabase/supabase-js";
import ws from "ws";
import { detectFace } from "../worker/face.js";

const env = fs.readFileSync(".env.local", "utf8");

for (const line of env.split("\n")) {
  const l = line.trim();
  if (!l || l.startsWith("#") || !l.includes("=")) continue;

  const i = l.indexOf("=");
  process.env[l.slice(0, i)] = l.slice(i + 1);
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    realtime: {
      transport: ws
    }
  }
);

const images = [
  "public/IMG_7180.JPG",
  "public/IMG_7181.JPG",
  "public/1.JPG",
  "public/2.JPG",
  "public/3.JPG",
];

for (const image of images) {
  console.log("Training:", image);

  const faces = await detectFace(image);

  if (!faces.length) {
    console.log("No face found:", image);
    continue;
  }

  const { error } = await supabase
    .from("artist_faces")
    .insert({
      artist_name: "Cole Ley",
      image_url: image,
      descriptor: faces[0].descriptor,
    });

  if (error) {
    console.error(error);
  } else {
    console.log("Saved:", image);
  }
}

console.log("DONE");
process.exit(0);
