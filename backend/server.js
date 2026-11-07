import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

import { db } from "./src/db/jsonDb.js";
import authRoutes from "./src/routes/auth.routes.js";
import admissionsRoutes from "./src/routes/admissions.routes.js";
import booksRoutes from "./src/routes/books.routes.js";
import bookRequestsRoutes from "./src/routes/bookRequests.routes.js";
import staffRoutes from "./src/routes/staff.routes.js";
import galleryRoutes from "./src/routes/gallery.routes.js";
import donationsRoutes from "./src/routes/donations.routes.js";
import settingsRoutes from "./src/routes/settings.routes.js";
import uploadRoutes from "./src/routes/upload.routes.js";
import statsRoutes from "./src/routes/stats.routes.js";
import homeContentRoutes from "./src/routes/homeContent.routes.js";
import policyRoutes from "./src/routes/policyContent.routes.js";
import historyRoutes from "./src/routes/historyContent.routes.js";
import womensRoutes from "./src/routes/womensContent.routes.js";
import whatsappRoutes from "./src/routes/whatsapp.routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.disable("x-powered-by");

app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()" );
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  next();
});

// Middleware
app.use(
  cors({
    origin: true,
    credentials: true
  })
);
app.use("/webhook/whatsapp", express.raw({ type: "application/json" }));
app.use("/api/webhooks/whatsapp", express.raw({ type: "application/json" }));
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));

// Static uploads folder
const uploadsPath = path.join(__dirname, "uploads");
app.use("/uploads", express.static(uploadsPath));

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "Madrasa Sahib uz Zaman API",
    time: new Date().toISOString()
  });
});

// Mount Routes
app.use("/api/auth", authRoutes);
app.use("/api/admissions", admissionsRoutes);
app.use("/api/books", booksRoutes);
app.use("/api/book-requests", bookRequestsRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/donations", donationsRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/whatsapp", whatsappRoutes);
app.use("/api/homepage", homeContentRoutes);
app.use("/api/policy", policyRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/womens", womensRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/stats", statsRoutes);

app.get("/webhook/whatsapp", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  const settings = db.settings.get();
  const verifyToken =
    settings.whatsappConfig?.webhookVerifyToken ||
    process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN ||
    "my_secret_token_123";

  if (mode === "subscribe" && token === verifyToken && challenge) {
    return res.status(200).send(String(challenge));
  }
  return res.sendStatus(403);
});

app.post("/webhook/whatsapp", async (req, res) => {
  try {
    const rawBody = Buffer.isBuffer(req.body) ? req.body.toString("utf8") : JSON.stringify(req.body || {});
    const signature = req.headers["x-hub-signature-256"] || req.headers["X-Hub-Signature-256"] || "";
    const { verifyWebhookSignature } = await import("./src/utils/whatsapp.js");
    const settings = db.settings.get();
    const secret = settings.whatsappConfig?.appSecret || process.env.WHATSAPP_APP_SECRET || "";

    if (secret && !verifyWebhookSignature(rawBody, signature, secret)) {
      return res.status(401).json({ success: false, message: "Invalid webhook signature" });
    }

    const payload = JSON.parse(rawBody || "{}");
    const status = payload?.entry?.[0]?.changes?.[0]?.value?.statuses?.[0];
    if (!status) {
      return res.status(200).json({ success: true, message: "Webhook received but no status update found." });
    }

    const messageId = status.id || status.message_id || null;
    if (messageId) {
      const existing = db.whatsAppMessages.find((item) => item.providerMessageId === messageId || item.id === messageId);
      if (existing.length > 0) {
        db.whatsAppMessages.update(existing[0].id, {
          deliveryStatus: status.status || "failed",
          updatedAt: new Date().toISOString(),
          metadata: { ...(existing[0].metadata || {}), webhook: status }
        });
      }
    }

    return res.status(200).json({ success: true, message: "Status processed." });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Webhook processing failed" });
  }
});

app.get("/api/webhooks/whatsapp", (req, res) => {
  return res.redirect(307, "/webhook/whatsapp" + (req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : ""));
});

app.post("/api/webhooks/whatsapp", async (req, res) => {
  return res.redirect(307, "/webhook/whatsapp");
});

// Root route
app.get("/", (req, res) => {
  res.send(`
    <div style="font-family: sans-serif; text-align: center; padding: 50px; background: #120A05; color: #FAF7F2; min-height: 100vh;">
      <h1 style="color: #C9B38D;">مدرسہ صاحب الزمان (عجل اللہ تعالیٰ فرجہ الشریف)</h1>
      <h2>Backend API Server is Running Successfully</h2>
      <p>Port: ${PORT} | Status: Healthy</p>
      <a href="/api/health" style="color: #C9B38D; text-decoration: underline;">Check Health Status</a>
    </div>
  `);
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "راستہ نہیں ملا (Route not found)" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled Server Error:", err);
  res.status(500).json({
    success: false,
    message: err.message || "اندرونی سرور کی خرابی (Internal Server Error)"
  });
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`  Madrasa API Server running on port ${PORT}`);
  console.log(`  Health Check: http://localhost:${PORT}/api/health`);
  console.log(`====================================================`);
});
