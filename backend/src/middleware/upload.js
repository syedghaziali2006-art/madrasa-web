import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOAD_DIR = path.join(__dirname, "..", "..", "uploads");

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname || "").toLowerCase();
    const sanitizedBase = path
      .basename(file.originalname || "upload", ext)
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .replace(/^_+|_+$/g, "")
      .toLowerCase() || "upload";
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e6);
    cb(null, `${sanitizedBase}-${uniqueSuffix}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedMimes = new Set([
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/svg+xml",
    "application/pdf",
    "video/mp4",
    "video/webm",
    "video/ogg",
    "video/quicktime",
    "video/x-matroska"
  ]);

  const allowedExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".pdf", ".mp4", ".webm", ".ogg", ".mov", ".mkv"]);
  const ext = path.extname(file.originalname || "").toLowerCase();

  if (!allowedExtensions.has(ext)) {
    return cb(new Error("فائل کی قسم غیر مجاز ہے۔ صرف تصاویر، ویڈیو اور PDF قبول کیے جاتے ہیں۔"), false);
  }

  if (!allowedMimes.has(file.mimetype)) {
    return cb(new Error("فائل کی MIME قسم غیر مجاز ہے۔"), false);
  }

  cb(null, true);
};

export const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit for videos and media
  fileFilter: fileFilter
});
