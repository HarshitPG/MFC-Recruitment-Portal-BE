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
      "gamedev+ar/vr",
    ],
  },
  // file: {
  //   data: Buffer,
  //   contentType: String,
  // },
  question1: {
    type: String,
    validate: {
      validator: function (value) {
        return value.trim().split(/\s+/).length <= 100;
      },
      message: "Maximum word limit exceeded (100 words).",
    },
  },
  question2: {
    type: String,
    validate: {
      validator: function (value) {
        return value.trim().split(/\s+/).length <= 100;
      },
      message: "Maximum word limit exceeded (100 words).",
    },
  },
  question3: {
    type: String,
    validate: {
      validator: function (value) {
        return value.trim().split(/\s+/).length <= 100;
      },
      message: "Maximum word limit exceeded (100 words).",
    },
  },
  isDone: {
    type: Boolean,
  },
});

module.exports = mongoose.model("TechTask", TechTaskSchema);
