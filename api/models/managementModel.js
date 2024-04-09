const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ManagementTaskSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  subdomain: {
    type: [String],
    enum: [
      "teammanagement",
      "outreach",
      "publicity",
      "anchors",
      "editorial",
      "media",
    ],
  },
  question1: {
    type: String,
    validate: {
      validator: function (value) {
        return value.trim().split(/\s+/).length <= 500;
      },
      message: "Maximum word limit exceeded (500 words).",
    },
  },
  question2: {
    type: String,
    validate: {
      validator: function (value) {
        return value.trim().split(/\s+/).length <= 500;
      },
      message: "Maximum word limit exceeded (500 words).",
    },
  },
  question3: {
    type: String,
    validate: {
      validator: function (value) {
        return value.trim().split(/\s+/).length <= 500;
      },
      message: "Maximum word limit exceeded (500 words).",
    },
  },
  question4: {
    type: String,
    validate: {
      validator: function (value) {
        return value.trim().split(/\s+/).length <= 500;
      },
      message: "Maximum word limit exceeded (500 words).",
    },
  },
  question5: {
    type: String,
    validate: {
      validator: function (value) {
        return value.trim().split(/\s+/).length <= 500;
      },
      message: "Maximum word limit exceeded (500 words).",
    },
  },
  question6: {
    type: String,
    validate: {
      validator: function (value) {
        return value.trim().split(/\s+/).length <= 500;
      },
      message: "Maximum word limit exceeded (500 words).",
    },
  },
  question7: {
    type: String,
    validate: {
      validator: function (value) {
        return value.trim().split(/\s+/).length <= 500;
      },
      message: "Maximum word limit exceeded (500 words).",
    },
  },
  question8: {
    type: String,
    validate: {
      validator: function (value) {
        return value.trim().split(/\s+/).length <= 500;
      },
      message: "Maximum word limit exceeded (500 words).",
    },
  },
  isDone: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("ManagementTask", ManagementTaskSchema);
