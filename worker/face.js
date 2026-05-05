import * as faceapi from "@vladmandic/face-api";
import canvas from "canvas";
import path from "path";

const { Canvas, Image, ImageData } = canvas;

// Patch environment
faceapi.env.monkeyPatch({
  Canvas,
  Image,
  ImageData,
});

let modelsLoaded = false;

async function loadModels() {
  if (modelsLoaded) return;

  const modelPath = path.join(process.cwd(), "models");

  await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath);

  modelsLoaded = true;
}
const img = await canvas.loadImage(imagePath);
// optional: improve detection by scaling
// 👉 main function
export async function detectFace(imagePath) {
  await loadModels();

  const img = await canvas.loadImage(imagePath);

  const detections = await faceapi.detectAllFaces(
  img,
  new faceapi.SsdMobilenetv1Options({
    minConfidence: 0.5,
  })
);

  if (!detections.length) return [];

  // ✅ return ALL faces (not just one)
  return detections.map((d) => ({
    x: d.box.x + d.box.width / 2,
    y: d.box.y + d.box.height / 2,
    width: d.box.width,
    height: d.box.height,
  }));
}

// 👉 CLI test
if (process.argv[2]) {
  const imgPath = process.argv[2];

  detectFace(imgPath)
    .then((res) => {
      process.stdout.write(JSON.stringify(res || []));
      process.exit(0);
    })
    .catch(() => {
      process.stdout.write("[]");
      process.exit(0);
    });
}