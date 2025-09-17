// compress-images.js
import fs from "fs";
import path from "path";
import sharp from "sharp";

// Function to recursively compress images in a folder
const compressDir = async (dir) => {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      await compressDir(filePath); // recurse into subfolders
    } else if (/\.(jpg|jpeg)$/i.test(file)) {
      // Compress JPEGs
      await sharp(filePath)
        .jpeg({ quality: 70 }) // adjust quality
        .toFile(filePath + ".tmp");

      fs.renameSync(filePath + ".tmp", filePath); // overwrite original
      console.log(`✅ Compressed JPEG: ${filePath}`);
    } else if (/\.png$/i.test(file)) {
      // Compress PNGs (convert to PNG again)
      await sharp(filePath)
        .png({ quality: 70, compressionLevel: 9 })
        .toFile(filePath + ".tmp");

      fs.renameSync(filePath + ".tmp", filePath);
      console.log(`✅ Compressed PNG: ${filePath}`);
    } else if (/\.webp$/i.test(file)) {
      // If you have WebP images
      await sharp(filePath)
        .webp({ quality: 70 })
        .toFile(filePath + ".tmp");

      fs.renameSync(filePath + ".tmp", filePath);
      console.log(`✅ Compressed WebP: ${filePath}`);
    } else {
      // Skip SVGs or others (Sharp doesn’t handle SVG optimization well)
      console.log(`ℹ️ Skipped: ${filePath}`);
    }
  }
};

// Run on both folders
await compressDir("public/assets/images");
await compressDir("public/assets/svgs");
