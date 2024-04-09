const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VerificationSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  email: {
    type: String,
  },
  otp: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  expiresAt: {
    type: Date,
  },
});

module.exports = mongoose.model("Verification", VerificationSchema);
