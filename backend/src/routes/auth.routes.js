import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../db/jsonDb.js";
import { authenticateToken } from "../middleware/auth.js";
import { isValidEmail, sanitizeText, validatePasswordStrength } from "../utils/validators.js";

const router = express.Router();

// POST /api/auth/login
router.post("/login", (req, res) => {
  try {
    const email = sanitizeText(req.body?.email || "", { maxLength: 150 }).toLowerCase();
    const password = String(req.body?.password || "").trim();

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "ای میل اور پاس ورڈ درج کرنا لازمی ہے (Email and password are required)"
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ success: false, message: "براہ کرم درست ای میل لکھیں۔" });
    }

    const passwordCheck = validatePasswordStrength(password);
    if (!passwordCheck.valid) {
      return res.status(400).json({ success: false, message: passwordCheck.message });
    }

    const user = db.users.findOne((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "ای میل یا پاس ورڈ درست نہیں ہے (Invalid credentials)"
      });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "ای میل یا پاس ورڈ درست نہیں ہے (Invalid credentials)"
      });
    }

    const secret = process.env.JWT_SECRET || "madrasa_sahib_uz_zaman_secret_jwt_key_2026_super_secure";
    const expiresIn = process.env.JWT_EXPIRES_IN || "7d";

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      secret,
      { expiresIn }
    );

    return res.json({
      success: true,
      message: "لاگ ان کامیاب رہا (Login successful)",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "سرور کی خرابی (Server error)" });
  }
});

// GET /api/auth/me
router.get("/me", authenticateToken, (req, res) => {
  try {
    const user = db.users.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "صارف نہیں ملا (User not found)" });
    }
    return res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

// POST /api/auth/change-password
router.post("/change-password", authenticateToken, (req, res) => {
  try {
    const currentPassword = String(req.body?.currentPassword || "").trim();
    const newPassword = String(req.body?.newPassword || "").trim();

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "پرانا اور نیا پاس ورڈ فراہم کریں"
      });
    }

    const passwordCheck = validatePasswordStrength(newPassword);
    if (!passwordCheck.valid) {
      return res.status(400).json({ success: false, message: passwordCheck.message });
    }

    const user = db.users.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "صارف نہیں ملا" });
    }

    const isMatch = bcrypt.compareSync(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "موجودہ پاس ورڈ درست نہیں ہے"
      });
    }

    if (bcrypt.compareSync(newPassword, user.password)) {
      return res.status(400).json({
        success: false,
        message: "نیا پاس ورڈ موجودہ پاس ورڈ سے مختلف ہونا چاہیے۔"
      });
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    db.users.update(user.id, { password: hashedPassword });

    return res.json({
      success: true,
      message: "پاس ورڈ کامیابی کے ساتھ تبدیل کر دیا گیا ہے"
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "سرور کی خرابی" });
  }
});

export default router;
