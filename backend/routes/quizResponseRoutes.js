const express = require("express");
const router = express.Router();
const quizResponseController = require("../controllers/quizResponseController");
const { protect, admin } = require("../middleware/authMiddleware");
// Submit individual question response
router.post("/submit", authMiddleware, quizResponseController.submitResponse);

// Get all responses by user
router.get("/user", authMiddleware, quizResponseController.getUserResponses);

module.exports = router;

