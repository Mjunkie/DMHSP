const express = require("express");
const router = express.Router();
const quizResponseController = require("../controllers/quizResponseController");
const { protect, admin } = require("../middleware/authMiddleware");

// Submit individual question response
router.post("/submit", protect, quizResponseController.submitResponse);

// Get all responses by user
router.get("/user", protect, quizResponseController.getUserResponses);

module.exports = router;
