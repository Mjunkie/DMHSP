// C:\Users\Sherzy\Desktop\mentalhealth\backend\controllers\quizController.js
const Quiz = require("../models/Quiz"); // Assuming Quiz model is for questions/quiz structure
const QuizResponse = require("../models/QuizResponse"); // This model is for user's actual quiz responses/submissions

// Submit a full quiz
exports.submitQuiz = async (req, res) => {
    try {
        const {
            responses // array of { questionId, answer }
        } = req.body;
        const userId = req.user._id; // Assumes authMiddleware attaches user object to req

        // Create a new QuizResponse document for the user's submission
        const quizResponse = await QuizResponse.create({
            userId: userId,
            responses: responses,
            // You might want to calculate and store the 'score' or 'result' here too
            // For example: result: calculateQuizResult(responses, actualQuizAnswers)
        });

        res.status(201).json({
            message: "Quiz submitted successfully",
            quizResponse
        });
    } catch (err) {
        console.error("Quiz Submission Error:", err);
        res.status(500).json({
            message: "Server error while submitting quiz"
        });
    }
};

// Get a user's quiz history
exports.getUserQuizzes = async (req, res) => {
    try {
        const userId = req.user._id; // Assumes authMiddleware attaches user object to req
        // Fetch past quiz responses for the user
        const quizzes = await QuizResponse.find({
            userId: userId
        }).sort({
            createdAt: -1
        });

        res.status(200).json({
            quizzes
        });
    } catch (err) {
        console.error("Fetch Quiz History Error:", err);
        res.status(500).json({
            message: "Server error while fetching quiz history"
        });
    }
};