// C:\Users\Sherzy\Desktop\mentalhealth\backend\models\Quiz.js
const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    options: [{
        type: String,
        required: true
    }],
    correctAnswer: {
        type: String,
        required: true
    },
    category: {
        type: String
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("Quiz", QuizSchema);