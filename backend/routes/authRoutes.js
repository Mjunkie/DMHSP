// backend/routes/authRoutes.js

const express = require("express");
const router = express.Router();

const {
    register,
    login,
    getProfile,
    updateProfile,
    updateEmail,
    updatePassword
} = require("../controllers/authController");

// FIX THIS LINE: Import 'protect' directly, without destructuring
const { protect, admin } = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getProfile);
router.put("/me", protect, updateProfile);
router.put("/me/email", protect, updateEmail);
router.put("/me/password", protect, updatePassword);

module.exports = router;