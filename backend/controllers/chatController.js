const Message = require("../models/Message");

// Save a new message
exports.saveMessage = async (req, res) => {
  try {
    const { sender, message } = req.body;

    const newMsg = await Message.create({
      userId: req.user.id,
      sender,
      message
    });

    res.status(201).json(newMsg);
  } catch (err) {
    res.status(500).json({ message: "Failed to save message." });
  }
};

// Get all messages for user
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ userId: req.user.id }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch messages." });
  }
};
