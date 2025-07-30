const mongoose = require("mongoose");

const ResourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title for the resource"],
    },
    description: {
      type: String,
    },
    type: {
      type: String,
      enum: ["article", "video", "guide", "tool"],
      default: "article",
    },
    link: {
      type: String,
      required: [true, "Please provide a link or file path"],
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resource", ResourceSchema);
