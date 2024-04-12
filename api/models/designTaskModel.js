const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const validSubdomains = [
  "ui/ux",
  "graphicdesign",
  "videoediting",
  "photography",
];

const DesignTaskSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  subdomain: {
    type: [String],
    enum: ["ui/ux", "graphicdesign", "videoediting/photography", "3dmodeling"],
  },
  // file: {
  //   data: Buffer,
  //   contentType: String,
  // },
  question1: {
    type: String,
    validate: {
      validator: function (value) {
        return value.trim().split(/\s+/).length <= 25;
      },
      message: "Maximum word limit exceeded (25 words).",
    },
  },
  question2: {
    type: String,
    validate: {
      validator: function (value) {
        return value.trim().split(/\s+/).length <= 25;
      },
      message: "Maximum word limit exceeded (25 words).",
    },
  },
  question3: {
    type: String,
    validate: {
      validator: function (value) {
        return value.trim().split(/\s+/).length <= 25;
      },
      message: "Maximum word limit exceeded (25 words).",
    },
  },
  question4: {
    type: String,
    validate: {
      validator: function (value) {
        return value.trim().split(/\s+/).length <= 25;
      },
      message: "Maximum word limit exceeded (25 words).",
    },
  },
  question5: {
    type: String,
    validate: {
      validator: function (value) {
        return value.trim().split(/\s+/).length <= 25;
      },
      message: "Maximum word limit exceeded (25 words).",
    },
  },
  question6: {
    type: String,
    validate: {
      validator: function (value) {
        return value.trim().split(/\s+/).length <= 25;
      },
      message: "Maximum word limit exceeded (25 words).",
    },
  },
  question7: {
    type: String,
    validate: {
      validator: function (value) {
        return value.trim().split(/\s+/).length <= 25;
      },
      message: "Maximum word limit exceeded (25 words).",
    },
  },
  question8: {
    type: String,
    validate: {
      validator: function (value) {
        return value.trim().split(/\s+/).length <= 25;
      },
      message: "Maximum word limit exceeded (25 words).",
    },
  },
  question9: {
    type: String,
    validate: {
      validator: function (value) {
        return value.trim().split(/\s+/).length <= 100;
      },
      message: "Maximum word limit exceeded (100 words).",
    },
  },
  question10: {
    type: String,
    validate: {
      validator: function (value) {
        return value.trim().split(/\s+/).length <= 100;
      },
      message: "Maximum word limit exceeded (100 words).",
    },
  },
  question11: {
    type: String,
    validate: {
      validator: function (value) {
        return value.trim().split(/\s+/).length <= 100;
      },
      message: "Maximum word limit exceeded (100 words).",
    },
  },
  question12: {
    type: String,
    validate: {
      validator: function (value) {
        return value.trim().split(/\s+/).length <= 100;
      },
      message: "Maximum word limit exceeded (100 words).",
    },
  },
  question13: {
    type: String,
    validate: {
      validator: function (value) {
        return value.trim().split(/\s+/).length <= 100;
      },
      message: "Maximum word limit exceeded (100 words).",
    },
  },
  question14: {
    type: String,
    validate: {
      validator: function (value) {
        return value.trim().split(/\s+/).length <= 100;
      },
      message: "Maximum word limit exceeded (100 words).",
    },
  },
  question15: {
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
    default: false,
  },
});

module.exports = mongoose.model("DesignTask", DesignTaskSchema);
