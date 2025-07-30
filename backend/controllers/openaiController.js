const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// @desc    Get response from OpenAI Chatbot
// @route   POST /api/openai/chat
// @access  Private
const chatWithBot = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    const botReply = completion.choices[0].message.content;
    res.status(200).json({ reply: botReply });
  } catch (error) {
    console.error("OpenAI Error:", error);
    res.status(500).json({
      error: "Failed to get chatbot response",
      details: error,
    });
  }
};

module.exports = { chatWithBot };
