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
    enum: ["ui/ux", "graphicdesign", "videoediting", "photography"],
  },
  file: {
    data: Buffer,
    contentType: String,
  },
  isDone: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("DesignTask", DesignTaskSchema);
