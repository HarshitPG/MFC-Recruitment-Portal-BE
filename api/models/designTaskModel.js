const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const validSubdomains = [
  "ui/ux",
  "graphicdesign",
  "videoediting",
  "photography",
];

const DesignTaskSchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    subdomain: {
      type: [String],
      // enum: ["ui/ux", "graphicdesign", "videoediting/photography", "3dmodeling"],
    },
    // file: {
    //   data: Buffer,
    //   contentType: String,
    // },
    question1: {
      type: [String],
      validate: {
        validator: function (value) {
          return value.every((item) => {
            if (item === null) return true;
            return item.trim().split(/\s+/).length <= 2000;
          });
        },
        message: "Maximum word limit exceeded (2000 words).",
      },
      required: true,
    },
    question2: {
      type: [String],
      validate: {
        validator: function (value) {
          return value.every((item) => {
            if (item === null) return true;
            return item.trim().split(/\s+/).length <= 2000;
          });
        },
        message: "Maximum word limit exceeded (2000 words).",
      },
      required: true,
    },
    question3: {
      type: [String],
      validate: {
        validator: function (value) {
          return value.every((item) => {
            if (item === null) return true;
            return item.trim().split(/\s+/).length <= 2000;
          });
        },
        message: "Maximum word limit exceeded (2000 words).",
      },
      required: true,
    },
    question4: {
      type: [String],
      validate: {
        validator: function (value) {
          return value.every((item) => {
            if (item === null) return true;
            return item.trim().split(/\s+/).length <= 2000;
          });
        },
        message: "Maximum word limit exceeded (2000 words).",
      },
      required: true,
    },
    question5: {
      type: [String],
      validate: {
        validator: function (value) {
          return value.every((item) => {
            if (item === null) return true;
            return item.trim().split(/\s+/).length <= 2000;
          });
        },
        message: "Maximum word limit exceeded (2000 words).",
      },
      required: true,
    },
    question6: {
      type: [String],
      validate: {
        validator: function (value) {
          return value.every((item) => {
            if (item === null) return true;
            return item.trim().split(/\s+/).length <= 2000;
          });
        },
        message: "Maximum word limit exceeded (2000 words).",
      },
      required: true,
    },
    question7: {
      type: [String],
      validate: {
        validator: function (value) {
          return value.every((item) => {
            if (item === null) return true;
            return item.trim().split(/\s+/).length <= 2000;
          });
        },
        message: "Maximum word limit exceeded (2000 words).",
      },
      required: true,
    },
    question8: {
      type: [String],
      validate: {
        validator: function (value) {
          return value.every((item) => {
            if (item === null) return true;
            return item.trim().split(/\s+/).length <= 2000;
          });
        },
        message: "Maximum word limit exceeded (2000 words).",
      },
      required: true,
    },
    question9: {
      type: [String],
      validate: {
        validator: function (value) {
          return value.every((item) => {
            if (item === null) return true;
            return item.trim().split(/\s+/).length <= 2000;
          });
        },
        message: "Maximum word limit exceeded (2000 words).",
      },
      required: true,
    },
    question10: {
      type: [String],
      validate: {
        validator: function (value) {
          return value.every((item) => {
            if (item === null) return true;
            return item.trim().split(/\s+/).length <= 2000;
          });
        },
        message: "Maximum word limit exceeded (2000 words).",
      },
      required: true,
    },
    question11: {
      type: [String],
      validate: {
        validator: function (value) {
          return value.every((item) => {
            if (item === null) return true;
            return item.trim().split(/\s+/).length <= 2000;
          });
        },
        message: "Maximum word limit exceeded (2000 words).",
      },
      required: true,
    },
    question12: {
      type: [String],
      validate: {
        validator: function (value) {
          return value.every((item) => {
            if (item === null) return true;
            return item.trim().split(/\s+/).length <= 2000;
          });
        },
        message: "Maximum word limit exceeded (2000 words).",
      },
      required: true,
    },
    question13: {
      type: [String],
      validate: {
        validator: function (value) {
          return value.every((item) => {
            if (item === null) return true;
            return item.trim().split(/\s+/).length <= 2000;
          });
        },
        message: "Maximum word limit exceeded (2000 words).",
      },
      required: true,
    },
    isDone: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DesignTask", DesignTaskSchema);
