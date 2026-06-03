/**
 * Compress static images under public/ → WebP (+ smaller PNG fallback for logo).
 * Run: npm run optimize:images
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const PUBLIC = path.join(process.cwd(), "public");

const JOBS = [
  {
    dir: "covers",
    maxWidth: 800,
    quality: 82,
    recursive: true,
  },
  {
    dir: "categories",
    maxWidth: 520,
    quality: 80,
    recursive: false,
  },
];

async function collectFiles(dir, recursive) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && recursive) {
      files.push(...(await collectFiles(full, true)));
    } else if (entry.isFile() && /\.(png|jpe?g)$/i.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

async function optimizeFile(filePath, maxWidth, quality) {
  const ext = path.extname(filePath).toLowerCase();
  const base = filePath.slice(0, -ext.length);
  const webpPath = `${base}.webp`;

  const pipeline = sharp(filePath).rotate().resize({
    width: maxWidth,
    withoutEnlargement: true,
  });

  await pipeline.webp({ quality, effort: 4 }).toFile(webpPath);

  const before = (await fs.stat(filePath)).size;
  const after = (await fs.stat(webpPath)).size;
  await fs.unlink(filePath);

  return { webpPath, before, after };
}

async function optimizeLogo() {
  const logoPng = path.join(PUBLIC, "logo.png");
  const logoWebp = path.join(PUBLIC, "logo.webp");
  try {
    await fs.access(logoPng);
  } catch {
    return null;
  }

  const meta = await sharp(logoPng)
    .rotate()
    .resize({ width: 360, withoutEnlargement: true })
    .webp({ quality: 85, effort: 4 })
    .toFile(logoWebp);

  const before = (await fs.stat(logoPng)).size;
  await fs.unlink(logoPng);
  return { width: meta.width, height: meta.height, before, after: meta.size };
}

async function main() {
  let totalBefore = 0;
  let totalAfter = 0;

  for (const job of JOBS) {
    const dir = path.join(PUBLIC, job.dir);
    try {
      await fs.access(dir);
    } catch {
      console.warn(`Skip missing dir: ${job.dir}`);
      continue;
    }
    const files = await collectFiles(dir, job.recursive);
    for (const file of files) {
      const { before, after } = await optimizeFile(file, job.maxWidth, job.quality);
      totalBefore += before;
      totalAfter += after;
      console.log(`✓ ${path.relative(PUBLIC, file)} → WebP (${Math.round(before / 1024)}KB → ${Math.round(after / 1024)}KB)`);
    }
  }

  const logo = await optimizeLogo();
  if (logo) {
    totalBefore += logo.before;
    totalAfter += logo.after;
    console.log(
      `✓ logo.png → logo.webp (${Math.round(logo.before / 1024)}KB → ${Math.round(logo.after / 1024)}KB, ${logo.width}×${logo.height})`
    );
  }

  console.log(
    `\nDone. Saved ~${Math.round((totalBefore - totalAfter) / 1024)}KB total. Update .png paths in catalog data to .webp if not already.`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
