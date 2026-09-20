import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const parts = ["hero-image-p1.txt", "hero-image-p2.txt", "hero-image-p3.txt"];
const base64 = parts.map((name) => fs.readFileSync(path.join(root, "src/data", name), "utf8").trim()).join("");
const bytes = Buffer.from(base64, "base64");

if (bytes.subarray(0, 4).toString("ascii") !== "RIFF" || bytes.subarray(8, 12).toString("ascii") !== "WEBP") {
  throw new Error("Hero asset reconstruction failed: invalid WebP header");
}
const declaredSize = bytes.readUInt32LE(4) + 8;
if (bytes.length < declaredSize) {
  throw new Error(`Hero asset reconstruction failed: expected ${declaredSize} bytes, got ${bytes.length}`);
}
fs.mkdirSync(path.join(root, "public/assets"), { recursive: true });
fs.writeFileSync(path.join(root, "public/assets/marius-hryn-hero.webp"), bytes.subarray(0, declaredSize));
console.log(`Rebuilt hero image: ${declaredSize} bytes`);
