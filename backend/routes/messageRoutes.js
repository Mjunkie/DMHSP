// routes/messageRoutes.js
const express = require("express");
const router = express.Router();
const { saveMessage, getMessages } = require("../controllers/messageController");
const { protect } = require("../middleware/authMiddleware");

// Save a new message (user or AI)
router.post("/", protect, saveMessage);

// Optional: Get all past messages by the user
router.get("/", protect, getMessages);

module.exports = router;
