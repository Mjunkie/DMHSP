const express = require("express");
const router = express.Router();
const { chatWithBot } = require("../controllers/openaiController");
const { protect } = require("../middleware/authMiddleware");

router.post("/chat", protect, chatWithBot);

module.exports = router;
