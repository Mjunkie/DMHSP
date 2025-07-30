// controllers/messageController.js
const Message = require("../models/Message");

// @desc    Save user or bot message
// @route   POST /api/messages
// @access  Private
const saveMessage = async (req, res) => {
  try {
    const { sender, content, context } = req.body;

    if (!sender || !content) {
      return res.status(400).json({ message: "Sender and content are required." });
    }

    const message = await Message.create({
      user: req.user._id,
      sender,
      content,
      context,
    });

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: "Failed to save message", error: error.message });
  }
};

// @desc    Get user's conversation history (optional)
// @route   GET /api/messages
// @access  Private
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ user: req.user._id }).sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch messages", error: error.message });
  }
};

module.exports = {
  saveMessage,
  getMessages,
};
