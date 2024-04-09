const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TechTaskSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  subdomain: {
    type: [String],
    enum: [
      "frontend",
      "backend",
      "fullstack",
      "app",
      "ai/ml",
      "cp",
      "blockchain",
      "devops",
      "cybersec",
      "gamedev",
      "ar/vr",
      "hardware",
    ],
  },
  file: {
    data: Buffer,
    contentType: String,
  },
  isDone: {
    type: Boolean,
  },
});

module.exports = mongoose.model("TechTask", TechTaskSchema);
