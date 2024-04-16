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
      "generaloperations",
      "outreach",
      "publicity",
      "finance",
      "editorial",
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
  question9: {
    type: String,
    validate: {
      validator: function (value) {
        return value.trim().split(/\s+/).length <= 500;
      },
      message: "Maximum word limit exceeded (500 words).",
    },
  },
  question10: {
    type: String,
    validate: {
      validator: function (value) {
        return value.trim().split(/\s+/).length <= 500;
      },
      message: "Maximum word limit exceeded (500 words).",
    },
  },
  question11: {
    type: String,
    validate: {
      validator: function (value) {
        return value.trim().split(/\s+/).length <= 500;
      },
      message: "Maximum word limit exceeded (500 words).",
    },
  },
  question12: {
    type: String,
    validate: {
      validator: function (value) {
        return value.trim().split(/\s+/).length <= 500;
      },
      message: "Maximum word limit exceeded (500 words).",
    },
  },
  question13: {
    type: String,
    validate: {
      validator: function (value) {
        return value.trim().split(/\s+/).length <= 500;
      },
      message: "Maximum word limit exceeded (500 words).",
    },
  },
  question14: {
    type: String,
    validate: {
      validator: function (value) {
        return value.trim().split(/\s+/).length <= 500;
      },
      message: "Maximum word limit exceeded (500 words).",
    },
  },
  question15: {
    type: String,
    validate: {
      validator: function (value) {
        return value.trim().split(/\s+/).length <= 500;
      },
      message: "Maximum word limit exceeded (500 words).",
    },
  },
  question16: {
    type: String,
    validate: {
      validator: function (value) {
        return value.trim().split(/\s+/).length <= 500;
      },
      message: "Maximum word limit exceeded (500 words).",
    },
  },
  question17: {
    type: String,
    validate: {
      validator: function (value) {
        return value.trim().split(/\s+/).length <= 500;
      },
      message: "Maximum word limit exceeded (500 words).",
    },
  },
  question18: {
    type: String,
    validate: {
      validator: function (value) {
        return value.trim().split(/\s+/).length <= 500;
      },
      message: "Maximum word limit exceeded (500 words).",
    },
  },
  question19: {
    type: String,
    validate: {
      validator: function (value) {
        return value.trim().split(/\s+/).length <= 500;
      },
      message: "Maximum word limit exceeded (500 words).",
    },
  },
  question20: {
    type: String,
    validate: {
      validator: function (value) {
        return value.trim().split(/\s+/).length <= 500;
      },
      message: "Maximum word limit exceeded (500 words).",
    },
  },
  question21: {
    type: String,
    validate: {
      validator: function (value) {
        return value.trim().split(/\s+/).length <= 500;
      },
      message: "Maximum word limit exceeded (500 words).",
    },
  },
  question22: {
    type: String,
    validate: {
      validator: function (value) {
        return value.trim().split(/\s+/).length <= 500;
      },
      message: "Maximum word limit exceeded (500 words).",
    },
  },
  question23: {
    type: String,
    validate: {
      validator: function (value) {
        return value.trim().split(/\s+/).length <= 500;
      },
      message: "Maximum word limit exceeded (500 words).",
    },
  },
  question24: {
    type: String,
    validate: {
      validator: function (value) {
        return value.trim().split(/\s+/).length <= 500;
      },
      message: "Maximum word limit exceeded (500 words).",
    },
  },
  question25: {
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
