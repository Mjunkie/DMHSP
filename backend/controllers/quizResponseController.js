const QuizResponse = require("../models/QuizResponse");

// Submit a response to a single question
exports.submitResponse = async (req, res) => {
  try {
    const { questionId, answer } = req.body;
    const userId = req.user._id;

    const response = new QuizResponse({
      user: userId,
      questionId,
      answer,
    });

    await response.save();
    res.status(201).json({ message: "Response submitted", response });
  } catch (err) {
    console.error("Submit Response Error:", err);
    res.status(500).json({ message: "Server error while submitting response" });
  }
};

// Get all responses by user
exports.getUserResponses = async (req, res) => {
  try {
    const userId = req.user._id;
    const responses = await QuizResponse.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json({ responses });
  } catch (err) {
    console.error("Fetch User Responses Error:", err);
    res.status(500).json({ message: "Server error while fetching responses" });
  }
};
