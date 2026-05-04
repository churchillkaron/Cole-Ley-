import * as faceapi from "@vladmandic/face-api";
import canvas from "canvas";



const { Canvas, Image, ImageData } = canvas;

faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

let loaded = false;

export async function loadModels() {
  if (loaded) return;

  await faceapi.nets.tinyFaceDetector.loadFromDisk(process.cwd() + "/models");
  loaded = true;
}

export async function detectFace(imagePath) {
  await loadModels();

  const img = await canvas.loadImage(imagePath);

  const detections = await faceapi.detectAllFaces(
    img,
    new faceapi.TinyFaceDetectorOptions()
  );

  if (!detections.length) return null;

  const box = detections[0].box;

  return {
    x: box.x,
    y: box.y,
    width: box.width,
    height: box.height,
  };
}