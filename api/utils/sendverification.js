const bcrypt = require("bcrypt");
require("dotenv").config();

const createMailTransporter = require("./mailTransporter");
const VerificationModel = require("../models/verificationModel");

async function sendVerificationMail(user) {
  const transporter = createMailTransporter();

  try {
    const otp = `${Math.floor(100000 + Math.random() * 90000)}`;
    const mailOption = {
      from: process.env.AUTH_EMAIL,
      to: user.email,
      subject: "Verify Email OTP",
      html: `<p>To proceed with your recruitment process, please utilize the provided OTP: <b>${otp}</b></p><br/><p>Thank you for your interest in joining Mozilla Firefox Club - VIT. OTP is valid only for 15 minutes.</p>`,
    };
    const salt = await bcrypt.genSalt(10);
    const hashedOTP = await bcrypt.hash(otp, salt);
    console.log("Hashed OTP: ", hashedOTP);
    const newOTPVerification = new VerificationModel({
      user_id: user._id,
      otp: hashedOTP,
      email: user.email,
      createdAt: Date.now(),
      expiresAt: Date.now() + 54000,
    });
    await newOTPVerification.save();
    await transporter.sendMail(mailOption);
    return {
      status: "PENDING",
      message: "verification otp email sent",
      data: {
        userId: user.id,
        email: user.email,
      },
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = sendVerificationMail;
