// C:\Users\Sherzy\Desktop\mentalhealth\backend\routes\chatRoutes.js
const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");
const { protect, admin } = require("../middleware/authMiddleware"); // This import must be correct

// Example: save message route
router.post("/save", protect, chatController.saveMessage); // FIX: Changed 'authMiddleware' to 'protect'

// Example: get messages route (assuming you have one, apply 'protect' here too)
// router.get("/", protect, chatController.getMessages);

module.exports = router;