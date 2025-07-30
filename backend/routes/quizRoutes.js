const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizController");
const { protect, admin } = require("../middleware/authMiddleware");

// Submit quiz
router.post("/submit", protect, quizController.submitQuiz);

// Get user's past quizzes
router.get("/history", protect, quizController.getUserQuizzes);

module.exports = router;