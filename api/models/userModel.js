const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    regno: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      required: true,
      default: false,
    },
    roundOne: {
      type: Boolean,
      required: true,
      default: false,
    },
    roundTwo: {
      type: Boolean,
      required: true,
      default: false,
    },
    roundThree: {
      type: Boolean,
      required: true,
      default: false,
    },
    isCore: {
      type: Boolean,
      required: true,
      default: false,
    },
    mobile: {
      type: Number,
    },
    emailpersonal: {
      type: String,
      trim: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    domain: {
      type: [String],
      enum: ["tech", "design", "management"],
    },
    // volunteered: {
    //   type: Boolean,
    // },
    volunteeredEvent: {
      type: String,
    },
    // participated: {
    //   type: Boolean,
    // },
    participatedEvent: {
      type: String,
    },
    isProfileDone: {
      type: Boolean,
      required: true,
      default: false,
    },
    admin: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    tokenVersion: {
      type: Number,
      default: 0,
    },
    emailToken: {
      type: String,
    },
    isSC: {
      type: Boolean,
    },
    isJC: {
      type: Boolean,
    },
    isDesignDone: {
      type: Boolean,
      default: false,
    },
    isManagementDone: {
      type: Boolean,
      default: false,
    },
    isTechDone: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
