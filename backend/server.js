// server.js
require('dotenv').config(); // Load environment variables as early as possible
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db"); // Only one instance needed

// Import all API routes and middleware
const authRoutes = require("./routes/authRoutes");
console.log("Type of authRoutes:", typeof authRoutes);
const quizRoutes = require("./routes/quizRoutes");
console.log("Type of quizRoutes:", typeof quizRoutes);
const chatRoutes = require("./routes/chatRoutes");
console.log("Type of chatRoutes:", typeof chatRoutes);
const resourceRoutes = require("./routes/resourceRoutes");
console.log("Type of resourceRoutes:", typeof resourceRoutes);
const userRoutes = require("./routes/userRoutes");
console.log("Type of userRoutes:", typeof userRoutes);
const errorHandler = require("./middleware/errorHandler");
console.log("Type of errorHandler:", typeof errorHandler);
const quizResponseRoutes = require("./routes/quizResponseRoutes");
console.log("Type of quizResponseRoutes:", typeof quizResponseRoutes);
const messageRoutes = require("./routes/messageRoutes");
console.log("Type of messageRoutes:", typeof messageRoutes);
const openaiRoutes = require("./routes/openaiRoutes");
console.log("Type of openaiRoutes:", typeof openaiRoutes);

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

console.log("--- About to define API Routes ---"); // Added this log for clarity

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/users", userRoutes);
// Consolidated quiz response routes to one path for clarity.
// If you truly need both /api/responses and /api/quiz-response, add the other back.
app.use("/api/quiz-responses", quizResponseRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/openai", openaiRoutes);

// Error handler - placed after all other routes and middleware
app.use(errorHandler);

// Default test route (kept only one version)
app.get("/", (req, res) => {
    res.send("🚀 Digital Mental Health Support Platform Backend is Running");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🌐 Server running at http://localhost:${PORT}`);
});